import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashcardList from "./Components/FlashCardList";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Admin from "./Components/Admin";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<FlashcardList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
