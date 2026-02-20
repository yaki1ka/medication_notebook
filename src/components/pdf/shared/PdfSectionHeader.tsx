import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { COLORS, FONT_SIZE } from '../PdfStyles';

interface PdfSectionHeaderProps {
  children: string;
  accentColor?: string;
}

const styles = StyleSheet.create({
  container: {
    padding: '3 6',
    marginBottom: 3,
    marginTop: 5,
  },
  text: {
    fontSize: FONT_SIZE.small,
    fontWeight: 700,
    color: COLORS.text,
  },
});

export function PdfSectionHeader({ children, accentColor }: PdfSectionHeaderProps) {
  return (
    <View style={[styles.container, { backgroundColor: accentColor ? accentColor + '22' : '#dbeafe' }]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
