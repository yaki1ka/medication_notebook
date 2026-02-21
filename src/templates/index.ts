import { nanoid } from 'nanoid';
import type {
  PageKind,
  NotebookPage,
  PageConfig,
  CoverPageConfig,
  PersonalInfoPageConfig,
  AllergyPageConfig,
  MedicalHistoryPageConfig,
  DispensingPageConfig,
  DoctorPharmacyPageConfig,
  NotesPageConfig,
} from '../types/notebook';

const defaultConfigs: Record<PageKind, PageConfig> = {
  cover: {
    kind: 'cover',
    showIssuedDate: true,
  } as CoverPageConfig,

  personalInfo: {
    kind: 'personalInfo',
    showEmergencyContacts: true,
    emergencyContactSlots: 2,
    showFamilyDoctor: true,
    showBloodType: true,
  } as PersonalInfoPageConfig,

  allergy: {
    kind: 'allergy',
    rows: 8,
    showSeverityColumn: true,
    showDateColumn: true,
  } as AllergyPageConfig,

  medicalHistory: {
    kind: 'medicalHistory',
    rows: 8,
    showOnsetDateColumn: true,
    showHospitalColumn: true,
  } as MedicalHistoryPageConfig,

  dispensing: {
    kind: 'dispensing',
    rows: 10,
    columns: ['date', 'drugName', 'dosage', 'frequency', 'days', 'pharmacy', 'memo'],
  } as DispensingPageConfig,

  doctorPharmacy: {
    kind: 'doctorPharmacy',
    showNotes: false,
  } as DoctorPharmacyPageConfig,

  notes: {
    kind: 'notes',
    lineCount: 20,
    gridStyle: 'ruled',
  } as NotesPageConfig,
};

const defaultTitles: Record<PageKind, string> = {
  cover: 'お薬手帳',
  personalInfo: '基本情報',
  allergy: 'アレルギー・副作用歴',
  medicalHistory: '既往歴・現病歴',
  dispensing: '調剤記録',
  doctorPharmacy: 'かかりつけ医・薬局',
  notes: 'メモ',
};

const mandatoryPageSpecs: { kind: PageKind }[] = [
  { kind: 'cover' },
  { kind: 'personalInfo' },
  { kind: 'allergy' },
  { kind: 'medicalHistory' },
  { kind: 'dispensing' },
  { kind: 'doctorPharmacy' },
];

export function createPageFromTemplate(kind: PageKind): NotebookPage {
  return {
    id: nanoid(),
    kind,
    title: defaultTitles[kind],
    required: false,
    config: { ...defaultConfigs[kind] } as PageConfig,
  };
}

export function getDefaultPages(): NotebookPage[] {
  return mandatoryPageSpecs.map((spec) => ({
    id: nanoid(),
    kind: spec.kind,
    title: defaultTitles[spec.kind],
    required: true,
    config: { ...defaultConfigs[spec.kind] } as PageConfig,
  }));
}

export { defaultTitles, defaultConfigs };
