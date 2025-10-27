import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/Products';
import Warehouses from '@/components/Warehouses';
import Movements from '@/components/Movements';
import History from '@/components/History';

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
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
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
            <TabsTrigger value="movements">
              <Icon name="ArrowRightLeft" className="mr-2 h-4 w-4" />
              Перемещения
            </TabsTrigger>
            <TabsTrigger value="history">
              <Icon name="Clock" className="mr-2 h-4 w-4" />
              Хронология
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard stats={stats} warehouseData={warehouseData} movementHistory={movementHistory} />
          </TabsContent>

          <TabsContent value="products">
            <Products productData={productData} />
          </TabsContent>

          <TabsContent value="warehouses">
            <Warehouses warehouseData={warehouseData} />
          </TabsContent>

          <TabsContent value="movements">
            <Movements productData={productData} warehouseData={warehouseData} />
          </TabsContent>

          <TabsContent value="history">
            <History movementHistory={movementHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
