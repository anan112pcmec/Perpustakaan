import { GoogleGenAI } from "@google/genai";

// Pastikan API key sudah diset di environment variable GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function fetchGeminiDeskripsi(kategori: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Buatkan kata-kata deskripsi sekitar 200 karakter untuk kategori buku "${kategori}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error saat generate konten:", error);
    return "Gagal memuat deskripsi.";
  }
}

(async () => {
  const deskripsi = await fetchGeminiDeskripsi("Fiksi");
  console.log("Deskripsi:", deskripsi);
})();
