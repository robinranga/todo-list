import React, { useState } from "react";
import { data } from "../src/Context";
import { useContext } from "react";

const Footer = () => {
  const [inputValue, setInputValue] = useState("");

  const [tasks, setTasks] = useContext(data);

  const handleAdd = () => {
    if (inputValue !== "") {
      setTasks([...tasks, { body: inputValue, isCompleted : false }]);
      setInputValue("");
    }
  };
  return (
    <footer>
      <label htmlFor="task-input">
        <div id="footer">
          <input
            type="text"
            name="task"
            id="task-input"
            placeholder="Add a Task"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter'){
                handleAdd()
              }
            }}
          />

          <i className="fa-solid fa-plus" id="plus" onClick={handleAdd}></i>
        </div>
      </label>
    </footer>
  );
};

export default Footer;
