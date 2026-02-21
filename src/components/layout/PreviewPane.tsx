import { useState, useCallback, useEffect, useRef } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PdfDocument } from '../pdf/PdfDocument';
import { useUiStore } from '../../store/uiStore';
import { useNotebookStore } from '../../store/notebookStore';
import type { NotebookState } from '../../types/notebook';

function getStoreSnapshot(): NotebookState {
  const s = useNotebookStore.getState();
  return {
    notebookTitle: s.notebookTitle,
    personalInfo: s.personalInfo,
    pages: s.pages,
    accentColor: s.accentColor,
    colorMode: s.colorMode,
    designTheme: s.designTheme,
  };
}

export function PreviewPane() {
  const { isExporting, setExporting } = useUiStore();
  const { personalInfo, resetToDefaults } = useNotebookStore();
  const [resetConfirm, setResetConfirm] = useState(false);

  const [previewState, setPreviewState] = useState<NotebookState | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const urlRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const handleRefresh = useCallback(() => {
    setPreviewState(getStoreSnapshot());
  }, []);

  // Auto-generate on first mount
  useEffect(() => {
    setPreviewState(getStoreSnapshot());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate PDF whenever previewState is updated
  useEffect(() => {
    if (!previewState) return;
    let cancelled = false;
    setIsRendering(true);
    setPdfError(null);
    setElapsed(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setElapsed((s) => s + 1), 1000);

    pdf(<PdfDocument state={previewState} />)
      .toBlob()
      .then((blob) => {
        if (cancelled) return;
        if (timerRef.current) clearInterval(timerRef.current);
        const url = URL.createObjectURL(blob);
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = url;
        setPdfUrl(url);
        setIsRendering(false);
      })
      .catch((err) => {
        if (!cancelled) {
          if (timerRef.current) clearInterval(timerRef.current);
          console.error('PDF render error:', err);
          setPdfError(err instanceof Error ? err.message : String(err));
          setIsRendering(false);
        }
      });

    return () => {
      cancelled = true;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [previewState]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      const state = previewState ?? getStoreSnapshot();
      const blob = await pdf(<PdfDocument state={state} />).toBlob();
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
  }, [previewState, personalInfo.name, setExporting]);

  const handleReset = () => {
    if (resetConfirm) {
      resetToDefaults();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
    }
  };

  // Progress bar width: fills to 90% over ~15s, then holds
  const progressWidth = isRendering ? `${Math.min((elapsed / 15) * 90, 90)}%` : '0%';

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
            onClick={handleRefresh}
            disabled={isRendering}
            className="text-sm px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white rounded font-medium transition-colors"
          >
            プレビュー更新
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

      {/* Progress bar */}
      <div className="h-1 bg-gray-200 shrink-0">
        <div
          className="h-full bg-emerald-500 transition-all duration-1000"
          style={{ width: progressWidth }}
        />
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
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              pdfUrl ? 'bg-white bg-opacity-75' : 'bg-gray-50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2 animate-spin inline-block">⟳</div>
              <p className="text-sm text-gray-600">PDFを生成中...</p>
              {elapsed > 0 && (
                <p className="text-xs text-gray-400 mt-1">{elapsed}秒経過</p>
              )}
            </div>
          </div>
        )}
        {!isRendering && pdfError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6 max-w-sm">
              <p className="text-red-600 text-sm font-medium mb-2">PDFの生成に失敗しました</p>
              <p className="text-gray-500 text-xs break-all mb-3">{pdfError}</p>
              <button
                onClick={() => setPdfError(null)}
                className="text-xs text-blue-500 underline"
              >
                閉じる
              </button>
            </div>
          </div>
        )}
        {!isRendering && !pdfError && !pdfUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">プレビューがありません</p>
              <button
                onClick={handleRefresh}
                className="text-sm px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium"
              >
                プレビューを生成
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
