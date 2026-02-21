import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import type {
  NotebookState,
  PersonalInfo,
  PageConfig,
  PageKind,
  DoctorEntry,
  PharmacyEntry,
  ColorMode,
  DesignTheme,
} from '../types/notebook';
import { getDefaultPages, createPageFromTemplate } from '../templates';

const defaultPersonalInfo: PersonalInfo = {
  name: '',
  nameKana: '',
  dateOfBirth: '',
  bloodType: 'unknown',
  address: '',
  phone: '',
  preExistingConditions: '',
  doctors: [],
  pharmacies: [],
  emergencyContacts: [],
  otherNotes: '',
};

const defaultState: NotebookState = {
  notebookTitle: 'お薬手帳',
  personalInfo: defaultPersonalInfo,
  pages: [],
  accentColor: '#2563eb',
  colorMode: 'color',
  designTheme: 'basic',
};

interface NotebookActions {
  updatePersonalInfo: (patch: Partial<PersonalInfo>) => void;
  addPage: (kind: PageKind) => void;
  removePage: (id: string) => void;
  reorderPages: (activeId: string, overId: string) => void;
  updatePageConfig: (id: string, config: Partial<PageConfig>) => void;
  updatePageTitle: (id: string, title: string) => void;
  updateNotebookTitle: (title: string) => void;
  addEmergencyContact: () => void;
  removeEmergencyContact: (contactId: string) => void;
  updateEmergencyContact: (contactId: string, field: string, value: string) => void;
  addDoctor: () => void;
  removeDoctor: (id: string) => void;
  updateDoctor: (id: string, field: keyof DoctorEntry, value: string) => void;
  addPharmacy: () => void;
  removePharmacy: (id: string) => void;
  updatePharmacy: (id: string, field: keyof PharmacyEntry, value: string) => void;
  updateAccentColor: (color: string) => void;
  setColorMode: (mode: ColorMode) => void;
  setDesignTheme: (theme: DesignTheme) => void;
  addMultiplePages: (kind: PageKind, count: number) => void;
  resetToDefaults: () => void;
  loadFromExport: (data: Partial<NotebookState>) => void;
}

export const useNotebookStore = create<NotebookState & NotebookActions>()(
  persist(
    immer((set) => ({
      ...defaultState,
      pages: getDefaultPages(),

      updatePersonalInfo: (patch) =>
        set((state) => {
          Object.assign(state.personalInfo, patch);
        }),

      addPage: (kind) =>
        set((state) => {
          state.pages.push(createPageFromTemplate(kind));
        }),

      addMultiplePages: (kind, count) =>
        set((state) => {
          for (let i = 0; i < count; i++) {
            state.pages.push(createPageFromTemplate(kind));
          }
        }),

      removePage: (id) =>
        set((state) => {
          const page = state.pages.find((p) => p.id === id);
          if (!page?.required) {
            state.pages = state.pages.filter((p) => p.id !== id);
          }
        }),

      reorderPages: (activeId, overId) =>
        set((state) => {
          const oldIdx = state.pages.findIndex((p) => p.id === activeId);
          const newIdx = state.pages.findIndex((p) => p.id === overId);
          if (oldIdx !== -1 && newIdx !== -1) {
            const [moved] = state.pages.splice(oldIdx, 1);
            state.pages.splice(newIdx, 0, moved);
          }
        }),

      updatePageConfig: (id, config) =>
        set((state) => {
          const page = state.pages.find((p) => p.id === id);
          if (page) {
            Object.assign(page.config, config);
          }
        }),

      updatePageTitle: (id, title) =>
        set((state) => {
          const page = state.pages.find((p) => p.id === id);
          if (page) {
            page.title = title;
          }
        }),

      updateNotebookTitle: (title) =>
        set((state) => {
          state.notebookTitle = title;
        }),

      addEmergencyContact: () =>
        set((state) => {
          state.personalInfo.emergencyContacts.push({
            id: nanoid(),
            name: '',
            relationship: '',
            phone: '',
          });
        }),

      removeEmergencyContact: (contactId) =>
        set((state) => {
          state.personalInfo.emergencyContacts =
            state.personalInfo.emergencyContacts.filter((c) => c.id !== contactId);
        }),

      updateEmergencyContact: (contactId, field, value) =>
        set((state) => {
          const contact = state.personalInfo.emergencyContacts.find((c) => c.id === contactId);
          if (contact) {
            (contact as Record<string, string>)[field] = value;
          }
        }),

      addDoctor: () =>
        set((state) => {
          state.personalInfo.doctors.push({
            id: nanoid(),
            name: '',
            hospital: '',
            department: '',
            phone: '',
            notes: '',
          });
        }),

      removeDoctor: (id) =>
        set((state) => {
          state.personalInfo.doctors = state.personalInfo.doctors.filter((d) => d.id !== id);
        }),

      updateDoctor: (id, field, value) =>
        set((state) => {
          const doctor = state.personalInfo.doctors.find((d) => d.id === id);
          if (doctor) {
            (doctor as Record<string, string>)[field] = value;
          }
        }),

      addPharmacy: () =>
        set((state) => {
          state.personalInfo.pharmacies.push({
            id: nanoid(),
            name: '',
            address: '',
            phone: '',
            notes: '',
          });
        }),

      removePharmacy: (id) =>
        set((state) => {
          state.personalInfo.pharmacies = state.personalInfo.pharmacies.filter((p) => p.id !== id);
        }),

      updatePharmacy: (id, field, value) =>
        set((state) => {
          const pharmacy = state.personalInfo.pharmacies.find((p) => p.id === id);
          if (pharmacy) {
            (pharmacy as Record<string, string>)[field] = value;
          }
        }),

      updateAccentColor: (color) =>
        set((state) => {
          state.accentColor = color;
        }),

      setColorMode: (mode) =>
        set((state) => {
          state.colorMode = mode;
        }),

      setDesignTheme: (theme) =>
        set((state) => {
          state.designTheme = theme;
        }),

      resetToDefaults: () =>
        set((state) => {
          state.notebookTitle = defaultState.notebookTitle;
          state.personalInfo = { ...defaultPersonalInfo };
          state.pages = getDefaultPages();
          state.accentColor = defaultState.accentColor;
          state.colorMode = defaultState.colorMode;
          state.designTheme = defaultState.designTheme;
        }),

      loadFromExport: (data) =>
        set((state) => {
          if (data.notebookTitle !== undefined) state.notebookTitle = data.notebookTitle;
          if (data.personalInfo !== undefined) state.personalInfo = data.personalInfo;
          if (data.pages !== undefined) state.pages = data.pages;
          if (data.accentColor !== undefined) state.accentColor = data.accentColor;
          if (data.colorMode !== undefined) state.colorMode = data.colorMode;
          if (data.designTheme !== undefined) state.designTheme = data.designTheme;
        }),
    })),
    {
      name: 'okusuri-notebook-v1',
      version: 2,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as Record<string, unknown>;
        if (version < 2) {
          const pi = state.personalInfo as Record<string, unknown> | undefined;
          if (pi) {
            if (!pi.doctors) {
              const oldDoctor = pi.familyDoctor as string | undefined;
              const oldHospital = pi.familyDoctorHospital as string | undefined;
              const oldPhone = pi.familyDoctorPhone as string | undefined;
              pi.doctors =
                oldDoctor || oldHospital || oldPhone
                  ? [{ id: nanoid(), name: oldDoctor || '', hospital: oldHospital || '', department: '', phone: oldPhone || '', notes: '' }]
                  : [];
              delete pi.familyDoctor;
              delete pi.familyDoctorHospital;
              delete pi.familyDoctorPhone;
            }
            if (!pi.pharmacies) {
              const oldPharmacy = pi.familyPharmacy as string | undefined;
              const oldPharmacyPhone = pi.familyPharmacyPhone as string | undefined;
              pi.pharmacies =
                oldPharmacy || oldPharmacyPhone
                  ? [{ id: nanoid(), name: oldPharmacy || '', address: '', phone: oldPharmacyPhone || '', notes: '' }]
                  : [];
              delete pi.familyPharmacy;
              delete pi.familyPharmacyPhone;
            }
          }
          if (!state.accentColor) state.accentColor = '#2563eb';
          if (!state.colorMode) state.colorMode = 'color';
          if (!state.designTheme) state.designTheme = 'basic';
          if (Array.isArray(state.pages)) {
            state.pages = (state.pages as Record<string, unknown>[]).map((page) => {
              if (page.kind === 'doctorPharmacy') {
                return { ...page, config: { kind: 'doctorPharmacy', showNotes: false } };
              }
              if (page.kind === 'cover') {
                const cfg = page.config as Record<string, unknown>;
                return { ...page, config: { kind: 'cover', showIssuedDate: cfg.showIssuedDate ?? true } };
              }
              return page;
            });
          }
        }
        return state as unknown as NotebookState;
      },
    }
  )
);
