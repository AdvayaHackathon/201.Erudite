import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, ArrowDown, ArrowUp, Heart, Pill, Calendar } from "lucide-react"

export function ActivityHistory() {
  return (
    <Card className="bg-black border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Activity History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-rose-500/10 transition-all duration-300 hover:bg-rose-500/20 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-rose-500/5 before:to-transparent before:rounded-lg before:transition-opacity before:duration-300 before:opacity-0 hover:before:opacity-100">
            <div className="rounded-full bg-rose-500/20 p-2">
              <Heart className="h-5 w-5 text-rose-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Heart Rate Check</h3>
              <p className="text-xs text-gray-400">72 BPM</p>
            </div>
            <div className="text-xs text-gray-400">2h ago</div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-500/10 transition-all duration-300 hover:bg-blue-500/20 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:to-transparent before:rounded-lg before:transition-opacity before:duration-300 before:opacity-0 hover:before:opacity-100">
            <div className="rounded-full bg-blue-500/20 p-2">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Medication Taken</h3>
              <p className="text-xs text-gray-400">Morning dose</p>
            </div>
            <div className="text-xs text-gray-400">4h ago</div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-emerald-500/10 transition-all duration-300 hover:bg-emerald-500/20 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-500/5 before:to-transparent before:rounded-lg before:transition-opacity before:duration-300 before:opacity-0 hover:before:opacity-100">
            <div className="rounded-full bg-emerald-500/20 p-2">
              <Pill className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Activity Level</h3>
              <p className="text-xs text-gray-400">Moderate</p>
            </div>
            <div className="text-xs text-gray-400">6h ago</div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-500/10 transition-all duration-300 hover:bg-amber-500/20 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-amber-500/5 before:to-transparent before:rounded-lg before:transition-opacity before:duration-300 before:opacity-0 hover:before:opacity-100">
            <div className="rounded-full bg-amber-500/20 p-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Weekly Checkup</h3>
              <p className="text-xs text-gray-400">Completed</p>
            </div>
            <div className="text-xs text-gray-400">1d ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 