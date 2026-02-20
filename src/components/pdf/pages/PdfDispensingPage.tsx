import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { NotebookPage, DispensingPageConfig, DispensingColumn } from '../../../types/notebook';
import { sharedStyles, COLORS, FONT_SIZE, LIVE_WIDTH } from '../PdfStyles';
import { PdfPageFrame } from '../shared/PdfPageFrame';

interface Props {
  page: NotebookPage;
  pageIndex?: number;
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

// Base width proportions (will be normalized to LIVE_WIDTH)
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

const styles = StyleSheet.create({
  tableWrapper: {
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    borderBottomStyle: 'solid',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderLight,
    borderBottomStyle: 'solid',
  },
  cell: {
    padding: '1 2',
    fontSize: FONT_SIZE.tiny,
    borderRightWidth: 0.5,
    borderRightColor: COLORS.borderLight,
    borderRightStyle: 'solid',
    justifyContent: 'center',
  },
  cellLast: {
    padding: '1 2',
    fontSize: FONT_SIZE.tiny,
    flex: 1,
    justifyContent: 'center',
  },
  note: {
    fontSize: FONT_SIZE.tiny,
    color: COLORS.textLight,
    marginTop: 3,
  },
});

export function PdfDispensingPage({ page, pageIndex }: Props) {
  const config = page.config as DispensingPageConfig;
  const accentColor = (page.config as any).accentColor;
  const columns = config.columns;
  const colWidths = computeColumnWidths(columns);

  // Calculate row height to fit within A6 page
  // Available height ≈ 419 - 40 (header) - 40 (margins) = ~340pt
  // Table header = 16, footer note = 10, sectionHeader = 15
  // Available for rows = 340 - 16 - 15 - 10 = ~300pt
  const rowHeight = Math.max(12, Math.min(18, Math.floor(280 / config.rows)));

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} accentColor={accentColor} pageNumber={pageIndex}>
        <View style={styles.tableWrapper}>
          {/* Header row */}
          <View style={styles.headerRow}>
            {columns.map((col, i) => (
              <Text
                key={col}
                style={
                  i < columns.length - 1
                    ? [styles.cell, { width: colWidths[col], fontWeight: 700 }]
                    : [styles.cellLast, { fontWeight: 700 }]
                }
              >
                {COLUMN_LABELS[col]}
              </Text>
            ))}
          </View>

          {/* Data rows */}
          {Array.from({ length: config.rows }).map((_, rowIdx) => (
            <View key={rowIdx} style={[styles.row, { minHeight: rowHeight }]}>
              {columns.map((col, colIdx) => (
                <Text
                  key={col}
                  style={
                    colIdx < columns.length - 1
                      ? [styles.cell, { width: colWidths[col], minHeight: rowHeight }]
                      : [styles.cellLast, { minHeight: rowHeight }]
                  }
                />
              ))}
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          ※ お薬の情報シール（薬情）を貼り付けるか、薬剤師に記入を依頼してください
        </Text>
      </PdfPageFrame>
    </Page>
  );
}
