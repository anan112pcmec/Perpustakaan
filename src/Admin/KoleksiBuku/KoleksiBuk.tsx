import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";
import {
  useQuery,
} from '@tanstack/react-query'
import { Swiper, SwiperSlide } from "swiper/react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { animate } from "animejs";




export default function KoleksiBukuAdmin() {
    const dispatch = useDispatch();
    const TableBuku = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(masukanhalaman("Koleksi Buku"));
    }, []);

    return (
        <>
            <div ref={TableBuku} className="overflow-x-auto bg-white shadow rounded-lg p-6"
            style={{ fontFamily: "Inter, sans-serif" }}>
                <BukuTable/>
            </div>
            <MasukanBukuBaru/>
            
        </>
    );
}

function BukuTable() {  
  const [dataBuku, setDataBuku] = useState({
    Bahasa: "",
    CreatedAt: "",
    Deskripsi: "",
    Gambar: "",
    Harga: "",
    ISBN: "",
    Jenis: "",
    Judul: "",
    Kategori: "",
    Penerbit: "",
    Penulis: "",
    Stok: "",
    Tahun: "",
  });

  const [bukuChild, setBukuChild] = useState([]);
  const [commit, setcommit] = useState(1);


  const InputBuku = useRef<{
    Bahasa: HTMLInputElement | null;
    CreatedAt: HTMLInputElement | null;
    Deskripsi: HTMLTextAreaElement | null;
    Gambar: HTMLInputElement | null;
    Harga: HTMLInputElement | null;
    ISBN: HTMLSpanElement | null;
    Jenis: HTMLInputElement | null;
    Judul: HTMLInputElement | null;
    Kategori: HTMLInputElement | null;
    Penerbit: HTMLInputElement | null;
    Penulis: HTMLInputElement | null;
    Stok: HTMLInputElement | null;
    Tahun: HTMLInputElement | null;
  }>({
    Bahasa: null,
    CreatedAt: null,
    Deskripsi: null,
    Gambar: null,
    Harga: null,
    ISBN: null,
    Jenis: null,
    Judul: null,
    Kategori: null,
    Penerbit: null,
    Penulis: null,
    Stok: null,
    Tahun: null,
  });

  useEffect(()=>{
    console.log("databuku diganti")
     animate("#ElemenEdit", {
      opacity: [0, 1],
      duration: 400,
      easing: "easeOutSine"
    });

    animate("#ElemenStok", {
      opacity: [0, 1],
      duration: 400,
      easing: "easeOutSine"
    });

  }, [commit])

  
  const [dicari, setDicari] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [ToastMessage, setMessage] = useState("");

  const HapusChildHandler = useCallback((dihapus: any, ISBNnya: any) => {
    console.log("📌 Target yang akan dihapus:", dihapus);
    console.log("🔗 Dengan ISBN induk:", ISBNnya);

    let isbndikirim

    if (typeof ISBNnya == "string"){
      isbndikirim = String(ISBNnya)
    }

    fetch("http://localhost:8080/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tujuan: "Hapus Child Buku",
        ISBN: `${ISBNnya}`,
        id: `${dihapus}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Atau .json() jika server mengembalikan JSON
      })
      .then((data) => {
        console.log("✅ Berhasil Mendapat Jawaban:", data);
        setMessage(data);
      })
      .catch((err) => {
        console.error("❌ Terjadi Kesalahan:", err);
      });
  }, []);


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

  const dataBukuRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const BukuSlide = useRef<HTMLDivElement>(null)
  const [previewGambar, setPreviewGambar] = useState<string>(
    dataBuku.Gambar && dataBuku.Gambar.trim() !== ""
      ? dataBuku.Gambar
      : "https://via.placeholder.com/300x400?text=No+Image"
  );
  const [gambarbukuedit, setgamberbukuedit] = useState<File | null>(null);

  function TampilkanBukuDIcari(): number{
    let countnya = 0
    dataBukuRefs.current.forEach((row) => {
      if (!row) return;

      const nama = row.getAttribute("data-nama")?.toLowerCase() || "";
      const cari = dicari.trim().toLowerCase().replace(/,/g, "");

      // Jika kosong atau hanya koma, tampilkan semua
      if (cari === "") {
        row.style.display = "";
      } else {
        // Jika mengandung kata kunci, tampilkan. Jika tidak, sembunyikan
        if (nama.includes(cari)) {
          row.style.display = "";
          countnya++
        } else {
          row.style.display = "none";
        }
      }
    });

    if (countnya == 0){
       dataBukuRefs.current.forEach((row) => {
        if (!row) return;

        const penulis = row.getAttribute("data-penulis")?.toLowerCase() || "";
        const cari = dicari.trim().toLowerCase().replace(/,/g, "");

        // Jika kosong atau hanya koma, tampilkan semua
        if (cari === "") {
          row.style.display = "";
        } else {
          // Jika mengandung kata kunci, tampilkan. Jika tidak, sembunyikan
          if (penulis.includes(cari)) {
            row.style.display = "";
            countnya++
          } else {
            row.style.display = "none";
          }
        }
      });
    }

    if (countnya == 0){
      dataBukuRefs.current.forEach((row) => {
        if (!row) return;

        const jenis = row.getAttribute("data-jenis")?.toLowerCase() || "";
        const cari = dicari.trim().toLowerCase().replace(/,/g, "");

        // Jika kosong atau hanya koma, tampilkan semua
        if (cari === "") {
          row.style.display = "";
        } else {
          // Jika mengandung kata kunci, tampilkan. Jika tidak, sembunyikan
          if (jenis.includes(cari)) {
            row.style.display = "";
            countnya++
          } else {
            row.style.display = "none";
          }
        }
      });
    }

    return (countnya)
  }

  async function CommitEditBuku(Bahasa:any, Deskripsi:any, Gambar:any, Harga:any, ISBN:any, Jenis:any, Judul:any,  Kategori:any, Penerbit:any, Penulis:any, Stok:any, Tahun:any){
  setMessage("Menghubungi Database");
  console.log(Bahasa, Deskripsi, Gambar, Harga, ISBN, Jenis, Judul, Kategori, Penerbit, Stok, Tahun);

  // Buat payload sesuai struct Go
  const payload = {
    tujuan: "CommitEditBuku", // asumsi kamu sedang mengedit
    judul: Judul,
    jenis: Jenis,
    harga: Harga,
    penulis: Penulis,
    penerbit: Penerbit,
    stok: Stok,
    tahun: Tahun,
    ISBN: ISBN,
    kategori: Kategori,
    bahasa: Bahasa,
    deskripsi: Deskripsi,
    gambarBase64: Gambar,
  };

  // Kirim fetch ke backend (ubah URL ke endpoint-mu)
  try {
    const response = await fetch("http://localhost:8080/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setMessage("Gagal mengirim data edit buku");
      throw new Error("Gagal mengirim data edit buku");
    }

    const result = await response.json();
    console.log("Berhasil edit:", result);
    setMessage(result.Hasil);
  } catch (error) {
    console.error("Error saat mengirim data:", error);
  }
  }

  useEffect(() => {
    let hasilDitampilkan:number = TampilkanBukuDIcari()
    console.log(hasilDitampilkan);
  }, [dicari]);

  const { isPending, error, data } = useQuery({
    queryKey: ["AmbilDataBukuAdmin"],
    queryFn: () =>
      fetch("http://localhost:8080/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tujuan: "AmbilDataBuku",
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const hasil = data.Hasil;
  const groupedData: { [key: string]: any[] } = {};
  const groupSize = 1000;

  for (let i = 0; i < hasil.length; i += groupSize) {
    const groupKey = `group${Math.floor(i / groupSize) + 1}`;
    groupedData[groupKey] = hasil.slice(i, i + groupSize);
  }
  const currentGroupKey = `group${currentPage}`;

  const TableRinci = ({ ISBN, Jenis, Judul }: any) => {

    const [currentPageDetail, setCurrentPageDetail] = useState(1);
    const itemsPerPageDetail = 8;

    const indexOfLastItem = currentPageDetail * itemsPerPageDetail;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageDetail;
    const currentItems = bukuChild.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(bukuChild.length / itemsPerPageDetail);

    console.log(totalPages)
    const goToPage = (pageNumber:number) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPageDetail(pageNumber);
      }
    };
    
    const isValidParams =
      ISBN?.trim() !== '' && Jenis?.trim() !== '' && Judul?.trim() !== '';

    const {
      data,
      error,
      isPending,
      isError,
    } = useQuery({
      queryKey: ['AmbilDataBukuDetailed', ISBN, Jenis, Judul],
      enabled: isValidParams, // ⬅️ hanya fetch jika valid
      queryFn: async () => {
        const response = await fetch('http://localhost:8080/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tujuan: 'AmbilDataBukuRinci',
            ISBN: `${ISBN}`,
            jenis: `${Jenis}`,
            judul: `${Judul}`
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      },
    });

    if (!isValidParams) {
      return <div>Masukkan ISBN, Jenis, dan Judul yang valid.</div>;
    }

    if (isPending) {
      return <div>Loading data rinci...</div>;
    }

    if (isError) {
      return <div>Error: {error.message}</div>;
    }

    if(data.Hasil){
      setBukuChild(data.Hasil);
    }

    const bukuTersedia = () : number => {
      let Tersedia:number = 0
      bukuChild.map((buku:any, _:number) => {
        if(buku.status == "Ready"){
          Tersedia++
        }
      })

      return Tersedia
    }

    const bukuDipinjam = () : number => {
      let Dipinjam:number = 0
      bukuChild.map((buku:any,  _:number) => {
        if(buku.status == "Dipinjam"){
          Dipinjam++
        }
      })

      return Dipinjam
    }

    const bukuTerjual = () : number => {
      let Terjual:number = 0
      bukuChild.map((buku:any,  _:number) => {
        if(buku.Terjual == "Terjual"){
          Terjual
        }
      })

      return Terjual
    }

    console.log(bukuChild);

    return (
      <>
      <div className="mt-2 ml-5 bg-white/50 border border-white/30 rounded-2xl shadow-lg p-6 backdrop-blur-lg space-y-4 text-gray-700">
       <div className="grid grid-cols-[40%_20%_20%_20%] gap-2 mr-4">
          {/* Box 1: Judul */}
          <div className="boxnya flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-2">Informasi Stok</h2>
            <p className="text-sm text-gray-600">Jumlah buku yang tersedia, dijual, dan sedang dipinjam.</p>
          </div>

          {/* Box 2: Buku Tersedia */}
          <div className="boxnya flex flex-col items-center justify-center bg-green-100 rounded-xl p-4">
            <span className="text-sm text-gray-500">Tersedia</span>
            <span className="text-2xl font-bold text-green-700">{bukuTersedia()}</span>
          </div>

          {/* Box 3: Buku Dijual */}
          <div className="boxnya flex flex-col items-center justify-center bg-blue-100 rounded-xl p-4">
            <span className="text-sm text-gray-500">Dijual</span>
            <span className="text-2xl font-bold text-blue-700">{bukuDipinjam()}</span>
          </div>

          {/* Box 4: Buku Dipinjam */}
          <div className="boxnya flex flex-col items-center justify-center bg-red-100 rounded-xl p-4">
            <span className="text-sm text-gray-500">Dipinjam</span>
            <span className="text-2xl font-bold text-red-700">{bukuTerjual()}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 ml-5 flex items-center justify-center bg-white/50 border border-white/30 rounded-2xl shadow-lg p-2 backdrop-blur-lg space-y-4 text-gray-700">
          <table className=" table-auto border-collapse text-xs text-gray-700 ">
              <thead className="sticky backdrop-blur-md bg-white/60 z-10">
                <tr className="text-center uppercase">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Kode Unik</th>
                  <th className="px-4 py-3">Judul</th>
                  <th className="px-4 py-3">Genre</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto max-h-[30rem] table-auto">
                {currentItems.map((buku:any, index) => (
                  
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2">{buku.nomor}</td>
                    <td className="px-4 py-2">{buku.id}</td>
                    <td className="px-4 py-2">{buku.judul}</td>
                    <td className="px-4 py-2">{buku.kategori}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-white text-xs font-bold px-3 py-1 rounded-full cursor-default select-none ${
                          buku.status === "Ready" ? "bg-lime-400" : "bg-gray-400"
                        }`}
                      >
                        {buku.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={()=>{HapusChildHandler(buku.id, dataBuku.ISBN)}}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>

              <div className="w-full flex items-center justify-center space-x-4">
                <button
                  onClick={() => goToPage(currentPageDetail - 1)}
                  disabled={currentPageDetail === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                 <button
                    onClick={() => goToPage(currentPageDetail + 1)}
                    disabled={currentPageDetail === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
              </div>
              </table>
      </div>
      </>
      
    );
  };

  return (
    <>
      <div 
      className="max-h-[45rem] min-h-[45rem] overflow-y-auto"
      style={{
        scrollbarWidth: "none",            // Firefox
        msOverflowStyle: "none",           // IE/Edge
      }}>
        <ToastContainer/>
        <div className="flex items-end justify-end mb-5 space-x-3 bg-white/20 backdrop-blur-md p-2 rounded-xl shadow border border-white/30">
            <div className="flex justify-end items-end w-32">
                <input
                  type="text"
                  placeholder="Cari judul, penulis..."
                  onChange={(e) => {
                    setDicari(e.target.value);
                  }}
                  className="justify-end px-4 py-2 rounded-lg bg-white/40 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 text-sm w-64"
                />
                
            </div>
        </div>
        <div className="grid grid-cols-[60%_38%] gap-6 p-4">
          {/* Kiri: Tabel */}
          <div
            className="block overflow-y-auto max-h-[39rem] rounded-2xl shadow-lg backdrop-blur-md bg-white/50 border border-white/30"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            <style>
              {`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <table className="w-full table-auto border-collapse text-sm text-gray-700 ">
              <thead className="sticky top-0 backdrop-blur-md bg-white/60 z-10">
                <tr className="border-b border-gray-200 text-gray-500 text-left uppercase">
                  <th className="px-4 py-3">Nomor</th>
                  <th className="px-4 py-3">Gambar</th>
                  <th className="px-4 py-3">Judul Buku</th>
                  <th className="px-4 py-3">Genre</th>
                  <th className="px-4 py-3">Tanggal Buat</th>
                  <th className="px-4 py-3">Last Update</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {groupedData[currentGroupKey].map((buku: any, i: number) => (
                 <tr
  key={i + 1}
  ref={(el) => {
    if (dataBukuRefs.current[i]) dataBukuRefs.current[i] = el;
  }}
  data-nama={buku.Judul}
  data-penulis={buku.Penulis}
  data-jenis={buku.Jenis}
  className="transition-all duration-200 hover:bg-white/40 bg-white/20 backdrop-blur-md border-b border-white/20 text-slate-700"
  style={{ fontFamily: "'Inter', sans-serif" }}
>
  {/* Kolom Nomor & Penulis */}
  <td className="px-4 py-4 font-semibold align-top">
    {i + 1}
    <div className="text-xs text-slate-500 mt-1">{buku.Penulis}</div>
  </td>

  {/* Kolom Gambar */}
  <td className="px-4 py-4">
    <img
      src={buku.Gambar}
      alt="Cover Buku"
      className="w-20 h-20 object-contain rounded-lg shadow-sm border border-white/30"
    />
  </td>

  {/* Kolom Judul & ISBN */}
  <td className="px-4 py-4 align-top">
    <div className="font-semibold text-slate-800">{buku.Judul}</div>
    <div className="text-xs text-slate-500 mt-1">ISBN: {buku.ISBN}</div>
  </td>

  {/* Kolom Jenis */}
  <td className="px-4 py-4 text-sm text-slate-700">{buku.Jenis}</td>

  {/* Kolom CreatedAt */}
  <td className="px-4 py-4 text-sm text-slate-600">
    {new Date(buku.CreatedAt).toLocaleDateString()}
  </td>

  {/* Kolom UpdatedAt */}
  <td className="px-4 py-4 text-sm text-slate-600">
    {new Date(buku.UpdatedAt).toLocaleDateString()}
  </td>

  {/* Kolom Status */}
  <td className="px-4 py-4">
    <span
      className={`text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition ${
        i % 2 === 0 ? "bg-yellow-500" : "bg-green-500"
      }`}
    >
      {i % 2 === 0 ? "Dipinjam" : "Tersedia"}
    </span>
  </td>

  {/* Kolom Aksi */}
  <td className="px-4 py-4">
    <button
      onClick={() => {
        setDataBuku(buku);
        setPreviewGambar(buku.Gambar);
        setgamberbukuedit(null);
        setcommit((prev) => prev + 1);
        console.log("Data buku diset:", buku);
      }}
      className="text-blue-600 font-semibold text-sm hover:underline hover:text-blue-700 transition-all"
    >
      Detail
    </button>
  </td>
</tr>

                ))}
              </tbody>
            </table>
          </div>

          {/* Kanan: Card Detail */}
          <div ref={BukuSlide} className="max-h-[39rem] min-h-[39rem] overflow-y-auto">
            <Swiper className="mySwiper">
              <SwiperSlide>
                 <div id="ElemenEdit" className="ml-5 h-full bg-slate-100/60 border border-white/30 rounded-2xl shadow-xl p-6 backdrop-blur-md space-y-6 text-gray-700 ring-1 ring-slate-200/50">
                  <div className="grid grid-cols-2">
                    <div className="flex justify-start items-start">
                      <p className="text-2xl font-semibold text-slate-800">Edit Buku</p>
                    </div>
                    <div className="flex justify-end items-end">
                      <button
                        type="button"
                        onClick={() => {
                          const d = InputBuku.current;

                          console.log(gambarbukuedit);

                          CommitEditBuku(
                            d.Bahasa?.value,
                            d.Deskripsi?.value,
                            d.Gambar?.value,
                            d.Harga?.value,
                            d.ISBN?.textContent,
                            d.Jenis?.value,
                            d.Judul?.value,
                            d.Kategori?.value,
                            d.Penerbit?.value,
                            d.Penulis?.value,
                            d.Stok?.value,
                            d.Tahun?.value
                          );

                          setcommit(prev => prev + 1);
                        }}
                        className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-all duration-300"
                      >
                        Commit
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 mt-2">
                    <span className="font-semibold text-slate-700">ISBN:</span>
                    <span
                      ref={(el) => {
                        if (InputBuku.current) InputBuku.current.ISBN = el;
                      }}
                      className="truncate overflow-x-auto block max-w-full whitespace-nowrap text-slate-600"
                      title={dataBuku.ISBN || "-"}
                    >
                      {dataBuku.ISBN || "-"}
                    </span>
                  </div>

                  <hr className="border-slate-300" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="cursor-pointer w-full block flex items-center justify-center">
                        <img
                          src={previewGambar}
                          alt="Sampul Buku"
                          className="w-[150px] h-[200px] object-cover rounded-xl shadow-md border border-slate-300"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPreviewGambar(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                              InputBuku.current.Gambar = e.target;
                              setgamberbukuedit(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      <div className="grid grid-cols-2 mt-5 items-center">
                        <label className="font-semibold text-slate-700">Tahun:</label>
                        <input
                          type="text"
                          value={dataBuku.Tahun || ""}
                          ref={(el) => {
                            if (InputBuku.current) InputBuku.current.Tahun = el;
                          }}
                          onChange={(e) => {
                            setDataBuku(prev => ({ ...prev, Tahun: e.target.value }));
                          }}
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                        />

                      </div>

                      <div className="grid grid-cols-2 mt-5 items-center">
                        <label className="font-semibold text-slate-700">Stok:</label>
                        <input
                          type="number"
                          value={dataBuku.Stok || ""}
                          ref={(el) => {if(InputBuku.current)(InputBuku.current.Stok = el)}}
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="grid grid-cols-2 items-center">
                        <label className="font-semibold text-slate-700">Judul:</label>
                        <input
                          type="text"
                          value={dataBuku.Judul || ""}
                          ref={(el) => {if(InputBuku.current) (InputBuku.current.Judul = el)}}
                          readOnly
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <label className="font-semibold text-slate-700">Penulis:</label>
                        <input
                          type="text"
                          value={dataBuku.Penulis || ""}
                          ref={(el) => {if(InputBuku.current) (InputBuku.current.Penulis = el)}}
                          onChange={(e) => {
                            setDataBuku(prev => ({ ...prev, Penulis: e.target.value }));
                          }}
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <label className="font-semibold text-slate-700">Penerbit:</label>
                        <input
                          type="text"
                          value={dataBuku.Penerbit || ""}
                          ref={(el) => {if(InputBuku.current) (InputBuku.current.Penerbit = el)}}
                          onChange={(e) => {
                            setDataBuku(prev => ({ ...prev, Penerbit: e.target.value }));
                          }}
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <label className="font-semibold text-slate-700">Kategori:</label>
                        <input
                          type="text"
                          value={dataBuku.Kategori || ""}
                          ref={(el) => {if(InputBuku.current)(InputBuku.current.Kategori = el)}}
                          onChange={(e) => {
                            setDataBuku(prev => ({ ...prev, Kategori: e.target.value }));
                          }}
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <label className="font-semibold text-slate-700">Jenis:</label>
                        <input
                          type="text"
                          value={dataBuku.Jenis || ""}
                          ref={(el) => {if(InputBuku.current) (InputBuku.current.Jenis = el)}}
                          onChange={(e) => {
                            setDataBuku(prev => ({ ...prev, Jenis: e.target.value }));
                          }}
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <label className="font-semibold text-slate-700">Bahasa:</label>
                        <input
                          type="text"
                          value={dataBuku.Bahasa || ""}
                          ref={(el) => {if(InputBuku.current) (InputBuku.current.Bahasa = el)}}
                          onChange={(e) => {
                            setDataBuku(prev => ({ ...prev, Bahasa: e.target.value }));
                          }}
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <label className="font-semibold text-slate-700">Harga:</label>
                        <input
                          type="number"
                          value={dataBuku.Harga || ""}
                          ref={(el) => {if(InputBuku.current) (InputBuku.current.Harga = el)}}
                          onChange={(e) => {
                            setDataBuku(prev => ({ ...prev, Harga: e.target.value }));
                          }}
                          className="input input-bordered w-full border-slate-300 text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-300" />

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Deskripsi:</label>
                    <textarea
                      defaultValue={dataBuku.Deskripsi || ""}
                      ref={(el) => {if(InputBuku.current) (InputBuku.current.Deskripsi = el)}}
                      className="textarea textarea-bordered w-full border-slate-300 text-slate-800"
                      rows={4}
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div id="ElemenStok">
                <TableRinci ISBN={dataBuku.ISBN} Judul={dataBuku.Judul} Jenis={dataBuku.Jenis}/>
                </div>
              </SwiperSlide>
              <SwiperSlide>

              </SwiperSlide>
            </Swiper>
            
          </div>
        </div>
      </div>
    </>
  );

  
}




function MasukanBukuBaru() {
  const judulRef = useRef<HTMLInputElement>(null);
  const jenisRef = useRef<HTMLSelectElement>(null);
  const hargaRef = useRef<HTMLInputElement>(null);
  const penulisRef = useRef<HTMLInputElement>(null);
  const penerbitRef = useRef<HTMLInputElement>(null);
  const stokRef = useRef<HTMLInputElement>(null);
  const tahunRef = useRef<HTMLInputElement>(null);
  const isbnRef = useRef<HTMLInputElement>(null);
  const kategoriRef = useRef<HTMLSelectElement>(null);
  const bahasaRef = useRef<HTMLSelectElement>(null);
  const deskripsiRef = useRef<HTMLTextAreaElement>(null);
  const setujuRef = useRef<HTMLInputElement>(null);
  
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [ToastMessage, setMessage] = useState("");

  console.log("mantap");

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

 function BukuBaru(
  judul: string | undefined,
  jenis: string | undefined,
  harga: string | undefined,
  penulis: string | undefined,
  penerbit: string | undefined,
  stok: string | undefined,
  tahun: string | undefined,
  ISBN: string | undefined,
  kategori: string | undefined,
  bahasa: string | undefined,
  deskripsi: string | undefined,
  setuju: boolean | undefined,
  gambar: FileList | null | undefined
) {
  if (!setuju) {
    console.log("Admin Harus Menyetujui Inputisasi Buku");
    return;
  }

  if (gambar && gambar.length > 0) {
    const file = gambar[0];
    const reader = new FileReader();
    reader.onload = () => {
      fetch("http://localhost:8080/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tujuan: "Memasukan Data Buku",
          judul: judul ?? "",
          jenis: jenis ?? "",
          harga: harga ?? "",
          penulis: penulis ?? "",
          penerbit: penerbit ?? "",
          stok: stok ?? "",
          tahun: tahun ?? "",
          ISBN: ISBN ?? "",
          kategori: kategori ?? "",
          bahasa: bahasa ?? "",
          deskripsi: deskripsi ?? "",
          gambarBase64: reader.result, // base64 langsung di sini
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Berhasil mengirim:", data);
          setMessage(data.Hasil);
          if(data.Hasil){
             judulRef.current!.value = "";
                  hargaRef.current!.value = "";
                  penulisRef.current!.value = "";
                  penerbitRef.current!.value = "";
                  stokRef.current!.value = "";
                  tahunRef.current!.value = "";
                  isbnRef.current!.value = "";
                  deskripsiRef.current!.value = "";
                  jenisRef.current!.selectedIndex = 0;
                  kategoriRef.current!.selectedIndex = 0;
                  bahasaRef.current!.selectedIndex = 0;
                  setujuRef.current!.checked = false;
                  setPreviewImage(null);
          }
        })
        .catch((err) => {
          console.error("Gagal mengirim:", err);
        });
    };
    reader.readAsDataURL(file);
  } else {
    fetch("http://localhost:8080/app/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tujuan: "/app/endpoint",
        tujuanaksi: "Memasukan Data Buku",
        judul: judul ?? "",
        jenis: jenis ?? "",
        harga: harga ?? "",
        penulis: penulis ?? "",
        penerbit: penerbit ?? "",
        stok: stok ?? "",
        tahun: tahun ?? "",
        ISBN: ISBN ?? "",
        kategori: kategori ?? "",
        bahasa: bahasa ?? "",
        deskripsi: deskripsi ?? "",
        gambarBase64: "", // kosongkan jika tidak ada gambar
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Berhasil mengirim:", data);
      })
      .catch((err) => {
        console.error("Gagal mengirim:", err);
      });
  }
}




  return (
    <>
      <div className="grid grid-cols-[40%_58%] mb-10 mt-10 p-5">
        <div className="text-lg font-semibold">

          <div>
  <h2 className="text-xl font-bold mb-5 text-blue-700 flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
    </svg>
    Panduan Lengkap Pengisian Buku
  </h2>

  <div
    className="p-6 rounded-xl shadow-lg"
    style={{ fontFamily: "Inter, sans-serif" }}
  >
    <p className="mb-6 text-gray-700 text-sm leading-relaxed">
      Pastikan mengisi data buku dengan benar dan lengkap agar katalog perpustakaan selalu up-to-date dan mudah dicari.
      Perhatikan setiap poin penting berikut ini:
    </p>

    <ul className="space-y-5">
      {/* Item 1 */}
      <li className="flex gap-3 items-start">
        <div className="text-blue-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          <strong>Judul buku</strong> wajib diisi dengan jelas dan singkat.
        </div>
      </li>

      {/* Item 2 */}
      <li className="flex gap-3 items-start">
        <div className="text-green-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
       
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          Pilih <strong>jenis buku</strong> dengan benar, <em>Cetak</em> atau <em>Digital</em>.
        </div>
      </li>

      {/* Item 3 */}
      <li className="flex gap-3 items-start">
        <div className="text-purple-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          Harga harus berupa <strong>angka</strong> tanpa tanda baca, contohnya: <code>50000</code>.
        </div>
      </li>

      {/* Item 4 */}
      <li className="flex gap-3 items-start">
        <div className="text-red-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          Penulis dan penerbit harus diisi sesuai data buku asli.
        </div>
      </li>

      {/* Item 5 */}
      <li className="flex gap-3 items-start">
        <div className="text-yellow-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-4a4 4 0 014-4h4" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          Jumlah <strong>stok</strong> harus angka positif dan akurat.
        </div>
      </li>

      {/* Item 6 */}
      <li className="flex gap-3 items-start">
        <div className="text-teal-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          Tahun terbit tulis dengan format <strong>4 digit</strong>, contohnya: <code>2023</code>.
        </div>
      </li>

      {/* Item 7 */}
      <li className="flex gap-3 items-start">
        <div className="text-indigo-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          ISBN harus <strong>13 digit</strong> untuk katalog yang akurat.
        </div>
      </li>

      {/* Item 8 */}
      <li className="flex gap-3 items-start">
        <div className="text-pink-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          Deskripsi singkat, maksimal <strong>500 karakter</strong>, isi secara ringkas.
        </div>
      </li>

      {/* Item 9 */}
      <li className="flex gap-3 items-start">
        <div className="text-orange-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          Upload gambar sampul dengan format <strong>JPG/PNG</strong>, maksimal <em>2MB</em>.
        </div>
      </li>

      {/* Item 10 */}
      <li className="flex gap-3 items-start">
        <div className="text-gray-600 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-gray-800 text-sm leading-snug">
          Centang persetujuan jika sudah yakin data sudah benar dan siap dimasukkan ke katalog.
        </div>
      </li>
    </ul>
  </div>
</div>

        </div>
        <div className="grid grid-cols-[30%_70%] gap-4 p-6 bg-gray-50 rounded-lg shadow-md" style={{ fontFamily: "Inter, sans-serif" }}>
          {/* Bagian Kiri */}
          <div className="flex flex-col gap-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-64 relative cursor-pointer"
              onClick={() => inputFileRef.current?.click()}
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="h-48 w-96 object-contain  rounded-md" />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-4xl">☁️</div>
                  <div className="text-sm mt-2">Upload Gambar Sampul</div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={inputFileRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi Buku</label>
              <textarea
                ref={deskripsiRef}
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Tuliskan deskripsi singkat..."
                rows={4}
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select ref={kategoriRef} className="w-full border rounded-md p-2 text-sm">
                  <option>Fiksi</option>
                  <option>Non-Fiksi</option>
                  <option>Pelajaran</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bahasa</label>
                <select ref={bahasaRef} className="w-full border rounded-md p-2 text-sm">
                  <option>Indonesia</option>
                  <option>Inggris</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bagian Kanan */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[75%_25%] gap-2">
              <input
                ref={judulRef}
                type="text"
                className="border rounded-md p-2 text-sm"
                placeholder="Masukkan Judul Buku"
              />
              <select ref={jenisRef} className="border rounded-md p-2 text-sm">
                <option>Jenis Buku</option>
                <option>Cetak</option>
                <option>Digital</option>
              </select>
            </div>

            <input
              ref={hargaRef}
              type="number"
              className="border rounded-md p-2 text-sm"
              placeholder="Masukkan Harga"
            />
            <input
              ref={penulisRef}
              type="text"
              className="border rounded-md p-2 text-sm"
              placeholder="Masukkan Nama Penulis"
            />
            <input
              ref={penerbitRef}
              type="text"
              className="border rounded-md p-2 text-sm"
              placeholder="Masukkan Penerbit"
            />

            <div className="grid grid-cols-3 gap-2">
              <input ref={stokRef} type="text" className="border rounded-md p-2 text-sm" placeholder="Jumlah Stok" />
              <input ref={tahunRef} type="text" className="border rounded-md p-2 text-sm" placeholder="Tahun Terbit" />
              <input ref={isbnRef} type="text" className="border rounded-md p-2 text-sm" placeholder="ISBN" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Penanggung Jawab</label>
              <input
                type="text"
                className="w-full border rounded-md p-2 text-sm bg-gray-100"
                value="Admin Perpustakaan & Pustakawan"
                readOnly
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" ref={setujuRef} />
              <label>Saya menyetujui untuk memasukkan buku ini ke dalam katalog</label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  // reset refs and image
                  judulRef.current!.value = "";
                  hargaRef.current!.value = "";
                  penulisRef.current!.value = "";
                  penerbitRef.current!.value = "";
                  stokRef.current!.value = "";
                  tahunRef.current!.value = "";
                  isbnRef.current!.value = "";
                  deskripsiRef.current!.value = "";
                  jenisRef.current!.selectedIndex = 0;
                  kategoriRef.current!.selectedIndex = 0;
                  bahasaRef.current!.selectedIndex = 0;
                  setujuRef.current!.checked = false;
                  setPreviewImage(null);
                 
                }}
              >
                Reset
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={()=>{
                 BukuBaru(judulRef.current?.value, jenisRef.current?.value, hargaRef.current?.value, penulisRef.current?.value, penerbitRef.current?.value, stokRef.current?.value, tahunRef.current?.value, isbnRef.current?.value, kategoriRef.current?.value, bahasaRef.current?.value, deskripsiRef.current?.value, setujuRef.current?.checked, inputFileRef.current?.files);

                 
              }}>
                Tambahkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

