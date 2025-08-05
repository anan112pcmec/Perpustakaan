import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { setAlamat, setBergabung, setBukuBelumdikembalikan, setBukudikembalikan, setEmail, setKreditSkor, setNama, setPenggunaAktif, setPenggunaTidakAktif, setStatus, UserInspect } from "./UserInspectState";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { FaBook } from "react-icons/fa"; 
import { UnreadyFall } from "../AdminComponent/Unready.fallback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { Mousewheel } from "swiper/modules";
import { BarChart } from '@mui/x-charts/BarChart';

import Typography from '@mui/material/Typography';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { type AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';

const alphabetStock = [
  { date: "2024-01-01", volume: 1200, low: 135.5, high: 140.2 },
  { date: "2024-01-02", volume: 1500, low: 136.0, high: 141.8 },
  { date: "2024-01-03", volume: 1100, low: 134.7, high: 139.0 },
  { date: "2024-01-04", volume: 1300, low: 137.2, high: 142.5 },
  { date: "2024-01-05", volume: 1250, low: 138.1, high: 143.0 },
  { date: "2024-01-06", volume: 1400, low: 139.0, high: 144.3 },
  { date: "2024-01-07", volume: 1600, low: 140.5, high: 145.7 },
  { date: "2024-01-08", volume: 1550, low: 141.2, high: 146.1 },
  { date: "2024-01-09", volume: 1480, low: 140.7, high: 145.8 },
  { date: "2024-01-10", volume: 1420, low: 139.5, high: 144.9 },
  { date: "2024-01-11", volume: 1300, low: 138.2, high: 143.6 },
  { date: "2024-01-12", volume: 1255, low: 137.9, high: 143.2 },
  { date: "2024-01-13", volume: 1380, low: 139.8, high: 144.5 },
  { date: "2024-01-14", volume: 1450, low: 140.4, high: 145.0 },
  { date: "2024-01-15", volume: 1520, low: 141.0, high: 145.6 },
  { date: "2024-01-16", volume: 1600, low: 142.1, high: 146.3 },
  { date: "2024-01-17", volume: 1580, low: 141.8, high: 146.0 },
  { date: "2024-01-18", volume: 1490, low: 140.6, high: 145.2 },
  { date: "2024-01-19", volume: 1350, low: 139.0, high: 143.8 },
  { date: "2024-01-20", volume: 1280, low: 138.5, high: 143.1 },
  { date: "2024-01-21", volume: 1320, low: 139.3, high: 144.0 },
  { date: "2024-01-22", volume: 1400, low: 140.0, high: 144.8 },
  { date: "2024-01-23", volume: 1480, low: 140.7, high: 145.5 },
  { date: "2024-01-24", volume: 1540, low: 141.3, high: 146.0 },
  { date: "2024-01-25", volume: 1590, low: 142.0, high: 146.6 },
  { date: "2024-01-26", volume: 1620, low: 142.5, high: 147.0 },
  { date: "2024-01-27", volume: 1580, low: 142.1, high: 146.5 },
  { date: "2024-01-28", volume: 1500, low: 141.0, high: 145.7 },
  { date: "2024-01-29", volume: 1430, low: 140.3, high: 145.1 },
  { date: "2024-01-30", volume: 1350, low: 139.2, high: 144.0 },
  { date: "2024-01-31", volume: 1300, low: 138.7, high: 143.5 },
  { date: "2024-02-01", volume: 1280, low: 138.5, high: 143.4 },
  { date: "2024-02-02", volume: 1330, low: 139.0, high: 144.0 },
  { date: "2024-02-03", volume: 1380, low: 139.8, high: 144.6 },
  { date: "2024-02-04", volume: 1440, low: 140.5, high: 145.1 },
  { date: "2024-02-05", volume: 1500, low: 141.2, high: 145.7 },
  { date: "2024-02-06", volume: 1550, low: 141.9, high: 146.2 },
  { date: "2024-02-07", volume: 1580, low: 142.2, high: 146.5 },
  { date: "2024-02-08", volume: 1600, low: 142.4, high: 146.7 },
  { date: "2024-02-09", volume: 1590, low: 142.3, high: 146.6 },
  { date: "2024-02-10", volume: 1540, low: 141.8, high: 146.0 },
  { date: "2024-02-11", volume: 1480, low: 141.1, high: 145.4 },
  { date: "2024-02-12", volume: 1420, low: 140.5, high: 144.9 },
  { date: "2024-02-13", volume: 1360, low: 139.7, high: 144.2 },
  { date: "2024-02-14", volume: 1300, low: 139.0, high: 143.6 },
  { date: "2024-02-15", volume: 1250, low: 138.5, high: 143.0 },
  { date: "2024-02-16", volume: 1200, low: 137.8, high: 142.4 },
  { date: "2024-02-17", volume: 1180, low: 137.5, high: 142.0 },
  { date: "2024-02-18", volume: 1150, low: 137.2, high: 141.7 },
  { date: "2024-02-19", volume: 1120, low: 136.8, high: 141.2 },
  { date: "2024-02-20", volume: 1100, low: 136.5, high: 140.8 },
  { date: "2024-02-21", volume: 1080, low: 136.2, high: 140.5 },
  { date: "2024-02-22", volume: 1060, low: 135.9, high: 140.1 },
  { date: "2024-02-23", volume: 1050, low: 135.6, high: 139.8 },
  { date: "2024-02-24", volume: 1030, low: 135.3, high: 139.5 },
  { date: "2024-02-25", volume: 1010, low: 135.0, high: 139.2 },

  // 100 dataset tambahan:
  { date: "2024-02-26", volume: 1020, low: 134.8, high: 139.0 },
  { date: "2024-02-27", volume: 1040, low: 134.7, high: 138.9 },
  { date: "2024-02-28", volume: 1060, low: 134.9, high: 139.2 },
  { date: "2024-02-29", volume: 1080, low: 135.1, high: 139.4 },
  { date: "2024-03-01", volume: 1100, low: 135.4, high: 139.7 },
  { date: "2024-03-02", volume: 1120, low: 135.6, high: 140.0 },
  { date: "2024-03-03", volume: 1140, low: 135.8, high: 140.2 },
  { date: "2024-03-04", volume: 1160, low: 136.0, high: 140.5 },
  { date: "2024-03-05", volume: 1180, low: 136.2, high: 140.7 },
  { date: "2024-03-06", volume: 1200, low: 136.4, high: 140.9 },
  { date: "2024-03-07", volume: 1220, low: 136.6, high: 141.2 },
  { date: "2024-03-08", volume: 1240, low: 136.8, high: 141.4 },
  { date: "2024-03-09", volume: 1260, low: 137.0, high: 141.6 },
  { date: "2024-03-10", volume: 1280, low: 137.2, high: 141.8 },
  { date: "2024-03-11", volume: 1300, low: 137.4, high: 142.0 },
  { date: "2024-03-12", volume: 1320, low: 137.6, high: 142.3 },
  { date: "2024-03-13", volume: 1340, low: 137.8, high: 142.5 },
  { date: "2024-03-14", volume: 1360, low: 138.0, high: 142.7 },
  { date: "2024-03-15", volume: 1380, low: 138.2, high: 143.0 },
  { date: "2024-03-16", volume: 1400, low: 138.4, high: 143.2 },
  { date: "2024-03-17", volume: 1420, low: 138.6, high: 143.4 },
  { date: "2024-03-18", volume: 1440, low: 138.8, high: 143.6 },
  { date: "2024-03-19", volume: 1460, low: 139.0, high: 143.9 },
  { date: "2024-03-20", volume: 1480, low: 139.2, high: 144.1 },
  { date: "2024-03-21", volume: 1500, low: 139.4, high: 144.3 },
  { date: "2024-03-22", volume: 1520, low: 139.6, high: 144.5 },
  { date: "2024-03-23", volume: 1540, low: 139.8, high: 144.7 },
  { date: "2024-03-24", volume: 1560, low: 140.0, high: 145.0 },
  { date: "2024-03-25", volume: 1580, low: 140.2, high: 145.2 },
  { date: "2024-03-26", volume: 1600, low: 140.4, high: 145.4 },
  { date: "2024-03-27", volume: 1620, low: 140.6, high: 145.6 },
  { date: "2024-03-28", volume: 1640, low: 140.8, high: 145.8 },
  { date: "2024-03-29", volume: 1660, low: 141.0, high: 146.0 },
  { date: "2024-03-30", volume: 1680, low: 141.2, high: 146.2 },
  { date: "2024-03-31", volume: 1700, low: 141.4, high: 146.4 },
  { date: "2024-04-01", volume: 1720, low: 141.6, high: 146.6 },
  { date: "2024-04-02", volume: 1740, low: 141.8, high: 146.8 },
  { date: "2024-04-03", volume: 1760, low: 142.0, high: 147.0 },
  { date: "2024-04-04", volume: 1780, low: 142.2, high: 147.2 },
  { date: "2024-04-05", volume: 1800, low: 142.4, high: 147.4 },
  { date: "2024-04-06", volume: 1820, low: 142.6, high: 147.6 },
  { date: "2024-04-07", volume: 1840, low: 142.8, high: 147.8 },
  { date: "2024-04-08", volume: 1860, low: 143.0, high: 148.0 },
  { date: "2024-04-09", volume: 1880, low: 143.2, high: 148.2 },
  { date: "2024-04-10", volume: 1900, low: 143.4, high: 148.4 },
  { date: "2024-04-11", volume: 1920, low: 143.6, high: 148.6 },
  { date: "2024-04-12", volume: 1940, low: 143.8, high: 148.8 },
  { date: "2024-04-13", volume: 1960, low: 144.0, high: 149.0 },
  { date: "2024-04-14", volume: 1980, low: 144.2, high: 149.2 },
  { date: "2024-04-15", volume: 2000, low: 144.4, high: 149.4 },
  { date: "2024-04-16", volume: 2020, low: 144.6, high: 149.6 },
  { date: "2024-04-17", volume: 2040, low: 144.8, high: 149.8 },
  { date: "2024-04-18", volume: 2060, low: 145.0, high: 150.0 },
  { date: "2024-04-19", volume: 2080, low: 145.2, high: 150.2 },
  { date: "2024-04-20", volume: 2100, low: 145.4, high: 150.4 },
  { date: "2024-04-21", volume: 2120, low: 145.6, high: 150.6 },
  { date: "2024-04-22", volume: 2140, low: 145.8, high: 150.8 },
  { date: "2024-04-23", volume: 2160, low: 146.0, high: 151.0 },
  { date: "2024-04-24", volume: 2180, low: 146.2, high: 151.2 },
  { date: "2024-04-25", volume: 2200, low: 146.4, high: 151.4 },
  { date: "2024-04-26", volume: 2220, low: 146.6, high: 151.6 },
  { date: "2024-04-27", volume: 2240, low: 146.8, high: 151.8 },
  { date: "2024-04-28", volume: 2260, low: 147.0, high: 152.0 },
  { date: "2024-04-29", volume: 2280, low: 147.2, high: 152.2 },
  { date: "2024-04-30", volume: 2300, low: 147.4, high: 152.4 },
  { date: "2024-05-01", volume: 2320, low: 147.6, high: 152.6 },
  { date: "2024-05-02", volume: 2340, low: 147.8, high: 152.8 },
  { date: "2024-05-03", volume: 2360, low: 148.0, high: 153.0 },
  { date: "2024-05-04", volume: 2380, low: 148.2, high: 153.2 },
  { date: "2024-05-05", volume: 2400, low: 148.4, high: 153.4 },
  { date: "2024-05-06", volume: 2420, low: 148.6, high: 153.6 },
  { date: "2024-05-07", volume: 2440, low: 148.8, high: 153.8 },
  { date: "2024-05-08", volume: 2460, low: 149.0, high: 154.0 },
  { date: "2024-05-09", volume: 2480, low: 149.2, high: 154.2 },
  { date: "2024-05-10", volume: 2500, low: 149.4, high: 154.4 },
  { date: "2024-05-11", volume: 2520, low: 149.6, high: 154.6 },
  { date: "2024-05-12", volume: 2540, low: 149.8, high: 154.8 },
  { date: "2024-05-13", volume: 2560, low: 150.0, high: 155.0 },
  { date: "2024-05-14", volume: 2580, low: 150.2, high: 155.2 },
  { date: "2024-05-15", volume: 2600, low: 150.4, high: 155.4 },
  { date: "2024-05-16", volume: 2620, low: 150.6, high: 155.6 },
  { date: "2024-05-17", volume: 2640, low: 150.8, high: 155.8 },
  { date: "2024-05-18", volume: 2660, low: 151.0, high: 156.0 },
  { date: "2024-05-19", volume: 2680, low: 151.2, high: 156.2 },
  { date: "2024-05-20", volume: 2700, low: 151.4, high: 156.4 },
  { date: "2024-05-21", volume: 2720, low: 151.6, high: 156.6 },
  { date: "2024-05-22", volume: 2740, low: 151.8, high: 156.8 },
  { date: "2024-05-23", volume: 2760, low: 152.0, high: 157.0 },
  { date: "2024-05-24", volume: 2780, low: 152.2, high: 157.2 },
  { date: "2024-05-25", volume: 2800, low: 152.4, high: 157.4 },
  { date: "2024-05-26", volume: 2820, low: 152.6, high: 157.6 },
  { date: "2024-05-27", volume: 2840, low: 152.8, high: 157.8 },
  { date: "2024-05-28", volume: 2860, low: 153.0, high: 158.0 },
  { date: "2024-05-29", volume: 2880, low: 153.2, high: 158.2 },
  { date: "2024-05-30", volume: 2900, low: 153.4, high: 158.4 },
  { date: "2024-05-31", volume: 2920, low: 153.6, high: 158.6 },
  { date: "2024-06-01", volume: 2940, low: 153.8, high: 158.8 },
  { date: "2024-06-02", volume: 2960, low: 154.0, high: 159.0 },
  { date: "2024-06-03", volume: 2980, low: 154.2, high: 159.2 },
  { date: "2024-06-04", volume: 3000, low: 154.4, high: 159.4 },
  { date: "2024-06-05", volume: 3020, low: 154.6, high: 159.6 },
  { date: "2024-06-06", volume: 3040, low: 154.8, high: 159.8 },
  { date: "2024-06-07", volume: 3060, low: 155.0, high: 160.0 },
  { date: "2024-06-08", volume: 3080, low: 155.2, high: 160.2 },
  { date: "2024-06-09", volume: 3100, low: 155.4, high: 160.4 },
  { date: "2024-06-10", volume: 3120, low: 155.6, high: 160.6 },
  { date: "2024-06-11", volume: 3140, low: 155.8, high: 160.8 },
  { date: "2024-06-12", volume: 3160, low: 156.0, high: 161.0 },
  { date: "2024-06-13", volume: 3180, low: 156.2, high: 161.2 },
  { date: "2024-06-14", volume: 3200, low: 156.4, high: 161.4 },
  { date: "2024-06-15", volume: 3220, low: 156.6, high: 161.6 },
  { date: "2024-06-16", volume: 3240, low: 156.8, high: 161.8 },
  { date: "2024-06-17", volume: 3260, low: 157.0, high: 162.0 },
  { date: "2024-06-18", volume: 3280, low: 157.2, high: 162.2 },
  { date: "2024-06-19", volume: 3300, low: 157.4, high: 162.4 },
  { date: "2024-06-20", volume: 3320, low: 157.6, high: 162.6 },
  { date: "2024-06-21", volume: 3340, low: 157.8, high: 162.8 },
  { date: "2024-06-22", volume: 3360, low: 158.0, high: 163.0 },
  { date: "2024-06-23", volume: 3380, low: 158.2, high: 163.2 },
  { date: "2024-06-24", volume: 3400, low: 158.4, high: 163.4 },
  { date: "2024-06-25", volume: 3420, low: 158.6, high: 163.6 },
  { date: "2024-06-26", volume: 3440, low: 158.8, high: 163.8 },
  { date: "2024-06-27", volume: 3460, low: 159.0, high: 164.0 },
  { date: "2024-06-28", volume: 3480, low: 159.2, high: 164.2 },
  { date: "2024-06-29", volume: 3500, low: 159.4, high: 164.4 },
  { date: "2024-06-30", volume: 3520, low: 159.6, high: 164.6 }
];


const series = [
  {
    type: 'bar',
    yAxisId: 'volume',
    label: 'Volume',
    color: 'lightgray',
    data: alphabetStock.map((day) => day.volume),
    highlightScope: { highlight: 'item' },
  },
  {
    type: 'line',
    yAxisId: 'price',
    color: 'red',
    label: 'Low',
    data: alphabetStock.map((day) => day.low),
    highlightScope: { highlight: 'item' },
  },
  {
    type: 'line',
    yAxisId: 'price',
    color: 'green',
    label: 'High',
    data: alphabetStock.map((day) => day.high),
  },
] as AllSeriesType[];


export default function ManajemenAnggota() {
    
    const TableAnggota = useRef<HTMLDivElement>(null);
    const DetailAnggota = useRef<HTMLDivElement>(null);
    const RiwayatPeminjamanBukuAll = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    const [initialize, setinitialize] = useState(0);
    function Inisialisasi() {
        setinitialize((prev:number) => prev + 1);
    }
    const [ToastMessage, setMessage] = useState("");
    const Nama = useSelector((state:any) => state.userinspect.Nama);
    const Email = useSelector((state:any) => state.userinspect.Email);
    const Alamat = useSelector((state:any) => state.userinspect.Alamat);
    const Bergabung = useSelector((state:any) => state.userinspect.Bergabung);
    const Status = useSelector((state:any) => state.userinspect.Status);
    const KreditSkor = useSelector((state:any) => state.userinspect.KreditSkor);
    const Dikembalikan = useSelector((state:any) => state.userinspect.BukuDikembalikan);
    const BelumDikembalikan = useSelector((state:any) => state.userinspect.BukuBelumDikembalikan);
    const Aktif = useSelector((state: any) => state.userinspect.PenggunaAktif);
    const TidakAktif = useSelector((state:any) => state.userinspect.PenggunaTidakAktif);

    useEffect(()=>{
        console.log("nama_berubah");
    }, [Nama])

    useEffect(()=>{
        dispatch(masukanhalaman("Manajemen Anggota"));
        Inisialisasi()
    }, [])

    useEffect(()=>{
        if(ToastMessage == ""){

        } else{
        toast(`${ToastMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            progressClassName: "custom-progress"
            });
        }
    }, [ToastMessage])



    return (
        <div className="min-h-screen bg-white p-6" style={{ fontFamily: "Inter, sans-serif" }}>
            <ToastContainer/>
            <div className="grid grid-rows-2 gap-6 mx-auto">
                {/* Bagian Tabel dan Detail */}
                <div className="grid grid-cols-[70%_28%] gap-6">
                    {/* Daftar Anggota */}
                    <div
                        ref={TableAnggota}
                        className="bg-white border border-gray-200 rounded-md shadow p-5 max-h-[40-rem] min-h-[40rem]"
                    >
                    <div className="flex ml-2 space-x-2">
                       <div className="flex items-center p-3 space-x-3 rounded-2xl bg-gradient-to-r from-teal-100 via-green-100 to-slate-200 hover:from-teal-200 hover:via-green-200 hover:to-slate-200 shadow-lg transition-all duration-500 ease-in-out">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-300 via-green-400 to-teal-500 shadow-md"></div>
                        <div className="text-sm font-medium text-gray-700">
                            <span className="text-slate-600  mr-1">Aktif</span>
                            <span className="text-gray-800 font-bold ml-2">{Aktif}</span>
                        </div>
                        </div>

                        <div className="flex items-center p-3 space-x-3 bg-white rounded-2xl shadow-lg bg-slate-200">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 via-rose-600 to-red-700 shadow-md"></div>
                        <div className="text-sm font-medium text-gray-700">
                            <span className="text-slate-600 font-semibold  mr-1">Nonaktif</span>
                            <span className="text-gray-800 font-semibold ml-2">{TidakAktif}</span>
                        </div>
                        </div>
                        <div className=" w-full flex items-end justify-end">
                            <input
                                type="text"
                                placeholder="🔍 Cari nama / gmail..."
                                className="flex-1 sm:flex-none items-end justify-end px-4 py-2 rounded-xl bg-white/60 text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white/80 transition w-full sm:w-64 shadow-inner"
                                style={{ fontFamily: "Inter, sans-serif" }}
                                onChange={(e) => {
                                    const nilai = e.target.value.toLowerCase();
                                    const UserData = document.querySelectorAll(".User_data");

                                    if (UserData.length > 0) {
                                        UserData.forEach((user:any) => {
                                        const nama_dataset = user.getAttribute("data-nama")?.toLowerCase() || "";
                                        const gmail_dataset = user.getAttribute("data-gmail")?.toLowerCase() || "";

                                        // Tampilkan jika nama atau penulis mengandung nilai input
                                        if (nama_dataset.includes(nilai) || gmail_dataset.includes(nilai)) {
                                            user.style.display = ""; // tampilkan
                                        } else {
                                            user.style.display = "none"; // sembunyikan
                                        }
                                        });
                                    }
                                    }}
                             />
                        </div>
                    </div>
                    <hr className="mt-5" />
                        <table className="w-full table-auto border-collapse text-sm">
                            <thead>
                                <tr className=" border-gray-200 text-slate-600 text-left uppercase">
                                    <th className="px-4 py-3">Nama</th>
                                    <th className="px-4 py-3">Alamat</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">bergabung</th>
                                    <th className="px-4 py-3">Aktivitas</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 h-full">
                                {/* Rows with canvas placeholder for images */}
                                <TableUser initialize={initialize}/>
                            </tbody>
                        </table>
                    </div>

                    {/* Detail Anggota */}

                    <div
                    ref={DetailAnggota}
                    className="bg-white border border-gray-200 rounded-md shadow p-5"
                    >
                    <Swiper className="mySwiper">
                        <SwiperSlide>
                            <DetailedAnggota Nama={Nama} Email={Email} Alamat={Alamat} Bergabung={Bergabung} KreditSkor={KreditSkor} Status={Status} />
                        </SwiperSlide>
                        <SwiperSlide>

                        </SwiperSlide>
                    </Swiper>
                   </div>
                
                </div>

                {/* Bagian Riwayat & Statistik */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Riwayat */}
                    <div
                        ref={RiwayatPeminjamanBukuAll}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative"
                    >
                        

                        <div className="grid grid-cols-[40%_57%] mb-3 space-x-6 items-center">
                            <div>
                                <h2
                                className="text-2xl font-bold mb-4 text-neutral-800"
                                style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                Riwayat Peminjaman Buku
                                </h2>
                                <p className="text-xs text-gray-500 max-w-sm">
                                Lihat riwayat peminjaman buku yang pernah {Nama} lakukan. Pantau status dengan mudah dan cepat.
                                </p>
                            </div>
                            <div className="flex space-x-6 justify-end">
                                <div className="flex space-x-6 justify-end">
                                   <div className="relative group flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 rounded-3xl w-24 h-24 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faBook} className="text-white text-3xl" />
                                        <span className="text-white text-2xl font-semibold">{Dikembalikan}</span> {/* Ganti '3' dengan angka dinamis jika perlu */}
                                    </div>

                                    {/* Toast */}
                                    <div className="pointer-events-none absolute bottom-full mb-2 hidden w-max rounded-md bg-gray-800 px-3 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100">
                                        Dikembalikan
                                    </div>
                                    </div>

                                    <div className="relative group flex items-center justify-center bg-gradient-to-r from-pink-400 to-rose-700 rounded-3xl w-24 h-24 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faBook} className="text-white text-3xl" />
                                        <span className="text-white text-2xl font-semibold">{BelumDikembalikan}</span> {/* Ganti 7 dengan nilai dinamis jika diperlukan */}
                                    </div>

                                    {/* Toast */}
                                    <div className="pointer-events-none absolute bottom-full mb-2 hidden w-max rounded-md bg-gray-800 px-3 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100">
                                        Belum Dikembalikan
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-h-[30rem] min-h-[30rem]">
                            <RiwayatPeminjamanTimeline nama={Nama} email={Email} />  
                        </div>
                    
                    </div>
                    {/* Statistik + Visualisasi */}
                    <div className="grid grid-rows-[35%_65%] max-h-[50rem] gap-6">
                        {/* Statistik */}
                         <div
                            className="backdrop-blur-md bg-white/40 border border-white/30 shadow-lg rounded-2xl p-2 w-full transition-all duration-500 hover:bg-white/50
                            grid grid-cols-[20%_78%]"
                            >
                                <div>
                                <div className="grid grid-rows-3 h-full pt-6 pb-6 space-y-2">
                                     
                                       <button className="text-left w-full px-6 py-4 rounded-2xl text-slate-700 hover:bg-slate-200/50 transition-all duration-300 space-y-2">
                                            <h3 className="text-lg font-semibold text-slate-800">Aktivitas</h3>

                                            <div className="w-12 h-1 bg-slate-400 rounded-full"></div>

                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                adalah aktivitas yang dilakukan <span className="font-medium text-slate-700">{Nama}</span> dalam kurun waktu bulan ini.
                                            </p>
                                        </button>
                                </div>
                                <hr />
                                </div>
                                <div>
                                <div style={{ width: '100%' }}>
                                    <h2>Aktivitas</h2>
                                    <div>
                                    <ChartContainer
                                series={series}
                                height={200}
                                xAxis={[
                                    {
                                    id: 'date',
                                    data: alphabetStock.map((day) => new Date(day.date)),
                                    scaleType: 'band',
                                    valueFormatter: (value) => value.toLocaleDateString(),
                                    height: 40,
                                    },
                                ]}
                                yAxis={[
                                    { id: 'price', scaleType: 'linear', position: 'left', width: 50 },
                                    {
                                    id: 'volume',
                                    scaleType: 'linear',
                                    position: 'right',
                                    valueFormatter: (value) => `${(value / 1000000).toLocaleString()}M`,
                                    width: 55,
                                    },
                                ]}
                                >
                                <ChartsAxisHighlight x="line" />
                                <BarPlot style={{ fill: '#74f0b2ff', opacity: 0.7 }}  />        {/* Biru ungu, agak transparan */}
                                <LinePlot style={{ stroke: '#cd3257ff', strokeWidth: 2 }} />   {/* Merah terang garis */}
                                <LineHighlightPlot style={{ stroke: '#e3d72fff', strokeWidth: 3 }} /> {/* Kuning emas garis highlight */}
                                <ChartsXAxis
                                    label="Date"
                                    axisId="date"
                                    tickInterval={(_:any, index) => {
                                    return index % 30 === 0;
                                    }}
                                    tickLabelStyle={{
                                    fontSize: 10,
                                    fill: '#374151',   // Abu gelap untuk label
                                    }}
                                />
                                <ChartsYAxis
                                    label="Aktivitas"
                                    axisId="price"
                                    tickLabelStyle={{ fontSize: 10, fill: '#374151' }}
                                />
                                <ChartsYAxis
                                    label="Track Act"
                                    axisId="volume"
                                    tickLabelStyle={{ fontSize: 10, fill: '#374151' }}
                                />
                                <ChartsTooltip />
                                </ChartContainer>

                                    </div>
                                    </div>
                                </div>

                            </div>

                        {/* Visualisasi */}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

type TableUserProps = {
  initialize: number;
};

const TableUser = ({initialize}:TableUserProps) => {
    const dispatch = useDispatch();
    const { isPending, error, data } = useQuery({
    queryKey: ["AmbilDataUserAdmin", String(initialize)],
    queryFn: () =>
        fetch("http://localhost:8080/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tujuan: "AmbilDataUserAdmin",
        }),
        }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
        }),
    refetchInterval: 20000,
    });

   

    if (isPending) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    let Aktif = 0;
    let TidakAktif = 0;
    data.Hasil.map((data: any, _:any) =>{
        if(data.status == "Aktif"){
            Aktif++
        } else if(data.status == "Nonaktif") {
            TidakAktif++
        }
    })
    dispatch(setPenggunaAktif(Aktif))
    dispatch(setPenggunaTidakAktif(TidakAktif))

    
    return (
        <>
            {data.Hasil.map((data:any, _:any) => (
                <tr key={data.id} className="border-b border-gray-100 User_data" data-nama={data.nama} data-gmail={data.gmail}>
                    {/* Kolom: Profil dan Nama */}
                    <td className="px-4 py-4 flex gap-4 text-gray-800 font-semibold">
                    <canvas
                        width={36}
                        height={36}
                        className="rounded-full bg-gray-300"
                        style={{ display: "inline-block" }}
                        aria-label="Placeholder for author profile image"
                    />
                    <div className="flex flex-col text-sm font-normal text-gray-500">
                        <span className="font-semibold text-gray-900">{data.nama}</span>
                        <span>{data.email}</span>
                    </div>
                    </td>

                    {/* Kolom: Favorit dan Alamat */}
                    <td className="px-4 py-4 text-gray-700 font-semibold">
                    <div>{data.alamat}</div>
                    </td>

                    {/* Kolom: Status */}
                    <td className="px-4 py-4">
                    <span
                        className={`text-white text-xs font-bold px-3 py-1 rounded-full cursor-default select-none ${
                        data.status === "Aktif" ? "bg-lime-400" : "bg-gray-400"
                        }`}
                    >
                        {data.status}
                    </span>
                    </td>

                    {/* Akti: Tanggal Bergabung */}
                    <td className="px-4 py-4 text-gray-700 font-normal text-sm">
                    {data.bergabung}
                    </td>

                    {/* Kolom: Aksi */}
                   <td
                    className="px-4 py-4 text-gray-700 font-semibold cursor-pointer select-none hover:text-blue-600"
                    onClick={() => {
                        dispatch(setNama(data.nama));
                        dispatch(setEmail(data.email));
                        dispatch(setAlamat(data.alamat));
                        dispatch(setBergabung(data.bergabung));
                        dispatch(setStatus(data.status));
                        dispatch(setKreditSkor(data.kreditskor));
                    }}
                    >
                    Inspect
                    </td>

                </tr>
            ))}
        </>
    );
};

type DetailUser = {
  Nama: string;
  Email: string;
  Alamat: string;
  Status: string;
  Bergabung: string;
  KreditSkor: string;
};

const DetailedAnggota = ({
  Nama,
  Email,
  Alamat,
  Status,
  Bergabung,
  KreditSkor,
}: DetailUser) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 w-full h-full transition-shadow duration-300 hover:shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Detail Anggota
        </h2>

        <div className="text-sm text-gray-700 space-y-5">
            <div className="flex gap-4">
            <span className="font-medium w-24">Nama</span>
            <span className="text-gray-600">{Nama}</span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Email</span>
            <span className="text-gray-600">{Email}</span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Kredit Skor</span>
            <span className="text-gray-600">{KreditSkor}</span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Alamat</span>
            <span className="text-gray-600">{Alamat}</span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Status</span>
            <span className={`inline-block px-2 py-0.5 text-xs font-semibold text-white rounded-full ${
                Status === 'Aktif' ? 'bg-green-400' : 'bg-gray-400'
            }`}>
                {Status}
            </span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Bergabung</span>
            <span className="text-gray-600">{Bergabung}</span>
            </div>

            <p className="text-zinc-400">
            *Note Admin Tidak Boleh Mengubah Informasi User, 
            Pedoman User--
            </p>
        </div>

        {/* Badge Section */}
        <div className="mt-4 grid grid-cols-4 gap-3">
        {/* Badge 1 */}
        <div className="flex items-center justify-center p-3 rounded-md">
            <div className="flex flex-col items-center text-center gap-1">
            <i className="fas fa-book text-blue-500 text-lg"></i>
            <p className="text-xs text-gray-600">Buku Dipinjam</p>
            <p className="text-sm font-semibold text-gray-800">12</p>
            </div>
        </div>

        {/* Badge 2 */}
        <div className="flex items-center justify-center p-3 rounded-md">
            <div className="flex flex-col items-center text-center gap-1">
            <i className="fas fa-shopping-cart text-green-500 text-lg"></i>
            <p className="text-xs text-gray-600">Buku Dibeli</p>
            <p className="text-sm font-semibold text-gray-800">15</p>
            </div>
        </div>

        {/* Badge 3 */}
        <div className="flex items-center justify-center p-3 rounded-md">
            <div className="flex flex-col items-center text-center gap-1">
            <i className="fas fa-receipt text-yellow-500 text-lg"></i>
            <p className="text-xs text-gray-600">Total Transaksi</p>
            <p className="text-sm font-semibold text-gray-800">23</p>
            </div>
        </div>

        {/* Badge 4 */}
        <div className="flex items-center justify-center p-3  rounded-md">
            <div className="flex flex-col items-center text-center gap-1">
            <i className="fas fa-calendar-alt text-purple-500 text-lg"></i>
            <p className="text-xs text-gray-600">Lama Bergabung</p>
            <p className="text-sm font-semibold text-gray-800">2 Tahun</p>
            </div>
        </div>
    </div>
    </div>
  );
};

type PropsRiwayatPeminjaman = {
  nama: string;
  email: string;
};

function RiwayatPeminjamanTimeline({nama, email}:PropsRiwayatPeminjaman) {
    const dispatch = useDispatch();
    if(nama !== "" && email !== ""){
    const { isPending, error, data } = useQuery({
    queryKey: ["AmbilDataUserRiwayatPeminjaman", nama, email],
    queryFn: () =>
        fetch("http://localhost:8080/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tujuan: "AmbilDataUserRiwayatPeminjaman",
            nama: nama,
            email: email,

        }),
        }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
        }),
    refetchInterval: 20000,
    });

    if (isPending) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    if (data.Hasil == null) return <UnreadyFall type="notfound" Message={"User Ini Belum Memmiliki riwayat peminjaman"}/>;

    let Dikembalikan = 0;
    let BelumDikembalikan = 0;
    data.Hasil.map((data:any, _:number) =>{
        if (data.status == "Belum Dikembalikan") {
            BelumDikembalikan++
        } else {
            Dikembalikan++
        }
    })

    dispatch(setBukudikembalikan(Dikembalikan));
    dispatch(setBukuBelumdikembalikan(BelumDikembalikan));

    const getStatusColors = (status:string, tanggal:any) => {
        const today:any = new Date();
        const borrowedDate:any = new Date(Date.parse(tanggal));
        const diffDays = (today - borrowedDate) / (1000 * 60 * 60 * 24);

        if (status === "Belum Dikembalikan") {
        return {        // red-500
            borderColor: 'rgba(206, 58, 58, 0.3)', // red-500 border transparent
            gradienicon : " from-pink-400 to-rose-500",

        };
        } else if (diffDays > 30) {
        // Lama pinjaman, teal color
        return {  // teal-500
            borderColor: 'rgba(17, 101, 91, 0.3)',
            gradieicon : " from-ocean-400 to-sky-500",
        };
        } else {
        // Status normal (dikembalikan), green color
        return {               // green-500
            borderColor: 'rgba(34, 197, 94, 0.3)',
            gradienicon: "from-green-400 to-teal-500"
        };
        }
    };

    return (
        <div
            className=" mt-5 w-full bg-gradient-to-r from-slate-100/60 via-slate-200/70 to-gray-100/60
                        rounded-xl shadow-lg max-h-[32rem] min-h-[32rem] overflow-y-auto"
            style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            }}
        >
            <style>
            {`s
                div::-webkit-scrollbar {
                display: none;
                }
            `}
            </style>

            <VerticalTimeline lineColor="#e0e0e0" > {/* garis timeline warna abu-abu terang di kiri */}
        {data.Hasil.map((buku: any, i: number) => {
            const { borderColor, gradienicon } = getStatusColors(buku.status, buku.tanggal);

            return (
            <VerticalTimelineElement
                key={i}
                position="left"  // PENTING: paksa semua konten ke kanan
                className="vertical-timeline-element--work mr-5"
                contentStyle={{
                background: "rgba(255, 255, 255, 0.85)",  // transparan putih supaya ada efek glassmorphism
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${borderColor}`,
                color: "#0f172a",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                padding: "1.75rem",
                transition: "transform 0.2s ease",
                }}
                contentArrowStyle={{
                borderRight: `5px solid ${borderColor}`, // warna panah sesuaikan border
                }}
                date={buku.tanggal}
                dateClassName={`text-sm text-neutral-100 text-center ml-4 mr-4 bg-gradient-to-r ${gradienicon} rounded-xl p-2 font-semibold`}
                iconStyle={{
                color: ' #fff ',
                boxShadow: `0 0 0 5px ${borderColor}`,
                transition: "box-shadow 0.3s ease",
                }}
                icon={<FaBook />}
                iconClassName={`bg-gradient-to-r ${gradienicon}`}
            >
                <div className="ml-4 mr-4 transition duration-300 hover:scale-[1.05] cursor-pointer">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {buku.judul}
                </h3>
                <hr className="mb-3 border-slate-300" />
                <p className="text-sm text-slate-600 mb-1">
                    Kategori: <span className="font-medium text-slate-800">{buku.kategori}</span>
                </p>
                <p
                    className={`text-sm font-semibold ${
                    buku.status === "Belum Dikembalikan"
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                >
                    Status: {buku.status}
                </p>
                </div>
            </VerticalTimelineElement>
            );
        })}
        </VerticalTimeline>

        </div>
        );
    } else {
        return(
            <div className="relative p-4 sm:p-8 bg-gray-50 rounded-xl shadow-md max-h-[40rem] min-h-[40rem] overflow-y-auto"
                style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE/Edge
                }}
            >
               <div className="flex items-center justify-center w-full h-full">
                    <div className="grid grid-rows-2 items-center justify-center w-full h-64">
                   <div>
                     <i className="fa-brands fa-slack text-7xl text-slate-700"></i>
                    <br />
                   </div>
                    <span>Inspect Salah Satu User Maka Riwayat Peminjaman Akan Muncul Disini</span>
                </div>

                </div>

            </div>
        )
    }
  
}