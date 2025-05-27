import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { SummaryPage } from "./pages/SummaryPage";
import { AboutMentors } from "./pages/AboutMentor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/about-mentors" element={<AboutMentors />} />
    </Routes>
  );
}

export default App;
