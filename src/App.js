import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/signin/signin";
import Signup from "./components/signup/signup";
import Todos from "./components/todos/todos";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="usertodos"
          element={
            <PrivateRoute>
              <Todos />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
