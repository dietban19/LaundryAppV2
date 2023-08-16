import React, { useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import "./typewriters.css";
const Typewriters = ({ text }) => {
  const index = useRef(0);
  const [currText, setCurrText] = useState("");

  const handleType = (count) => {
    // Reset index to 0 after the third sentence
    if (count === 3) {
      index.current = 0;
    }

    // access word count number
    console.log(count);
  };
  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  return (
    <div className="typewriter">
      <Typewriter
        words={[
          "It just makes sense",
          " Done Right",
          "For You and Your Family",
          ,
        ]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={30}
        cursorBlinking={false}
        deleteSpeed={30}
        delaySpeed={1000}
        onLoopDone={handleDone}
        onType={handleType}
      />
    </div>
  );
};
export default Typewriters;
