import { useDispatch, useSelector } from "react-redux";
import { updatenilai, type DetilBukuState } from "./DetailBukuState";
import { useEffect } from "react";
import { animate } from "animejs";

export const Detailbuku = () => {
  const dispatch = useDispatch();
  const {
    Judul,
    Penulis,
    Genre,
    Bahasa,
    Tahun,
    Rating,
    Harga,
    Gambar,
    Kategori,
    Jenis,
    Diskon,
    Penerbit,
    ISBN,
    Deskripsi,
  }: DetilBukuState = useSelector((state: any) => state.detailbuku);

  const isVisible = Judul && Penulis;

  useEffect(() => {
    if (isVisible) {
      animate("#backgroundOverlay", { opacity: [0, 1], duration: 400 });
      animate("#detailCard", { opacity: [0, 1], y: [20, 0], duration: 400 });

      const localKey = "PerpustakaanFaiz_BukuBaruBaruIni";

      const existing = JSON.parse(localStorage.getItem(localKey) || "[]");

      const sudahAda = existing.some((buku: DetilBukuState ) => buku.Judul === Judul);
      if (sudahAda) return; 

      const bukuBaru = {
        Judul,
        Penulis,
        Genre,
        Bahasa,
        Tahun,
        Rating,
        Harga,
        Gambar,
        Kategori,
        Jenis,
        Diskon,
        Penerbit,
        ISBN,
        Deskripsi,
      };

      if (existing.length >= 4) {
        existing.shift(); 
      }

      existing.push(bukuBaru);

      localStorage.setItem(localKey, JSON.stringify(existing));

      console.log(localStorage.getItem(localKey))
    }

  }, [isVisible]);

  if (!isVisible) return null;

  return (
   <div
  id="backgroundOverlay"
  className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
>
  <div
    id="detailCard"
    className="relative w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden"
  >
    {/* Tombol Close */}
    <button
      className="absolute top-4 right-4 text-neutral-300 hover:text-white text-2xl"
      onClick={() => {
        dispatch(
          updatenilai({
            Judul: null,
            Gambar: "",
            Penulis: null,
            Genre: null,
            Bahasa: null,
            Tahun: null,
            Rating: null,
            Harga: null,
          })
        );
      }}
    >
      &times;
    </button>

    {/* Gambar */}
    <div className="flex items-center justify-center p-4">
      <img
        src={Gambar}
        alt={Judul ?? "Gambar Buku"}
        className="object-contain h-full w-full rounded-md"
      />
    </div>

    {/* Detail */}
    <div className="flex flex-col justify-between p-6 space-y-4 text-neutral-200">
      <div className="space-x-2" style={{ fontFamily: "Inter, sans-serif" }}>
        <h2 className="text-2xl font-bold mb-2">{Judul}</h2>
        <p className="text-sm mb-1">Penulis: {Penulis}</p>
        {Genre && <p className="text-sm mt-2">Genre: {Genre}</p>}
        {Bahasa && <p className="text-sm mt-2">Bahasa: {Bahasa}</p>}
        {Tahun && <p className="text-sm mt-2">Tahun: {Tahun}</p>}
        {ISBN && <p className="text-sm mt-2">ISBN: {ISBN}</p>}
        {Penerbit && <p className="text-sm mt-2">Penerbit: {Penerbit}</p>}
        {Rating && <p className="text-sm mt-2">Rating: {Rating}</p>}
        <p className="text-sm mt-2 line-clamp-4">
          {Deskripsi ?? "Tidak ada deskripsi"}
        </p>
      </div>

      <div className="mt-4">
        {Harga && (
          <p className="text-lg font-semibold">
            Harga:
            {Diskon ? (
              <>
                <span className="line-through text-neutral-400 ml-2">Rp {Harga}</span>
                <span className="text-red-500 ml-2">Rp {Diskon}</span>
              </>
            ) : (
              <span className="ml-2">Rp {Harga}</span>
            )}
          </p>
        )}
      </div>

      {/* Tombol Aksi */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-white/10 backdrop-blur py-2 rounded-md hover:bg-white/20 border border-white/20">
          Tambahkan ke Keranjang
        </button>
        <button
          onClick={() =>
            dispatch(
              updatenilai({
                Judul: null,
                Gambar: "",
                Penulis: null,
                Genre: null,
                Bahasa: null,
                Tahun: null,
                Rating: null,
                Harga: null,
              })
            )
          }
          className="flex-1 bg-white/10 backdrop-blur py-2 rounded-md hover:bg-white/20 border border-white/20"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</div>

  );
};
