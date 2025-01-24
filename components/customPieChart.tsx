"use client"
import { getStatusHexColor } from "@/app/lib/utils"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function CustomPieChart({ data }: { data: { name: string; total: number }[] }) {
  return (
    <div className="flex items-center">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="total"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStatusHexColor(entry.name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center">
        <ul className="w-40 bg-gray-800 p-2 text-white">
          {data.map((entry, index) => (
            <li key={index} className="flex items-center">
              <span
                className="mr-2 inline-block h-4 w-4"
                style={{ backgroundColor: getStatusHexColor(entry.name) }}
              />
              <span className="flex items-center py-1">
                {entry.name}: {entry.total}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
