import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface HistoryProps {
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

const History = ({ movementHistory }: HistoryProps) => {
  return (
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
};

export default History;
