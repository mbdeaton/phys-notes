import { BrowserRouter, Routes, Route } from "react-router-dom";
import LatestPost from "./pages/LatestPost";
import PostPage from "./pages/PostPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LatestPost />} />
        <Route path="/posts/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
