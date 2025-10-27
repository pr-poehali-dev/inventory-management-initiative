import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface ProductsProps {
  productData: Array<{
    id: string;
    name: string;
    category: string;
    warehouse: string;
    quantity: number;
    status: string;
  }>;
}

const Products = ({ productData }: ProductsProps) => {
  return (
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
};

export default Products;
