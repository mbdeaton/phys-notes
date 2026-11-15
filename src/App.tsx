import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import LatestPost from "./pages/LatestPost";
import PostPage from "./pages/PostPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<LatestPost />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
