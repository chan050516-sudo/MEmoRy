import {useContext, useState, useEffect, useRef} from "react";
import {AppContext} from '../../AppContext';
import {Link} from 'react-router-dom';
import "./Page4.css";


const apiInfo = {
  urlGemini: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  apiKeyGemini: "AIzaSyCauKfzYScgx173Le5WDp0wohl2rhhBSgo",
  apiKeyYoutube: "AIzaSyCWo_QU58bqZ6MuuXdWm_1RHdnyHN4gUcg"
};

const summaryPrompt = `Read the full chat log and produce a narrative summary about the user.
Data Filtering & Focus:
- IGNORE technical questions, coding discussions, database issues, or factual queries.
- FOCUS ONLY on text revealing emotional tone, mental shifts, concerns, reliefs, or inner dialogue.

Tasks & Output:
1. Using only emotionally relevant content, write a short, story-like summary.
2. Assign a mood score from 0.0 to 10.0 (one decimal place).
3. Recommend one single suitable song matching the emotional tone and narrative in terms of theme, style and vibe.

Return ONLY valid JSON:
{
  "moodScore": 0.0, 
  "summary": "...",
  "song_title": ""
}

Style & Constraints:
- Summary Length: 2-3 sentences. 
- Narrative Perspective: Start by addressing the user ("Yesterday's You..."), then immediately transition to a third-person narrative ("he", "him", "his") to describe his journey.
- Tone: Calm, reflective, colloquial (non-academic), story-like, empathetic. DO NOT include analytical commentary, advice, or solutions. 
- Mood Score Range: Must be between 0.0 and 10.0 (e.g., "4.5"). Example Scale: 0.0-3.0 (Extreme Distress/Helplessness); 3.1-5.0 (Anxiety/Sadness/Frustration); 5.1-7.0 (Stable/Mildly Optimistic/Challenged); 7.1-10.0 (Excited/Grateful/Motivated)
** Special Note: Prohibited from using links for unofficial covers, lyric videos, short clips, or content likely to be region-blocked or invalid.
- Final Output: strict adherence to JSON structure ONLY, no code block, no backticks.
`;

/* const songPrompt = `
**STRICT TOOL EXECUTION & VALIDITY CHECKS:**
1. The **song_url** must be the full, correct, and valid YouTube link (e.g., "https://www.youtube.com/watch?v={video_id}").
2. **MODEL PRIORITY: The model MUST exclusively select the video uploaded by the OFFICIAL CHANNEL (the artist's primary channel or the record label, e.g., VEVO, official artist channels).** This choice must be based on the highest view count among official uploads to guarantee link longevity.
3. **CRITICAL VALIDITY CHECK: The selected video MUST be generally accessible and NOT be region-locked or display 'This video isn't available any more' when selected. Model must simulate checking for existence before returning the link.**
4. **Prohibited** from using links for unofficial covers, fan uploads, lyric videos, short clips, or any content that is not the primary, official music video.
Return ONLY valid JSON (strictly adherence):
{
  "video_url": "",
  "video_id": ""
}
`
*/

type analysis1Type = {
    moodScore: number, 
    summary: string,
    song_title: string
};

/*type analysis2Type = {
    video_url: string,
    video_id: string
};*/

const Page4 = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("AppContext missing");
    const { appData, setAppData, todayIndex, generateDiary } = context;

    const [isLoading, setIsLoading] = useState(true);   // necessary for async page components loading existed
    const playerRef = useRef<any>(null);
    const [isAPILoaded, setIsAPILoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [overlayOpen, setOverlayOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [inputText, setInputText] = useState("");


/* ____________handle API_____________ */

    const handleAnalysis = async() => {

        try{
            /* Data Fetching from Gemini API */
            const handleAnalysis1 = async() => {
                const response = await fetch(`${apiInfo.urlGemini}?key=${apiInfo.apiKeyGemini}`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        contents: [
                        {role: "user",
                        parts:[
                            {
                            text: `${summaryPrompt}
                            Input:
                            ${appData.emoDiaryData[todayIndex].negativeDiary}
                            ${appData.emoDiaryData[todayIndex].positiveDiary}`
                            },
                        ]},
                        ],
                        generationConfig: {
                            maxOutputTokens: 15000,
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
                    throw new Error("summary API error: no candidates returned");
                }

                const candidate = responseData.candidates[0];
                if (!candidate?.content?.parts?.length) {
                    console.error("Candidate content missing:", candidate);
                    throw new Error("summary API error: content missing");
                }

                /* fix the problem where the API always return object with markdown symbol */
                const responseObject = candidate.content.parts[0].text.replace(/^```json\s*/, '').replace(/```$/, '');

                try {
                    return JSON.parse(responseObject);
                } 
                catch (err) {
                    console.error("Failed to parse JSON from API:", candidate.content.parts[0].text);
                    throw new Error("Failed to parse API JSON");
                }
            };

            console.log("Request1 sent.");
            const analysis1:analysis1Type = await handleAnalysis1();


            /* fetch song from Youtube Data v3 API based on the song title recommend by Gemini API*/
            const handleAnalysis2 = async() => {
                const query = encodeURIComponent(analysis1.song_title);
                const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${apiInfo.apiKeyYoutube}`;

                try {
                    const res = await fetch(url);
                    const data = await res.json();

                    if (!data.items || data.items.length === 0) return null;

                    return data.items[0].id.videoId;
                } 
                catch (error) {
                    console.error("YT search error:", error);
                    return null;
                }
            }

            const analysis2: string = await handleAnalysis2();

            /* update data */
            setAppData(prev => ({
                ...prev,
                emoDiaryData: prev.emoDiaryData.map((item, i) =>
                i === todayIndex ? { ...item, diaryInfo: 
                    {
                        ...item.diaryInfo, 
                        summary: analysis1.summary, 
                        moodScore: analysis1.moodScore,
                        song: {
                            ...item.diaryInfo.song, 
                            song_title: analysis1.song_title,
                            video_id: analysis2,
                            video_url: `https://www.youtube.com/watch?v=${analysis2}`,
                        }
                    }
                }
                : item
                )
            }));

            setIsLoading(false);

            console.log(appData.emoDiaryData[todayIndex].negativeDiary);
            console.log(appData.emoDiaryData[todayIndex].positiveDiary);
            console.log(analysis1.song_title);
            console.log(analysis2);
        }

        /* handle if fail to connect with API */
        catch(error){
        console.error("Handling error of API: ", error);
        console.log(`${appData.emoDiaryData[todayIndex].negativeDiary}
                    and 
                    ${appData.emoDiaryData[todayIndex].positiveDiary}`)
        }
        finally{
            setIsLoading(false);
        }
    };


    useEffect(() => {
        appData.emoDiaryData[todayIndex];
        if (!appData.emoDiaryData[todayIndex]) return;
        
        const dataExists = (appData.emoDiaryData[todayIndex].diaryInfo.summary && 
            appData.emoDiaryData[todayIndex].diaryInfo.moodScore && 
            appData.emoDiaryData[todayIndex].diaryInfo.song.video_id) 
        if (dataExists) {
            setIsLoading(false);
            return;
        }
        handleAnalysis();
    }, 
    [appData.emoDiaryData, todayIndex, handleAnalysis]);


/* ___________pop up card component logic_____________*/

    const openPopup = (question: string) => {
        setCurrentQuestion(question);
        setOverlayOpen(true);
    };

    const handleSubmit = () => {
        if (!inputText.trim()) return;
        setAppData(prev => ({
          ...prev,
          emoDiaryData: prev.emoDiaryData.map((item, i) =>
          i === todayIndex ? { ...item, diaryInfo: { ...item.diaryInfo, selfReflection: inputText } }
          : item)
        }));
        setInputText("");
        setOverlayOpen(false);
        const diaryData = `
        ${appData.emoDiaryData[todayIndex].negativeDiary}
        ${appData.emoDiaryData[todayIndex].positiveDiary}
        ${inputText}`
        generateDiary(diaryData);
    }


/* ___________song player logic__________*/

    /* load API script */
    useEffect(() => {
        /* load script only when the API is not loaded */
        if (!isAPILoaded) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        /* update status when the API is loaded and ready */
        (window as any).onYouTubeIframeAPIReady = () => {
            setIsAPILoaded(true);
        }
    }
    }, [isAPILoaded]);

    /* create player for script */
    useEffect(() => {
        if (isAPILoaded && appData.emoDiaryData[todayIndex].diaryInfo.song?.video_id) {
            /* destroy the old player if exists */
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            playerRef.current = new (window as any).YT.Player("yt-player", {
                videoId: appData.emoDiaryData[todayIndex].diaryInfo.song.video_id,
                playerVars: { autoplay: 0, controls: 0 },
                events: {
                    /* start playing once the the player is ready and play button is clicked */
                    onReady: () => {
                        console.log("YouTube Player Ready.");
                        if (isPlaying) {
                            playerRef.current.playVideo();
                        }
                    },
                    /* change the status of isPlaying once the song is ended */
                    onStateChange: (event: any) => {
                        if (event.data === (window as any).YT.PlayerState.ENDED) {
                            setIsPlaying(false);
                        }
                    }
                }
            })
        }

        /* destroy after finished using */
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [isAPILoaded, appData.emoDiaryData[todayIndex].diaryInfo.song.video_id]);
    


    /* useEffect(() => {
        const videoReady = appData.emoDiaryData[todayIndex].diaryInfo.song?.video_id;
        if (!videoReady) return;

        // load API only once
        if (!youtubeAPILoaded) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            youtubeAPILoaded = useRef(true);
        }

        (window as any).onYouTubeIframeAPIReady = () => {
            playerRef.current = new (window as any).YT.Player("yt-player", {
                videoId: appData.emoDiaryData[todayIndex].diaryInfo.song.video_id,
                playerVars: { autoplay: 0, controls: 0 },
            });
        };

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [appData.emoDiaryData[todayIndex].diaryInfo.song.video_id]); */


    /* control play and pause along with state updating */
    const togglePlay = () => {
        if (!playerRef.current || !playerRef.current.playVideo) return;

        if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
        } 
        else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        }
    };


    /* loading until the app data is updated in useEffect hook */
    if (isLoading) {
        return <div className="page4"><p>Loading...</p>.</div>;
    }

    /*if (!appData.emoDiaryData[todayIndex].diaryInfo.song.video_id) return null;*/



/* ______________UI______________ */

    return (
        <div className="page4">
        <div className="page4-video-container">
            <video
                autoPlay
                muted
                loop
                className="page4-background-video"
            >
                <source src="/videos/lantern.mp4" type="video/mp4" />
            </video>
            <div className="page4-gradient-overlay">
                <div className="page4-mood-score">
                    {appData.emoDiaryData[todayIndex].diaryInfo.moodScore}
                    <span>Today's Mood</span>
                </div>
                <div className="page4-summary">{appData.emoDiaryData[todayIndex].diaryInfo.summary}</div>
            </div>
        </div>

        <div className="page4-player-bar">
            <img src={`https://img.youtube.com/vi/${appData.emoDiaryData[todayIndex].diaryInfo.song.video_id}/hqdefault.jpg`} className="page4-player-thumb" />
            <p className="page4-player-info">{appData.emoDiaryData[todayIndex].diaryInfo.song.song_title}</p>
            <button className="page4-player-button" onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            {/* hide iframe */}
            <div style={{ display: "none" }}>
                <div id="yt-player"></div>
            </div>
        </div>


        {/* self-relection cards */}
        <div className="page4-cards">
            <div
            className="page4-card"
            onClick={() =>
                openPopup("Q: Why do you think this emotion or event appears in your life? What's that mean to your life?")
            }
            >
            Why do you think this emotion appear in your life? What's that mean to your life?
            </div>

            <div
            className="page4-card"
            onClick={() =>
                openPopup("Q: What advice will you give to the tomorrow version of you?")
            }
            >
            What advice will you give to the tomorrow version of you?
            </div>

            <div
            className="page4-card"
            onClick={() => openPopup("Q: What can you do even a little bit more for yourself?")}
            >
            What can you do even a little bit more for yourself?
            </div>
        </div>

        {/* 弹出浮动页面 */}
        {overlayOpen && (
            <div className="page4-overlay" onClick={(e) => (e.target as HTMLElement).className === "page4-overlay" && setOverlayOpen(false)}>
            <div className="page4-popup">
                <div className="page4-popup-title">{currentQuestion}</div>
                <textarea
                id="reflection"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Write something..."
                />
                <Link to="/">
                    <button className="page4-popup-submit" onClick={handleSubmit}>✓ Submit</button>
                </Link>
            </div>
            </div>
        )}
        </div>
    );
}

export default Page4;