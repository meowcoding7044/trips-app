import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:keyword" element={<Home />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </main>
  );
}

export default App;
