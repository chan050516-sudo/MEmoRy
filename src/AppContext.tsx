/* for sharing and storing data across modules */
import {useState, useEffect} from 'react';
import {createContext, useContext} from 'react';
import {mockData} from "./MockData";
const STORAGE_KEY = "MEmoRy-app-data";


/* declare all the global variables types */
export type MessageType = {
  role: "user"|"model";
  content: string;
}

export type diaryInfoType = {
  day: string; 
  time: string; 
  weather: string; 
  image: string | null; 
  description: string; 
  summary: string; 
  moodScore: number; 
  song: {song_title: string, video_id: string, video_url: string}; 
  selfReflection: string;
}

export type emoDiaryType = {
  date: string;
  diaryInfo: diaryInfoType;
  negativeDiary: MessageType[];
  positiveDiary: MessageType[];
  diary: string;
}

export type meType = {
  id: string;
  date: string;
  content: string;
}

export type emoStationType = {
  me: {
    loveReason: meType[];
    achievement: meType[];
    quotes: meType[];
    lookingForward: meType[];
  };
  meditationInfo: {
    taskList: string[];
  }
}

export type AppData = {
  userName: string;
  password: string;
  emoDiaryData: emoDiaryType[];
  emoStationData: emoStationType;
}


/**/

/* initialise states and global data */
const initialData = (): AppData => ({
  userName: "",
  password: "",
  emoDiaryData: mockData,
  emoStationData: {
    me:{
      loveReason: [],
      achievement: [],
      quotes: [],
      lookingForward: [],
    },
    meditationInfo: {
      taskList: [
        "a random song in playlist (4min)",
        "a couple sets of plank exercise (3min)",
        "a walk with sunshower around neighbourhood (10min)",
        "study desk tidying-up (5min)",
        "a few pages of book/news (5min)",
        "a cool water bath (10min)",
        "pillow attack (2min)",
        "a short chat/texting with friend/family (5min)",
        "a random math problem (5min)",
      ],
    }
  },
})

/* verifying the data types */
const isValidAppData = (data: any): data is AppData => {
  return (
    data &&
    typeof data === "object" &&
    data.emoDiaryData &&
    data.emoStationData
  );
};


/* initialise a global state container */
type AppContextType = {
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData>>;
  todayIndex: number;
  setTodayIndex: React.Dispatch<React.SetStateAction<number>>;
  clearAll: () => void;
  generateDiary: (todayDiaryData: string) => Promise<void>;
  appReady: boolean;
  setAppReady: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextType | null>(null);


/* app provider */
type AppProviderPropsType = {
  children: React.ReactNode;
}


const AppProvider = ({children}:AppProviderPropsType) => {
  const[todayIndex, setTodayIndex] = useState<number>(-1);
  const[appReady, setAppReady] = useState(false);
  const generateDiary = async (todayDiaryData: string) => {
    try {
      const diaryText = await handleDiary(todayDiaryData);
      if (todayIndex < 0) return; 
      setAppData(prev => ({
            ...prev,
            emoDiaryData: prev.emoDiaryData.map((item, i) =>
            i === todayIndex ? { ...item, diary: diaryText }
            : item
            )
      }));
    } 
    catch (error) {
      console.error("Diary generation failed:", error);
    }
  };
  const[appData, setAppData] = useState<AppData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (isValidAppData(parsed)) return {
          ...parsed,    // with new data from localStorage
          emoDiaryData: [
          ...mockData, 
          ...parsed.emoDiaryData.filter(item => 
            !mockData.some(mockItem => mockItem.date === item.date)
          )  // to avoid repetition of previous testing data input such as date with the mock data
          ],
          emoStationData: {
            me: {
              ...initialData().emoStationData.me,
              ...parsed.emoStationData.me
            },
            meditationInfo: {
              ...initialData().emoStationData.meditationInfo,
              ...parsed.emoStationData.meditationInfo
            }
          }
        };
      }
    } catch (err) {
      console.error("load storage fail", err);
    }
    return initialData();
  });

  /* notice main menu to pop up login page once the app provider being initialised when the explorer reload the whole JS bundle*/
  useEffect(() => {
    setAppReady(true);
  },[])

  /* auto-save once the appData updated*/
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
      } catch (err) {
        console.error("save fail", err);
      }
    }, 400);

    return () => clearTimeout(id);
  }
  ,[appData]);

  /* function to clear and reset local storage */
  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAppData(initialData());
  };
  
  /* pack up the app provider with local storage features to export for children*/
  return (
    <AppContext.Provider
      value={{
        appData,
        setAppData,
        todayIndex,
        setTodayIndex,
        clearAll,
        generateDiary,
        appReady,
        setAppReady,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


/* ready to be used by children with error detection*/
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return ctx;
}


const apiInfo = {
  url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  apiKey: "AIzaSyCauKfzYScgx173Le5WDp0wohl2rhhBSgo"
};

const diaryPrompt = `
Analyze the provided conversation transcript between the User and the AI.
​Goal: Generate a highly reflective, first-person (I, my, me) diary entry for [Date & Time] from the User's perspective.
​Enhanced Emotional Depth & Memory Trigger Requirement: If available, the entry may incorporate sensory details, metaphors, and intense emotional reflections that capture the fragility, hope, happiness, and internal conflict of this exact moment, but grounded on the original content. Use language that allows the User, upon reviewing this entry in the future, to vividly recall the weight of this day's feelings and the hesitant nature of their current decisions.
​Constraints:
​Perspective: Strictly first-person singular (I, my, me).
​Focus: Summarize the day's main topics and decisions, highlighting the User's raw emotional state.
​​Critical Exclusion: The entry MUST NOT mention the existence of the AI, the assistant, the chat session, or the conversation process itself. All insights, advice, or facts derived from the conversation must be integrated into the narrative as the User's own personal realizations, inner thoughts, or conclusions (e.g., use phrases like "It was a sudden realization," "I finally saw the path," or "My own mind provided the clarity").
Output: Pure text of diary content, not includes the date, time or weather details.`

const handleDiary = async(input: string) => {
  try{
    console.log("Request sent.");

    /* Data Fetching from Gemini API */
    const response = await fetch(`${apiInfo.url}?key=${apiInfo.apiKey}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [
          {
            role:"user",
            parts:[
            {
            text: `${diaryPrompt}
            Input: ${input}
            `
            }
          ]}
        ],
        generationConfig: {
          maxOutputTokens: 5000,
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
    const candidate = responseData.candidates[0];
    if (!candidate?.content?.parts?.length) {
      console.error("Candidate content missing:", candidate);
      throw new Error("API error: content missing");
    }

    return candidate.content.parts[0].text;
  }

  /* handle if fail to connect with API */
  catch(error){
    console.error("Diary generating API error: ", error);
  }
};


export default AppProvider;