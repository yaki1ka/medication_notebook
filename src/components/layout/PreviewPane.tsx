import { useState, useCallback, useEffect, useRef } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PdfDocument } from '../pdf/PdfDocument';
import { useDebouncedPdf } from '../../hooks/useDebouncedPdf';
import { useUiStore } from '../../store/uiStore';
import { useNotebookStore } from '../../store/notebookStore';

export function PreviewPane() {
  const debouncedState = useDebouncedPdf(1200);
  const { isExporting, setExporting } = useUiStore();
  const { personalInfo } = useNotebookStore();
  const [resetConfirm, setResetConfirm] = useState(false);
  const { resetToDefaults } = useNotebookStore();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const urlRef = useRef<string | null>(null);

  // Async PDF generation
  useEffect(() => {
    let cancelled = false;
    setIsRendering(true);

    pdf(<PdfDocument state={debouncedState} />)
      .toBlob()
      .then((blob) => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = url;
        setPdfUrl(url);
        setIsRendering(false);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('PDF render error:', err);
          setIsRendering(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedState]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

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
          {isRendering && (
            <span className="text-xs text-blue-500 animate-pulse">更新中...</span>
          )}
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
                <span className="animate-spin inline-block">⟳</span>
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

      {/* PDF Viewer area */}
      <div className="flex-1 overflow-hidden relative">
        {pdfUrl && (
          <iframe
            key={pdfUrl}
            src={pdfUrl}
            className="w-full h-full border-0"
            title="PDF プレビュー"
          />
        )}
        {isRendering && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80">
            <div className="text-center">
              <div className="text-2xl mb-2 animate-spin inline-block">⟳</div>
              <p className="text-sm text-gray-600">PDFを生成中...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
