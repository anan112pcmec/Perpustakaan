import { useDispatch, useSelector } from "react-redux";
import { updatenilai } from "./DetailBukuState";
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
  } = useSelector((state: any) => state.detailbuku);

  const isVisible = Judul && Penulis && Bahasa;

  useEffect(() => {
    if (isVisible) {
      animate("#backgroudndetail", {
        opacity: [0, 1],
        scale: [0.9, 1],
        easing: "easeOutQuint",
        duration: 400,
      });
      animate("#detailedbarang", {
        opacity: [0, 1],
        scale: [0.95, 1],
        easing: "easeOutQuint",
        duration: 400,
        delay: 100,
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      id="backgroudndetail"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        id="detailedbarang"
        className="relative bg-white/10 border border-white/30 rounded-3xl shadow-2xl max-w-md w-[400px] p-4 backdrop-blur-lg"
      >
        {/* Tombol Close */}
        <button
          className="absolute top-3 right-3 text-white/70 hover:text-white text-xl"
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

        <div className="grid grid-cols-[40%_60%] h-[240px] rounded-2xl overflow-hidden">
          {/* Gambar Buku */}
          <div className="bg-white/10 p-2 flex items-center justify-center">
            <img
              src={Gambar}
              alt={Judul ?? "Gambar Buku"}
              className="object-contain h-full w-full rounded-xl shadow-md"
            />
          </div>

          {/* Detail Buku */}
          <div className="p-4 flex flex-col justify-between text-white">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90 line-clamp-2">{Judul}</h3>
              <p className="text-sm text-white/70">Penulis: {Penulis}</p>
              <p className="text-xs text-white/60 italic">Genre: {Genre}</p>
              <p className="text-xs text-white/50">Bahasa: {Bahasa ?? "ID"}</p>
              <p className="text-xs text-white/50">Tahun: {Tahun}</p>
              <p className="text-xs text-white/50">Rating: {Rating ?? "Belum Dinilai"}</p>
            </div>
            <p className="text-[10px] text-white/30 mt-4">Katalog Buku Digital</p>
          </div>
        </div>
      </div>
    </div>
  );
};
