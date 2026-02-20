import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { COLORS, FONT_SIZE } from '../PdfStyles';

interface PdfFieldProps {
  label: string;
  value?: string;
  labelWidth?: number;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  label: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textLight,
    paddingBottom: 1,
  },
  value: {
    fontSize: FONT_SIZE.body,
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    borderBottomStyle: 'solid',
    paddingBottom: 1,
    minHeight: 13,
  },
});

export function PdfField({ label, value = '', labelWidth = 55 }: PdfFieldProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { width: labelWidth }]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
