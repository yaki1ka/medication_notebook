import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { NotebookPage } from '../../types/notebook';
import { useUiStore } from '../../store/uiStore';
import { useNotebookStore } from '../../store/notebookStore';
import { PageConfigPanel } from './PageConfigPanel';

interface Props {
  page: NotebookPage;
}

const PAGE_ICONS: Record<string, string> = {
  cover: '📖',
  personalInfo: '👤',
  allergy: '⚠️',
  medicalHistory: '🏥',
  dispensing: '💊',
  doctorPharmacy: '🩺',
  notes: '📝',
};

export function PageListItem({ page }: Props) {
  const { selectedPageId, selectPage } = useUiStore();
  const { removePage } = useNotebookStore();
  const isSelected = selectedPageId === page.id;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: page.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-1">
      <div
        className={`border rounded cursor-pointer transition-colors ${
          isSelected
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-200 bg-white hover:border-blue-200'
        }`}
        onClick={() => selectPage(isSelected ? null : page.id)}
      >
        <div className="flex items-center gap-2 px-2 py-2">
          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing select-none touch-none"
            onClick={(e) => e.stopPropagation()}
          >
            ⠿
          </div>

          {/* Icon */}
          <span className="text-base">{PAGE_ICONS[page.kind] || '📄'}</span>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-800 truncate">{page.title}</div>
            {page.required && (
              <div className="text-xs text-gray-400">必須ページ</div>
            )}
          </div>

          {/* Delete button */}
          {!page.required && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePage(page.id);
              }}
              className="text-gray-300 hover:text-red-400 text-sm px-1"
              title="削除"
            >
              ✕
            </button>
          )}

          {/* Lock icon for required pages */}
          {page.required && (
            <span className="text-gray-300 text-xs">🔒</span>
          )}

          {/* Expand arrow */}
          <span className={`text-gray-400 text-xs transition-transform ${isSelected ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {/* Config panel */}
      {isSelected && <PageConfigPanel page={page} />}
    </div>
  );
}
