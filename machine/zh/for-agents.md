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

面向算能 TPU 的 TileLang 后端，打通编译期内存规划、流水线优化与算子执行。

TileLang-TPU 将 Tile 级编程带到商用算能加速器，通过数据分块（Tile）来表达计算。编译器负责片上内存布局、数据搬运，以及搬运与计算的重叠。即时编译（JIT）运行时将 Python 中定义的算子编译并在 BM1690 上执行。

项目阶段: 阶段性完成
源码情况: https://github.com/TongmingLAIC/tilelang-tpu

https://tianxingren-work.github.io/zh/projects/tilelang-tpu/

评测在算能 BM1690 单核上进行，输入形状在编译前确定。基线是算能 Torch-TPU 所用的厂商 PPL 优化实现。PPL（Primitive Programming Language）是厂商提供的底层编程语言。

项目评测了矩阵乘法、RMSNorm、RoPE、SwiGLU 和逐元素加法五类算子，覆盖多种输入配置和数据类型。RMSNorm 调整数值尺度，RoPE 表示序列位置，SwiGLU 完成神经网络中的非线性计算。各类算子相对 PPL 的平均加速为 **1.05–1.23×**。

除了独立算子，TileLang-TPU 还支持把多个计算步骤合在一起的融合算子。FlashAttention 用于高效计算模型的注意力。经过多注意力头批处理（head-batched）算法优化后，其平均加速达到 **12.50×**。这种优化把关注不同信息的多个计算分支，也就是注意力头，放到同一批中处理。

在融合 MLP 工作负载上，W8A16 反量化前向算子的平均加速为 **1.01×**，与 PPL 实现基本持平。MLP（多层感知机）是模型中常见的前馈网络。W8A16 表示权重采用 8 位、激活值采用 16 位，反量化则把存储的低精度权重转换为计算所用的数值。

- 静态内存分配: 在程序运行前安排每块数据在芯片内部快速内存中的位置，遵循硬件的放置要求，并避免超过容量。
- 重叠搬运与计算: 把分块计算排成执行阶段，让数据搬运与计算并行，同时确保每一步需要的数据已经准备好。
- 生成代码并运行: 把计算转换为 TPU 能执行的操作，并负责程序的编译、加载和运行。

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

本科期间，我主要在[郭华教授](https://cst.buaa.edu.cn/info/1112/2741.htm) 的指导下开展研究。我完成了低面积代数格密码套件的 FPGA 实现，项目获全国密码技术竞赛三等奖。我还完成了基于安全多方计算的云服务密钥保护机制，项目获全国大学生信息安全竞赛一等奖。

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

请直接读取 Markdown 或 JSON 文件，无需连接后台。完整资料和各项目页面均有对应文件。

- Markdown: https://tianxingren-work.github.io/machine/zh/for-agents.md
- JSON: https://tianxingren-work.github.io/machine/zh/for-agents.json
- Contact JSON: https://tianxingren-work.github.io/data/contact.json
