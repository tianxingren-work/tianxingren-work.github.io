# For agents

Codex, Claude Code 등 자동화 도구가 읽을 수 있도록 프로필, 프로젝트, 이력을 한곳에 모았습니다. 자세한 내용은 각 출처 링크에서 확인할 수 있습니다.

## 프로필과 연구

안녕하세요, **Tianxing Ren**입니다. 다양한 AI 알고리즘이 새로운 AI 하드웨어에서 정확하고 효율적으로 실행되도록 AI 컴파일러를 연구합니다. 사람과 에이전트가 더 쉽게 프로그래밍할 수 있도록 돕고자 합니다.

베이징대학교와 중관춘 연구소의 공동 공학 박사과정에 재학 중입니다. AI 컴파일러, 타일 단위 프로그래밍, 이종 컴퓨팅을 연구하며 관련 프로그래밍 언어와 컴퓨터 구조 문제에 관심이 있습니다.

제 지도교수는 [Tao Xie](https://taoxiease.github.io/) 및 [Wei Yang](https://youngwei.com/) 입니다.

AI 컴파일러, 타일 단위 프로그래밍, 이종 컴퓨팅을 연구합니다.

## 제가 주도하는 프로젝트

### [TileLang-TPU](https://tianxingren-work.github.io/ko/projects/tilelang-tpu/)

프로젝트 리드

컴파일 시점의 메모리 계획부터 커널 실행까지 지원하는 SOPHGO TPU용 TileLang 백엔드입니다.

TileLang-TPU는 상용 SOPHGO 가속기에 타일 단위 프로그래밍을 적용합니다. TileLang 프로그래밍 모델을 유지하면서 온칩 메모리 배치, 데이터 이동, 전송과 연산의 중첩을 컴파일러가 처리합니다. 컴파일러와 JIT 런타임은 Python 커널 정의부터 BM1690 실행까지의 전체 과정을 지원합니다.

프로젝트 단계
주요 단계 완료
소스 공개 여부
[오픈 소스](https://github.com/TongmingLAIC/tilelang-tpu)

SOPHGO BM1690 카드 한 장에서 커널 5종, 입력 형태 5종, 자료형 3종을 평가했습니다. PPL 대비 평균 속도 향상은 TPU 커널 실행 시간 기준이며, 컴파일과 호스트 실행 시간은 포함하지 않습니다.

- 1.10× PPL 대비 평균 속도 향상

- 71 / 75 구성에서 PPL보다 빠름

- BF16 · FP16 · FP32

두 구현은 동일한 연산 의미, 입력 형태, 자료형과 벤더 컴파일 도구를 사용합니다. 각 구성에서 준비 실행 5회 후 10회 측정한 평균 시간을 사용했습니다. 71개 구성에서 더 빨랐고, 1개는 동등했으며, 3개는 더 느렸습니다.

- **정적 메모리 할당** 정렬, 용량, 메모리 뱅크 배치를 고려해 컴파일 시점에 로컬 메모리 오프셋을 결정합니다.

- **구조화된 파이프라인 하향 변환** 타일 루프를 명시적인 실행 단계로 변환하여 의존성을 유지하면서 데이터 전송과 연산을 중첩합니다.

- **백엔드 매핑과 런타임** TPU 커널 API 호출을 생성하고 호스트·디바이스 컴파일, 링크, 로딩, 실행으로 연결합니다.

### [TileLang-RISC-V](https://tianxingren-work.github.io/ko/projects/tilelang-riscv/)

프로젝트 리드

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

## 인턴 경험

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

아래 링크에서 Markdown과 JSON을 직접 읽을 수 있습니다. WebMCP를 지원하는 브라우저에서는 프로필 읽기, 프로젝트 목록 및 주제에 관련된 작업을 찾는 도구도 제공하며 공개 출처를 포함합니다.

[도구 정의](https://tianxingren-work.github.io/data/agent-tools.json)

```text
GET /machine/ko/for-agents.json
GET /data/projects.json
```

## 연락

연구 교류와 협업에 관심이 있다면 연락 페이지 또는 GitHub를 통해 Tianxing Ren에게 연락할 수 있습니다.

- [연락하기](https://tianxingren-work.github.io/ko/contact/)

- [GitHub / LeslinD](https://github.com/LeslinD)

- [GitHub / tianxingren-work](https://github.com/tianxingren-work)

## 자료 직접 읽기

- [`/llms.txt`](https://tianxingren-work.github.io/llms.txt)

- [`/llms-full.md`](https://tianxingren-work.github.io/llms-full.md)

- [`/data/agents.json`](https://tianxingren-work.github.io/data/agents.json)

- [`/data/profile.json`](https://tianxingren-work.github.io/data/profile.json)

- [`/data/projects.json`](https://tianxingren-work.github.io/data/projects.json)

- [`/data/routes.json`](https://tianxingren-work.github.io/data/routes.json)

- [`/data/agent-tools.json`](https://tianxingren-work.github.io/data/agent-tools.json)

- [`/openapi.json`](https://tianxingren-work.github.io/openapi.json)

- [`/machine/ko/for-agents.md`](https://tianxingren-work.github.io/machine/ko/for-agents.md)

- [`/machine/ko/for-agents.json`](https://tianxingren-work.github.io/machine/ko/for-agents.json)

- [`/machine/ko/about.md`](https://tianxingren-work.github.io/machine/ko/about.md)

- [`/machine/ko/projects/tilelang-tpu.md`](https://tianxingren-work.github.io/machine/ko/projects/tilelang-tpu.md)

- [`/machine/ko/projects/tilelang-riscv.md`](https://tianxingren-work.github.io/machine/ko/projects/tilelang-riscv.md)

각 페이지는 Markdown과 JSON 버전을 제공합니다. 아래 파일 링크로 전체 프로필과 출처를 직접 읽을 수 있습니다.

```text
GET /machine/ko/for-agents.md
GET /machine/ko/for-agents.json
```

언어 코드는 en, zh, ko, ms입니다.

## 출처와 프로젝트 역할

작업을 소개할 때 원래 프로젝트 페이지를 인용해 주세요. 성능 결과에는 하드웨어, 기준 구현, 평가 범위를 함께 표시해 주세요. 프로젝트 단계와 소스 공개 여부는 별도로 기록되며, 주도한 프로젝트와 기여한 프로젝트에는 각각 역할이 표시됩니다.
