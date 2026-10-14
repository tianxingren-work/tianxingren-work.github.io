# For agents

Codex, Claude Code 등 자동화 도구가 읽을 수 있도록 프로필, 프로젝트, 이력을 한곳에 모았습니다. 자세한 내용은 각 출처 링크에서 확인할 수 있습니다.

## 프로필과 연구

안녕하세요, **Tianxing Ren**입니다. 다양한 AI 알고리즘이 새로운 AI 하드웨어에서 정확하고 효율적으로 실행되도록 AI 컴파일러를 연구합니다. 사람과 에이전트가 더 쉽게 프로그래밍할 수 있도록 돕고자 합니다.

베이징대학교와 중관춘 연구소의 공동 공학 박사과정에 재학 중입니다. AI 컴파일러, 타일 단위 프로그래밍, 이종 컴퓨팅을 연구하며 관련 프로그래밍 언어와 컴퓨터 구조 문제에 관심이 있습니다.

제 지도교수는 [Tao Xie](https://taoxiease.github.io/) 및 [Wei Yang](https://youngwei.com/) 입니다.

AI 컴파일러, 타일 단위 프로그래밍, 이종 컴퓨팅을 연구합니다.

## 제가 이끄는 프로젝트

### [TileLang-TPU](https://tianxing-ren.netlify.app/ko/projects/tilelang-tpu/)

프로젝트 책임자

컴파일 시점의 메모리 계획부터 커널 실행까지 지원하는 SOPHGO TPU용 TileLang 백엔드입니다.

TileLang-TPU는 상용 SOPHGO 가속기에서 타일 단위 프로그래밍을 지원합니다. 타일은 계산을 표현하는 작은 데이터 블록입니다. 컴파일러가 온칩 메모리 배치, 데이터 이동, 전송과 연산의 중첩을 처리합니다. JIT(실행 시점 컴파일) 런타임은 Python으로 정의한 커널을 컴파일하고 BM1690에서 실행합니다.

프로젝트 단계
주요 단계 완료
소스 공개 여부
[오픈소스](https://github.com/TongmingLAIC/tilelang-tpu)

SOPHGO BM1690의 단일 코어에서 입력 크기를 컴파일 전에 확정한 조건으로 평가했습니다. 비교 기준은 Torch-TPU에서 사용하는 제조사의 최적화된 PPL 구현입니다. PPL(Primitive Programming Language)은 SOPHGO가 제공하는 저수준 프로그래밍 언어입니다.

행렬 곱셈, RMSNorm, RoPE, SwiGLU, 원소별 덧셈을 여러 입력 구성과 수치 형식으로 평가했습니다. RMSNorm은 값의 크기를 조정하고, RoPE는 시퀀스 내 위치를 표현하며, SwiGLU는 신경망의 비선형 변환을 수행합니다. 연산 종류별 평균 속도 향상은 PPL 대비 **1.05–1.23×**입니다.

TileLang-TPU는 여러 계산 단계를 하나로 합치는 융합 연산도 지원합니다. FlashAttention은 모델의 어텐션을 효율적으로 계산합니다. 여러 어텐션 헤드를 한 배치로 함께 처리하는 head-batched 알고리즘 최적화 후 PPL 대비 평균 **12.50×**의 속도 향상을 달성했습니다. 어텐션 헤드는 서로 다른 정보에 주목하는 병렬 계산 분기입니다.

AI 모델에서 흔히 사용하는 순방향 신경망인 MLP의 융합 연산에서는 MLP W8A16 Dequantized Forward가 평균 **1.01×**로 PPL과 거의 같은 성능을 보였습니다. W8A16은 8비트 가중치와 16비트 활성값을 뜻합니다. 역양자화는 저장된 저정밀도 가중치를 계산에 사용할 값으로 변환하는 과정입니다.

- [다섯 입력 구성과 세 부동소수점 형식에서 다섯 연산 종류의 PPL 대비 속도 향상.](https://tianxing-ren.netlify.app/assets/tilelang-tpu-operators.png)

- [FlashAttention의 PPL 대비 평균 속도 향상은 12.50배, 융합 MLP는 1.01배입니다.](https://tianxing-ren.netlify.app/assets/tilelang-tpu-attention-mlp.png)

- **정적 메모리 할당** 프로그램 실행 전에 각 데이터 블록을 칩 내부의 빠른 메모리 어디에 둘지 정합니다. 하드웨어의 배치 규칙을 따르고 메모리 용량을 넘지 않도록 합니다.

- **데이터 전송과 연산의 중첩** 데이터 전송과 연산을 병렬로 진행할 수 있는 단계로 나눕니다. 각 단계는 필요한 데이터가 준비된 후 시작하도록 합니다.

- **TPU 코드 생성과 실행** 계산을 TPU가 실행할 수 있는 연산으로 변환하고 프로그램을 컴파일, 로딩, 실행합니다.

### [TileLang-RISC-V](https://tianxing-ren.netlify.app/ko/projects/tilelang-riscv/)

프로젝트 책임자

AME 행렬 가속을 제공하는 RISC-V CPU에 TileLang을 이식합니다. 오픈소스 하드웨어·시스템 연구팀과 진행 중인 프로젝트입니다.

베이징 오픈소스 칩 연구원 및 중국과학원 소프트웨어연구소와 협력해 RISC-V AME AI CPU용 TileLang 백엔드를 개발하고 있습니다. 현재 프로그래밍 모델과 대상 명령어를 연결하고 실용적인 컴파일·실행 경로를 구축하는 데 집중합니다.

프로젝트 단계
진행 중
소스 공개 여부
소스 코드 비공개
- **프로그래밍 모델** 일반적인 AI 연산자를 타일 단위 프로그램으로 표현하고 백엔드에 필요한 정보를 파악합니다.

- **대상 플랫폼 통합** 컴파일 하향 변환, AME 명령어 매핑, 실행 환경을 연결합니다.

- **평가** 대상 구성별로 연산자의 정확성과 성능을 검증하고, 결과를 바탕으로 백엔드를 최적화합니다.

협력 기관

- [베이징 오픈소스 칩 연구원](https://www.bosc.ac.cn/)

- [중국과학원 소프트웨어연구소](https://is.cas.cn/)

## 제가 기여하는 오픈소스 프로젝트

- [TileLang](https://github.com/tile-ai/tilelang)

- [Asterinas](https://github.com/asterinas/asterinas)

## 학력

2025.09 – 2030.07 · 예정

### [베이징대학교](https://www.pku.edu.cn/)

공학 전문박사과정 · 전자정보

[소프트웨어·마이크로전자학원](https://ss.pku.edu.cn/)

중관춘 연구소와 공동으로 박사과정을 이수하고 있습니다.

제 지도교수는 [Tao Xie](https://taoxiease.github.io/) 및 [Wei Yang](https://youngwei.com/) 입니다.

2021.09 – 2025.07

### [베이항대학교](https://www.buaa.edu.cn/)

공학 학사 · 사이버보안

[사이버보안학원](https://cst.buaa.edu.cn/)

학부 재학 중에는 [Hua Guo](https://cst.buaa.edu.cn/info/1112/2741.htm) 와 연구 협력을 진행했습니다.

GPA **3.77 / 4.00** 평균 성적 **90.41 / 100**

## 인턴십

2025.12 – 현재

### [베이징 퉁밍후 정보기술 혁신센터](https://www.tlaic.ac.cn/)

지능형 시스템 인턴

- RISC-V 텐서 확장을 사용하는 SOPHGO SG2260E TPU에 TileLang을 이식하고 있습니다.

- AME 행렬 가속을 제공하는 RISC-V CPU를 위한 TileLang 지원을 개발하고 있습니다.

2024.12 – 2025.08

### [베이징 오픈소스 칩 연구원](https://www.bosc.ac.cn/)

AI 시스템 소프트웨어 개발 인턴

- 벤더 툴체인으로의 변환을 통해 Triton 컴파일 스택을 SOPHGO TPU로 확장했습니다.

- TileLang 기반 연산자 컴파일 프레임워크를 구축하고, TPU 연산자 라이브러리, 파이프라인 패스, LLaMA 연산자용 자동 코드 생성을 개발했습니다.

- 평가한 구성에서 여러 연산자가 벤더 최적화 구현과 동등하거나 더 높은 성능을 보였습니다.

2024.07 – 2024.08

### [Eversec (Beijing) Technology Co., Ltd.](https://eversec.com.cn/)

보안 서비스 인턴

- Burp Suite 등으로 승인된 네트워크 보안 평가를 지원하고 결과를 정리해 잠재적 위험을 파악했습니다.

- Wireshark로 산업용 IoT 기기의 로그인 트래픽 PCAP 기록 100여 건을 수집하고 표준화했습니다.

## 수상 및 장학금

2025–2026

학업우수 장학금

[베이징대학교](https://www.pku.edu.cn/)

2024–2025

학술경진대회 장학금 특별상; 학업우수 장학금 2등상

[베이항대학교](https://www.buaa.edu.cn/)

2023–2024

우수학생 표창; 학술경진대회 장학금 특별상; 사회봉사 장학금 2등상

[베이항대학교](https://www.buaa.edu.cn/)

2022–2023

학술경진대회 장학금 1등상; 학업우수 장학금 2등상

[베이항대학교](https://www.buaa.edu.cn/)

## 방문

2024.07 – 2024.08

### [홍콩중문대학교](https://www.cuhk.edu.hk/)

여름학교 방문학생

## AI 도구 호출

MCP로 프로필과 프로젝트를 읽거나 주제를 제출하여 관련 작업, 출처 및 평가 범위를 받을 수 있습니다.

[도구 정의](https://tianxing-ren.netlify.app/data/agent-tools.json)

```text
POST https://tianxing-ren.netlify.app/api/agent/query
Content-Type: application/json

{"topic":"RISC-V AME","language":"ko"}

POST https://tianxing-ren.netlify.app/api/mcp
```

## 연락처

연구 교류와 협업에 관심이 있다면 연락 페이지 또는 GitHub를 통해 Tianxing Ren에게 연락할 수 있습니다.

- [연락하기](https://tianxing-ren.netlify.app/ko/contact/)

- [GitHub / LeslinD](https://github.com/LeslinD)

- [GitHub / tianxingren-work](https://github.com/tianxingren-work)

## 자료 직접 읽기

- [`/llms.txt`](https://tianxing-ren.netlify.app/llms.txt)

- [`/llms-full.md`](https://tianxing-ren.netlify.app/llms-full.md)

- [`/data/agents.json`](https://tianxing-ren.netlify.app/data/agents.json)

- [`/data/profile.json`](https://tianxing-ren.netlify.app/data/profile.json)

- [`/data/projects.json`](https://tianxing-ren.netlify.app/data/projects.json)

- [`/data/routes.json`](https://tianxing-ren.netlify.app/data/routes.json)

- [`/data/agent-tools.json`](https://tianxing-ren.netlify.app/data/agent-tools.json)

- [`/openapi.json`](https://tianxing-ren.netlify.app/openapi.json)

- [`/machine/ko/for-agents.md`](https://tianxing-ren.netlify.app/machine/ko/for-agents.md)

- [`/machine/ko/for-agents.json`](https://tianxing-ren.netlify.app/machine/ko/for-agents.json)

- [`/machine/ko/about.md`](https://tianxing-ren.netlify.app/machine/ko/about.md)

- [`/machine/ko/projects/tilelang-tpu.md`](https://tianxing-ren.netlify.app/machine/ko/projects/tilelang-tpu.md)

- [`/machine/ko/projects/tilelang-riscv.md`](https://tianxing-ren.netlify.app/machine/ko/projects/tilelang-riscv.md)

식별 가능한 AI 도구 요청에는 Markdown이 자동으로 제공됩니다. 홈페이지 요청에는 이 페이지의 전체 프로필을, 다른 페이지 요청에는 해당 내용을 반환합니다. ?format=markdown, ?format=json, ?format=html 또는 Accept 헤더로 형식을 지정하거나 위의 파일 링크를 직접 읽을 수 있습니다.

```text
GET /for-agents/?format=markdown
GET /api/agents
GET /api/profile
GET /api/projects
```

언어 코드는 en, zh, ko, ms입니다.

## 출처와 프로젝트 역할

작업을 소개할 때 원래 프로젝트 페이지를 인용해 주세요. 성능 결과에는 하드웨어, 기준 구현, 평가 범위를 함께 표시해 주세요. 프로젝트 단계와 소스 공개 여부는 별도로 기록되며, 주도한 프로젝트와 기여한 프로젝트에는 각각 역할이 표시됩니다.
