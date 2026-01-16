interface StatsCardProps {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-[#87A688] p-4 rounded-lg shadow flex flex-col items-center justify-center">
      <h4 className="text-3xl font-bold">{value}</h4>
      <p className="text-sm text-gray-300">{title}</p>
    </div>
  );
}
