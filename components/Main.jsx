import React, { useRef, useState } from "react";
import { useContext } from "react";
import { data } from "../src/Context";

const Main = () => {
  const [tasks, setTasks] = useContext(data);
  const audio = useRef();

  const handleDelete = (ind) => {
    setTasks(tasks.filter((task, index) => index !== ind));
  };

  const handleComplete = (ind) => {
    setTasks(
      tasks.map((task, index) => {
        return index !== ind ? task : { ...task, isCompleted: true };
      })
    );
    audio.current.play();
  };

  return (
    <main>
      <audio ref={audio} src="/todo-list/sound.mp3" id="sound"></audio>
      {tasks.length !== 0 &&
        tasks.map((task, index) => {
          return (
            <div className="task-box" key={index}>
              <div className="task-cont">
                <div
                  className={
                    !task.isCompleted ? "hover checkbox " : " checkbox newCheck"
                  }
                  onClick={() => {
                    if (!task.isCompleted) {
                      handleComplete(index);
                    }
                  }}
                >
                  {task.isCompleted && <i className="fa-solid fa-check"></i>}
                </div>
                <div
                  className="task"
                  style={
                    task.isCompleted
                      ? {
                          color: "rgba(255, 255, 255, 0.6)",
                          textDecoration: "line-through",
                        }
                      : {}
                  }
                >
                  {task.body}
                </div>
                <div className="nocut">{task.isCompleted && "Completed"}</div>
              </div>
              <div className="delete-button">
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDelete(index)}
                ></i>
              </div>
            </div>
          );
        })}
    </main>
  );
};

export default Main;
