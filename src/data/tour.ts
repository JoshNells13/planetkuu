export interface AstroTourStop {
  id: string;
  stepNumber: number;
  totalSteps: number;
  name: string;
  shortName: string;
  tagline: string;
  targetPosition: [number, number, number];
  camOffset: [number, number, number];
  astroSpeech: string;
  kidFact: string;
  astroMood: 'happy' | 'waving' | 'thinking' | 'celebrating' | 'explaining';
  highlightBadge: string;
  relatedPlanetId?: string;
}

export const ASTRO_TOUR_STOPS: AstroTourStop[] = [
  {
    id: 'tour-sun',
    stepNumber: 1,
    totalSteps: 10,
    name: 'Matahari — Bintang Pusat Tata Surya',
    shortName: 'Matahari',
    tagline: 'Sang Raja Penghangat Seluruh Alam Semesta',
    targetPosition: [0, 0, 0],
    camOffset: [0, 9, 24],
    astroSpeech:
      'Halo Sobat Cilik! Aku Astro, astronaut pemandumu hari ini! Ayo pegangan yang erat, kita mulai petualangan luar biasa keliling tata surya! Destinasi pertama kita adalah Matahari! Dia adalah bintang bola api raksasa di pusat tata surya. Suhu intinya mencapai 15 juta derajat celcius! Gravitasinya yang sangat kuat menjaga semua planet agar tetap berputar rapi di jalurnya.',
    kidFact: 'Matahari begitu raksasa sampai-sampai satu juta planet Bumi bisa muat di dalamnya!',
    astroMood: 'waving',
    highlightBadge: 'Pusat Tata Surya',
  },
  {
    id: 'tour-mercury',
    stepNumber: 2,
    totalSteps: 10,
    name: 'Merkurius — Si Pelari Cepat Terdekat',
    shortName: 'Merkurius',
    tagline: 'Planet Terkecil dan Paling Gesit',
    targetPosition: [7, 0, 0],
    camOffset: [2.5, 1.8, 3.8],
    astroSpeech:
      'Wuuush! Kita melesat ke planet pertama: Merkurius! Karena letaknya paling dekat dengan Matahari, larinya kencang sekali! Merkurius hanya butuh 88 hari untuk satu putaran penuh mengitari Matahari. Tapi di sini tidak ada udara, jadi saat siang hari panasnya memanggang hingga 430 derajat, dan saat malam langsung membeku sedingin es!',
    kidFact: 'Permukaan Merkurius berlubang-lubang penuh kawah seperti lapangan berbatu karena sering tertabrak meteor purba.',
    astroMood: 'explaining',
    highlightBadge: 'Planet Terdekat',
    relatedPlanetId: 'mercury',
  },
  {
    id: 'tour-venus',
    stepNumber: 3,
    totalSteps: 10,
    name: 'Venus — Bintang Kejora yang Membara Panas',
    shortName: 'Venus',
    tagline: 'Planet Terpanas di Seluruh Tata Surya (465°C)',
    targetPosition: [10.5, 0, 0],
    camOffset: [3.2, 2.2, 4.5],
    astroSpeech:
      'Lihat di depan sana! Ini adalah Venus, sering disebut Bintang Kejora karena bersinar terang perak di langit pagi kita. Tapi jangan tertipu kecantikannya ya! Venus adalah planet paling panas di tata surya—mencapai 465 derajat celcius! Udaranya diselimuti awan asam super tebal yang mengurung panas seperti oven raksasa!',
    kidFact: 'Venus berputar terbalik arah jarum jam, jadi di Venus matahari terbit dari sebelah barat dan terbenam di timur!',
    astroMood: 'thinking',
    highlightBadge: 'Planet Terpanas',
    relatedPlanetId: 'venus',
  },
  {
    id: 'tour-earth',
    stepNumber: 4,
    totalSteps: 10,
    name: 'Bumi & Bulan — Rumah Tercinta Kita',
    shortName: 'Bumi & Bulan',
    tagline: 'Satu-satunya Dunia dengan Kehidupan & Air Mengalir',
    targetPosition: [14.5, 0, 0],
    camOffset: [3.8, 2.2, 4.8],
    astroSpeech:
      'Wah, lihat betapa indahnya bola biru ini... inilah Bumi, satu-satunya rumah kita tercinta di alam semesta! Hanya di planet inilah ada air laut yang melimpah, udara segar untuk kita bernapas, dan jutaan hewan serta tumbuhan. Dan lihat teman kecil di sampingnya, itu Bulan manis yang selalu setia menemani malam kita!',
    kidFact: 'Lebih dari 70 persen permukaan Bumi tertutup samudra air yang luas dan indah.',
    astroMood: 'celebrating',
    highlightBadge: 'Rumah Kita',
    relatedPlanetId: 'earth',
  },
  {
    id: 'tour-mars',
    stepNumber: 5,
    totalSteps: 10,
    name: 'Mars — Planet Merah Berdebu Karat Besi',
    shortName: 'Mars',
    tagline: 'Tempat Robot Penjelajah Mencari Rahasia Air',
    targetPosition: [18.5, 0, 0],
    camOffset: [3, 2, 4],
    astroSpeech:
      'Meluncur ke planet tetangga: Mars si Planet Merah! Kenapa warnanya merah karat? Karena tanahnya banyak mengandung debu besi yang teroksidasi seperti paku tua! Di Mars ada gunung tertinggi bernama Olympus Mons, tingginya tiga kali Gunung Everest! Robot-robot penjelajah kita saat ini sedang sibuk meneliti apakah dulu pernah ada danau purba di sini.',
    kidFact: 'Mars memiliki dua bulan kecil yang lucu berbentuk mirip kentang, namanya Phobos dan Deimos!',
    astroMood: 'explaining',
    highlightBadge: 'Planet Merah',
    relatedPlanetId: 'mars',
  },
  {
    id: 'tour-asteroids',
    stepNumber: 6,
    totalSteps: 10,
    name: 'Sabuk Asteroid — Jalan Bebatuan Kosmik',
    shortName: 'Sabuk Asteroid',
    tagline: 'Jutaan Bongkahan Batu Sisa Pembentukan Tata Surya',
    targetPosition: [21.5, 0.5, 0],
    camOffset: [4.2, 3.2, 6],
    astroSpeech:
      'Awas ada batu melayang! Tenang, kita aman di dalam kapal antariksa! Kita sedang melintasi Sabuk Asteroid di antara Mars dan Jupiter. Di sini ada jutaan bongkahan batu luar angkasa yang melayang-layang. Bebatuan ini adalah bahan sisa saat planet-planet baru terbentuk 4,6 miliar tahun lalu. Yang paling besar di sini adalah planet kerdil Ceres!',
    kidFact: 'Batu asteroid terbesar di sabuk ini memiliki lebar hampir seribu kilometer!',
    astroMood: 'waving',
    highlightBadge: 'Sabuk Batuan',
  },
  {
    id: 'tour-jupiter',
    stepNumber: 7,
    totalSteps: 10,
    name: 'Jupiter — Raja Raksasa Gas Terbesar',
    shortName: 'Jupiter',
    tagline: 'Planet Raksasa dengan Badai Abadi Bintik Merah',
    targetPosition: [24, 0, 0],
    camOffset: [6, 3.8, 8],
    astroSpeech:
      'Waaah, besaaar sekali! Ini dia Jupiter, raja terbesar di tata surya kita! Saking besarnya, 1.300 planet Bumi bisa masuk ke dalam perut Jupiter! Planet ini terbuat dari gas dan tidak memiliki daratan padat untuk diinjak. Dan lihat bulatan merah itu? Itu adalah Bintik Merah Raksasa, badai angin dahsyat yang ukurannya lebih besar dari seluruh planet Bumi!',
    kidFact: 'Gravitasi kuat Jupiter sering menarik komet liar sehingga Bumi kita terlindungi dari tabrakan bahaya!',
    astroMood: 'celebrating',
    highlightBadge: 'Raksasa Gas Terbesar',
    relatedPlanetId: 'jupiter',
  },
  {
    id: 'tour-saturn',
    stepNumber: 8,
    totalSteps: 10,
    name: 'Saturnus — Permata Angkasa dengan Mahkota Cincin Es',
    shortName: 'Saturnus',
    tagline: 'Cincin Megah Tersusun dari Miliaran Butiran Es Salju',
    targetPosition: [29.5, 0, 0],
    camOffset: [7, 4.5, 9.5],
    astroSpeech:
      'Keren sekali pemandangan ini! Ini adalah Saturnus, planet tercantik dengan cincin mahkota megahnya! Cincinnya yang berkilauan ini tersusun dari miliaran butiran es air, debu kosmik, dan bongkahan batu es yang berputar rapi. Meskipun ukurannya sangat besar, planet ini sangat ringan karena sebagian besar terbuat dari gas!',
    kidFact: 'Jika ada bak mandi kolam raksasa yang cukup besar, planet Saturnus bisa mengapung di atas air!',
    astroMood: 'happy',
    highlightBadge: 'Mahkota Cincin Es',
    relatedPlanetId: 'saturn',
  },
  {
    id: 'tour-ice-giants',
    stepNumber: 9,
    totalSteps: 10,
    name: 'Uranus, Neptunus & Komet Halley — Tepian Dingin',
    shortName: 'Uranus & Neptunus',
    tagline: 'Raksasa Es Misterius & Pengelana Komet Berekor Panjang',
    targetPosition: [35, 0, 0],
    camOffset: [6, 3.5, 8],
    astroSpeech:
      'Brrr... dingin sekali di sini! Kita sampai di Uranus dan Neptunus, duo raksasa es di tepian tata surya! Uranus berputar miring seperti bola yang menggelinding di jalurnya. Sedangkan Neptunus berwarna biru safir tua dengan badai angin terkencang mencapai 2.000 km per jam! Di kejauhan, kita juga bisa melihat Komet Halley yang meluncur membawa ekor gas putihnya!',
    kidFact: 'Suhu di Uranus bisa turun hingga minus 224 derajat celcius, terdingin di seluruh tata surya!',
    astroMood: 'thinking',
    highlightBadge: 'Raksasa Es & Komet',
    relatedPlanetId: 'uranus',
  },
  {
    id: 'tour-iss-future',
    stepNumber: 10,
    totalSteps: 10,
    name: 'Stasiun Luar Angkasa ISS & Masa Depanmu',
    shortName: 'Teknologi ISS',
    tagline: 'Astronaut Pemberani di Orbit & Mimpi Penjelajah Cilik',
    targetPosition: [14.5, 0.4, 0],
    camOffset: [2.2, 1.4, 2.8],
    astroSpeech:
      'Sebelum tur kita berakhir, lihat stasiun teknologi ini mengelilingi Bumi! Ini Stasiun Luar Angkasa Internasional (ISS). Di dalamnya, para astronaut hebat hidup dan melayang di gravitasi nol untuk meneliti sains demi kemajuan manusia! Suatu hari nanti, kamulah anak hebat yang akan melanjutkan mimpi manusia terbang ke bintang-bintang! Terima kasih sudah berkeliling bersama Astro!',
    kidFact: 'Astronaut di ISS mengelilingi Bumi begitu cepat sehingga melihat 16 kali matahari terbit dan terbenam setiap hari!',
    astroMood: 'celebrating',
    highlightBadge: 'Teknologi Manusia',
  },
];
