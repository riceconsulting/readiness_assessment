
import type { Assessment, ScoreTier } from './types';
import React from 'react';

export const MAX_SCORE_PER_QUESTION = 4;

export const getScoreTier = (score: number, maxScore: number): ScoreTier => {
    const percentage = (score / maxScore) * 100;
    if (percentage <= 25) return 'Sangat Rendah';
    // Fix: Corrected typo "Rendas" to "Rendah" to match the ScoreTier type.
    if (percentage <= 50) return 'Rendah';
    if (percentage <= 75) return 'Menengah';
    return 'Tinggi';
}


// --- ICON COMPONENTS ---
// Fix: Converted icon components from JSX to React.createElement to prevent parsing errors in a .ts file.
const BrainCircuitIcon: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" })
    )
);
const ChartBarIcon: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" })
    )
);
const CloudServerIcon: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" })
    )
);
const ShieldIcon: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" })
    )
);
const TargetIcon: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a17.96 17.96 0 0 1 1.25.02m-1.25-.02L17.37 21a6 6 0 0 1-7.38-5.84m-5.84 2.56a17.96 17.96 0 0 1-1.25-.02m1.25.02L6.63 21a6 6 0 0 1-7.38-5.84m5.84-2.56a17.96 17.96 0 0 1-1.25.02m1.25-.02L6.63 3a6 6 0 0 1 7.38 5.84m5.84 2.56a17.96 17.96 0 0 1 1.25-.02m1.25.02L17.37 3a6 6 0 0 1-7.38 5.84" })
    )
);
const CheckListIcon: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" })
    )
);
const LightBulbIcon: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: className },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.42 1.409-2.364 3.033-2.364 4.182h12.128c0-1.149-.944-2.773-2.364-4.182Z" })
    )
);

const aiAssessment: Assessment = {
    id: 'ai-readiness',
    title: 'AI & Business Automation Readiness',
    subtitle: 'AI & Business Automation Readiness Assessment',
    icon: BrainCircuitIcon,
    description: 'Ukur kesiapan perusahaan Anda untuk mengadopsi AI dan otomasi untuk mendorong pertumbuhan dan efisiensi.',
    categoryOrder: [
      'Strategi & Visi',
      'Kesiapan Data',
      'SDM & Budaya',
      'Teknologi & Infrastruktur',
      'Proses Bisnis',
      'Tata Kelola & Etika',
      'Investasi & ROI',
    ],
    questions: [
        // 1. Strategi & Visi
        {
          id: 'ai-q1',
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
          id: 'ai-q2',
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
          id: 'ai-q3',
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
          id: 'ai-q4',
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
          id: 'ai-q5',
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
          id: 'ai-q6',
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
          id: 'ai-q7',
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
          id: 'ai-q8',
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
          id: 'ai-q9',
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
          id: 'ai-q10',
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
          id: 'ai-q11',
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
          id: 'ai-q12',
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
          id: 'ai-q13',
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
          id: 'ai-q14',
          category: 'Investasi & ROI',
          text: 'Bagaimana Anda mengukur keberhasilan atau Return on Investment (ROI) dari proyek AI?',
          options: [
            { text: 'Kami belum memiliki metrik yang jelas untuk mengukur ROI proyek AI.', score: 1 },
            { text: 'ROI diukur berdasarkan metrik teknis (misal: akurasi model), bukan dampak bisnis.', score: 2 },
            { text: 'Kami melacak metrik bisnis (misal: efisiensi, penjualan), tapi secara manual.', score: 3 },
            { text: 'Ada dashboard terpusat yang melacak KPI bisnis dan ROI dari setiap inisiatif AI secara real-time.', score: 4 },
          ],
        },
    ],
    resultLevels: [
        {
          level: 'Pemula',
          minScore: 0,
          maxScore: 22, // ~40% of 56
          title: 'Tahap Awal (Foundation)',
          description: 'Perusahaan Anda berada di tahap awal dalam perjalanan adopsi AI. Fokus saat ini adalah membangun fondasi data yang kuat, meningkatkan kesadaran, dan merumuskan strategi awal.',
          recommendations: [
            { icon: CheckListIcon, text: 'Fokus pada pengumpulan dan sentralisasi data.', explanation: 'Data adalah bahan bakar AI. Tanpa data yang terpusat dan mudah diakses, model AI tidak dapat dibangun secara efektif. Mulailah dengan membuat "satu sumber kebenaran" untuk data terpenting Anda.' },
            { icon: LightBulbIcon, text: 'Lakukan pelatihan dasar tentang literasi data bagi karyawan.', explanation: 'Adopsi AI adalah tentang budaya, bukan hanya teknologi. Karyawan yang memahami dasar-dasar data akan lebih mampu mengidentifikasi peluang dan mendukung inisiatif AI di masa depan.' },
            { icon: TargetIcon, text: 'Identifikasi proses manual untuk pilot project otomasi sederhana.', explanation: 'Mulailah dari yang kecil untuk membuktikan nilai dan membangun momentum. Otomasi proses sederhana (misalnya, entri data) dapat memberikan kemenangan cepat dan pembelajaran berharga.' }
          ],
          color: 'text-red-500'
        },
        {
          level: 'Menengah',
          minScore: 23,
          maxScore: 39, // ~70% of 56
          title: 'Tahap Pengembangan (Developing)',
          description: 'Anda sudah memiliki beberapa inisiatif dan fondasi data yang cukup. Tantangannya adalah mengintegrasikan upaya-upaya ini, membentuk tim yang solid, dan mengukur dampak bisnis secara lebih sistematis.',
          recommendations: [
            { icon: CheckListIcon, text: 'Bentuk tim data/analitik terpusat (Center of Excellence).', explanation: 'Tim terpusat akan memastikan adanya standarisasi, berbagi pengetahuan, dan pengelolaan sumber daya yang efisien untuk semua proyek data dan AI di seluruh organisasi.' },
            { icon: LightBulbIcon, text: 'Investasi pada platform data yang lebih matang (e.g., cloud data warehouse).', explanation: 'Saat data Anda tumbuh, spreadsheet tidak lagi cukup. Platform data modern di cloud menawarkan skalabilitas, kecepatan, dan alat canggih untuk analisis yang lebih dalam.' },
            { icon: TargetIcon, text: 'Definisikan KPI yang jelas untuk mengukur ROI dari proyek AI.', explanation: 'Pilih proyek yang hasilnya dapat diukur dan dipahami oleh pimpinan bisnis. Ini akan mempermudah mendapatkan dukungan untuk investasi AI yang lebih besar di kemudian hari.' }
          ],
          color: 'text-amber-500'
        },
        {
          level: 'Mahir',
          minScore: 40,
          maxScore: 56,
          title: 'Tahap Pematangan (Maturing)',
          description: 'Perusahaan Anda sudah matang dalam pemanfaatan data dan AI. Anda siap untuk mengimplementasikan solusi AI yang lebih canggih, mengotomatisasi siklus hidup model, dan menjadikan AI sebagai keunggulan kompetitif.',
          recommendations: [
            { icon: CheckListIcon, text: 'Implementasikan praktik MLOps untuk mempercepat siklus development model AI.', explanation: 'MLOps (Machine Learning Operations) mengotomatiskan dan menyederhanakan alur kerja pengembangan, penerapan, dan pemeliharaan model ML, memungkinkan Anda berinovasi lebih cepat dan andal.' },
            { icon: LightBulbIcon, text: 'Bentuk dewan etika AI untuk tata kelola yang bertanggung jawab.', explanation: 'Seiring meningkatnya penggunaan AI, penting untuk memiliki kerangka kerja formal untuk memastikan AI digunakan secara etis, adil, dan transparan, serta memitigasi risiko reputasi.' },
            { icon: TargetIcon, text: 'Demokratisasi data: berikan akses data dan tools analisis ke lebih banyak departemen.', explanation: 'Berdayakan tim di luar departemen teknis untuk membuat keputusan berbasis data. Platform self-service BI dan analisis memungkinkan mereka menjawab pertanyaan bisnis mereka sendiri.' }
          ],
          color: 'text-[#5890AD]'
        }
    ],
    scoreExplanations: {
        'Strategi & Visi': {
            'Sangat Rendah': { title: 'Tahap Awal', explanation: 'Strategi AI belum terdefinisi dan dukungan pimpinan masih minim. Fokus awal harus pada edukasi C-level tentang potensi nilai bisnis AI untuk mendapatkan dukungan.' },
            'Rendah': { title: 'Terfragmentasi', explanation: 'Inisiatif AI berjalan sporadis tanpa visi terpusat. Perlu adanya penyelarasan strategi AI dengan tujuan bisnis utama agar lebih terarah dan berdampak.' },
            'Menengah': { title: 'Mulai Terarah', explanation: 'Strategi AI sudah ada untuk area-area kunci dan mendapat dukungan pimpinan. Langkah selanjutnya adalah mengintegrasikannya ke seluruh organisasi.' },
            'Tinggi': { title: 'Visi Terintegrasi', explanation: 'AI adalah pilar inti strategi bisnis dengan dukungan eksekutif penuh. Perusahaan Anda memandang AI sebagai pendorong utama pertumbuhan dan inovasi jangka panjang.' },
        },
        'Kesiapan Data': {
            'Sangat Rendah': { title: 'Fondasi Lemah', explanation: 'Data yang tersebar dan ketiadaan tata kelola menjadi penghalang utama. Prioritas pertama adalah membangun sumber data terpusat (single source of truth).' },
            'Rendah': { title: 'Pengumpulan Awal', explanation: 'Data mulai dikumpulkan, namun kualitas dan tata kelolanya belum konsisten. Perlu ada standarisasi dan kebijakan data governance yang lebih kuat.' },
            'Menengah': { title: 'Data Terkelola', explanation: 'Anda memiliki data warehouse/lake yang baik, pondasi yang kuat untuk AI. Peningkatan bisa dilakukan pada kualitas dan real-time access.' },
            'Tinggi': { title: 'Aset Data Strategis', explanation: 'Data Anda berkualitas tinggi, terkelola, dan terintegrasi. Data telah menjadi aset strategis yang membedakan Anda dari kompetitor.' },
        },
        'SDM & Budaya': {
            'Sangat Rendah': { title: 'Kesenjangan Keahlian', explanation: 'Keahlian AI internal sangat terbatas dan budaya belum data-driven. Investasi pada pelatihan dasar literasi data sangat fundamental.' },
            'Rendah': { title: 'Minat Sporadis', explanation: 'Ada beberapa talenta potensial, tapi belum terstruktur. Perlu dibentuk program pengembangan talenta dan jalur karir di bidang data.' },
            'Menengah': { title: 'Kekuatan Fungsional', explanation: 'Tim analis data sudah ada, dan beberapa bagian organisasi sudah data-driven. Tantangannya adalah menyebarkan budaya ini ke seluruh perusahaan.' },
            'Tinggi': { title: 'Budaya Inovasi', explanation: 'Anda memiliki tim AI yang kuat dan budaya yang mendukung eksperimen. Organisasi Anda secara proaktif menggunakan data untuk pengambilan keputusan.' },
        },
        'Teknologi & Infrastruktur': {
            'Sangat Rendah': { title: 'Infrastruktur Tradisional', explanation: 'Infrastruktur on-premise saat ini menjadi kendala. Perlu ada roadmap untuk adopsi cloud yang scalable untuk mendukung beban kerja AI.' },
            'Rendah': { title: 'Eksplorasi Cloud', explanation: 'Anda sudah mulai menggunakan cloud, tapi belum optimal untuk AI. Perlu eksplorasi layanan AI/ML spesifik di platform cloud dan praktik MLOps dasar.' },
            'Menengah': { title: 'Pemanfaatan Cloud', explanation: 'Infrastruktur cloud Anda sudah cukup matang. Fokus selanjutnya adalah MLOps untuk mengotomatisasi siklus hidup model AI dari development hingga monitoring.' },
            'Tinggi': { title: 'Arsitektur Modern', explanation: 'Infrastruktur Anda modern dan scalable, dengan praktik MLOps yang matang. Anda mampu menerapkan dan mengelola solusi AI yang kompleks secara efisien.' },
        },
        'Proses Bisnis': {
            'Sangat Rendah': { title: 'Dominasi Manual', explanation: 'Proses bisnis masih sangat manual, sehingga sulit untuk diotomatisasi. Langkah pertama adalah memetakan dan mendigitalisasi proses-proses kunci.' },
            'Rendah': { title: 'Digitalisasi Parsial', explanation: 'Beberapa proses sudah digital namun terisolasi (silo). Perlu integrasi antar sistem untuk menciptakan aliran data yang lancar untuk analisis AI.' },
            'Menengah': { title: 'Siap untuk Otomasi', explanation: 'Proses kunci sudah terpetakan dan siap dioptimalkan. Ini adalah kondisi ideal untuk menerapkan solusi otomasi cerdas dan AI untuk efisiensi.' },
            'Tinggi': { title: 'Didukung AI', explanation: 'AI secara aktif digunakan untuk mengotomatisasi dan memberikan nilai tambah pada produk dan operasi. Budaya inovasi proses sudah tertanam kuat.' },
        },
        'Tata Kelola & Etika': {
            'Sangat Rendah': { title: 'Belum Menjadi Perhatian', explanation: 'Aspek etika dan tata kelola AI belum dibahas. Ini berisiko. Mulailah dengan membentuk kesadaran tentang pentingnya AI yang bertanggung jawab.' },
            'Rendah': { title: 'Kesadaran Awal', explanation: 'Ada kesadaran tentang risiko bias dan etika, tapi belum ada tindakan konkret. Langkah selanjutnya adalah menyusun panduan atau kebijakan awal.' },
            'Menengah': { title: 'Kebijakan Terdefinisi', explanation: 'Anda sudah memiliki panduan etika AI. Tantangannya adalah memastikan kebijakan ini diimplementasikan dan diawasi secara konsisten di setiap proyek.' },
            'Tinggi': { title: 'Tata Kelola Matang', explanation: 'Anda memiliki kerangka kerja yang kuat untuk memastikan AI digunakan secara etis, adil, dan transparan, lengkap dengan komite dan proses audit.' },
        },
        'Investasi & ROI': {
            'Sangat Rendah': { title: 'Tanpa Anggaran', explanation: 'Ketiadaan anggaran khusus dan metrik ROI yang jelas menghambat kemajuan. Perlu dibuat business case yang kuat untuk proyek pilot guna mendapatkan pendanaan awal.' },
            'Rendah': { title: 'Pendanaan Ad-Hoc', explanation: 'Anggaran bersifat reaktif per proyek dan pengukuran ROI belum fokus pada dampak bisnis. Perlu ada standarisasi dalam pengajuan dan evaluasi proyek AI.' },
            'Menengah': { title: 'Anggaran Terencana', explanation: 'Ada alokasi anggaran tahunan dan pelacakan ROI sudah berjalan. Perlu ditingkatkan dengan menghubungkan metrik teknis ke KPI bisnis secara langsung.' },
            'Tinggi': { title: 'Investasi Strategis', explanation: 'AI dianggap sebagai investasi strategis dengan pendanaan berkelanjutan dan pengukuran ROI yang canggih. Anda dapat dengan jelas menunjukkan nilai bisnis dari AI.' },
        }
    }
};

const itMaturityAssessment: Assessment = {
    id: 'it-maturity',
    title: 'IT Maturity Assessment',
    subtitle: 'Penilaian Kematangan Infrastruktur & Operasional IT',
    icon: CloudServerIcon,
    description: 'Evaluasi efektivitas, skalabilitas, dan tata kelola infrastruktur serta operasional IT perusahaan Anda.',
    categoryOrder: [
        'Infrastruktur & Cloud',
        'Manajemen Layanan & Operasional IT',
        'Tata Kelola IT & Kepatuhan',
        'Manajemen Aset & Konfigurasi',
    ],
    questions: [
        {
            id: 'it-q1',
            category: 'Infrastruktur & Cloud',
            text: 'Seberapa scalable arsitektur infrastruktur IT Anda saat ini untuk mendukung pertumbuhan bisnis?',
            options: [
                { text: 'Sangat bergantung pada hardware on-premise yang sulit di-upgrade.', score: 1 },
                { text: 'Menggunakan beberapa layanan cloud, tetapi belum terintegrasi (hybrid).', score: 2 },
                { text: 'Sebagian besar sudah berbasis cloud dan dapat di-scale sesuai permintaan.', score: 3 },
                { text: 'Memiliki arsitektur cloud-native yang elastis dan terotomatisasi penuh.', score: 4 },
            ],
        },
        {
            id: 'it-q2',
            category: 'Infrastruktur & Cloud',
            text: 'Bagaimana strategi pencadangan (backup) dan pemulihan bencana (disaster recovery) Anda diuji secara berkala?',
            options: [
                { text: 'Backup dilakukan manual dan jarang diuji pemulihannya.', score: 1 },
                { text: 'Backup terotomatisasi, tapi pengujian pemulihan hanya dilakukan setahun sekali.', score: 2 },
                { text: 'Ada rencana pemulihan bencana (DRP) dan diuji secara berkala.', score: 3 },
                { text: 'Memiliki solusi high-availability (HA) dan DRP yang diuji otomatis secara rutin.', score: 4 },
            ],
        },
        {
            id: 'it-q3',
            category: 'Manajemen Layanan & Operasional IT',
            text: 'Bagaimana insiden dan permintaan layanan IT dari pengguna dikelola dan dilacak?',
            options: [
                { text: 'Melalui email atau komunikasi informal, tanpa pelacakan.', score: 1 },
                { text: 'Menggunakan sistem tiket dasar, namun tanpa Service Level Agreement (SLA).', score: 2 },
                { text: 'Memiliki Help Desk dengan sistem tiket dan SLA yang jelas.', score: 3 },
                { text: 'Mengadopsi kerangka kerja ITIL dengan manajemen insiden, masalah, dan perubahan.', score: 4 },
            ],
        },
        {
            id: 'it-q4',
            category: 'Manajemen Layanan & Operasional IT',
            text: 'Bagaimana Anda memonitor kesehatan dan performa sistem-sistem IT kritis?',
            options: [
                { text: 'Hanya bereaksi ketika ada laporan masalah dari pengguna.', score: 1 },
                { text: 'Menggunakan alat monitoring dasar untuk beberapa server utama.', score: 2 },
                { text: 'Memiliki sistem monitoring terpusat yang memberikan peringatan (alert) proaktif.', score: 3 },
                { text: 'Menggunakan solusi AIOps/observability untuk pemantauan end-to-end.', score: 4 },
            ],
        },
        {
            id: 'it-q5',
            category: 'Tata Kelola IT & Kepatuhan',
            text: 'Sejauh mana kerangka kerja tata kelola IT seperti COBIT atau ITIL diadopsi dalam operasional Anda?',
            options: [
                { text: 'Tidak ada kerangka kerja formal yang digunakan.', score: 1 },
                { text: 'Beberapa prinsip diadopsi secara informal.', score: 2 },
                { text: 'Mengadopsi bagian-bagian tertentu dari ITIL atau COBIT secara formal.', score: 3 },
                { text: 'Tata kelola IT terintegrasi penuh berdasarkan kerangka kerja standar industri.', score: 4 },
            ],
        },
        {
            id: 'it-q6',
            category: 'Tata Kelola IT & Kepatuhan',
            text: 'Bagaimana proses perencanaan strategis IT diselaraskan dengan tujuan bisnis perusahaan?',
            options: [
                { text: 'Perencanaan IT bersifat reaktif dan terpisah dari strategi bisnis.', score: 1 },
                { text: 'Ada diskusi tahunan, tapi tidak ada roadmap IT yang formal.', score: 2 },
                { text: 'Ada roadmap IT yang selaras dengan tujuan bisnis, ditinjau setiap tahun.', score: 3 },
                { text: 'Ada komite pengarah IT (steering committee) yang memastikan keselarasan berkelanjutan.', score: 4 },
            ],
        },
        {
            id: 'it-q7',
            category: 'Manajemen Aset & Konfigurasi',
            text: 'Bagaimana Anda mengelola inventaris dan siklus hidup aset hardware dan software?',
            options: [
                { text: 'Inventaris dicatat manual di spreadsheet dan jarang diperbarui.', score: 1 },
                { text: 'Menggunakan alat untuk inventaris dasar, tapi tanpa manajemen siklus hidup.', score: 2 },
                { text: 'Memiliki sistem manajemen aset IT (ITAM) yang melacak siklus hidup aset.', score: 3 },
                { text: 'Proses ITAM terotomatisasi dan terintegrasi dengan sistem lain (misal: keuangan).', score: 4 },
            ],
        },
        {
            id: 'it-q8',
            category: 'Manajemen Aset & Konfigurasi',
            text: 'Apakah ada proses manajemen perubahan (change management) yang formal untuk setiap modifikasi pada sistem produksi?',
            options: [
                { text: 'Perubahan dilakukan secara ad-hoc tanpa dokumentasi.', score: 1 },
                { text: 'Ada pemberitahuan informal sebelum perubahan, tapi tanpa proses persetujuan.', score: 2 },
                { text: 'Ada proses permintaan perubahan (change request) dengan persetujuan formal.', score: 3 },
                { text: 'Menggunakan Change Advisory Board (CAB) dan proses yang terdokumentasi penuh.', score: 4 },
            ],
        },
    ],
    resultLevels: [
        {
            level: 'Ad-Hoc',
            minScore: 0,
            maxScore: 12,
            title: 'Level Ad-Hoc',
            description: 'Operasional IT cenderung reaktif dan tidak terstruktur. Proses bergantung pada individu, dan kurangnya standarisasi menyebabkan inefisiensi.',
            recommendations: [
                { icon: CheckListIcon, text: 'Implementasikan sistem tiket Help Desk.', explanation: 'Sentralisasikan semua permintaan dan laporan masalah untuk memastikan tidak ada yang terlewat dan dapat dilacak penyelesaiannya.' },
                { icon: LightBulbIcon, text: 'Buat inventaris aset IT.', explanation: 'Mulailah mendokumentasikan semua hardware dan software yang Anda miliki. Ini adalah fondasi untuk manajemen dan keamanan yang lebih baik.' },
                { icon: TargetIcon, text: 'Standarisasi proses backup.', explanation: 'Tentukan jadwal dan metode backup yang konsisten untuk data-data penting untuk mencegah kehilangan data.' },
            ],
            color: 'text-red-500'
        },
        {
            level: 'Terkelola',
            minScore: 13,
            maxScore: 22,
            title: 'Level Terkelola (Managed)',
            description: 'Anda telah memiliki proses dan alat dasar. Fokus sekarang adalah meningkatkan efisiensi, standarisasi, dan penyelarasan dengan bisnis.',
            recommendations: [
                { icon: CheckListIcon, text: 'Adopsi kerangka kerja ITIL dasar.', explanation: 'Mulailah dengan proses Manajemen Insiden dan Manajemen Permintaan Layanan untuk meningkatkan kualitas layanan IT.' },
                { icon: LightBulbIcon, text: 'Implementasikan monitoring sistem proaktif.', explanation: 'Gunakan alat untuk memantau kesehatan sistem secara real-time agar dapat mengatasi masalah sebelum berdampak pada pengguna.' },
                { icon: TargetIcon, text: 'Formalisasikan proses manajemen perubahan (change management).', explanation: 'Pastikan setiap perubahan pada sistem produksi melalui proses persetujuan dan dokumentasi untuk mengurangi risiko downtime.' },
            ],
            color: 'text-amber-500'
        },
        {
            level: 'Teroptimasi',
            minScore: 23,
            maxScore: 32,
            title: 'Level Teroptimasi (Optimized)',
            description: 'IT berfungsi sebagai mitra strategis bisnis. Proses terkelola dengan baik, terukur, dan terus ditingkatkan untuk memberikan nilai maksimal.',
            recommendations: [
                { icon: CheckListIcon, text: 'Bentuk Komite Pengarah IT (IT Steering Committee).', explanation: 'Libatkan pimpinan bisnis dalam pengambilan keputusan strategis IT untuk memastikan keselarasan dan dukungan penuh.' },
                { icon: LightBulbIcon, text: 'Fokus pada otomatisasi operasional IT.', explanation: 'Gunakan script atau platform otomasi untuk tugas-tugas rutin seperti patching, deployment, dan monitoring untuk meningkatkan efisiensi.' },
                { icon: TargetIcon, text: 'Kembangkan Roadmap Teknologi jangka panjang.', explanation: 'Rencanakan adopsi teknologi masa depan yang akan mendukung inovasi dan keunggulan kompetitif perusahaan.' },
            ],
            color: 'text-[#5890AD]'
        }
    ],
    scoreExplanations: {
        'Infrastruktur & Cloud': {
            'Sangat Rendah': { title: 'Infrastruktur Kaku', explanation: 'Ketergantungan pada hardware on-premise menghambat skalabilitas dan kelincahan. Rencana pemulihan bencana belum matang.' },
            'Rendah': { title: 'Mulai Hybrid', explanation: 'Eksplorasi cloud sudah dimulai, namun integrasi dan strategi DRP yang komprehensif masih perlu ditingkatkan.' },
            'Menengah': { title: 'Cloud-Ready', explanation: 'Infrastruktur Anda sudah cukup fleksibel dengan adopsi cloud yang baik dan rencana DRP yang teruji. Fokus selanjutnya adalah otomatisasi.' },
            'Tinggi': { title: 'Infrastruktur Elastis', explanation: 'Arsitektur cloud-native yang terotomatisasi penuh memungkinkan skalabilitas instan dan ketahanan sistem yang sangat tinggi.' },
        },
        'Manajemen Layanan & Operasional IT': {
            'Sangat Rendah': { title: 'Operasional Reaktif', explanation: 'Dukungan IT tidak terstruktur dan tanpa metrik yang jelas. Tim IT lebih sering "memadamkan api" daripada mencegahnya.' },
            'Rendah': { title: 'Mulai Terlacak', explanation: 'Sistem tiket sudah ada, tapi SLA dan proses yang lebih dalam seperti manajemen masalah belum diterapkan. Monitoring masih minimal.' },
            'Menengah': { title: 'Layanan Terkelola', explanation: 'Help Desk berfungsi dengan baik, didukung SLA dan monitoring proaktif. Ini adalah fondasi yang kuat untuk layanan IT yang andal.' },
            'Tinggi': { title: 'Layanan Teroptimasi', explanation: 'Anda tidak hanya menyelesaikan masalah, tapi juga menganalisis akar penyebabnya (problem management) dan menggunakan AIOps untuk prediksi.' },
        },
        'Tata Kelola IT & Kepatuhan': {
            'Sangat Rendah': { title: 'Tanpa Arah', explanation: 'IT berjalan secara terpisah dari strategi bisnis. Ketiadaan kerangka kerja formal menciptakan risiko dan inefisiensi.' },
            'Rendah': { title: 'Kesadaran Awal', explanation: 'Ada upaya informal untuk menyelaraskan IT dengan bisnis, tapi belum ada struktur atau proses formal yang mengaturnya.' },
            'Menengah': { title: 'Mulai Selaras', explanation: 'Dengan roadmap IT yang jelas dan adopsi kerangka kerja, IT mulai bergerak seirama dengan tujuan perusahaan.' },
            'Tinggi': { title: 'Mitra Strategis', explanation: 'IT adalah bagian integral dari perencanaan strategis bisnis, membantu mendorong inovasi dan pengambilan keputusan.' },
        },
        'Manajemen Aset & Konfigurasi': {
            'Sangat Rendah': { title: 'Tidak Terkelola', explanation: 'Aset tidak terlacak dengan baik dan perubahan sistem tidak terkontrol, menimbulkan risiko keamanan dan pemborosan biaya.' },
            'Rendah': { title: 'Inventaris Dasar', explanation: 'Anda tahu aset apa yang dimiliki, tetapi tidak mengelola siklus hidupnya atau proses perubahannya secara ketat.' },
            'Menengah': { title: 'Proses Terdefinisi', explanation: 'Dengan ITAM dan proses change management, Anda memiliki kontrol yang baik atas aset dan konfigurasi sistem Anda.' },
            'Tinggi': { title: 'Manajemen Terintegrasi', explanation: 'Manajemen aset dan perubahan terotomatisasi dan terintegrasi, memberikan visibilitas penuh dan mengurangi risiko secara signifikan.' },
        }
    }
};

const cybersecurityAssessment: Assessment = {
    id: 'cybersecurity-readiness',
    title: 'Cybersecurity Readiness',
    subtitle: 'Penilaian Kesiapan Keamanan Siber',
    icon: ShieldIcon,
    description: 'Ukur postur keamanan siber Anda terhadap ancaman modern dan kepatuhan terhadap regulasi seperti UU PDP.',
    categoryOrder: [
        'Manajemen Ancaman & Kerentanan',
        'Manajemen Identitas & Akses',
        'Keamanan Data & Kepatuhan PDP',
        'Respons Insiden & Ketahanan',
    ],
    questions: [
        {
            id: 'cs-q1',
            category: 'Manajemen Ancaman & Kerentanan',
            text: 'Bagaimana perangkat endpoint (laptop, server) dilindungi dari malware dan serangan canggih?',
            options: [
                { text: 'Mengandalkan antivirus dasar bawaan sistem operasi.', score: 1 },
                { text: 'Setiap perangkat memiliki antivirus pihak ketiga yang dikelola individu.', score: 2 },
                { text: 'Menggunakan antivirus terpusat dengan kebijakan keamanan standar.', score: 3 },
                { text: 'Menggunakan solusi EDR/XDR (Endpoint Detection & Response) untuk deteksi ancaman proaktif.', score: 4 },
            ],
        },
        {
            id: 'cs-q2',
            category: 'Manajemen Ancaman & Kerentanan',
            text: 'Seberapa rutin Anda melakukan pemindaian kerentanan (vulnerability scanning) dan menerapkan patch keamanan?',
            options: [
                { text: 'Tidak pernah atau hanya jika terjadi masalah.', score: 1 },
                { text: 'Patch diterapkan secara manual dan tidak terjadwal.', score: 2 },
                { text: 'Melakukan pemindaian kerentanan dan patch secara rutin (misal: bulanan).', score: 3 },
                { text: 'Memiliki program manajemen kerentanan terotomatisasi berbasis risiko.', score: 4 },
            ],
        },
        {
            id: 'cs-q3',
            category: 'Manajemen Identitas & Akses',
            text: 'Bagaimana kebijakan autentikasi pengguna untuk mengakses sistem dan data sensitif?',
            options: [
                { text: 'Hanya menggunakan kata sandi, tanpa aturan kompleksitas.', score: 1 },
                { text: 'Kata sandi dengan kebijakan kompleksitas minimum (panjang, karakter).', score: 2 },
                { text: 'Autentikasi Multi-Faktor (MFA) diwajibkan untuk semua layanan penting.', score: 3 },
                { text: 'Menggunakan Single Sign-On (SSO) dengan kebijakan akses adaptif berbasis risiko.', score: 4 },
            ],
        },
        {
            id: 'cs-q4',
            category: 'Manajemen Identitas & Akses',
            text: 'Seberapa sering hak akses pengguna ditinjau ulang untuk memastikan prinsip hak terendah (least privilege)?',
            options: [
                { text: 'Tidak pernah, akses hanya ditambahkan dan tidak pernah dicabut.', score: 1 },
                { text: 'Secara tahunan, dengan proses review manual.', score: 2 },
                { text: 'Secara semi-tahunan, dengan keterlibatan manajer lini.', score: 3 },
                { text: 'Secara triwulanan, dengan proses sertifikasi akses yang terotomatisasi.', score: 4 },
            ],
        },
        {
            id: 'cs-q5',
            category: 'Keamanan Data & Kepatuhan PDP',
            text: 'Bagaimana data sensitif, terutama data pribadi sesuai UU PDP, diklasifikasikan dan dilindungi (misalnya dengan enkripsi)?',
            options: [
                { text: 'Tidak ada proses klasifikasi data; semua data diperlakukan sama.', score: 1 },
                { text: 'Klasifikasi data dilakukan secara ad-hoc, enkripsi hanya pada level disk.', score: 2 },
                { text: 'Ada kebijakan klasifikasi data, dan enkripsi diterapkan pada data kritis saat diam (at-rest).', score: 3 },
                { text: 'Klasifikasi dan perlindungan data (DLP, enkripsi at-rest & in-transit) berjalan otomatis.', score: 4 },
            ],
        },
        {
            id: 'cs-q6',
            category: 'Keamanan Data & Kepatuhan PDP',
            text: 'Seberapa sering karyawan mendapatkan pelatihan kesadaran keamanan siber, terutama terkait phishing dan penanganan data pribadi?',
            options: [
                { text: 'Tidak pernah ada pelatihan formal.', score: 1 },
                { text: 'Pelatihan hanya saat orientasi karyawan baru.', score: 2 },
                { text: 'Pelatihan kesadaran keamanan dilakukan setahun sekali untuk semua karyawan.', score: 3 },
                { text: 'Program pelatihan berkelanjutan dengan simulasi phishing secara rutin.', score: 4 },
            ],
        },
        {
            id: 'cs-q7',
            category: 'Respons Insiden & Ketahanan',
            text: 'Bagaimana Anda mendeteksi dan merespons aktivitas mencurigakan di jaringan Anda secara real-time?',
            options: [
                { text: 'Hanya mengandalkan laporan dari pengguna atau notifikasi dari pihak ketiga.', score: 1 },
                { text: 'Melakukan review log secara manual setelah ada dugaan insiden.', score: 2 },
                { text: 'Menggunakan sistem deteksi intrusi (IDS/IPS) dan log firewall untuk alerting.', score: 3 },
                { text: 'Menggunakan SIEM (Security Information & Event Management) untuk korelasi dan analisis log terpusat.', score: 4 },
            ],
        },
        {
            id: 'cs-q8',
            category: 'Respons Insiden & Ketahanan',
            text: 'Apakah perusahaan memiliki Rencana Respons Insiden (Incident Response Plan) yang diuji secara berkala melalui simulasi?',
            options: [
                { text: 'Tidak ada rencana tertulis.', score: 1 },
                { text: 'Ada rencana, tapi belum pernah diuji atau diperbarui.', score: 2 },
                { text: 'Rencana respons insiden ada dan ditinjau setiap tahun.', score: 3 },
                { text: 'Rencana diuji setidaknya setahun sekali melalui simulasi (tabletop exercise).', score: 4 },
            ],
        }
    ],
    resultLevels: [
        {
            level: 'Reaktif',
            minScore: 0,
            maxScore: 12,
            title: 'Level Reaktif (Reactive)',
            description: 'Postur keamanan Anda bersifat reaktif. Tindakan cenderung diambil setelah insiden terjadi, dengan sedikit fokus pada pencegahan.',
            recommendations: [
                { icon: CheckListIcon, text: 'Implementasikan dasar-dasar keamanan (security hygiene).', explanation: 'Pastikan semua perangkat memiliki antivirus terpusat, firewall diaktifkan, dan kebijakan kata sandi dasar diterapkan.' },
                { icon: LightBulbIcon, text: 'Lakukan inventarisasi data sensitif.', explanation: 'Identifikasi di mana data pribadi pelanggan dan data kritis perusahaan disimpan untuk memahami area risiko terbesar Anda.' },
                { icon: TargetIcon, text: 'Buat Rencana Respons Insiden sederhana.', explanation: 'Tuliskan langkah-langkah dasar yang harus diambil jika terjadi insiden, siapa yang harus dihubungi, dan bagaimana cara mengisolasinya.' },
            ],
            color: 'text-red-500'
        },
        {
            level: 'Proaktif',
            minScore: 13,
            maxScore: 22,
            title: 'Level Proaktif (Proactive)',
            description: 'Anda telah menerapkan langkah-langkah keamanan preventif. Fokus sekarang adalah meningkatkan visibilitas, kepatuhan, dan kesadaran.',
            recommendations: [
                { icon: CheckListIcon, text: 'Wajibkan penggunaan Autentikasi Multi-Faktor (MFA).', explanation: 'MFA adalah salah satu cara paling efektif untuk mencegah pengambilalihan akun. Terapkan untuk semua layanan penting, terutama yang terekspos ke internet.' },
                { icon: LightBulbIcon, text: 'Lakukan program pelatihan kesadaran keamanan rutin.', explanation: 'Karyawan adalah garis pertahanan pertama. Ajari mereka cara mengenali phishing dan praktik aman lainnya, sesuai amanat UU PDP.' },
                { icon: TargetIcon, text: 'Mulai program manajemen kerentanan.', explanation: 'Lakukan pemindaian rutin pada sistem Anda untuk menemukan dan memperbaiki celah keamanan sebelum dieksploitasi oleh penyerang.' },
            ],
            color: 'text-amber-500'
        },
        {
            level: 'Adaptif',
            minScore: 23,
            maxScore: 32,
            title: 'Level Adaptif (Adaptive)',
            description: 'Keamanan siber terintegrasi ke dalam budaya dan operasi Anda. Anda siap untuk beradaptasi dengan cepat terhadap ancaman baru dan mengotomatisasi pertahanan.',
            recommendations: [
                { icon: CheckListIcon, text: 'Implementasikan SIEM dan mulailah berburu ancaman (threat hunting).', explanation: 'Jangan hanya menunggu peringatan. Cari secara proaktif tanda-tanda kompromi dalam log dan data jaringan Anda untuk menemukan ancaman tersembunyi.' },
                { icon: LightBulbIcon, text: 'Uji Rencana Respons Insiden Anda secara berkala.', explanation: 'Lakukan simulasi serangan (tabletop exercises atau red teaming) untuk memastikan tim Anda siap merespons dengan cepat dan efektif saat krisis nyata.' },
                { icon: TargetIcon, text: 'Otomatiskan kepatuhan dan perlindungan data.', explanation: 'Gunakan alat seperti Data Loss Prevention (DLP) untuk secara otomatis mencegah data sensitif keluar dari organisasi Anda, membantu menegakkan kepatuhan UU PDP.' },
            ],
            color: 'text-[#5890AD]'
        }
    ],
    scoreExplanations: {
        'Manajemen Ancaman & Kerentanan': {
            'Sangat Rendah': { title: 'Perlindungan Minimal', explanation: 'Pertahanan sangat dasar dan reaktif, membuat sistem sangat rentan terhadap malware modern dan eksploitasi kerentanan.' },
            'Rendah': { title: 'Mulai Preventif', explanation: 'Sudah ada kontrol preventif seperti antivirus dan patching, tetapi prosesnya manual dan tidak konsisten, masih menyisakan banyak celah.' },
            'Menengah': { title: 'Pertahanan Terkelola', explanation: 'Anda secara aktif mengelola keamanan endpoint dan kerentanan. Ini adalah postur pertahanan yang baik terhadap ancaman umum.' },
            'Tinggi': { title: 'Manajemen Proaktif', explanation: 'Dengan EDR dan manajemen kerentanan berbasis risiko, Anda dapat mendeteksi dan memitigasi ancaman sebelum menyebabkan kerusakan signifikan.' },
        },
        'Manajemen Identitas & Akses': {
            'Sangat Rendah': { title: 'Akses Tidak Terkontrol', explanation: 'Manajemen akses yang lemah sangat meningkatkan risiko pengambilalihan akun dan akses tidak sah ke data sensitif.' },
            'Rendah': { title: 'Kebijakan Dasar', explanation: 'Ada kebijakan kata sandi, tetapi tanpa MFA, akun tetap rentan. Peninjauan akses yang jarang menyebabkan "access creep".' },
            'Menengah': { title: 'Akses Aman', explanation: 'MFA secara signifikan mengurangi risiko. Proses peninjauan akses yang teratur membantu menegakkan prinsip hak terendah (least privilege).' },
            'Tinggi': { title: 'Identitas Modern', explanation: 'Dengan SSO dan akses adaptif, Anda menyeimbangkan keamanan yang kuat dengan pengalaman pengguna yang baik, memberikan akses berdasarkan konteks risiko.' },
        },
        'Keamanan Data & Kepatuhan PDP': {
            'Sangat Rendah': { title: 'Risiko Kepatuhan Tinggi', explanation: 'Kurangnya klasifikasi dan perlindungan data menempatkan Anda pada risiko tinggi pelanggaran data dan ketidakpatuhan terhadap UU PDP.' },
            'Rendah': { title: 'Kesadaran Awal', explanation: 'Ada kesadaran untuk melindungi data, tetapi prosesnya manual dan pelatihan karyawan minimal, belum cukup untuk memenuhi tuntutan regulasi.' },
            'Menengah': { title: 'Kepatuhan Terdefinisi', explanation: 'Dengan kebijakan klasifikasi, enkripsi, dan pelatihan tahunan, Anda telah membangun fondasi yang baik untuk kepatuhan UU PDP.' },
            'Tinggi': { title: 'Perlindungan Terintegrasi', explanation: 'Perlindungan data terotomatisasi (DLP) dan budaya sadar keamanan yang kuat memastikan data pribadi dilindungi secara by-design.' },
        },
        'Respons Insiden & Ketahanan': {
            'Sangat Rendah': { title: 'Respons Kacau', explanation: 'Tanpa deteksi proaktif dan rencana yang jelas, insiden keamanan dapat berlangsung lama tanpa terdeteksi dan menyebabkan kerusakan besar.' },
            'Rendah': { title: 'Deteksi Manual', explanation: 'Meskipun ada upaya untuk meninjau log, proses yang tidak terstruktur membuat waktu deteksi (time-to-detect) menjadi sangat lama.' },
            'Menengah': { title: 'Deteksi Otomatis', explanation: 'Sistem Anda dapat secara otomatis memberi tahu tentang potensi ancaman, dan adanya rencana respons memungkinkan tindakan yang lebih terkoordinasi.' },
            'Tinggi': { title: 'Respons Cepat & Teruji', explanation: 'Dengan SIEM dan rencana yang teruji, Anda dapat mendeteksi, merespons, dan pulih dari insiden dengan cepat, meminimalkan dampak bisnis.' },
        }
    }
};

const businessAssessment: Assessment = {
    id: 'business-growth',
    title: 'Business Growth Assessment',
    subtitle: 'Penilaian Potensi Pertumbuhan Bisnis',
    icon: ChartBarIcon,
    description: 'Analisis area-area kunci bisnis Anda untuk mengidentifikasi kekuatan, kelemahan, dan peluang pertumbuhan strategis.',
    categoryOrder: [
        'Strategi & Posisi Pasar',
        'Keuangan & Profitabilitas',
        'Operasional & Efisiensi',
        'Pemasaran & Penjualan',
        'Tim & Budaya',
        'Inovasi & Teknologi',
    ],
    questions: [
        {
            id: 'bg-q1',
            category: 'Strategi & Posisi Pasar',
            text: 'Seberapa jelas proposisi nilai unik (Unique Value Proposition) Anda dan terdiferensiasi di pasar?',
            options: [
                { text: 'Kami menawarkan produk/jasa yang mirip dengan banyak pesaing.', score: 1 },
                { text: 'Kami memiliki beberapa keunggulan, tetapi pelanggan terkadang sulit melihat perbedaannya.', score: 2 },
                { text: 'Proposisi nilai kami jelas dan menjadi alasan utama pelanggan memilih kami.', score: 3 },
                { text: 'Proposisi nilai kami sangat kuat, mendominasi ceruk pasar, dan sulit ditiru pesaing.', score: 4 },
            ],
        },
        {
            id: 'bg-q2',
            category: 'Strategi & Posisi Pasar',
            text: 'Seberapa dalam pemahaman Anda tentang target pasar dan segmen pelanggan ideal Anda?',
            options: [
                { text: 'Kami mencoba melayani semua orang, target pasar kami sangat luas.', score: 1 },
                { text: 'Kami punya gambaran umum tentang siapa pelanggan kami, tapi belum ada riset mendalam.', score: 2 },
                { text: 'Kami telah mendefinisikan persona pelanggan yang jelas dan memfokuskan pemasaran pada mereka.', score: 3 },
                { text: 'Kami secara rutin mengumpulkan data dan feedback untuk memperbarui pemahaman kami tentang kebutuhan pelanggan.', score: 4 },
            ],
        },
        {
            id: 'bg-q3',
            category: 'Keuangan & Profitabilitas',
            text: 'Bagaimana Anda mengelola dan memonitor kesehatan keuangan (arus kas, laba rugi) bisnis Anda?',
            options: [
                { text: 'Pencatatan keuangan tidak teratur, lebih fokus pada saldo bank.', score: 1 },
                { text: 'Kami memiliki pembukuan dasar, tetapi laporan keuangan sering terlambat.', score: 2 },
                { text: 'Laporan keuangan rutin (bulanan) tersedia dan digunakan untuk pengambilan keputusan dasar.', score: 3 },
                { text: 'Kami menggunakan dashboard keuangan real-time dengan proyeksi untuk keputusan strategis.', score: 4 },
            ],
        },
        {
            id: 'bg-q4',
            category: 'Keuangan & Profitabilitas',
            text: 'Seberapa beragam sumber pendapatan Anda dan bagaimana profitabilitasnya?',
            options: [
                { text: 'Sangat bergantung pada satu produk/jasa atau beberapa klien besar saja.', score: 1 },
                { text: 'Ada beberapa produk/jasa, tapi kami tidak yakin mana yang paling menguntungkan.', score: 2 },
                { text: 'Kami memiliki beberapa sumber pendapatan yang menguntungkan dan secara rutin menganalisis marginnya.', score: 3 },
                { text: 'Portofolio pendapatan kami terdiversifikasi dengan baik, dengan beberapa aliran pendapatan ber-margin tinggi.', score: 4 },
            ],
        },
        {
            id: 'bg-q5',
            category: 'Operasional & Efisiensi',
            text: 'Seberapa terstandarisasi dan terdokumentasi proses operasional inti Anda?',
            options: [
                { text: 'Proses bergantung pada pengetahuan individu, tidak ada SOP (Standard Operating Procedure) tertulis.', score: 1 },
                { text: 'Ada beberapa panduan, tetapi tidak diterapkan secara konsisten oleh semua tim.', score: 2 },
                { text: 'Sebagian besar proses inti memiliki SOP yang jelas dan diikuti oleh tim.', score: 3 },
                { text: 'Semua proses terdefinisi, terotomatisasi jika memungkinkan, dan terus-menerus ditingkatkan.', score: 4 },
            ],
        },
        {
            id: 'bg-q6',
            category: 'Operasional & Efisiensi',
            text: 'Seberapa skalabel operasional bisnis Anda untuk menangani peningkatan permintaan 2-3 kali lipat?',
            options: [
                { text: 'Peningkatan permintaan akan menyebabkan kekacauan besar dan penurunan kualitas.', score: 1 },
                { text: 'Kami bisa menanganinya, tetapi akan membutuhkan banyak kerja lembur dan merekrut secara mendadak.', score: 2 },
                { text: 'Sistem kami cukup fleksibel untuk menangani lonjakan permintaan dengan penyesuaian minor.', score: 3 },
                { text: 'Operasional kami dirancang untuk skalabilitas; kami dapat meningkatkan kapasitas dengan cepat dan efisien.', score: 4 },
            ],
        },
        {
            id: 'bg-q7',
            category: 'Pemasaran & Penjualan',
            text: 'Seberapa efektif dan terukur strategi pemasaran Anda dalam menghasilkan prospek berkualitas (qualified leads)?',
            options: [
                { text: 'Pemasaran kami bersifat sporadis dan "word-of-mouth", sulit diukur efektivitasnya.', score: 1 },
                { text: 'Kami mencoba beberapa channel (misal: media sosial), tapi tidak melacak ROI secara sistematis.', score: 2 },
                { text: 'Kami memiliki strategi pemasaran terencana dengan metrik yang jelas (misal: CPA, CPL) untuk beberapa channel utama.', score: 3 },
                { text: 'Kami menggunakan pendekatan pemasaran berbasis data (data-driven) dengan "sales funnel" yang teroptimasi.', score: 4 },
            ],
        },
        {
            id: 'bg-q8',
            category: 'Pemasaran & Penjualan',
            text: 'Bagaimana proses penjualan Anda dari kontak awal hingga penutupan (closing)?',
            options: [
                { text: 'Proses penjualan tidak terstruktur, setiap anggota tim punya cara sendiri-sendiri.', score: 1 },
                { text: 'Ada beberapa tahapan penjualan yang dipahami secara umum, tapi tidak ada CRM.', score: 2 },
                { text: 'Kami menggunakan CRM untuk melacak prospek melalui tahapan penjualan yang terdefinisi.', score: 3 },
                { text: 'Proses penjualan kami terotomatisasi, terukur, dan terus dioptimalkan untuk meningkatkan konversi.', score: 4 },
            ],
        },
        {
            id: 'bg-q9',
            category: 'Tim & Budaya',
            text: 'Bagaimana Anda memastikan tim Anda memiliki keterampilan yang tepat dan termotivasi?',
            options: [
                { text: 'Kami merekrut jika perlu, tidak ada program pelatihan atau pengembangan formal.', score: 1 },
                { text: 'Ada beberapa pelatihan ad-hoc, tetapi tujuan individu tidak selalu selaras dengan tujuan perusahaan.', score: 2 },
                { text: 'Kami memiliki proses review kinerja reguler dan menyediakan anggaran untuk pelatihan.', score: 3 },
                { text: 'Ada jalur karir yang jelas, budaya feedback yang kuat, dan program pengembangan kepemimpinan.', score: 4 },
            ],
        },
        {
            id: 'bg-q10',
            category: 'Tim & Budaya',
            text: 'Sejauh mana peran dan tanggung jawab didefinisikan dengan jelas di dalam tim?',
            options: [
                { text: 'Banyak tumpang tindih pekerjaan, sering terjadi kebingungan siapa yang bertanggung jawab.', score: 1 },
                { text: 'Peran didefinisikan secara umum, tetapi seringkali ada tugas yang tidak jelas pemiliknya.', score: 2 },
                { text: 'Sebagian besar karyawan memiliki deskripsi pekerjaan yang jelas dan memahami tanggung jawab mereka.', score: 3 },
                { text: 'Setiap peran memiliki KPI yang jelas, dan struktur organisasi mendukung akuntabilitas dan kolaborasi.', score: 4 },
            ],
        },
        {
            id: 'bg-q11',
            category: 'Inovasi & Teknologi',
            text: 'Seberapa sering bisnis Anda memperkenalkan produk, layanan, atau perbaikan proses yang baru?',
            options: [
                { text: 'Kami jarang melakukan perubahan, lebih fokus menjalankan apa yang sudah ada.', score: 1 },
                { text: 'Inovasi terjadi secara reaktif, biasanya sebagai respons terhadap tekanan pasar atau pesaing.', score: 2 },
                { text: 'Kami secara rutin menyisihkan waktu dan sumber daya untuk mengembangkan ide-ide baru.', score: 3 },
                { text: 'Inovasi adalah bagian inti dari budaya kami, dengan proses formal dari ide hingga peluncuran.', score: 4 },
            ],
        },
        {
            id: 'bg-q12',
            category: 'Inovasi & Teknologi',
            text: 'Bagaimana Anda memanfaatkan teknologi untuk meningkatkan efisiensi dan pengalaman pelanggan?',
            options: [
                { text: 'Penggunaan teknologi sangat dasar, sebatas email dan aplikasi office.', score: 1 },
                { text: 'Kami menggunakan beberapa aplikasi spesifik (misal: akuntansi), tetapi tidak terintegrasi.', score: 2 },
                { text: 'Kami telah mengadopsi teknologi kunci (misal: CRM, project management tool) yang meningkatkan produktivitas.', score: 3 },
                { text: 'Kami memiliki tumpukan teknologi (tech stack) terintegrasi dan proaktif mencari teknologi baru.', score: 4 },
            ],
        },
    ],
    resultLevels: [
        {
            level: 'Fondasi',
            minScore: 0,
            maxScore: 19,
            title: 'Tahap Fondasi',
            description: 'Bisnis Anda berada pada tahap awal atau stabilisasi. Fokus utama adalah membangun sistem dasar yang solid, memastikan profitabilitas, dan memperjelas posisi Anda di pasar.',
            recommendations: [
                { icon: CheckListIcon, text: 'Standarisasi Proses Operasional Kunci.', explanation: 'Dokumentasikan proses-proses terpenting untuk memastikan konsistensi dan kualitas, serta mempermudah pelatihan karyawan baru.' },
                { icon: LightBulbIcon, text: 'Perkuat Manajemen Arus Kas (Cash Flow).', explanation: 'Monitor arus kas masuk dan keluar secara ketat. Arus kas yang sehat adalah darah kehidupan bisnis pada tahap ini.' },
                { icon: TargetIcon, text: 'Fokus pada Target Pelanggan Ideal Anda.', explanation: 'Identifikasi segmen pelanggan yang paling menguntungkan dan layani mereka dengan sangat baik untuk membangun reputasi yang kuat.' },
            ],
            color: 'text-red-500'
        },
        {
            level: 'Ekspansi',
            minScore: 20,
            maxScore: 35,
            title: 'Tahap Ekspansi',
            description: 'Anda memiliki fondasi yang kuat dan siap untuk bertumbuh. Tantangannya adalah menskalakan operasi, tim, dan pemasaran secara efektif tanpa mengorbankan kualitas.',
            recommendations: [
                { icon: CheckListIcon, text: 'Bangun Saluran Pemasaran yang Terukur.', explanation: 'Investasikan pada 1-2 channel pemasaran yang dapat Anda lacak ROI-nya secara jelas untuk menciptakan aliran prospek yang konsisten.' },
                { icon: LightBulbIcon, text: 'Investasi pada Pengembangan Tim.', explanation: 'Seiring pertumbuhan bisnis, kembangkan keterampilan tim Anda dan mulai definisikan struktur organisasi yang lebih jelas.' },
                { icon: TargetIcon, text: 'Terapkan Teknologi untuk Otomasi.', explanation: 'Gunakan perangkat lunak seperti CRM atau alat manajemen proyek untuk mengotomatisasi tugas-tugas manual dan meningkatkan efisiensi.' },
            ],
            color: 'text-amber-500'
        },
        {
            level: 'Optimalisasi',
            minScore: 36,
            maxScore: 48,
            title: 'Tahap Optimalisasi',
            description: 'Bisnis Anda sudah matang dan berjalan dengan baik. Peluang pertumbuhan terletak pada optimalisasi, inovasi, dan penguatan posisi sebagai pemimpin pasar.',
            recommendations: [
                { icon: CheckListIcon, text: 'Kembangkan Budaya Inovasi Berkelanjutan.', explanation: 'Alokasikan sumber daya secara formal untuk riset dan pengembangan produk/layanan baru agar tetap relevan di pasar.' },
                { icon: LightBulbIcon, text: 'Manfaatkan Analisis Data untuk Keputusan Strategis.', explanation: 'Gunakan data pelanggan, penjualan, dan operasional untuk mengidentifikasi tren dan membuat keputusan bisnis yang lebih cerdas.' },
                { icon: TargetIcon, text: 'Eksplorasi Pasar atau Sumber Pendapatan Baru.', explanation: 'Diversifikasi penawaran Anda atau masuk ke segmen pasar baru untuk menciptakan aliran pendapatan tambahan dan mengurangi risiko.' },
            ],
            color: 'text-[#5890AD]'
        }
    ],
    scoreExplanations: {
        'Strategi & Posisi Pasar': {
            'Sangat Rendah': { title: 'Posisi Tidak Jelas', explanation: 'Bisnis Anda belum memiliki diferensiasi yang kuat di pasar. Sangat penting untuk mengidentifikasi apa yang membuat Anda unik dan siapa pelanggan ideal Anda.' },
            'Rendah': { title: 'Mulai Terdiferensiasi', explanation: 'Ada beberapa keunikan, tetapi belum dikomunikasikan secara konsisten. Perkuat pesan pemasaran Anda agar selaras dengan proposisi nilai Anda.' },
            'Menengah': { title: 'Posisi Kuat', explanation: 'Pelanggan memahami nilai yang Anda tawarkan. Langkah selanjutnya adalah memperdalam hubungan dengan segmen pelanggan inti Anda.' },
            'Tinggi': { title: 'Pemimpin Pasar', explanation: 'Anda memiliki posisi yang dominan dan sulit ditiru. Pertahankan keunggulan ini dengan terus berinovasi dan mendengarkan pasar.' },
        },
        'Keuangan & Profitabilitas': {
            'Sangat Rendah': { title: 'Manajemen Reaktif', explanation: 'Kesehatan keuangan tidak termonitor dengan baik, berisiko pada masalah arus kas. Prioritaskan pembukuan yang teratur dan akurat.' },
            'Rendah': { title: 'Dasar-Dasar Terpenuhi', explanation: 'Anda memiliki pencatatan dasar, tetapi belum menggunakannya untuk analisis. Coba analisis profitabilitas per produk/jasa.' },
            'Menengah': { title: 'Keuangan Terkelola', explanation: 'Anda memiliki laporan rutin yang baik. Langkah selanjutnya adalah mulai membuat perencanaan anggaran dan proyeksi keuangan.' },
            'Tinggi': { title: 'Dikelola Secara Strategis', explanation: 'Keuangan menjadi alat untuk pengambilan keputusan strategis. Anda memiliki visibilitas yang sangat baik untuk mengelola pertumbuhan.' },
        },
        'Operasional & Efisiensi': {
            'Sangat Rendah': { title: 'Operasional Ad-Hoc', explanation: 'Ketergantungan pada individu membuat bisnis sulit diskalakan dan rentan terhadap kesalahan. Mulailah dengan mendokumentasikan proses-proses kunci.' },
            'Rendah': { title: 'Proses Mulai Terbentuk', explanation: 'Beberapa proses sudah ada, tetapi belum konsisten. Fokus pada implementasi SOP di seluruh tim untuk meningkatkan kualitas.' },
            'Menengah': { title: 'Operasional yang Andal', explanation: 'Proses Anda sudah terstandarisasi dan dapat diandalkan. Cari peluang untuk mengotomatisasi tugas-tugas yang berulang.' },
            'Tinggi': { title: 'Efisien & Skalabel', explanation: 'Operasional Anda adalah keunggulan kompetitif. Budaya perbaikan berkelanjutan (continuous improvement) akan menjaga Anda tetap di depan.' },
        },
        'Pemasaran & Penjualan': {
            'Sangat Rendah': { title: 'Upaya Sporadis', explanation: 'Kurangnya strategi yang terukur membuat akuisisi pelanggan tidak dapat diprediksi. Mulailah dengan melacak dari mana pelanggan Anda datang.' },
            'Rendah': { title: 'Aktivitas Tanpa Pengukuran', explanation: 'Anda aktif di beberapa channel, tetapi tidak tahu mana yang berhasil. Implementasikan metrik dasar untuk mengukur efektivitas pemasaran.' },
            'Menengah': { title: 'Mesin Pertumbuhan', explanation: 'Anda memiliki proses pemasaran dan penjualan yang andal. Optimalkan konversi di setiap tahap "sales funnel" Anda.' },
            'Tinggi': { title: 'Didukung Data', explanation: 'Akuisisi pelanggan Anda sangat efisien dan dapat diprediksi. Manfaatkan data untuk personalisasi dan meningkatkan nilai umur pelanggan (customer lifetime value).' },
        },
        'Tim & Budaya': {
            'Sangat Rendah': { title: 'Struktur Tidak Jelas', explanation: 'Ketidakjelasan peran dan kurangnya pengembangan menyebabkan frustrasi dan inefisiensi. Definisikan peran dan tanggung jawab dengan jelas.' },
            'Rendah': { title: 'Manajemen Fungsional', explanation: 'Tim dapat menjalankan tugas, tetapi belum ada fokus pada pengembangan jangka panjang. Mulailah dengan sesi feedback dan review kinerja rutin.' },
            'Menengah': { title: 'Tim yang Berkembang', explanation: 'Anda berinvestasi pada tim Anda. Langkah selanjutnya adalah membangun jalur karir dan mengidentifikasi pemimpin masa depan.' },
            'Tinggi': { title: 'Aset Strategis', explanation: 'Tim dan budaya Anda adalah pendorong utama keberhasilan. Anda mampu menarik dan mempertahankan talenta terbaik di industri Anda.' },
        },
        'Inovasi & Teknologi': {
            'Sangat Rendah': { title: 'Status Quo', explanation: 'Kurangnya inovasi dan adopsi teknologi membuat Anda berisiko tertinggal. Mulailah dengan mengidentifikasi inefisiensi yang dapat diatasi dengan teknologi.' },
            'Rendah': { title: 'Adopsi Reaktif', explanation: 'Anda mengadopsi teknologi saat terpaksa. Coba proaktif mencari alat yang dapat meningkatkan produktivitas tim Anda.' },
            'Menengah': { title: 'Pemanfaatan Teknologi', explanation: 'Anda menggunakan teknologi secara efektif untuk operasional. Pastikan semua alat terintegrasi dengan baik untuk aliran data yang lancar.' },
            'Tinggi': { title: 'Didorong Inovasi', explanation: 'Anda menggunakan inovasi dan teknologi untuk menciptakan keunggulan kompetitif. Anda tidak hanya mengikuti tren, tetapi menciptakannya.' },
        }
    }
};


export const assessments: Assessment[] = [
    aiAssessment,
    businessAssessment,
    itMaturityAssessment,
    cybersecurityAssessment,
];