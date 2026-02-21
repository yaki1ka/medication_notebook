import { Page, View, Text } from '@react-pdf/renderer';
import type { NotebookPage, PersonalInfo, CoverPageConfig } from '../../../types/notebook';
import { FONT_SIZE, MARGIN } from '../PdfStyles';
import type { PdfColors } from '../PdfStyles';
import type { PdfThemeConfig } from '../../../themes';

interface Props {
  page: NotebookPage;
  personalInfo: PersonalInfo;
  notebookTitle: string;
  colors: PdfColors;
  theme: PdfThemeConfig;
}

export function PdfCoverPage({ page, personalInfo, notebookTitle, colors, theme }: Props) {
  const config = page.config as CoverPageConfig;
  const isPlayful = theme.coverStyle === 'playful';
  const isCard = theme.coverStyle === 'card';

  if (isCard) {
    // Rounded/card style: clean white page with a centered card
    return (
      <Page
        size="A6"
        style={{
          fontFamily: 'NotoSansJP',
          padding: MARGIN,
          flexDirection: 'column',
          backgroundColor: colors.white,
        }}
      >
        {/* Top accent bar */}
        <View style={{ height: 8, backgroundColor: colors.primary, borderRadius: 4, marginBottom: 16 }} />

        {/* Title area */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, letterSpacing: 2, marginBottom: 8 }}>
            MEDICATION NOTEBOOK
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: colors.primary,
              textAlign: 'center',
              letterSpacing: 3,
            }}
          >
            {notebookTitle}
          </Text>
        </View>

        {/* Info card */}
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderStyle: 'solid',
            borderRadius: theme.entryBoxRadius,
            padding: 12,
            flex: 1,
          }}
        >
          {[
            { label: 'お名前', value: personalInfo.name },
            { label: 'ふりがな', value: personalInfo.nameKana },
            { label: '生年月日', value: personalInfo.dateOfBirth },
            { label: '電話番号', value: personalInfo.phone },
          ].map(({ label, value }) => (
            <View key={label} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: FONT_SIZE.small, color: colors.textLight, width: 50 }}>{label}</Text>
              <Text
                style={{
                  fontSize: FONT_SIZE.body,
                  flex: 1,
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.border,
                  borderBottomStyle: 'solid',
                  paddingBottom: 1,
                  minHeight: 13,
                }}
              >
                {value}
              </Text>
            </View>
          ))}
          {config.showIssuedDate && (
            <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, textAlign: 'right', marginTop: 6 }}>
              作成日: {'　'.repeat(6)} 年 　月 　日
            </Text>
          )}
        </View>

        {/* Bottom bar */}
        <View style={{ height: 8, backgroundColor: colors.primary, borderRadius: 4, marginTop: 16 }} />
      </Page>
    );
  }

  if (isPlayful) {
    // Kids style: tall colorful header with decorative dots
    return (
      <Page
        size="A6"
        style={{ fontFamily: 'NotoSansJP', padding: 0, flexDirection: 'column', backgroundColor: colors.white }}
      >
        {/* Large colorful header */}
        <View style={{ backgroundColor: colors.primary, height: 90, justifyContent: 'center', alignItems: 'center' }}>
          {/* Decorative circles */}
          <View style={{ position: 'absolute', top: 12, left: 14, width: 14, height: 14, borderRadius: 7, backgroundColor: colors.white, opacity: 0.3 }} />
          <View style={{ position: 'absolute', top: 20, right: 20, width: 10, height: 10, borderRadius: 5, backgroundColor: colors.white, opacity: 0.3 }} />
          <View style={{ position: 'absolute', bottom: 10, left: 30, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.white, opacity: 0.2 }} />
          <Text style={{ fontSize: FONT_SIZE.small, color: colors.white, letterSpacing: 2, marginBottom: 6, opacity: 0.9 }}>
            MEDICATION NOTEBOOK
          </Text>
          <Text style={{ fontSize: 22, fontWeight: 700, color: colors.white, letterSpacing: 2 }}>
            {notebookTitle}
          </Text>
        </View>

        {/* Main content */}
        <View style={{ flex: 1, padding: MARGIN }}>
          <View
            style={{
              borderWidth: 1.5,
              borderColor: colors.primary,
              borderStyle: 'solid',
              borderRadius: theme.entryBoxRadius,
              padding: 12,
            }}
          >
            {[
              { label: 'お名前', value: personalInfo.name },
              { label: 'ふりがな', value: personalInfo.nameKana },
              { label: '生年月日', value: personalInfo.dateOfBirth },
              { label: '電話番号', value: personalInfo.phone },
            ].map(({ label, value }) => (
              <View key={label} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: FONT_SIZE.small, color: colors.textLight, width: 50 }}>{label}</Text>
                <Text
                  style={{
                    fontSize: FONT_SIZE.body,
                    flex: 1,
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.primary,
                    borderBottomStyle: 'solid',
                    paddingBottom: 1,
                    minHeight: 13,
                  }}
                >
                  {value}
                </Text>
              </View>
            ))}
            {config.showIssuedDate && (
              <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, textAlign: 'right', marginTop: 6 }}>
                作成日: {'　'.repeat(6)} 年 　月 　日
              </Text>
            )}
          </View>
        </View>

        {/* Bottom accent */}
        <View style={{ height: 16, backgroundColor: colors.primary }} />
      </Page>
    );
  }

  // Basic style: stripe (default)
  return (
    <Page size="A6" style={{ fontFamily: 'NotoSansJP', padding: 0, flexDirection: 'column' }}>
      <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
        <Text style={{ fontSize: FONT_SIZE.small, color: colors.white, letterSpacing: 2 }}>
          MEDICATION NOTEBOOK
        </Text>
      </View>

      <View style={{ flex: 1, padding: MARGIN, flexDirection: 'column' }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: colors.text,
            textAlign: 'center',
            marginTop: 16,
            marginBottom: 8,
            letterSpacing: 4,
          }}
        >
          {notebookTitle}
        </Text>
        <View style={{ height: 4, marginTop: 6, marginBottom: 6, opacity: 0.3, backgroundColor: colors.primary }} />

        <View
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderStyle: 'solid',
            padding: 10,
            marginTop: 10,
          }}
        >
          {[
            { label: 'お名前', value: personalInfo.name },
            { label: 'ふりがな', value: personalInfo.nameKana },
            { label: '生年月日', value: personalInfo.dateOfBirth },
            { label: '電話番号', value: personalInfo.phone },
          ].map(({ label, value }) => (
            <View key={label} style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: FONT_SIZE.small, color: colors.textLight, width: 50 }}>{label}</Text>
              <Text
                style={{
                  fontSize: FONT_SIZE.body,
                  flex: 1,
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.border,
                  borderBottomStyle: 'solid',
                  paddingBottom: 1,
                  minHeight: 13,
                }}
              >
                {value}
              </Text>
            </View>
          ))}
        </View>

        {config.showIssuedDate && (
          <Text style={{ fontSize: FONT_SIZE.tiny, color: colors.textLight, textAlign: 'right', marginTop: 8 }}>
            作成日: {'　'.repeat(6)} 年 　月 　日
          </Text>
        )}
      </View>

      <View style={{ height: 20, backgroundColor: colors.primary }} />
    </Page>
  );
}
