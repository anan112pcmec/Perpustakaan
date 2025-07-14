import React from "react";

const WebSocketTester: React.FC = () => {
  const handleWebSocketFlood = () => {
    const jumlahKoneksi = 200;

    for (let i = 0; i < jumlahKoneksi; i++) {
      const socket = new WebSocket("ws://localhost:8080/ws");

      socket.onopen = () => {
        console.log(`✅ [${i}] Koneksi terbuka`);
        socket.send(`Halo ke-${i} dari Faizh!`);
      };

      socket.onmessage = (event) => {
        console.log(`📩 [${i}] Pesan:`, event.data);
      };

      socket.onerror = (e) => {
        console.error(`❌ [${i}] Error WebSocket:`, e);
      };

      socket.onclose = () => {
        console.log(`🔒 [${i}] Koneksi ditutup`);
      };
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleWebSocketFlood}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Tes Serangan WebSocket 🚨
      </button>
    </div>
  );
};

export default WebSocketTester;
