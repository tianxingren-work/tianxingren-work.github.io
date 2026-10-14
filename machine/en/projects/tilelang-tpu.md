[Back to projects](https://tianxing-ren.netlify.app/projects/)

Project lead

# TileLang-TPU

Tile-level code. TPU performance.

Milestone complete [Open source](https://github.com/TongmingLAIC/tilelang-tpu)
TileLang SOPHGO TPU Compiler backends
[Source code](https://github.com/TongmingLAIC/tilelang-tpu) [Get in touch](https://tianxing-ren.netlify.app/contact/)

Overview

## Keep the programming abstraction. Let the compiler handle the hardware details.

TileLang-TPU brings tile-level programming to commercial SOPHGO accelerators. Tiles are small blocks of data used to express a computation. The compiler handles on-chip memory placement, data movement and overlapping transfers with computation. Its just-in-time (JIT) runtime compiles Python kernel definitions and launches them on the BM1690.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-overview.png)
Compilation overview. The reused TileLang frontend feeds TPU-specific memory allocation, pipeline lowering, and backend mapping. The JIT runtime builds and launches the generated kernels.

## Inside the compiler

01

### Static memory allocation

Plan where each data block sits in the chip’s fast local memory before the program runs, following the hardware’s placement rules and staying within its capacity.

02

### Overlap transfers and computation

Arrange data transfers and computation into stages that can run in parallel, with each step starting only when its required data is ready.

03

### Generate and run TPU code

Translate the computation into operations the TPU can execute, then compile, load and launch the program.

## Performance evaluation

Evaluated on a single core of the SOPHGO BM1690, with input sizes fixed before compilation. The baseline is the vendor’s optimized PPL implementation used by Torch-TPU. PPL (Primitive Programming Language) is SOPHGO’s low-level programming language.

We evaluated matrix multiplication, RMSNorm, RoPE, SwiGLU and element-wise addition across multiple input configurations and numerical formats. RMSNorm rescales values, RoPE encodes sequence positions and SwiGLU applies a nonlinear neural-network transformation. Average speedups by operator category are **1.05–1.23×** over PPL.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-operators.png)
Standalone operators. M0–M4 label five tested input configurations. BF16 and FP16 use 16-bit floating-point formats; FP32 uses 32 bits. A value of 1× means the same execution time as PPL, and larger values mean faster execution. The 1.05–1.23× summary gives averages by operator category.Scroll horizontally to read the chart. Select the image to open it at full size.

TileLang-TPU also supports fused operators that combine multiple computation steps. FlashAttention efficiently computes model attention. After an algorithm optimization that processes multiple attention heads together in a batch (head-batched), it achieves an average speedup of **12.50×** over PPL. Attention heads are parallel computation branches that attend to different information.

For a fused MLP, a feed-forward neural network commonly used within AI models, the MLP W8A16 Dequantized Forward operator averages **1.01×** over PPL, essentially matching its performance. W8A16 uses 8-bit weights and 16-bit activations. Dequantization converts the stored low-precision weights into values used by the computation.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-attention-mlp.png)
Fused workloads. FlashAttention averages 12.50× over PPL; the W8A16 MLP averages 1.01×. B, H, S and D denote batch size, attention heads, sequence length and head dimension. M, H and I denote input rows, hidden width and intermediate width. The tuples identify the tested input sizes.Scroll horizontally to read the chart. Select the image to open it at full size.

## Code & resources

[TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu)

## Working on a related problem?

[Say hello](https://tianxing-ren.netlify.app/contact/)
