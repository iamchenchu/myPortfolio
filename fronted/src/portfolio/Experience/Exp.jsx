import React, { useState } from "react";

import Infosys from "./Infosys.jsx";
import Byjus from "../../portfolio/Experience/Byjus.jsx";
import President from "../../portfolio/Experience/President.jsx";
import Assistant from "../../portfolio/Experience/Assistant.jsx";
import ML from "./ML.jsx";

export default function Exp() {

  return (

    <div className="experience-container">
      <h2>Experience</h2>
      <hr />
      <Infosys />
      <Assistant />
      <Byjus />
      <ML />
      <div>
        <h1>Leadership:</h1>
        <President />
      </div>
    </div>

  );
}
