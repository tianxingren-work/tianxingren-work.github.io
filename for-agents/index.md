# Tianxing Ren / 任天行

> AI compilers, Tile-level programming, Heterogeneous computing

https://tianxingren-work.github.io/for-agents/

Language: en. Updated: 2026-10-14.

## Profile and research

I research AI compilers so that diverse AI algorithms can run correctly and efficiently on emerging AI hardware. I aim to make programming easier for people and agents.

I’m a Doctor of Engineering student at Peking University, jointly trained with Zhongguancun Laboratory. I research AI compilers, tile-level programming, and heterogeneous computing, with an interest in programming languages and computer architecture.

[Prof. Tao Xie](https://taoxiease.github.io/) and [Prof. Wei Yang](https://youngwei.com/) supervise my doctoral research.

## Projects I lead

### TileLang-TPU

Project lead

A TileLang backend for SOPHGO TPUs, from compile-time memory planning to executable kernels.

TileLang-TPU brings tile-level programming to commercial SOPHGO accelerators. Tiles are small blocks of data used to express a computation. The compiler handles on-chip memory placement, data movement and overlapping transfers with computation. Its just-in-time (JIT) runtime compiles Python kernel definitions and launches them on the BM1690.

Project stage: Milestone complete
Source availability: https://github.com/TongmingLAIC/tilelang-tpu

https://tianxingren-work.github.io/projects/tilelang-tpu/

Evaluated on a single core of the SOPHGO BM1690, with input sizes fixed before compilation. The baseline is the vendor’s optimized PPL implementation used by Torch-TPU. PPL (Primitive Programming Language) is SOPHGO’s low-level programming language.

We evaluated matrix multiplication, RMSNorm, RoPE, SwiGLU and element-wise addition across multiple input configurations and numerical formats. RMSNorm rescales values, RoPE encodes sequence positions and SwiGLU applies a nonlinear neural-network transformation. Average speedups by operator category are **1.05–1.23×** over PPL.

TileLang-TPU also supports fused operators that combine multiple computation steps. FlashAttention efficiently computes model attention. After an algorithm optimization that processes multiple attention heads together in a batch (head-batched), it achieves an average speedup of **12.50×** over PPL. Attention heads are parallel computation branches that attend to different information.

For a fused MLP, a feed-forward neural network commonly used within AI models, the MLP W8A16 Dequantized Forward operator averages **1.01×** over PPL, essentially matching its performance. W8A16 uses 8-bit weights and 16-bit activations. Dequantization converts the stored low-precision weights into values used by the computation.

- Static memory allocation: Plan where each data block sits in the chip’s fast local memory before the program runs, following the hardware’s placement rules and staying within its capacity.
- Overlap transfers and computation: Arrange data transfers and computation into stages that can run in parallel, with each step starting only when its required data is ready.
- Generate and run TPU code: Translate the computation into operations the TPU can execute, then compile, load and launch the program.

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

## I also contribute to these open-source projects

- [TileLang](https://github.com/tile-ai/tilelang) — contributor
- [Asterinas](https://github.com/asterinas/asterinas) — contributor

## Education

- Peking University, Doctor of Engineering student, Electronic Information. Sep 2025 – Jul 2030 · expected
- Beihang University, Bachelor of Engineering, Cyberspace Security. Sep 2021 – Jul 2025
  GPA 3.77 / 4.0. Average grade 90.41 / 100

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

Read the Markdown and JSON files directly; no backend connection is needed. The complete profile and each project page have their own files.

- Markdown: https://tianxingren-work.github.io/machine/en/for-agents.md
- JSON: https://tianxingren-work.github.io/machine/en/for-agents.json
- Contact JSON: https://tianxingren-work.github.io/data/contact.json
