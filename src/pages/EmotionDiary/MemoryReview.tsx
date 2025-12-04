import { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
import "./MemoryReview.css";


const MemoryReview = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error ("App context is missing.")
    const {appData} = context;

    const playerRef = useRef<any>(null);
    const [isAPILoaded, setIsAPILoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    /* get diary from appData */
    const location = useLocation();
    const selectedDate = location.state?.selectedDate||undefined;   // receive the state from the sending location in routing mechanism
    const strSelectedDate = selectedDate.toLocaleDateString();
    const selectedDateIndex = appData.emoDiaryData.findIndex(item => item.date === strSelectedDate)
    if (selectedDateIndex === -1) {
        return (
            <div className="diary-container">
                <div className="diary-no-data-message">
                    📝 No diary found for {selectedDate.toLocaleDateString()}
                </div>
            </div>
        );
    }

    /* bug fixing: make sure the selectedDateIndex have initialised (assign an exact value to variable) before called */
    const calledDiary = appData.emoDiaryData[selectedDateIndex];
    const calledDiaryInfo = calledDiary.diaryInfo;
    const calledSong = calledDiaryInfo.song;

    console.log(calledDiary.date)



/* ___________song player logic from Page4__________*/

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
        if (isAPILoaded && calledSong?.video_id) {
            /* destroy the old player if exists */
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            playerRef.current = new (window as any).YT.Player("yt-player", {
                videoId: calledSong.video_id,
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
    }, [isAPILoaded, calledSong.video_id]);


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

/* _____________UI______________*/
    return(
        <div className="diary-container">
        <div className="diary-video-container">
            <video
                autoPlay
                muted
                loop
                className="diary-background-video"
            >
                <source src="/videos/nostalgic.mp4" type="video/mp4" />
            </video>
            <div className="diary-song-container">
                <img src={`https://img.youtube.com/vi/${calledSong.video_id}/hqdefault.jpg`} className="diary-player-thumb" />
                <p className="diary-player-info">{calledSong.song_title}</p>
                <button className="diary-player-button" onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
                {/* hide iframe */}
                <div style={{ display: "none" }}>
                <div id="yt-player"></div>
            </div>
            </div>
            <div className="diary-text-container">
                <div className="diary-info-container">
                    <p className="diary-info"> {calledDiary.date} </p>
                    <p className="diary-sub-info"> {calledDiaryInfo.day} </p>
                    <p className="diary-sub-info"> {calledDiaryInfo.time} </p>
                    <p className="diary-sub-info"> {calledDiaryInfo.weather} </p>
                </div>
                <div className="diary-content-container">
                    <p className="diary-content">{calledDiary.diary}</p>
                </div>
            </div>
            <div className="diary-image-container">
                <img alt="image" className="diary-image" src={`${calledDiaryInfo.image}`}/>
            </div>
        </div>
        </div>
    )
};

export default MemoryReview;