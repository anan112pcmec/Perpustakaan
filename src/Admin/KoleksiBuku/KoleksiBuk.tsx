import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";

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




