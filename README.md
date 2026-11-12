
## Fitur Utama

- **Pencarian & Multi-Filter Real-time**:
  - Pencarian berbasis kata kunci (judul posisi, ringkasan, dan keahlian/skills).
  - Filter berdasarkan Departemen (Engineering, Product, Design, Data & AI, Marketing, People & Operations, dll).
  - Filter Tingkat Pengalaman (*Internship*, *Junior*, *Mid-Level*, *Senior*, *Lead*).
  - Filter Tipe Pekerjaan (*Full-time*, *Part-time*, *Contract*, *Internship*).
  - Filter Model Kerja / Lokasi (*Remote*, *Hybrid*, *On-site*).
- **Pengurutan (Sorting)**: Urutkan berdasarkan posisi terbaru (*Latest*), posisi terlama (*Oldest*), atau abjad (A-Z).
- **Lazy Loading & Infinite Scroll (Pemuatan Bertahap Berkelanjutan)**:
  - **Tujuan Performa**: Menghindari beban render berlebih pada DOM (*DOM bloat*) ketika dataset lowongan bertambah banyak, sehingga rendering tetap ringan dan mulus (60 FPS).
  - **Mekanisme Batch Slicing**: Data awal yang ditampilkan dibatasi per kelompok (*batch* berukuran 6 item) menggunakan `visibleRoles = filteredRoles.slice(0, visibleCount)`.
  - **Deteksi Otomatis (Intersection Observer API)**: Memanfaatkan native browser `IntersectionObserver` yang memantau elemen target (*sentinel ref*) di bagian bawah daftar. Begitu pengguna menggulir mendekati batas bawah (`rootMargin: "150px"`, `threshold: 0.1`), *batch* berikutnya otomatis dimuat tanpa mengharuskan pengguna menekan tombol.
  - **Umpan Balik Visual (Loading Feedback)**: Dilengkapi animasi pemuatan (*loader spinner*) dan tombol manual cadangan (*fallback button*) jika pengguna lebih memilih memuat secara manual.
  - **Smart Filter Reset**: Ketika pengguna mengubah kata kunci pencarian atau memilih kategori filter baru, `visibleCount` otomatis direset kembali ke ukuran batch awal (6 item) agar pengguna selalu mulai dari posisi teratas data yang relevan.
- **Detail Posisi Interaktif (Modal)**: Menampilkan deskripsi lengkap, rentang gaji, tanggal posting, tanggung jawab (*responsibilities*), dan kualifikasi (*requirements*).
- **Empty State Informatif**: Memberikan feedback yang jelas ketika tidak ada hasil yang cocok serta tombol untuk langsung mereset filter.
- **Responsif & Mobile-Friendly**: Dilengkapi dengan drawer/sheet filter khusus untuk tampilan layar ponsel.
- **Micro-interactions & UX**: Menggunakan animasi halus, skeleton loading state, dan tombol *Back to Top*.

---

## Struktur Direktori

```text
my-app/
├── app/
│   ├── globals.css          # Styling global & token warna Tailwind v4
│   ├── layout.tsx           # Root layout HTML dan metadata
│   └── page.tsx             # Halaman utama (entry point RoleExplorer)
├── components/
│   ├── ui/                  # Komponen UI dasar (Button, Card, Badge, Input, Select, dll)
│   ├── BackToTop.tsx        # Tombol kembali ke atas dengan scroll listener
│   ├── EmptyState.tsx       # Tampilan saat hasil pencarian/filter kosong
│   ├── RoleCard.tsx         # Kartu informasi ringkas tiap role pekerjaan
│   ├── RoleCardSkeleton.tsx # Efek loading placeholder (skeleton)
│   ├── RoleDetailModal.tsx  # Pop-up dialog detail lengkap posisi
│   ├── RoleExplorer.tsx     # Komponen utama: orchestrator state filter, search, & list
│   └── RoleSidebar.tsx      # Panel navigasi filter (desktop sidebar & mobile drawer)
├── data/
│   └── roles.ts             # Dataset mock pekerjaan (lowongan realistis)
├── types/
│   └── role.ts              # Interface dan tipe data TypeScript (Role, Department, dll)
└── package.json
```

---

## Penggunaan Tool AI 
### 1. Bagaimana Tool AI Membantu Pengembangan
- **Perancangan Tipe Data & Struktur (Scaffolding)**:
  - Membantu menyusun kontrak data TypeScript yang ketat pada `types/role.ts` sehingga data lowongan konsisten dan minim kesalahan tipe (*type safety*).
- **Logika Filter & Pencarian Multi-Kondisi**:
  - Membantu merancang fungsi penyaringan pada `RoleExplorer.tsx` yang efisien menggabungkan query teks, filter kategori berganda (*multi-faceted filtering*), dan fungsi pengurutan (*sorting*).
- **Implementasi Lazy Loading & Intersection Observer**:
  - Membantu menyusun arsitektur pemuatan data bertahap (*batching*) berbasis `IntersectionObserver`, mengelola state pembersihan memori (*cleanup listener*), serta penanganan transisi pemuatan saat filter berubah.
- **Akselerasi Pembuatan Komponen UI & Desain Sistem**:
  - Mengimplementasikan antarmuka modern yang konsisten menggunakan Tailwind CSS v4 dan komponen modular yang rapi (pemisahan antara `RoleSidebar`, `RoleCard`, `RoleDetailModal`, dan `EmptyState`).
- **Penanganan Edge Cases & UX**:
  - Membantu menyusun interaksi ramah pengguna, seperti penyediaan *skeleton loading*, penanganan *empty state* dengan opsi *clear filters*, hingga aksesibilitas modal (penutupan via tombol Escape / klik backdrop).
- **Refactoring & Clean Code**:
  - Memastikan pemisahan tanggung jawab komponen (*single-responsibility principle*) dan kode yang mudah dibaca.
