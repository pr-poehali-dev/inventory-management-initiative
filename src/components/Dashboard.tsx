import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface DashboardProps {
  stats: Array<{
    title: string;
    value: string;
    change: string;
    icon: string;
    trend: string;
  }>;
  warehouseData: Array<{
    id: number;
    name: string;
    location: string;
    capacity: number;
    items: number;
  }>;
  movementHistory: Array<{
    id: number;
    date: string;
    type: string;
    item: string;
    from: string;
    to: string;
    quantity: number;
    user: string;
  }>;
}

const Dashboard = ({ stats, warehouseData, movementHistory }: DashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon name={stat.icon as any} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                {stat.change} от вчера
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Загруженность складов</CardTitle>
            <CardDescription>Текущее состояние вместимости</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {warehouseData.map((warehouse) => (
              <div key={warehouse.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{warehouse.name}</span>
                  <span className="text-muted-foreground">{warehouse.capacity}%</span>
                </div>
                <Progress value={warehouse.capacity} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние операции</CardTitle>
            <CardDescription>Актуальные перемещения за сегодня</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movementHistory.slice(0, 4).map((move) => (
                <div key={move.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                  <div className={`p-2 rounded-lg ${
                    move.type === 'Поступление' ? 'bg-green-500/10' :
                    move.type === 'Перемещение' ? 'bg-blue-500/10' :
                    move.type === 'Списание' ? 'bg-orange-500/10' :
                    'bg-purple-500/10'
                  }`}>
                    <Icon name={
                      move.type === 'Поступление' ? 'ArrowDownToLine' :
                      move.type === 'Перемещение' ? 'ArrowRightLeft' :
                      move.type === 'Списание' ? 'ArrowUpFromLine' :
                      'ClipboardCheck'
                    } className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{move.item}</p>
                    <p className="text-xs text-muted-foreground">{move.from} → {move.to}</p>
                    <p className="text-xs text-muted-foreground">{move.date}</p>
                  </div>
                  <Badge variant="outline">{move.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
