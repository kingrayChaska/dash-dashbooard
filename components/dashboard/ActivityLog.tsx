import Image from "next/image";

interface Activity {
  user: string;
  action: string;
  time: string;
  status: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-3">
          <Image
            src="https://via.placeholder.com/32"
            alt="User"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm">
              <span className="font-semibold">{activity.user}</span>{" "}
              {activity.action}
            </p>
            <p className="text-xs text-gray-500">
              Status: {activity.status} · {activity.time}
            </p>
          </div>
        </div>
      ))}
      <button className="text-blue-500 text-sm">See All Activities</button>
    </div>
  );
}
