import { useEffect, useState } from 'react';
import { useNotebookStore } from '../../store/notebookStore';

export function PageCountBanner() {
  const { pages, addMultiplePages } = useNotebookStore();
  const [dismissed, setDismissed] = useState(false);

  const count = pages.length;
  const remainder = count % 4;
  const needed = remainder === 0 ? 0 : 4 - remainder;

  // Reset dismissed state when page count changes
  useEffect(() => {
    setDismissed(false);
  }, [count]);

  if (needed === 0 || dismissed) return null;

  const handleAdd = () => {
    addMultiplePages('dispensing', needed);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border-b border-amber-200 text-sm shrink-0">
      <span className="text-amber-600 font-medium">📋</span>
      <span className="text-amber-800 flex-1">
        現在 <strong>{count}</strong> ページです。4の倍数にするには調剤記録を{' '}
        <strong>{needed}</strong> ページ追加してください。
      </span>
      <button
        onClick={handleAdd}
        className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1 rounded font-medium"
      >
        OK・追加
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="text-amber-400 hover:text-amber-600 text-xs px-1"
        title="閉じる"
      >
        ✕
      </button>
    </div>
  );
}
