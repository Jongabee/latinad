import { Routes, Route } from "react-router-dom";
import SearchView from "./pages/SearchView";
import ResultsView from "./pages/ResultView";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/results" element={<ResultsView />} />
      </Routes>
    </div>
  );
}

export default App;
