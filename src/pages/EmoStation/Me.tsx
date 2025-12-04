import { useContext, useState } from 'react';
import { AppContext } from '../../AppContext.tsx';
import type { AppData, meType } from '../../AppContext.tsx';
import "./Me.css";

// UI elements declaration
type myModeType = keyof AppData["emoStationData"]["me"];
type myModeItems = {
    title: string;
    icon: string;
};

const myMode: { [key in myModeType]: myModeItems } = {
    loveReason: { title: "Loving ME", icon: "💖" },
    achievement: { title: "MY Wins", icon: "🏆" },
    quotes: { title: "MY Quotes", icon: "💭" },
    lookingForward: { title: "MY Tomorrows", icon: "🚀" },
};

const Me = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("App context is missing.");
    const { appData, setAppData, clearAll } = context;

    const [activeMode, setActiveMode] = useState<myModeType>('loveReason');
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [newContent, setNewContent] = useState('');
    const [newDate, setNewDate] = useState('');

    /* ____________________ add post ____________________ */
    const handleAddPost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newContent.trim()) return;

        /* new post is uniquely identified by special id */
        const newPost: meType = {
            id: (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
            content: newContent.trim(),
            date: newDate.trim() || new Date().toLocaleDateString("en-MS"),
        };

        setAppData(prev => ({
            ...prev,
            emoStationData: {
                ...prev.emoStationData,
                me:{
                    ...prev.emoStationData.me, 
                    [activeMode]: [newPost, ...prev.emoStationData.me[activeMode]].sort((a, b) => 
                    new Date(b.date).getTime() - new Date(a.date).getTime())
                    },
                }
        }))

        /* reset for new input */
        setNewContent("");
        setNewDate("");
        setIsAddingPost(false);
    };

    /* ____________________ delete post ____________________ */
    const handleDeletePost = (id: string) => {
        setAppData(prev => {
            const updated = prev.emoStationData.me[activeMode].filter(p => p.id !== id);
            return {
                ...prev,
                emoStationData: {
                    ...prev.emoStationData,
                    me: {
                        ...prev.emoStationData.me,
                        [activeMode]: updated,
                    }
                }
            };
        });
    };

    /* ____________________ mode switching ____________________ */
    const handleModeClick = (key: myModeType) => {
        if (key === activeMode) {
            setIsAddingPost(true);
        } 
        else {
            setActiveMode(key);
            setIsAddingPost(false);
        }
    };

    const currentPosts: meType[] = appData.emoStationData.me[activeMode] || [];

    /* __________ post card __________ */
    const PostCard = ({ post }: { post: meType, index: number }) => (
        <div className="me-post-card">
        <button
            onClick={() => handleDeletePost(post.id)}
            className="me-delete-button"
            title="delete post"
        >
            X
        </button>
        <div className="me-post-content-box">
            <p className="me-post-content">{post.content}</p>
        </div>
        <div className="me-date-space">
            <p className="me-date">{post.date || 'No Date'}</p>
        </div>
        </div>
    );

    return (
        <div className="me-container">
            <div className="me-backdrop-container">

                <div className="me-profile-header">
                    <div className="me-nav-bar">
                        <h2>Don't Forget About ME</h2>
                    </div>
                    <div className="me-profile-info-container">
                        <div className="me-profile-avatar"><span>👤</span></div>
                        <div>
                            <h2 className="me-username">{appData.userName}</h2>
                            <p className="me-bio">
                            Don't forget the reasons why you started. Every post here is a reminder of the core moments and thoughts that define who you are.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="me-modes-container">
                    {(Object.keys(myMode) as myModeType[]).map(key => (
                    <div
                        key={key}
                        className="me-mode-container"
                        onClick={() => handleModeClick(key)}
                    >
                        <div className={key===activeMode? "me-active-mode-ring" : "me-inactive-mode-ring"}>
                            <div className="me-mode"><span className="me-mode-icon">{myMode[key].icon}</span></div>
                        </div>
                        <p className="me-mode-title">{myMode[key].title}</p>
                    </div>
                    ))}
                </div>

            </div>

            <div className="me-post-grid">
                {currentPosts.length > 0 ? (
                <>
                    {currentPosts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                    ))}
                </>
                ) : (
                <div className="me-no-post-text">
                    <p>Waiting for post...</p>
                    <p>Click the ring above to add your first post...</p>
                </div>
                )}
            </div>

            {isAddingPost && (
                <div className="me-modal-overlay" onClick={() => setIsAddingPost(false)}>
                <div
                    className="me-modal-box"
                    onClick={(e) => e.stopPropagation()}   // prevent the modal will close once click on the modal
                >
                    <h3 className="me-modal-title">Add New {myMode[activeMode].title}</h3>
                    <form onSubmit={handleAddPost}>
                        <textarea
                            className="me-modal-content"
                            rows={4}
                            placeholder="Any to share?"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="me-modal-content"
                            placeholder="Any date to refer?"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        <button type="submit" className="me-save-button">SAVE</button>
                        <button type="button" className="me-cancel-button" onClick={() => setIsAddingPost(false)}>CANCEL</button>
                    </form>
                </div>
                </div>
            )}
                
                <button onClick={clearAll}>RESET STORAGE</button>
        </div>
    );
};

export default Me;
