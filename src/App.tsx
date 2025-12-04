import {Routes, Route} from "react-router-dom";
import "./App.css";
import "./MainMenu.css";
import MainMenu from "./MainMenu";
import Memo from "./pages/EmotionDiary/Memo";
import Memory from "./pages/EmotionDiary/Memory";
import MemoryReview from "./pages/EmotionDiary/MemoryReview";
import Me from "./pages/EmoStation/Me";
import Meditation from "./pages/EmoStation/Meditation"
/*import Playground from "./pages/EmotionDiary/pages/Playground";*/

function App() {
  return(
    <div>
      {/*Route to different pages with different url*/}
        <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/memo" element={<Memo />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/memory-review" element={<MemoryReview />} />
        <Route path="/me" element={<Me />} />
        <Route path="/meditation" element={<Meditation />} />
        {/*404 Not Found Error*/}
        <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
    </div>
  )
}

export default App;