import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { COLORS, FONT_SIZE } from '../PdfStyles';

interface PdfPageFrameProps {
  title: string;
  accentColor?: string;
  children: React.ReactNode;
  pageNumber?: number;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
  },
  titleText: {
    fontSize: FONT_SIZE.heading,
    fontWeight: 700,
    color: COLORS.headerText,
  },
  pageNumText: {
    fontSize: FONT_SIZE.tiny,
    color: COLORS.headerText,
  },
  content: {
    flex: 1,
  },
});

export function PdfPageFrame({ title, accentColor, children, pageNumber }: PdfPageFrameProps) {
  const bgColor = accentColor || COLORS.primary;
  return (
    <>
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Text style={styles.titleText}>{title}</Text>
        {pageNumber !== undefined && (
          <Text style={styles.pageNumText}>{pageNumber}</Text>
        )}
      </View>
      <View style={styles.content}>{children}</View>
    </>
  );
}
