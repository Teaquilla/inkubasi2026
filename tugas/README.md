# Project Akhir Inkubasi DevOps POROS 2026
## CI/CD Pipeline & Monitoring
### Project MODERNO Fashion & Apparel Ecommerce

---

| | |
|---|---|
| **Topik** | CI/CD Pipeline, Containerization, dan Observability |
| **Durasi** | 1 minggu (7 hari kalender) |
| **Bentuk** | Individu |
| **Pengumpulan** | [Pengumpulan Tugas](https://forms.gle/MSGdvhZo8HD2KQ7h9) |
| **Penamaan File** | `NIM_NAMA_TUGAS_AKHIR_INKUBASI_DEVOPS.pdf` |
| **Deadline** | Minggu, 29 Maret 2026 Pukul 23:59 WIB |

---

## Latar Belakang

Project **MODERNO** adalah aplikasi ecommerce fullstack yang terdiri dari:

| Komponen | Teknologi | Port |
|---|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS | 3000 |
| Backend API | NestJS, TypeORM, Passport JWT | 3001 |
| Database | PostgreSQL 15 | 5432 |

Arsitektur ini mencerminkan sistem production nyata yang membutuhkan pipeline deployment yang andal, cepat, dan dapat dipantau. Peserta diminta merancang dan mengimplementasikan infrastruktur DevOps lengkap di atas project MODERNO — mulai dari version control, CI/CD pipeline otomatis, containerization, hingga monitoring.

## Tugas 1 — Version Control & Branching Strategy

Setup repositori GitHub dengan strategi branching yang tepat untuk mendukung pengembangan paralel dan release management.

### Yang harus dikerjakan

1. Fork repositori GitHub MODERNO yang diberikan
2. Implementasikan branching strategy menggunakan salah satu model:
   - Git Flow (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`)
   - GitHub Flow (`main` + feature branches)
   - Trunk-based Development
3. Sertakan dokumentasi branching strategy yang digunakan ke dalam laporan PDF

---

## Tugas 2 — Containerization 

Buat konfigurasi Docker dan pastikan semua service berjalan dengan benar di lingkungan containerized.

### Yang harus dikerjakan

1. Buat `Dockerfile` untuk `client` dan `server`:
   - Gunakan **multi-stage build** untuk meminimalkan image size
   - Tambahkan `.dockerignore` yang tepat

2. Buatlah `docker-compose.yml`:
   - Tambahkan health checks untuk semua service
   - Konfigurasi resource limits (CPU & memory)
   - Gunakan named volumes untuk persistensi data
   - Pisahkan `docker-compose.yml` (dev) dan `docker-compose.prod.yml`
3. Dokumentasikan cara menjalankan project secara lokal dengan Docker
4. Sertakan output `docker images ls` dan `docker stats` kedalam laporan sebagai bukti

---

## Tugas 4 — CD Pipeline & Deployment  

Bangun **Continuous Deployment pipeline** untuk men-deploy aplikasi MODERNO ke environment staging dan production secara terstruktur menggunakan beberapa stage deployment.

---

### Stage 1 — Deployment ke Staging

- Deployment otomatis berjalan saat ada **push ke branch `develop`** (atau yang sejenis pada branch kamu) dan seluruh CI pipeline berhasil
- Service harus berhasil dijalankan menggunakan Docker container
- Health check service harus dijalankan setelah deployment
- Aplikasi staging harus dapat diakses melalui **public URL**


### Stage 2 — Database Migration

- Jalankan **TypeORM migrations** sebagai bagian dari proses deployment
- Migration harus berjalan sebelum service backend dijalankan
- Pipeline harus gagal jika migration gagal dijalankan


### Stage 3 — Deployment ke Production

- Deployment hanya dapat dilakukan dari **branch `main`**
- Deployment harus menggunakan **manual approval** melalui GitHub Environments
- Peserta harus memilih salah satu strategi deployment berikut dan menjelaskan alasannya dalam laporan:
  - Blue-Green Deployment
  - Rolling Update
  - Canary Deployment


### Stage 4 — Environment Configuration

- Gunakan **GitHub Environments** untuk memisahkan konfigurasi:
  - staging environment variables
  - production environment variables
- Secrets tidak boleh disimpan langsung di repository


---

## Tugas 5 — Monitoring & Observability 

Setup monitoring Metrics untuk aplikasi MODERNO.

### 5.1 Metrics — Prometheus + Grafana

1. Expose metrics dari NestJS menggunakan `@willsoto/nestjs-prometheus`:
   - HTTP request rate, latency (p50, p95, p99)
   - Error rate per endpoint
   - Active connections
   - Database query duration
   - Custom business metrics: `order_created_total`, `cart_items_added_total`
2. Konfigurasi Prometheus scrape config untuk mengumpulkan metrics
3. Buat Grafana dashboard yang mencakup:
   - Overview panel: uptime, request rate, error rate
   - Latency heatmap
   - Top 5 slowest endpoints
   - Business metrics panel

---

## Deliverables

Kumpulkan semua item berikut dalam satu file PDF:

| No | Deliverable | Format | Keterangan |
|---|---|---|---|
| 1 | Link Repository GitHub | URL | Repository harus public |
| 2 | CI/CD Pipeline Config | `.yml` files | Semua file workflow GitHub Actions |
| 3 | Docker Configuration | Dockerfile + compose | Semua versi (dev, prod, override) |
| 5 | Monitoring Config | YAML + JSON | Prometheus, Grafana dashboard JSON, dll |
| 6 | Screenshot Bukti | PNG/PDF | Pipeline running, Grafana dashboard, dll|
| 7 | Penjelasan | | Sama seperti tugas-tugas sebelumnya setiap langkah harus diberikan penjelasan | 
---

## Catatan Penting

### ✅ Diperbolehkan

- Menggunakan free tier cloud provider (AWS Free Tier, GCP Always Free, Railway, Render, Fly.io)
- Menggunakan GitHub Actions free tier (2000 menit/bulan untuk public repo)
- Menggunakan Docker Desktop untuk pengujian lokal
- Berdiskusi konsep dengan sesama peserta — namun implementasi harus mandiri

### ❌ Tidak Diperbolehkan

- Menyalin konfigurasi pipeline dari repository lain tanpa modifikasi dan pemahaman
- Meninggalkan credentials (API key, password) hardcoded dalam repository


### 💡 Tips

- Mulai dari Tugas 1 dan 2, lanjutkan secara berurutan
- Gunakan `docker-compose` untuk menjalankan monitoring stack secara lokal sebelum deploy ke cloud
- Manfaatkan GitHub Actions marketplace untuk action yang sudah tersedia
- Dokumentasikan setiap keputusan desain dalam laporan teknis

---


> Selamat mengerjakan! \
> Pertanyaan teknis diajukan melalui wa [Aldura](https://wa.me/6281333093230).\
> Dilarang melakukan plagiasi dengan peserta inkubasi yang lain.