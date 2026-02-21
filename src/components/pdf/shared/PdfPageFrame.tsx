import { View, Text } from '@react-pdf/renderer';
import { FONT_SIZE } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';

interface PdfPageFrameProps {
  title: string;
  colors: PdfColors;
  theme: PdfThemeConfig;
  children: React.ReactNode;
  pageNumber?: number;
}

export function PdfPageFrame({ title, colors, theme, children, pageNumber }: PdfPageFrameProps) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: theme.headerPaddingV,
          marginBottom: 6,
          backgroundColor: colors.headerBg,
          borderRadius: theme.headerRadius,
        }}
      >
        <Text style={{ fontSize: FONT_SIZE.heading, fontWeight: 700, color: colors.headerText }}>
          {title}
        </Text>
        {pageNumber !== undefined && (
          <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.headerText }}>{pageNumber}</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </>
  );
}
