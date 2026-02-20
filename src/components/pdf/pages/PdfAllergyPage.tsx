import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { NotebookPage, AllergyPageConfig } from '../../../types/notebook';
import { sharedStyles, COLORS, FONT_SIZE } from '../PdfStyles';
import { PdfPageFrame } from '../shared/PdfPageFrame';
import { PdfSectionHeader } from '../shared/PdfSectionHeader';

interface Props {
  page: NotebookPage;
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
    minHeight: 14,
  },
  cell: {
    padding: '2 3',
    fontSize: FONT_SIZE.tiny,
    borderRightWidth: 0.5,
    borderRightColor: COLORS.borderLight,
    borderRightStyle: 'solid',
    justifyContent: 'center',
  },
  cellLast: {
    padding: '2 3',
    fontSize: FONT_SIZE.tiny,
    justifyContent: 'center',
  },
  note: {
    fontSize: FONT_SIZE.tiny,
    color: COLORS.textLight,
    marginTop: 4,
  },
});

export function PdfAllergyPage({ page }: Props) {
  const config = page.config as AllergyPageConfig;
  const accentColor = (page.config as any).accentColor;

  const dateColWidth = config.showDateColumn ? 38 : 0;
  const severityColWidth = config.showSeverityColumn ? 28 : 0;
  const nameColWidth = 70;
  const reactionColFlex = 1;

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} accentColor={accentColor}>
        <PdfSectionHeader accentColor={accentColor}>アレルギー・副作用歴</PdfSectionHeader>

        <View style={styles.tableWrapper}>
          {/* Header */}
          <View style={styles.headerRow}>
            {config.showDateColumn && (
              <Text style={[styles.cell, { width: dateColWidth, fontWeight: 700, fontSize: FONT_SIZE.tiny }]}>
                確認日
              </Text>
            )}
            <Text style={[styles.cell, { width: nameColWidth, fontWeight: 700, fontSize: FONT_SIZE.tiny }]}>
              原因物質・薬品名
            </Text>
            <Text style={[styles.cell, { flex: reactionColFlex, fontWeight: 700, fontSize: FONT_SIZE.tiny }]}>
              症状・反応
            </Text>
            {config.showSeverityColumn && (
              <Text style={[styles.cellLast, { width: severityColWidth, fontWeight: 700, fontSize: FONT_SIZE.tiny }]}>
                重症度
              </Text>
            )}
            {!config.showSeverityColumn && (
              <Text style={styles.cellLast} />
            )}
          </View>

          {/* Data rows */}
          {Array.from({ length: config.rows }).map((_, i) => (
            <View key={i} style={styles.row}>
              {config.showDateColumn && (
                <Text style={[styles.cell, { width: dateColWidth }]} />
              )}
              <Text style={[styles.cell, { width: nameColWidth }]} />
              <Text style={[styles.cell, { flex: reactionColFlex }]} />
              {config.showSeverityColumn && (
                <Text style={[styles.cellLast, { width: severityColWidth }]} />
              )}
              {!config.showSeverityColumn && (
                <Text style={styles.cellLast} />
              )}
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          ※ アレルギーや薬による副作用があった場合は必ず記録してください
        </Text>
      </PdfPageFrame>
    </Page>
  );
}
