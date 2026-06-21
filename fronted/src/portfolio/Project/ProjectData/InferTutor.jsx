// src/pages/InferTutor.js
import React from "react";
import gpt from "../../../assets/Project/gpt.png";
import "./comman.css";
import Project from "../project";

export default function InferTutor() {
    return (
        <div className="project-container">
            <div className="project-detail">
                <h2>InferTutor Arena — Multimodal LLM Serving on vLLM + Modal</h2>

                <p>
                    <strong>InferTutor Arena</strong> is an end-to-end inference-engineering project: a personalized multimodal AI
                    tutor served as a real production system rather than a toy script. The job is to take a vision-language model,
                    put it behind a high-throughput serving engine, push it under concurrent traffic, read the production metrics,
                    form hypotheses, change serving parameters, and <em>justify the result</em> — exactly how an inference engineer
                    works on a GPU fleet.
                </p>

                <img src={gpt} alt="InferTutor Arena — LLM serving" className="projectImg" />

                <h3>My Measured Result — single H100, mixed multimodal workload</h3>
                <div className="tech-stack">
                    <ul>
                        <li><strong>50 concurrent users · 824 requests · 0 errors</strong> (0.0% error rate).</li>
                        <li><strong>p95 TTFT ≈ 826 ms</strong> (p50 657 ms) — first-token responsiveness under streaming load.</li>
                        <li><strong>p95 inter-token latency ≈ 20.8 ms</strong> (p50 19.4 ms) — a smooth, non-stuttering stream.</li>
                        <li><strong>~37.6 tokens/s per request</strong>, ~1,264 stream chunks/s aggregate, 13.7 req/s — all on <strong>one GPU</strong>.</li>
                    </ul>
                </div>

                <h3>System &amp; Stack</h3>
                <div className="tech-stack">
                    <h4>Serving Architecture</h4>
                    <ul>
                        <li><strong>Model:</strong> <code>Qwen/Qwen3-VL-4B-Instruct</code> — a multimodal (text + image) LLM, small enough to iterate on with 1–4 H100s but large enough to expose real serving trade-offs.</li>
                        <li><strong>Serving engine:</strong> vLLM&apos;s OpenAI-compatible server, with PagedAttention-backed KV cache and continuous (in-flight) batching.</li>
                        <li><strong>Platform:</strong> Modal GPU containers targeting H100s — one-command deploy, scale-out replicas, and cleanup.</li>
                        <li><strong>Workload:</strong> a fixed official prompt set spanning short text, long-context, image, and mixed tutor prompts.</li>
                    </ul>

                    <h4>Inference Optimizations Tuned</h4>
                    <ul>
                        <li><strong>Continuous batching</strong> to keep the GPU saturated as requests arrive and finish at different times.</li>
                        <li><strong>Prefix caching</strong> to reuse KV for shared system / few-shot prefixes across requests.</li>
                        <li><strong>Chunked prefill</strong> to interleave long-prompt prefill with decode so a big prompt doesn&apos;t stall everyone&apos;s tokens.</li>
                        <li><strong>KV-cache &amp; memory budgeting</strong> (GPU memory utilization, max sequences) to trade concurrency against per-request latency.</li>
                        <li><strong>Replica &amp; GPU-count tuning</strong> — adding capacity only when it pays back in proportional throughput.</li>
                    </ul>

                    <h4>How Success Is Measured</h4>
                    <ul>
                        <li>Optimize a single objective that rewards <strong>goodput</strong> and <strong>sustained concurrency</strong> and penalizes tail latency and wasted GPUs:</li>
                    </ul>
                    <pre><code>Score = goodput_tok_s × sustained_users × quality_pass_rate × (1 − error_rate)
        ÷ (p95_TTFT × p95_ITL × total_GPU_count)</code></pre>
                    <ul>
                        <li><strong>p95 Time-To-First-Token (TTFT)</strong> — responsiveness under load, not a flattering average.</li>
                        <li><strong>p95 Inter-Token Latency (ITL)</strong> — how smooth the stream feels token-to-token.</li>
                        <li><strong>Throughput / goodput</strong> — useful tokens per second across all users, not just one request.</li>
                        <li><strong>Error rate &amp; dropped requests</strong> — reliability under saturation.</li>
                        <li><strong>GPU efficiency</strong> — performance per GPU, so extra hardware has to earn its place.</li>
                    </ul>

                    <h4>Engineering Harness</h4>
                    <ul>
                        <li><strong>One-command deploy + benchmark runner</strong> that brings up the Modal app and runs the official load profile.</li>
                        <li><strong>Async streaming load tester</strong> that ramps concurrency and records per-request TTFT/ITL distributions (p50–p99).</li>
                        <li><strong>Local leaderboard scorer</strong> to compare serving configurations apples-to-apples.</li>
                    </ul>

                    <h4>What It Demonstrates</h4>
                    <ul>
                        <li>Reading production inference metrics and tracing a latency spike to a serving-config root cause.</li>
                        <li>Reasoning about the batching-vs-latency and concurrency-vs-tail trade-offs that define real LLM serving.</li>
                        <li>Defending a configuration with numbers — the difference between &quot;it works&quot; and &quot;it&apos;s tuned.&quot;</li>
                    </ul>
                </div>

                <p><strong>Tech Stack:</strong> vLLM, Modal, H100, Qwen3-VL-4B-Instruct, PagedAttention / KV-cache, continuous batching, prefix caching, chunked prefill, async load testing, Python</p>

                <a
                    href="https://github.com/iamchenchu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link">
                    View on GitHub
                </a>
            </div>
            <Project />
        </div>
    );
}
