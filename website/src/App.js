import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/practice-pages/WelcomePage";
import { SummaryPage } from "./pages/practice-pages/SummaryPage";
import { AboutMentors } from "./pages/practice-pages/AboutMentor";
import { ResourcesPage } from "./pages/practice-pages/ResourcesPage";
import { Layout } from "./layout/Layout";
import { BackendExamplePage } from "./pages/practice-pages/BackendExamplePage";
import { BuildingSearchPage } from "./pages/BuildingSearchPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BuildingSearchPage />} />
        {/* <Route path="/summary" element={<SummaryPage />} />
        <Route path="/about-mentors" element={<AboutMentors />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/backend-example" element={<BackendExamplePage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
