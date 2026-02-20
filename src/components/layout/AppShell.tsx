import { EditorTabs } from '../editor/EditorTabs';
import { PreviewPane } from './PreviewPane';

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar / Editor */}
      <div
        className="w-[380px] shrink-0 flex flex-col bg-white border-r border-gray-200 shadow-sm overflow-hidden"
        style={{ minWidth: '320px', maxWidth: '420px' }}
      >
        {/* App header */}
        <div className="px-4 py-3 bg-blue-700 shrink-0">
          <h1 className="text-white font-bold text-base leading-tight">お薬手帳ビルダー</h1>
          <p className="text-blue-200 text-xs mt-0.5">カスタマイズして印刷用PDFを作成</p>
        </div>

        {/* Editor tabs */}
        <div className="flex-1 overflow-hidden">
          <EditorTabs />
        </div>
      </div>

      {/* Preview panel */}
      <div className="flex-1 overflow-hidden">
        <PreviewPane />
      </div>
    </div>
  );
}
