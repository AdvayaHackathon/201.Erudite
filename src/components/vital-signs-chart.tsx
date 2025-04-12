"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Mon", heartRate: 72, respRate: 16 },
  { date: "Tue", heartRate: 75, respRate: 15 },
  { date: "Wed", heartRate: 70, respRate: 14 },
  { date: "Thu", heartRate: 74, respRate: 16 },
  { date: "Fri", heartRate: 71, respRate: 15 },
  { date: "Sat", heartRate: 68, respRate: 14 },
  { date: "Sun", heartRate: 70, respRate: 15 },
]

export function VitalSignsChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis hide={true} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Heart Rate</span>
                      <span className="font-bold text-rose-500">{payload[0].value} BPM</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Resp. Rate</span>
                      <span className="font-bold text-blue-500">{payload[1].value} br/min</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="heartRate"
          stroke="#f43f5e"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="respRate"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
