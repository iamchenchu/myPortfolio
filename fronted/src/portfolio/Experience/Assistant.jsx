import "./Exp.css";
import { useEffect, useState } from "react";
import sd from "../../assets/Logo/sd.jpeg";

export default function President() {
    const [showMore, setShowMore] = useState(false);
 const details = [
    "Researched Liquid Neural Networks (CTRNN, Neural ODE, NPCs) and modern Transformer/LLM architectures, building continuous-time models that reached 80%+ accuracy on the target tasks with far fewer parameters than standard deep nets.",
    "Built a multi-modal cancer-detection model that identifies tumors across different organs and imaging modalities with strong results under tight compute - the basis for a first-author research paper submitted to CVPR 2025.",
    "Automated first-level graduate-admissions decisions with an MLOps pipeline on AWS: PyMuPDF/Textract document parsing, sentence-transformer scoring, and an AI21 Jamba (Bedrock) classifier returning Admit / Reject / Needs-Review - auto-classified ~65% of applications and cut turnaround from 7-10 days to under 1.",
    "Mentored 10+ undergraduates on ML and AI fundamentals and ran lab operations, turning research concepts into hands-on practical demonstrations.",
  ];

    return (
        <>
     
                <div className="experience-card">
                    <div className="experience-header">
                        <div className="experience-meta">
                            <h3>ML Research Assistant</h3>
                            <div className="flex">
                            <img src={sd}/>
                            <h4>University of South Dakota</h4>
                            </div>
                        </div>
                        <div className="experience-title">
                            <p className="location">University of South Dakota, Vermillion, SD, USA</p>
                            <p className="year">Aug 2023 - Dec 2024</p>
                        </div>
                    </div>
                
                    <ul>
                        {details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                        ))}
                    </ul>

                </div>
    
        </>
    )
}