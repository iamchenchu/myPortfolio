import "./Inference.css";

const journey = [
    { year: "2019", label: "Production data pipelines (Spark / Kafka)" },
    { year: "2021", label: "Self-hosted LLM serving at scale (BYJU'S)" },
    { year: "2023", label: "M.S. AI · KV-cache & long-context research" },
    { year: "2024", label: "Frontier inference (vLLM, TensorRT-LLM)" },
    { year: "2025", label: "Agentic AI & LLMOps (Infosys)" },
];

const serveSteps = [
    {
        k: "Package",
        v: "Fine-tuned LLaMA / T5 / BERT wrapped into an inference container - a TorchServe .mar handler or a custom PyTorch image - with the tokenizer and pre/post-processing baked in.",
    },
    {
        k: "Host on GPU",
        v: "SageMaker real-time endpoints on ml.g5 / g4dn / p3 GPUs (bring-your-own-container), or SageMaker multi-model endpoints to pack many fine-tuned variants on one GPU - not a third-party text API.",
    },
    {
        k: "Batch",
        v: "Server-side dynamic batching (TorchServe / Triton) groups concurrent requests up to a max batch size and time window to keep the GPU saturated. This was the pre-continuous-batching era.",
    },
    {
        k: "Scale",
        v: "SageMaker endpoint autoscaling on invocations / GPU utilization adds instances under load; SQS absorbs bursts so nothing is dropped during peak class hours.",
    },
    {
        k: "Serve the path",
        v: "App to API Gateway to a FastAPI orchestration layer on ECS Fargate (retrieval, guardrails) to the SageMaker GPU endpoint + FAISS retrieval. CloudWatch for metrics, DynamoDB for feedback, Airflow for retrains.",
    },
];

const thenNow = [
    { then: "Static / dynamic batching", now: "Continuous (in-flight) batching" },
    { then: "Manual KV cache (TorchServe / Triton)", now: "PagedAttention (vLLM)" },
    { then: "FP16 serving", now: "FP8 / INT4 quantization (AWQ, GPTQ)" },
    { then: "TorchServe / Triton on SageMaker", now: "vLLM / TensorRT-LLM / SGLang" },
    { then: "Single GPU endpoint", now: "Tensor / pipeline parallelism" },
    { then: "Latency / throughput dashboards", now: "p95 TTFT / ITL / goodput-per-GPU" },
];

export default function Inference() {
    return (
        <section className="inference">
            <div className="inference-inner">
                <p className="section-kicker">// inference engineering</p>
                <h2 className="section-title">Serving models myself, not just calling an API</h2>
                <p className="inference-lead">
                    There are two ways to put an LLM in front of users. You can <strong>call a managed API</strong> and
                    let someone else run the model, or you can <strong>self-host</strong> the weights on your own GPUs and
                    own the batching, scaling, latency, and cost. I have done the second since 2021 - which is exactly the
                    surface an inference engineer is hired to optimize.
                </p>

                <div className="journey">
                    {journey.map((j) => (
                        <div className="journey-step" key={j.year}>
                            <span className="journey-year">{j.year}</span>
                            <span className="journey-label">{j.label}</span>
                        </div>
                    ))}
                </div>

                <div className="serve-compare">
                    <div className="serve-card">
                        <span className="serve-tag">Managed API call</span>
                        <p>Send text over HTTPS, a provider runs the model, pay per token.</p>
                        <ul>
                            <li>Zero infra to run</li>
                            <li>Data leaves your VPC</li>
                            <li>No control of batching, GPU, or tail latency</li>
                            <li>Cost scales with tokens, not utilization</li>
                        </ul>
                    </div>
                    <div className="serve-card serve-card--feature">
                        <span className="serve-tag">Self-hosted serving · what I do</span>
                        <p>Own the weights, run them on your GPUs, tune the serving.</p>
                        <ul>
                            <li>Data stays in-VPC (private, compliant)</li>
                            <li>Serve domain fine-tuned models with no public API</li>
                            <li>Control batching, KV cache, autoscaling, latency</li>
                            <li>Cost is per-GPU-hour - you optimize utilization</li>
                        </ul>
                    </div>
                </div>

                <h3 className="inference-subhead">How I self-served LLMs on AWS at BYJU'S (2021-2023)</h3>
                <ol className="serve-steps">
                    {serveSteps.map((s) => (
                        <li key={s.k}>
                            <span className="serve-step-k">{s.k}</span>
                            <span className="serve-step-v">{s.v}</span>
                        </li>
                    ))}
                </ol>
                <p className="inference-note">
                    Why self-host at BYJU'S: millions of private student requests had to stay in-VPC, the models were
                    domain fine-tuned LLaMA / T5 (no API existed for them), and at that scale owning the GPU was the only
                    way to control cost and latency.
                </p>

                <h3 className="inference-subhead">Same discipline, sharper tools - the progression</h3>
                <p className="inference-note">
                    The serving problem did not change; the tooling did. Everything I tuned by hand in 2023 has a faster,
                    more principled equivalent in the modern stack I work in now.
                </p>
                <div className="thennow">
                    <div className="thennow-head">
                        <span>Then · self-hosted on AWS (≤ 2023)</span>
                        <span>Now · frontier inference (2024+)</span>
                    </div>
                    {thenNow.map((row) => (
                        <div className="thennow-row" key={row.then}>
                            <span className="then">{row.then}</span>
                            <span className="thennow-arrow">→</span>
                            <span className="now">{row.now}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
