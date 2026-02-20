// ---- Personal Information ----
export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface PersonalInfo {
  name: string;
  nameKana: string;
  dateOfBirth: string;
  bloodType: 'A' | 'B' | 'AB' | 'O' | 'unknown';
  address: string;
  phone: string;
  preExistingConditions: string;
  familyDoctor: string;
  familyDoctorHospital: string;
  familyDoctorPhone: string;
  familyPharmacy: string;
  familyPharmacyPhone: string;
  emergencyContacts: EmergencyContact[];
  otherNotes: string;
}

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
  accentColor: string;
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
  doctorSlots: number;
  pharmacySlots: number;
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
}
