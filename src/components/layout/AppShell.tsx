import { lazy, Suspense } from 'react';
import { EditorTabs } from '../editor/EditorTabs';
import { PageCountBanner } from './PageCountBanner';

const PreviewPane = lazy(() => import('./PreviewPane').then((m) => ({ default: m.PreviewPane })));

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
      <div className="flex-1 overflow-hidden flex flex-col">
        <PageCountBanner />
        <div className="flex-1 overflow-hidden">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                読み込み中...
              </div>
            }
          >
            <PreviewPane />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
