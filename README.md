# Sekolah Karir — Role Explorer Component

Assignment implementasi komponen filter peran (Role Explorer) interaktif, responsif, dan berbasis *practical product thinking* untuk **Sekolah Karir**.

---

## 🎯 Ringkasan Brief & Deliverables

> **Tugas:** Implement a responsive role-filter component from a simple wireframe: filter by department and show matching cards.
> - Buat komponen role explorer yang responsive.
> - User harus bisa memfilter role berdasarkan department.
> - Tampilkan state default, hasil filter, dan empty state jika tidak ada hasil.
> - Tidak perlu membuat backend; data boleh hardcoded/mock.

---

## 💡 Product Reasoning & UX Decision Highlights

Sesuai instruksi assignment bahwa penilaian berfokus pada **kualitas reasoning dan kemampuan mengeksekusi brief secara jelas**:

1. **State Handling yang Lengkap & Transparan:**
   - **Default State:** Saat pertama kali dimuat, tab *"Semua Departemen"* aktif dan menampilkan seluruh lowongan (10 posisi). Terdapat badge jumlah yang memberi visibilitas langsung mengenai total peluang karir yang tersedia.
   - **Filtered State:** Mengklik departemen tertentu (misalnya *Engineering*, *Design*, *Product*) langsung memperbarui kartu lowongan yang ditampilkan secara reaktif, disertai counter kontekstual *(misal: "Menampilkan 3 posisi untuk Engineering")* dan tag filter aktif yang dapat dihapus per elemen.
   - **Empty State & Easy Recovery:**
     - Kami menambahkan departemen **"Legal & Compliance"** dengan 0 peran aktif secara sengaja pada mock data, sehingga reviewer dapat menguji tampilan **Empty State dengan 1 klik** tanpa harus mengetik apapun.
     - Empty state juga dapat dipicu melalui pencarian kata kunci yang tidak ada (misal: `"Cybersecurity"` atau `"Dokter"`).
     - Empty state menyajikan pesan kontekstual spesifik dan tombol tindakan primer **"Reset Semua Filter"** yang mengembalikan state ke default dalam sekali klik.

2. **Hierarki Visual & Scannability Kartu:**
   - Setiap kartu peran memprioritaskan informasi yang paling dicari job seeker:
     - Badge warna departemen untuk identifikasi visual instan.
     - Jenjang karir (*Internship, Junior, Mid-Level, Senior, Lead*) dan model kerja (*Remote, Hybrid, On-site*).
     - Ringkasan deskripsi tugas (2-3 kalimat dengan batas tinggi konsisten).
     - Chip keterampilan/teknologi utama (*React, Figma, SQL, dll.*).
     - Estimasi rentang gaji kompetitif (*transparansi kompensasi*).
     - Tombol **"Detail Peran"** interaktif yang membuka modal spesifikasi lengkap (tanggung jawab, persyaratan, dan aksi lamar).

3. **Responsiveness & Aksesibilitas (A11y):**
   - **Mobile (375px - 640px):** Filter tab berbentuk pill dengan scroll horizontal halus (`overflow-x-auto snap-x`), input pencarian full-width, dan kartu 1 kolom.
   - **Tablet (768px):** Grid 2 kolom yang seimbang.
   - **Desktop (1024px+):** Grid 3 kolom dengan spacing lapang.
   - Menggunakan elemen semantik (`role="tab"`, `aria-selected`, `aria-modal`), keyboard shortcuts (tombol `Escape` untuk menutup modal detail), dan fokus yang jelas.

---

## 📁 Struktur Komponen & Kode

```text
my-app/
├── app/
│   ├── globals.css         # Tailwind CSS styling
│   ├── layout.tsx          # Metadata & font configuration
│   └── page.tsx            # Halaman utama Sekolah Karir & ringkasan reasoning
├── components/
│   ├── DepartmentFilter.tsx # Komponen tab filter departemen responsif + pill counts
│   ├── RoleCard.tsx         # Kartu peran dengan hierarki visual & badge
│   ├── RoleDetailModal.tsx  # Modal detail spesifikasi lengkap peran
│   ├── EmptyState.tsx       # Komponen empty state dengan contextual message & recovery CTA
│   └── RoleExplorer.tsx     # Komponen utama pengelola state & filter logic
├── data/
│   └── roles.ts             # Mock data realistis 10 peran dalam 7 departemen
└── types/
    └── role.ts              # TypeScript type definition (Department, Role, Level, dll.)
```

---

## 🚀 Cara Menjalankan Project

1. Masuk ke direktori `my-app`:
   ```bash
   cd my-app
   ```

2. Jalankan server development:
   ```bash
   npm run dev
   ```

3. Buka browser pada [http://localhost:3000](http://localhost:3000).

4. Untuk build production:
   ```bash
   npm run build
   npm run start
   ```

---

## 🧪 Panduan Cepat Pengujian (Reviewer Guide)

1. **Uji Default State:** Buka halaman; amati tab *"Semua Departemen"* aktif dengan total 10 kartu ditampilkan.
2. **Uji Filter State:** Klik pill *"Engineering"* (menampilkan 3 kartu), *"Product"* (menampilkan 2 kartu), atau *"Design"* (menampilkan 2 kartu).
3. **Uji Empty State:**
   - **Cara 1 (1 Klik):** Klik pill *"Legal & Compliance (0)"*. Empty state langsung muncul lengkap dengan pesan penjelasan dan tombol *"Reset Semua Filter"*.
   - **Cara 2 (Search):** Ketik kata kunci acak pada kolom pencarian (misal `"xyz"`).
4. **Uji Reset Action:** Klik tombol *"Reset Semua Filter"* pada empty state atau tag filter aktif. Halaman kembali ke Default State.
5. **Uji Detail Modal:** Klik tombol *"Detail Peran"* pada salah satu kartu peran untuk melihat deskripsi mendalam, tanggung jawab, dan kualifikasi. Tekan tombol `Esc` atau tombol silang untuk menutup.
