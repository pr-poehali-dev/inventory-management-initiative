import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface WarehousesProps {
  warehouseData: Array<{
    id: number;
    name: string;
    location: string;
    capacity: number;
    items: number;
  }>;
}

const Warehouses = ({ warehouseData }: WarehousesProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Склады</CardTitle>
          <CardDescription>Управление складскими помещениями</CardDescription>
        </div>
        <Button>
          <Icon name="Plus" className="mr-2 h-4 w-4" />
          Добавить склад
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {warehouseData.map((warehouse) => (
            <Card key={warehouse.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <Icon name="MapPin" className="mr-1 h-3 w-3" />
                      {warehouse.location}
                    </CardDescription>
                  </div>
                  <Icon name="Warehouse" className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Заполненность</span>
                    <span className="font-semibold">{warehouse.capacity}%</span>
                  </div>
                  <Progress value={warehouse.capacity} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Всего товаров:</span>
                  <span className="font-semibold">{warehouse.items} шт</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Warehouses;
