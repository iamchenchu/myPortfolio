// src/pages/ByjusWiz.js
import React from "react";
import gpt from "../../../assets/Project/gpt.png";
import "./comman.css";
import Project from "../project";

export default function ByjusWiz() {
    return (
        <div className="project-container">
            <div className="project-detail">
                <h2>BYJU'S WIZ - In-House GPTs: My Contributions &amp; Architectures</h2>

                <p>
                    <strong>BYJU'S WIZ</strong> (launched June 2023) is BYJU'S in-house generative-AI suite - three
                    transformer models, <strong>BADRI</strong>, <strong>MathGPT</strong>, and <strong>TeacherGPT</strong> -
                    reported at ~90% accuracy across billions of daily student interactions. I built and shipped the
                    LLM tutoring, math-reasoning, and doubt-solving systems behind that push, self-hosted on AWS GPUs.
                </p>

                <img src={gpt} alt="BYJU'S WIZ generative-AI suite" className="projectImg" />

                <h3>The three WIZ models and their architectures (era-accurate, up to Jul 2023)</h3>
                <div className="tech-stack">
                    <h4>BADRI - knowledge tracing</h4>
                    <ul>
                        <li><strong>What it does:</strong> predicts what a student knows and forgets (personalized "forgetting curves") to pinpoint strengths and weaknesses.</li>
                        <li><strong>Architecture:</strong> a self-attention sequence model (transformer, MHA) over each student's interaction history, combined with a <strong>Rasch / Item-Response-Theory</strong> layer for item difficulty and temporal "DateVec" embeddings that encode time-since-last-seen (the forgetting curve).</li>
                        <li><strong>My adjacency:</strong> the personalization signals came from my engagement work - chi-square "Trending Content" recommendations and the 500M-log/day XGBoost churn model.</li>
                    </ul>

                    <h4>MathGPT - step-by-step math solver</h4>
                    <ul>
                        <li><strong>What it does:</strong> generates accurate, worked solutions to math problems.</li>
                        <li><strong>Architecture:</strong> a decoder-only LLM (LLaMA / Falcon family) fine-tuned for chain-of-thought math reasoning; <strong>MHA</strong> attention at 7B, FP16.</li>
                        <li><strong>My contribution:</strong> fine-tuned open LLMs (LLaMA, Falcon) for math reasoning with <strong>QLoRA + PEFT</strong>, lifting GSM8k accuracy +13%.</li>
                    </ul>

                    <h4>TeacherGPT - Socratic tutor</h4>
                    <ul>
                        <li><strong>What it does:</strong> guides students toward the answer ("point-teach, bottom-out") instead of handing it over - safe and on-curriculum.</li>
                        <li><strong>Architecture:</strong> an instruction-tuned decoder LLM (<strong>LLaMA-2-7B</strong>) for multi-turn dialogue, grounded by <strong>RAG</strong> over curriculum, gated by a <strong>RoBERTa</strong> relevance classifier, with layered guardrails (a BERT intent classifier, rule-based filters, and a <strong>GPT-2 rewriter fine-tuned with RL</strong> for tone).</li>
                        <li><strong>My contribution:</strong> built the real-time live-class doubt-answering tutor (LLaMA-2-7B + streaming-ASR lecture context + RoBERTa relevance + guardrails) and the doubt-resolution RAG assistant (LLaMA-7B embeddings + FAISS + T5 fallback).</li>
                    </ul>

                    <h4>Architecture building blocks I implemented</h4>
                    <ul>
                        <li><strong>Decoder-only transformers:</strong> LLaMA-7B, LLaMA-2-7B, Falcon - standard <strong>MHA</strong> at 7B (GQA only appeared in LLaMA-2's 34B/70B, brand-new in July 2023).</li>
                        <li><strong>Encoder transformers:</strong> BERT (search intent + entity extraction), RoBERTa (relevance gating), a BERT intent classifier for guardrails.</li>
                        <li><strong>Encoder-decoder:</strong> T5-small for fallback answer generation.</li>
                        <li><strong>Generation guardrails:</strong> GPT-2 fine-tuned with reinforcement learning to enforce academic tone.</li>
                        <li><strong>Fine-tuning:</strong> LoRA / QLoRA / PEFT with gradient checkpointing for memory.</li>
                        <li><strong>Embeddings + retrieval:</strong> fine-tuned LLaMA embeddings, FAISS (sharded by subject), ElasticSearch + Annoy.</li>
                    </ul>

                    <h4>How it was served (self-hosted on AWS, not API calls)</h4>
                    <ul>
                        <li>Models were packaged (TorchServe / custom PyTorch containers) and hosted on <strong>SageMaker real-time and multi-model GPU endpoints</strong> (ml.g5 / g4dn), with <strong>server-side dynamic batching</strong> and endpoint <strong>autoscaling</strong>.</li>
                        <li>A <strong>FastAPI</strong> orchestration layer on <strong>ECS Fargate</strong> handled retrieval and guardrails; <strong>Step Functions</strong> and <strong>SQS</strong> coordinated and absorbed bursts; CloudWatch, DynamoDB, and Airflow handled metrics, feedback, and retrains.</li>
                        <li>Why self-host: millions of private student requests stayed in-VPC, the models were domain fine-tuned (no public API existed for them), and owning the GPU was the only way to control cost and latency at that scale.</li>
                    </ul>

                    <h4>Architecture honesty</h4>
                    <ul>
                        <li>This was the <strong>MHA / MQA / GQA</strong> era. <strong>MLA</strong> (DeepSeek-V2, 2024) and <strong>vLLM / PagedAttention</strong> (Sep 2023) did not exist yet - those belong to my current inference work (InferTutor Arena, Sliding-Window MLA), not these 2023 systems.</li>
                    </ul>
                </div>

                <p><strong>Tech Stack:</strong> LLaMA-7B / LLaMA-2-7B / Falcon, BERT, RoBERTa, T5, GPT-2, LoRA / QLoRA / PEFT, FAISS, ElasticSearch + Annoy, SageMaker, TorchServe, ECS Fargate, Step Functions, AWS</p>

                <a
                    href="https://byjus.com/press/byjus-launches-byjus-wiz-a-suite-of-cutting-edge-ai-models-for-hyper-personalized-learning/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link">
                    BYJU'S WIZ announcement
                </a>
            </div>
            <Project />
        </div>
    );
}
