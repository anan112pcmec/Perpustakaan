import { useDispatch } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { Gauge, LineChart, PieChart } from "@mui/x-charts";

export default function PenjualanBuku() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(masukanhalaman("Penjualan Buku"));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-[20%_79%] h-[700px]">
      <div className="overflow-y-auto h-full p-4">
        <Swiper
          direction="vertical"
          slidesPerView={4}
          spaceBetween={10}
          mousewheel={true}
          modules={[Mousewheel]}
          className="h-full"
        >
          <SwiperSlide className="flex items-center justify-center rounded-xl  text-xl font-semibold">
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

          <SwiperSlide className="flex items-center justify-center rounded-xl text-xl font-semibold">
            <div className="bg-white/20 backdrop-blur-lg border border-slate-200/150 rounded-2xl p-6 shadow-md transition-shadow duration-300 w-full max-w-sm">
              <div className="flex items-center justify-between">
                {/* Informasi utama */}
                <div className="flex flex-col">
                  <p className="text-sm text-slate-600 font-medium mb-1">
                    Rating Buku
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

          <SwiperSlide className="flex items-center justify-center rounded-xl text-xl font-semibold">
            <div className="bg-white/20 backdrop-blur-lg border border-slate-200/150 rounded-2xl p-6 shadow-md transition-shadow duration-300 w-full max-w-sm">
              <div className="flex items-center justify-between">
                {/* Informasi utama */}
                <div className="flex flex-col">
                  <p className="text-sm text-slate-600 font-medium mb-1">
                    Buku Dalam Proses Ekspedisi
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
          <SwiperSlide className="flex items-center justify-center rounded-xl text-xl font-semibold">
            <div className="bg-white/20 backdrop-blur-lg border border-slate-200/150 rounded-2xl p-6 shadow-md transition-shadow duration-300 w-full max-w-sm">
              <div className="flex items-center justify-between">
                {/* Informasi utama */}
                <div className="flex flex-col">
                  <p className="text-sm text-slate-600 font-medium mb-1">
                    Rating Buku
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

          <SwiperSlide className="flex items-center justify-center rounded-xl text-xl font-semibold">
            <div className="bg-white/20 backdrop-blur-lg border border-slate-200/150 rounded-2xl p-6 shadow-md transition-shadow duration-300 w-full max-w-sm">
              <div className="flex items-center justify-between">
                {/* Informasi utama */}
                <div className="flex flex-col">
                  <p className="text-sm text-slate-600 font-medium mb-1">
                    Rating Buku
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
          
        </Swiper>
        
      </div>

      <div className="h-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={false}
        >
          <SwiperSlide>
            <div className=" bg-white rounded-xl shadow-md ">
              <ChartPenjualanSemua />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-6 bg-white rounded-xl shadow-md">
              Slide 2
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
interface PropsChartPenjualan {
  nama: string;
};

const ChartPenjualanSemua = () => {

   function getTodayFormattedDate(): string {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // bulan mulai dari 0
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

  const dataset = [
    { date: new Date(1990, 0, 1), fr: 28129, gb: 26189, dl: 25391 },
    { date: new Date(1991, 0, 1), fr: 28294.264, gb: 25792.014, dl: 26769.96 },
    { date: new Date(1992, 0, 1), fr: 28619.805, gb: 25790.186, dl: 27385.055 },
    { date: new Date(1993, 0, 1), fr: 28336.16, gb: 26349.342, dl: 27250.701 },
    { date: new Date(1994, 0, 1), fr: 28907.977, gb: 27277.543, dl: 28140.057 },
    { date: new Date(1995, 0, 1), fr: 29418.863, gb: 27861.215, dl: 28868.945 },
    { date: new Date(1996, 0, 1), fr: 29736.645, gb: 28472.248, dl: 29349.982 },
    { date: new Date(1997, 0, 1), fr: 30341.807, gb: 29259.764, dl: 30186.945 },
    { date: new Date(1998, 0, 1), fr: 31323.078, gb: 30077.385, dl: 31129.584 },
    { date: new Date(1999, 0, 1), fr: 32284.611, gb: 30932.537, dl: 32087.604 },
    { date: new Date(2000, 0, 1), fr: 33409.68, gb: 31946.037, dl: 33367.285 },
    { date: new Date(2001, 0, 1), fr: 33920.098, gb: 32660.441, dl: 34260.29 },
    { date: new Date(2002, 0, 1), fr: 34152.773, gb: 33271.3, dl: 34590.93 },
    { date: new Date(2003, 0, 1), fr: 34292.03, gb: 34232.426, dl: 34716.44 },
    { date: new Date(2004, 0, 1), fr: 35093.824, gb: 34865.78, dl: 35528.715 },
    { date: new Date(2005, 0, 1), fr: 35495.465, gb: 35623.625, dl: 36205.574 },
    { date: new Date(2006, 0, 1), fr: 36166.16, gb: 36214.07, dl: 38014.137 },
    { date: new Date(2007, 0, 1), fr: 36845.684, gb: 36816.676, dl: 39752.207 },
    { date: new Date(2008, 0, 1), fr: 36761.793, gb: 36264.79, dl: 40715.434 },
    { date: new Date(2009, 0, 1), fr: 35534.926, gb: 34402.36, dl: 38962.938 },
    { date: new Date(2010, 0, 1), fr: 36086.727, gb: 34754.473, dl: 41109.582 },
    { date: new Date(2011, 0, 1), fr: 36691, gb: 34971, dl: 43189 },
    { date: new Date(2012, 0, 1), fr: 36571, gb: 35185, dl: 43320 },
    { date: new Date(2013, 0, 1), fr: 36632, gb: 35618, dl: 43413 },
    { date: new Date(2014, 0, 1), fr: 36527, gb: 36436, dl: 43922 },
    { date: new Date(2015, 0, 1), fr: 36827, gb: 36941, dl: 44293 },
    { date: new Date(2016, 0, 1), fr: 37124, gb: 37334, dl: 44689 },
    { date: new Date(2017, 0, 1), fr: 37895, gb: 37782.83, dl: 45619.785 },
    { date: new Date(2018, 0, 1), fr: 38515.918, gb: 38058.086, dl: 46177.617 },
  ];


  return (
    <>
      <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl shadow-lg p-4 mt-4">
        <div className="flex">
          <span className="text-lg font-semibold justify-startw-[20%] ml-2">Penjualan Buku</span>
          <span className="text-lg font-semibold text-right w-[88%]">{getTodayFormattedDate()}</span>

        </div>
        <div className="grid grid-cols-4 space-x-4 h-[120px] ">
          <div
            className="grid grid-rows-3 mt-2 shadow-xl border border-gray-200 rounded-xl bg-white pb-4 pl-2 pt-2 h-[100px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="font-semibold text-gray-700 text-sm">
              Buku Terjual
            </div>
            <div className="mt-0.5 text-xl font-bold text-gray-900">
              118
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center space-x-1.5 text-green-600 font-medium">
                <i className="fa-solid fa-bullseye text-sm"></i>
                <span>+5%</span>
              </div>
              <div className="flex items-center space-x-1.5 text-blue-600 font-medium">
                <i className="fa-solid fa-calendar-days text-sm"></i>
                <span>+5%</span>
              </div>
            </div>
          </div>


          <div
            className="grid grid-rows-3 mt-2 shadow-xl p-2 border border-gray-200 rounded-xl bg-white pb-4 pl-2 pt-2 h-[100px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="font-semibold text-gray-700 text-sm">
              Buku Terjual
            </div>
            <div className="mt-0.5 text-xl font-bold text-gray-900">
              118
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center space-x-1.5 text-green-600 font-medium">
                <i className="fa-solid fa-bullseye text-sm"></i>
                <span>+5%</span>
              </div>
              <div className="flex items-center space-x-1.5 text-blue-600 font-medium">
                <i className="fa-solid fa-calendar-days text-sm"></i>
                <span>+5%</span>
              </div>
            </div>
          </div>

          <div
            className="grid grid-rows-3 mt-2 shadow-xl p-4 border border-gray-200 rounded-xl bg-white pb-4 pl-2 pt-2 h-[100px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="font-semibold text-gray-700 text-sm">
              Buku Terjual
            </div>
            <div className="mt-0.5 text-xl font-bold text-gray-900">
              118
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center space-x-1.5 text-green-600 font-medium">
                <i className="fa-solid fa-bullseye text-sm"></i>
                <span>+5%</span>
              </div>
              <div className="flex items-center space-x-1.5 text-blue-600 font-medium">
                <i className="fa-solid fa-calendar-days text-sm"></i>
                <span>+5%</span>
              </div>
            </div>
          </div>

          <div
            className="grid grid-rows-3 mt-2 shadow-xl p-4 border border-gray-200 rounded-xl bg-white pb-4 pl-2 pt-2 h-[100px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="font-semibold text-gray-700 text-sm">
              Buku Terjual
            </div>
            <div className="mt-0.5 text-xl font-bold text-gray-900">
              118
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center space-x-1.5 text-green-600 font-medium">
                <i className="fa-solid fa-bullseye text-sm"></i>
                <span>+5%</span>
              </div>
              <div className="flex items-center space-x-1.5 text-blue-600 font-medium">
                <i className="fa-solid fa-calendar-days text-sm"></i>
                <span>+5%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[70%_30%] space-x-4 ">
          <div className=" mt-2 shadow-xl p-4 border border-gray-200 rounded-xl bg-white">
            <div style={{ width: '100%' }}>
              <LineChart
                dataset={dataset}
                xAxis={[
                  {
                    id: 'Tanggal',
                    dataKey: 'date',
                    scaleType: 'time',
                    valueFormatter: (date) => date.getFullYear().toString(),
                  },
                ]}
                yAxis={[{ width: 70 }]}
                series={[
                  {
                    id: 'penjualan',
                    label: 'Jumlah Buku Terjual',
                    dataKey: 'fr',
                    stack: 'total',
                    area: true,
                    showMark: false,
                  },
                  {
                    id: 'pemasukan',
                    label: 'Pemasukan (Rp)',
                    dataKey: 'dl',
                    stack: 'total',
                    area: true,
                    showMark: false,
                  },
                  {
                    id: 'stokbaru',
                    label: 'Stok Buku Baru',
                    dataKey: 'gb',
                    stack: 'total',
                    area: true,
                    showMark: false,
                  },
                ]}
                experimentalFeatures={{ preferStrictDomainInLineCharts: true }}
                height={150}
              />
            </div>

          </div>
          <div className="mt-2 shadow-xl p-4 border border-gray-200 rounded-xl bg-white h-[230px]">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 45, label: 'Fiksi' },
                    { id: 1, value: 30, label: 'Non-Fiksi' },
                    { id: 2, value: 15, label: 'Komik' },
                    { id: 3, value: 10, label: 'Ensiklopedia' },
                  ],
                  innerRadius: 30,
                  outerRadius: 70,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 225,
                  cx: 100,
                  cy: 100,
                },
              ]}
            />


          </div>
        </div>

        <div className="mt-2 grid grid-cols-3">

          
          <div className="grid grid-cols-[30%_70%] items-center h-[219px] pb-2 gap-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">

            <div className="flex items-center justify-center h-full">
              <Gauge width={80} height={80} value={60} className="neutral-100" />
            </div>

            <div style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-sm text-gray-700 pb-4">
              <div className="text-base font-semibold text-gray-800 mb-2">Penjualan Buku</div>

              <div className="flex justify-between mr-5">
                <span><i className="fa-solid fa-book-open mr-2 text-blue-500"></i>Buku Terjual:</span>
                <span className="font-medium text-green-600">90</span>
              </div>

              <div className="flex justify-between mr-5">
                <span><i className="fa-solid fa-bullseye mr-2 text-gray-500"></i>Target Penjualan:</span>
                <span className="text-gray-600">150</span>
              </div>

              <div className="flex justify-between mr-5">
                <span><i className="fa-solid fa-boxes-stacked mr-2 text-red-500"></i>Stok Tersisa:</span>
                <span className="text-red-500 font-medium">40</span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1 mt-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(90 / 150) * 100}%` }}></div>
              </div>

              <div className="text-xs text-gray-500 italic">
                {(90 / 150 * 100).toFixed(1)}% dari target tercapai
              </div>

              <div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${90 >= 150 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {90 >= 150 ? 'Target Tercapai' : 'Dalam Progres'}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>

  )
}
