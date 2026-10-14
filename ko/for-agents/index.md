# Tianxing Ren / 任天行

> AI compilers, Tile-level programming, Heterogeneous computing

https://tianxingren-work.github.io/ko/for-agents/

Language: ko. Updated: 2026-10-14.

## 프로필과 연구

다양한 AI 알고리즘이 새로운 AI 하드웨어에서 정확하고 효율적으로 실행되도록 AI 컴파일러를 연구합니다. 사람과 에이전트가 더 쉽게 프로그래밍할 수 있도록 돕고자 합니다.

베이징대학교와 중관춘 연구소의 공동 공학 박사과정에 재학 중입니다. AI 컴파일러, 타일 단위 프로그래밍, 이종 컴퓨팅을 연구하며 관련 프로그래밍 언어와 컴퓨터 구조 문제에 관심이 있습니다.

[Tao Xie 교수님](https://taoxiease.github.io/) 과 [Wei Yang 교수님](https://youngwei.com/) 의 지도를 받으며 박사과정 연구를 진행하고 있습니다.

## 제가 이끄는 프로젝트

### TileLang-TPU

프로젝트 책임자

컴파일 시점의 메모리 계획부터 커널 실행까지 지원하는 SOPHGO TPU용 TileLang 백엔드입니다.

TileLang-TPU는 상용 SOPHGO 가속기에서 타일 단위 프로그래밍을 지원합니다. 타일은 계산을 표현하는 작은 데이터 블록입니다. 컴파일러가 온칩 메모리 배치, 데이터 이동, 전송과 연산의 중첩을 처리합니다. JIT(실행 시점 컴파일) 런타임은 Python으로 정의한 커널을 컴파일하고 BM1690에서 실행합니다.

프로젝트 단계: 주요 단계 완료
소스 공개 여부: https://github.com/TongmingLAIC/tilelang-tpu

https://tianxingren-work.github.io/ko/projects/tilelang-tpu/

SOPHGO BM1690의 단일 코어에서 입력 크기를 컴파일 전에 확정한 조건으로 평가했습니다. 비교 기준은 Torch-TPU에서 사용하는 제조사의 최적화된 PPL 구현입니다. PPL(Primitive Programming Language)은 SOPHGO가 제공하는 저수준 프로그래밍 언어입니다.

행렬 곱셈, RMSNorm, RoPE, SwiGLU, 원소별 덧셈을 여러 입력 구성과 수치 형식으로 평가했습니다. RMSNorm은 값의 크기를 조정하고, RoPE는 시퀀스 내 위치를 표현하며, SwiGLU는 신경망의 비선형 변환을 수행합니다. 연산 종류별 평균 속도 향상은 PPL 대비 **1.05–1.23×**입니다.

TileLang-TPU는 여러 계산 단계를 하나로 합치는 융합 연산도 지원합니다. FlashAttention은 모델의 어텐션을 효율적으로 계산합니다. 여러 어텐션 헤드를 한 배치로 함께 처리하는 head-batched 알고리즘 최적화 후 PPL 대비 평균 **12.50×**의 속도 향상을 달성했습니다. 어텐션 헤드는 서로 다른 정보에 주목하는 병렬 계산 분기입니다.

AI 모델에서 흔히 사용하는 순방향 신경망인 MLP의 융합 연산에서는 MLP W8A16 Dequantized Forward가 평균 **1.01×**로 PPL과 거의 같은 성능을 보였습니다. W8A16은 8비트 가중치와 16비트 활성값을 뜻합니다. 역양자화는 저장된 저정밀도 가중치를 계산에 사용할 값으로 변환하는 과정입니다.

- 정적 메모리 할당: 프로그램 실행 전에 각 데이터 블록을 칩 내부의 빠른 메모리 어디에 둘지 정합니다. 하드웨어의 배치 규칙을 따르고 메모리 용량을 넘지 않도록 합니다.
- 데이터 전송과 연산의 중첩: 데이터 전송과 연산을 병렬로 진행할 수 있는 단계로 나눕니다. 각 단계는 필요한 데이터가 준비된 후 시작하도록 합니다.
- TPU 코드 생성과 실행: 계산을 TPU가 실행할 수 있는 연산으로 변환하고 프로그램을 컴파일, 로딩, 실행합니다.

### TileLang-RISC-V

프로젝트 책임자

AME 행렬 가속을 제공하는 RISC-V CPU에 TileLang을 이식합니다. 오픈소스 하드웨어·시스템 연구팀과 진행 중인 프로젝트입니다.

베이징 오픈소스 칩 연구원 및 중국과학원 소프트웨어연구소와 협력해 RISC-V AME AI CPU용 TileLang 백엔드를 개발하고 있습니다. 현재 프로그래밍 모델과 대상 명령어를 연결하고 실용적인 컴파일·실행 경로를 구축하는 데 집중합니다.

프로젝트 단계: 진행 중
소스 공개 여부: 소스 코드 비공개

https://tianxingren-work.github.io/ko/projects/tilelang-riscv/

- 프로그래밍 모델: 일반적인 AI 연산자를 타일 단위 프로그램으로 표현하고 백엔드에 필요한 정보를 파악합니다.
- 대상 플랫폼 통합: 컴파일 하향 변환, AME 명령어 매핑, 실행 환경을 연결합니다.
- 평가: 대상 구성별로 연산자의 정확성과 성능을 검증하고, 결과를 바탕으로 백엔드를 최적화합니다.

## 제가 기여하는 오픈소스 프로젝트

- [TileLang](https://github.com/tile-ai/tilelang) — contributor
- [Asterinas](https://github.com/asterinas/asterinas) — contributor

## 학력

- 베이징대학교, 공학 전문박사과정, 전자정보. 2025.09 – 2030.07 · 예정
- 베이항대학교, 공학 학사, 사이버보안. 2021.09 – 2025.07
  GPA 3.77 / 4.0. 평균 성적 90.41 / 100

학부 재학 중에는 주로 [Hua Guo 교수님](https://cst.buaa.edu.cn/info/1112/2741.htm) 의 지도 아래 연구를 진행했습니다. 적은 회로 면적을 사용하는 대수 격자 암호 제품군을 FPGA로 구현하여 전국 암호기술 경진대회에서 3등상을 받았습니다. 안전한 다자간 계산을 기반으로 한 클라우드 서비스 키 보호 메커니즘도 완성하여 전국 대학생 정보보안 경진대회에서 1등상을 받았습니다.

## 인턴십

### 베이징 퉁밍후 정보기술 혁신센터

2025.12 – 현재. 지능형 시스템 인턴

- RISC-V 텐서 확장을 사용하는 SOPHGO SG2260E TPU에 TileLang을 이식하고 있습니다.
- AME 행렬 가속을 제공하는 RISC-V CPU를 위한 TileLang 지원을 개발하고 있습니다.

### 베이징 오픈소스 칩 연구원

2024.12 – 2025.08. AI 시스템 소프트웨어 개발 인턴

- 벤더 툴체인으로의 변환을 통해 Triton 컴파일 스택을 SOPHGO TPU로 확장했습니다.
- TileLang 기반 연산자 컴파일 프레임워크를 구축하고, TPU 연산자 라이브러리, 파이프라인 패스, LLaMA 연산자용 자동 코드 생성을 개발했습니다.
- 평가한 구성에서 여러 연산자가 벤더 최적화 구현과 동등하거나 더 높은 성능을 보였습니다.

### Eversec (Beijing) Technology Co., Ltd.

2024.07 – 2024.08. 보안 서비스 인턴

- Burp Suite 등으로 승인된 네트워크 보안 평가를 지원하고 결과를 정리해 잠재적 위험을 파악했습니다.
- Wireshark로 산업용 IoT 기기의 로그인 트래픽 PCAP 기록 100여 건을 수집하고 표준화했습니다.

## 수상 및 장학금

- 2025–2026: 학업우수 장학금
- 2024–2025: 학술경진대회 장학금 특별상; 학업우수 장학금 2등상
- 2023–2024: 우수학생 표창; 학술경진대회 장학금 특별상; 사회봉사 장학금 2등상
- 2022–2023: 학술경진대회 장학금 1등상; 학업우수 장학금 2등상

## 방문

- 홍콩중문대학교. 여름학교 방문학생. 2024.07 – 2024.08

## 연락처

공개 이메일 주소와 GitHub 링크를 직접 읽을 수 있습니다. AI 컴파일러, 새로운 AI 하드웨어 및 관련 시스템 연구에 관한 교류를 환영합니다.

이메일: tianxingren25 [at] stu [dot] pku [dot] edu [dot] cn
https://tianxingren-work.github.io/ko/contact/
https://github.com/LeslinD
https://github.com/tianxingren-work

## 읽기 형식

백엔드에 연결할 필요 없이 Markdown과 JSON 파일을 직접 읽을 수 있습니다. 전체 프로필과 각 프로젝트 페이지에 해당하는 파일을 제공합니다.

- Markdown: https://tianxingren-work.github.io/machine/ko/for-agents.md
- JSON: https://tianxingren-work.github.io/machine/ko/for-agents.json
- Contact JSON: https://tianxingren-work.github.io/data/contact.json
