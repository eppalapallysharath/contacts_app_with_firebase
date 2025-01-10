import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { auth } from "./firebaseConfig";

function PrivateRoute({ children }) {
  return auth.currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
