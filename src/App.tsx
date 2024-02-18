import NavBar from "./components/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FileUpload from "./pages/FileUpload.tsx";
import Search from "./pages/Search.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/search/:fileRef" element={<Search />} />
          <Route path="/" element={<FileUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
