import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AuthUserProvider } from "./Context/AuthUserProvider";
import AppRouter from "./Router/AppRouter";

function App() {
  return (
    <AuthUserProvider>
      <div className="App">
        <AppRouter />
      </div>
    </AuthUserProvider>
  );
}

export default App;
