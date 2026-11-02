[Kembali ke projek](https://tianxingren-work.github.io/ms/projects/)

Peneraju projek

# TileLang-TPU

Kernel Python berprestasi tinggi untuk TPU SOPHGO

Fasa utama selesai [Sumber terbuka](https://github.com/TongmingLAIC/tilelang-tpu)

## Pengenalan

[TileLang-TPU](https://devcom.tlaic.ac.cn/news/a0d8aa85-a439-499c-9da9-68ebeec3c04b) membolehkan pembangun menulis kernel berprestasi tinggi untuk TPU SOPHGO dalam Python. Projek ini menggunakan abstraksi tile, frontend serta transformasi dan pengoptimuman bebas perkakasan daripada TileLang. Tile ialah blok data yang digunakan untuk menyatakan pengiraan. Pengkompil mengurus peruntukan memori dalam cip, pemindahan data, penjadualan saluran paip pengiraan dan pemilihan arahan TPU. Kompilasi tepat pada masa (JIT) menghubungkan takrif kernel Python dengan pelaksanaan pada peranti. Pembangun dapat menulis kernel yang ringkas tanpa mengurus butiran perkakasan ini secara manual. Bagi beban kerja yang diuji, prestasinya menyamai atau mengatasi pelaksanaan yang dioptimumkan oleh pengeluar.

Projek ini kini menyokong operasi lazim pembelajaran mendalam pada SOPHGO BM1690 dan telah melalui ujian prestasi pada cip tersebut. Kernel boleh dijalankan pada perkakasan sebenar atau dinyahpepijat dengan simulator perisian. Kerja seterusnya ialah menguji beban kerja inferens model bahasa besar yang lengkap dan meluaskan sokongan kepada pelaksanaan berbilang teras.

## Seni bina

Untuk membina kernel TPU yang pantas, pembangun perlu menentukan pengiraan, kedudukan data dalam memori cip, urutan pemindahan dan pengiraan, serta panggilan kepada antara muka arahan perkakasan. TileLang-TPU menggunakan semula frontend Python, Perwakilan Perantaraan Tensor (TIR) dan pas kompilasi umum TileLang. Backend khusus TPU mengurus kerja yang bergantung pada perkakasan.

Pembangun menerangkan pengiraan dan pemindahan data melalui operasi frontend TileLang-TPU. Backend semasa mengoptimumkan pelaksanaan dalam satu teras dan belum membahagikan tugas antara teras. Ia juga hanya menyokong bentuk input statik yang diketahui semasa kompilasi. Kompilasi untuk bentuk dinamik belum disokong.

[](https://tianxingren-work.github.io/assets/tilelang-tpu-overview-en.png)
Rajah 1. Aliran kompilasi dan pelaksanaan TileLang-TPU. Frontend TileLang digunakan semula. Backend TPU mengurus peruntukan memori, penjadualan saluran paip dan pemetaan antara muka perkakasan. Masa jalan JIT menghubungkan Python dengan pelaksanaan TPU. LMEM ialah memori setempat dalam cip, bank ialah bahagian memori, DMA memindahkan data dan intrinsic ialah operasi dalaman pengkompil yang dipetakan kepada panggilan perkakasan. [Lihat imej saiz penuh](https://tianxingren-work.github.io/assets/tilelang-tpu-overview-en.png)

## Fungsi utama

-

### Pengurusan memori dalam cip

Algoritma peruntukan alamat automatik direka mengikut seni bina memori dalam cip TPU. Pengkompil menganalisis tempoh hayat tensor berdasarkan bentuk, jenis data serta hubungan baca dan tulis. Tensor yang tempoh penggunaannya tidak bertindih boleh berkongsi ruang. Tensor yang dibaca serentak ditempatkan pada bank memori yang berbeza jika boleh, untuk mengurangkan konflik capaian.

-

### Saluran paip pemindahan dan pengiraan

Pengkompil menganalisis kebergantungan data antara unit pelaksanaan dan menyusun pemuatan, pengiraan serta penulisan balik dalam gelung tile mengikut bilangan peringkat saluran paip yang ditetapkan pembangun. Unit pemindahan data GDMA dijadualkan bersama unit pengiraan TIU. Tile seterusnya disediakan semasa tile semasa dikira, supaya pemindahan dan pengiraan dapat bertindih pada peringkat yang lebih kecil.

-

### Pemetaan arahan perkakasan

Operasi lazim seperti penyalinan dan pemindahan data, pendaraban matriks, pengiraan unsur demi unsur serta reduksi seperti jumlah dan nilai maksimum diterjemahkan kepada panggilan arahan perkakasan TPU-Kernel. Pengkompil melengkapkan bentuk, langkah akses, alamat dan jenis data untuk menjana kod peranti.

-

### Kompilasi dan panggilan daripada Python

Kompilasi JIT menjana program peranti dan kod panggilan pada hos secara automatik, kemudian mengkompil, memuatkan dan melancarkan kernel. Ia menyokong pelaksanaan pada TPU sebenar melalui PCIe serta penyahpepijatan dengan simulator perisian cmodel.

## Pelaksanaan dan hasil

Backend pengkompil BM1690, masa jalan JIT dan pelaksanaan operasi lazim model bahasa besar telah tersedia. Operasi yang disokong termasuk pendaraban matriks, RMSNorm, RoPE, SwiGLU, penambahan unsur demi unsur dan reduksi, termasuk operasi yang digunakan dalam inferens LLaMA dan DeepSeek.

Prestasi dinilai pada satu teras SOPHGO BM1690 dengan membandingkan TileLang-TPU dan pelaksanaan PPL yang dioptimumkan oleh pengeluar dalam pustaka operasi SOPHGO Torch-TPU. Setiap perbandingan menggunakan bentuk input dan jenis data yang sama, dengan bentuk ditetapkan semasa kompilasi. Ukuran meliputi masa pelaksanaan kernel pada peranti. PPL (Primitive Programming Language) ialah bahasa pengaturcaraan kernel SOPHGO.

Purata peningkatan kelajuan berbanding PPL ialah **1.14×** untuk pendaraban matriks, **1.23×** untuk RMSNorm, **1.08×** untuk RoPE, **1.11×** untuk SwiGLU dan **1.05×** untuk penambahan unsur demi unsur. Kelima-lima jenis operasi lebih pantas secara purata. Bilangan baris kod efektif bagi pelaksanaan kernel berkurang sebanyak **44.85%** berbanding PPL. Bagi beban kerja yang diuji, abstraksi tile dapat menghasilkan kod yang lebih ringkas dengan prestasi yang menyamai atau mengatasi pustaka pengeluar.

RMSNorm menormalkan skala nilai pengaktifan, RoPE mengekod kedudukan token dan SwiGLU ialah fungsi pengaktifan berpagar yang digunakan dalam lapisan suap hadapan. BF16 dan FP16 ialah format titik apung 16 bit, manakala FP32 menggunakan 32 bit.

[](https://tianxingren-work.github.io/assets/tilelang-tpu-operators.png)
Rajah 2. Peningkatan kelajuan lima operasi TPU berbanding pelaksanaan PPL pengeluar. Paksi mendatar mewakili bentuk input dan paksi menegak menunjukkan peningkatan kelajuan. Nilai melebihi 1 bermakna TileLang-TPU lebih pantas. M0–M4 masing-masing mewakili (64,64), (128,128), (256,256), (512,512) dan (1024,1024). Untuk pendaraban matriks, K = M = N. [Lihat imej saiz penuh](https://tianxingren-work.github.io/assets/tilelang-tpu-operators.png)

TileLang-TPU turut menyokong kernel gabungan yang menyatukan beberapa langkah pengiraan. Untuk FlashAttention, iaitu kernel perhatian yang digunakan dalam model bahasa besar, pelaksanaannya mencapai purata peningkatan kelajuan **1.36×** berbanding PPL dengan rumusan algoritma yang sama.

Bagi MLP W8A16 Dequantized Forward, purata peningkatan kelajuan berbanding PPL ialah **1.01×** untuk konfigurasi yang diuji, iaitu hampir sama dengan prestasi asas. MLP ialah rangkaian suap hadapan model. W8A16 bermaksud pemberat 8 bit dan nilai pengaktifan 16 bit. Penyahkuantuman menukar pemberat berketepatan rendah yang disimpan kepada nilai yang digunakan untuk pengiraan.

[](https://tianxingren-work.github.io/assets/tilelang-tpu-attention-mlp-en.png)
Rajah 3. Peningkatan kelajuan dua kernel gabungan TPU berbanding pelaksanaan PPL pengeluar. Purata FlashAttention ialah 1.36× dan MLP Forward W8A16 ialah 1.01×. Pada panel kiri, B, H, S dan D ialah saiz kelompok, bilangan kepala perhatian, panjang jujukan dan dimensi kepala. Pada panel kanan, M, H dan I ialah bilangan baris input, lebar lapisan tersembunyi dan lebar lapisan perantaraan. [Lihat imej saiz penuh](https://tianxingren-work.github.io/assets/tilelang-tpu-attention-mlp-en.png)

## Kepentingan projek

**TileLang-TPU menunjukkan cara membawa cip AI khusus ke dalam ekosistem pengaturcaraan kernel terbuka.** Bagi TPU SOPHGO, projek ini menggunakan semula antara muka pengaturcaraan dan komponen umum pengkompil TileLang. Pengurusan memori, pemindahan data dan panggilan perkakasan yang khusus kepada cip ditempatkan dalam backend tersendiri. Pendekatan ini dapat mengurangkan kerja berulang ketika membina persekitaran pengaturcaraan kernel untuk cip baharu. Pengeluar boleh menggunakan alat, pelaksanaan kernel dan teknik kompilasi daripada komuniti. Pembangun pula boleh menggunakan kod peringkat tile yang biasa mereka gunakan, sambil menyesuaikan algoritma dan prestasi mengikut ciri cip.

**Pelaksanaan sumber terbuka ini menyediakan asas kerjasama** untuk pengeluar cip AI, penyelidik pengkompil dan pembangun model bahasa besar di China serta negara lain. Projek ini mengalu-alukan kerjasama dalam sokongan perkakasan baharu, pengoptimuman kernel yang kompleks dan pecutan pelbagai model pada perkakasan. Perkongsian pelaksanaan dan pengalaman pengoptimuman membolehkan hasil kerja digunakan semula serta diperluas, dan memberi pengguna lebih banyak pilihan pembangunan.

## Pautan berkaitan

[Kod sumber · TileLang-TPU](https://github.com/TongmingLAIC/tilelang-tpu)
