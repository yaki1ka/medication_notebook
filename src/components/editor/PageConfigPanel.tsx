import type { NotebookPage, DispensingColumn, DispensingPageConfig } from '../../types/notebook';
import { useNotebookStore } from '../../store/notebookStore';

interface Props {
  page: NotebookPage;
}

const labelClass = 'text-xs text-gray-600';
const sectionClass = 'mb-3';
const sectionTitle = 'text-xs font-bold text-gray-700 mb-2';

const COLUMN_LABELS: Record<DispensingColumn, string> = {
  date: '調剤日',
  drugName: '薬品名',
  dosage: '用量',
  frequency: '用法',
  days: '日数',
  pharmacy: '薬局名',
  memo: 'メモ',
};
const ALL_COLUMNS: DispensingColumn[] = ['date', 'drugName', 'dosage', 'frequency', 'days', 'pharmacy', 'memo'];

function RowSlider({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className={labelClass}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="text-xs font-mono w-6 text-center">{value}</span>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 mb-1 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className={labelClass}>{label}</span>
    </label>
  );
}

export function PageConfigPanel({ page }: Props) {
  const { updatePageConfig, updatePageTitle } = useNotebookStore();

  const update = (patch: Record<string, unknown>) => {
    updatePageConfig(page.id, patch as any);
  };

  return (
    <div className="p-3 border-t border-gray-200 bg-blue-50 rounded-b">
      <div className="mb-2">
        <label className={labelClass}>ページタイトル</label>
        <input
          type="text"
          value={page.title}
          onChange={(e) => updatePageTitle(page.id, e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs mt-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {page.kind === 'cover' && (
        <div className={sectionClass}>
          <div className={sectionTitle}>カバーページ設定</div>
          <div className="flex items-center gap-2 mb-1">
            <span className={labelClass}>アクセントカラー</span>
            <input
              type="color"
              value={(page.config as any).accentColor || '#2563eb'}
              onChange={(e) => update({ accentColor: e.target.value })}
              className="w-8 h-6 cursor-pointer rounded"
            />
          </div>
          <Toggle
            label="作成日欄を表示"
            checked={(page.config as any).showIssuedDate}
            onChange={(v) => update({ showIssuedDate: v })}
          />
        </div>
      )}

      {page.kind === 'personalInfo' && (
        <div className={sectionClass}>
          <div className={sectionTitle}>基本情報ページ設定</div>
          <Toggle
            label="血液型欄を表示"
            checked={(page.config as any).showBloodType}
            onChange={(v) => update({ showBloodType: v })}
          />
          <Toggle
            label="かかりつけ医欄を表示"
            checked={(page.config as any).showFamilyDoctor}
            onChange={(v) => update({ showFamilyDoctor: v })}
          />
          <Toggle
            label="緊急連絡先を表示"
            checked={(page.config as any).showEmergencyContacts}
            onChange={(v) => update({ showEmergencyContacts: v })}
          />
          {(page.config as any).showEmergencyContacts && (
            <RowSlider
              label="連絡先スロット数"
              value={(page.config as any).emergencyContactSlots}
              min={1}
              max={4}
              onChange={(v) => update({ emergencyContactSlots: v })}
            />
          )}
        </div>
      )}

      {page.kind === 'allergy' && (
        <div className={sectionClass}>
          <div className={sectionTitle}>アレルギー記録ページ設定</div>
          <RowSlider
            label="行数"
            value={(page.config as any).rows}
            min={4}
            max={16}
            onChange={(v) => update({ rows: v })}
          />
          <Toggle
            label="確認日列を表示"
            checked={(page.config as any).showDateColumn}
            onChange={(v) => update({ showDateColumn: v })}
          />
          <Toggle
            label="重症度列を表示"
            checked={(page.config as any).showSeverityColumn}
            onChange={(v) => update({ showSeverityColumn: v })}
          />
        </div>
      )}

      {page.kind === 'medicalHistory' && (
        <div className={sectionClass}>
          <div className={sectionTitle}>既往歴ページ設定</div>
          <RowSlider
            label="行数"
            value={(page.config as any).rows}
            min={4}
            max={16}
            onChange={(v) => update({ rows: v })}
          />
          <Toggle
            label="発症時期列を表示"
            checked={(page.config as any).showOnsetDateColumn}
            onChange={(v) => update({ showOnsetDateColumn: v })}
          />
          <Toggle
            label="医療機関列を表示"
            checked={(page.config as any).showHospitalColumn}
            onChange={(v) => update({ showHospitalColumn: v })}
          />
        </div>
      )}

      {page.kind === 'dispensing' && (
        <div className={sectionClass}>
          <div className={sectionTitle}>調剤記録ページ設定</div>
          <RowSlider
            label="行数"
            value={(page.config as any).rows}
            min={6}
            max={20}
            onChange={(v) => update({ rows: v })}
          />
          <div className="mt-1">
            <div className={labelClass + ' mb-1'}>表示する列</div>
            {ALL_COLUMNS.map((col) => {
              const isChecked = (page.config as DispensingPageConfig).columns.includes(col);
              const columns = (page.config as DispensingPageConfig).columns;
              return (
                <Toggle
                  key={col}
                  label={COLUMN_LABELS[col]}
                  checked={isChecked}
                  onChange={(checked) => {
                    const newCols = checked
                      ? ALL_COLUMNS.filter((c) => columns.includes(c) || c === col)
                      : columns.filter((c) => c !== col);
                    if (newCols.length > 0) {
                      update({ columns: newCols });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {page.kind === 'doctorPharmacy' && (
        <div className={sectionClass}>
          <div className={sectionTitle}>かかりつけ医・薬局ページ設定</div>
          <RowSlider
            label="担当医スロット数"
            value={(page.config as any).doctorSlots}
            min={1}
            max={4}
            onChange={(v) => update({ doctorSlots: v })}
          />
          <RowSlider
            label="薬局スロット数"
            value={(page.config as any).pharmacySlots}
            min={1}
            max={4}
            onChange={(v) => update({ pharmacySlots: v })}
          />
        </div>
      )}

      {page.kind === 'notes' && (
        <div className={sectionClass}>
          <div className={sectionTitle}>メモページ設定</div>
          <RowSlider
            label="行数"
            value={(page.config as any).lineCount}
            min={10}
            max={30}
            onChange={(v) => update({ lineCount: v })}
          />
          <div className="mb-1">
            <span className={labelClass}>罫線スタイル</span>
            <div className="flex gap-2 mt-1">
              {(['ruled', 'blank', 'dotted'] as const).map((style) => (
                <label key={style} className="flex items-center gap-1 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name={`gridStyle-${page.id}`}
                    value={style}
                    checked={(page.config as any).gridStyle === style}
                    onChange={() => update({ gridStyle: style })}
                  />
                  {style === 'ruled' ? '横罫線' : style === 'blank' ? '無地' : '点線'}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
