import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useHighlights,
  useCreateHighlight,
  useUpdateHighlight,
  useDeleteHighlight,
  useUpdateHighlightPositions,
  type Highlight,
} from "@/hooks/useHighlights";
import { useHighlightCategories } from "@/hooks/useHighlightCategories";
import { HighlightCategoryManager } from "@/components/HighlightCategoryManager";
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Video,
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

function detectPlatform(url: string): "youtube" | "twitch" {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  return "twitch";
}

interface HighlightFormData {
  title: string;
  url: string;
  platform: string;
  description: string;
  thumbnail_url: string;
  is_active: boolean;
  category_id: string | null;
  categoryIds: string[];
}

const defaultFormData: HighlightFormData = {
  title: "",
  url: "",
  platform: "youtube",
  description: "",
  thumbnail_url: "",
  is_active: true,
  category_id: null,
  categoryIds: [],
};

interface SortableItemProps {
  item: Highlight;
  onEdit: (item: Highlight) => void;
  onDelete: (id: string) => void;
}

function SortableItem({ item, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const platform = detectPlatform(item.url);

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="mb-2">
        <CardContent className="p-3 flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-12 w-16 bg-muted rounded flex items-center justify-center">
            <Video className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{item.title}</p>
          <div className="flex items-center gap-2 mt-1">
              <Badge variant={platform === "youtube" ? "destructive" : "secondary"} className="text-xs">
                {platform === "youtube" ? "YouTube" : "Twitch"}
              </Badge>
              {item.categories && item.categories.length > 0 ? (
                item.categories.map((cat) => (
                  <Badge key={cat.id} variant="outline" className="text-xs">
                    {cat.name}
                  </Badge>
                ))
              ) : item.highlight_categories && (
                <Badge variant="outline" className="text-xs">
                  {item.highlight_categories.name}
                </Badge>
              )}
            </div>
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

export function HighlightsAdminSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Highlight | null>(null);
  const [formData, setFormData] = useState<HighlightFormData>(defaultFormData);

  const { data: items, isLoading } = useHighlights(true);
  const { data: categories } = useHighlightCategories();
  const createItem = useCreateHighlight();
  const updateItem = useUpdateHighlight();
  const deleteItem = useDeleteHighlight();
  const updatePositions = useUpdateHighlightPositions();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleUrlChange = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      url,
      platform: detectPlatform(url),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      url: formData.url,
      platform: detectPlatform(formData.url),
      description: formData.description || null,
      thumbnail_url: formData.thumbnail_url || null,
      is_active: formData.is_active,
      category_id: formData.categoryIds.length > 0 ? formData.categoryIds[0] : null, // Legacy field
      categoryIds: formData.categoryIds,
    };

    if (editingItem) {
      await updateItem.mutateAsync({
        id: editingItem.id,
        ...payload,
      });
    } else {
      await createItem.mutateAsync(payload);
    }

    setDialogOpen(false);
    setEditingItem(null);
    setFormData(defaultFormData);
  };

  const handleEdit = (item: Highlight) => {
    setEditingItem(item);
    // Get category IDs from the new categories array or fall back to legacy category_id
    const categoryIds = item.categories?.map(c => c.id) || 
      (item.category_id ? [item.category_id] : []);
    
    setFormData({
      title: item.title,
      url: item.url,
      platform: item.platform,
      description: item.description || "",
      thumbnail_url: item.thumbnail_url || "",
      is_active: item.is_active,
      category_id: item.category_id,
      categoryIds,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Er du sikker på, at du vil slette dette highlight?")) {
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

  return (
    <div className="space-y-4">
      <HighlightCategoryManager />
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Tilføj Highlight
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Rediger Highlight" : "Tilføj Nyt Highlight"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Video URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... , /shorts/... eller https://clips.twitch.tv/..."
                    required
                  />
                  {formData.url && (
                    <Badge variant={detectPlatform(formData.url) === "youtube" ? "destructive" : "secondary"}>
                      {detectPlatform(formData.url) === "youtube" ? "YouTube" : "Twitch"}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Kategorier (valgfrit)</Label>
                  <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                    {categories && categories.length > 0 ? (
                      categories.map((cat) => (
                        <div key={cat.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cat-${cat.id}`}
                            checked={formData.categoryIds.includes(cat.id)}
                            onCheckedChange={(checked) => {
                              setFormData((prev) => ({
                                ...prev,
                                categoryIds: checked
                                  ? [...prev.categoryIds, cat.id]
                                  : prev.categoryIds.filter((id) => id !== cat.id),
                              }));
                            }}
                          />
                          <label
                            htmlFor={`cat-${cat.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {cat.name}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Ingen kategorier oprettet endnu
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Beskrivelse (valgfrit)</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="thumbnail_url">Thumbnail URL (valgfrit)</Label>
                  <Input
                    id="thumbnail_url"
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        thumbnail_url: e.target.value,
                      }))
                    }
                    placeholder="Efterlad tom for automatisk thumbnail"
                  />
                  <p className="text-xs text-muted-foreground">
                    Efterlad tom for automatisk generering fra YouTube/Twitch
                  </p>
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
                  {editingItem ? "Gem Ændringer" : "Opret Highlight"}
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
              Ingen highlights endnu. Tilføj dit første highlight ovenfor.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
