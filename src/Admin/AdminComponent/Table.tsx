interface AdminData {
  name: string;
  email: string;
  position: string;
  subtitle: string;
  status: "ONLINE" | "OFFLINE";
  joinDate: string;
  onEdit?: () => void;
}

export default function TableAdmin({ data, index }: { data: AdminData; index: number }) {
  return (
    <tr key={index} className="border-b border-gray-100">
      <td className="px-4 py-4 flex items-center gap-4 text-gray-800 font-semibold">
        <canvas
          width={36}
          height={36}
          className="rounded-full bg-gray-300"
          style={{ display: "inline-block" }}
          aria-label="Placeholder for author profile image"
        ></canvas>
        <div className="flex flex-col text-sm font-normal text-gray-500">
          <span className="font-semibold text-gray-900">{data.name}</span>
          <span>{data.email}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-gray-700 font-semibold">
        <div><strong>{data.position}</strong></div>
        <div className="text-gray-400 text-xs font-normal">{data.subtitle}</div>
      </td>
      <td className="px-4 py-4">
        <span
          className={`text-white text-xs font-bold px-3 py-1 rounded-full cursor-default select-none ${
            data.status === "ONLINE" ? "bg-lime-400" : "bg-gray-400"
          }`}
        >
          {data.status}
        </span>
      </td>
      <td className="px-4 py-4 text-gray-700 font-normal text-sm">
        {data.joinDate}
      </td>
      <td
        className="px-4 py-4 text-gray-700 font-semibold cursor-pointer select-none"
        onClick={data.onEdit}
      >
        Edit
      </td>
    </tr>
  );
}
