import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { NotebookPage, MedicalHistoryPageConfig, PersonalInfo } from '../../../types/notebook';
import { sharedStyles, COLORS, FONT_SIZE } from '../PdfStyles';
import { PdfPageFrame } from '../shared/PdfPageFrame';
import { PdfSectionHeader } from '../shared/PdfSectionHeader';

interface Props {
  page: NotebookPage;
  personalInfo: PersonalInfo;
}

const styles = StyleSheet.create({
  tableWrapper: {
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderStyle: 'solid',
    overflow: 'hidden',
    marginTop: 4,
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
  conditionsBox: {
    borderWidth: 0.5,
    borderColor: COLORS.borderLight,
    borderStyle: 'solid',
    padding: 5,
    minHeight: 24,
    marginBottom: 4,
  },
});

export function PdfMedicalHistoryPage({ page, personalInfo }: Props) {
  const config = page.config as MedicalHistoryPageConfig;
  const accentColor = (page.config as any).accentColor;

  const dateColWidth = config.showOnsetDateColumn ? 38 : 0;
  const hospitalColWidth = config.showHospitalColumn ? 60 : 0;

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} accentColor={accentColor}>
        {personalInfo.preExistingConditions && (
          <>
            <PdfSectionHeader accentColor={accentColor}>持病・現在治療中の病気</PdfSectionHeader>
            <View style={styles.conditionsBox}>
              <Text style={{ fontSize: FONT_SIZE.small }}>
                {personalInfo.preExistingConditions}
              </Text>
            </View>
          </>
        )}
        {!personalInfo.preExistingConditions && (
          <>
            <PdfSectionHeader accentColor={accentColor}>持病・現在治療中の病気</PdfSectionHeader>
            <View style={styles.conditionsBox} />
          </>
        )}

        <PdfSectionHeader accentColor={accentColor}>既往歴（過去にかかった病気）</PdfSectionHeader>

        <View style={styles.tableWrapper}>
          <View style={styles.headerRow}>
            <Text style={[styles.cell, { flex: 1, fontWeight: 700, fontSize: FONT_SIZE.tiny }]}>
              病名
            </Text>
            {config.showOnsetDateColumn && (
              <Text style={[styles.cell, { width: dateColWidth, fontWeight: 700, fontSize: FONT_SIZE.tiny }]}>
                発症時期
              </Text>
            )}
            {config.showHospitalColumn && (
              <Text style={[styles.cellLast, { width: hospitalColWidth, fontWeight: 700, fontSize: FONT_SIZE.tiny }]}>
                医療機関
              </Text>
            )}
            {!config.showHospitalColumn && (
              <Text style={[styles.cellLast, { width: 30, fontWeight: 700, fontSize: FONT_SIZE.tiny }]}>
                備考
              </Text>
            )}
          </View>

          {Array.from({ length: config.rows }).map((_, i) => (
            <View key={i} style={styles.row}>
              <Text style={[styles.cell, { flex: 1 }]} />
              {config.showOnsetDateColumn && (
                <Text style={[styles.cell, { width: dateColWidth }]} />
              )}
              {config.showHospitalColumn && (
                <Text style={[styles.cellLast, { width: hospitalColWidth }]} />
              )}
              {!config.showHospitalColumn && (
                <Text style={[styles.cellLast, { width: 30 }]} />
              )}
            </View>
          ))}
        </View>
      </PdfPageFrame>
    </Page>
  );
}
