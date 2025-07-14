import React from "react";

const PostFloodTester: React.FC = () => {
  const handlePostFlood = () => {
    const jumlahRequest = 500;

    for (let i = 0; i < jumlahRequest; i++) {
      fetch("http://localhost:8080/endpoint.go", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: `Faizh ${i}`,
          pesan: `Tes POST ke-${i}`,
        }),
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
        Tes Serangan POST 🚀
      </button>
    </div>
  );
};

export default PostFloodTester;
