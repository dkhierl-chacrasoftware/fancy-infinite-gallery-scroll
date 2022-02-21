import { Route, Routes } from "react-router-dom";
import GalleryScroll from "./GalleryScroll";
import SVGScroll from "./SVGScroll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GalleryScroll />} />
      <Route path="/scroll-svg" element={<SVGScroll />} />
    </Routes>
  );
}

export default App;
