[返回项目](https://tianxing-ren.netlify.app/zh/projects/)

项目负责人

# TileLang-TPU

以 Tile 级编程，释放 TPU 性能。

阶段性完成 [开源](https://github.com/TongmingLAIC/tilelang-tpu)
TileLang SOPHGO TPU Compiler backends
[源代码](https://github.com/TongmingLAIC/tilelang-tpu) [联系我](https://tianxing-ren.netlify.app/zh/contact/)

真实硬件上的效果

## 更高层的表达， 有竞争力的算子性能。

**1.10×**

相对 PPL 的平均加速比

**71 / 75**

组配置快于 PPL

**3**

评测数据类型

BF16 · FP16 · FP32

在单张 SOPHGO BM1690 上测试 5 种算子、5 组形状和 3 种数据类型。平均加速比以 PPL 为基线，仅统计 TPU 算子执行时间，不含编译及主机端执行时间。

评测配置

两种实现采用相同的算子语义、形状、数据类型和厂商编译工具链。每组配置预热 5 次，计时 10 次并取平均。其中 71 组更快，1 组持平，3 组较慢。

Matmul · RMSNorm · RoPE · SwiGLU · Element-wise addition

Ubuntu 24.04 LTS · PPL SDK 1.4.195 · TPU driver 1.9.1

项目概述

## 保留好用的编程抽象，让编译器承担硬件细节。

TileLang-TPU 将 Tile 级编程带到商用算能加速器。在保留 TileLang 编程模型的同时，由编译器处理片上内存布局、数据搬运和搬运与计算的重叠。编译器与 JIT 运行时共同打通从 Python 算子定义到 BM1690 执行的完整流程。

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-overview.png)
编译流程总览。复用的 TileLang 前端输出经 TPU 专用内存分配、流水线转换和后端映射处理，再由 JIT 运行时编译并启动生成的算子。

## 编译器设计

01

### 静态内存分配

在编译期确定片上内存偏移，考虑对齐、容量和存储体分布。

02

### 结构化流水线转换

将分块循环转换为明确的执行阶段，在保持依赖关系的前提下重叠数据搬运与计算。

03

### 后端映射与运行时

生成 TPU 算子 API 调用，连接设备端与主机端编译、链接、加载及启动。

## 代码与资料

[TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu) [源代码](https://github.com/TongmingLAIC/tilelang-tpu/tree/main/tpu_demo)

## 你也在研究相关问题吗？

[打个招呼](https://tianxing-ren.netlify.app/zh/contact/)
