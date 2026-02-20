import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import type {
  NotebookState,
  PersonalInfo,
  PageConfig,
  PageKind,
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
  familyDoctor: '',
  familyDoctorHospital: '',
  familyDoctorPhone: '',
  familyPharmacy: '',
  familyPharmacyPhone: '',
  emergencyContacts: [],
  otherNotes: '',
};

const defaultState: NotebookState = {
  notebookTitle: 'お薬手帳',
  personalInfo: defaultPersonalInfo,
  pages: [],
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
  resetToDefaults: () => void;
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
          state.personalInfo.emergencyContacts = state.personalInfo.emergencyContacts.filter(
            (c) => c.id !== contactId
          );
        }),

      updateEmergencyContact: (contactId, field, value) =>
        set((state) => {
          const contact = state.personalInfo.emergencyContacts.find(
            (c) => c.id === contactId
          );
          if (contact) {
            (contact as Record<string, string>)[field] = value;
          }
        }),

      resetToDefaults: () =>
        set((state) => {
          state.notebookTitle = defaultState.notebookTitle;
          state.personalInfo = { ...defaultPersonalInfo };
          state.pages = getDefaultPages();
        }),
    })),
    { name: 'okusuri-notebook-v1' }
  )
);
