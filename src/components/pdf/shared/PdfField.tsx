import { View, Text } from '@react-pdf/renderer';
import { FONT_SIZE } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';

interface PdfFieldProps {
  label: string;
  value?: string;
  labelWidth?: number;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

export function PdfField({ label, value = '', labelWidth = 55, colors, theme }: PdfFieldProps) {
  const isBox = theme.fieldStyle === 'box';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5 }}>
      <Text
        style={{
          fontSize: FONT_SIZE.small,
          color: colors.textLight,
          width: labelWidth,
          paddingBottom: 1,
        }}
      >
        {label}
      </Text>
      <Text
        style={
          isBox
            ? {
                fontSize: FONT_SIZE.body,
                flex: 1,
                borderWidth: 0.5,
                borderColor: colors.border,
                borderStyle: 'solid',
                borderRadius: 2,
                padding: '1 3',
                minHeight: 13,
                color: colors.text,
              }
            : {
                fontSize: FONT_SIZE.body,
                flex: 1,
                borderBottomWidth: 0.5,
                borderBottomColor: colors.border,
                borderBottomStyle: 'solid',
                paddingBottom: 1,
                minHeight: 13,
                color: colors.text,
              }
        }
      >
        {value}
      </Text>
    </View>
  );
}
