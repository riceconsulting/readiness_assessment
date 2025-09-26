
import type { Question, ResultLevel } from './types';

export const assessmentQuestions: Question[] = [
  // 1. Strategi & Visi
  {
    id: 'q1',
    category: 'Strategi & Visi',
    text: 'Sejauh mana strategi pemanfaatan AI terintegrasi dalam rencana bisnis utama perusahaan Anda?',
    options: [
      { text: 'Belum ada strategi formal, masih dalam tahap eksplorasi.', score: 1 },
      { text: 'Ada beberapa inisiatif sporadis, namun belum menjadi strategi terpusat.', score: 2 },
      { text: 'Strategi sudah didefinisikan untuk beberapa departemen kunci.', score: 3 },
      { text: 'AI dan otomasi adalah pilar utama dalam strategi bisnis jangka panjang kami.', score: 4 },
    ],
  },
  {
    id: 'q2',
    category: 'Strategi & Visi',
    text: 'Bagaimana kepemimpinan perusahaan memandang dan mendukung inisiatif AI?',
    options: [
      { text: 'Pimpinan belum melihat urgensi atau nilai bisnis dari AI.', score: 1 },
      { text: 'Ada dukungan verbal, namun alokasi sumber daya masih sangat terbatas.', score: 2 },
      { text: 'Pimpinan secara aktif mendanai proyek percontohan (pilot projects).', score: 3 },
      { text: 'Ada sponsor eksekutif yang kuat dan AI menjadi agenda rutin di level C-suite.', score: 4 },
    ],
  },
  // 2. Kesiapan Data
  {
    id: 'q3',
    category: 'Kesiapan Data',
    text: 'Bagaimana kualitas dan aksesibilitas data di perusahaan Anda untuk inisiatif AI?',
    options: [
      { text: 'Data tersebar, tidak terstruktur, dan sulit diakses.', score: 1 },
      { text: 'Data mulai dikumpulkan secara terpusat, namun kualitasnya masih bervariasi.', score: 2 },
      { text: 'Kami memiliki data warehouse/lake yang terkelola dengan baik.', score: 3 },
      { text: 'Data kami terintegrasi, berkualitas tinggi, dan dapat diakses secara real-time.', score: 4 },
    ],
  },
  {
    id: 'q4',
    category: 'Kesiapan Data',
    text: 'Bagaimana tata kelola data (data governance) diterapkan di organisasi Anda?',
    options: [
      { text: 'Tidak ada kebijakan tata kelola data yang formal.', score: 1 },
      { text: 'Kebijakan ada di atas kertas, tetapi penegakannya lemah.', score: 2 },
      { text: 'Ada tim atau komite khusus yang mengelola kualitas dan keamanan data.', score: 3 },
      { text: 'Tata kelola data sudah terotomatisasi dan menjadi bagian dari budaya kerja.', score: 4 },
    ],
  },
  // 3. SDM & Budaya
  {
    id: 'q5',
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
    id: 'q6',
    category: 'SDM & Budaya',
    text: 'Seberapa siap budaya perusahaan Anda untuk mengadopsi cara kerja berbasis data dan AI?',
    options: [
      { text: 'Keputusan lebih sering dibuat berdasarkan intuisi daripada data.', score: 1 },
      { text: 'Ada kesadaran untuk menggunakan data, tapi masih ragu-ragu dalam eksekusi.', score: 2 },
      { text: 'Departemen tertentu sudah sangat data-driven.', score: 3 },
      { text: 'Eksperimen dan pengambilan keputusan berbasis data didorong di semua level.', score: 4 },
    ],
  },
  // 4. Teknologi & Infrastruktur
  {
    id: 'q7',
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
    id: 'q8',
    category: 'Teknologi & Infrastruktur',
    text: 'Bagaimana Anda mengelola dan menerapkan model AI setelah selesai dikembangkan?',
    options: [
      { text: 'Belum pernah sampai tahap penerapan model (deployment).', score: 1 },
      { text: 'Penerapan model dilakukan secara manual dan ad-hoc.', score: 2 },
      { text: 'Ada proses standar untuk penerapan, tapi pemantauan masih manual.', score: 3 },
      { text: 'Kami menggunakan praktik MLOps untuk otomatisasi deployment, monitoring, dan retraining.', score: 4 },
    ],
  },
  // 5. Proses Bisnis
  {
    id: 'q9',
    category: 'Proses Bisnis',
    text: 'Seberapa siap proses bisnis Anda untuk diotomatisasi atau ditingkatkan dengan AI?',
    options: [
      { text: 'Proses masih sangat manual dan belum terdefinisi dengan jelas.', score: 1 },
      { text: 'Beberapa proses sudah digital, namun masih banyak silo dan inefisiensi.', score: 2 },
      { text: 'Proses-proses kunci sudah terpetakan dan siap untuk dianalisis untuk otomasi.', score: 3 },
      { text: 'Kami secara aktif mencari dan menerapkan otomasi cerdas di seluruh alur kerja.', score: 4 },
    ],
  },
  {
    id: 'q10',
    category: 'Proses Bisnis',
    text: 'Bagaimana AI diintegrasikan ke dalam produk, layanan, atau operasi Anda?',
    options: [
      { text: 'AI belum menjadi bagian dari produk atau proses operasional kami.', score: 1 },
      { text: 'AI digunakan untuk analisis internal, belum berdampak langsung ke pelanggan.', score: 2 },
      { text: 'Beberapa fitur produk atau proses internal telah ditingkatkan dengan AI.', score: 3 },
      { text: 'AI adalah komponen inti yang memberikan nilai tambah signifikan bagi pelanggan kami.', score: 4 },
    ],
  },
  // 6. Tata Kelola & Etika
  {
    id: 'q11',
    category: 'Tata Kelola & Etika',
    text: 'Apakah perusahaan Anda memiliki panduan atau kebijakan mengenai penggunaan AI yang etis dan bertanggung jawab?',
    options: [
      { text: 'Topik ini belum pernah dibahas secara formal.', score: 1 },
      { text: 'Ada kesadaran, namun belum ada kebijakan tertulis.', score: 2 },
      { text: 'Kami memiliki panduan umum, tetapi belum ada mekanisme pengawasan.', score: 3 },
      { text: 'Ada komite etika AI dan proses audit rutin untuk memastikan kepatuhan.', score: 4 },
    ],
  },
  {
    id: 'q12',
    category: 'Tata Kelola & Etika',
    text: 'Bagaimana Anda memastikan keadilan (fairness) dan menghindari bias dalam model AI Anda?',
    options: [
      { text: 'Kami tidak memiliki metode khusus untuk mendeteksi atau mitigasi bias.', score: 1 },
      { text: 'Kami sadar akan risiko bias, tapi belum punya tool atau proses untuk mengatasinya.', score: 2 },
      { text: 'Tim data science melakukan analisis bias secara manual sebelum deployment.', score: 3 },
      { text: 'Kami menggunakan tools otomatis dan kerangka kerja untuk mendeteksi dan mengurangi bias secara sistematis.', score: 4 },
    ],
  },
  // 7. Investasi & ROI
  {
    id: 'q13',
    category: 'Investasi & ROI',
    text: 'Bagaimana perusahaan Anda mengalokasikan anggaran untuk inisiatif AI?',
    options: [
      { text: 'Tidak ada anggaran khusus untuk AI.', score: 1 },
      { text: 'Anggaran bersifat ad-hoc per proyek, dengan proses persetujuan yang panjang.', score: 2 },
      { text: 'Ada anggaran tahunan yang dialokasikan untuk eksplorasi dan proyek AI.', score: 3 },
      { text: 'AI dianggap sebagai investasi strategis dengan model pendanaan yang fleksibel dan berkelanjutan.', score: 4 },
    ],
  },
  {
    id: 'q14',
    category: 'Investasi & ROI',
    text: 'Bagaimana Anda mengukur keberhasilan atau Return on Investment (ROI) dari proyek AI?',
    options: [
      { text: 'Kami belum memiliki metrik yang jelas untuk mengukur ROI proyek AI.', score: 1 },
      { text: 'ROI diukur berdasarkan metrik teknis (misal: akurasi model), bukan dampak bisnis.', score: 2 },
      { text: 'Kami melacak metrik bisnis (misal: efisiensi, penjualan), tapi secara manual.', score: 3 },
      { text: 'Ada dashboard terpusat yang melacak KPI bisnis dan ROI dari setiap inisiatif AI secara real-time.', score: 4 },
    ],
  },
];


export const TOTAL_QUESTIONS = assessmentQuestions.length;
export const MAX_SCORE_PER_QUESTION = 4;
export const TOTAL_MAX_SCORE = TOTAL_QUESTIONS * MAX_SCORE_PER_QUESTION; // 14 * 4 = 56

export const resultLevels: ResultLevel[] = [
  {
    level: 'Pemula',
    minScore: 0,
    maxScore: 22, // ~40%
    title: 'Tahap Awal (Foundation)',
    description: 'Perusahaan Anda berada di tahap awal dalam perjalanan adopsi AI. Fokus saat ini adalah membangun fondasi data yang kuat, meningkatkan kesadaran, dan merumuskan strategi awal.',
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
    minScore: 23, // ~41%
    maxScore: 39, // ~70%
    title: 'Tahap Pengembangan (Developing)',
    description: 'Anda sudah memiliki beberapa inisiatif dan fondasi data yang cukup. Tantangannya adalah mengintegrasikan upaya-upaya ini, membentuk tim yang solid, dan mengukur dampak bisnis secara lebih sistematis.',
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
        text: 'Definisikan KPI yang jelas untuk mengukur ROI dari proyek AI.',
        explanation: 'Pilih proyek yang hasilnya dapat diukur dan dipahami oleh pimpinan bisnis. Ini akan mempermudah mendapatkan dukungan untuk investasi AI yang lebih besar di kemudian hari.'
      }
    ],
    color: 'text-amber-500'
  },
  {
    level: 'Mahir',
    minScore: 40, // ~71%
    maxScore: 56,
    title: 'Tahap Pematangan (Maturing)',
    description: 'Perusahaan Anda sudah matang dalam pemanfaatan data dan AI. Anda siap untuk mengimplementasikan solusi AI yang lebih canggih, mengotomatisasi siklus hidup model, dan menjadikan AI sebagai keunggulan kompetitif.',
    recommendations: [
      {
        text: 'Implementasikan praktik MLOps untuk mempercepat siklus development model AI.',
        explanation: 'MLOps (Machine Learning Operations) mengotomatiskan dan menyederhanakan alur kerja pengembangan, penerapan, dan pemeliharaan model ML, memungkinkan Anda berinovasi lebih cepat dan andal.'
      },
      {
        text: 'Bentuk dewan etika AI untuk tata kelola yang bertanggung jawab.',
        explanation: 'Seiring meningkatnya penggunaan AI, penting untuk memiliki kerangka kerja formal untuk memastikan AI digunakan secara etis, adil, dan transparan, serta memitigasi risiko reputasi.'
      },
      {
        text: 'Demokratisasi data: berikan akses data dan tools analisis ke lebih banyak departemen.',
        explanation: 'Berdayakan tim di luar departemen teknis untuk membuat keputusan berbasis data. Platform self-service BI dan analisis memungkinkan mereka menjawab pertanyaan bisnis mereka sendiri.'
      }
    ],
    color: 'text-[#5890AD]'
  }
];

// Tiering for explanation: 2 questions per category, max score 8
// 1-2: Sangat Rendah
// 3-4: Rendah
// 5-6: Menengah
// 7-8: Tinggi
type ScoreTier = 'Sangat Rendah' | 'Rendah' | 'Menengah' | 'Tinggi';

export const getScoreTier = (score: number, maxScore: number): ScoreTier => {
    const percentage = (score / maxScore) * 100;
    if (percentage <= 25) return 'Sangat Rendah'; // score 1-2 for max 8
    if (percentage <= 50) return 'Rendah'; // score 3-4 for max 8
    if (percentage <= 75) return 'Menengah'; // score 5-6 for max 8
    return 'Tinggi'; // score 7-8 for max 8
}

export const scoreExplanations: Record<string, Record<ScoreTier, { title: string; explanation: string }>> = {
  'Strategi & Visi': {
    'Sangat Rendah': {
      title: 'Tahap Awal',
      explanation: 'Strategi AI belum terdefinisi dan dukungan pimpinan masih minim. Fokus awal harus pada edukasi C-level tentang potensi nilai bisnis AI untuk mendapatkan dukungan.',
    },
    'Rendah': {
      title: 'Terfragmentasi',
      explanation: 'Inisiatif AI berjalan sporadis tanpa visi terpusat. Perlu adanya penyelarasan strategi AI dengan tujuan bisnis utama agar lebih terarah dan berdampak.',
    },
    'Menengah': {
      title: 'Mulai Terarah',
      explanation: 'Strategi AI sudah ada untuk area-area kunci dan mendapat dukungan pimpinan. Langkah selanjutnya adalah mengintegrasikannya ke seluruh organisasi.',
    },
    'Tinggi': {
      title: 'Visi Terintegrasi',
      explanation: 'AI adalah pilar inti strategi bisnis dengan dukungan eksekutif penuh. Perusahaan Anda memandang AI sebagai pendorong utama pertumbuhan dan inovasi jangka panjang.',
    },
  },
  'Kesiapan Data': {
    'Sangat Rendah': {
      title: 'Fondasi Lemah',
      explanation: 'Data yang tersebar dan ketiadaan tata kelola menjadi penghalang utama. Prioritas pertama adalah membangun sumber data terpusat (single source of truth).',
    },
    'Rendah': {
      title: 'Pengumpulan Awal',
      explanation: 'Data mulai dikumpulkan, namun kualitas dan tata kelolanya belum konsisten. Perlu ada standarisasi dan kebijakan data governance yang lebih kuat.',
    },
    'Menengah': {
      title: 'Data Terkelola',
      explanation: 'Anda memiliki data warehouse/lake yang baik, pondasi yang kuat untuk AI. Peningkatan bisa dilakukan pada kualitas dan real-time access.',
    },
    'Tinggi': {
      title: 'Aset Data Strategis',
      explanation: 'Data Anda berkualitas tinggi, terkelola, dan terintegrasi. Data telah menjadi aset strategis yang membedakan Anda dari kompetitor.',
    },
  },
  'SDM & Budaya': {
    'Sangat Rendah': {
      title: 'Kesenjangan Keahlian',
      explanation: 'Keahlian AI internal sangat terbatas dan budaya belum data-driven. Investasi pada pelatihan dasar literasi data sangat fundamental.',
    },
    'Rendah': {
      title: 'Minat Sporadis',
      explanation: 'Ada beberapa talenta potensial, tapi belum terstruktur. Perlu dibentuk program pengembangan talenta dan jalur karir di bidang data.',
    },
    'Menengah': {
      title: 'Kekuatan Fungsional',
      explanation: 'Tim analis data sudah ada, dan beberapa bagian organisasi sudah data-driven. Tantangannya adalah menyebarkan budaya ini ke seluruh perusahaan.',
    },
    'Tinggi': {
      title: 'Budaya Inovasi',
      explanation: 'Anda memiliki tim AI yang kuat dan budaya yang mendukung eksperimen. Organisasi Anda secara proaktif menggunakan data untuk pengambilan keputusan.',
    },
  },
  'Teknologi & Infrastruktur': {
    'Sangat Rendah': {
      title: 'Infrastruktur Tradisional',
      explanation: 'Infrastruktur on-premise saat ini menjadi kendala. Perlu ada roadmap untuk adopsi cloud yang scalable untuk mendukung beban kerja AI.',
    },
    'Rendah': {
      title: 'Eksplorasi Cloud',
      explanation: 'Anda sudah mulai menggunakan cloud, tapi belum optimal untuk AI. Perlu eksplorasi layanan AI/ML spesifik di platform cloud dan praktik MLOps dasar.',
    },
    'Menengah': {
      title: 'Pemanfaatan Cloud',
      explanation: 'Infrastruktur cloud Anda sudah cukup matang. Fokus selanjutnya adalah MLOps untuk mengotomatisasi siklus hidup model AI dari development hingga monitoring.',
    },
    'Tinggi': {
      title: 'Arsitektur Modern',
      explanation: 'Infrastruktur Anda modern dan scalable, dengan praktik MLOps yang matang. Anda mampu menerapkan dan mengelola solusi AI yang kompleks secara efisien.',
    },
  },
  'Proses Bisnis': {
    'Sangat Rendah': {
      title: 'Dominasi Manual',
      explanation: 'Proses bisnis masih sangat manual, sehingga sulit untuk diotomatisasi. Langkah pertama adalah memetakan dan mendigitalisasi proses-proses kunci.',
    },
    'Rendah': {
      title: 'Digitalisasi Parsial',
      explanation: 'Beberapa proses sudah digital namun terisolasi (silo). Perlu integrasi antar sistem untuk menciptakan aliran data yang lancar untuk analisis AI.',
    },
    'Menengah': {
      title: 'Siap untuk Otomasi',
      explanation: 'Proses kunci sudah terpetakan dan siap dioptimalkan. Ini adalah kondisi ideal untuk menerapkan solusi otomasi cerdas dan AI untuk efisiensi.',
    },
    'Tinggi': {
      title: 'Didukung AI',
      explanation: 'AI secara aktif digunakan untuk mengotomatisasi dan memberikan nilai tambah pada produk dan operasi. Budaya inovasi proses sudah tertanam kuat.',
    },
  },
  'Tata Kelola & Etika': {
    'Sangat Rendah': {
      title: 'Belum Menjadi Perhatian',
      explanation: 'Aspek etika dan tata kelola AI belum dibahas. Ini berisiko. Mulailah dengan membentuk kesadaran tentang pentingnya AI yang bertanggung jawab.',
    },
    'Rendah': {
      title: 'Kesadaran Awal',
      explanation: 'Ada kesadaran tentang risiko bias dan etika, tapi belum ada tindakan konkret. Langkah selanjutnya adalah menyusun panduan atau kebijakan awal.',
    },
    'Menengah': {
      title: 'Kebijakan Terdefinisi',
      explanation: 'Anda sudah memiliki panduan etika AI. Tantangannya adalah memastikan kebijakan ini diimplementasikan dan diawasi secara konsisten di setiap proyek.',
    },
    'Tinggi': {
      title: 'Tata Kelola Matang',
      explanation: 'Anda memiliki kerangka kerja yang kuat untuk memastikan AI digunakan secara etis, adil, dan transparan, lengkap dengan komite dan proses audit.',
    },
  },
  'Investasi & ROI': {
    'Sangat Rendah': {
      title: 'Tanpa Anggaran',
      explanation: 'Ketiadaan anggaran khusus dan metrik ROI yang jelas menghambat kemajuan. Perlu dibuat business case yang kuat untuk proyek pilot guna mendapatkan pendanaan awal.',
    },
    'Rendah': {
      title: 'Pendanaan Ad-Hoc',
      explanation: 'Anggaran bersifat reaktif per proyek dan pengukuran ROI belum fokus pada dampak bisnis. Perlu ada standarisasi dalam pengajuan dan evaluasi proyek AI.',
    },
    'Menengah': {
      title: 'Anggaran Terencana',
      explanation: 'Ada alokasi anggaran tahunan dan pelacakan ROI sudah berjalan. Perlu ditingkatkan dengan menghubungkan metrik teknis ke KPI bisnis secara langsung.',
    },
    'Tinggi': {
      title: 'Investasi Strategis',
      explanation: 'AI dianggap sebagai investasi strategis dengan pendanaan berkelanjutan dan pengukuran ROI yang canggih. Anda dapat dengan jelas menunjukkan nilai bisnis dari AI.',
    },
  }
};