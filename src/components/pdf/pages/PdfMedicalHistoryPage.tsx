import { Page, View, Text } from '@react-pdf/renderer';
import type { NotebookPage, MedicalHistoryPageConfig, PersonalInfo } from '../../../types/notebook';
import { sharedStyles, FONT_SIZE } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';
import { PdfPageFrame } from '../shared/PdfPageFrame';
import { PdfSectionHeader } from '../shared/PdfSectionHeader';

interface Props {
  page: NotebookPage;
  personalInfo: PersonalInfo;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

export function PdfMedicalHistoryPage({ page, personalInfo, colors, theme }: Props) {
  const config = page.config as MedicalHistoryPageConfig;

  const dateColWidth = config.showOnsetDateColumn ? 38 : 0;
  const hospitalColWidth = config.showHospitalColumn ? 60 : 0;

  const cellStyle = {
    padding: '2 3',
    fontSize: FONT_SIZE.tiny,
    borderRightWidth: 0.5,
    borderRightColor: colors.borderLight,
    borderRightStyle: 'solid' as const,
    justifyContent: 'center' as const,
  };
  const cellLastStyle = { padding: '2 3', fontSize: FONT_SIZE.tiny, justifyContent: 'center' as const };

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} colors={colors} theme={theme}>
        <PdfSectionHeader colors={colors} theme={theme}>持病・現在治療中の病気</PdfSectionHeader>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.borderLight,
            borderStyle: 'solid',
            padding: 5,
            minHeight: 24,
            marginBottom: 4,
            borderRadius: theme.entryBoxRadius,
          }}
        >
          <Text style={{ fontSize: FONT_SIZE.small }}>
            {personalInfo.preExistingConditions}
          </Text>
        </View>

        <PdfSectionHeader colors={colors} theme={theme}>既往歴（過去にかかった病気）</PdfSectionHeader>

        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            borderStyle: 'solid',
            overflow: 'hidden',
            marginTop: 4,
            borderRadius: theme.tableRadius,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: colors.tableBg,
              borderBottomWidth: 0.5,
              borderBottomColor: colors.border,
              borderBottomStyle: 'solid',
            }}
          >
            <Text style={[cellStyle, { flex: 1, fontWeight: 700 }]}>病名</Text>
            {config.showOnsetDateColumn && (
              <Text style={[cellStyle, { width: dateColWidth, fontWeight: 700 }]}>発症時期</Text>
            )}
            <Text style={[cellLastStyle, { width: config.showHospitalColumn ? hospitalColWidth : 30, fontWeight: 700 }]}>
              {config.showHospitalColumn ? '医療機関' : '備考'}
            </Text>
          </View>

          {Array.from({ length: config.rows }).map((_, i) => (
            <View
              key={i}
              wrap={false}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: colors.borderLight,
                borderBottomStyle: 'solid',
                minHeight: 14,
              }}
            >
              <Text style={[cellStyle, { flex: 1 }]} />
              {config.showOnsetDateColumn && <Text style={[cellStyle, { width: dateColWidth }]} />}
              <Text style={[cellLastStyle, { width: config.showHospitalColumn ? hospitalColWidth : 30 }]} />
            </View>
          ))}
        </View>
      </PdfPageFrame>
    </Page>
  );
}
