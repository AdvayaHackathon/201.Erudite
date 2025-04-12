import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, ArrowDown, ArrowUp, Heart, TreesIcon as Lungs } from "lucide-react"

export function HealthMetricsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-black border-white/10 transition-all duration-300 hover:border-rose-500/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-rose-500/5 before:to-transparent before:rounded-lg before:transition-opacity before:duration-300 before:opacity-0 hover:before:opacity-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Heart Rate</CardTitle>
          <Heart className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">72 BPM</div>
          <p className="text-xs text-gray-400">
            <span className="text-green-500 flex items-center">
              <ArrowDown className="mr-1 h-3 w-3" />
              3% from yesterday
            </span>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-black border-white/10 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:to-transparent before:rounded-lg before:transition-opacity before:duration-300 before:opacity-0 hover:before:opacity-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Respiratory Rate</CardTitle>
          <Lungs className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">16 br/min</div>
          <p className="text-xs text-gray-400">
            <span className="text-gray-400 flex items-center">No change from yesterday</span>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-black border-white/10 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-500/5 before:to-transparent before:rounded-lg before:transition-opacity before:duration-300 before:opacity-0 hover:before:opacity-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">HRV</CardTitle>
          <Activity className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">42 ms</div>
          <p className="text-xs text-gray-400">
            <span className="text-green-500 flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              5% from yesterday
            </span>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-black border-white/10 transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-amber-500/5 before:to-transparent before:rounded-lg before:transition-opacity before:duration-300 before:opacity-0 hover:before:opacity-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Stress Level</CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">Elevated</div>
          <p className="text-xs text-gray-400">
            <span className="text-amber-500 flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              Consider relaxation techniques
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
