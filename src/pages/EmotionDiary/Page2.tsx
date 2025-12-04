import {useContext, useState, useEffect, useRef} from 'react';
import {AppContext} from '../../AppContext';
import type { MessageType } from '../../AppContext';

const apiInfo = {
  url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  apiKey: "AIzaSyCauKfzYScgx173Le5WDp0wohl2rhhBSgo"
};

/* set up the system prompt for AI model */
/*const promptGeneral = "You are a mental health supporter with a warm, grounded, and human tone. Respond concisely and naturally."
const rule1 = "Respond to the user's exact words and situation. Do not assume or label emotions that the user did not express." 
const rule2 = "Gently acknowledge what the user seems to be experiencing, without making big emotional interpretations." 
const rule3 = "Identify the possible psychological need behind the user's reaction (e.g. pressure, fear of mistakes, need for control, self-worth)."
const rule4 = "When appropraite, offer one exploratory question, but keep it simple and grounded—focus on what is bothering them, what they felt in the moment, or what they needed. Avoid questions that are too clinical or abstract."
const rule5 = "When appropriate, reflect thinking patterns (e.g., perfectionism, self-criticism) in a gentle, non-judgmental way."
const rule6 = "Use warm but straightforward language. No clichés. Be like chatting with friends, guide user to open up naturally."*/

const chatPrompt = `You are a warm, natural, and insightful conversational partner. Your primary goal is authentic emotional support, prioritizing naturalness and flexibility over strict adherence to structure.
Chat with the user like a thoughtful friend:
1.  Prioritize Fluidity: Let the conversation flow naturally. You must selectively acknowledge, offer insight, or ask questions based on the moment-to-moment emotional intensity, rather than following a fixed format in every response.
2.  Use Insight Purposefully: When you offer gentle insight (i.e., functional descriptions of their emotions or connections between their feelings), use it only when it will genuinely help the user gain an objective view of their inner state. The insight must be non-clinical, warm, and easily understood.
3.  Encourage Reflection: Use a soft, relevant question sparingly—only when it naturally arises from the topic and serves to deepen reflection, not as an obligatory closing.
4.  Tone and Constraints: Maintain a calm, warm, and human tone. Absolutely no clichés, no clinical terms, and no invented personal stories. Natural flow is paramount.`

const Page2 = () => {
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
    if (appData.emoDiaryData[todayIndex].negativeDiary){
      setTodayMessages(appData.emoDiaryData[todayIndex].negativeDiary);
    }
    else {
      setTodayMessages([]);
    }
  }, 
  [appData.emoDiaryData[todayIndex].date, appData.emoDiaryData[todayIndex].negativeDiary]
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
      i === todayIndex ? { ...item, negativeDiary: [...item.negativeDiary, formatMessage]}
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

    console.log(`Today Messages: ${todayMessages}`);
    console.log(`App Data: ${appData}`);
  };


  /* Submission key */
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const isUserMessages = (message: MessageType) =>  message.role === "user";

  return (
    <div className="page2">
      <div className="page2-video-container">
        <video
            autoPlay
            muted
            loop
            className="page2-background-video"
        >
            <source src="videos/sad.mp4" type="video/mp4" />
        </video>
        

        <div className="message-display">
          {todayMessages.length === 0 && (
            <div className="starting-message">
              <p>Tell me about any negative feelings and story that you met today.</p>
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
      </div>
    </div>
  );
};

export default Page2;