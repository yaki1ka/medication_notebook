import { useRef } from 'react';
import { useNotebookStore } from '../../store/notebookStore';
import type { DesignTheme, ColorMode, NotebookState } from '../../types/notebook';

const PRESET_COLORS = [
  { label: 'ブルー', value: '#2563eb' },
  { label: 'レッド', value: '#dc2626' },
  { label: 'グリーン', value: '#16a34a' },
  { label: 'パープル', value: '#7c3aed' },
  { label: 'オレンジ', value: '#ea580c' },
  { label: 'ティール', value: '#0891b2' },
];

const THEMES: { value: DesignTheme; label: string; desc: string }[] = [
  { value: 'basic', label: 'ベーシック', desc: '角張ったシンプルなデザイン' },
  { value: 'rounded', label: 'まるみ', desc: '丸みのある柔らかいデザイン' },
  { value: 'kids', label: 'キッズ', desc: '子供向けの可愛いデザイン' },
];

const labelClass = 'text-xs text-gray-600';
const sectionClass = 'mb-5';
const sectionTitle = 'text-sm font-bold text-gray-700 border-b border-blue-100 pb-1 mb-3';

export function GlobalSettings() {
  const {
    accentColor,
    colorMode,
    designTheme,
    updateAccentColor,
    setColorMode,
    setDesignTheme,
    notebookTitle,
    personalInfo,
    pages,
    loadFromExport,
  } = useNotebookStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Export ---
  const handleExport = () => {
    const data: Partial<NotebookState> = {
      notebookTitle,
      personalInfo,
      pages,
      accentColor,
      colorMode,
      designTheme,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    a.href = url;
    a.download = `okusuri_data_${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Import ---
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as Partial<NotebookState>;
        if (!data || typeof data !== 'object') throw new Error('無効なデータです');
        if (!confirm('現在のデータを上書きしますか？この操作は元に戻せません。')) return;
        loadFromExport(data);
        alert('インポートしました！');
      } catch {
        alert('ファイルの読み込みに失敗しました。正しいJSONファイルを選択してください。');
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  return (
    <div className="p-3">
      {/* Design Theme */}
      <div className={sectionClass}>
        <div className={sectionTitle}>デザインテーマ</div>
        <div className="space-y-1">
          {THEMES.map(({ value, label, desc }) => (
            <label
              key={value}
              className={`flex items-start gap-2 p-2 rounded border cursor-pointer transition-colors ${
                designTheme === value
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <input
                type="radio"
                name="designTheme"
                value={value}
                checked={designTheme === value}
                onChange={() => setDesignTheme(value)}
                className="mt-0.5"
              />
              <div>
                <div className="text-xs font-medium text-gray-800">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div className={sectionClass}>
        <div className={sectionTitle}>アクセントカラー</div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => updateAccentColor(e.target.value)}
            className="w-10 h-8 cursor-pointer rounded border border-gray-300"
          />
          <span className={labelClass}>{accentColor}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_COLORS.map(({ label, value }) => (
            <button
              key={value}
              title={label}
              onClick={() => updateAccentColor(value)}
              className="w-7 h-7 rounded border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: value,
                borderColor: accentColor === value ? '#1e40af' : 'transparent',
              }}
            />
          ))}
        </div>
      </div>

      {/* Color Mode */}
      <div className={sectionClass}>
        <div className={sectionTitle}>印刷カラーモード</div>
        <div className="space-y-1">
          {([
            { value: 'color', label: 'カラー印刷', desc: '選択した色でカラー印刷' },
            { value: 'monochrome', label: '白黒印刷', desc: '白黒・グレースケール印刷用' },
          ] as { value: ColorMode; label: string; desc: string }[]).map(({ value, label, desc }) => (
            <label
              key={value}
              className={`flex items-start gap-2 p-2 rounded border cursor-pointer transition-colors ${
                colorMode === value
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <input
                type="radio"
                name="colorMode"
                value={value}
                checked={colorMode === value}
                onChange={() => setColorMode(value)}
                className="mt-0.5"
              />
              <div>
                <div className="text-xs font-medium text-gray-800">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Export / Import */}
      <div className={sectionClass}>
        <div className={sectionTitle}>データ管理</div>
        <p className="text-xs text-gray-500 mb-3">
          入力データをファイルに保存したり、別の端末や2冊目の作成時に読み込めます。
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleExport}
            className="w-full py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded font-medium"
          >
            📤 データをエクスポート
          </button>
          <button
            onClick={handleImportClick}
            className="w-full py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded font-medium"
          >
            📥 データをインポート
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
