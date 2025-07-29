import React, { useEffect, useRef } from "react";
import { useState } from "react";

const Header = () => {
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const interval = useRef()

  const updateData = () => {
    let currentTime = new Date(); // Gettin current Time

    // Converting to 12 HR Format
    let ampm = currentTime.getHours() > 12 ? "PM" : "AM";
    let hours = currentTime.getHours() % 12 || 12;

    const getDate = `${currentTime.toLocaleString("en-us", {
      month: "short",
    })} ${currentTime.getDate()}, ${currentTime.getFullYear()}`;

    const getTime = `${hours.toString().padStart(2, "0")} : ${currentTime
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${ampm}`;

    setTime(getTime);

    setDate(getDate);
  };


  useEffect(() => {

    updateData();
    
    interval.current =  setInterval(updateData, 1000);

    return () => {
        clearInterval(interval.current)
    }
  }, []);

  return (
    <header>
      <div id="date-cont">
        <div id="myday">My Day</div>
        <div id="date">{date}</div>
      </div>
      <div id="time-cont">{time}</div>
    </header>
  );
};

export default Header;
