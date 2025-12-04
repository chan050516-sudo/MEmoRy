import {useContext, useState, useEffect, useRef} from 'react';
import {AppContext} from '../../AppContext';
import type { MessageType } from '../../AppContext';

const apiInfo = {
  url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  apiKey: "AIzaSyCauKfzYScgx173Le5WDp0wohl2rhhBSgo"
};

/* set up the system prompt for AI model */
/*const promptGeneral = "You are a warm, friendly AI companion. Your goal is to help the user talk about the good things in their day, in a natural and comforting way."
const rule1 = "Keep responses short, human, and conversational — like a gentle friend chatting. Use warm, simple, real language. No clichés, no therapy tone."
const rule2 = "Focus on chatting about positive moments, joys, little wins, and comforting details from the user's day."
const rule3 = "Encourage them to share at least two small good things that happened today — even tiny moments count."
const rule4 = "If they feel negative or discouraged, acknowledge it softly, then guide the conversation back toward lightness, warmth, and small joys."*/

const chatPrompt = `You are a warm, friendly AI companion whose primary function is to serve as a Journaling Guide. Your core goal is to engage the user in recording the unique, interesting, or memorable stories and experiences from their day, thereby satisfying their desire to share and reflect on positive/neutral events.
Guidelines for Interaction:
1. Tone and Persona: Always maintain a warm, natural, and encouraging tone, acting like a friend who is excited to hear the user's stories.
2. Focus on Narratives: Guide the conversation toward specific stories, quirky incidents, interactions with people, or unique events. Avoid focusing on abstract feelings unless the user brings them up.
3. Encourage Detail: Use gentle follow-up questions to help the user elaborate on the details of their story (who, what, where, action, dialogue).
4. Handling Low Moods (Low Mood Protocol):
    - If the user expresses clear distress, acknowledge their feeling simply and briefly (e.g., "I hear you, that sounds tough").
    - Immediately pivot by asking them to identify at least two small, non-negative moments or comforts from the day (e.g., "In the midst of all that, can you name just two small things that felt okay or were briefly comfortable?").
    - After the user provides the two items, gently prompt them to conclude the session by mentioning the 'Done' button or action (e.g., "That's a good record for today. When you're ready, you can hit 'Done'").`

type page3Props = {
  onDone(): void;
}

const Page3 = ({onDone}: page3Props) => {

  /* use app context */
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext missing");
  const { appData, setAppData, todayIndex } = context;
  const [todayMessages, setTodayMessages] = useState<MessageType[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  /* auto-scroll down to the end of the chat*/
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [todayMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  /* reset the message history for a new day */
  useEffect(() => {
    if (appData.emoDiaryData[todayIndex].positiveDiary){
      setTodayMessages(appData.emoDiaryData[todayIndex].positiveDiary);
    }
    else {
      setTodayMessages([]);
    }
  }, 
  [appData.emoDiaryData[todayIndex].date, appData.emoDiaryData[todayIndex].positiveDiary]
  );
  

  const handleResponse = async() => {
    try{
      setIsLoading(true);
      console.log("Request sent.");

      const chatHistoryInput = (todayMessages.length > 10) ?  todayMessages.slice(-10): todayMessages;

      /* Data Fetching from Gemini API */
      const response = await fetch(`${apiInfo.url}?key=${apiInfo.apiKey}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          contents: [
            {role: "user", parts:[{text: chatPrompt}]},
            ...chatHistoryInput.map(message => ({role: message.role, parts:[{text: message.content}]}))
          ],
          generationConfig: {
            maxOutputTokens: 1500,
            temperature: 0.7
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      /* handle if API fail to send response back */
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fail to connect with API: ${response.status} ${response.statusText} - ${errorText}`);
      }

      /* handle if API responses are unable to interpret*/
      const responseData = await response.json();
      if (!responseData?.candidates?.length) {
        const err = JSON.stringify(responseData, null, 2);
        console.error("API returned error instead of candidates:", err);
        throw new Error("API error: no candidates returned");
      }

      const candidate = responseData.candidates[0];
      if (!candidate?.content?.parts?.length) {
        console.error("Candidate content missing:", candidate);
        throw new Error("API error: content missing");
      }
      console.log(appData);
      return candidate.content.parts[0].text || "I'm here with you. What else is on your mind?";
    }

    /* handle if fail to connect with API */
    catch(error){
      console.error("Handling error of API: ", error);
      return "I'm here with you. Could you tell me a bit more about what happened just now?"
    }

    finally {
      setIsLoading(false);
    }
  };

  const updateAppData = (formatMessage: MessageType) => {
    setAppData(prev => ({
      ...prev,
      emoDiaryData: prev.emoDiaryData.map((item, i) =>
      i === todayIndex ? { ...item, positiveDiary: [...item.positiveDiary, formatMessage]}
      : item
      )
    }));
  }

  const handleSendMessage = async() => {

    /* Update for new user message */
    if (!inputText.trim() || isLoading) return;

    const newUserMessage = inputText.trim();
    const formatUserMessage = {role: "user" as "user", content: newUserMessage};
    const userMessagesData = [...todayMessages, formatUserMessage];
    setTodayMessages(userMessagesData);
    updateAppData(formatUserMessage);
    setInputText('');

    /* Update for new AI model message */
    const newAiMessage = await handleResponse();
    const formatAiMessage = {role:"model" as "model", content: newAiMessage};
    const aiMessagesData = [...userMessagesData, formatAiMessage]
    setTodayMessages(aiMessagesData);
    updateAppData(formatAiMessage);

    console.log(todayMessages);
    console.log(appData);
  };


  /* Submission key */
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const isUserMessages = (message: MessageType) =>  message.role === "user";

  const handleDone = () => {
    /*alert('Diary entry completed!');*/
    onDone();
  };

  return (
    <div className="page3">

      <div className="page3-video-container">
        <video
            autoPlay
            muted
            loop
            className="page3-background-video"
        >
            <source src="public/videos/positive.mp4" type="video/mp4" />
        </video>

        <div className="message-display">
          {todayMessages.length === 0 && (
            <div className="starting-message">
              <p>Tell me about any positive feelings and story that you met today.</p>
            </div>
          )}
          {todayMessages.map((message, index) => (
            <div 
            key={index}
            className={`message-bubble-${isUserMessages(message) ? "user-message" : "ai-message"}`}>
              {message.content}
            </div>
          ))
          }
          <div ref={messagesEndRef} />
        </div>

        <div className="message-input-section">
          <input
            type="text"
            className="message-input"
            placeholder="Tell me about your feelings today..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
          className="send-btn" 
          onClick={handleSendMessage}
          disabled={isLoading || !inputText.trim()}>
            {isLoading ? "Listening..." : "SEND >>>"}
          </button>
        </div>

        <div className="page3-navigation-buttons">
          <button className="done-btn" onClick={handleDone}>
            Done ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page3;