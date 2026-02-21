import { useState, useEffect } from 'react';
import type { NotebookState } from '../types/notebook';
import { useNotebookStore } from '../store/notebookStore';

export function useDebouncedPdf(delay = 1200): NotebookState {
  const liveState = useNotebookStore();
  const [debouncedState, setDebouncedState] = useState<NotebookState>({
    notebookTitle: liveState.notebookTitle,
    personalInfo: liveState.personalInfo,
    pages: liveState.pages,
    accentColor: liveState.accentColor,
    colorMode: liveState.colorMode,
    designTheme: liveState.designTheme,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedState({
        notebookTitle: liveState.notebookTitle,
        personalInfo: liveState.personalInfo,
        pages: liveState.pages,
        accentColor: liveState.accentColor,
        colorMode: liveState.colorMode,
        designTheme: liveState.designTheme,
      });
    }, delay);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    liveState.notebookTitle,
    liveState.personalInfo,
    liveState.pages,
    liveState.accentColor,
    liveState.colorMode,
    liveState.designTheme,
    delay,
  ]);

  return debouncedState;
}
