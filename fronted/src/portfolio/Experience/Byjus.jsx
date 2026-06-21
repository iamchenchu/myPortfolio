import "./Exp.css";
import { useEffect, useState } from "react";
import by from "../../assets/Logo/by.jpeg";

export default function Byjus() {
    const [showMore, setShowMore] = useState(false);
 const details = [
    "Contributed to BYJU'S WIZ - the company's in-house generative-AI suite (BADRI knowledge-tracing, MathGPT, and TeacherGPT) launched June 2023 - building transformer/LLM-based tutoring and doubt-solving systems aligned to its ~90% accuracy bar across billions of daily student interactions.",
    "Built BYJU'S in-house doubt-resolution GPT: a RAG assistant over 5M historical Q&A pairs that cut resolution time from ~36 hours to under 400 ms and auto-resolved 60%+ of academic doubts. LoRA fine-tuned LLaMA-7B embeddings (SageMaker), FAISS sharded by subject for low-latency retrieval, and a T5-small fallback generator; served via FastAPI on ECS Fargate. +13% top-1 semantic-match accuracy.",
    "Scaled real-time doubt answering to 1,200+ live classes/day (65% fully autonomous, under 2 s latency) with a streaming-context LLM: AWS Transcribe feeds the live lecture as context to a fine-tuned LLaMA-2-7B served on SageMaker (TorchServe, multi-model GPU autoscaling), with a RoBERTa relevance gate and layered safety guardrails. Cut moderator workload 70%.",
    "Drove $600k/month in qualified sales leads (80% self-serve resolution across 2M monthly hits) with a BERT neural-search engine - contrastive-loss fine-tuning, ElasticSearch + Annoy retrieval, and Flask APIs for similar-question matching.",
    "Lifted search relevance to an F1 of 0.96 (Text SSR 91%, Image SSR 60%) with a universal search feature using BERT for query-intent recognition and entity extraction.",
    "Predicted churn for 4M+ students/day over 500M+ daily interaction logs (Spark on EMR, XGBoost AUC 0.89, Airflow) - cut the scoring pipeline's latency 30% and lifted at-risk-cohort retention 18% through personalized nudges.",
    "Tracked real-time classroom engagement at mAP50-95 of 0.922 by fine-tuning YOLOv5 to detect upper-body objects on annotated class footage.",
    "Removed watermarks from solution images with a cGAN (U-Net + ResNet-101 generator, PatchGAN discriminator, OpenCV) to clean data for database ingestion.",
    "Drove a 40% revenue increase in three months by leading product feature launches and scaling the AI/ML pipelines behind them under an Agile delivery model.",
  ];

    return (
        <>

                <div className="experience-card">
                    <div className="experience-header">
                        <div className="experience-meta">
                            <h3>Senior Machine Learning Engineer</h3>
                           <div className="flex">
                           <img src={by} />
                           <h4>BYJU'S</h4>
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