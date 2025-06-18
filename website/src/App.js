import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { SummaryPage } from "./pages/SummaryPage";
import { AboutMentors } from "./pages/AboutMentor";
import { ResourcesPage } from "./pages/ResourcesPage";
import { Layout } from "./layout/Layout";
import { BackendExamplePage } from "./pages/BackendExamplePage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/about-mentors" element={<AboutMentors />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/backend-example" element={<BackendExamplePage />} />
      </Route>
    </Routes>
  );
}

export default App;
