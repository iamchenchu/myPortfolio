# Chenchaiah Mekalathuru - Projects Deep-Dive

End-to-end design, development, deployment, and serving notes for every major
project. Written for **my own interview prep** - each entry follows the same
spine: **Problem → Design → Stack → Deploy & Serve → Hard problems → Impact**,
so I can carry a 15-minute system-design conversation on any of them.

> Architecture-era honesty: my BYJU'S work ran **up to July 2023**. The serving
> and attention techniques below are the ones that actually existed then
> (MHA/MQA/GQA, LoRA/QLoRA, SageMaker/TorchServe/FAISS). **PagedAttention/vLLM
> (Sep 2023) and MLA (DeepSeek-V2, May 2024) came *after* BYJU'S** - those belong
> to my current inference work (InferTutor Arena, Sliding-Window MLA), not the
> 2023 systems. See the [LLM Architecture & Inference Timeline](#appendix--llm-architecture--inference-timeline-i-can-defend) appendix.

---

## Table of contents

**BYJU'S (Nov 2019 - Jul 2023)** - part of the *BYJU'S WIZ* generative-AI push
1. [Doubt-Resolution RAG (LLaMA-7B)](#1-byjus-doubt-resolution-rag-llama-7b)
2. [Live-Class Real-Time Q&A (LLaMA-2)](#2-byjus-live-class-real-time-qa-llama-2)
3. [Student Engagement / Churn Prediction (Spark + XGBoost)](#3-byjus-student-engagement--churn-prediction)
4. [Q&A Neural Search + Universal Search (BERT)](#4-byjus-qa-neural-search--universal-search-bert)
5. [Computer Vision: classroom engagement (YOLOv5) + watermark removal (cGAN)](#5-byjus-computer-vision-yolov5--cgan)

**University of South Dakota (Aug 2023 - May 2025)**
6. [Liquid Neural Networks + Cancer Detection (CVPR)](#6-usd-liquid-neural-networks--cancer-detection)
7. [Graduate Admissions Automation (Bedrock Jamba)](#7-usd-graduate-admissions-automation)

**Infosys (Jul 2025 - Present)**
8. [Banking Agentic RAG - current (Google ADK on OpenShift)](#8-infosys-banking-agentic-rag-current)
9. [NAPA Online RAG Catalog Search (LLaMA 2 + FAISS + LangChain)](#9-infosys-napa-online-rag-catalog-search)
10. [Walmart Frictionless-Checkout CV POC (YOLOv8 on Azure)](#10-infosys-walmart-frictionless-checkout-cv-poc)

**Inference / research (2024 - 2025)**
11. [InferTutor Arena - multimodal serving on vLLM + Modal](#11-infertutor-arena-vllm--modal)
12. [Sliding-Window MLA - bounded KV cache research](#12-sliding-window-mla-research)
13. [GPT From Scratch (124M)](#13-gpt-from-scratch-124m)

[Appendix - LLM architecture & inference timeline](#appendix--llm-architecture--inference-timeline-i-can-defend)

---

# BYJU'S (Nov 2019 - Jul 2023)

**Context - BYJU'S WIZ.** On **June 7, 2023** BYJU'S publicly launched *BYJU'S
WIZ*, an in-house suite of transformer/AI models - **BADRI** (a knowledge-tracing
model, "BYJU'S Attentive DateVec Rasch Implementation", personalized forgetting
curves), **MathGPT** (math solution generation), and **TeacherGPT** (a Socratic
"point-teach and bottom-out" tutor) - reported at ~90% accuracy across billions
of daily student interactions. My doubt-resolution and live-class systems were
part of that same generative-AI push. (Public sources at the end.)

### My contributions to WIZ, mapped to each model
- **MathGPT** (math solver) - I fine-tuned open decoder LLMs (**LLaMA, Falcon**)
  for chain-of-thought math reasoning with **QLoRA + PEFT**, lifting GSM8k
  accuracy **+13%**.
- **TeacherGPT** (Socratic tutor) - I built the **real-time live-class tutor**
  (LLaMA-2-7B + streaming-ASR lecture context + RoBERTa relevance gate + layered
  guardrails) and the **doubt-resolution RAG** assistant (LLaMA-7B embeddings +
  FAISS + T5 fallback).
- **BADRI** (knowledge tracing) - adjacent: my engagement/recommendation signals
  (chi-square "Trending Content"; 500M-log/day XGBoost churn) fed the
  personalization layer.

### Architectures I implemented (era-accurate, ≤ Jul 2023)
| Block | Where | Note |
|---|---|---|
| **Decoder-only, MHA** | LLaMA-7B, LLaMA-2-7B, Falcon | GQA only in LLaMA-2 34B/70B (new Jul 2023); **no MLA** (that's 2024) |
| **Encoder (BERT)** | search intent + entity extraction, guardrail intent classifier | |
| **Encoder (RoBERTa)** | live-class question↔context relevance gate | |
| **Encoder-decoder (T5-small)** | fallback answer generation | |
| **GPT-2 + RL** | tone/guardrail rewriter | |
| **LoRA / QLoRA / PEFT** | all fine-tuning | gradient checkpointing for memory |
| **BADRI** | self-attention over interaction history + Rasch/IRT difficulty + temporal "DateVec" (forgetting curve) | |

## Self-hosted serving on AWS - "on your own" vs calling an API

This is the crux of why my BYJU'S work is *inference* work, not just "using an LLM."

**Two ways to put a model in front of users:**
- **Call a managed API** (OpenAI / Anthropic / Bedrock): send text, a provider runs
  the model on *their* GPUs, pay per token. Zero infra, but data leaves your VPC,
  you can't tune batching/GPU/tail latency, and cost scales with tokens.
- **Self-host (what I did):** own the weights, run them on *your* GPUs, control
  batching, scaling, latency, and cost. This is the surface inference engineers own.

**How I self-served LLMs on AWS at BYJU'S (2021-2023):**
1. **Package** the fine-tuned model (LLaMA / T5 / BERT) into an inference container -
   a **TorchServe** `.mar` handler or a custom PyTorch image (tokenizer + pre/post
   baked in).
2. **Host on GPU**: **SageMaker real-time endpoints** on `ml.g5 / g4dn / p3`
   (bring-your-own-container), or **SageMaker multi-model endpoints** to pack many
   fine-tuned variants on one GPU. (Triton was the alternative for multi-framework
   dynamic batching on EC2/EKS.)
3. **Batch**: server-side **dynamic batching** - group concurrent requests up to a
   max batch size / time window to keep the GPU busy. (Pre-continuous-batching;
   vLLM's in-flight batching arrived Sep 2023.)
4. **Scale**: **SageMaker endpoint autoscaling** on invocations / GPU utilization;
   **SQS** for burst backpressure so nothing drops at peak class hours.
5. **The path**: app to API Gateway to **FastAPI on ECS Fargate** (CPU
   orchestration: retrieval + guardrails) to the **SageMaker GPU endpoint** + FAISS;
   CloudWatch metrics, DynamoDB feedback, Airflow retrains.

**Why self-host at BYJU'S:** millions of *private* student requests had to stay
in-VPC; the models were *domain fine-tuned* (no public API for them); and at that
scale owning the GPU was the only way to control cost and latency.

**Same discipline, sharper tools (the progression):**
| Then - self-hosted on AWS (≤ 2023) | Now - frontier inference (2024+) |
|---|---|
| Static / dynamic batching | Continuous (in-flight) batching |
| Manual KV cache (TorchServe / Triton) | PagedAttention (vLLM) |
| FP16 serving | FP8 / INT4 quantization (AWQ, GPTQ) |
| TorchServe / Triton on SageMaker | vLLM / TensorRT-LLM / SGLang |
| Single GPU endpoint | Tensor / pipeline parallelism |
| Latency/throughput dashboards | p95 TTFT / ITL / goodput-per-GPU |

---

## 1. BYJU'S Doubt-Resolution RAG (LLaMA-7B)

**Problem.** During COVID, sign-ups exploded. The FAQ/doubt portal routed every
unmatched question to human academic experts; response time stretched to
**48-72 hours**. The existing search was **keyword-based**, so paraphrased
versions of already-answered questions flooded the queue as redundant tickets.

**Design.** A retrieval-augmented generation pipeline over the historical QA base:
- **Corpus:** ~5M historic Q&A pairs from MongoDB + Excel trackers → normalized
  JSON in S3.
- **Cleaning:** stopword removal, spell-correction, punctuation normalization,
  **MinHash semantic dedup**.
- **Embeddings:** **LLaMA-7B fine-tuned with LoRA** (parameter-efficient) on
  `ml.g5.4xlarge` SageMaker, gradient checkpointing for memory - tuned for dense
  representations good at *semantic similarity*, not generation.
- **Retrieval:** all embeddings indexed in **FAISS**; at query time embed the
  question with the same model, take **top-3 by cosine**; if best > **0.82**
  threshold, return the stored answer directly.
- **Fallback generation:** below threshold → **fine-tuned T5-small** synthesizes
  an answer from the question + top retrieved passages.

**Stack.** HF Transformers, LoRA, SageMaker (training + model endpoints), FAISS
on autoscaled EC2, FastAPI backend on **ECS Fargate**, API Gateway, CloudWatch
metrics, DynamoDB for thumbs-up/down feedback, **Airflow** monthly retraining.

**Deploy & Serve.** Mobile app → API Gateway → FastAPI on ECS Fargate → SageMaker
embedding endpoint + FAISS retrieval → answer. **Sub-second** real-time path.
Monthly retrain DAG: validated new QA pairs versioned in S3 → re-fine-tune LLaMA
for domain freshness. Drift watched via rolling-window **embedding-shift analysis**.

**Hard problems.**
- Vanilla LLaMA gave weak semantic matches → domain fine-tuning lifted **top-1
  match +13%** (manual QA labeling + embedding-precision benchmarks).
- **FAISS latency spiked under concurrency** → **partition the index by
  subject/topic** and load only the relevant shard per query (smaller memory
  footprint, faster retrieval).

**Impact.** Resolved **60%+** of incoming academic questions instantly with no
human; repeatable-query resolution **36h → <400ms**; manual ticket volume **-70%**;
SMEs freed for novel/subjective questions. Became a foundation for the live-class
Q&A system below.

---

## 2. BYJU'S Live-Class Real-Time Q&A (LLaMA-2)

**Problem.** Phase-2 growth: K-12 evening live classes, **500-1000 students each**,
doubts via chat with **one moderator** per class. Moderators drowned in hundreds
of messages; repetitive/off-topic/abusive messages distracted teachers; not
enough moderators for thousands of simultaneous classes.

**Design.** Real-time, context-aware doubt answering grounded in the *ongoing
lecture*:
- **Lecture context:** stream the teacher's audio via **AWS Transcribe** (streaming
  ASR), chunk every 30-45s, store session logs in S3.
- **Question ingest:** student chat via WebSocket → **Kinesis Firehose** → Lambda
  cleaner (spam/profanity filter with regex + fastText, spelling normalization).
- **Generation:** (cleaned question + latest transcript chunk as context) →
  **fine-tuned LLaMA-2-7B** (HF Transformers) prompt-tuned on thousands of
  moderator-annotated *question-context-answer* triples, academic tone.
- **Relevance gate:** a **RoBERTa** classifier scores question↔context relevance;
  if unrelated/not-yet-covered → polite fallback ("this hasn't been covered yet").
- **Safety guardrails (layered):** profanity vectorizer + BERT intent classifier
  on input; rule-based hallucination filter on output (blacklist hedging phrases);
  a **GPT-2 rewriter fine-tuned with RL** on moderator-reviewed completions to
  enforce tone/structure; violations suppressed → human fallback.

**Stack.** AWS Transcribe, Kinesis Firehose, Lambda, HF Transformers, RoBERTa,
**TorchServe** packaging, **SageMaker multi-model endpoints w/ GPU autoscaling**,
**Step Functions** orchestration, **SQS** retry queue, Streamlit moderation
dashboard, CloudWatch, Airflow (bi-monthly retrain).

**Deploy & Serve.** Strict **real-time** (target **<2s** question→UI). Inference
stack (tokenizer + context encoder + LLaMA-2) containerized with TorchServe on
SageMaker; autoscaled to **10× `ml.g5.2xlarge`** at peak; SQS fallback on overload.
Step Functions run ASR update / question ingest / generation / logging in parallel.

**Hard problems.**
- Latency >3s from **ASR queueing** under concurrency → switch batch→**stream
  transcription**, shrink context buffer.
- Students gamed it with on-topic-looking but irrelevant questions ("What is
  string theory?" in a Newtonian-mechanics class) → train a stricter
  **context-question relevance scorer** to block with a polite fallback.

**Impact.** Deployed to **1,200+ live classes/day**; **65%** of doubts answered
autonomously; answer time **12-15s → 1.8s**; moderator workload **-70%**;
inappropriate messages **-80%**; helpfulness **4.5+/5** internally.

---

## 3. BYJU'S Student Engagement / Churn Prediction

**Problem.** Millions of students; leadership needed to know **who will disengage
and when**. SQL dashboards were reactive, not predictive, and **500M+ daily
interaction logs** were too much for SQL/basic ETL (hours of latency).

**Design.** Near-real-time per-student risk scoring + an action engine:
- **Ingest:** video views, quiz attempts, pause/resume, app-open timestamps, chat
  → event bus → S3 hourly **Parquet**, partitioned by date/user.
- **Features (Spark on EMR):** last-7-day session frequency/duration, skipped
  videos, quiz accuracy, late-night study pattern, content preferences (Spark SQL
  + UDFs).
- **Model:** **XGBoost** (tabular, handles missing values, SHAP-interpretable);
  label = inactive 7+ days after window; **SMOTE** for class balance; tuned on a
  GPU SageMaker notebook. **AUC 0.89**, flags **80%+** of would-disengage students.
- **Action engine:** scores in **Redshift** → Lambda rules → personalized push/
  email (review materials, quizzes); very-high-risk → mentor phone outreach.

**Stack.** S3/Parquet, **Spark on EMR**, XGBoost, SageMaker, **Airflow** (daily
DAG + quarterly retrain DAG), Redshift, Lambda, CloudWatch.

**Deploy & Serve.** Daily **batch** scoring: 5-6 AM Airflow DAG → EMR Spark
features → XGBoost batch inference → scores to Redshift + S3. Quarterly retrain
DAG promotes a new model only if it beats the incumbent.

**Hard problems.** Morning Spark jobs too slow under cluster contention →
parallelize aggregation **per grade/subject**, EMR **spot + dynamic allocation**,
move trigger earlier → **-30% end-to-end latency** (results by 7 AM).

**Impact.** **500M+ logs/day**, scored **4M+ students/day**; at-risk-cohort
retention **+18%**; personalized nudges **+22%** reactivation vs generic; lower
marketing cost-per-conversion. Became the core of the student-success platform.

---

## 4. BYJU'S Q&A Neural Search + Universal Search (BERT)

**Problem.** Surface the right existing answer/content for a query at scale, where
keyword search fails on paraphrase.

**Design.**
- **Q&A neural search:** **BERT fine-tuned with contrastive loss** for
  similarity; **ElasticSearch + Annoy** ANN index; **Flask** APIs for
  similar-question matching.
- **Universal search:** BERT for **query-intent recognition + entity extraction**
  across text and image content.

**Deploy & Serve.** Flask APIs behind the app; ElasticSearch for lexical recall +
Annoy for vector recall; served in production at **2M monthly hits**.

**Impact.** **$600k/month** in qualified sales leads, **80% self-serve
resolution**; universal search **F1 0.96** (Text SSR 91%, Image SSR 60%).

---

## 5. BYJU'S Computer Vision (YOLOv5 + cGAN)

- **Classroom engagement tracking:** fine-tuned **YOLOv5** to detect upper-body
  objects on annotated class footage → **mAP50-95 = 0.922** real-time monitoring.
- **Watermark removal:** **cGAN** (U-Net + pre-trained **ResNet-101** generator,
  **PatchGAN** discriminator, OpenCV) to clean solution images for DB ingestion.

---

# University of South Dakota (Aug 2023 - May 2025)

## 6. USD Liquid Neural Networks + Cancer Detection

**Problem / research.** Can continuous-time **Liquid Neural Networks** (CTRNN,
Neural ODE, NPCs) match deep nets with far fewer parameters, and apply to medical
imaging under tight compute?

**Work.** Built/trained/evaluated LNN models reaching **80%+** on target tasks;
developed a **multi-modal cancer-detection** model identifying tumors across
organs and imaging modalities with strong results on limited resources →
**first-author paper submitted to CVPR 2025**.

**Why it matters for inference.** LNNs are an efficiency story (bounded compute
per step) - the same instinct behind my later KV-cache/bounded-memory work.

## 7. USD Graduate Admissions Automation

**Problem.** Faculty manually reviewed PDF applications (transcripts, SOP, LOR,
scores); **~70%** of effort was screening obvious admits/rejects; post-COVID spike
pushed turnaround to **7-20 days**, hurting yield.

**Design.** MLOps pipeline that parses applications, scores them, and auto-decides
the clear cases, routing only ambiguous ones to faculty:
- **Ingest:** nightly migration from the portal (GATKAS) → structured S3 folders
  per hashed student ID (`transcripts/ sop/ lor/ scores/`); S3 event → Lambda.
- **Parsing (ECS Fargate, Docker):** **PyMuPDF** extracts GPA, courses, scores via
  regex/NLP; **Amazon Textract** only when OCR confidence is low; SOP/LOR →
  **sentence-transformers `all-MiniLM-L6-v2`** embeddings → sentiment scorer
  trained on past accept/reject signal; outputs JSON to an S3 `features/` bucket.
- **Decision:** **AI21 Jamba 1.5 Large via AWS Bedrock** (good instruction-
  following on mixed text+numeric) returns **Admit / Reject / Needs-Review**;
  feed it **structured JSON tables**, not plain text, for stable outputs.
- **Human-in-the-loop:** "Needs-Review" → Step Function emails faculty a secure
  **presigned-S3** preview; 48h no-response → auto-reminder.

**Stack.** S3, Lambda, ECS Fargate, PyMuPDF, Textract, sentence-transformers,
Bedrock (Jamba), DynamoDB, Step Functions, **CloudFormation** (all infra as code),
CloudWatch + QuickSight + SNS, SageMaker Pipelines + model registry (quarterly
retrain, promote only on **+3%** precision/recall).

**Deploy & Serve.** Event-driven: new application → parse → features → Bedrock
decision → DynamoDB → faculty routing. Modular Docker containers per stage;
full reproducibility via CloudFormation.

**Hard problems.** Scanned PDFs → selective Textract OCR; noisy LOR sentiment from
template reuse → **TF-IDF filtering** of low-information text; Bedrock borderline
on obvious admits → prompt engineering + structured JSON inputs.

**Impact.** **100+ applications/day**, decisions in **~15 min**; **~65%**
auto-classified; faculty workload **-65%**; turnaround **7-10 days → <1 day**;
better yield; explainable per-decision metrics.

---

# Infosys (Jul 2025 - Present)

## 8. Infosys Banking Agentic RAG (current)

**What I'm building now.** Production **AI agents and agentic RAG** for a banking
client - multi-agent workflows that answer governed questions over enterprise
data, **orchestrated and served on Red Hat OpenShift**.

**Stack shift.** Started on **LangChain / LangGraph**; **migrating to Google's
Agent Development Kit (ADK)** for a cleaner, more governable agent runtime
(typed tools, explicit orchestration, easier eval/guardrails).

**Adjacent system.** A governed **Planner / Executor / Validator** multi-agent
design (LangGraph + AutoGen) over **Microsoft Fabric** semantic models:
NL question → plan → tool/SQL execution → validation against policy → grounded
answer, with **hybrid (dense + sparse) retrieval** to stay accurate inside tight
latency budgets, and **LangSmith** tracing/eval + regression tests in CI/CD.

**Serving / ops.** OpenShift (K8s) for deploy/scale; LangSmith for tracing &
evaluation; MLOps + LLMOps (CI/CD, monitoring, prompt/version management).

## 9. Infosys NAPA Online RAG Catalog Search

**Problem.** NAPA Online (Original Parts Company) catalog: **800K+ SKUs** by
brand/year/make/model/subassembly. Keyword search returned irrelevant or
overwhelming results; **40%+** of searches exited on poor quality; manual
taxonomy curation didn't scale.

**Design.** A private, domain-tuned RAG search:
- **Ingest:** product API + nightly supplier feeds → flattened JSON, chunked by
  category.
- **Embeddings:** **LLaMA-2-7B fine-tuned** on anonymized past queries + ground-
  truth SKU mappings (automotive vocabulary, fitment logic), on SageMaker.
- **Index:** **FAISS `IndexFlatIP`**, **separate index per category**
  (filters/brakes/suspension…), autoscaled EC2.
- **Retrieval:** **LangChain** vector retriever + **context-compression** chain;
  top-5 by similarity with a **brand/vehicle constraint filter**; ambiguous
  queries trigger a **clarification prompt chain** to gather missing year/trim.

**Stack.** HF Transformers, SageMaker (`ml.g5.2xlarge` endpoints), FAISS on EC2,
LangChain, Lambda (real-time) + Step Functions (daily re-embed), **Terraform**
(SageMaker, S3, IAM, Lambda, EC2, Route53), CloudWatch autoscaling.

**Hard problems.** Incomplete vehicle metadata → LangChain clarification chaining;
**FAISS index bloat** from supplier duplication → **MinHash dedup** (index -28%,
latency -35%).

**Impact.** "Catalog entropy" (redundant/irrelevant mappings) **-45%**; manual
curation **-60%**; **+30%** sessions leading to conversion; SHAP over embeddings
to explain query-token ↔ product-attribute alignment.

## 10. Infosys Walmart Frictionless-Checkout CV POC

**Problem.** Remove checkout queues: items placed in a cart should be auto-detected
from overhead camera and added to a digital cart - contactless, no manual scanning.

**Design.** One overhead camera, one test aisle (**18 SKUs**), 4K@30FPS to an edge
server:
- **Model:** benchmarked SSD / Faster R-CNN / **YOLOv5** → chose **YOLOv8**
  (speed-accuracy, native PyTorch). Trained on **10K labeled frames** (Roboflow)
  on Azure ML GPU (`Standard_NC6s_v3`), augmentation + AutoAnchor → **mAP 0.92**;
  exported to **TorchScript**.
- **Pipeline:** edge server reads RTSP via OpenCV, samples 2-3 frames/s →
  640×640 → **YOLOv8 in a FastAPI/Docker microservice** → map boxes→SKUs via
  **Redis** lookup → push SKUs+qty to **Kafka** keyed by customer (RFID cart) →
  consumer writes to **Azure Cosmos DB** real-time cart shown in app.

**Stack.** Azure ML (endpoints + registry + retrain), **AKS** GPU node pool,
ACR, Azure DevOps YAML pipelines, OpenCV, Kafka, Redis, Cosmos DB, Azure Monitor.

**Deploy & Serve.** Dockerized microservices on AKS GPU nodes; **120-150 ms/
inference** (batching later → <100 ms). Drift: weekly **KL-divergence** on SKU
distribution vs reference → Azure ML retrain trigger.

**Hard problems.** Sunlight false positives on reflective surfaces → dynamic
brightness + **histogram equalization** pre-step; item overlap/occlusion →
NMS-threshold tuning + **frame-stitching** (seen in next 3 frames ⇒ count once) +
**temporal smoothing** per customer.

**Impact.** Checkout time **4.5 min → <50 s** (**~80%**); **96.3%** cart accuracy;
validated real-time detection on a production-like Azure MLOps setup.

---

# Inference / research (2024 - 2025)

## 11. InferTutor Arena (vLLM + Modal)

**One-liner.** Deploy a multimodal LLM (`Qwen3-VL-4B-Instruct`) on **vLLM** +
**Modal** H100s, load-test under concurrency, and *tune the serving config* for
the metrics that decide a serving system's fate.

**Tuned.** Continuous (in-flight) batching, **prefix caching**, **chunked
prefill**, KV-cache/GPU-memory budgeting, replica/GPU-count.

**Measured (single H100, mixed multimodal load).** 50 concurrent users, 824
requests, **0 errors**; **p95 TTFT ≈ 826 ms** (p50 657); **p95 ITL ≈ 20.8 ms**;
~37.6 tok/s/req; ~1,264 chunks/s aggregate. Objective rewards goodput × sustained
users × quality × (1-error) ÷ (p95 TTFT × p95 ITL × GPU count).

**Why it matters.** This is the modern (post-2023) serving stack - PagedAttention,
continuous batching - that did *not* exist during BYJU'S.

## 12. Sliding-Window MLA (research)

**Idea.** Bound the **KV cache** for long context: **DeepSeek-V2 latent KV (MLA)**
+ **sliding-window** local attention + a few **global anchors** ⇒ match full-MLA
quality at an **O(window + anchors)** cache. Measured cache: ~**198 KB** flat vs
**1.4 GB** full-MLA at 1M tokens (~81,000× smaller than full attention).
Decoupled-RoPE MLA, 3 anchor policies (sink/learned/retrieval), baselines (full /
GQA+window / sparse), 51 unit tests. Quality benches (RULER, LongBench,
needle-in-a-haystack) are the next milestone.

> **Note: MLA is 2024.** This is exactly why MLA is *not* in my BYJU'S story.

## 13. GPT From Scratch (124M)

124M-parameter decoder-only Transformer built from first principles (BPE,
multi-head self-attention, 12 decoder blocks), GPT-2 weights loaded, fine-tuned
for classification/instruction tasks. The "from-the-metal-up" foundation under
everything above.

---

# Appendix - LLM architecture & inference timeline I can defend

**Why this section exists:** so I never claim an anachronism in an interview.
What was actually available *during BYJU'S (≤ Jul 2023)* vs *after*.

### Attention variants (the KV-cache story)
| Variant | What it does | KV-cache effect | First appeared |
|---|---|---|---|
| **MHA** (Multi-Head Attention) | H independent K/V heads | largest cache (H × per-head K/V) | 2017 (Transformer) |
| **MQA** (Multi-Query) | all heads share **one** K/V head | big cache cut, some quality loss | 2019 |
| **GQA** (Grouped-Query) | G K/V groups (MHA↔MQA interpolation) | cache cut with little quality loss | **2023** (LLaMA-2 70B, Jul 2023) |
| **MLA** (Multi-head Latent Attention) | compress K/V into a shared **latent**, decoupled RoPE | smallest cache, near-MHA quality | **2024** (DeepSeek-V2) - *after BYJU'S* |

So a **LLaMA-7B / LLaMA-2-7B** I used = standard **MHA**. GQA was brand-new
(LLaMA-2's 34B/70B) in July 2023. **MLA didn't exist yet** - it's my *current*
research, not a BYJU'S claim.

### How LLMs were actually deployed at BYJU'S (≤ Jul 2023)
- **Fine-tuning:** Hugging Face Transformers + **LoRA** (QLoRA from May 2023) on
  SageMaker GPU instances (`ml.g5.*`), gradient checkpointing.
- **Serving:** **SageMaker** real-time + **multi-model GPU endpoints** with
  autoscaling; **TorchServe** containers; **FastAPI** microservices on **ECS
  Fargate**; **Step Functions / SQS** for orchestration & backpressure.
- **Retrieval:** **FAISS** (sharded by subject/category), ElasticSearch + Annoy,
  cosine similarity + thresholds; **T5-small** for fallback generation.
- **Ops:** CloudWatch metrics, DynamoDB feedback, **Airflow** scheduled retrains,
  embedding-shift / cosine drift monitoring.

### What came *after* BYJU'S (so I attribute it correctly)
- **FlashAttention-2** (Jul 2023), **vLLM + PagedAttention** (Sep 2023),
  **continuous batching** as the default, **chunked prefill / prefix caching**,
  **FP8** serving, **MLA** (2024), **speculative decoding** at scale,
  **TensorRT-LLM / SGLang** maturity → all part of my **InferTutor Arena** and
  **Sliding-Window MLA** work, *not* the 2023 systems.

### The serving metrics I optimize today
**TTFT** (time-to-first-token), **ITL** (inter-token latency), **throughput /
goodput**, **error rate**, **GPU efficiency** - always read at **p95/p99**, never
hidden behind averages.

---

## Public sources for BYJU'S WIZ (BADRI / MathGPT / TeacherGPT, Jun 7 2023)
- BYJU'S press release - <https://byjus.com/press/byjus-launches-byjus-wiz-a-suite-of-cutting-edge-ai-models-for-hyper-personalized-learning/>
- Inc42 - <https://inc42.com/buzz/byjus-embraces-gpt-to-reshape-learning-launches-ai-suite/>
- YourStory - <https://yourstory.com/2023/06/byjus-wiz-generative-ai-models-hyper-personalised-learning-edtech>
- Analytics Vidhya - <https://www.analyticsvidhya.com/blog/2023/06/byjus-wiz-an-ai-to-tailor-your-educational-journey/>
