import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { NotebookPage, PersonalInfo, CoverPageConfig } from '../../../types/notebook';
import { COLORS, FONT_SIZE, MARGIN } from '../PdfStyles';

interface Props {
  page: NotebookPage;
  personalInfo: PersonalInfo;
  notebookTitle: string;
}

const styles = StyleSheet.create({
  coverPage: {
    fontFamily: 'NotoSansJP',
    padding: 0,
    flexDirection: 'column',
  },
  topStripe: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainArea: {
    flex: 1,
    padding: MARGIN,
    flexDirection: 'column',
  },
  bigTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'solid',
    padding: 10,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  infoLabel: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textLight,
    width: 50,
  },
  infoValue: {
    fontSize: FONT_SIZE.body,
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    borderBottomStyle: 'solid',
    paddingBottom: 1,
    minHeight: 13,
  },
  bottomStripe: {
    height: 20,
  },
  issuedDate: {
    fontSize: FONT_SIZE.tiny,
    color: COLORS.textLight,
    textAlign: 'right',
    marginTop: 8,
  },
  decorLine: {
    height: 4,
    marginTop: 6,
    marginBottom: 6,
    opacity: 0.3,
  },
});

export function PdfCoverPage({ page, personalInfo, notebookTitle }: Props) {
  const config = page.config as CoverPageConfig;
  const accentColor = config.accentColor || COLORS.primary;

  return (
    <Page size="A6" style={styles.coverPage}>
      <View style={[styles.topStripe, { backgroundColor: accentColor }]}>
        <Text style={{ fontSize: FONT_SIZE.small, color: COLORS.white, letterSpacing: 2 }}>
          MEDICATION NOTEBOOK
        </Text>
      </View>

      <View style={styles.mainArea}>
        <Text style={styles.bigTitle}>{notebookTitle}</Text>
        <View style={[styles.decorLine, { backgroundColor: accentColor }]} />

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>お名前</Text>
            <Text style={styles.infoValue}>{personalInfo.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ふりがな</Text>
            <Text style={styles.infoValue}>{personalInfo.nameKana}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>生年月日</Text>
            <Text style={styles.infoValue}>{personalInfo.dateOfBirth}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>電話番号</Text>
            <Text style={styles.infoValue}>{personalInfo.phone}</Text>
          </View>
        </View>

        {config.showIssuedDate && (
          <Text style={styles.issuedDate}>
            作成日: {'　'.repeat(6)}　　年　　月　　日
          </Text>
        )}
      </View>

      <View style={[styles.bottomStripe, { backgroundColor: accentColor }]} />
    </Page>
  );
}
