# For agents

Profile, projects, and experience in one place for Codex, Claude Code, and other automated tools. Follow the source links for further details.

## Profile and research

Hi, I’m **Tianxing Ren.** I research AI compilers to help diverse AI algorithms run correctly and efficiently on emerging AI hardware, and to make programming easier for people and agents.

I’m a Doctor of Engineering student at Peking University, jointly trained with Zhongguancun Laboratory. I research AI compilers, tile-level programming, and heterogeneous computing, with an interest in programming languages and computer architecture.

My advisors are [Tao Xie](https://taoxiease.github.io/) and [Wei Yang](https://youngwei.com/) .

AI compilers, tile-level programming, and heterogeneous computing.

## Projects I lead

### [TileLang-TPU](https://tianxing-ren.netlify.app/projects/tilelang-tpu/)

Project lead

A TileLang backend for SOPHGO TPUs, from compile-time memory planning to executable kernels.

TileLang-TPU brings tile-level programming to commercial SOPHGO accelerators. Tiles are small blocks of data used to express a computation. The compiler handles on-chip memory placement, data movement and overlapping transfers with computation. Its just-in-time (JIT) runtime compiles Python kernel definitions and launches them on the BM1690.

Project stage
Milestone complete
Source availability
[Open source](https://github.com/TongmingLAIC/tilelang-tpu)

Evaluated on a single core of the SOPHGO BM1690, with input sizes fixed before compilation. The baseline is the vendor’s optimized PPL implementation used by Torch-TPU. PPL (Primitive Programming Language) is SOPHGO’s low-level programming language.

We evaluated matrix multiplication, RMSNorm, RoPE, SwiGLU and element-wise addition across multiple input configurations and numerical formats. RMSNorm rescales values, RoPE encodes sequence positions and SwiGLU applies a nonlinear neural-network transformation. Average speedups by operator category are **1.05–1.23×** over PPL.

TileLang-TPU also supports fused operators that combine multiple computation steps. FlashAttention efficiently computes model attention. After an algorithm optimization that processes multiple attention heads together in a batch (head-batched), it achieves an average speedup of **12.50×** over PPL. Attention heads are parallel computation branches that attend to different information.

For a fused MLP, a feed-forward neural network commonly used within AI models, the MLP W8A16 Dequantized Forward operator averages **1.01×** over PPL, essentially matching its performance. W8A16 uses 8-bit weights and 16-bit activations. Dequantization converts the stored low-precision weights into values used by the computation.

- [Speedup of five operator categories over PPL across five input configurations and three floating-point formats.](https://tianxing-ren.netlify.app/assets/tilelang-tpu-operators.png)

- [FlashAttention average speedup of 12.50 times and fused MLP average speedup of 1.01 times over PPL.](https://tianxing-ren.netlify.app/assets/tilelang-tpu-attention-mlp.png)

- **Static memory allocation** Plan where each data block sits in the chip’s fast local memory before the program runs, following the hardware’s placement rules and staying within its capacity.

- **Overlap transfers and computation** Arrange data transfers and computation into stages that can run in parallel, with each step starting only when its required data is ready.

- **Generate and run TPU code** Translate the computation into operations the TPU can execute, then compile, load and launch the program.

### [TileLang-RISC-V](https://tianxing-ren.netlify.app/projects/tilelang-riscv/)

Project lead

Bringing TileLang to RISC-V CPUs with AME matrix acceleration. An ongoing effort with open-source hardware and systems researchers.

This project is developing a TileLang backend for RISC-V AME AI CPUs, in collaboration with the Beijing Institute of Open Source Chip and the Institute of Software, Chinese Academy of Sciences. Current work focuses on connecting the programming model to target instructions and establishing a usable compilation and execution path.

Project stage
In progress
Source availability
Source code is not public
- **Programming model** Express common AI operators with tile-level programs and identify the information the backend needs.

- **Target integration** Connect compiler lowering, AME instruction mapping, and the execution environment.

- **Evaluation** Test operator correctness and performance across target configurations, and use the results to guide backend optimization.

Collaborating institutions

- [Beijing Institute of Open Source Chip](https://www.bosc.ac.cn/)

- [Institute of Software, Chinese Academy of Sciences](https://is.cas.cn/)

## I also contribute to these open-source projects

- [TileLang](https://github.com/tile-ai/tilelang)

- [Asterinas](https://github.com/asterinas/asterinas)

## Education

Sep 2025 – Jul 2030 · expected

### [Peking University](https://www.pku.edu.cn/)

Doctor of Engineering student · Electronic Information

[School of Software and Microelectronics](https://ss.pku.edu.cn/)

Joint doctoral training with Zhongguancun Laboratory.

My advisors are [Tao Xie](https://taoxiease.github.io/) and [Wei Yang](https://youngwei.com/) .

Sep 2021 – Jul 2025

### [Beihang University](https://www.buaa.edu.cn/)

Bachelor of Engineering · Cyberspace Security

[School of Cyber Science and Technology](https://cst.buaa.edu.cn/)

During my undergraduate studies, I collaborated with [Hua Guo](https://cst.buaa.edu.cn/info/1112/2741.htm) .

GPA **3.77 / 4.00** Average grade **90.41 / 100**

## Internships

Dec 2025 – Present

### [Beijing Tongming Lake IT Innovation Center](https://www.tlaic.ac.cn/)

Intelligent Systems Intern

- Adapting TileLang to the SOPHGO SG2260E TPU with RISC-V tensor extensions.

- Developing TileLang support for RISC-V CPUs with AME matrix acceleration.

Dec 2024 – Aug 2025

### [Beijing Institute of Open Source Chip](https://www.bosc.ac.cn/)

AI Systems Software Intern

- Extended the Triton compilation stack to SOPHGO TPUs through translation into the vendor toolchain.

- Built a TileLang-based operator compilation framework, including a TPU operator library, pipeline passes, and automatic code generation for operators used in LLaMA.

- Several operators matched or exceeded vendor-tuned implementations in the evaluated configurations.

Jul 2024 – Aug 2024

### [Eversec (Beijing) Technology Co., Ltd.](https://eversec.com.cn/)

Security Services Intern

- Assisted with authorized network security assessments using Burp Suite and related tools, organizing findings and identifying potential risks.

- Captured and standardized more than 100 industrial IoT login-traffic PCAP records with Wireshark.

## Honors & scholarships

2025–2026

Academic Excellence Scholarship

[Peking University](https://www.pku.edu.cn/)

2024–2025

Special Prize, Academic Competition Scholarship; Second Prize, Academic Excellence Scholarship

[Beihang University](https://www.buaa.edu.cn/)

2023–2024

Outstanding Student; Special Prize, Academic Competition Scholarship; Second Prize, Social Service Scholarship

[Beihang University](https://www.buaa.edu.cn/)

2022–2023

First Prize, Academic Competition Scholarship; Second Prize, Academic Excellence Scholarship

[Beihang University](https://www.buaa.edu.cn/)

## Visits

Jul 2024 – Aug 2024

### [The Chinese University of Hong Kong](https://www.cuhk.edu.hk/)

Summer School Visiting Student

## Tools for AI assistants

Read the profile and projects through MCP, or submit a short topic to find relevant documented work. The response includes sources, project roles and evaluation scope.

[Tool definitions](https://tianxing-ren.netlify.app/data/agent-tools.json)

```text
POST https://tianxing-ren.netlify.app/api/agent/query
Content-Type: application/json

{"topic":"RISC-V AME","language":"en"}

POST https://tianxing-ren.netlify.app/api/mcp
```

## Contact

For research collaboration, contact Tianxing Ren through the contact page or the linked GitHub profiles.

- [Get in touch](https://tianxing-ren.netlify.app/contact/)

- [GitHub / LeslinD](https://github.com/LeslinD)

- [GitHub / tianxingren-work](https://github.com/tianxingren-work)

## Direct access to files

- [`/llms.txt`](https://tianxing-ren.netlify.app/llms.txt)

- [`/llms-full.md`](https://tianxing-ren.netlify.app/llms-full.md)

- [`/data/agents.json`](https://tianxing-ren.netlify.app/data/agents.json)

- [`/data/profile.json`](https://tianxing-ren.netlify.app/data/profile.json)

- [`/data/projects.json`](https://tianxing-ren.netlify.app/data/projects.json)

- [`/data/routes.json`](https://tianxing-ren.netlify.app/data/routes.json)

- [`/data/agent-tools.json`](https://tianxing-ren.netlify.app/data/agent-tools.json)

- [`/openapi.json`](https://tianxing-ren.netlify.app/openapi.json)

- [`/machine/en/for-agents.md`](https://tianxing-ren.netlify.app/machine/en/for-agents.md)

- [`/machine/en/for-agents.json`](https://tianxing-ren.netlify.app/machine/en/for-agents.json)

- [`/machine/en/about.md`](https://tianxing-ren.netlify.app/machine/en/about.md)

- [`/machine/en/projects/tilelang-tpu.md`](https://tianxing-ren.netlify.app/machine/en/projects/tilelang-tpu.md)

- [`/machine/en/projects/tilelang-riscv.md`](https://tianxing-ren.netlify.app/machine/en/projects/tilelang-riscv.md)

Recognized AI tool requests receive Markdown automatically. Requests to the homepage receive this complete profile, and requests to other pages receive that page’s content. Select ?format=markdown, ?format=json, or ?format=html, or use the Accept header to request a format. The direct file links above are also available.

```text
GET /for-agents/?format=markdown
GET /api/agents
GET /api/profile
GET /api/projects
```

Available versions use the language codes en, zh, ko, and ms.

## Sources and project roles

When summarizing this work, cite the original project pages and include the hardware, baseline, and evaluation scope for performance results. Project stage and source availability are recorded separately. Projects I lead and projects I contribute to are listed with their respective roles.
