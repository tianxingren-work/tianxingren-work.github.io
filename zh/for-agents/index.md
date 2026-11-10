# Tianxing Ren / 任天行

> AI compilers, Tile-level programming, Heterogeneous computing

https://tianxingren-work.github.io/zh/for-agents/

Language: zh. Updated: 2026-10-14.

## 个人简介与研究

我研究 AI 编译器，希望能让各种 AI 算法正确和高效地运行在新兴 AI 硬件上，让人和 Agent 更容易地编程。

我在北京大学攻读工程博士，与中关村实验室联合培养。我研究 AI 编译器、Tile 级编程与异构计算，也关注相关的编程语言和计算机体系结构问题。

我在[谢涛教授](https://taoxiease.github.io/) 和[杨威教授](https://youngwei.com/) 的指导下开展博士阶段的研究。

## 我主导的项目

### TileLang-TPU

项目负责人

面向算能 TPU 的 TileLang 编译后端，用 Python 编写高性能算子。

TileLang-TPU 让开发者能够用 Python 编写运行在算能 TPU 上的高性能算子。项目沿用 TileLang 的 Tile 抽象、前端设计，以及硬件无关的转换与优化。Tile 是用于描述计算的数据块。编译器负责片上内存分配、数据搬运、计算流水调度和 TPU 指令选择，并通过即时编译（JIT）将 Python 中定义的算子编译到设备上运行。开发者无需手动处理这些底层硬件细节，就能用更简洁的代码实现算子。在已测试的工作负载中，生成算子的性能与厂商优化实现持平或更优。

目前，项目已在算能 BM1690 芯片上支持深度学习常用算子，并完成性能测试，支持在芯片上运行和在软件模拟器上仿真调试。后续计划测试完整的大模型推理任务，并向多核协同扩展。

项目阶段: 阶段性完成
源码情况: https://github.com/TongmingLAIC/tilelang-tpu

https://tianxingren-work.github.io/zh/projects/tilelang-tpu/

在算能 TPU 上开发高性能算子，既要描述计算内容，也要安排数据在片上内存中的位置、数据搬运与计算的执行顺序，以及底层硬件指令接口的调用。TileLang-TPU 复用 TileLang 的 Python 前端、张量中间表示（TIR）和通用编译处理，增加 TPU 专用后端，将这些硬件相关的工作交给编译器。
开发者只需描述计算和数据搬运，并使用 TileLang-TPU 的前端操作接口实现。当前后端仅在单核范围内优化，尚未支持多核之间的任务分工。另外，目前只支持静态形状编译，即输入形状需要在编译时确定，暂不支持动态形状。

项目已实现面向算能 BM1690 的编译后端、JIT 运行支持和大模型常用算子，包括矩阵乘法、RMSNorm、RoPE、SwiGLU、逐元素加法和归约等，已支持 LLaMA 和 DeepSeek 推理所用算子。

性能评测在算能 BM1690 单核上进行。项目在相同输入形状和数据类型下，将 TileLang-TPU 与算能 Torch-TPU 算子库中的厂商 PPL 优化实现对比，统计设备端算子执行时间。所测输入形状在编译时确定。PPL（Primitive Programming Language）是算能提供的算子编程语言。

矩阵乘法、RMSNorm、RoPE、SwiGLU 和逐元素加法五类算子的平均加速比分别为 **1.14×**、**1.23×**、**1.08×**、**1.11×** 和 **1.05×**，平均性能均优于厂商 PPL 实现。算子实现部分的有效代码行数相比 PPL 减少了 **44.85%**。这些结果表明，在所测工作负载中，TileLang-TPU 能用更简洁的抽象表达出性能与厂商算子库持平或更优的算子。

除了独立算子，TileLang-TPU 还支持将多个计算步骤合在一起的融合算子。对于大模型中的核心注意力算子 FlashAttention，在相同的算法表达下，TileLang-TPU 相比厂商 PPL 实现取得了 **1.36×** 的平均加速。

对于 W8A16 反量化 MLP 前向计算（MLP W8A16 Dequantized Forward），TileLang-TPU 在所测配置下相对 PPL 的平均加速比为 **1.01×**，总体性能基本持平。MLP 是模型中的前馈网络。W8A16 表示权重采用 8 位、激活值采用 16 位，反量化将存储的低精度权重转换为计算所用的数值。

- 片上内存管理: 项目根据 TPU 的片上存储架构设计了自动地址分配算法。编译器根据张量形状、数据类型及读写关系分析存活范围，对使用时间不重叠的张量复用存储空间，并尽量将同时读取的张量分配到不同存储分区，减少访存冲突。
- 搬运与计算流水: 编译器分析不同计算单元的数据依赖关系，根据用户设置的流水级数，将分块循环中的数据加载、计算和写回组织为流水线，安排 GDMA 数据搬运单元与 TIU 计算单元并行执行。在计算当前数据块时，同时准备后续数据块，让搬运与计算尽可能细粒度地重叠。
- 硬件指令映射: 编译器将数据复制与搬运、矩阵乘法、逐元素计算，以及求和、取最大值等归约操作转换为 TPU-Kernel 硬件指令调用，补齐数据形状、步长、地址和类型，生成设备端代码。
- Python 编译与调用: 即时编译（JIT）自动生成设备程序和主机调用代码，完成编译、加载和设备调用，支持通过 PCIe 在真机上运行，以及使用 cmodel 软件模拟器仿真调试。

### TileLang-RISC-V

项目负责人

将 TileLang 接入具有 AME 矩阵加速能力的 RISC-V CPU，与开源硬件和系统研究团队共同推进。

项目面向 RISC-V AME AI CPU 开发 TileLang 后端，与北京开源芯片研究院和中国科学院软件研究所合作。当前重点是完成编程模型与目标指令的对应，建立可用的编译和执行流程。

项目阶段: 进行中
源码情况: 源码暂未公开

https://tianxingren-work.github.io/zh/projects/tilelang-riscv/

- 编程模型: 使用 Tile-level 程序表达常用 AI 算子，明确后端所需信息。
- 目标平台接入: 衔接编译转换、AME 指令映射和执行环境。
- 实验评估: 测试不同目标配置下的算子正确性与性能，并据此优化后端。

## 我参与的开源项目

- [TileLang](https://github.com/tile-ai/tilelang) — contributor
- [Asterinas](https://github.com/asterinas/asterinas) — contributor

## 教育经历

- 北京大学, 工程博士研究生, 电子信息. 2025.09 – 2030.07 · 预计
- 北京航空航天大学, 工学学士, 网络空间安全. 2021.09 – 2025.07
  GPA 3.77 / 4.0. 平均成绩 90.41 / 100

本科期间，我主要在[郭华教授](https://cst.buaa.edu.cn/info/1127/2337.htm) 的指导下开展研究。我完成了低面积代数格密码套件的 FPGA 实现，项目获全国密码技术竞赛三等奖。我还完成了基于安全多方计算的云服务密钥保护机制，项目获全国大学生信息安全竞赛一等奖。

## 实习经历

### 北京通明湖信息技术应用创新中心

2025.12 – 至今. 智能系统部实习生

- 将 TileLang 对接到采用 RISC-V Tensor 扩展的算能 SG2260E TPU。
- 开发 TileLang 对 RISC-V AME 矩阵加速 CPU 的支持。

### 北京开源芯片研究院

2024.12 – 2025.08. AI 系统软件栈研发实习生

- 通过转译衔接算能 TPU 编译工具链，扩展 Triton 编译栈以运行 Triton 生态程序。
- 基于 TileLang 构建异构芯片算子编译框架，开发 TPU 算子库、流水线 Pass 和自动代码生成，支持 LLaMA 所用算子。
- 在已测试的配置中，多个算子性能达到或超过厂商调优实现。

### 恒安嘉新（北京）科技股份公司

2024.07 – 2024.08. 安全服务实习生

- 使用 Burp Suite 等工具参与经授权的网络安全评估，整理扫描结果并初步识别风险。
- 使用 Wireshark 收集并标准化处理 100 余项工业物联网设备登录 PCAP 流量记录。

## 荣誉与奖学金

- 2025–2026: 学习优秀奖学金
- 2024–2025: 学科竞赛奖学金特等奖；学习优秀奖学金二等奖
- 2023–2024: 校级三好学生；学科竞赛奖学金特等奖；社会工作优秀奖学金二等奖
- 2022–2023: 学科竞赛奖学金一等奖；学习优秀奖学金二等奖

## 访问

- 香港中文大学. 暑期学校访学学生. 2024.07 – 2024.08

## 联系

联系信息可直接读取，包含公开邮箱写法和 GitHub 链接。欢迎就 AI 编译器、新兴 AI 硬件和相关系统研究交流。

邮箱: tianxingren25 [at] stu [dot] pku [dot] edu [dot] cn
https://tianxingren-work.github.io/zh/contact/
https://github.com/LeslinD
https://github.com/tianxingren-work

## 读取方式

下方链接提供个人资料、联系信息和项目记录的 Markdown 或 JSON 版本，可直接读取。

- Markdown: https://tianxingren-work.github.io/machine/zh/for-agents.md
- JSON: https://tianxingren-work.github.io/machine/zh/for-agents.json
- Contact JSON: https://tianxingren-work.github.io/data/contact.json
