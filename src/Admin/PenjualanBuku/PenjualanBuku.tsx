import { useDispatch } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

export default function PenjualanBuku() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(masukanhalaman("Penjualan Buku"));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-[20%_79%] space-x-4 p-4 h-[500px]">
      <div className="overflow-y-auto h-full">
        <Swiper
          direction="vertical"
          slidesPerView={3}
          spaceBetween={30}
          mousewheel={true}
          modules={[Mousewheel]}
          className="h-full"
        >
          <SwiperSlide className="flex items-center justify-center rounded-xl shadow-md text-xl font-semibold">
            <div className="bg-white/20 backdrop-blur-lg border border-slate-200/150 rounded-2xl p-6 shadow-md transition-shadow duration-300 w-full max-w-sm">
              <div className="flex items-center justify-between">
                {/* Informasi utama */}
                <div className="flex flex-col">
                  <p className="text-sm text-slate-600 font-medium mb-1">
                    Total Buku Terjual
                  </p>
                  <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                    100
                  </h2>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs text-slate-500">Hari ini:</span>
                    <span className="text-xs font-semibold text-emerald-500">
                      +5%
                    </span>
                  </div>
                </div>

                {/* Ikon */}
                <div className="bg-slate-700/90 p-4 rounded-xl shadow-inner flex items-center justify-center">
                  <i
                    className="fa-solid fa-book text-white text-2xl"
                    aria-label="Icon Buku"
                  ></i>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center bg-green-200 rounded-xl shadow-md text-xl font-semibold">
            Slide 2
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-pink-200 rounded-xl shadow-md text-xl font-semibold">
            Slide 3
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-purple-200 rounded-xl shadow-md text-xl font-semibold">
            Slide 4
          </SwiperSlide>
        </Swiper>
      </div>

      <div>{/* Konten kolom kedua, bisa diisi nanti */}</div>
    </div>
  );
}
