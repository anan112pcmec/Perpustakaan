import React from "react";

const PostFloodTester: React.FC = () => {
  const handlePostFlood = () => {
    const jumlahRequest = 10000;
    const ajaxUrl = "https://anakindonesiaemas2045.com";
    const nonce = "20dfddfe5c";

    for (let i = 0; i < jumlahRequest; i++) {
      const formData = new FormData();
      formData.append("action", "POST"); // Ganti ini dengan nama action yang didaftarkan di PHP WordPress
      formData.append("nonce", nonce);
      formData.append("nama", `Faizh ${i}`);
      formData.append("pesan", `Tes POST ke-${i}`);

      fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.status === 429) {
            console.warn(`❌ [${i}] Ditolak: Rate Limit`);
          } else {
            console.log(`✅ [${i}] Berhasil:`, res.status);
          }
        })
        .catch((e) => {
          console.error(`🔥 [${i}] Gagal kirim POST:`, e);
        });
    }
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
