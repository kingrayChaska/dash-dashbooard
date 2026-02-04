interface StatsCardProps {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="transform bg-[#b7b160] p-4 rounded-lg shadow-md flex flex-col items-center justify-center shadow-purple-800 hover:scale-105 transition duration-200 ease-in-out ">
      <h4 className="text-3xl font-bold">{value}</h4>
      <p className="text-sm text-gray-300">{title}</p>
    </div>
  );
}
