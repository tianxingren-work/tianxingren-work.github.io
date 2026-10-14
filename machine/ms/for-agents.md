# Tianxing Ren / 任天行

> AI compilers, Tile-level programming, Heterogeneous computing

https://tianxing-ren.netlify.app/ms/for-agents/

Language: ms. Updated: 2026-10-14.

## Profil dan penyelidikan

Saya menyelidik pengkompil AI agar pelbagai algoritma AI dapat berjalan dengan betul dan cekap pada perkakasan AI baharu. Saya ingin memudahkan pengaturcaraan untuk manusia dan ejen.

Saya mengikuti pengajian Doktor Kejuruteraan di Universiti Peking melalui program bersama Makmal Zhongguancun. Saya menyelidik pengkompil AI, pengaturcaraan peringkat tile dan pengkomputeran heterogen, serta berminat dengan bahasa pengaturcaraan dan seni bina komputer yang berkaitan.

Saya menjalankan penyelidikan kedoktoran di bawah bimbingan [Prof. Tao Xie](https://taoxiease.github.io/) dan [Prof. Wei Yang](https://youngwei.com/) .

## Projek yang saya terajui

### TileLang-TPU

Peneraju projek

Backend TileLang untuk TPU SOPHGO, daripada perancangan memori ketika kompilasi hingga pelaksanaan kernel.

TileLang-TPU membawa pengaturcaraan peringkat tile kepada pemecut SOPHGO komersial. Tile ialah blok data kecil yang digunakan untuk menyatakan pengiraan. Pengkompil mengurus penempatan memori dalam cip, pergerakan data dan pertindihan pemindahan dengan pengiraan. Masa jalan JIT mengkompil takrif kernel Python apabila diperlukan dan menjalankannya pada BM1690.

Tahap projek: Fasa utama selesai
Ketersediaan sumber: https://github.com/TongmingLAIC/tilelang-tpu

https://tianxing-ren.netlify.app/ms/projects/tilelang-tpu/

Penilaian dijalankan pada satu teras SOPHGO BM1690, dengan saiz input ditetapkan sebelum kompilasi. Prestasi dibandingkan dengan pelaksanaan PPL yang dioptimumkan oleh pengeluar dan digunakan dalam Torch-TPU. PPL (Primitive Programming Language) ialah bahasa pengaturcaraan aras rendah SOPHGO.

Kami menilai pendaraban matriks, RMSNorm, RoPE, SwiGLU dan penambahan unsur demi unsur dengan pelbagai konfigurasi input dan format nombor. RMSNorm melaraskan skala nilai, RoPE mengekod kedudukan dalam jujukan dan SwiGLU menjalankan transformasi tak linear dalam rangkaian neural. Purata peningkatan kelajuan mengikut jenis operasi ialah **1.05–1.23×** berbanding PPL.

TileLang-TPU turut menyokong operasi gabungan yang menyatukan beberapa langkah pengiraan. FlashAttention mengira perhatian model dengan cekap. Selepas pengoptimuman algoritma yang memproses beberapa kepala perhatian dalam kelompok yang sama (head-batched), purata peningkatan kelajuannya mencapai **12.50×** berbanding PPL. Kepala perhatian ialah cabang pengiraan selari yang memberi tumpuan kepada maklumat berbeza.

Bagi MLP gabungan, iaitu rangkaian neural suap hadapan yang lazim dalam model AI, operasi MLP W8A16 Dequantized Forward mencapai purata **1.01×** dan hampir menyamai prestasi PPL. W8A16 menggunakan pemberat 8 bit dan nilai pengaktifan 16 bit. Penyahkuantuman menukar pemberat berketepatan rendah yang disimpan kepada nilai untuk pengiraan.

- Peruntukan memori statik: Merancang kedudukan setiap blok data dalam memori pantas pada cip sebelum program dijalankan, mengikut aturan perkakasan dan had kapasiti memori.
- Pemindahan data dan pengiraan serentak: Menyusun pemindahan data dan pengiraan kepada peringkat yang boleh berjalan serentak. Setiap langkah hanya bermula apabila data yang diperlukan tersedia.
- Menjana dan menjalankan kod TPU: Menterjemah pengiraan kepada operasi yang boleh dilaksanakan oleh TPU, kemudian mengkompil, memuatkan dan menjalankan program.

### TileLang-RISC-V

Peneraju projek

Membawa TileLang ke CPU RISC-V dengan pecutan matriks AME. Usaha berterusan bersama penyelidik perkakasan sumber terbuka dan sistem.

Projek ini membangunkan backend TileLang untuk CPU AI RISC-V AME bersama Institut Cip Sumber Terbuka Beijing dan Institut Perisian, Akademi Sains China. Kerja semasa menumpukan pada pemetaan model pengaturcaraan kepada arahan sasaran serta pembinaan laluan kompilasi dan pelaksanaan yang boleh digunakan.

Tahap projek: Sedang dijalankan
Ketersediaan sumber: Kod sumber belum dibuka kepada umum

https://tianxing-ren.netlify.app/ms/projects/tilelang-riscv/

- Model pengaturcaraan: Menyatakan operator AI lazim melalui program peringkat tile dan mengenal pasti maklumat yang diperlukan oleh backend.
- Penyepaduan sasaran: Menghubungkan penurunan kompilasi, pemetaan arahan AME dan persekitaran pelaksanaan.
- Penilaian: Menguji ketepatan dan prestasi operator merentas konfigurasi sasaran, kemudian menggunakan hasilnya untuk mengoptimumkan backend.

## Projek sumber terbuka yang saya sertai

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
https://tianxing-ren.netlify.app/ms/contact/
https://github.com/LeslinD
https://github.com/tianxingren-work

## Antara muka Agent

MCP menyediakan empat alat untuk profil, senarai projek, padanan topik dan maklumat hubungan. Markdown, JSON dan antara muka data HTTP juga tersedia.

- Markdown: https://tianxing-ren.netlify.app/machine/ms/for-agents.md
- JSON: https://tianxing-ren.netlify.app/machine/ms/for-agents.json
- Contact JSON: https://tianxing-ren.netlify.app/data/contact.json
- MCP: https://tianxing-ren.netlify.app/api/mcp
- OpenAPI: https://tianxing-ren.netlify.app/openapi.json
- Tools: get_profile, get_projects, find_relevant_work, get_contact

```http
POST https://tianxing-ren.netlify.app/api/mcp
Content-Type: application/json
Accept: application/json
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: get_contact

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_contact",
    "arguments": {
      "language": "ms"
    },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ProfileReader",
        "version": "1.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

## Penggunaan dan rujukan

Apabila menerangkan kerja ini, rujuk halaman projek asal. Sertakan perkakasan, pelaksanaan asas dan skop penilaian bagi hasil prestasi. Tahap projek dan ketersediaan sumber direkodkan secara berasingan. Projek yang saya terajui dan sertai menyatakan peranan saya.
