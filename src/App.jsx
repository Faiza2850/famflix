import { Header } from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Content from "./components/Content";
import Detail from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Content />
              
              </>
            }
          />
          <Route path="/show/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
