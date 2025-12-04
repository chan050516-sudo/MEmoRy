import { useState, useEffect, useContext } from 'react';
import './MainMenu.css';
import {Link} from 'react-router-dom';
import { AppContext } from './AppContext';
/*import type { newDate } from 'react-datepicker/dist/dist/date_utils.js';*/

const MainMenu = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("App context is missing.");
    const { appData, setAppData, appReady } = context;

    const [showEmotionOptions, setShowEmotionOptions] = useState(false);
    const [showMoodOptions, setShowMoodOptions] = useState(false);
    
    const [bg, setBg] = useState("public/videos/morning.mp4");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reasons, setReasons] = useState(["", "", "", "", ""]);
    const [mode, setMode] = useState("register")
    const [showPopout, setShowPopout] = useState(false);

    useEffect(() => {
        if (appData.userName==="" || appData.password==="") {setMode("register")}
        else {setMode("login")};
        setShowPopout(true); 
        console.log(`${appData.userName}`);
    }, [appReady]);

    useEffect(()=>{
        const hour = new Date().getHours();
        if (hour>=8 && hour<16){
            setBg("/videos/morning.mp4")
        }
        else if (hour>=16 && hour<20){
            setBg("/videos/dusk.mp4")
        } 
        else {setBg("/videos/night.mp4")}

        console.log(hour);
        console.log(bg);
    }, [])

    const handleRegister = () => {
        if (!username.trim() || !password.trim()) {
            return alert("Please enter username and password.");
        }

        if (reasons.some(r => !r.trim())) {
            return alert("Please complete all 5 reasons");
        }

        const newObject = reasons.map(r => ({
            id: crypto.randomUUID(),
            content: r,
            date: new Date().toLocaleDateString("en-MS"),
        }));

        setAppData(prev => ({
            ...prev,
            userName: username.trim(),
            password: password.trim(),
            emoStationData: {
                ...prev.emoStationData,
                me: {
                    ...prev.emoStationData.me,
                    loveReason: newObject,
                }
            }
        }));

        alert("Registration successful!");
        setMode("login");
    };

    const handleLogin = () => {
        if (username !== appData.userName || password !== appData.password) {
            return alert("Incorrect username or password.");
        }

        alert("Welcome back!");
        setShowPopout(false);
    };


    return (
        <div className="main-menu-container">
            <div className="fullscreen-video-container">
                <video
                    key={bg}   // bug-fix: the key will ensure the video rerender once the state changes
                    autoPlay
                    muted
                    loop
                    className="background-video"
                >
                    <source src={bg} type="video/mp4" />
                </video>

            <div className="main">
                <header className="main-header">
                    <h1>🎭 MEmoRy</h1>
                    <p className="tagline">Every emotion deserves to be respected</p>
                </header>

                <div className="modules-container">
                    {/* Emotion Diary Module */}
                    <div className="module-card">
                        <div className="module-header" onClick={() => setShowEmotionOptions(!showEmotionOptions)}>
                            <div className="module-icon">📖</div>
                            <div className="module-info">
                                <h2>EMO@Diary</h2>
                                <p>BEST BEFORE: getting to bed BY end of the day</p>
                            </div>
                            <div className={`expand-arrow ${showEmotionOptions ? 'expanded' : ''}`}>
                                ▼
                            </div>
                        </div>

                        {showEmotionOptions && (
                            <><div className="options-panel">
                                <Link to="/memo">
                                    <button className="option-button">
                                        <span className="option-icon">📝</span>
                                        Memo - Talk about Today's Moods @ Stories
                                    </button>
                                </Link>
                                <Link to="/memory">
                                    <button className="option-button">
                                        <span className="option-icon">🕒</span>
                                        Memory - Quick Glance @ Deep Dive about Past
                                    </button>
                                </Link>
                            </div></>
                        )}
                    </div>

                    {/* Mood Recharge Station Module */}
                    <div className="module-card">
                        <div
                            className="module-header"
                            onClick={() => setShowMoodOptions(!showMoodOptions)}
                        >
                            <div className="module-icon">⚡</div>
                            <div className="module-info">
                                <h2>EMO@Station</h2>
                                <p>BEST BEFORE: getting overwhelmed BY surging emotions </p>
                            </div>
                            <div className={`expand-arrow ${showMoodOptions ? 'expanded' : ''}`}>
                                ▼
                            </div>
                        </div>

                        {showMoodOptions && (
                            <div className="options-panel">
                                <Link to="/me">
                                    <button className="option-button">
                                        <span className="option-icon">🌟</span>
                                        Me - Reminder about Who @ How You Are
                                    </button>
                                </Link>
                                <Link to="/meditation">
                                    <button className="option-button">
                                        <span className="option-icon">🎯</span>
                                        Meditation - Pass Them By @ Back To Life
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>

        {showPopout && <div className="popout">
            <h2>{mode === "register" ? "Create your MEmoRy Room" : "Check In your MEmoRy Room"}</h2>

            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            {mode === "register" && (
                <div className="reason-container">
                    <p className="reason-question"> Please take your time to think and write FIVE reasons you found yourself lovely, or others like you. </p>
                    {reasons.map((r, i) => (
                        <input className="reason"
                            key={i}
                            placeholder={`Reason ${i + 1}`}
                            value={r}
                            onChange={e => {
                                const newArr = [...reasons];
                                newArr[i] = e.target.value;
                                setReasons(newArr);
                            }}
                        />
                    ))}
                </div>
            )}

            <button className="done-button" onClick={mode === "register" ? handleRegister : handleLogin}>
                {mode === "register" ? "Register" : "Login"}
            </button>
        </div>}
        </div>
    );
}

export default MainMenu;