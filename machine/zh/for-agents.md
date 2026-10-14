# For agents

本页集中提供个人简介、项目和经历，便于 Codex、Claude Code 等自动化工具读取。各项资料附有来源链接，方便进一步了解和引用。

## 个人简介与研究

你好，我是**任天行**。我研究AI编译器，希望能让各种AI算法正确和高效地运行在新兴AI硬件上，让人和Agent更容易地编程。

我在北京大学攻读工程博士，与中关村实验室联合培养。我研究 AI 编译器、Tile 级编程与异构计算，也关注相关的编程语言和计算机体系结构问题。

我的导师是[谢涛](https://taoxiease.github.io/) 和[杨威](https://youngwei.com/) 。

关注 AI 编译器、Tile 级编程与异构计算。

## 我主导的项目

### [TileLang-TPU](https://tianxing-ren.netlify.app/zh/projects/tilelang-tpu/)

项目负责人

面向算能 TPU 的 TileLang 后端，打通编译期内存规划、流水线优化与算子执行。

TileLang-TPU 将 Tile 级编程带到商用算能加速器，通过数据分块（Tile）来表达计算。编译器负责片上内存布局、数据搬运，以及搬运与计算的重叠。即时编译（JIT）运行时将 Python 中定义的算子编译并在 BM1690 上执行。

项目阶段
阶段性完成
源码情况
[开源](https://github.com/TongmingLAIC/tilelang-tpu)

评测在算能 BM1690 单核上进行，输入形状在编译前确定。基线是算能 Torch-TPU 所用的厂商 PPL 优化实现。PPL（Primitive Programming Language）是厂商提供的底层编程语言。

项目评测了矩阵乘法、RMSNorm、RoPE、SwiGLU 和逐元素加法五类算子，覆盖多种输入配置和数据类型。RMSNorm 调整数值尺度，RoPE 表示序列位置，SwiGLU 完成神经网络中的非线性计算。各类算子相对 PPL 的平均加速为 **1.05–1.23×**。

除了独立算子，TileLang-TPU 还支持把多个计算步骤合在一起的融合算子。FlashAttention 用于高效计算模型的注意力。经过多注意力头批处理（head-batched）算法优化后，其平均加速达到 **12.50×**。这种优化把关注不同信息的多个计算分支，也就是注意力头，放到同一批中处理。

在融合 MLP 工作负载上，W8A16 反量化前向算子的平均加速为 **1.01×**，与 PPL 实现基本持平。MLP（多层感知机）是模型中常见的前馈网络。W8A16 表示权重采用 8 位、激活值采用 16 位，反量化则把存储的低精度权重转换为计算所用的数值。

- [五类算子在五组输入配置、三种浮点格式下相对 PPL 的加速比。](https://tianxing-ren.netlify.app/assets/tilelang-tpu-operators.png)

- [FlashAttention 相对 PPL 平均加速 12.50 倍，融合 MLP 平均加速 1.01 倍。](https://tianxing-ren.netlify.app/assets/tilelang-tpu-attention-mlp.png)

- **静态内存分配** 在程序运行前安排每块数据在芯片内部快速内存中的位置，遵循硬件的放置要求，并避免超过容量。

- **重叠搬运与计算** 把分块计算排成执行阶段，让数据搬运与计算并行，同时确保每一步需要的数据已经准备好。

- **生成代码并运行** 把计算转换为 TPU 能执行的操作，并负责程序的编译、加载和运行。

### [TileLang-RISC-V](https://tianxing-ren.netlify.app/zh/projects/tilelang-riscv/)

项目负责人

将 TileLang 接入具有 AME 矩阵加速能力的 RISC-V CPU，与开源硬件和系统研究团队共同推进。

项目面向 RISC-V AME AI CPU 开发 TileLang 后端，与北京开源芯片研究院和中国科学院软件研究所合作。当前重点是完成编程模型与目标指令的对应，建立可用的编译和执行流程。

项目阶段
进行中
源码情况
源码暂未公开
- **编程模型** 使用 Tile-level 程序表达常用 AI 算子，明确后端所需信息。

- **目标平台接入** 衔接编译转换、AME 指令映射和执行环境。

- **实验评估** 测试不同目标配置下的算子正确性与性能，并据此优化后端。

合作机构

- [北京开源芯片研究院](https://www.bosc.ac.cn/)

- [中国科学院软件研究所](https://is.cas.cn/)

## 我参与的开源项目

- [TileLang](https://github.com/tile-ai/tilelang)

- [Asterinas](https://github.com/asterinas/asterinas)

## 教育经历

2025.09 – 2030.07 · 预计

### [北京大学](https://www.pku.edu.cn/)

工程博士研究生 · 电子信息

[软件与微电子学院](https://ss.pku.edu.cn/)

与中关村实验室联合培养。

我的导师是[谢涛](https://taoxiease.github.io/) 和[杨威](https://youngwei.com/) 。

2021.09 – 2025.07

### [北京航空航天大学](https://www.buaa.edu.cn/)

工学学士 · 网络空间安全

[网络空间安全学院](https://cst.buaa.edu.cn/)

本科期间，我与[郭华](https://cst.buaa.edu.cn/info/1112/2741.htm) 老师开展研究合作。

GPA **3.77 / 4.00** 平均成绩 **90.41 / 100**

## 实习经历

2025.12 – 至今

### [北京通明湖信息技术应用创新中心](https://www.tlaic.ac.cn/)

智能系统部实习生

- 将 TileLang 对接到采用 RISC-V Tensor 扩展的算能 SG2260E TPU。

- 开发 TileLang 对 RISC-V AME 矩阵加速 CPU 的支持。

2024.12 – 2025.08

### [北京开源芯片研究院](https://www.bosc.ac.cn/)

AI 系统软件栈研发实习生

- 通过转译衔接算能 TPU 编译工具链，扩展 Triton 编译栈以运行 Triton 生态程序。

- 基于 TileLang 构建异构芯片算子编译框架，开发 TPU 算子库、流水线 Pass 和自动代码生成，支持 LLaMA 所用算子。

- 在已测试的配置中，多个算子性能达到或超过厂商调优实现。

2024.07 – 2024.08

### [恒安嘉新（北京）科技股份公司](https://eversec.com.cn/)

安全服务实习生

- 使用 Burp Suite 等工具参与经授权的网络安全评估，整理扫描结果并初步识别风险。

- 使用 Wireshark 收集并标准化处理 100 余项工业物联网设备登录 PCAP 流量记录。

## 荣誉与奖学金

2025–2026

学习优秀奖学金

[北京大学](https://www.pku.edu.cn/)

2024–2025

学科竞赛奖学金特等奖；学习优秀奖学金二等奖

[北京航空航天大学](https://www.buaa.edu.cn/)

2023–2024

校级三好学生；学科竞赛奖学金特等奖；社会工作优秀奖学金二等奖

[北京航空航天大学](https://www.buaa.edu.cn/)

2022–2023

学科竞赛奖学金一等奖；学习优秀奖学金二等奖

[北京航空航天大学](https://www.buaa.edu.cn/)

## 访问

2024.07 – 2024.08

### [香港中文大学](https://www.cuhk.edu.hk/)

暑期学校访学学生

## 供 AI 工具调用

可以通过 MCP 读取个人与项目资料，也可以提交一个主题，获取相关项目、来源链接和评测范围。

[工具定义](https://tianxing-ren.netlify.app/data/agent-tools.json)

```text
POST https://tianxing-ren.netlify.app/api/agent/query
Content-Type: application/json

{"topic":"RISC-V AME","language":"zh"}

POST https://tianxing-ren.netlify.app/api/mcp
```

## 联系

如需研究交流与合作，可以通过联系页面或 GitHub 联系任天行。

- [联系我](https://tianxing-ren.netlify.app/zh/contact/)

- [GitHub / LeslinD](https://github.com/LeslinD)

- [GitHub / tianxingren-work](https://github.com/tianxingren-work)

## 直接读取资料

- [`/llms.txt`](https://tianxing-ren.netlify.app/llms.txt)

- [`/llms-full.md`](https://tianxing-ren.netlify.app/llms-full.md)

- [`/data/agents.json`](https://tianxing-ren.netlify.app/data/agents.json)

- [`/data/profile.json`](https://tianxing-ren.netlify.app/data/profile.json)

- [`/data/projects.json`](https://tianxing-ren.netlify.app/data/projects.json)

- [`/data/routes.json`](https://tianxing-ren.netlify.app/data/routes.json)

- [`/data/agent-tools.json`](https://tianxing-ren.netlify.app/data/agent-tools.json)

- [`/openapi.json`](https://tianxing-ren.netlify.app/openapi.json)

- [`/machine/zh/for-agents.md`](https://tianxing-ren.netlify.app/machine/zh/for-agents.md)

- [`/machine/zh/for-agents.json`](https://tianxing-ren.netlify.app/machine/zh/for-agents.json)

- [`/machine/zh/about.md`](https://tianxing-ren.netlify.app/machine/zh/about.md)

- [`/machine/zh/projects/tilelang-tpu.md`](https://tianxing-ren.netlify.app/machine/zh/projects/tilelang-tpu.md)

- [`/machine/zh/projects/tilelang-riscv.md`](https://tianxing-ren.netlify.app/machine/zh/projects/tilelang-riscv.md)

可识别的 AI 工具请求会自动收到 Markdown。访问首页时返回本页的完整资料，访问其他页面时返回对应内容。也可以通过 ?format=markdown、?format=json、?format=html 或 Accept 请求头指定格式，或直接读取上方文件。

```text
GET /for-agents/?format=markdown
GET /api/agents
GET /api/profile
GET /api/projects
```

可用语言版本为 en、zh、ko 和 ms。

## 来源与项目角色

介绍相关工作时，请引用原始项目页面。引用性能结果时，请保留硬件、基线和评测范围。项目阶段与源码公开情况分别记录，主导项目和参与项目均注明我的角色。
