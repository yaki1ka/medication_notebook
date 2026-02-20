import { StyleSheet } from '@react-pdf/renderer';

// A6 page dimensions in points (1mm = 2.8346pt)
// A6 = 105mm × 148mm = 297.64pt × 419.53pt
export const A6 = { width: 297.64, height: 419.53 };
export const MARGIN = 20; // ~7mm
export const LIVE_WIDTH = A6.width - MARGIN * 2; // ~257pt

export const COLORS = {
  primary: '#2563eb',
  text: '#1a1a1a',
  textLight: '#555555',
  border: '#999999',
  borderLight: '#cccccc',
  headerBg: '#2563eb',
  headerText: '#ffffff',
  altRow: '#f8f9fa',
  white: '#ffffff',
};

export const FONT_SIZE = {
  tiny: 5.5,
  small: 6.5,
  body: 8,
  medium: 9,
  heading: 11,
  title: 16,
};

export const sharedStyles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansJP',
    fontSize: FONT_SIZE.body,
    color: COLORS.text,
    padding: MARGIN,
    flexDirection: 'column',
  },
  pageTitle: {
    fontSize: FONT_SIZE.heading,
    fontWeight: 700,
    color: COLORS.headerText,
    backgroundColor: COLORS.headerBg,
    padding: '4 8',
    marginBottom: 6,
  },
  sectionHeader: {
    fontSize: FONT_SIZE.small,
    fontWeight: 700,
    backgroundColor: '#e2e8f0',
    color: COLORS.text,
    padding: '2 4',
    marginBottom: 2,
    marginTop: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderLight,
    borderBottomStyle: 'solid',
    minHeight: 16,
    alignItems: 'stretch',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    borderBottomStyle: 'solid',
  },
  tableCell: {
    padding: '2 3',
    fontSize: FONT_SIZE.small,
    borderRightWidth: 0.5,
    borderRightColor: COLORS.borderLight,
    borderRightStyle: 'solid',
  },
  tableCellLast: {
    padding: '2 3',
    fontSize: FONT_SIZE.small,
  },
  tableHeaderCell: {
    padding: '2 3',
    fontSize: FONT_SIZE.tiny,
    fontWeight: 700,
    borderRightWidth: 0.5,
    borderRightColor: COLORS.border,
    borderRightStyle: 'solid',
  },
  tableHeaderCellLast: {
    padding: '2 3',
    fontSize: FONT_SIZE.tiny,
    fontWeight: 700,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-end',
  },
  fieldLabel: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textLight,
    width: 60,
    flexShrink: 0,
  },
  fieldValue: {
    fontSize: FONT_SIZE.body,
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    borderBottomStyle: 'solid',
    paddingBottom: 1,
  },
  outerBorder: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'solid',
    flex: 1,
    overflow: 'hidden',
  },
});
