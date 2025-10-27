import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const warehouseData = [
    { id: 1, name: 'Основной склад', location: 'Москва, ул. Складская 1', capacity: 85, items: 2847 },
    { id: 2, name: 'Склад №2', location: 'Санкт-Петербург, пр. Логистический 5', capacity: 62, items: 1523 },
    { id: 3, name: 'Региональный склад', location: 'Екатеринбург, ул. Промышленная 12', capacity: 43, items: 892 },
  ];

  const productData = [
    { id: 'SKU001', name: 'Ноутбук Dell XPS 15', category: 'Электроника', warehouse: 'Основной склад', quantity: 45, status: 'В наличии' },
    { id: 'SKU002', name: 'Офисное кресло Herman Miller', category: 'Мебель', warehouse: 'Склад №2', quantity: 12, status: 'Низкий остаток' },
    { id: 'SKU003', name: 'Принтер HP LaserJet Pro', category: 'Электроника', warehouse: 'Основной склад', quantity: 28, status: 'В наличии' },
    { id: 'SKU004', name: 'Стеллаж металлический', category: 'Мебель', warehouse: 'Региональный склад', quantity: 3, status: 'Критический' },
  ];

  const movementHistory = [
    { id: 1, date: '2025-10-27 14:30', type: 'Поступление', item: 'Ноутбук Dell XPS 15', from: 'Поставщик Tech Corp', to: 'Основной склад', quantity: 15, user: 'Иванов И.И.' },
    { id: 2, date: '2025-10-27 12:15', type: 'Перемещение', item: 'Офисное кресло Herman Miller', from: 'Основной склад', to: 'Склад №2', quantity: 5, user: 'Петрова А.С.' },
    { id: 3, date: '2025-10-27 10:45', type: 'Списание', item: 'Принтер HP LaserJet Pro', from: 'Основной склад', to: 'Отдел продаж', quantity: 2, user: 'Сидоров П.М.' },
    { id: 4, date: '2025-10-26 16:20', type: 'Инвентаризация', item: 'Стеллаж металлический', from: 'Региональный склад', to: 'Региональный склад', quantity: 0, user: 'Система' },
  ];

  const stats = [
    { title: 'Всего товаров', value: '5,262', change: '+12%', icon: 'Package', trend: 'up' },
    { title: 'Активных складов', value: '3', change: '0%', icon: 'Warehouse', trend: 'neutral' },
    { title: 'Перемещений сегодня', value: '47', change: '+8%', icon: 'TrendingUp', trend: 'up' },
    { title: 'Критические остатки', value: '8', change: '-3', icon: 'AlertTriangle', trend: 'down' },
  ];

  const renderDashboard = () => (
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

  const renderProducts = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Товары</CardTitle>
          <CardDescription>Управление складским ассортиментом</CardDescription>
        </div>
        <Button>
          <Icon name="Plus" className="mr-2 h-4 w-4" />
          Добавить товар
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input placeholder="Поиск по наименованию, артикулу или категории..." className="max-w-md" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Артикул</TableHead>
              <TableHead>Наименование</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Склад</TableHead>
              <TableHead>Количество</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-mono text-xs">{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.warehouse}</TableCell>
                <TableCell>{product.quantity} шт</TableCell>
                <TableCell>
                  <Badge variant={
                    product.status === 'В наличии' ? 'default' :
                    product.status === 'Низкий остаток' ? 'secondary' :
                    'destructive'
                  }>
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderWarehouses = () => (
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

  const renderHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle>Хронология операций</CardTitle>
        <CardDescription>История всех перемещений и изменений</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <Input placeholder="Поиск в истории..." className="max-w-md" />
          <Button variant="outline">
            <Icon name="Filter" className="mr-2 h-4 w-4" />
            Фильтры
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата и время</TableHead>
              <TableHead>Тип операции</TableHead>
              <TableHead>Товар</TableHead>
              <TableHead>Откуда</TableHead>
              <TableHead>Куда</TableHead>
              <TableHead>Количество</TableHead>
              <TableHead>Пользователь</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movementHistory.map((move) => (
              <TableRow key={move.id}>
                <TableCell className="font-mono text-xs">{move.date}</TableCell>
                <TableCell>
                  <Badge variant={
                    move.type === 'Поступление' ? 'default' :
                    move.type === 'Перемещение' ? 'secondary' :
                    move.type === 'Списание' ? 'outline' :
                    'secondary'
                  }>
                    {move.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{move.item}</TableCell>
                <TableCell>{move.from}</TableCell>
                <TableCell>{move.to}</TableCell>
                <TableCell>{move.quantity > 0 ? `${move.quantity} шт` : '—'}</TableCell>
                <TableCell className="text-muted-foreground">{move.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Icon name="Package" className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Учет имущества</h1>
                <p className="text-sm text-muted-foreground">Система управления складами</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="Bell" className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Settings" className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2 border-l pl-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Icon name="User" className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Администратор</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard">
              <Icon name="LayoutDashboard" className="mr-2 h-4 w-4" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="products">
              <Icon name="Package" className="mr-2 h-4 w-4" />
              Товары
            </TabsTrigger>
            <TabsTrigger value="warehouses">
              <Icon name="Warehouse" className="mr-2 h-4 w-4" />
              Склады
            </TabsTrigger>
            <TabsTrigger value="history">
              <Icon name="Clock" className="mr-2 h-4 w-4" />
              Хронология
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="products">
            {renderProducts()}
          </TabsContent>

          <TabsContent value="warehouses">
            {renderWarehouses()}
          </TabsContent>

          <TabsContent value="history">
            {renderHistory()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
