import React, { useState, useEffect } from "react";
import balloon from "../images/hot-air-balloon-clip-art-balloon-c4b929081467b61f7a2c50f8056ab377.png";
import "./Balloon.css";

const BalloonStream: React.FC = () => {
  return (
    <div className="balloons-container">
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
        <img src={balloon} alt="Balloon" className="balloon" />
    </div>


  );
};

export default BalloonStream;
