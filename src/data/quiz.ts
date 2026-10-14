import type { QuizQuestion } from '../types/gamification';

export const SOLAR_SYSTEM_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Planet apakah yang memiliki julukan si "Planet Merah" karena kandungan karat besi di tanahnya?',
    options: ['Jupiter', 'Mars', 'Merkurius', 'Venus'],
    correctIndex: 1,
    explanation: 'Hebat! Mars dijuluki Planet Merah karena banyaknya oksida besi (karat) di debu dan permukaannya.',
    planetRelated: 'mars',
  },
  {
    id: 'q2',
    question: 'Planet apakah yang paling besar di seluruh tata surya kita?',
    options: ['Saturnus', 'Bumi', 'Jupiter', 'Neptunus'],
    correctIndex: 2,
    explanation: 'Benar sekali! Jupiter adalah planet terbesar, bahkan 1.300 planet Bumi bisa muat di dalamnya!',
    planetRelated: 'jupiter',
  },
  {
    id: 'q3',
    question: 'Apakah yang menyebabkan planet-planet tetap berputar di jalurnya mengelilingi Matahari dan tidak terbang bebas?',
    options: [
      'Gaya gravitasi kuat dari Matahari',
      'Tali tak terlihat yang mengikat planet',
      'Dorongan angin luar angkasa',
      'Cahaya bintang yang menahan planet',
    ],
    correctIndex: 0,
    explanation: 'Tepat! Gravitasi Matahari yang sangat besar menarik planet-planet sehingga mereka tetap stabil mengitari jalur orbitnya.',
    planetRelated: 'sun',
  },
  {
    id: 'q4',
    question: 'Benda langit apakah yang merupakan satu-satunya satelit alami milik Bumi?',
    options: ['Bintang Fajar', 'Bulan (Moon)', 'Komet Halley', 'Titan'],
    correctIndex: 1,
    explanation: 'Keren! Bulan adalah satu-satunya satelit alami Bumi yang setia mengitari kita setiap 27 hari!',
    planetRelated: 'earth',
  },
  {
    id: 'q5',
    question: 'Planet manakah yang terkenal berputar miring 98 derajat bagai bola yang menggelinding?',
    options: ['Venus', 'Merkurius', 'Saturnus', 'Uranus'],
    correctIndex: 3,
    explanation: 'Luar biasa! Uranus berputar dengan kemiringan ekstrem 98 derajat, sehingga tampak menggelinding di jalur orbitnya!',
    planetRelated: 'uranus',
  },
];
