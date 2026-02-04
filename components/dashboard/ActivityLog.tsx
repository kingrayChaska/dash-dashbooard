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
    <div className="space-y-4 text-gray-200">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-3">
          <img
            src="profile-img.jpg"
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
            <p className="text-xs text-gray-200">
              Status: {activity.status} · {activity.time}
            </p>
          </div>
        </div>
      ))}
      <a href="/announcements" className="text-blue-500 text-sm">
        See All Activities
      </a>
    </div>
  );
}
