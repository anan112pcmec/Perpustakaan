interface HeaderProps {
    title: string;
}

export const Header = ({ title }: HeaderProps) => {
    return (
        <header className="top-0 w-full z-50 h-16 bg-white shadow-md flex items-center px-6 justify-between"
            style={{ fontFamily: "Inter, sans-serif" }}>
            
            {/* Logo atau Judul */}
            <div className="text-xl font-semibold text-gray-800">
                {title}
            </div>

            {/* Menu Navigasi atau Profile */}
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-blue-600 transition">
                    🔔
                </button>
                <button className="text-gray-600 hover:text-blue-600 transition">
                    ⚙️
                </button>
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    AD
                </div>
            </div>
        </header>
    );
};
