import { Activity, Calendar, CheckCircle2, Pill } from "lucide-react"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6 w-full">
        <div className="rounded-full bg-blue-500/10 p-3 flex-shrink-0">
          <Calendar className="h-6 w-6 text-blue-500" />
        </div>
        <div className="flex-grow">
          <p className="text-base font-medium text-white">Daily Health Check</p>
          <p className="text-sm text-gray-400">Completed today at 8:32 AM</p>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full">
        <div className="rounded-full bg-green-500/10 p-3 flex-shrink-0">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex-grow">
          <p className="text-base font-medium text-white">Medication Reminder</p>
          <p className="text-sm text-gray-400">Marked as taken at 9:00 AM</p>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full">
        <div className="rounded-full bg-rose-500/10 p-3 flex-shrink-0">
          <Activity className="h-6 w-6 text-rose-500" />
        </div>
        <div className="flex-grow">
          <p className="text-base font-medium text-white">Heart Rate Alert</p>
          <p className="text-sm text-gray-400">Elevated heart rate detected yesterday</p>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full">
        <div className="rounded-full bg-purple-500/10 p-3 flex-shrink-0">
          <Pill className="h-6 w-6 text-purple-500" />
        </div>
        <div className="flex-grow">
          <p className="text-base font-medium text-white">Medication Effectiveness</p>
          <p className="text-sm text-gray-400">Analysis updated yesterday</p>
        </div>
      </div>
    </div>
  )
}
