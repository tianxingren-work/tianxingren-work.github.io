[Kembali ke projek](https://tianxing-ren.netlify.app/ms/projects/)

Peneraju projek

# TileLang-TPU

Kod peringkat tile. Prestasi TPU.

Fasa utama selesai [Sumber terbuka](https://github.com/TongmingLAIC/tilelang-tpu)
TileLang SOPHGO TPU Compiler backends
[Kod sumber](https://github.com/TongmingLAIC/tilelang-tpu) [Hubungi saya](https://tianxing-ren.netlify.app/ms/contact/)

HASIL PADA PERKAKASAN SEBENAR

## Antara muka aras tinggi. Prestasi kernel yang kompetitif.

**1.10×**

purata peningkatan kelajuan berbanding PPL

**71 / 75**

konfigurasi lebih pantas daripada PPL

**3**

jenis data yang dinilai

BF16 · FP16 · FP32

Lima kernel, lima bentuk input dan tiga jenis data diuji pada satu kad SOPHGO BM1690. Purata peningkatan kelajuan berbanding PPL berdasarkan masa pelaksanaan kernel TPU, tanpa masa kompilasi atau pelaksanaan hos.

Persediaan penilaian

Kedua-dua pelaksanaan menggunakan semantik operator, bentuk input, jenis data dan rantaian alat vendor yang sama. Setiap konfigurasi menjalani lima larian pemanasan dan sepuluh larian bermasa. Daripada set ini, 71 konfigurasi lebih pantas, satu setara dan tiga lebih perlahan.

Matmul · RMSNorm · RoPE · SwiGLU · Element-wise addition

Ubuntu 24.04 LTS · PPL SDK 1.4.195 · TPU driver 1.9.1

Gambaran keseluruhan

## Kekalkan abstraksi pengaturcaraan. Serahkan butiran perkakasan kepada pengkompil.

TileLang-TPU membawa pengaturcaraan peringkat tile kepada pemecut SOPHGO komersial. Model pengaturcaraan TileLang dikekalkan, sementara penempatan memori dalam cip, pergerakan data dan pertindihan pemindahan dengan pengiraan diurus oleh pengkompil. Pengkompil dan masa jalan JIT menyokong keseluruhan proses daripada takrif kernel Python hingga pelaksanaan pada BM1690.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-overview.png)
Gambaran keseluruhan kompilasi. Frontend TileLang disambungkan kepada peruntukan memori khusus TPU, penurunan saluran paip dan pemetaan backend. Masa jalan JIT membina serta melancarkan kernel yang dijana.

## Di dalam pengkompil

01

### Peruntukan memori statik

Menentukan ofset memori setempat semasa kompilasi dengan mengambil kira penjajaran, kapasiti dan penempatan bank memori.

02

### Penurunan saluran paip berstruktur

Menukar gelung tile kepada peringkat pelaksanaan yang jelas supaya pemindahan data dapat bertindih dengan pengiraan tanpa melanggar kebergantungan.

03

### Pemetaan backend dan masa jalan

Menjana panggilan API kernel TPU dan menghubungkan hasilnya kepada kompilasi hos/peranti, pemautan, pemuatan dan pelancaran.

## Kod dan sumber

[TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu) [Kod sumber](https://github.com/TongmingLAIC/tilelang-tpu/tree/main/tpu_demo)

## Mengkaji masalah yang berkaitan?

[Sapa saya](https://tianxing-ren.netlify.app/ms/contact/)
