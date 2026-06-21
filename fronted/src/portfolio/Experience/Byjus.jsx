import "./Exp.css";
import { useEffect, useState } from "react";
import by from "../../assets/Logo/by.jpeg";

export default function Byjus() {
    const [showMore, setShowMore] = useState(false);
 const details = [
    "Boosted revenue to $600k/month in qualified sales leads (80% SSR across 2M monthly hits) by building BYJU'S Q&A search system: fine-tuned a BERT model with contrastive loss for similarity, an ElasticSearch + Annoy retrieval pipeline, and Flask APIs for similar-question matching.",
    "Lifted search accuracy and user experience to an F1 score of 0.96 (Text SSR 91%, Image SSR 60%) by shipping a universal search feature that used BERT Transformers for query-intent recognition and entity extraction.",
    "Improved math-reasoning and chatbot quality by +13% accuracy on the GSM8k benchmark by fine-tuning open-source LLMs (LLaMA, Falcon) with QLoRA and PEFT.",
    "Hit a mAP50-95 of 0.922 for real-time classroom engagement tracking by fine-tuning YOLOv5 to detect upper-body objects on annotated classroom footage.",
    "Built universal 'Trending Content' recommendations with a chi-square statistical model over 10M user interactions to surface trending chapters and subtopics, deployed in production for all BYJU'S users.",
    "Removed watermarks from solution images with a cGAN (U-Net + pre-trained ResNet-101 generator, PatchGAN discriminator, OpenCV) to clean data for database ingestion.",
    "Forecasted regional revenue with ARIMA, Prophet, and LSTM models on appointment and demo data to drive strategic and risk-management decisions.",
    "Drove a 40% revenue increase within three months by managing product feature launches and scaling AI/ML pipelines under an Agile delivery model.",
  ];

    return (
        <>

                <div className="experience-card">
                    <div className="experience-header">
                        <div className="experience-meta">
                            <h3>Senior Machine Learning Engineer</h3>
                           <div className="flex">
                           <img src={by} />
                           <h4> Byju's</h4>
                           </div>
                        </div>
                        <div className="experience-title">
                            <p className="location">Hyderabad, Telangana, India · On-site</p>
                            <p className="year">Jul 2021 - Jul 2023</p>
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