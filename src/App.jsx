import React, { useEffect } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import "./App.css";
import { data } from "./Context";
import { useState } from "react";

const App = () => {
  const tasks = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks[0]));
  }, [tasks[0]]);

  return (
    <>
      <div className="container">
        <Header />
        <data.Provider value={tasks}>
          <Main />
          <Footer />
        </data.Provider>

      </div>
    </>
  );
};

export default App;
