import type { Question, ResultLevel } from './types';

export const assessmentQuestions: Question[] = [
  {
    id: 'q1',
    category: 'Strategi & Visi',
    text: 'Sejauh mana strategi pemanfaatan AI dan otomasi data terintegrasi dalam rencana bisnis utama perusahaan Anda?',
    options: [
      { text: 'Belum ada strategi formal, masih dalam tahap eksplorasi.', score: 1 },
      { text: 'Ada beberapa inisiatif sporadis, namun belum menjadi strategi terpusat.', score: 2 },
      { text: 'Strategi sudah didefinisikan untuk beberapa departemen kunci.', score: 3 },
      { text: 'AI dan otomasi adalah pilar utama dalam strategi bisnis jangka panjang kami.', score: 4 },
    ],
  },
  {
    id: 'q2',
    category: 'Kesiapan Data',
    text: 'Bagaimana kualitas dan aksesibilitas data di perusahaan Anda untuk inisiatif AI?',
    options: [
      { text: 'Data tersebar, tidak terstruktur, dan sulit diakses.', score: 1 },
      { text: 'Data mulai dikumpulkan secara terpusat, namun kualitasnya masih bervariasi.', score: 2 },
      { text: 'Kami memiliki data warehouse/lake yang terkelola dengan baik dan data yang cukup bersih.', score: 3 },
      { text: 'Data kami terintegrasi, berkualitas tinggi, dan dapat diakses secara real-time di seluruh organisasi.', score: 4 },
    ],
  },
  {
    id: 'q3',
    category: 'SDM & Budaya',
    text: 'Bagaimana tingkat keahlian (skillset) tim Anda terkait analisis data dan AI?',
    options: [
      { text: 'Keahlian sangat terbatas, perlu pelatihan dari dasar.', score: 1 },
      { text: 'Ada beberapa individu yang memiliki minat, namun belum ada tim khusus.', score: 2 },
      { text: 'Kami memiliki analis data, namun butuh pengembangan keahlian di bidang AI/ML.', score: 3 },
      { text: 'Kami memiliki tim data science/AI yang kompeten dan terus berkembang.', score: 4 },
    ],
  },
  {
    id: 'q4',
    category: 'Teknologi & Infrastruktur',
    text: 'Infrastruktur teknologi apa yang saat ini Anda miliki untuk mendukung proyek AI?',
    options: [
      { text: 'Infrastruktur on-premise standar, belum siap untuk beban kerja AI.', score: 1 },
      { text: 'Mulai menggunakan beberapa layanan cloud, tapi belum untuk komputasi berat.', score: 2 },
      { text: 'Sudah memanfaatkan platform cloud (AWS, GCP, Azure) dengan beberapa layanan AI/ML.', score: 3 },
      { text: 'Memiliki arsitektur cloud-native yang scalable dengan MLOps pipeline yang matang.', score: 4 },
    ],
  },
  {
    id: 'q5',
    category: 'Proses Bisnis',
    text: 'Seberapa siap proses bisnis Anda untuk diotomatisasi atau ditingkatkan dengan AI?',
    options: [
      { text: 'Proses masih sangat manual dan belum terdefinisi dengan jelas.', score: 1 },
      { text: 'Beberapa proses sudah digital, namun masih banyak silo dan inefisiensi.', score: 2 },
      { text: 'Proses-proses kunci sudah terpetakan dan siap untuk dianalisis untuk otomasi.', score: 3 },
      { text: 'Kami secara aktif mencari dan menerapkan otomasi cerdas di seluruh alur kerja.', score: 4 },
    ],
  },
];

export const TOTAL_QUESTIONS = assessmentQuestions.length;
export const MAX_SCORE_PER_QUESTION = 4;
export const TOTAL_MAX_SCORE = TOTAL_QUESTIONS * MAX_SCORE_PER_QUESTION;

export const resultLevels: ResultLevel[] = [
  {
    level: 'Pemula',
    minScore: 0,
    maxScore: 8,
    title: 'Tahap Awal (Foundation)',
    description: 'Perusahaan Anda berada di tahap awal dalam perjalanan adopsi AI. Fokus saat ini adalah membangun fondasi data yang kuat dan meningkatkan kesadaran akan potensi AI.',
    recommendations: [
      {
        text: 'Fokus pada pengumpulan dan sentralisasi data.',
        explanation: 'Data adalah bahan bakar AI. Tanpa data yang terpusat dan mudah diakses, model AI tidak dapat dibangun secara efektif. Mulailah dengan membuat "satu sumber kebenaran" untuk data terpenting Anda.'
      },
      {
        text: 'Lakukan pelatihan dasar tentang literasi data bagi karyawan.',
        explanation: 'Adopsi AI adalah tentang budaya, bukan hanya teknologi. Karyawan yang memahami dasar-dasar data akan lebih mampu mengidentifikasi peluang dan mendukung inisiatif AI di masa depan.'
      },
      {
        text: 'Identifikasi proses manual untuk pilot project otomasi sederhana.',
        explanation: 'Mulailah dari yang kecil untuk membuktikan nilai dan membangun momentum. Otomasi proses sederhana (misalnya, entri data) dapat memberikan kemenangan cepat dan pembelajaran berharga.'
      }
    ],
    color: 'text-red-500'
  },
  {
    level: 'Menengah',
    minScore: 9,
    maxScore: 14,
    title: 'Tahap Pengembangan (Developing)',
    description: 'Anda sudah memiliki beberapa inisiatif dan fondasi data yang cukup. Tantangannya adalah mengintegrasikan upaya-upaya ini ke dalam strategi yang lebih kohesif.',
    recommendations: [
      {
        text: 'Bentuk tim data/analitik terpusat (Center of Excellence).',
        explanation: 'Tim terpusat akan memastikan adanya standarisasi, berbagi pengetahuan, dan pengelolaan sumber daya yang efisien untuk semua proyek data dan AI di seluruh organisasi.'
      },
      {
        text: 'Investasi pada platform data yang lebih matang (e.g., cloud data warehouse).',
        explanation: 'Saat data Anda tumbuh, spreadsheet tidak lagi cukup. Platform data modern di cloud menawarkan skalabilitas, kecepatan, dan alat canggih untuk analisis yang lebih dalam.'
      },
      {
        text: 'Mulai proyek AI dengan dampak bisnis jelas, seperti prediksi customer churn.',
        explanation: 'Pilih proyek yang hasilnya dapat diukur dan dipahami oleh pimpinan bisnis. Ini akan mempermudah mendapatkan dukungan untuk investasi AI yang lebih besar di kemudian hari.'
      }
    ],
    color: 'text-yellow-500'
  },
  {
    level: 'Mahir',
    minScore: 15,
    maxScore: 20,
    title: 'Tahap Pematangan (Maturing)',
    description: 'Perusahaan Anda sudah matang dalam pemanfaatan data dan AI. Anda siap untuk mengimplementasikan solusi AI yang lebih canggih dan mengukur ROI secara konsisten.',
    recommendations: [
      {
        text: 'Implementasikan praktik MLOps untuk mempercepat siklus development model AI.',
        explanation: 'MLOps (Machine Learning Operations) mengotomatiskan dan menyederhanakan alur kerja pengembangan, penerapan, dan pemeliharaan model ML, memungkinkan Anda berinovasi lebih cepat dan andal.'
      },
      {
        text: 'Eksplorasi penggunaan AI generatif untuk inovasi produk atau layanan.',
        explanation: 'Lihatlah melampaui analitik tradisional. AI Generatif dapat membuka peluang baru dalam pembuatan konten, desain produk, atau pengalaman pelanggan yang dipersonalisasi.'
      },
      {
        text: 'Demokratisasi data: berikan akses data dan tools analisis ke lebih banyak departemen.',
        explanation: 'Berdayakan tim di luar departemen teknis untuk membuat keputusan berbasis data. Platform self-service BI dan analisis memungkinkan mereka menjawab pertanyaan bisnis mereka sendiri.'
      }
    ],
    color: 'text-green-500'
  }
];
