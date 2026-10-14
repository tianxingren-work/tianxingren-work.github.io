[Kembali ke projek](https://tianxing-ren.netlify.app/ms/projects/)

Peneraju projek

# TileLang-TPU

Kod peringkat tile. Prestasi TPU.

Fasa utama selesai [Sumber terbuka](https://github.com/TongmingLAIC/tilelang-tpu)
TileLang SOPHGO TPU Compiler backends
[Kod sumber](https://github.com/TongmingLAIC/tilelang-tpu) [Hubungi saya](https://tianxing-ren.netlify.app/ms/contact/)

Gambaran keseluruhan

## Kekalkan abstraksi pengaturcaraan. Serahkan butiran perkakasan kepada pengkompil.

TileLang-TPU membawa pengaturcaraan peringkat tile kepada pemecut SOPHGO komersial. Tile ialah blok data kecil yang digunakan untuk menyatakan pengiraan. Pengkompil mengurus penempatan memori dalam cip, pergerakan data dan pertindihan pemindahan dengan pengiraan. Masa jalan JIT mengkompil takrif kernel Python apabila diperlukan dan menjalankannya pada BM1690.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-overview.png)
Gambaran keseluruhan kompilasi. Frontend TileLang disambungkan kepada peruntukan memori khusus TPU, penurunan saluran paip dan pemetaan backend. Masa jalan JIT membina serta melancarkan kernel yang dijana.

## Reka bentuk pengkompil

01

### Peruntukan memori statik

Merancang kedudukan setiap blok data dalam memori pantas pada cip sebelum program dijalankan, mengikut aturan perkakasan dan had kapasiti memori.

02

### Pemindahan data dan pengiraan serentak

Menyusun pemindahan data dan pengiraan kepada peringkat yang boleh berjalan serentak. Setiap langkah hanya bermula apabila data yang diperlukan tersedia.

03

### Menjana dan menjalankan kod TPU

Menterjemah pengiraan kepada operasi yang boleh dilaksanakan oleh TPU, kemudian mengkompil, memuatkan dan menjalankan program.

## Penilaian prestasi

Penilaian dijalankan pada satu teras SOPHGO BM1690, dengan saiz input ditetapkan sebelum kompilasi. Prestasi dibandingkan dengan pelaksanaan PPL yang dioptimumkan oleh pengeluar dan digunakan dalam Torch-TPU. PPL (Primitive Programming Language) ialah bahasa pengaturcaraan aras rendah SOPHGO.

Kami menilai pendaraban matriks, RMSNorm, RoPE, SwiGLU dan penambahan unsur demi unsur dengan pelbagai konfigurasi input dan format nombor. RMSNorm melaraskan skala nilai, RoPE mengekod kedudukan dalam jujukan dan SwiGLU menjalankan transformasi tak linear dalam rangkaian neural. Purata peningkatan kelajuan mengikut jenis operasi ialah **1.05–1.23×** berbanding PPL.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-operators.png)
Operasi kendiri. M0–M4 mewakili lima konfigurasi input yang diuji. BF16 dan FP16 ialah format titik apung 16 bit, manakala FP32 menggunakan 32 bit. Nilai 1× bermaksud masa pelaksanaan yang sama dengan PPL; nilai lebih besar bermaksud lebih pantas. Ringkasan 1.05–1.23× ialah purata mengikut jenis operasi.Tatal ke kiri atau kanan untuk membaca carta. Pilih imej untuk membuka saiz penuh.

TileLang-TPU turut menyokong operasi gabungan yang menyatukan beberapa langkah pengiraan. FlashAttention mengira perhatian model dengan cekap. Selepas pengoptimuman algoritma yang memproses beberapa kepala perhatian dalam kelompok yang sama (head-batched), purata peningkatan kelajuannya mencapai **12.50×** berbanding PPL. Kepala perhatian ialah cabang pengiraan selari yang memberi tumpuan kepada maklumat berbeza.

Bagi MLP gabungan, iaitu rangkaian neural suap hadapan yang lazim dalam model AI, operasi MLP W8A16 Dequantized Forward mencapai purata **1.01×** dan hampir menyamai prestasi PPL. W8A16 menggunakan pemberat 8 bit dan nilai pengaktifan 16 bit. Penyahkuantuman menukar pemberat berketepatan rendah yang disimpan kepada nilai untuk pengiraan.

[](https://tianxing-ren.netlify.app/assets/tilelang-tpu-attention-mlp.png)
Operasi gabungan. Purata FlashAttention ialah 12.50× dan MLP W8A16 ialah 1.01×. B, H, S dan D mewakili saiz kelompok, bilangan kepala perhatian, panjang jujukan dan dimensi kepala. M, H dan I ialah bilangan baris input, lebar lapisan tersembunyi dan lebar lapisan perantaraan. Nilai dalam kurungan ialah saiz input yang diuji.Tatal ke kiri atau kanan untuk membaca carta. Pilih imej untuk membuka saiz penuh.

## Kod dan sumber

[TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu)

## Mengkaji masalah yang berkaitan?

[Hubungi saya](https://tianxing-ren.netlify.app/ms/contact/)
