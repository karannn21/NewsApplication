import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Table from "./Components/Table";

const App = () => {
  const pageSize = 8;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      {/* <Table /> */}
      <Router>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="world"
                pageSize={pageSize}
                country="in"
                category="world"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                pageSize={pageSize}
                country="in"
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                category="entertainment"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                pageSize={pageSize}
                country="in"
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={pageSize}
                country="in"
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
