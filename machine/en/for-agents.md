# Tianxing Ren / 任天行

> AI compilers, Tile-level programming, Heterogeneous computing

https://tianxingren-work.github.io/for-agents/

Language: en. Updated: 2026-10-14.

## Profile and research

I research AI compilers so that diverse AI algorithms can run correctly and efficiently on emerging AI hardware. I aim to make programming easier for people and agents.

I’m a doctoral student in engineering at Peking University, in a joint program with Zhongguancun Laboratory. My research focuses on AI compilers, tile-level programming and heterogeneous computing, with related interests in programming languages and computer architecture.

[Prof. Tao Xie](https://taoxiease.github.io/) and [Prof. Wei Yang](https://youngwei.com/) supervise my doctoral research.

## Research Projects

### TileLang-TPU

Project lead

A TileLang compiler backend for writing high-performance Python kernels on SOPHGO TPUs.

TileLang-TPU lets developers write high-performance kernels for SOPHGO TPUs in Python. It retains TileLang’s tile abstraction, frontend and hardware-independent transformations and optimizations. A tile is a block of data used to describe computation. The compiler handles on-chip memory allocation, data transfers, compute pipeline scheduling and TPU instruction selection. Just-in-time (JIT) compilation connects the Python definitions to execution on the device. This lets developers write concise kernels without managing these low-level hardware details. In the tested workloads, performance matches or exceeds the vendor’s optimized implementations.

The project supports common deep learning operators on the SOPHGO BM1690 and has been evaluated on that chip. It can run kernels on real hardware and use the software simulator for debugging. Planned work includes testing complete large language model inference workloads and extending compilation to multiple cores.

Project stage: Milestone completed
Source availability: https://github.com/TongmingLAIC/tilelang-tpu

https://tianxingren-work.github.io/projects/tilelang-tpu/

Writing a fast TPU kernel requires more than describing the computation. It also requires deciding where data lives in on-chip memory, ordering transfers and computation, and calling the hardware instruction interfaces. TileLang-TPU reuses TileLang’s Python frontend, Tensor Intermediate Representation (TIR) and general compilation passes. A TPU-specific backend handles the hardware-dependent work.
Developers describe computation and data transfers with TileLang-TPU’s frontend operations. The current backend optimizes within a single core; it does not yet distribute work across cores. It also requires static input shapes, which are known at compile time. Dynamic-shape compilation is not yet supported.

The BM1690 compiler backend, JIT runtime and implementations of common large language model operators are in place. Supported operations include matrix multiplication, RMSNorm, RoPE, SwiGLU, element-wise addition and reductions, including operators used in LLaMA and DeepSeek inference.

Performance was evaluated on one core of the SOPHGO BM1690, comparing TileLang-TPU with the vendor’s optimized PPL implementations in the SOPHGO Torch-TPU operator library. Each comparison uses the same input shapes and data types, with shapes fixed at compile time. Measurements cover device-side kernel execution time. PPL (Primitive Programming Language) is SOPHGO’s kernel programming language.

Average speedups over PPL are **1.14×** for matrix multiplication, **1.23×** for RMSNorm, **1.08×** for RoPE, **1.11×** for SwiGLU and **1.05×** for element-wise addition. All five operator categories are faster on average. The effective lines of code in the kernel implementations are reduced by **44.85%** relative to PPL. These results show that the tile abstraction can express kernels more concisely while matching or exceeding the vendor library’s performance in the tested workloads.

TileLang-TPU also supports fused kernels, which combine several computation steps. For FlashAttention, an attention kernel used in large language models, the implementation achieves an average speedup of **1.36×** over the vendor’s PPL implementation under the same algorithmic formulation.

For the MLP W8A16 Dequantized Forward workload, the average speedup over PPL is **1.01×** across the tested configurations, essentially matching the baseline. MLP is the model’s feed-forward network. W8A16 means 8-bit weights and 16-bit activations; dequantization converts stored low-precision weights into values used for computation.

- On-chip memory management: An automatic address allocation algorithm follows the TPU’s on-chip memory architecture. The compiler analyzes tensor lifetimes from shapes, data types and read/write relationships. Tensors with non-overlapping lifetimes can share storage. Tensors read at the same time are placed in different memory banks where possible to reduce access conflicts.
- Transfer and compute pipelining: The compiler analyzes data dependencies between execution units and uses the developer’s requested pipeline depth to organize loads, computation and stores in tiled loops. It schedules the GDMA data-transfer unit alongside the TIU compute unit, preparing later tiles while the current tile is processed. This allows fine-grained overlap between data transfers and computation.
- Hardware instruction mapping: Common operations, including data copies and transfers, matrix multiplication, element-wise computation and reductions such as sums and maxima, are translated into TPU-Kernel hardware instruction calls. The compiler supplies shapes, strides, addresses and data types to generate device code.
- Compilation and execution from Python: JIT compilation generates the device program and host-side calling code, then compiles, loads and launches the kernel. It supports both execution on a physical TPU over PCIe and debugging with the cmodel software simulator.

### TileLang-RISC-V

Project lead

Bringing TileLang to RISC-V CPUs with AME matrix acceleration. An ongoing effort with open-source hardware and systems researchers.

This project is developing a TileLang backend for RISC-V AME AI CPUs, in collaboration with the Beijing Institute of Open Source Chip and the Institute of Software, Chinese Academy of Sciences. Current work focuses on connecting the programming model to target instructions and establishing a usable compilation and execution path.

Project stage: In progress
Source availability: Source code is not public

https://tianxingren-work.github.io/projects/tilelang-riscv/

- Programming model: Express common AI operators with tile-level programs and identify the information the backend needs.
- Target integration: Connect compiler lowering, AME instruction mapping, and the execution environment.
- Evaluation: Test operator correctness and performance across target configurations, and use the results to guide backend optimization.

## Open-source contributions

- [TileLang](https://github.com/tile-ai/tilelang) — contributor
- [Asterinas](https://github.com/asterinas/asterinas) — contributor

## Education

- Peking University, Doctor of Engineering student, Electronic Information. Sep 2025 – Jul 2030 · expected
- Beihang University, Bachelor of Engineering, Cyberspace Security. Sep 2021 – Jul 2025
  GPA 3.77 / 4.0. Average score 90.41 / 100

During my undergraduate studies, I conducted research primarily under the guidance of [Prof. Hua Guo](https://cst.buaa.edu.cn/info/1112/2741.htm) . I completed an area-efficient FPGA implementation of an algebraic lattice cryptography suite, which received Third Prize in the National Cryptography Technology Competition. I also completed a cloud-service key-protection mechanism based on secure multiparty computation, which received First Prize in the National College Student Information Security Competition.

## Internships

### Beijing Tongming Lake IT Innovation Center

Dec 2025 – Present. Intelligent Systems Intern

- Adapting TileLang to the SOPHGO SG2260E TPU with RISC-V tensor extensions.
- Developing TileLang support for RISC-V CPUs with AME matrix acceleration.

### Beijing Institute of Open Source Chip

Dec 2024 – Aug 2025. AI Systems Software Intern

- Extended the Triton compilation stack to SOPHGO TPUs through translation into the vendor toolchain.
- Built a TileLang-based operator compilation framework, including a TPU operator library, pipeline passes, and automatic code generation for operators used in LLaMA.
- Several operators matched or exceeded vendor-tuned implementations in the evaluated configurations.

### Eversec (Beijing) Technology Co., Ltd.

Jul 2024 – Aug 2024. Security Services Intern

- Assisted with authorized network security assessments using Burp Suite and related tools, organizing findings and identifying potential risks.
- Captured and standardized more than 100 industrial IoT login-traffic PCAP records with Wireshark.

## Honors & scholarships

- 2025–2026: Academic Excellence Scholarship
- 2024–2025: Special Prize, Academic Competition Scholarship; Second Prize, Academic Excellence Scholarship
- 2023–2024: Outstanding Student; Special Prize, Academic Competition Scholarship; Second Prize, Social Service Scholarship
- 2022–2023: First Prize, Academic Competition Scholarship; Second Prize, Academic Excellence Scholarship

## Visits

- The Chinese University of Hong Kong. Summer School Visiting Student. Jul 2024 – Aug 2024

## Contact

Contact details include a readable public email address and GitHub links. Research discussions about AI compilers, emerging AI hardware and related systems are welcome.

Email: tianxingren25 [at] stu [dot] pku [dot] edu [dot] cn
https://tianxingren-work.github.io/contact/
https://github.com/LeslinD
https://github.com/tianxingren-work

## Reading formats

Use the file links below to read the complete profile, contact details and project records in Markdown or JSON.

- Markdown: https://tianxingren-work.github.io/machine/en/for-agents.md
- JSON: https://tianxingren-work.github.io/machine/en/for-agents.json
- Contact JSON: https://tianxingren-work.github.io/data/contact.json
