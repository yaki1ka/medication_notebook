// ---- Personal Information ----
export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface DoctorEntry {
  id: string;
  name: string;
  hospital: string;
  department: string;
  phone: string;
  notes: string;
}

export interface PharmacyEntry {
  id: string;
  name: string;
  address: string;
  phone: string;
  notes: string;
}

export interface PersonalInfo {
  name: string;
  nameKana: string;
  dateOfBirth: string;
  bloodType: 'A' | 'B' | 'AB' | 'O' | 'unknown';
  address: string;
  phone: string;
  preExistingConditions: string;
  doctors: DoctorEntry[];
  pharmacies: PharmacyEntry[];
  emergencyContacts: EmergencyContact[];
  otherNotes: string;
}

// ---- Global Style Settings ----
export type ColorMode = 'color' | 'monochrome';
export type DesignTheme = 'basic' | 'rounded' | 'kids';

// ---- Page Template Types ----
export type PageKind =
  | 'cover'
  | 'personalInfo'
  | 'allergy'
  | 'medicalHistory'
  | 'dispensing'
  | 'doctorPharmacy'
  | 'notes';

// ---- Per-page configuration ----
export interface CoverPageConfig {
  kind: 'cover';
  showIssuedDate: boolean;
}

export interface PersonalInfoPageConfig {
  kind: 'personalInfo';
  showEmergencyContacts: boolean;
  emergencyContactSlots: number;
  showFamilyDoctor: boolean;
  showBloodType: boolean;
}

export interface AllergyPageConfig {
  kind: 'allergy';
  rows: number;
  showSeverityColumn: boolean;
  showDateColumn: boolean;
}

export interface MedicalHistoryPageConfig {
  kind: 'medicalHistory';
  rows: number;
  showOnsetDateColumn: boolean;
  showHospitalColumn: boolean;
}

export type DispensingColumn =
  | 'date'
  | 'drugName'
  | 'dosage'
  | 'frequency'
  | 'days'
  | 'pharmacy'
  | 'memo';

export interface DispensingPageConfig {
  kind: 'dispensing';
  rows: number;
  columns: DispensingColumn[];
}

export interface DoctorPharmacyPageConfig {
  kind: 'doctorPharmacy';
  showNotes: boolean;
}

export interface NotesPageConfig {
  kind: 'notes';
  lineCount: number;
  gridStyle: 'ruled' | 'blank' | 'dotted';
}

export type PageConfig =
  | CoverPageConfig
  | PersonalInfoPageConfig
  | AllergyPageConfig
  | MedicalHistoryPageConfig
  | DispensingPageConfig
  | DoctorPharmacyPageConfig
  | NotesPageConfig;

// ---- Notebook Page ----
export interface NotebookPage {
  id: string;
  kind: PageKind;
  title: string;
  required: boolean;
  config: PageConfig;
}

// ---- Root State ----
export interface NotebookState {
  notebookTitle: string;
  personalInfo: PersonalInfo;
  pages: NotebookPage[];
  accentColor: string;
  colorMode: ColorMode;
  designTheme: DesignTheme;
}
