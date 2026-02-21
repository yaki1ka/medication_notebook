import { View, Text } from '@react-pdf/renderer';
import { FONT_SIZE } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';

interface PdfSectionHeaderProps {
  children: string;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

export function PdfSectionHeader({ children, colors, theme }: PdfSectionHeaderProps) {
  return (
    <View
      style={{
        padding: `${theme.sectionPaddingV} 6`,
        marginBottom: 3,
        marginTop: 5,
        backgroundColor: colors.sectionBg,
        borderRadius: theme.sectionRadius,
      }}
    >
      <Text style={{ fontSize: FONT_SIZE.small, fontWeight: 700, color: colors.text }}>
        {children}
      </Text>
    </View>
  );
}
