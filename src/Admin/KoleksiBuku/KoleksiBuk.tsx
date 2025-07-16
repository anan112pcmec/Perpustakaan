import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

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
                <div className="flex items-end justify-end mb-5 space-x-3 bg-white/20 backdrop-blur-md p-2 rounded-xl shadow border border-white/30">
                <input
                    type="text"
                    placeholder="Cari judul, penulis..."
                    className="px-4 py-2 rounded-lg bg-white/40 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 text-sm w-64"
                />
                <button
                    className="px-4 py-2 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-800 transition shadow"
                >
                    Cari
                </button>
                </div>

                <table className="w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 text-gray-400 text-left uppercase">
                            <th className="px-4 py-3">Author</th>
                            <th className="px-4 py-3">Function</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Employed</th>
                            <th className="px-4 py-3">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Rows with canvas placeholder for images */}
                        {[...Array(6)].map((_, i) => (
                            <tr key={i} className="border-b border-gray-100">
                                <td className="px-4 py-4 flex items-center gap-4 text-gray-800 font-semibold">
                                    <canvas 
                                        width={36} 
                                        height={36} 
                                        className="rounded-full bg-gray-300"
                                        style={{display: "inline-block"}}
                                        aria-label="Placeholder for author profile image"
                                    ></canvas>
                                    <div className="flex flex-col text-sm font-normal text-gray-500">
                                        <span className="font-semibold text-gray-900">Author Name {i+1}</span>
                                        <span>email@example.com</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-700 font-semibold">
                                    <div><strong>Position Title</strong></div>
                                    <div className="text-gray-400 text-xs font-normal">Position Subtitle</div>
                                </td>
                                <td className="px-4 py-4">
                                    <span
                                        className={`text-white text-xs font-bold px-3 py-1 rounded-full cursor-default select-none ${
                                            i % 2 === 0 ? "bg-lime-400" : "bg-gray-400"
                                        }`}
                                    >
                                        {i % 2 === 0 ? "ONLINE" : "OFFLINE"}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-gray-700 font-normal text-sm">
                                    00/00/00
                                </td>
                                <td className="px-4 py-4 text-gray-700 font-semibold cursor-pointer select-none">
                                    Edit
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ProjectTable/>

            <MasukanBukuBaru/>
            
        </>
    );
}


const ProjectTable = () => {
    const projects = [
        { name: 'Spotify', budget: '$2,500', status: 'working', completion: 60 },
        { name: 'Invision', budget: '$5,000', status: 'done', completion: 100 },
        { name: 'Jira', budget: '$3,400', status: 'canceled', completion: 30 },
        { name: 'Slack', budget: '$1,000', status: 'canceled', completion: 0 },
        { name: 'Webdev', budget: '$14,000', status: 'working', completion: 80 },
        { name: 'Adobe XD', budget: '$2,300', status: 'done', completion: 100 },
    ];

    return (
        <div className="container mx-auto p-6"
        style={{ fontFamily: "Inter, sans-serif" }}>
            <h1 className="text-2xl font-bold mb-4">Projects table</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2 px-4">PROJECT</th>
                        <th className="text-left py-2 px-4">BUDGET</th>
                        <th className="text-left py-2 px-4">STATUS</th>
                        <th className="text-left py-2 px-4">COMPLETION</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{project.name}</td>
                            <td className="py-2 px-4">{project.budget}</td>
                            <td className="py-2 px-4">{project.status}</td>
                            <td className="py-2 px-4">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            {project.completion}%
                                        </div>
                                    </div>
                                    <div className="flex h-2 bg-gray-300 rounded">
                                        <div
                                            className={`bg-${project.completion === 100 ? 'green' : project.completion > 0 ? 'blue' : 'red'}-500 h-full w-${project.completion} rounded`}
                                            style={{ width: `${project.completion}%` }}>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


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
      <div className="grid grid-cols-[40%_60%] mb-10 mt-10 p-5">
        <div className="text-lg font-semibold">
          Masukan Informasi Buku Baru Yang Dirasa Perlu Dimasukan
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

