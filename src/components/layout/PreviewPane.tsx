import { useState, useCallback } from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { PdfDocument } from '../pdf/PdfDocument';
import { useDebouncedPdf } from '../../hooks/useDebouncedPdf';
import { useUiStore } from '../../store/uiStore';
import { useNotebookStore } from '../../store/notebookStore';

export function PreviewPane() {
  const debouncedState = useDebouncedPdf(800);
  const { isExporting, setExporting } = useUiStore();
  const { personalInfo } = useNotebookStore();
  const [resetConfirm, setResetConfirm] = useState(false);
  const { resetToDefaults } = useNotebookStore();

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      const blob = await pdf(<PdfDocument state={debouncedState} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `お薬手帳_${personalInfo.name || '未記入'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('PDFの生成に失敗しました。');
    } finally {
      setExporting(false);
    }
  }, [debouncedState, personalInfo.name, setExporting]);

  const handleReset = () => {
    if (resetConfirm) {
      resetToDefaults();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">プレビュー</span>
          <span className="text-xs text-gray-400">A6サイズ (105×148mm)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className={`text-xs px-3 py-1.5 rounded border transition-colors ${
              resetConfirm
                ? 'bg-red-100 border-red-400 text-red-700 hover:bg-red-200'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {resetConfirm ? '本当にリセット？' : 'リセット'}
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="text-sm px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded font-medium flex items-center gap-1"
          >
            {isExporting ? (
              <>
                <span className="animate-spin">⟳</span>
                <span>生成中...</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>PDFをダウンロード</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        <PDFViewer
          width="100%"
          height="100%"
          showToolbar={false}
          style={{ border: 'none' }}
        >
          <PdfDocument state={debouncedState} />
        </PDFViewer>
      </div>
    </div>
  );
}
