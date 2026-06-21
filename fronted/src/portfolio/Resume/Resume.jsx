import React from "react";
import "./Resume.css";

export default function Resume(){
  // Base-aware path so the PDF resolves under the GitHub Pages project base
  // (e.g. /myPortfolio/Chenchaiah.pdf) as well as at the dev-server root.
  const pdf = `${import.meta.env.BASE_URL}Chenchaiah.pdf`;
  return (
   <>
   <div className="main-container">
   <div className="resume-section">
      <h2>My Resume</h2>

      {/* Display Resume inside an iframe */}
      <iframe
        src={pdf}
        width="100%"
        height="800px"
        title="Resume"
      ></iframe>

      {/* Download Button */}
      <div className="download-btn">
        <a href={pdf} download="Chenchaiah.pdf">
          <button>Download Resume</button>
        </a>
      </div>
    </div>
   </div>
   </>
  );
};


