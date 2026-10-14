# For agents

Profil, projek dan pengalaman dikumpulkan di sini untuk dibaca oleh Codex, Claude Code dan alat automasi lain. Pautan sumber disertakan untuk butiran lanjut dan rujukan.

## Profil dan penyelidikan

Salam, saya **Tianxing Ren.** Saya menyelidik pengkompil AI agar pelbagai algoritma AI dapat berjalan dengan betul dan cekap pada perkakasan AI baharu, serta memudahkan pengaturcaraan untuk manusia dan ejen.

Saya mengikuti pengajian Doktor Kejuruteraan di Universiti Peking melalui program bersama Makmal Zhongguancun. Saya menyelidik pengkompil AI, pengaturcaraan peringkat tile dan pengkomputeran heterogen, serta berminat dengan bahasa pengaturcaraan dan seni bina komputer yang berkaitan.

Penyelia saya ialah [Tao Xie](https://taoxiease.github.io/) dan [Wei Yang](https://youngwei.com/) .

Pengkompil AI, pengaturcaraan peringkat tile dan pengkomputeran heterogen.

## Projek yang saya terajui

### [TileLang-TPU](https://tianxingren-work.github.io/ms/projects/tilelang-tpu/)

Peneraju projek

Backend TileLang untuk TPU SOPHGO, daripada perancangan memori ketika kompilasi hingga pelaksanaan kernel.

TileLang-TPU membawa pengaturcaraan peringkat tile kepada pemecut SOPHGO komersial. Model pengaturcaraan TileLang dikekalkan, sementara penempatan memori dalam cip, pergerakan data dan pertindihan pemindahan dengan pengiraan diurus oleh pengkompil. Pengkompil dan masa jalan JIT menyokong keseluruhan proses daripada takrif kernel Python hingga pelaksanaan pada BM1690.

Tahap projek
Fasa utama selesai
Ketersediaan sumber
[Sumber terbuka](https://github.com/TongmingLAIC/tilelang-tpu)

Lima kernel, lima bentuk input dan tiga jenis data diuji pada satu kad SOPHGO BM1690. Purata peningkatan kelajuan berbanding PPL berdasarkan masa pelaksanaan kernel TPU, tanpa masa kompilasi atau pelaksanaan hos.

- 1.10× purata peningkatan kelajuan berbanding PPL

- 71 / 75 konfigurasi lebih pantas daripada PPL

- BF16 · FP16 · FP32

Kedua-dua pelaksanaan menggunakan semantik operator, bentuk input, jenis data dan rantaian alat vendor yang sama. Setiap konfigurasi menjalani lima larian pemanasan dan sepuluh larian bermasa. Daripada set ini, 71 konfigurasi lebih pantas, satu setara dan tiga lebih perlahan.

- **Peruntukan memori statik** Menentukan ofset memori setempat semasa kompilasi dengan mengambil kira penjajaran, kapasiti dan penempatan bank memori.

- **Penurunan saluran paip berstruktur** Menukar gelung tile kepada peringkat pelaksanaan yang jelas supaya pemindahan data dapat bertindih dengan pengiraan tanpa melanggar kebergantungan.

- **Pemetaan backend dan masa jalan** Menjana panggilan API kernel TPU dan menghubungkan hasilnya kepada kompilasi hos/peranti, pemautan, pemuatan dan pelancaran.

### [TileLang-RISC-V](https://tianxingren-work.github.io/ms/projects/tilelang-riscv/)

Peneraju projek

Membawa TileLang ke CPU RISC-V dengan pecutan matriks AME. Usaha berterusan bersama penyelidik perkakasan sumber terbuka dan sistem.

Projek ini membangunkan backend TileLang untuk CPU AI RISC-V AME bersama Institut Cip Sumber Terbuka Beijing dan Institut Perisian, Akademi Sains China. Kerja semasa menumpukan pada pemetaan model pengaturcaraan kepada arahan sasaran serta pembinaan laluan kompilasi dan pelaksanaan yang boleh digunakan.

Tahap projek
Sedang berjalan
Ketersediaan sumber
Kod sumber belum dibuka kepada umum
- **Model pengaturcaraan** Menyatakan operator AI lazim melalui program peringkat tile dan mengenal pasti maklumat yang diperlukan oleh backend.

- **Penyepaduan sasaran** Menghubungkan penurunan kompilasi, pemetaan arahan AME dan persekitaran pelaksanaan.

- **Penilaian** Menguji ketepatan dan prestasi operator merentas konfigurasi sasaran, kemudian menggunakan hasilnya untuk mengoptimumkan backend.

Institusi rakan kerjasama

- [Institut Cip Sumber Terbuka Beijing](https://www.bosc.ac.cn/)

- [Institut Perisian, Akademi Sains China](https://is.cas.cn/)

## Projek sumber terbuka yang saya sertai

- [TileLang](https://github.com/tile-ai/tilelang)

- [Asterinas](https://github.com/asterinas/asterinas)

## Pendidikan

Sep 2025 – Jul 2030 · dijangka

### [Universiti Peking](https://www.pku.edu.cn/)

Pelajar Doktor Kejuruteraan · Maklumat Elektronik

[Pusat Pengajian Perisian dan Mikroelektronik](https://ss.pku.edu.cn/)

Latihan kedoktoran bersama Makmal Zhongguancun.

Penyelia saya ialah [Tao Xie](https://taoxiease.github.io/) dan [Wei Yang](https://youngwei.com/) .

Sep 2021 – Jul 2025

### [Universiti Beihang](https://www.buaa.edu.cn/)

Sarjana Muda Kejuruteraan · Keselamatan Siber

[Pusat Pengajian Sains dan Teknologi Siber](https://cst.buaa.edu.cn/)

Semasa pengajian sarjana muda, saya menjalankan kerjasama penyelidikan bersama [Hua Guo](https://cst.buaa.edu.cn/info/1112/2741.htm) .

GPA **3.77 / 4.00** Purata markah **90.41 / 100**

## Pengalaman latihan industri

Dis 2025 – Kini

### [Pusat Inovasi Teknologi Maklumat Tongming Lake Beijing](https://www.tlaic.ac.cn/)

Pelatih Sistem Pintar

- Menyesuaikan TileLang untuk TPU SOPHGO SG2260E yang menggunakan sambungan tensor RISC-V.

- Membangunkan sokongan TileLang untuk CPU RISC-V dengan pecutan matriks AME.

Dis 2024 – Ogo 2025

### [Institut Cip Sumber Terbuka Beijing](https://www.bosc.ac.cn/)

Pelatih Pembangunan Perisian Sistem AI

- Memperluas tindanan kompilasi Triton kepada TPU SOPHGO melalui penterjemahan ke rantaian alat vendor.

- Membina rangka kerja kompilasi operator berasaskan TileLang, termasuk pustaka operator TPU, pas saluran paip dan penjanaan kod automatik bagi operator LLaMA.

- Dalam konfigurasi yang diuji, beberapa operator menyamai atau mengatasi prestasi pelaksanaan yang dioptimumkan oleh vendor.

Jul 2024 – Ogo 2024

### [Eversec (Beijing) Technology Co., Ltd.](https://eversec.com.cn/)

Pelatih Perkhidmatan Keselamatan

- Membantu penilaian keselamatan rangkaian yang dibenarkan menggunakan Burp Suite dan alat berkaitan, menyusun penemuan serta mengenal pasti risiko.

- Mengumpul dan menyeragamkan lebih 100 rekod PCAP trafik log masuk peranti IoT industri menggunakan Wireshark.

## Anugerah dan biasiswa

2025–2026

Biasiswa Kecemerlangan Akademik

[Universiti Peking](https://www.pku.edu.cn/)

2024–2025

Anugerah Khas, Biasiswa Pertandingan Akademik; Hadiah Kedua, Biasiswa Kecemerlangan Akademik

[Universiti Beihang](https://www.buaa.edu.cn/)

2023–2024

Pelajar Cemerlang; Anugerah Khas, Biasiswa Pertandingan Akademik; Hadiah Kedua, Biasiswa Khidmat Sosial

[Universiti Beihang](https://www.buaa.edu.cn/)

2022–2023

Hadiah Pertama, Biasiswa Pertandingan Akademik; Hadiah Kedua, Biasiswa Kecemerlangan Akademik

[Universiti Beihang](https://www.buaa.edu.cn/)

## Lawatan

Jul 2024 – Ogo 2024

### [Universiti Cina Hong Kong](https://www.cuhk.edu.hk/)

Pelajar Lawatan Sekolah Musim Panas

## Alat untuk pembantu AI

Baca Markdown dan JSON terus melalui pautan di bawah. Pelayar yang menyokong WebMCP turut menyediakan alat untuk membaca profil, menyenaraikan projek dan mencari kerja berkaitan topik, dengan sumber awam.

[Takrif alat](https://tianxingren-work.github.io/data/agent-tools.json)

```text
GET /machine/ms/for-agents.json
GET /data/projects.json
```

## Hubungi

Untuk pertukaran idea dan kerjasama penyelidikan, hubungi Tianxing Ren melalui halaman hubungan atau profil GitHub.

- [Hubungi saya](https://tianxingren-work.github.io/ms/contact/)

- [GitHub / LeslinD](https://github.com/LeslinD)

- [GitHub / tianxingren-work](https://github.com/tianxingren-work)

## Baca fail secara terus

- [`/llms.txt`](https://tianxingren-work.github.io/llms.txt)

- [`/llms-full.md`](https://tianxingren-work.github.io/llms-full.md)

- [`/data/agents.json`](https://tianxingren-work.github.io/data/agents.json)

- [`/data/profile.json`](https://tianxingren-work.github.io/data/profile.json)

- [`/data/projects.json`](https://tianxingren-work.github.io/data/projects.json)

- [`/data/routes.json`](https://tianxingren-work.github.io/data/routes.json)

- [`/data/agent-tools.json`](https://tianxingren-work.github.io/data/agent-tools.json)

- [`/openapi.json`](https://tianxingren-work.github.io/openapi.json)

- [`/machine/ms/for-agents.md`](https://tianxingren-work.github.io/machine/ms/for-agents.md)

- [`/machine/ms/for-agents.json`](https://tianxingren-work.github.io/machine/ms/for-agents.json)

- [`/machine/ms/about.md`](https://tianxingren-work.github.io/machine/ms/about.md)

- [`/machine/ms/projects/tilelang-tpu.md`](https://tianxingren-work.github.io/machine/ms/projects/tilelang-tpu.md)

- [`/machine/ms/projects/tilelang-riscv.md`](https://tianxingren-work.github.io/machine/ms/projects/tilelang-riscv.md)

Setiap halaman menyediakan versi Markdown dan JSON. Ikuti pautan fail di bawah untuk membaca profil lengkap dan sumbernya.

```text
GET /machine/ms/for-agents.md
GET /machine/ms/for-agents.json
```

Kod bahasa yang tersedia ialah en, zh, ko dan ms.

## Sumber dan peranan projek

Apabila menerangkan kerja ini, rujuk halaman projek asal. Sertakan perkakasan, pelaksanaan asas dan skop penilaian bagi hasil prestasi. Tahap projek dan ketersediaan sumber direkodkan secara berasingan. Projek yang saya terajui dan sertai menyatakan peranan saya.
