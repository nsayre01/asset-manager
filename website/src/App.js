import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { SummaryPage } from "./pages/SummaryPage";
import { AboutMentors } from "./pages/AboutMentor";

import { BackendExamplePage } from "./pages/BackendExamplePage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { Layout } from "./layout/Layout";
import AboutChris from "./pages/AboutChris";
import ModelDetailPage from "./pages/ModelDetailPage";



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/about-mentors" element={<AboutMentors />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/about-chris" element={<AboutChris />} />
        <Route path="/models/:id" element={<ModelDetailPage />} />

        <Route path="/backend-example" element={<BackendExamplePage />} />
      </Route>
    </Routes>
  );
}

export default App;
