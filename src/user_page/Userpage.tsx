export const Baris1 = (props:any) => {
  return (
    <>
    <div className="col-span-1 h-28 bg-gray-100 rounded" >
        {props.kolom1}
    </div>
    <div className="col-span-1 h-28 bg-gray-100 rounded" />
    <div className="col-span-1 h-28 bg-gray-100 rounded" />
    <div className="col-span-1 h-28 bg-gray-100 rounded" />
    </>
  );
};


export default function Userpage(props:any){
     
    return(
        <>
            <div className="p-4 space-y-4">
            {/* Baris 1: Alamat + 3 box kategori */}
            <div className="grid grid-cols-4 gap-4">
                <Baris1 kolom1="Halo selamatdaatng"/>
            </div>

            {/* Baris 2: Pesanan aktif + Wishlist + Kupon */}
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 h-32 bg-gray-100 rounded" />
                <div className="col-span-1 h-32 bg-gray-100 rounded" />
                <div className="col-span-1 h-32 bg-gray-100 rounded" />
            </div>

            {/* Baris 3: Rekomendasi judul */}
            <div className="h-10 bg-gray-100 rounded w-1/3" />

            {/* Baris 4: Rekomendasi produk (slider/grid horizontal) */}
            <div className="flex space-x-4 overflow-x-auto py-2">
                {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="min-w-[120px] h-40 bg-gray-100 rounded flex-shrink-0"
                />
                ))}
            </div>

            <button
            onClick={()=> props.Ngetes("WOI")}> Pencet Ini</button>
            </div>
        </>
    )
}