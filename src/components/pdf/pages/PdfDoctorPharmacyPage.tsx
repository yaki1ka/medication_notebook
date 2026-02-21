import { Page, View, Text } from '@react-pdf/renderer';
import type { NotebookPage, DoctorPharmacyPageConfig, PersonalInfo } from '../../../types/notebook';
import { sharedStyles, FONT_SIZE } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';
import { PdfSectionHeader } from '../shared/PdfSectionHeader';
import { PdfField } from '../shared/PdfField';

interface Props {
  page: NotebookPage;
  personalInfo: PersonalInfo;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

export function PdfDoctorPharmacyPage({ page, personalInfo, colors, theme }: Props) {
  const config = page.config as DoctorPharmacyPageConfig;
  const doctors = personalInfo.doctors;
  const pharmacies = personalInfo.pharmacies;

  // When there are no entries, show at least 1 empty slot
  const doctorList = doctors.length > 0 ? doctors : [null];
  const pharmacyList = pharmacies.length > 0 ? pharmacies : [null];

  return (
    <Page size="A6" style={sharedStyles.page}>
      {/* Page header — rendered directly (no flex:1 wrapper) so content can overflow */}
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
          {page.title}
        </Text>
      </View>

      <PdfSectionHeader colors={colors} theme={theme}>かかりつけ医</PdfSectionHeader>

      {doctorList.map((doctor, i) => (
        <View
          key={doctor?.id ?? i}
          wrap={false}
          style={{
            borderWidth: 0.5,
            borderColor: colors.borderLight,
            borderStyle: 'solid',
            padding: 5,
            marginBottom: 5,
            borderRadius: theme.entryBoxRadius,
          }}
        >
          <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, fontWeight: 700, marginBottom: 3 }}>
            担当医 {i + 1}
          </Text>
          <PdfField label="医師名" value={doctor?.name ?? ''} labelWidth={40} colors={colors} theme={theme} />
          <PdfField label="病院・クリニック名" value={doctor?.hospital ?? ''} labelWidth={60} colors={colors} theme={theme} />
          <PdfField label="診療科" value={doctor?.department ?? ''} labelWidth={40} colors={colors} theme={theme} />
          <PdfField label="電話番号" value={doctor?.phone ?? ''} labelWidth={40} colors={colors} theme={theme} />
          {config.showNotes && (
            <PdfField label="備考" value={doctor?.notes ?? ''} labelWidth={40} colors={colors} theme={theme} />
          )}
          {!config.showNotes && doctor?.notes && (
            <PdfField label="備考" value={doctor.notes} labelWidth={40} colors={colors} theme={theme} />
          )}
        </View>
      ))}

      <PdfSectionHeader colors={colors} theme={theme}>かかりつけ薬局</PdfSectionHeader>

      {pharmacyList.map((pharmacy, i) => (
        <View
          key={pharmacy?.id ?? i}
          wrap={false}
          style={{
            borderWidth: 0.5,
            borderColor: colors.borderLight,
            borderStyle: 'solid',
            padding: 5,
            marginBottom: 5,
            borderRadius: theme.entryBoxRadius,
          }}
        >
          <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, fontWeight: 700, marginBottom: 3 }}>
            薬局 {i + 1}
          </Text>
          <PdfField label="薬局名" value={pharmacy?.name ?? ''} labelWidth={40} colors={colors} theme={theme} />
          <PdfField label="住所" value={pharmacy?.address ?? ''} labelWidth={40} colors={colors} theme={theme} />
          <PdfField label="電話番号" value={pharmacy?.phone ?? ''} labelWidth={40} colors={colors} theme={theme} />
          {config.showNotes && (
            <PdfField label="備考" value={pharmacy?.notes ?? ''} labelWidth={40} colors={colors} theme={theme} />
          )}
          {!config.showNotes && pharmacy?.notes && (
            <PdfField label="備考" value={pharmacy.notes} labelWidth={40} colors={colors} theme={theme} />
          )}
        </View>
      ))}
    </Page>
  );
}
