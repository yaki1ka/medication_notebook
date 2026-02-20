import { useNotebookStore } from '../store/notebookStore';

export function usePageActions() {
  const { addPage, removePage, reorderPages, updatePageConfig, updatePageTitle } =
    useNotebookStore();

  return { addPage, removePage, reorderPages, updatePageConfig, updatePageTitle };
}
