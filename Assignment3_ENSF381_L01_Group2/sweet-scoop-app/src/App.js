import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import FlavorsPage from "./components/FlavorsPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/flavors" element={<FlavorsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;