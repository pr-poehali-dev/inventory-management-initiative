import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface MovementsProps {
  productData: Array<{
    id: string;
    name: string;
    category: string;
    warehouse: string;
    quantity: number;
    status: string;
  }>;
  warehouseData: Array<{
    id: number;
    name: string;
    location: string;
    capacity: number;
    items: number;
  }>;
}

const Movements = ({ productData, warehouseData }: MovementsProps) => {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<{ file: File; url: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const openPreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewFile({ file, url });
  };

  const closePreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile.url);
      setPreviewFile(null);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Создать перемещение</CardTitle>
          <CardDescription>Перемещение товара между складами</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">Товар</Label>
            <Select>
              <SelectTrigger id="product">
                <SelectValue placeholder="Выберите товар" />
              </SelectTrigger>
              <SelectContent>
                {productData.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="from-warehouse">Откуда</Label>
            <Select>
              <SelectTrigger id="from-warehouse">
                <SelectValue placeholder="Склад отправления" />
              </SelectTrigger>
              <SelectContent>
                {warehouseData.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-warehouse">Куда</Label>
            <Select>
              <SelectTrigger id="to-warehouse">
                <SelectValue placeholder="Склад назначения" />
              </SelectTrigger>
              <SelectContent>
                {warehouseData.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Количество</Label>
            <Input id="quantity" type="number" placeholder="Введите количество" min="1" />
          </div>

          <div className="border-t pt-4 space-y-4">
            <div className="flex items-center gap-2">
              <Icon name="FileText" className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Документ-основание</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-type">Тип документа</Label>
              <Select>
                <SelectTrigger id="doc-type">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">Заказ на перемещение</SelectItem>
                  <SelectItem value="act">Акт перемещения</SelectItem>
                  <SelectItem value="invoice">Накладная</SelectItem>
                  <SelectItem value="request">Служебная записка</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="doc-number">Номер документа</Label>
                <Input id="doc-number" placeholder="№" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-date">Дата</Label>
                <Input id="doc-date" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsible">Ответственный</Label>
              <Input id="responsible" placeholder="ФИО ответственного лица" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload">Прикрепить скан-копии</Label>
              <div className="space-y-2">
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {attachedFiles.length > 0 && (
                  <div className="space-y-2">
                    {attachedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <button
                          onClick={() => openPreview(file)}
                          className="flex items-center gap-2 flex-1 min-w-0 text-left"
                        >
                          <Icon name={file.type.includes('pdf') ? 'FileText' : 'Image'} className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {(file.size / 1024).toFixed(1)} КБ
                          </span>
                        </button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                          className="ml-2 flex-shrink-0"
                        >
                          <Icon name="X" className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Примечание</Label>
            <Input id="notes" placeholder="Комментарий (необязательно)" />
          </div>

          <Button className="w-full">
            <Icon name="ArrowRightLeft" className="mr-2 h-4 w-4" />
            Создать перемещение
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Активные перемещения</CardTitle>
          <CardDescription>Текущие и запланированные операции</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Icon name="Truck" className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Офисное кресло Herman Miller</p>
                    <p className="text-sm text-muted-foreground">SKU002 • 5 единиц</p>
                  </div>
                  <Badge className="bg-blue-500">В пути</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Основной склад</span>
                  <Icon name="ArrowRight" className="h-4 w-4" />
                  <span>Склад №2</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">Отправлено: 27.10.2025 12:15</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Icon name="Check" className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="X" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Icon name="Clock" className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Принтер HP LaserJet Pro</p>
                    <p className="text-sm text-muted-foreground">SKU003 • 10 единиц</p>
                  </div>
                  <Badge className="bg-amber-500">Ожидает</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Склад №2</span>
                  <Icon name="ArrowRight" className="h-4 w-4" />
                  <span>Региональный склад</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">Запланировано: 28.10.2025 09:00</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Icon name="Play" className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="X" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border rounded-lg bg-green-500/5">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Icon name="CheckCircle2" className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Ноутбук Dell XPS 15</p>
                    <p className="text-sm text-muted-foreground">SKU001 • 15 единиц</p>
                  </div>
                  <Badge className="bg-green-500">Завершено</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Поставщик Tech Corp</span>
                  <Icon name="ArrowRight" className="h-4 w-4" />
                  <span>Основной склад</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">Получено: 27.10.2025 14:30</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!previewFile} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
              <Icon name={previewFile?.file.type.includes('pdf') ? 'FileText' : 'Image'} className="h-5 w-5" />
              {previewFile?.file.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-6 pt-4">
            {previewFile && (
              <div className="flex items-center justify-center h-full">
                {previewFile.file.type.includes('pdf') ? (
                  <iframe
                    src={previewFile.url}
                    className="w-full h-full border-0 rounded-lg"
                    title={previewFile.file.name}
                  />
                ) : (
                  <img
                    src={previewFile.url}
                    alt={previewFile.file.name}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Movements;