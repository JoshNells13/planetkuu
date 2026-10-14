# ADDITIONAL FEATURE REQUIREMENTS — PLANET KU

Integrasikan tiga fitur unggulan berikut ke dalam website Planet Ku. Ketiganya harus menjadi bagian dari pengalaman utama pengguna, bukan hanya elemen dekoratif.

## 1. Interactive 3D Solar System Explorer

Jadikan tata surya 3D sebagai fitur utama dan daya tarik terbesar Planet Ku.

### Visual Design
- Gunakan gaya polished 3D cartoon dengan planet yang memiliki material, tekstur, pencahayaan, dan bayangan yang menarik.
- Buat Matahari bercahaya dengan efek glow yang lembut.
- Tampilkan delapan planet dengan karakteristik visual masing-masing.
- Gunakan orbit bercahaya yang elegan, latar belakang bintang, nebula, dan partikel kosmik secukupnya.
- Pastikan ukuran planet dan jarak orbit disederhanakan secara visual agar mudah dipahami anak-anak.

### Interactive Features
- Pengguna dapat memutar kamera, melakukan zoom, dan menggeser sudut pandang.
- Setiap planet dapat dipilih melalui klik atau sentuhan.
- Saat planet dipilih, kamera bergerak secara smooth menuju planet tersebut.
- Planet terpilih mendapat highlight dan label nama.
- Panel informasi menampilkan deskripsi singkat, fakta menarik, serta data astronomi.
- Sediakan kontrol play, pause, dan pengaturan kecepatan simulasi.
- Tampilkan garis orbit dan arah revolusi secara jelas.
- Sediakan tombol untuk kembali ke tampilan seluruh tata surya.
- Tambahkan tombol reset kamera agar pengguna tidak tersesat dalam eksplorasi.

### Learning Interaction
Ketika pengguna memilih planet, jangan hanya menampilkan informasi statis. Berikan aktivitas sederhana yang sesuai dengan planet tersebut.

Contoh:
- Bumi: amati rotasi dan pergantian siang-malam.
- Mars: temukan alasan Mars dijuluki Planet Merah.
- Saturnus: jelajahi sistem cincinnya.
- Jupiter: pelajari mengapa Jupiter termasuk planet terbesar di tata surya.

Gunakan React Three Fiber, Three.js, dan Drei untuk membangun pengalaman 3D yang responsif dan interaktif.

## 2. Space Mascot — Astro, Sahabat Penjelajah

Buat maskot utama bernama **Astro**, seorang astronot kartun 3D yang menjadi teman belajar pengguna.

### Character Design
- Astronot mungil dengan proporsi karakter kartun yang lucu.
- Helm transparan dengan refleksi cahaya yang lembut.
- Baju astronot putih dengan aksen biru dan ungu.
- Ekspresi wajah ramah dan mudah dikenali.
- Animasi idle sederhana, seperti melayang, melambaikan tangan, dan bereaksi terhadap keberhasilan pengguna.
- Desain konsisten di seluruh halaman.

Jika model karakter 3D belum tersedia, gunakan ilustrasi atau aset maskot yang konsisten sebagai fallback. Jangan menggunakan emoji sebagai pengganti karakter utama.

### Mascot Behavior
Astro bertindak sebagai pemandu yang memberikan instruksi dan penjelasan singkat berdasarkan konteks halaman.

Contoh dialog:

**Saat pertama kali masuk:**
"Halo, Penjelajah Cilik! Aku Astro. Siap menjelajahi tata surya bersama?"

**Saat membuka tata surya:**
"Coba pilih salah satu planet! Kita akan mencari tahu apa yang membuatnya istimewa."

**Saat mempelajari orbit:**
"Lihat garis bercahaya itu? Itulah gambaran jalur orbit yang dilalui planet saat mengelilingi Matahari."

**Saat menyelesaikan misi:**
"Hebat! Satu pengetahuan baru berhasil kamu temukan. Yuk, lanjutkan petualangan!"

**Saat menjawab kuis dengan benar:**
"Jawabanmu tepat! Kamu semakin dekat menjadi Penjelajah Antariksa!"

**Saat menjawab salah:**
"Belum tepat, tetapi tidak apa-apa! Yuk, kita pelajari petunjuknya bersama."

### Implementation
- Buat komponen `AstroMascot` yang reusable.
- Buat komponen `AstroDialogue` untuk menampilkan dialog kontekstual.
- Dialog dapat ditutup atau dibuka kembali.
- Hindari dialog yang terlalu sering mengganggu eksplorasi.
- Hubungkan dialog dengan aktivitas pengguna, misi, dan hasil kuis.
- Gunakan animasi ringan yang tidak membebani performa.

## 3. Mission-Based Learning — Misi Penjelajah Cilik

Ubah proses belajar menjadi rangkaian petualangan yang memiliki tujuan, tantangan, dan penghargaan.

### Mission Dashboard
Buat halaman atau panel "Misi Penjelajah" yang menampilkan:
- Daftar misi yang tersedia.
- Deskripsi tujuan setiap misi.
- Tingkat kesulitan yang ramah anak.
- Status belum dimulai, sedang berlangsung, atau selesai.
- Progress belajar.
- XP yang bisa diperoleh.
- Badge yang didapat setelah menyelesaikan misi.

Gunakan kartu misi dengan ilustrasi 3D atau visual kartun yang konsisten.

### Mission Examples

**Misi 1 — Mencari Planet Merah**
- Tujuan: menemukan Mars dalam tata surya 3D.
- Aktivitas: pengguna memilih Mars dari planet yang tersedia.
- Validasi: sistem memeriksa planet yang dipilih.
- Reward: 50 XP dan badge "Pemburu Planet".

**Misi 2 — Penjaga Orbit**
- Tujuan: memahami konsep orbit.
- Aktivitas: pengguna mengamati simulasi Bumi mengelilingi Matahari.
- Tantangan: menjawab pertanyaan tentang orbit setelah simulasi.
- Reward: 75 XP dan badge "Ahli Orbit".

**Misi 3 — Misteri Siang dan Malam**
- Tujuan: memahami rotasi Bumi.
- Aktivitas: pengguna mengamati Bumi yang berputar dengan pencahayaan dari Matahari.
- Tantangan: menentukan bagian Bumi yang mengalami siang dan malam.
- Reward: 75 XP dan badge "Penjaga Bumi".

**Misi 4 — Rahasia Cincin Saturnus**
- Tujuan: mengenal Saturnus dan sistem cincinnya.
- Aktivitas: pengguna membuka Saturnus dan mengamati cincinnya dari beberapa sudut.
- Tantangan: menjawab pertanyaan tentang karakteristik Saturnus.
- Reward: 100 XP dan badge "Penjelajah Saturnus".

**Misi 5 — Tantangan Tata Surya**
- Tujuan: menguji pengetahuan mengenai delapan planet.
- Aktivitas: menyelesaikan kuis dengan lima pertanyaan.
- Validasi: skor dihitung berdasarkan jawaban yang benar.
- Reward: XP sesuai hasil dan badge "Penjelajah Tata Surya" setelah memenuhi kriteria.

### Gamification System
Implementasikan sistem progres sederhana:
- XP bertambah setelah aktivitas benar-benar diselesaikan.
- Badge hanya diberikan setelah syarat misi terpenuhi.
- Misi yang telah selesai tidak boleh memberikan reward berulang tanpa batas.
- Tampilkan indikator progres yang mudah dipahami.
- Berikan animasi singkat ketika pengguna mendapatkan reward.
- Sediakan halaman pencapaian untuk melihat badge yang telah dikumpulkan.

Simpan progres lokal menggunakan `localStorage` untuk versi MVP. Pastikan data divalidasi agar refresh halaman tidak mereset pencapaian.

## 4. Unified User Experience

Ketiga fitur harus saling terhubung dalam satu alur pembelajaran.

Contoh alur pengguna:

1. Pengguna membuka homepage dan disambut oleh Astro.
2. Pengguna menekan tombol "Mulai Petualangan".
3. Website membuka tata surya 3D interaktif.
4. Astro memberikan petunjuk untuk memilih planet.
5. Pengguna memilih Mars dan membaca informasi planet.
6. Pengguna menyelesaikan tantangan "Mencari Planet Merah".
7. Sistem memberikan XP dan badge jika persyaratan terpenuhi.
8. Pengguna diarahkan ke misi berikutnya atau mencoba kuis.
9. Progress tersimpan dan dapat dilanjutkan ketika pengguna kembali.

Jangan memaksa pengguna mengikuti alur secara linear. Mereka tetap boleh menjelajahi planet dan materi secara bebas.

## 5. Quality Requirements

- Ketiga fitur harus benar-benar berfungsi, bukan sekadar mockup.
- Interaksi 3D harus dapat digunakan dengan mouse dan layar sentuh.
- Animasi harus smooth, dengan transisi yang tidak berlebihan.
- UI tetap konsisten pada desktop, tablet, dan smartphone.
- Sediakan loading state dan fallback ketika WebGL atau aset 3D gagal dimuat.
- Materi sains harus akurat meskipun disajikan dalam bentuk kartun.
- Gunakan komponen reusable dan TypeScript dengan struktur kode yang rapi.
- Utamakan pengalaman pengguna anak SD: sederhana, jelas, aman, dan menyenangkan.

**Prioritas implementasi:** tata surya 3D interaktif sebagai fitur utama, Astro sebagai pemandu, dan misi sebagai mekanisme untuk mengubah eksplorasi menjadi pembelajaran aktif.

Hasil akhir harus membuat anak merasa sedang menjelajahi luar angkasa sambil belajar, bukan sedang mengerjakan tugas sekolah biasa.