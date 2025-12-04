/*import router (terminal: npm import react-router-dom)*/
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App.tsx"
import {BrowserRouter} from "react-router-dom";
import AppProvider from "./AppContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </AppProvider>
);