"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";

interface SelectionContextType {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  isSelected: (id: string) => boolean;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextType | null>(null);

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
};

interface SelectionProviderProps {
  children: React.ReactNode;
}

export const SelectionProvider: React.FC<SelectionProviderProps> = ({
  children,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isSelected = useCallback(
    (id: string) => {
      return selectedId === id;
    },
    [selectedId]
  );

  const clearSelection = useCallback(() => {
    setSelectedId(null);
  }, []);

  const contextValue: SelectionContextType = {
    selectedId,
    setSelectedId,
    isSelected,
    clearSelection,
  };

  return (
    <SelectionContext.Provider value={contextValue}>
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionProvider;
