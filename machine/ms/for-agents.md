# Tianxing Ren / 任天行

> AI compilers, Tile-level programming, Heterogeneous computing

https://tianxingren-work.github.io/ms/for-agents/

Language: ms. Updated: 2026-10-14.

## Profil dan penyelidikan

Saya menyelidik pengkompil AI agar pelbagai algoritma AI dapat berjalan dengan betul dan cekap pada perkakasan AI baharu. Saya ingin memudahkan pengaturcaraan untuk manusia dan ejen.

Saya mengikuti pengajian Doktor Kejuruteraan di Universiti Peking melalui program bersama Makmal Zhongguancun. Saya menyelidik pengkompil AI, pengaturcaraan peringkat tile dan pengkomputeran heterogen, serta berminat dengan bahasa pengaturcaraan dan seni bina komputer yang berkaitan.

Saya menjalankan penyelidikan kedoktoran di bawah bimbingan [Prof. Tao Xie](https://taoxiease.github.io/) dan [Prof. Wei Yang](https://youngwei.com/) .

## Projek penyelidikan

### TileLang-TPU

Peneraju projek

Backend pengkompil TileLang untuk menulis kernel berprestasi tinggi dalam Python pada TPU SOPHGO.

TileLang-TPU membolehkan pembangun menulis kernel berprestasi tinggi untuk TPU SOPHGO dalam Python. Projek ini menggunakan abstraksi tile, frontend serta transformasi dan pengoptimuman bebas perkakasan daripada TileLang. Tile ialah blok data yang digunakan untuk menyatakan pengiraan. Pengkompil mengurus peruntukan memori dalam cip, pemindahan data, penjadualan saluran paip pengiraan dan pemilihan arahan TPU. Kompilasi tepat pada masa (JIT) menghubungkan takrif kernel Python dengan pelaksanaan pada peranti. Pembangun dapat menulis kernel yang ringkas tanpa mengurus butiran perkakasan ini secara manual. Bagi beban kerja yang diuji, prestasinya menyamai atau mengatasi pelaksanaan yang dioptimumkan oleh pengeluar.

Projek ini kini menyokong operasi lazim pembelajaran mendalam pada SOPHGO BM1690 dan telah melalui ujian prestasi pada cip tersebut. Kernel boleh dijalankan pada perkakasan sebenar atau dinyahpepijat dengan simulator perisian. Kerja seterusnya ialah menguji beban kerja inferens model bahasa besar yang lengkap dan meluaskan sokongan kepada pelaksanaan berbilang teras.

Tahap projek: Fasa utama selesai
Ketersediaan sumber: https://github.com/TongmingLAIC/tilelang-tpu

https://tianxingren-work.github.io/ms/projects/tilelang-tpu/

Untuk membina kernel TPU yang pantas, pembangun perlu menentukan pengiraan, kedudukan data dalam memori cip, urutan pemindahan dan pengiraan, serta panggilan kepada antara muka arahan perkakasan. TileLang-TPU menggunakan semula frontend Python, Perwakilan Perantaraan Tensor (TIR) dan pas kompilasi umum TileLang. Backend khusus TPU mengurus kerja yang bergantung pada perkakasan.
Pembangun menerangkan pengiraan dan pemindahan data melalui operasi frontend TileLang-TPU. Backend semasa mengoptimumkan pelaksanaan dalam satu teras dan belum membahagikan tugas antara teras. Ia juga hanya menyokong bentuk input statik yang diketahui semasa kompilasi. Kompilasi untuk bentuk dinamik belum disokong.

Backend pengkompil BM1690, masa jalan JIT dan pelaksanaan operasi lazim model bahasa besar telah tersedia. Operasi yang disokong termasuk pendaraban matriks, RMSNorm, RoPE, SwiGLU, penambahan unsur demi unsur dan reduksi, termasuk operasi yang digunakan dalam inferens LLaMA dan DeepSeek.

Prestasi dinilai pada satu teras SOPHGO BM1690 dengan membandingkan TileLang-TPU dan pelaksanaan PPL yang dioptimumkan oleh pengeluar dalam pustaka operasi SOPHGO Torch-TPU. Setiap perbandingan menggunakan bentuk input dan jenis data yang sama, dengan bentuk ditetapkan semasa kompilasi. Ukuran meliputi masa pelaksanaan kernel pada peranti. PPL (Primitive Programming Language) ialah bahasa pengaturcaraan kernel SOPHGO.

Purata peningkatan kelajuan berbanding PPL ialah **1.14×** untuk pendaraban matriks, **1.23×** untuk RMSNorm, **1.08×** untuk RoPE, **1.11×** untuk SwiGLU dan **1.05×** untuk penambahan unsur demi unsur. Kelima-lima jenis operasi lebih pantas secara purata. Bilangan baris kod efektif bagi pelaksanaan kernel berkurang sebanyak **44.85%** berbanding PPL. Bagi beban kerja yang diuji, abstraksi tile dapat menghasilkan kod yang lebih ringkas dengan prestasi yang menyamai atau mengatasi pustaka pengeluar.

TileLang-TPU turut menyokong kernel gabungan yang menyatukan beberapa langkah pengiraan. Untuk FlashAttention, iaitu kernel perhatian yang digunakan dalam model bahasa besar, pelaksanaannya mencapai purata peningkatan kelajuan **1.36×** berbanding PPL dengan rumusan algoritma yang sama.

Bagi MLP W8A16 Dequantized Forward, purata peningkatan kelajuan berbanding PPL ialah **1.01×** untuk konfigurasi yang diuji, iaitu hampir sama dengan prestasi asas. MLP ialah rangkaian suap hadapan model. W8A16 bermaksud pemberat 8 bit dan nilai pengaktifan 16 bit. Penyahkuantuman menukar pemberat berketepatan rendah yang disimpan kepada nilai yang digunakan untuk pengiraan.

- Pengurusan memori dalam cip: Algoritma peruntukan alamat automatik direka mengikut seni bina memori dalam cip TPU. Pengkompil menganalisis tempoh hayat tensor berdasarkan bentuk, jenis data serta hubungan baca dan tulis. Tensor yang tempoh penggunaannya tidak bertindih boleh berkongsi ruang. Tensor yang dibaca serentak ditempatkan pada bank memori yang berbeza jika boleh, untuk mengurangkan konflik capaian.
- Saluran paip pemindahan dan pengiraan: Pengkompil menganalisis kebergantungan data antara unit pelaksanaan dan menyusun pemuatan, pengiraan serta penulisan balik dalam gelung tile mengikut bilangan peringkat saluran paip yang ditetapkan pembangun. Unit pemindahan data GDMA dijadualkan bersama unit pengiraan TIU. Tile seterusnya disediakan semasa tile semasa dikira, supaya pemindahan dan pengiraan dapat bertindih pada peringkat yang lebih kecil.
- Pemetaan arahan perkakasan: Operasi lazim seperti penyalinan dan pemindahan data, pendaraban matriks, pengiraan unsur demi unsur serta reduksi seperti jumlah dan nilai maksimum diterjemahkan kepada panggilan arahan perkakasan TPU-Kernel. Pengkompil melengkapkan bentuk, langkah akses, alamat dan jenis data untuk menjana kod peranti.
- Kompilasi dan panggilan daripada Python: Kompilasi JIT menjana program peranti dan kod panggilan pada hos secara automatik, kemudian mengkompil, memuatkan dan melancarkan kernel. Ia menyokong pelaksanaan pada TPU sebenar melalui PCIe serta penyahpepijatan dengan simulator perisian cmodel.

### TileLang-RISC-V

Peneraju projek

Membawa TileLang ke CPU RISC-V dengan pecutan matriks AME. Usaha berterusan bersama penyelidik perkakasan sumber terbuka dan sistem.

Projek ini membangunkan backend TileLang untuk CPU AI RISC-V AME bersama Institut Cip Sumber Terbuka Beijing dan Institut Perisian, Akademi Sains China. Kerja semasa menumpukan pada pemetaan model pengaturcaraan kepada arahan sasaran serta pembinaan laluan kompilasi dan pelaksanaan yang boleh digunakan.

Tahap projek: Sedang dijalankan
Ketersediaan sumber: Kod sumber belum dibuka kepada umum

https://tianxingren-work.github.io/ms/projects/tilelang-riscv/

- Model pengaturcaraan: Menyatakan operator AI lazim melalui program peringkat tile dan mengenal pasti maklumat yang diperlukan oleh backend.
- Penyepaduan sasaran: Menghubungkan penurunan kompilasi, pemetaan arahan AME dan persekitaran pelaksanaan.
- Penilaian: Menguji ketepatan dan prestasi operator merentas konfigurasi sasaran, kemudian menggunakan hasilnya untuk mengoptimumkan backend.

## Sumbangan sumber terbuka

- [TileLang](https://github.com/tile-ai/tilelang) — contributor
- [Asterinas](https://github.com/asterinas/asterinas) — contributor

## Pendidikan

- Universiti Peking, Pelajar Doktor Kejuruteraan, Maklumat Elektronik. Sep 2025 – Jul 2030 · dijangka
- Universiti Beihang, Sarjana Muda Kejuruteraan, Keselamatan Siber. Sep 2021 – Jul 2025
  GPA 3.77 / 4.0. Purata markah 90.41 / 100

Semasa pengajian sarjana muda, saya menjalankan penyelidikan terutamanya di bawah bimbingan [Prof. Hua Guo](https://cst.buaa.edu.cn/info/1112/2741.htm) . Saya menyiapkan pelaksanaan suite kriptografi kekisi algebra pada FPGA dengan penggunaan keluasan litar yang rendah. Projek ini menerima Hadiah Ketiga dalam Pertandingan Teknologi Kriptografi Kebangsaan. Saya juga menyiapkan mekanisme perlindungan kunci perkhidmatan awan berasaskan pengiraan berbilang pihak yang selamat, yang menerima Hadiah Pertama dalam Pertandingan Keselamatan Maklumat Mahasiswa Kebangsaan.

## Pengalaman latihan industri

### Pusat Inovasi Teknologi Maklumat Tongming Lake Beijing

Dis 2025 – Kini. Pelatih Sistem Pintar

- Menyesuaikan TileLang untuk TPU SOPHGO SG2260E yang menggunakan sambungan tensor RISC-V.
- Membangunkan sokongan TileLang untuk CPU RISC-V dengan pecutan matriks AME.

### Institut Cip Sumber Terbuka Beijing

Dis 2024 – Ogo 2025. Pelatih Pembangunan Perisian Sistem AI

- Memperluas tindanan kompilasi Triton kepada TPU SOPHGO melalui penterjemahan ke rantaian alat vendor.
- Membina rangka kerja kompilasi operator berasaskan TileLang, termasuk pustaka operator TPU, pas saluran paip dan penjanaan kod automatik bagi operator LLaMA.
- Dalam konfigurasi yang diuji, beberapa operator menyamai atau mengatasi prestasi pelaksanaan yang dioptimumkan oleh vendor.

### Eversec (Beijing) Technology Co., Ltd.

Jul 2024 – Ogo 2024. Pelatih Perkhidmatan Keselamatan

- Membantu penilaian keselamatan rangkaian yang dibenarkan menggunakan Burp Suite dan alat berkaitan, menyusun penemuan serta mengenal pasti risiko.
- Mengumpul dan menyeragamkan lebih 100 rekod PCAP trafik log masuk peranti IoT industri menggunakan Wireshark.

## Anugerah dan biasiswa

- 2025–2026: Biasiswa Kecemerlangan Akademik
- 2024–2025: Anugerah Khas, Biasiswa Pertandingan Akademik; Hadiah Kedua, Biasiswa Kecemerlangan Akademik
- 2023–2024: Pelajar Cemerlang; Anugerah Khas, Biasiswa Pertandingan Akademik; Hadiah Kedua, Biasiswa Khidmat Sosial
- 2022–2023: Hadiah Pertama, Biasiswa Pertandingan Akademik; Hadiah Kedua, Biasiswa Kecemerlangan Akademik

## Lawatan

- Universiti Cina Hong Kong. Pelajar Lawatan Sekolah Musim Panas. Jul 2024 – Ogo 2024

## Hubungi

Alamat e-mel awam dan pautan GitHub boleh dibaca terus. Saya mengalu-alukan perbincangan tentang pengkompil AI, perkakasan AI baharu dan penyelidikan sistem berkaitan.

E-mel: tianxingren25 [at] stu [dot] pku [dot] edu [dot] cn
https://tianxingren-work.github.io/ms/contact/
https://github.com/LeslinD
https://github.com/tianxingren-work

## Format bacaan

Pautan fail di bawah menyediakan profil lengkap, maklumat hubungan dan rekod projek dalam format Markdown atau JSON.

- Markdown: https://tianxingren-work.github.io/machine/ms/for-agents.md
- JSON: https://tianxingren-work.github.io/machine/ms/for-agents.json
- Contact JSON: https://tianxingren-work.github.io/data/contact.json
