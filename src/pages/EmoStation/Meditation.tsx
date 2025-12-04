import { useContext, useState, useRef } from "react";
import { AppContext } from "../../AppContext";
import "./Meditation.css";

type CardType = {
  id: string;
  title: string;
  img: string;
  audio: string;
};

const meditationCards: CardType[] = [
  { id: "m1", title: "4-7-8 Calm Breathing (4min)", img: "/images/breathing.jpg", audio: "/audios/4-7-8 Calm Breathing Exercise  Progressively Slowing Pace   Increase Lung Capacity   Pranayama.mp3" },
  { id: "m2", title: "Box-breathing (6min)", img: "/images/breathing.jpg", audio: "/audios/Box Breathing Relaxation Exercise  5 Minutes Beginner Pace  Anxiety Reduction Pranayama Technique.mp3" },
  { id: "m3", title: "Mindfulness Meditation (10min)", img: "/images/meditation.jpg", audio: "/audios/Daily Calm  10 Minute Mindfulness Meditation  Be Present.mp3" },
  { id: "m4", title: "Body Scan Meditation (12min)", img: "/images/meditation.jpg", audio: "/audios/10 Minute Body Scan Meditation.mp3" },
  { id: "m5", title: "Mantra Meditation (20min)", img: "/images/meditation.jpg", audio: "/audios/Beginner Mantra Meditation  Free Alternative  Guided Mantra Tone with Tranquil Ambience.mp3" },
  { id: "m6", title: "Exploring Feeling (5min)", img: "/images/feeling.jpg", audio: "/audios/Exploring feelings_ Manage strong emotions with this meditation exercise - Flow.mp3" },
  { id: "m7", title: "Self Love (10min)", img: "/images/How-to-practice-self-love.webp", audio: "/audios/10-Minute Guided Meditation_ Self-Love  SELF.mp3" },
  { id: "m8", title: "Positive (10min)", img: "/images/images positive.jpg", audio: "/audios/10 MIN Guided Meditation To Clear Your Mind & Start New Positive Habits.mp3" },
  { id: "m9", title: "Sound-healing (10min)", img: "/images/images.jpg", audio: "/audios/10 Minute Crystal Singing Bowl Meditation  Sound Healing For Relaxation & Stress Relief.mp3" },
];

const Meditation = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("App Context missing.");
  const {appData, setAppData} = context;

  // player states
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [playerTitle, setPlayerTitle] = useState("");
  const [playerUrl, setPlayerUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // running border index
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const startRandom = () => {
    let index = 0;
    setHighlightIndex(0);

    const interval = setInterval(() => {
      index = (index + 1) % 9;
      setHighlightIndex(index);
    }, 90);

    const randomNum = Math.random();
    const randomSec = randomNum*1000 + 500;
    setTimeout(() => clearInterval(interval), randomSec);   // running for 0.5 to 1.5s
  };

  const handleEditing = (i: number) => {
    if (editIndex === i) {
      setAppData(prev => {
        const editedTaskList = [...prev.emoStationData.meditationInfo.taskList];
        editedTaskList[i] = editText;
        return{
          ...prev,
          emoStationData: {
            ...prev.emoStationData,
            meditationInfo: {
              ...prev.emoStationData.meditationInfo,
              taskList: editedTaskList,
            }
          }
        }
      });
      setEditIndex(null);
      setEditText("");
      return alert("Your changes is saved.");
    }

    setEditIndex(i);
    setEditText(appData.emoStationData.meditationInfo.taskList[i]);
    return alert("Note: To save your changes after edit, click the card again.");
  }

  // handle clicking of meditation card
  const playMeditation = (card: CardType) => {
    setPlayerTitle(card.title);
    setPlayerUrl(card.audio);
    setPlayerVisible(true);

    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 200);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="meditation-container">

      <div className="pass-them-by">
        <h2 className="section-title">Pass Them By</h2>
        <div className="grid">
          {meditationCards.map((card) => (
            <div key={card.id} className="card" onClick={() => playMeditation(card)}>
              <img src={card.img} />
              <p>{card.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="back-to-life">
        <h2 className="section-title">Back To Life</h2>
        <div className="grid">
          {appData.emoStationData.meditationInfo.taskList.map((taskItem, i) => (
            <div
              key={i}
              className={`task-card ${highlightIndex === i ? "highlight" : ""}`}
              onClick={() => handleEditing(i)}
            >
              {editIndex===i ?
              (<textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Write something..."
                />
              ): <span>{taskItem}</span>}
            </div>
          ))}
        </div>
        <button className="random-btn" onClick={startRandom}>
          No hesitation. PICK n GO ...
        </button>
      </div>

      {playerVisible && (
        <div className="player-bar">
          <audio ref={audioRef} src={playerUrl} />

          <div className="player-info">
            <p>{playerTitle}</p>
            <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
          </div>

          <button className="close-btn" onClick={() => setPlayerVisible(false)}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Meditation;
