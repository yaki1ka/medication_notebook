import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useNotebookStore } from '../../store/notebookStore';
import { PageListItem } from './PageListItem';
import { AddPageMenu } from './AddPageMenu';

export function PageList() {
  const { pages, reorderPages } = useNotebookStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderPages(active.id as string, over.id as string);
    }
  };

  return (
    <div className="p-3">
      <p className="text-xs text-gray-500 mb-3">
        ドラッグでページ順を変更できます。🔒のページは削除できません。
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={pages.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          {pages.map((page) => (
            <PageListItem key={page.id} page={page} />
          ))}
        </SortableContext>
      </DndContext>

      <div className="mt-3">
        <AddPageMenu />
      </div>
    </div>
  );
}
