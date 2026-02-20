import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { NotebookPage, PersonalInfo, PersonalInfoPageConfig } from '../../../types/notebook';
import { sharedStyles, COLORS, FONT_SIZE } from '../PdfStyles';
import { PdfPageFrame } from '../shared/PdfPageFrame';
import { PdfField } from '../shared/PdfField';
import { PdfSectionHeader } from '../shared/PdfSectionHeader';

interface Props {
  page: NotebookPage;
  personalInfo: PersonalInfo;
}

const styles = StyleSheet.create({
  bloodTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bloodTypeLabel: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textLight,
    width: 55,
  },
  bloodTypeValue: {
    fontSize: FONT_SIZE.body,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    borderBottomStyle: 'solid',
    paddingBottom: 1,
    width: 50,
    minHeight: 13,
  },
  contactBox: {
    borderWidth: 0.5,
    borderColor: COLORS.borderLight,
    borderStyle: 'solid',
    padding: 5,
    marginBottom: 4,
  },
  contactTitle: {
    fontSize: FONT_SIZE.tiny,
    color: COLORS.textLight,
    marginBottom: 3,
  },
  notesBox: {
    borderWidth: 0.5,
    borderColor: COLORS.borderLight,
    borderStyle: 'solid',
    padding: 5,
    minHeight: 30,
  },
});

export function PdfPersonalInfoPage({ page, personalInfo }: Props) {
  const config = page.config as PersonalInfoPageConfig;
  const accentColor = (page.config as any).accentColor;

  const bloodTypeDisplay =
    personalInfo.bloodType === 'unknown' ? '' : personalInfo.bloodType + '型';

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} accentColor={accentColor}>
        <PdfSectionHeader accentColor={accentColor}>患者基本情報</PdfSectionHeader>

        <PdfField label="お名前" value={personalInfo.name} />
        <PdfField label="ふりがな" value={personalInfo.nameKana} />
        <PdfField label="生年月日" value={personalInfo.dateOfBirth} />
        <PdfField label="住所" value={personalInfo.address} />
        <PdfField label="電話番号" value={personalInfo.phone} />

        {config.showBloodType && (
          <View style={styles.bloodTypeRow}>
            <Text style={styles.bloodTypeLabel}>血液型</Text>
            <Text style={styles.bloodTypeValue}>{bloodTypeDisplay}</Text>
          </View>
        )}

        {config.showFamilyDoctor && (
          <>
            <PdfSectionHeader accentColor={accentColor}>かかりつけ医</PdfSectionHeader>
            <PdfField label="医師名" value={personalInfo.familyDoctor} />
            <PdfField label="病院名" value={personalInfo.familyDoctorHospital} />
            <PdfField label="電話番号" value={personalInfo.familyDoctorPhone} />
          </>
        )}

        {config.showEmergencyContacts && (
          <>
            <PdfSectionHeader accentColor={accentColor}>緊急連絡先</PdfSectionHeader>
            {Array.from({ length: config.emergencyContactSlots }).map((_, i) => {
              const contact = personalInfo.emergencyContacts[i];
              return (
                <View key={i} style={styles.contactBox}>
                  <Text style={styles.contactTitle}>連絡先 {i + 1}</Text>
                  <PdfField label="お名前" value={contact?.name || ''} labelWidth={40} />
                  <PdfField label="続柄" value={contact?.relationship || ''} labelWidth={40} />
                  <PdfField label="電話番号" value={contact?.phone || ''} labelWidth={40} />
                </View>
              );
            })}
          </>
        )}

        {personalInfo.otherNotes && (
          <>
            <PdfSectionHeader accentColor={accentColor}>備考</PdfSectionHeader>
            <View style={styles.notesBox}>
              <Text style={{ fontSize: FONT_SIZE.small }}>{personalInfo.otherNotes}</Text>
            </View>
          </>
        )}
      </PdfPageFrame>
    </Page>
  );
}
