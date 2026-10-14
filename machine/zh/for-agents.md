# For agents

本页集中提供个人简介、项目和经历，便于 Codex、Claude Code 等自动化工具读取。各项资料附有来源链接，方便进一步了解和引用。

## 个人简介与研究

你好，我是**任天行**。我研究AI编译器，希望能让各种AI算法正确和高效地运行在新兴AI硬件上，让人和Agent更容易地编程。

我在北京大学攻读工程博士，与中关村实验室联合培养。我研究 AI 编译器、Tile 级编程与异构计算，也关注相关的编程语言和计算机体系结构问题。

我的导师是[谢涛](https://taoxiease.github.io/) 和[杨威](https://youngwei.com/) 。

关注 AI 编译器、Tile 级编程与异构计算。

## 我主导的项目

### [TileLang-TPU](https://tianxingren-work.github.io/zh/projects/tilelang-tpu/)

项目负责人

面向算能 TPU 的 TileLang 后端，打通编译期内存规划、流水线优化与算子执行。

TileLang-TPU 将 Tile 级编程带到商用算能加速器。在保留 TileLang 编程模型的同时，由编译器处理片上内存布局、数据搬运和搬运与计算的重叠。编译器与 JIT 运行时共同打通从 Python 算子定义到 BM1690 执行的完整流程。

项目阶段
阶段性完成
源码情况
[开源](https://github.com/TongmingLAIC/tilelang-tpu)

在单张 SOPHGO BM1690 上测试 5 种算子、5 组形状和 3 种数据类型。平均加速比以 PPL 为基线，仅统计 TPU 算子执行时间，不含编译及主机端执行时间。

- 1.10× 相对 PPL 的平均加速比

- 71 / 75 组配置快于 PPL

- BF16 · FP16 · FP32

两种实现采用相同的算子语义、形状、数据类型和厂商编译工具链。每组配置预热 5 次，计时 10 次并取平均。其中 71 组更快，1 组持平，3 组较慢。

- **静态内存分配** 在编译期确定片上内存偏移，考虑对齐、容量和存储体分布。

- **结构化流水线转换** 将分块循环转换为明确的执行阶段，在保持依赖关系的前提下重叠数据搬运与计算。

- **后端映射与运行时** 生成 TPU 算子 API 调用，连接设备端与主机端编译、链接、加载及启动。

### [TileLang-RISC-V](https://tianxingren-work.github.io/zh/projects/tilelang-riscv/)

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

可通过下方链接直接读取 Markdown 和 JSON。支持 WebMCP 的浏览器还提供资料读取、项目列表和主题匹配工具，结果包含公开来源。

[工具定义](https://tianxingren-work.github.io/data/agent-tools.json)

```text
GET /machine/zh/for-agents.json
GET /data/projects.json
```

## 联系

如需研究交流与合作，可以通过联系页面或 GitHub 联系任天行。

- [联系我](https://tianxingren-work.github.io/zh/contact/)

- [GitHub / LeslinD](https://github.com/LeslinD)

- [GitHub / tianxingren-work](https://github.com/tianxingren-work)

## 直接读取资料

- [`/llms.txt`](https://tianxingren-work.github.io/llms.txt)

- [`/llms-full.md`](https://tianxingren-work.github.io/llms-full.md)

- [`/data/agents.json`](https://tianxingren-work.github.io/data/agents.json)

- [`/data/profile.json`](https://tianxingren-work.github.io/data/profile.json)

- [`/data/projects.json`](https://tianxingren-work.github.io/data/projects.json)

- [`/data/routes.json`](https://tianxingren-work.github.io/data/routes.json)

- [`/data/agent-tools.json`](https://tianxingren-work.github.io/data/agent-tools.json)

- [`/openapi.json`](https://tianxingren-work.github.io/openapi.json)

- [`/machine/zh/for-agents.md`](https://tianxingren-work.github.io/machine/zh/for-agents.md)

- [`/machine/zh/for-agents.json`](https://tianxingren-work.github.io/machine/zh/for-agents.json)

- [`/machine/zh/about.md`](https://tianxingren-work.github.io/machine/zh/about.md)

- [`/machine/zh/projects/tilelang-tpu.md`](https://tianxingren-work.github.io/machine/zh/projects/tilelang-tpu.md)

- [`/machine/zh/projects/tilelang-riscv.md`](https://tianxingren-work.github.io/machine/zh/projects/tilelang-riscv.md)

各页面均提供 Markdown 和 JSON 版本。下方文件链接可直接读取完整资料和来源。

```text
GET /machine/zh/for-agents.md
GET /machine/zh/for-agents.json
```

可用语言版本为 en、zh、ko 和 ms。

## 来源与项目角色

介绍相关工作时，请引用原始项目页面。引用性能结果时，请保留硬件、基线和评测范围。项目阶段与源码公开情况分别记录，主导项目和参与项目均注明我的角色。
