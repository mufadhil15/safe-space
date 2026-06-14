# Dokumen Desain UI/UX & Arsitektur "SAFE SPACE"

## 1. Identitas Visual & Tema
Karena website ini membahas topik yang sensitif, antarmuka menggunakan **Tema Terang (Light Theme)** yang bersih, menenangkan, dan tidak mengintimidasi.
* **Warna Latar Belakang Utama:** Putih (`#FFFFFF`) atau Off-white (`#F8FAFC`).
* **Warna Aksen (Tombol & Lencana):** Biru pastel (`#3B82F6`) atau Tosca lembut (`#14B8A6`) untuk memberikan kesan "ruang aman" dan tepercaya.
* **Warna Teks:** Abu-abu gelap (`#1E293B`) untuk kontras yang nyaman dibaca tanpa terlalu tajam seperti warna hitam pekat.
* **Tipografi:** Sans-serif modern dan bersih (seperti *Inter*, *Poppins*, atau *Roboto*).
* **Shadow & Border:** Menggunakan *drop-shadow* yang sangat halus (`box-shadow: 0 4px 6px rgba(0,0,0,0.05)`) dan sudut melengkung (`border-radius: 12px`) pada kartu agar UI terasa ramah (friendly).

## 2. Arsitektur Teknologi (Tanpa Database)
* **Struktur:** HTML5 semantik. Semua halaman modul (8 halaman) dirender dalam satu fail `index.html` menggunakan konsep *Single Page Application* (SPA) sederhana.
* **Styling:** CSS3 murni (menggunakan *Flexbox* dan *CSS Grid* untuk memastikan responsivitas dari layar proyektor laptop hingga *mobile*).
* **Interaktivitas & Logika:** Vanilla JavaScript. Menggunakan manipulasi DOM (`document.getElementById` atau `querySelector`) untuk menyembunyikan/menampilkan seksi (*section*) berdasarkan tombol yang diklik pengguna.

## 3. Komponen & Alur Interaksi UI

### Halaman 1: Beranda
* **Layout:** *Hero section* terpusat (Center-aligned).
* **Elemen:** Logo SVG responsif, ilustrasi vektor siswa, slogan besar, dan tombol *Call-to-Action* (CTA) "Mulai Eksplorasi".
* **Animasi JS:** Saat tombol diklik, muncul teks selamat datang (*fade-in*), diberi jeda `setTimeout()` sekitar 2 detik, lalu transisi memuat Halaman 2.

### Halaman 2 & 3: Definisi & Bentuk Kekerasan
* **Layout:** *Grid* responsif (1 kolom di HP, 3 kolom di Desktop).
* **Elemen Halaman 2:** Satu kartu definisi raksasa. Menggunakan CSS `transform: rotateY` untuk efek *Flip Card*.
* **Elemen Halaman 3:** 5 Kartu bentuk kekerasan.
* **Interaksi JS:** Setiap kartu ditekan, memunculkan elemen *Modal/Pop-up* di tengah layar dengan latar belakang *overlay* gelap transparan (`rgba(0,0,0,0.5)`). Status klik disimpan dalam variabel *array* JS. Tombol "Lanjut" hanya aktif jika semua kartu sudah diklik.

### Halaman 4: Simulasi "PILIH JALANMU"
* **Layout:** Tampilan menyerupai layar *Smartphone* (Mockup UI Chat) di tengah layar.
* **Interaksi JS:** * Teks percakapan muncul satu per satu dengan efek *typing* sederhana.
    * Terdapat 3 tombol pilihan statis. 
    * Menggunakan *Switch-Case* di JavaScript: Ketika pengguna memilih opsi, layar percakapan ditimpa oleh kartu "Akibat Pilihanmu" dan "Pelajaran".
    * Disediakan tombol "Coba Pilihan Lain" (me-reset status ke awal percakapan) atau "Lanjut".

### Halaman 5: Dampak
* **Layout:** *Grid* 2x2.
* **Elemen:** 4 ikon besar (SVG).
* **Interaksi JS:** Saat ikon diklik, kotak akan meluas (*accordion effect* atau *expand*) untuk menampilkan teks penjelasan di bawahnya.

### Halaman 6: Cara Mencegah (Checklist)
* **Layout:** *List vertical*.
* **Elemen:** *Custom Checkbox* CSS agar ukurannya mudah diakses (besar) di layar sentuh maupun kursor.
* **Interaksi JS:** Setiap *checkbox* yang berganti status menjadi *checked*, akan memicu fungsi JS untuk menampilkan *toast notification* (pesan kecil di pojok kanan bawah) berisi kalimat pujian. Tombol "Lanjut" muncul jika total `checked === 5`.

### Halaman 7: Teman Butuh Bantuan
* **Layout:** *Split screen* atau 2 Kartu Bersebelahan.
* **Elemen:** * Kartu Kiri (Jangan Dilakukan): Tema warna *soft red* (`#FEE2E2`).
    * Kartu Kanan (Yang Harus Dilakukan): Tema warna *soft green* (`#DCFCE7`).
* **Interaksi JS:** Mengklik kartu akan membalikkan/memunculkan daftar poin-poin menggunakan CSS *transition*.

### Halaman 8: Penutup & Lencana
* **Layout:** Terpusat (*Center-aligned*).
* **Elemen:** Animasi lencana membesar (*scale-up bounce*) menggunakan *CSS Keyframes*.
* **Teks:** Pesan ajakan, dan tombol interaktif "Saya Siap Menjadi Agen Lingkungan Aman".