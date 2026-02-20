import { Page, View, StyleSheet } from '@react-pdf/renderer';
import type { NotebookPage, NotesPageConfig } from '../../../types/notebook';
import { sharedStyles, COLORS, LIVE_WIDTH } from '../PdfStyles';
import { PdfPageFrame } from '../shared/PdfPageFrame';

interface Props {
  page: NotebookPage;
}

const styles = StyleSheet.create({
  linesContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderLight,
    borderBottomStyle: 'solid',
    flex: 1,
  },
  blankArea: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLORS.borderLight,
    borderStyle: 'solid',
  },
  dottedContainer: {
    flex: 1,
  },
});

function DottedGrid({ lineCount }: { lineCount: number }) {
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
                backgroundColor: COLORS.borderLight,
                marginHorizontal: (LIVE_WIDTH / cols - 2) / 2,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export function PdfNotesPage({ page }: Props) {
  const config = page.config as NotesPageConfig;
  const accentColor = (page.config as any).accentColor;

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} accentColor={accentColor}>
        {config.gridStyle === 'ruled' && (
          <View style={styles.linesContainer}>
            {Array.from({ length: config.lineCount }).map((_, i) => (
              <View key={i} style={styles.line} />
            ))}
          </View>
        )}

        {config.gridStyle === 'blank' && <View style={styles.blankArea} />}

        {config.gridStyle === 'dotted' && <DottedGrid lineCount={config.lineCount} />}
      </PdfPageFrame>
    </Page>
  );
}
