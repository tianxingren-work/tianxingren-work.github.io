[프로젝트로 돌아가기](https://tianxingren-work.github.io/ko/projects/)

프로젝트 리드

# TileLang-TPU

타일 단위 코드로 구현하는 TPU 성능.

주요 단계 완료 [오픈 소스](https://github.com/TongmingLAIC/tilelang-tpu)
TileLang SOPHGO TPU Compiler backends
[소스 코드](https://github.com/TongmingLAIC/tilelang-tpu) [연락하기](https://tianxingren-work.github.io/ko/contact/)

실제 하드웨어 평가 결과

## 고수준 인터페이스와 경쟁력 있는 커널 성능.

**1.10×**

PPL 대비 평균 속도 향상

**71 / 75**

구성에서 PPL보다 빠름

**3**

평가한 자료형

BF16 · FP16 · FP32

SOPHGO BM1690 카드 한 장에서 커널 5종, 입력 형태 5종, 자료형 3종을 평가했습니다. PPL 대비 평균 속도 향상은 TPU 커널 실행 시간 기준이며, 컴파일과 호스트 실행 시간은 포함하지 않습니다.

평가 환경

두 구현은 동일한 연산 의미, 입력 형태, 자료형과 벤더 컴파일 도구를 사용합니다. 각 구성에서 준비 실행 5회 후 10회 측정한 평균 시간을 사용했습니다. 71개 구성에서 더 빨랐고, 1개는 동등했으며, 3개는 더 느렸습니다.

Matmul · RMSNorm · RoPE · SwiGLU · Element-wise addition

Ubuntu 24.04 LTS · PPL SDK 1.4.195 · TPU driver 1.9.1

개요

## 프로그래밍 추상화는 유지하고 하드웨어 세부 사항은 컴파일러가 처리합니다.

TileLang-TPU는 상용 SOPHGO 가속기에 타일 단위 프로그래밍을 적용합니다. TileLang 프로그래밍 모델을 유지하면서 온칩 메모리 배치, 데이터 이동, 전송과 연산의 중첩을 컴파일러가 처리합니다. 컴파일러와 JIT 런타임은 Python 커널 정의부터 BM1690 실행까지의 전체 과정을 지원합니다.

[](https://tianxingren-work.github.io/assets/tilelang-tpu-overview.png)
컴파일 개요. 재사용한 TileLang 프런트엔드에서 TPU 전용 메모리 할당, 파이프라인 변환, 백엔드 매핑으로 이어지며, JIT 런타임이 생성된 커널을 빌드하고 실행합니다.

## 컴파일러 내부

01

### 정적 메모리 할당

정렬, 용량, 메모리 뱅크 배치를 고려해 컴파일 시점에 로컬 메모리 오프셋을 결정합니다.

02

### 구조화된 파이프라인 하향 변환

타일 루프를 명시적인 실행 단계로 변환하여 의존성을 유지하면서 데이터 전송과 연산을 중첩합니다.

03

### 백엔드 매핑과 런타임

TPU 커널 API 호출을 생성하고 호스트·디바이스 컴파일, 링크, 로딩, 실행으로 연결합니다.

## 코드 및 자료

[TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu) [소스 코드](https://github.com/TongmingLAIC/tilelang-tpu/tree/main/tpu_demo)

## 관련 문제를 연구하고 계신가요?

[인사 나누기](https://tianxingren-work.github.io/ko/contact/)
