import { useState } from 'react';
import type { PageKind } from '../../types/notebook';
import { useNotebookStore } from '../../store/notebookStore';
import { defaultTitles } from '../../templates';

const PAGE_KINDS: PageKind[] = [
  'dispensing',
  'allergy',
  'medicalHistory',
  'personalInfo',
  'doctorPharmacy',
  'notes',
  'cover',
];

const PAGE_DESCRIPTIONS: Record<PageKind, string> = {
  dispensing: 'お薬の調剤記録表',
  allergy: 'アレルギー・副作用の記録',
  medicalHistory: '既往歴・持病の記録',
  personalInfo: '氏名・住所などの基本情報',
  doctorPharmacy: 'かかりつけ医・薬局情報',
  notes: '自由記述のメモページ',
  cover: '手帳の表紙',
};

export function AddPageMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { addPage } = useNotebookStore();

  const handleAdd = (kind: PageKind) => {
    addPage(kind);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 px-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center gap-1"
      >
        <span className="text-lg leading-none">+</span>
        <span>ページを追加</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50">
          {PAGE_KINDS.map((kind) => (
            <button
              key={kind}
              onClick={() => handleAdd(kind)}
              className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="text-sm font-medium text-gray-800">{defaultTitles[kind]}</div>
              <div className="text-xs text-gray-500">{PAGE_DESCRIPTIONS[kind]}</div>
            </button>
          ))}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-1 text-xs text-gray-400 hover:text-gray-600"
          >
            キャンセル
          </button>
        </div>
      )}
    </div>
  );
}
