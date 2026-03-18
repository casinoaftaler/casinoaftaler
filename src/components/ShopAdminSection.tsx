import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { ShopImageUpload } from "./ShopImageUpload";
import {
  useShopItems,
  useCreateShopItem,
  useUpdateShopItem,
  useDeleteShopItem,
  useUpdateShopItemPositions,
  type ShopItem,
} from "@/hooks/useShopItems";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createSortableArgs } from "@/lib/reactCompat";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface ShopItemFormData {
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  price: string;
  stock: string;
  external_url: string;
  is_active: boolean;
}

const defaultFormData: ShopItemFormData = {
  name: "",
  slug: "",
  description: "",
  image_url: null,
  price: "0 Points",
  stock: "0 STK",
  external_url: "",
  is_active: true,
};

interface SortableItemProps {
  item: ShopItem;
  onEdit: (item: ShopItem) => void;
  onDelete: (id: string) => void;
}

function SortableItem({ item, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable(createSortableArgs(item.id));

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="mb-2">
        <CardContent className="p-3 flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              className="h-12 w-16 object-cover rounded"
            />
          ) : (
            <div className="h-12 w-16 bg-muted rounded flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.price}</p>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`text-xs px-2 py-1 rounded ${
                item.is_active
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {item.is_active ? "Aktiv" : "Inaktiv"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(item)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ShopAdminSectionProps {
  embedded?: boolean;
}

export function ShopAdminSection({ embedded = false }: ShopAdminSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);
  const [formData, setFormData] = useState<ShopItemFormData>(defaultFormData);

  const { data: items, isLoading } = useShopItems(true);
  const createItem = useCreateShopItem();
  const updateItem = useUpdateShopItem();
  const deleteItem = useDeleteShopItem();
  const updatePositions = useUpdateShopItemPositions();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingItem ? prev.slug : generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      await updateItem.mutateAsync({
        id: editingItem.id,
        ...formData,
      });
    } else {
      await createItem.mutateAsync(formData);
    }

    setDialogOpen(false);
    setEditingItem(null);
    setFormData(defaultFormData);
  };

  const handleEdit = (item: ShopItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      image_url: item.image_url,
      price: item.price,
      stock: item.stock,
      external_url: item.external_url || "",
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Er du sikker på, at du vil slette dette produkt?")) {
      await deleteItem.mutateAsync(id);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && items) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      const positions = newItems.map((item, index) => ({
        id: item.id,
        position: index,
      }));

      await updatePositions.mutateAsync(positions);
    }
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setFormData(defaultFormData);
    setDialogOpen(true);
  };

  const content = (
    <div className="space-y-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={openAddDialog} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Tilføj Produkt
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Rediger Produkt" : "Tilføj Nyt Produkt"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Produkt Navn</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beskrivelse</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>

            <ShopImageUpload
              currentImageUrl={formData.image_url}
              onImageUploaded={(url) =>
                setFormData((prev) => ({ ...prev, image_url: url }))
              }
              onImageRemoved={() =>
                setFormData((prev) => ({ ...prev, image_url: null }))
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Pris</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="40000 Points"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Lager</Label>
                <Input
                  id="stock"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, stock: e.target.value }))
                  }
                  placeholder="20 STK"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="external_url">Ekstern Link (Køb URL)</Label>
              <Input
                id="external_url"
                type="url"
                value={formData.external_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    external_url: e.target.value,
                  }))
                }
                placeholder="https://example.com/buy"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">Aktiv</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_active: checked }))
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={createItem.isPending || updateItem.isPending}
            >
              {(createItem.isPending || updateItem.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {editingItem ? "Gem Ændringer" : "Opret Produkt"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : items && items.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <p className="text-center text-muted-foreground py-4">
          Ingen produkter endnu. Tilføj dit første produkt ovenfor.
        </p>
      )}
    </div>
  );

  if (embedded) {
    return <Card><CardContent className="pt-6">{content}</CardContent></Card>;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-4 h-auto">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-semibold">Butik Administration</span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4">
        {content}
      </CollapsibleContent>
    </Collapsible>
  );
}
