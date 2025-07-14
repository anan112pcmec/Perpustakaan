export default function ServiceCard(props : any) {
    console.log(props);
  return (
    <>
      <div
        className="rounded-2xl p-6 backdrop-blur-md bg-white/10 shadow-xl text-neutral-300"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="grid grid-rows-[50%_50%] gap-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center">
              {/* Icon bisa berupa gambar */}
              
            </div>
            <div className="text-2xl font-semibold tracking-wide">
              {props.namaservice}
            </div>
          </div>
          <div className="text-sm leading-relaxed">
            {props.deskripsi}
          </div>
        </div>
      </div>
    </>
  );
}
