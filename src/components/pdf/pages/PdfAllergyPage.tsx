import { Page, View, Text } from '@react-pdf/renderer';
import type { NotebookPage, AllergyPageConfig } from '../../../types/notebook';
import { sharedStyles, FONT_SIZE } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';
import { PdfPageFrame } from '../shared/PdfPageFrame';
import { PdfSectionHeader } from '../shared/PdfSectionHeader';

interface Props {
  page: NotebookPage;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

export function PdfAllergyPage({ page, colors, theme }: Props) {
  const config = page.config as AllergyPageConfig;

  const dateColWidth = config.showDateColumn ? 38 : 0;
  const severityColWidth = config.showSeverityColumn ? 28 : 0;
  const nameColWidth = 70;

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
        <PdfSectionHeader colors={colors} theme={theme}>アレルギー・副作用歴</PdfSectionHeader>

        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            borderStyle: 'solid',
            overflow: 'hidden',
            borderRadius: theme.tableRadius,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: colors.tableBg,
              borderBottomWidth: 0.5,
              borderBottomColor: colors.border,
              borderBottomStyle: 'solid',
            }}
          >
            {config.showDateColumn && (
              <Text style={[cellStyle, { width: dateColWidth, fontWeight: 700 }]}>確認日</Text>
            )}
            <Text style={[cellStyle, { width: nameColWidth, fontWeight: 700 }]}>原因物質・薬品名</Text>
            <Text style={[cellStyle, { flex: 1, fontWeight: 700 }]}>症状・反応</Text>
            {config.showSeverityColumn ? (
              <Text style={[cellLastStyle, { width: severityColWidth, fontWeight: 700 }]}>重症度</Text>
            ) : (
              <Text style={cellLastStyle} />
            )}
          </View>

          {/* Data rows */}
          {Array.from({ length: config.rows }).map((_, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: colors.borderLight,
                borderBottomStyle: 'solid',
                minHeight: 14,
              }}
            >
              {config.showDateColumn && <Text style={[cellStyle, { width: dateColWidth }]} />}
              <Text style={[cellStyle, { width: nameColWidth }]} />
              <Text style={[cellStyle, { flex: 1 }]} />
              {config.showSeverityColumn ? (
                <Text style={[cellLastStyle, { width: severityColWidth }]} />
              ) : (
                <Text style={cellLastStyle} />
              )}
            </View>
          ))}
        </View>

        <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, marginTop: 4 }}>
          ※ アレルギーや薬による副作用があった場合は必ず記録してください
        </Text>
      </PdfPageFrame>
    </Page>
  );
}
