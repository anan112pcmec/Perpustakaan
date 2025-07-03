export default function CardProduk(props: any) {
  return (
    <>
      <div className="h-[300px] w-full  grid grid-rows-[40%_60%]"
      style={{
         background: "linear-gradient(to bottom, rgba(190, 250, 237, 0.2) 2%, transparent 100%)",
         boxShadow: "0 0px 0px rgba(74, 195, 247, 0.15)",
         height:"400px",
         
      }}>
        {/* Row 1 */}
        <div className="grid grid-cols-[30%_70%]">
            <div className="p-7">
           <div className="bg-white/10 border border-white/20 rounded-3xl h-full w-full overflow-hidden p-1">
            <img 
                src={props.link_gambar}
                alt="Gambar Sampul" 
                className="w-full h-full object-cover" 
            />
            </div>  

            </div>
            <div className="p-4 border-l border-white/20"> {/* ← garis pemisah kolom */}
            <div className="text-xs text-neutral-300 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{props.penulis} <i className="fa-solid fa-circle-notch"></i> {props.studio_penerbit} </div>
            <div className="text-2xl text-neutral-300 font-bold" style={{ fontFamily: "Urbanist, sans-serif" }}>{props.nama}</div>
            <div className="text-2xl text-neutral-300 mt-2" style={{ fontFamily: "Urbanist, sans-serif" }}>RP.{props.harga}</div>
            </div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-[30%_70%] border-white/20 mb-[200px]"> {/* ← garis pemisah baris */}
            <div className="p-4">
                <div className="grid grid-rows-3 h-full w-full">
                     <div className="grid grid-cols-2 mt-2">
                        <div>
                            <div style={{ borderRadius: "100px", width: "50px", marginLeft: "10px" }}
                                className='border bg-white/10 border-white/20 flex justify-center p-4'>
                            <i className="text-lime-100 fa-regular fa-comments"></i>
                            </div>
                        </div>
                        <div>
                            <div style={{ borderRadius: "100px", width: "50px", marginLeft: "10px" }}
                                className='border bg-white/10 border-white/20 flex justify-center p-4'>
                            <i className="text-red-100 fa-solid fa-heart"></i>
                            </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2">
                        <div>
                            <div style={{ borderRadius: "100px", width: "50px", marginLeft: "10px" }}
                                className='border bg-white/10 border-white/20 flex justify-center p-4'>
                            <i className="text-sky-100 fa-solid fa-book-open-reader"></i>
                            </div>
                        </div>
                        <div>
                            <div style={{ borderRadius: "100px", width: "50px", marginLeft: "10px" }}
                                className='border bg-white/10 border-white/20 flex justify-center p-4'>
                            <i className="text-orange-100 fa-solid fa-plus"></i>
                            </div>
                        </div>
                     </div>
                    <div className="grid grid-cols-2">
                        
                    </div>
                </div>
            </div>
            <div className="p-4  border-white/20 border-t"> {/* ← garis pemisah kolom */}
                <div className="text-2xl text-neutral-300 font-bold" style={{ fontFamily: "Urbanist, sans-serif" }}>
                    Detail Buku
                </div>
                <div className="grid grid-rows-3 w-full">
                    {/* Row 1 */}
                    <div className="grid grid-cols-2 mt-2">
                        <div className="">
                            <div className="text-neutral-300 text-xs ">Penerbit</div>
                            <div className="text-neutral-300 text-lg ">{props.penerbit}</div>
                        </div>
                        <div className="">
                            <div className="text-neutral-300 text-xs">Tanggal Terbit</div>
                             <div className="text-neutral-300 text-lg ">{props.tgl_terbit}</div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2">
                        <div className="">
                            <div className="text-neutral-300 text-xs ">Jumlah Halaman</div>
                             <div className="text-neutral-300 text-lg ">{props.halaman}</div>
                        </div>
                        <div className="">
                            <div className="text-neutral-300 text-xs ">Genre</div>
                             <div className="text-neutral-300 text-lg ">{props.genre}</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        </div>

    </>
  );
}


