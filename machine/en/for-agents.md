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

TileLang-TPU brings tile-level programming to commercial SOPHGO accelerators. It preserves the TileLang programming model and turns on-chip memory placement, data movement, and transfer–compute overlap into compiler decisions. The compiler and JIT runtime provide an end-to-end path from a Python kernel definition to execution on BM1690.

Project stage
Milestone complete
Source availability
[Open source](https://github.com/TongmingLAIC/tilelang-tpu)

Five kernels × five input shapes × three data types on one SOPHGO BM1690 card. Average speedup over PPL uses TPU kernel execution latency; compilation and host execution are outside this timing.

- 1.10× average speedup over PPL

- 71 / 75 configurations faster than PPL

- BF16 · FP16 · FP32

Both implementations use the same operator semantics, shapes, data types, and vendor compilation toolchain. Each case uses five warm-up runs and ten timed repetitions. The reported set includes 71 faster cases, one tie, and three slower cases.

- **Static memory allocation** Assign concrete local-memory offsets at compile time, accounting for alignment, capacity, and memory-bank placement.

- **Structured pipeline lowering** Turn tiled loops into explicit execution stages so that data transfers can overlap with computation while preserving dependencies.

- **Backend mapping and runtime** Generate TPU kernel API calls and connect the output to host/device compilation, linking, loading, and launch.

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
