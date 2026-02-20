import './PdfFonts';
import { Document } from '@react-pdf/renderer';
import type { NotebookState } from '../../types/notebook';
import { PdfCoverPage } from './pages/PdfCoverPage';
import { PdfPersonalInfoPage } from './pages/PdfPersonalInfoPage';
import { PdfAllergyPage } from './pages/PdfAllergyPage';
import { PdfMedicalHistoryPage } from './pages/PdfMedicalHistoryPage';
import { PdfDispensingPage } from './pages/PdfDispensingPage';
import { PdfDoctorPharmacyPage } from './pages/PdfDoctorPharmacyPage';
import { PdfNotesPage } from './pages/PdfNotesPage';

interface Props {
  state: NotebookState;
}

let dispensingCount = 0;

export function PdfDocument({ state }: Props) {
  const { pages, personalInfo, notebookTitle } = state;
  dispensingCount = 0;

  return (
    <Document
      title={notebookTitle}
      author={personalInfo.name}
      creator="お薬手帳ビルダー"
      producer="お薬手帳ビルダー"
    >
      {pages.map((page) => {
        switch (page.kind) {
          case 'cover':
            return (
              <PdfCoverPage
                key={page.id}
                page={page}
                personalInfo={personalInfo}
                notebookTitle={notebookTitle}
              />
            );
          case 'personalInfo':
            return (
              <PdfPersonalInfoPage
                key={page.id}
                page={page}
                personalInfo={personalInfo}
              />
            );
          case 'allergy':
            return <PdfAllergyPage key={page.id} page={page} />;
          case 'medicalHistory':
            return (
              <PdfMedicalHistoryPage
                key={page.id}
                page={page}
                personalInfo={personalInfo}
              />
            );
          case 'dispensing': {
            dispensingCount++;
            return (
              <PdfDispensingPage
                key={page.id}
                page={page}
                pageIndex={dispensingCount}
              />
            );
          }
          case 'doctorPharmacy':
            return (
              <PdfDoctorPharmacyPage
                key={page.id}
                page={page}
                personalInfo={personalInfo}
              />
            );
          case 'notes':
            return <PdfNotesPage key={page.id} page={page} />;
          default:
            return null;
        }
      })}
    </Document>
  );
}
