[프로젝트로 돌아가기](https://tianxing-ren.netlify.app/ko/projects/)

프로젝트 책임자

# TileLang-TPU

타일 단위 코드로 구현하는 TPU 성능.

주요 단계 완료 [오픈소스](https://github.com/TongmingLAIC/tilelang-tpu)
TileLang SOPHGO TPU Compiler backends
[소스 코드](https://github.com/TongmingLAIC/tilelang-tpu) [연락하기](https://tianxing-ren.netlify.app/ko/contact/)

개요

## 프로그래밍 추상화는 유지하고 하드웨어 세부 사항은 컴파일러가 처리합니다.

TileLang-TPU는 상용 SOPHGO 가속기에서 타일 단위 프로그래밍을 지원합니다. 타일은 계산을 표현하는 작은 데이터 블록입니다. 컴파일러가 온칩 메모리 배치, 데이터 이동, 전송과 연산의 중첩을 처리합니다. JIT(실행 시점 컴파일) 런타임은 Python으로 정의한 커널을 컴파일하고 BM1690에서 실행합니다.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-overview.png)
컴파일 개요. 재사용한 TileLang 프런트엔드에서 TPU 전용 메모리 할당, 파이프라인 변환, 백엔드 매핑으로 이어지며, JIT 런타임이 생성된 커널을 빌드하고 실행합니다.

## 컴파일러 설계

01

### 정적 메모리 할당

프로그램 실행 전에 각 데이터 블록을 칩 내부의 빠른 메모리 어디에 둘지 정합니다. 하드웨어의 배치 규칙을 따르고 메모리 용량을 넘지 않도록 합니다.

02

### 데이터 전송과 연산의 중첩

데이터 전송과 연산을 병렬로 진행할 수 있는 단계로 나눕니다. 각 단계는 필요한 데이터가 준비된 후 시작하도록 합니다.

03

### TPU 코드 생성과 실행

계산을 TPU가 실행할 수 있는 연산으로 변환하고 프로그램을 컴파일, 로딩, 실행합니다.

## 성능 평가

SOPHGO BM1690의 단일 코어에서 입력 크기를 컴파일 전에 확정한 조건으로 평가했습니다. 비교 기준은 Torch-TPU에서 사용하는 제조사의 최적화된 PPL 구현입니다. PPL(Primitive Programming Language)은 SOPHGO가 제공하는 저수준 프로그래밍 언어입니다.

행렬 곱셈, RMSNorm, RoPE, SwiGLU, 원소별 덧셈을 여러 입력 구성과 수치 형식으로 평가했습니다. RMSNorm은 값의 크기를 조정하고, RoPE는 시퀀스 내 위치를 표현하며, SwiGLU는 신경망의 비선형 변환을 수행합니다. 연산 종류별 평균 속도 향상은 PPL 대비 **1.05–1.23×**입니다.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-operators.png)
독립 연산 평가. M0–M4는 다섯 가지 테스트 입력 구성을 나타냅니다. BF16과 FP16은 16비트, FP32는 32비트 부동소수점 형식입니다. 1×는 PPL과 같은 실행 시간을 뜻하며 값이 클수록 빠릅니다. 1.05–1.23×는 연산 종류별 평균입니다.좌우로 스크롤해 차트를 볼 수 있습니다. 이미지를 선택하면 원본 크기로 열립니다.

TileLang-TPU는 여러 계산 단계를 하나로 합치는 융합 연산도 지원합니다. FlashAttention은 모델의 어텐션을 효율적으로 계산합니다. 여러 어텐션 헤드를 한 배치로 함께 처리하는 head-batched 알고리즘 최적화 후 PPL 대비 평균 **12.50×**의 속도 향상을 달성했습니다. 어텐션 헤드는 서로 다른 정보에 주목하는 병렬 계산 분기입니다.

AI 모델에서 흔히 사용하는 순방향 신경망인 MLP의 융합 연산에서는 MLP W8A16 Dequantized Forward가 평균 **1.01×**로 PPL과 거의 같은 성능을 보였습니다. W8A16은 8비트 가중치와 16비트 활성값을 뜻합니다. 역양자화는 저장된 저정밀도 가중치를 계산에 사용할 값으로 변환하는 과정입니다.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-attention-mlp.png)
융합 연산 평가. FlashAttention은 평균 12.50×, W8A16 MLP는 평균 1.01×입니다. B, H, S, D는 배치 크기, 어텐션 헤드 수, 시퀀스 길이, 헤드 차원입니다. M, H, I는 입력 행 수, 은닉층 너비, 중간층 너비입니다. 괄호 안의 수치는 테스트 입력 크기입니다.좌우로 스크롤해 차트를 볼 수 있습니다. 이미지를 선택하면 원본 크기로 열립니다.

## 코드 및 자료

[TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu)

## 관련 문제를 연구하고 계신가요?

[연락하기](https://tianxing-ren.netlify.app/ko/contact/)
