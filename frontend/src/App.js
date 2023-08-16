import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Url from "./components/Url";
import DisplayUrl from "./components/DisplayUrl"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Url} />
        <Route path="/url/api/shorturl" exact Component={DisplayUrl} />
      </Routes>
    </Router>
  );
}

export default App;
