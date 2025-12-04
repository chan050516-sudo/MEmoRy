import { useContext, useState, useEffect } from 'react';
import './Page1.css';
import {AppContext} from '../../AppContext';

const Page1 = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext missing");
  const { appData, setAppData, todayIndex, setTodayIndex  } = context;
  
  /* create a new object for today's data storage based on today's date once this page logged */
  /* set today's object index in emoDiaryData array to ease data updating */
  useEffect(() => {
    setAppData(prev => {
      const today = new Date().toLocaleDateString();
      const index = prev.emoDiaryData.findIndex(item => item.date === today)

      /* today's array exists */
      if (index !== -1) {
        setTodayIndex(index)
        return prev;
      }

      /* today's array doesn't exist */
      const newObject = {
        date: today,
        diaryInfo: {
          day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
          time: new Date().toLocaleTimeString(),
          weather: "",
          image: null as string | null, 
          description: "",
          summary:"", 
          moodScore: 5.0, 
          song:{song_title: "", video_id: "", video_url: ""}, 
          selfReflection:""
        },
        negativeDiary: [],
        positiveDiary: [],
        diary: ""
      };

      const updatedArray = [...prev.emoDiaryData, newObject];
      setTodayIndex(updatedArray.length -1);

      return {...prev, emoDiaryData: updatedArray};
    });
  }, 
  []);

  
  /* uploading of the image of the day */
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setAppData(prev => ({
          ...prev,
          emoDiaryData: prev.emoDiaryData.map((item, i) =>
          i === todayIndex ? { ...item, diaryInfo: { ...item.diaryInfo, image: result } }
          : item
          )
        }));

      };
      reader.readAsDataURL(file); 
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppData(prev => ({
          ...prev,
          emoDiaryData: prev.emoDiaryData.map((item, i) =>
          i === todayIndex ? { ...item, diaryInfo: { ...item.diaryInfo, description: event.target.value } }
          : item
          )
        }));
  };

  /* loading until the app data is updated in useEffect hook */
  if (
    todayIndex === -1 ||
    !appData.emoDiaryData ||
    !appData.emoDiaryData[todayIndex]
  ) {
    return <div className="page1">Loading...</div>;
  }

  return (
    <div className="page1">
      <div className="page1-container">
        <div className="page1-info-box">
          <div className="page1-info-item">
            <strong>Date:</strong> {appData.emoDiaryData[todayIndex].date}
          </div>
          <div className="page1-info-item">
            <strong>Day:</strong> {appData.emoDiaryData[todayIndex].diaryInfo.day}
          </div>
          <div className="page1-info-item">
            <strong>Time:</strong> {appData.emoDiaryData[todayIndex].diaryInfo.time}
          </div>
          <div className="page1-info-item">
            <strong>Weather:</strong> {appData.emoDiaryData[todayIndex].diaryInfo.weather}
          </div>
        </div>

        <div className="page1-image-section">
          <button className="page1-image-upload-btn">
            <label htmlFor="image-upload">
              📷 Attach an image that represents the unique today
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </button>
          {imagePreview && (
            <div className="page1-image-preview">
              <img src={imagePreview} alt="Today's unique moment" />
            </div>
          )}
        </div>

        <div className="page1-description-section">
          <textarea
            className="page1-description-textbox"
            placeholder="Short description about the picture..."
            value={appData.emoDiaryData[todayIndex].diaryInfo.description}
            onChange={handleDescriptionChange}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Page1;