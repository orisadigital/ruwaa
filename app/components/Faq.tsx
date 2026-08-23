const FAQS: {
  question: string;
  answer: string;
  items?: string[];
}[] = [
  {
    question: "Apakah RUWAA Residence?",
    answer:
      "RUWAA Residence ialah pusat pemulihan yang membantu individu berdepan ketagihan dadah dan masalah sosial melalui program pemulihan yang tersusun, persekitaran yang kondusif serta bimbingan yang menyeluruh.",
  },
  {
    question: "Apakah program pemulihan yang ditawarkan?",
    answer: "Program pemulihan RUWAA Residence merangkumi tiga peringkat utama:",
    items: [
      "Detox – 7 hingga 14 hari",
      "Primary – program pemulihan dan pembangunan diri",
      "Re-entry – persediaan kembali kepada keluarga, pekerjaan dan masyarakat.",
    ],
  },
  {
    question: "Apakah yang dilakukan semasa program Detox?",
    answer:
      "Program Detox berlangsung selama 7–14 hari dan merangkumi penilaian perubatan, temu bual bio-psiko-sosial, pemantauan dan pemerhatian klien serta rujukan kepada program atau intervensi yang sesuai.",
  },
  {
    question: "Adakah terdapat kaunseling?",
    answer:
      "Ya. Program merangkumi kaunseling dan pembangunan diri untuk membantu peserta memahami diri, mengurus emosi dan membina keyakinan diri.",
  },
  {
    question: "Adakah program mempunyai pengisian agama dan kerohanian?",
    answer:
      "Ya. Peserta mengikuti pengajian agama dan akhlak, serta penghayatan spiritual dan kuliah khas bersama penceramah jemputan untuk membina pemahaman agama dan matlamat hidup.",
  },
  {
    question: "Apakah aktiviti yang dijalankan selain kaunseling?",
    answer: "Antara aktiviti yang ditawarkan ialah:",
    items: [
      "Kemahiran hidup dan terapi kerja",
      "Aktiviti komuniti dan gotong-royong",
      "Aktiviti rekreasi dan sukan",
      "Muhasabah, refleksi dan perancangan diri.",
    ],
  },
  {
    question: "Adakah keluarga terlibat dalam proses pemulihan?",
    answer:
      "Ya. Peringkat Re-entry merangkumi persediaan kembali ke keluarga, latihan kemahiran hidup, bimbingan kerjaya dan pendidikan, sokongan sosial serta integrasi semula ke masyarakat.",
  },
  {
    question: "Apakah nilai yang diterapkan di RUWAA Residence?",
    answer:
      "Antara nilai yang ditekankan ialah pemikiran positif, hubungan sosial yang sihat, emosi yang stabil, rohani yang kuat, disiplin, tanggungjawab, kesediaan untuk kembali ke masyarakat dan hubungan kekeluargaan yang sihat.",
  },
  {
    question: "Siapakah yang boleh memohon kemasukan?",
    answer:
      "Kemasukan memerlukan individu mempunyai kad pengenalan dan menyertai secara sukarela atau secara paksaan, tertakluk kepada syarat kesihatan dan undang-undang yang dinyatakan.",
  },
  {
    question: "Apakah syarat kesihatan untuk kemasukan?",
    answer:
      "Pemohon perlu melalui perkara seperti sejarah kesihatan dan penyakit, diagnosis penyakit di hospital dan jenis ubat, serta memastikan keadaan kesihatan yang sesuai untuk menyertai program. Pemohon juga perlu mendapatkan rujukan ke fasiliti kesihatan sebelum kemasukan jika diperlukan.",
  },
  {
    question: "Adakah terdapat syarat berkaitan undang-undang?",
    answer:
      "Ya. Syarat undang-undang termasuk perkara berkaitan kes polis, kes mahkamah dalam jaminan atau hadir bicara semula, perintah pengawasan AADK dan perintah pengawasan/kaedah lapor diri masa datang.",
  },
  {
    question: "Apakah kemudahan yang disediakan?",
    answer:
      "Kemudahan yang disediakan termasuk bilik penginapan, ruang makan, ruang santai, ruang solat serta kawasan aktiviti dan rekreasi.",
  },
  {
    question: "Adakah peserta menjalani aktiviti fizikal?",
    answer:
      "Ya. Aktiviti rekreasi dan sukan merupakan sebahagian daripada pengisian program bagi membantu meningkatkan kesihatan, mengurangkan tekanan serta membina semangat dalam diri.",
  },
  {
    question: "Berapa lama tempoh program pemulihan?",
    answer:
      "Program Detox berlangsung selama 7–14 hari. Tempoh keseluruhan bagi peringkat Primary dan Re-entry tidak dinyatakan secara khusus.",
  },
  {
    question: "Bagaimana cara untuk mendapatkan maklumat lanjut atau memohon kemasukan?",
    answer:
      "Hubungi pihak RUWAA Residence secara terus untuk mendapatkan maklumat lanjut mengenai proses permohonan, penilaian dan kemasukan.",
  },
];

export default function Faq() {
  return (
    <section className="faq">
      <div className="faq-head">
        <p className="faq-kicker">
          <span className="faq-kicker-dot" aria-hidden="true" />
          Soalan Lazim
        </p>
        <h2 className="faq-title">Mencari maklumat lanjut?</h2>
      </div>

      <div className="faq-list">
        {FAQS.map((faq) => (
          <details key={faq.question} className="faq-item">
            <summary className="faq-question">
              {faq.question}
              <svg
                className="faq-chevron"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="faq-answer">
              <p>{faq.answer}</p>
              {faq.items && (
                <ul>
                  {faq.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
