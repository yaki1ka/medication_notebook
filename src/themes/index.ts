import type { DesignTheme } from '../types/notebook';

export interface PdfThemeConfig {
  name: DesignTheme;
  headerRadius: number;
  sectionRadius: number;
  entryBoxRadius: number;
  tableRadius: number;
  fieldStyle: 'underline' | 'box';
  headerPaddingV: number;
  sectionPaddingV: number;
  coverStyle: 'stripe' | 'card' | 'playful';
}

const basicTheme: PdfThemeConfig = {
  name: 'basic',
  headerRadius: 0,
  sectionRadius: 0,
  entryBoxRadius: 0,
  tableRadius: 0,
  fieldStyle: 'underline',
  headerPaddingV: 4,
  sectionPaddingV: 3,
  coverStyle: 'stripe',
};

const roundedTheme: PdfThemeConfig = {
  name: 'rounded',
  headerRadius: 0,
  sectionRadius: 4,
  entryBoxRadius: 6,
  tableRadius: 4,
  fieldStyle: 'box',
  headerPaddingV: 5,
  sectionPaddingV: 4,
  coverStyle: 'card',
};

const kidsTheme: PdfThemeConfig = {
  name: 'kids',
  headerRadius: 0,
  sectionRadius: 8,
  entryBoxRadius: 10,
  tableRadius: 6,
  fieldStyle: 'box',
  headerPaddingV: 8,
  sectionPaddingV: 5,
  coverStyle: 'playful',
};

const themes: Record<DesignTheme, PdfThemeConfig> = {
  basic: basicTheme,
  rounded: roundedTheme,
  kids: kidsTheme,
};

export function getThemeConfig(theme: DesignTheme): PdfThemeConfig {
  return themes[theme];
}
