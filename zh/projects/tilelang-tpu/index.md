[返回项目](https://tianxingren-work.github.io/zh/projects/)

项目负责人

# TileLang-TPU

以 Tile 级编程，释放 TPU 性能。

阶段性完成 [开源](https://github.com/TongmingLAIC/tilelang-tpu)
TileLang SOPHGO TPU Compiler backends
[源代码](https://github.com/TongmingLAIC/tilelang-tpu) [联系我](https://tianxingren-work.github.io/zh/contact/)

项目概述

## 保留好用的编程抽象，让编译器承担硬件细节。

TileLang-TPU 将 Tile 级编程带到商用算能加速器，通过数据分块（Tile）来表达计算。编译器负责片上内存布局、数据搬运，以及搬运与计算的重叠。即时编译（JIT）运行时将 Python 中定义的算子编译并在 BM1690 上执行。

[](https://tianxingren-work.github.io/assets/tilelang-tpu-overview.png)
编译流程总览。复用的 TileLang 前端输出经 TPU 专用内存分配、流水线转换和后端映射处理，再由 JIT 运行时编译并启动生成的算子。

## 编译器设计

01

### 静态内存分配

在程序运行前安排每块数据在芯片内部快速内存中的位置，遵循硬件的放置要求，并避免超过容量。

02

### 重叠搬运与计算

把分块计算排成执行阶段，让数据搬运与计算并行，同时确保每一步需要的数据已经准备好。

03

### 生成代码并运行

把计算转换为 TPU 能执行的操作，并负责程序的编译、加载和运行。

## 性能评测

评测在算能 BM1690 单核上进行，输入形状在编译前确定。基线是算能 Torch-TPU 所用的厂商 PPL 优化实现。PPL（Primitive Programming Language）是厂商提供的底层编程语言。

项目评测了矩阵乘法、RMSNorm、RoPE、SwiGLU 和逐元素加法五类算子，覆盖多种输入配置和数据类型。RMSNorm 调整数值尺度，RoPE 表示序列位置，SwiGLU 完成神经网络中的非线性计算。各类算子相对 PPL 的平均加速为 **1.05–1.23×**。

[](https://tianxingren-work.github.io/assets/tilelang-tpu-operators.png)
独立算子评测。M0–M4 表示五组测试输入配置。BF16 和 FP16 是两种 16 位浮点格式，FP32 为 32 位浮点格式。1× 表示与 PPL 执行时间相同，数值越大越快。正文中的 1.05–1.23× 对应各类算子的平均值。左右滑动查看图表，点击图片可打开原图。

除了独立算子，TileLang-TPU 还支持把多个计算步骤合在一起的融合算子。FlashAttention 用于高效计算模型的注意力。经过多注意力头批处理（head-batched）算法优化后，其平均加速达到 **12.50×**。这种优化把关注不同信息的多个计算分支，也就是注意力头，放到同一批中处理。

在融合 MLP 工作负载上，W8A16 反量化前向算子的平均加速为 **1.01×**，与 PPL 实现基本持平。MLP（多层感知机）是模型中常见的前馈网络。W8A16 表示权重采用 8 位、激活值采用 16 位，反量化则把存储的低精度权重转换为计算所用的数值。

[](https://tianxingren-work.github.io/assets/tilelang-tpu-attention-mlp.png)
融合工作负载评测。FlashAttention 平均加速 12.50×，W8A16 MLP 平均加速 1.01×。左图的 B、H、S、D 分别表示批大小、注意力头数、序列长度和每个头的维度。右图的 M、H、I 表示输入行数、隐藏层宽度和中间层宽度，括号中的数值是所测输入规模。左右滑动查看图表，点击图片可打开原图。

## 代码与资料

[TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu)

## 你也在研究相关问题吗？

[打个招呼](https://tianxingren-work.github.io/zh/contact/)
