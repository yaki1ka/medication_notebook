import { Page, View, Text } from '@react-pdf/renderer';
import type { NotebookPage, DispensingPageConfig, DispensingColumn } from '../../../types/notebook';
import { sharedStyles, FONT_SIZE, LIVE_WIDTH } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';
import { PdfPageFrame } from '../shared/PdfPageFrame';

interface Props {
  page: NotebookPage;
  pageIndex?: number;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

const COLUMN_LABELS: Record<DispensingColumn, string> = {
  date: '調剤日',
  drugName: '薬品名',
  dosage: '用量',
  frequency: '用法',
  days: '日数',
  pharmacy: '薬局名',
  memo: 'メモ',
};

const COLUMN_BASE_WIDTHS: Record<DispensingColumn, number> = {
  date: 28,
  drugName: 55,
  dosage: 22,
  frequency: 30,
  days: 16,
  pharmacy: 40,
  memo: 35,
};

function computeColumnWidths(columns: DispensingColumn[]): Record<DispensingColumn, number> {
  const totalBase = columns.reduce((sum, col) => sum + COLUMN_BASE_WIDTHS[col], 0);
  const result: Partial<Record<DispensingColumn, number>> = {};
  columns.forEach((col) => {
    result[col] = Math.floor((COLUMN_BASE_WIDTHS[col] / totalBase) * LIVE_WIDTH);
  });
  return result as Record<DispensingColumn, number>;
}

export function PdfDispensingPage({ page, pageIndex, colors, theme }: Props) {
  const config = page.config as DispensingPageConfig;
  const columns = config.columns;
  const colWidths = computeColumnWidths(columns);
  const rowHeight = Math.max(12, Math.min(18, Math.floor(280 / config.rows)));

  const cellStyle = {
    padding: '1 2',
    fontSize: FONT_SIZE.tiny,
    borderRightWidth: 0.5,
    borderRightColor: colors.borderLight,
    borderRightStyle: 'solid' as const,
    justifyContent: 'center' as const,
  };
  const cellLastStyle = {
    padding: '1 2',
    fontSize: FONT_SIZE.tiny,
    flex: 1,
    justifyContent: 'center' as const,
  };

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} colors={colors} theme={theme} pageNumber={pageIndex}>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            borderStyle: 'solid',
            overflow: 'hidden',
            borderRadius: theme.tableRadius,
          }}
        >
          {/* Header row */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: colors.tableBg,
              borderBottomWidth: 0.5,
              borderBottomColor: colors.border,
              borderBottomStyle: 'solid',
            }}
          >
            {columns.map((col, i) => (
              <Text
                key={col}
                style={
                  i < columns.length - 1
                    ? [cellStyle, { width: colWidths[col], fontWeight: 700 }]
                    : [cellLastStyle, { fontWeight: 700 }]
                }
              >
                {COLUMN_LABELS[col]}
              </Text>
            ))}
          </View>

          {/* Data rows */}
          {Array.from({ length: config.rows }).map((_, rowIdx) => (
            <View
              key={rowIdx}
              wrap={false}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: colors.borderLight,
                borderBottomStyle: 'solid',
                minHeight: rowHeight,
              }}
            >
              {columns.map((col, colIdx) => (
                <Text
                  key={col}
                  style={
                    colIdx < columns.length - 1
                      ? [cellStyle, { width: colWidths[col], minHeight: rowHeight }]
                      : [cellLastStyle, { minHeight: rowHeight }]
                  }
                />
              ))}
            </View>
          ))}
        </View>

        <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, marginTop: 3 }}>
          ※ お薬の情報シール（薬情）を貼り付けるか、薬剤師に記入を依頼してください
        </Text>
      </PdfPageFrame>
    </Page>
  );
}
