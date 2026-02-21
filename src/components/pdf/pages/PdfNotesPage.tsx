import { Page, View } from '@react-pdf/renderer';
import type { NotebookPage, NotesPageConfig } from '../../../types/notebook';
import { sharedStyles, LIVE_WIDTH } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';
import { PdfPageFrame } from '../shared/PdfPageFrame';

interface Props {
  page: NotebookPage;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

function DottedGrid({ lineCount, colors }: { lineCount: number; colors: PdfColors }) {
  const rows = Math.floor(lineCount / 2);
  const cols = 12;
  return (
    <View style={{ flex: 1 }}>
      {Array.from({ length: rows }).map((_, rowI) => (
        <View key={rowI} style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          {Array.from({ length: cols }).map((_, colI) => (
            <View
              key={colI}
              style={{
                width: 2,
                height: 2,
                borderRadius: 1,
                backgroundColor: colors.borderLight,
                marginHorizontal: (LIVE_WIDTH / cols - 2) / 2,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export function PdfNotesPage({ page, colors, theme }: Props) {
  const config = page.config as NotesPageConfig;

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} colors={colors} theme={theme}>
        {config.gridStyle === 'ruled' && (
          <View style={{ flex: 1, flexDirection: 'column' }}>
            {Array.from({ length: config.lineCount }).map((_, i) => (
              <View
                key={i}
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.borderLight,
                  borderBottomStyle: 'solid',
                  flex: 1,
                }}
              />
            ))}
          </View>
        )}

        {config.gridStyle === 'blank' && (
          <View
            style={{
              flex: 1,
              borderWidth: 0.5,
              borderColor: colors.borderLight,
              borderStyle: 'solid',
              borderRadius: theme.entryBoxRadius,
            }}
          />
        )}

        {config.gridStyle === 'dotted' && <DottedGrid lineCount={config.lineCount} colors={colors} />}
      </PdfPageFrame>
    </Page>
  );
}
