// src/pages/MLA.js
import React from "react";
import algorithm from "../../../assets/Project/algorithm.webp";
import "./comman.css";
import Project from "../project";

export default function MLA() {
    return (
        <div className="project-container">
            <div className="project-detail">
                <h2>Sliding-Window MLA - Latent KV Compression Meets Local Attention</h2>

                <p>
                    <strong>Sliding-Window MLA</strong> is a research project on the central bottleneck of long-context LLM
                    inference: the <strong>KV cache</strong>. As context grows, a full-attention cache grows with it and dominates
                    memory and per-token latency. The idea here is to make that cache <em>bounded</em> without losing the long-range
                    facts that long context is supposed to buy you.
                </p>

                <img src={algorithm} alt="Sliding-Window MLA - bounded KV cache" className="projectImg" />

                <h3>Measured Cache Model</h3>
                <div className="tech-stack">
                    <p>
                        At a small-model config (d_model 512; 8 heads / 8 layers; latent d_c 64; decoupled-RoPE 32;
                        window 128; 4 anchors; bf16), MLA alone cuts bytes-per-token to <strong>192 B</strong> vs 2048 B
                        for full attention (10.7× smaller). Adding the window + anchors makes the <em>total</em> cache
                        flat as context grows:
                    </p>
                    <ul>
                        <li>At <strong>8K</strong> tokens: full attn 128 MB · full MLA 12 MB · GQA+window 512 KB · <strong>SWA-MLA 198 KB</strong></li>
                        <li>At <strong>64K</strong> tokens: full attn 1.0 GB · full MLA 96 MB · GQA+window 512 KB · <strong>SWA-MLA 198 KB</strong></li>
                        <li>At <strong>1M</strong> tokens: full attn 15.3 GB · full MLA 1.4 GB · <strong>SWA-MLA 198 KB (~81,000× smaller than full attention)</strong></li>
                    </ul>
                </div>

                <h3>The Core Idea</h3>
                <div className="tech-stack">
                    <ul>
                        <li><strong>MLA (Multi-Head Latent Attention, DeepSeek-V2):</strong> compress each token&apos;s key/value into a small shared latent vector, so every cached token costs far less memory.</li>
                        <li><strong>Sliding-window local attention:</strong> bound <em>how many</em> recent tokens you keep, turning an O(context) cache into an O(window) rolling buffer.</li>
                        <li><strong>A few global latent anchors:</strong> keep a small set of distant tokens reachable so the window doesn&apos;t throw away long-range information.</li>
                        <li><strong>Combine them:</strong> latent compression shrinks each token, the window bounds the count, and anchors restore long-range recall - cheap long context at an <code>O(window + anchors)</code> cache.</li>
                    </ul>

                    <h4>Research Questions</h4>
                    <ul>
                        <li><strong>RQ1 - Quality at bounded memory:</strong> can sliding-window latent KV + global anchors match full-MLA quality while bounding the cache, beating GQA-plus-sliding-window and sparse attention at <em>equal memory</em>?</li>
                        <li><strong>RQ2 - Anchors:</strong> how many anchors, and of which kind (learned, attention-sink, or retrieval-selected), are needed to preserve the long-range retrieval a pure window loses - and how does the optimal window/anchor split shift with context length?</li>
                        <li><strong>RQ3 - Efficiency profile:</strong> what is the per-token latency and memory profile versus full MLA and full attention as context grows, and where is the quality-vs-efficiency Pareto knee?</li>
                    </ul>

                    <h4>What&apos;s Implemented</h4>
                    <ul>
                        <li><strong>Decoupled-RoPE MLA block</strong> - the latent-KV attention with rotary handled on a separate path.</li>
                        <li><strong>Three anchor policies</strong> - attention-sink, learned, and retrieval-selected anchors, swappable for ablation.</li>
                        <li><strong>Baselines</strong> - full attention, GQA + sliding window, and sparse attention, for equal-memory comparison.</li>
                        <li><strong>Cache + latency instrumentation</strong> - logs rolling-buffer + anchor cache size and per-token latency so the bounded-vs-growing curve is measurable.</li>
                        <li><strong>Reproducible harness</strong> - an offline smoke path that runs anywhere (tiny synthetic data, full test suite), with hooks to swap in the real corpus and benchmarks.</li>
                    </ul>

                    <h4>Benchmarks &amp; Metrics</h4>
                    <ul>
                        <li><strong>Quality:</strong> language-model perplexity, RULER, needle-in-a-haystack, LongBench.</li>
                        <li><strong>Efficiency:</strong> KV-cache size (rolling buffer + anchors), per-token latency / throughput, long-range retrieval accuracy.</li>
                        <li><strong>Target:</strong> match full-MLA quality at a bounded cache while beating GQA-plus-sliding-window on distant retrieval.</li>
                    </ul>

                    <h4>Status</h4>
                    <ul>
                        <li>Milestone 1 (12-paper literature matrix, the measured cache model, and the evaluation plan) and the Milestone 2 architecture (decoupled-RoPE MLA, three anchor policies, and baselines) are <strong>complete and unit-tested (51 tests)</strong>. The quality benchmarks above are the <strong>next milestone</strong> - matched-parameter training, then RULER / LongBench / needle-in-a-haystack.</li>
                    </ul>

                    <h4>Why It Matters for Inference</h4>
                    <ul>
                        <li>KV cache is the memory and latency wall of long-context serving - shrinking it directly raises how many users and how long a context a single GPU can serve.</li>
                        <li>It connects an architecture choice (attention design) to a serving outcome (cache size, tokens/sec), which is exactly the seam between modeling and inference engineering.</li>
                    </ul>
                </div>

                <p><strong>Tech Stack:</strong> PyTorch, Multi-Head Latent Attention (MLA), decoupled RoPE, sliding-window attention, global anchors, RULER, LongBench, perplexity, KV-cache profiling</p>

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
