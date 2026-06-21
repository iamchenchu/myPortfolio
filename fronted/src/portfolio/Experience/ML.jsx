import "./Exp.css";
import { useEffect, useState } from "react";
import by from "../../assets/Logo/by.jpeg";

export default function ML() {
    const [showMore, setShowMore] = useState(false);
 const details = [
    "Built the real-time data backbone (Apache Spark + Kafka) that ingested millions of student events daily and cut processing latency 30% - the foundation later reused by BYJU'S search, recommendation, and engagement-prediction models.",
    "Trained early CNN/RNN models in TensorFlow and PyTorch for content and engagement tasks, improving accuracy 15% by capturing both spatial and temporal patterns in student learning behavior.",
    "Productionized ML services as Flask REST APIs containerized with Docker and orchestrated on Kubernetes, reaching a 95% deployment success rate for fault-tolerant, low-latency serving.",
  ];

    return (
        <>

                <div className="experience-card">
                    <div className="experience-header">
                        <div className="experience-meta">
                            <h3>Machine Learning Engineer</h3>
                           <div className="flex">
                           <img src={by} />
                           <h4> Byju's</h4>
                           </div>
                        </div>
                        <div className="experience-title">
                            <p className="location">Hyderabad, Telangana, India</p>
                            <p className="year">Nov 2019 - Jun 2021</p>
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