import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { NotebookPage, DoctorPharmacyPageConfig, PersonalInfo } from '../../../types/notebook';
import { sharedStyles, COLORS, FONT_SIZE } from '../PdfStyles';
import { PdfPageFrame } from '../shared/PdfPageFrame';
import { PdfSectionHeader } from '../shared/PdfSectionHeader';
import { PdfField } from '../shared/PdfField';

interface Props {
  page: NotebookPage;
  personalInfo: PersonalInfo;
}

const styles = StyleSheet.create({
  entryBox: {
    borderWidth: 0.5,
    borderColor: COLORS.borderLight,
    borderStyle: 'solid',
    padding: 5,
    marginBottom: 5,
  },
  entryTitle: {
    fontSize: FONT_SIZE.tiny,
    color: COLORS.textLight,
    fontWeight: 700,
    marginBottom: 3,
  },
});

export function PdfDoctorPharmacyPage({ page, personalInfo }: Props) {
  const config = page.config as DoctorPharmacyPageConfig;
  const accentColor = (page.config as any).accentColor;

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} accentColor={accentColor}>
        <PdfSectionHeader accentColor={accentColor}>かかりつけ医</PdfSectionHeader>

        {Array.from({ length: config.doctorSlots }).map((_, i) => (
          <View key={i} style={styles.entryBox}>
            <Text style={styles.entryTitle}>担当医 {i + 1}</Text>
            <PdfField
              label="医師名"
              value={i === 0 ? personalInfo.familyDoctor : ''}
              labelWidth={40}
            />
            <PdfField
              label="病院・クリニック名"
              value={i === 0 ? personalInfo.familyDoctorHospital : ''}
              labelWidth={60}
            />
            <PdfField label="診療科" value="" labelWidth={40} />
            <PdfField
              label="電話番号"
              value={i === 0 ? personalInfo.familyDoctorPhone : ''}
              labelWidth={40}
            />
          </View>
        ))}

        <PdfSectionHeader accentColor={accentColor}>かかりつけ薬局</PdfSectionHeader>

        {Array.from({ length: config.pharmacySlots }).map((_, i) => (
          <View key={i} style={styles.entryBox}>
            <Text style={styles.entryTitle}>薬局 {i + 1}</Text>
            <PdfField
              label="薬局名"
              value={i === 0 ? personalInfo.familyPharmacy : ''}
              labelWidth={40}
            />
            <PdfField label="住所" value="" labelWidth={40} />
            <PdfField
              label="電話番号"
              value={i === 0 ? personalInfo.familyPharmacyPhone : ''}
              labelWidth={40}
            />
          </View>
        ))}
      </PdfPageFrame>
    </Page>
  );
}
