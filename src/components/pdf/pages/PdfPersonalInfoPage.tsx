import { Page, View, Text } from '@react-pdf/renderer';
import type { NotebookPage, PersonalInfo, PersonalInfoPageConfig } from '../../../types/notebook';
import { sharedStyles, FONT_SIZE } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';
import { PdfPageFrame } from '../shared/PdfPageFrame';
import { PdfField } from '../shared/PdfField';
import { PdfSectionHeader } from '../shared/PdfSectionHeader';

interface Props {
  page: NotebookPage;
  personalInfo: PersonalInfo;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

export function PdfPersonalInfoPage({ page, personalInfo, colors, theme }: Props) {
  const config = page.config as PersonalInfoPageConfig;

  const bloodTypeDisplay =
    personalInfo.bloodType === 'unknown' ? '' : personalInfo.bloodType + '型';

  return (
    <Page size="A6" style={sharedStyles.page}>
      <PdfPageFrame title={page.title} colors={colors} theme={theme}>
        <PdfSectionHeader colors={colors} theme={theme}>患者基本情報</PdfSectionHeader>

        <PdfField label="お名前" value={personalInfo.name} colors={colors} theme={theme} />
        <PdfField label="ふりがな" value={personalInfo.nameKana} colors={colors} theme={theme} />
        <PdfField label="生年月日" value={personalInfo.dateOfBirth} colors={colors} theme={theme} />
        <PdfField label="住所" value={personalInfo.address} colors={colors} theme={theme} />
        <PdfField label="電話番号" value={personalInfo.phone} colors={colors} theme={theme} />

        {config.showBloodType && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontSize: FONT_SIZE.small, color: colors.textLight, width: 55 }}>血液型</Text>
            <Text
              style={{
                fontSize: FONT_SIZE.body,
                borderBottomWidth: 0.5,
                borderBottomColor: colors.border,
                borderBottomStyle: 'solid',
                paddingBottom: 1,
                width: 50,
                minHeight: 13,
              }}
            >
              {bloodTypeDisplay}
            </Text>
          </View>
        )}

        {config.showEmergencyContacts && (
          <>
            <PdfSectionHeader colors={colors} theme={theme}>緊急連絡先</PdfSectionHeader>
            {Array.from({ length: config.emergencyContactSlots }).map((_, i) => {
              const contact = personalInfo.emergencyContacts[i];
              return (
                <View
                  key={i}
                  wrap={false}
                  style={{
                    borderWidth: 0.5,
                    borderColor: colors.borderLight,
                    borderStyle: 'solid',
                    padding: 5,
                    marginBottom: 4,
                    borderRadius: theme.entryBoxRadius,
                  }}
                >
                  <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, marginBottom: 3 }}>
                    連絡先 {i + 1}
                  </Text>
                  <PdfField label="お名前" value={contact?.name || ''} labelWidth={40} colors={colors} theme={theme} />
                  <PdfField label="続柄" value={contact?.relationship || ''} labelWidth={40} colors={colors} theme={theme} />
                  <PdfField label="電話番号" value={contact?.phone || ''} labelWidth={40} colors={colors} theme={theme} />
                </View>
              );
            })}
          </>
        )}

        {personalInfo.otherNotes && (
          <>
            <PdfSectionHeader colors={colors} theme={theme}>備考</PdfSectionHeader>
            <View
              wrap={false}
              style={{
                borderWidth: 0.5,
                borderColor: colors.borderLight,
                borderStyle: 'solid',
                padding: 5,
                minHeight: 30,
                borderRadius: theme.entryBoxRadius,
              }}
            >
              <Text style={{ fontSize: FONT_SIZE.small }}>{personalInfo.otherNotes}</Text>
            </View>
          </>
        )}
      </PdfPageFrame>
    </Page>
  );
}
