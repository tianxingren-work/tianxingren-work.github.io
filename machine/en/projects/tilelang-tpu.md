[Back to projects](https://tianxing-ren.netlify.app/projects/)

Project lead

# TileLang-TPU

Tile-level code. TPU performance.

Milestone complete [Open source](https://github.com/TongmingLAIC/tilelang-tpu)
TileLang SOPHGO TPU Compiler backends
[Source code](https://github.com/TongmingLAIC/tilelang-tpu) [Get in touch](https://tianxing-ren.netlify.app/contact/)

RESULTS ON REAL HARDWARE

## A higher-level interface. Competitive kernel performance.

**1.10×**

average speedup over PPL

**71 / 75**

configurations faster than PPL

**3**

evaluated data types

BF16 · FP16 · FP32

Five kernels × five input shapes × three data types on one SOPHGO BM1690 card. Average speedup over PPL uses TPU kernel execution latency; compilation and host execution are outside this timing.

Evaluation setup

Both implementations use the same operator semantics, shapes, data types, and vendor compilation toolchain. Each case uses five warm-up runs and ten timed repetitions. The reported set includes 71 faster cases, one tie, and three slower cases.

Matmul · RMSNorm · RoPE · SwiGLU · Element-wise addition

Ubuntu 24.04 LTS · PPL SDK 1.4.195 · TPU driver 1.9.1

Overview

## Keep the programming abstraction. Let the compiler handle the hardware details.

TileLang-TPU brings tile-level programming to commercial SOPHGO accelerators. It preserves the TileLang programming model and turns on-chip memory placement, data movement, and transfer–compute overlap into compiler decisions. The compiler and JIT runtime provide an end-to-end path from a Python kernel definition to execution on BM1690.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-overview.png)
Compilation overview. The reused TileLang frontend feeds TPU-specific memory allocation, pipeline lowering, and backend mapping. The JIT runtime builds and launches the generated kernels.

## Inside the compiler

01

### Static memory allocation

Assign concrete local-memory offsets at compile time, accounting for alignment, capacity, and memory-bank placement.

02

### Structured pipeline lowering

Turn tiled loops into explicit execution stages so that data transfers can overlap with computation while preserving dependencies.

03

### Backend mapping and runtime

Generate TPU kernel API calls and connect the output to host/device compilation, linking, loading, and launch.

## Code & resources

[TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu) [Source code](https://github.com/TongmingLAIC/tilelang-tpu/tree/main/tpu_demo)

## Working on a related problem?

[Say hello](https://tianxing-ren.netlify.app/contact/)
