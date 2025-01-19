import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
}

export function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <Card className="bg-gray-900 border-purple-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}

