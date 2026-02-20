import { useState, useEffect } from 'react';
import type { NotebookState } from '../types/notebook';
import { useNotebookStore } from '../store/notebookStore';

export function useDebouncedPdf(delay = 800): NotebookState {
  const liveState = useNotebookStore();
  const [debouncedState, setDebouncedState] = useState<NotebookState>({
    notebookTitle: liveState.notebookTitle,
    personalInfo: liveState.personalInfo,
    pages: liveState.pages,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedState({
        notebookTitle: liveState.notebookTitle,
        personalInfo: liveState.personalInfo,
        pages: liveState.pages,
      });
    }, delay);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveState.notebookTitle, liveState.personalInfo, liveState.pages, delay]);

  return debouncedState;
}
