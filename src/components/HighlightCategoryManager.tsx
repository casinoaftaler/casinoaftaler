import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useHighlightCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useUpdateCategoryPositions,
  type HighlightCategory,
} from "@/hooks/useHighlightCategories";
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Check,
  X,
  Loader2,
  Tags,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { createSortableArgs } from "@/lib/reactCompat";

interface SortableCategoryItemProps {
  category: HighlightCategory;
  onEdit: (category: HighlightCategory) => void;
  onDelete: (id: string) => void;
  editingId: string | null;
  editingName: string;
  setEditingName: (name: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  isUpdating: boolean;
}

function SortableCategoryItem({
  category,
  onEdit,
  onDelete,
  editingId,
  editingName,
  setEditingName,
  onSaveEdit,
  onCancelEdit,
  isUpdating,
}: SortableCategoryItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isEditing = editingId === category.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-md border bg-card p-2"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {isEditing ? (
        <>
          <Input
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            className="h-8 flex-1"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onSaveEdit}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4 text-primary" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onCancelEdit}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <span className="flex-1 text-sm font-medium">{category.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(category)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDelete(category.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </>
      )}
    </div>
  );
}

export function HighlightCategoryManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const { data: categories, isLoading } = useHighlightCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const updatePositions = useUpdateCategoryPositions();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    await createCategory.mutateAsync(newCategoryName.trim());
    setNewCategoryName("");
  };

  const handleEdit = (category: HighlightCategory) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingName.trim()) return;
    await updateCategory.mutateAsync({ id: editingId, name: editingName.trim() });
    setEditingId(null);
    setEditingName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Er du sikker på, at du vil slette denne kategori?")) {
      await deleteCategory.mutateAsync(id);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && categories) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);
      const newItems = arrayMove(categories, oldIndex, newIndex);

      const positions = newItems.map((item, index) => ({
        id: item.id,
        position: index,
      }));

      await updatePositions.mutateAsync(positions);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="mb-4">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer py-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <Tags className="h-4 w-4" />
                Kategorier
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-3 pt-0">
            <div className="flex gap-2">
              <Input
                placeholder="Ny kategori..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                className="h-9"
              />
              <Button
                size="sm"
                onClick={handleAddCategory}
                disabled={createCategory.isPending || !newCategoryName.trim()}
              >
                {createCategory.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : categories && categories.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={categories.map((cat) => cat.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <SortableCategoryItem
                        key={category.id}
                        category={category}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        editingId={editingId}
                        editingName={editingName}
                        setEditingName={setEditingName}
                        onSaveEdit={handleSaveEdit}
                        onCancelEdit={handleCancelEdit}
                        isUpdating={updateCategory.isPending}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <p className="text-center text-sm text-muted-foreground py-2">
                Ingen kategorier endnu.
              </p>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
