[返回项目](https://tianxingren-work.github.io/zh/projects/)

项目负责人

# TileLang-TPU

用 Python 编写运行在算能 TPU 上的高性能算子

阶段性完成 [开源](https://github.com/TongmingLAIC/tilelang-tpu)

## 简介

[TileLang-TPU](https://devcom.tlaic.ac.cn/news/a0d8aa85-a439-499c-9da9-68ebeec3c04b) 让开发者能够用 Python 编写运行在算能 TPU 上的高性能算子。项目沿用 TileLang 的 Tile 抽象、前端设计，以及硬件无关的转换与优化。Tile 是用于描述计算的数据块。编译器负责片上内存分配、数据搬运、计算流水调度和 TPU 指令选择，并通过即时编译（JIT）将 Python 中定义的算子编译到设备上运行。开发者无需手动处理这些底层硬件细节，就能用更简洁的代码实现算子。在已测试的工作负载中，生成算子的性能与厂商优化实现持平或更优。

目前，项目已在算能 BM1690 芯片上支持深度学习常用算子，并完成性能测试，支持在芯片上运行和在软件模拟器上仿真调试。后续计划测试完整的大模型推理任务，并向多核协同扩展。

## 项目架构

在算能 TPU 上开发高性能算子，既要描述计算内容，也要安排数据在片上内存中的位置、数据搬运与计算的执行顺序，以及底层硬件指令接口的调用。TileLang-TPU 复用 TileLang 的 Python 前端、张量中间表示（TIR）和通用编译处理，增加 TPU 专用后端，将这些硬件相关的工作交给编译器。

开发者只需描述计算和数据搬运，并使用 TileLang-TPU 的前端操作接口实现。当前后端仅在单核范围内优化，尚未支持多核之间的任务分工。另外，目前只支持静态形状编译，即输入形状需要在编译时确定，暂不支持动态形状。

[](https://tianxingren-work.github.io/assets/tilelang-tpu-overview-zh.png)
图 1　TileLang-TPU 的编译与运行流程。复用 TileLang 前端，在专用后端完成内存分配、流水调度和硬件接口映射，通过 JIT 运行时连接 Python 与 TPU 执行。图中的 LMEM 指片上局部内存，Bank 指存储分区，DMA 指数据搬运，Intrinsics 指映射到硬件调用的编译器内建操作。 [查看原图](https://tianxingren-work.github.io/assets/tilelang-tpu-overview-zh.png)

## 核心功能

-

### 片上内存管理

项目根据 TPU 的片上存储架构设计了自动地址分配算法。编译器根据张量形状、数据类型及读写关系分析存活范围，对使用时间不重叠的张量复用存储空间，并尽量将同时读取的张量分配到不同存储分区，减少访存冲突。

-

### 搬运与计算流水

编译器分析不同计算单元的数据依赖关系，根据用户设置的流水级数，将分块循环中的数据加载、计算和写回组织为流水线，安排 GDMA 数据搬运单元与 TIU 计算单元并行执行。在计算当前数据块时，同时准备后续数据块，让搬运与计算尽可能细粒度地重叠。

-

### 硬件指令映射

编译器将数据复制与搬运、矩阵乘法、逐元素计算，以及求和、取最大值等归约操作转换为 TPU-Kernel 硬件指令调用，补齐数据形状、步长、地址和类型，生成设备端代码。

-

### Python 编译与调用

即时编译（JIT）自动生成设备程序和主机调用代码，完成编译、加载和设备调用，支持通过 PCIe 在真机上运行，以及使用 cmodel 软件模拟器仿真调试。

## 已完成的工作与效果

项目已实现面向算能 BM1690 的编译后端、JIT 运行支持和大模型常用算子，包括矩阵乘法、RMSNorm、RoPE、SwiGLU、逐元素加法和归约等，已支持 LLaMA 和 DeepSeek 推理所用算子。

性能评测在算能 BM1690 单核上进行。项目在相同输入形状和数据类型下，将 TileLang-TPU 与算能 Torch-TPU 算子库中的厂商 PPL 优化实现对比，统计设备端算子执行时间。所测输入形状在编译时确定。PPL（Primitive Programming Language）是算能提供的算子编程语言。

矩阵乘法、RMSNorm、RoPE、SwiGLU 和逐元素加法五类算子的平均加速比分别为 **1.14×**、**1.23×**、**1.08×**、**1.11×** 和 **1.05×**，平均性能均优于厂商 PPL 实现。算子实现部分的有效代码行数相比 PPL 减少了 **44.85%**。这些结果表明，在所测工作负载中，TileLang-TPU 能用更简洁的抽象表达出性能与厂商算子库持平或更优的算子。

RMSNorm 用于归一化激活值的尺度，RoPE 用于表示词元的位置，SwiGLU 是前馈层使用的一种门控激活函数。BF16 和 FP16 是两种 16 位浮点格式，FP32 为 32 位浮点格式。

[](https://tianxingren-work.github.io/assets/tilelang-tpu-operators.png)
图 2　TPU 上五类代表性算子相对厂商 PPL 实现的加速比。横轴为输入形状，纵轴为加速比，大于 1 表示 TileLang-TPU 更快。M0–M4 分别对应 (64,64)、(128,128)、(256,256)、(512,512) 和 (1024,1024)。矩阵乘法中 K = M = N。 [查看原图](https://tianxingren-work.github.io/assets/tilelang-tpu-operators.png)

除了独立算子，TileLang-TPU 还支持将多个计算步骤合在一起的融合算子。对于大模型中的核心注意力算子 FlashAttention，在相同的算法表达下，TileLang-TPU 相比厂商 PPL 实现取得了 **1.36×** 的平均加速。

对于 W8A16 反量化 MLP 前向计算（MLP W8A16 Dequantized Forward），TileLang-TPU 在所测配置下相对 PPL 的平均加速比为 **1.01×**，总体性能基本持平。MLP 是模型中的前馈网络。W8A16 表示权重采用 8 位、激活值采用 16 位，反量化将存储的低精度权重转换为计算所用的数值。

[](https://tianxingren-work.github.io/assets/tilelang-tpu-attention-mlp-zh.png)
图 3　TPU 上两种融合算子相对厂商 PPL 实现的加速比。FlashAttention 平均为 1.36×，MLP Forward W8A16 平均为 1.01×。左图 B、H、S、D 分别为批大小、注意力头数、序列长度和每个头的维度，右图 M、H、I 分别为输入行数、隐藏层宽度和中间层宽度。 [查看原图](https://tianxingren-work.github.io/assets/tilelang-tpu-attention-mlp-zh.png)

## 项目价值

**TileLang-TPU 为专用 AI 芯片接入开放的算子编程生态提供了一种技术路径。**本项目以算能 TPU 为适配目标，复用 TileLang 的编程接口与通用编译组件，将芯片特有的内存管理、数据搬运和硬件调用纳入专用后端。这有助于减少新兴芯片建设算子编程体系时的重复投入，让芯片厂商能够借助开放社区的编程工具、算子实现和编译技术，建设高性能、易用的 AI 软件生态。算子开发者可以沿用熟悉的 Tile 级表达参与新硬件开发，也能继续针对芯片特点优化算法与性能。

**作为开源项目，TileLang-TPU 为国内外 AI 芯片厂商、编译系统研究团队和大模型开发团队提供了共同的合作基础。**项目期待与社区围绕新硬件架构接入、复杂算子优化和不同模型的硬件加速开展合作，让编译与算法的优化经验成为可复用、可扩展的公共成果，推动更多 AI 芯片参与开放生态，并为用户提供更丰富的开发选择。

## 相关链接

[源代码 · TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu)
