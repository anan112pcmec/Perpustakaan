import NotFoundImg from '/Perpustakaan/src/assets/404.svg';

interface Fallback {
  type: string;
  Message: string;
}

export const UnreadyFall = ({ type, Message }: Fallback) => {
  const lowerType = type.toLowerCase();

  const baseStyle =
    "w-full h-full flex flex-col items-center justify-center rounded-lg p-6 shadow";

   if (type.toLowerCase() === 'notfound') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src={NotFoundImg} alt="404 Not Found" className="w-48 h-48 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">404 - Halaman Tidak Ditemukan</h2>
        <p className="text-center max-w-md text-gray-600">{Message}</p>
      </div>
    );
  }

  if (lowerType === "error") {
    return (
      <div className={`${baseStyle} bg-red-50 border border-red-200`}>
        <i className="fas fa-exclamation-triangle text-red-500 text-6xl mb-4"></i>
        <h2 className="text-xl font-semibold text-red-600 mb-2">Terjadi Kesalahan</h2>
        <p className="text-sm text-red-700 text-center max-w-md">
          Sistem tidak dapat memuat data saat ini.
        </p>
      </div>
    );
  } else if (lowerType === "custom") {
    return (
      <div className={`${baseStyle} bg-yellow-50 border border-yellow-200`}>
        <i className="fas fa-exclamation-circle text-yellow-500 text-6xl mb-4"></i>
        <h2 className="text-xl font-semibold text-yellow-600 mb-2">Peringatan</h2>
        <h3 className="text-base font-medium text-yellow-700 mb-1">
          Case: <span>{Message}</span>
        </h3>
        <p className="text-sm text-yellow-700 text-center max-w-md">{Message}</p>
      </div>
    );
  }

  return null;
};
