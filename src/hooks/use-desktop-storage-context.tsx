"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { GridPosition } from "@/components/desktop/desktop-grid";

// Types
export interface DesktopItemStorage {
  id: string;
  position: GridPosition;
}

export interface DesktopStorageState {
  items: DesktopItemStorage[];
  wallpaper: string;
  wallpaperMobile: string;
  lastUpdated: number;
}

interface DesktopStorageContextType {
  // État
  state: DesktopStorageState;
  isLoaded: boolean;
  wallpaper: string;
  wallpaperMobile: string;
  items: DesktopItemStorage[];

  // Actions sur les items
  saveItemPosition: (id: string, position: GridPosition) => void;
  getItemPosition: (id: string) => GridPosition | null;
  removeItem: (id: string) => void;
  resetAllPositions: () => void;

  // Actions sur le wallpaper
  setWallpaper: (wallpaper: string) => void;
  setWallpaperMobile: (wallpaper: string) => void;

  // Actions globales
  resetAll: () => void;
  exportConfig: () => string;
  importConfig: (configJson: string) => boolean;
}

const STORAGE_KEY = "portfolio-os-desktop-state";
const STORAGE_VERSION = 1;

// Valeurs par défaut
const defaultState: DesktopStorageState = {
  items: [],
  wallpaper: "/assets/bg-3.jpg",
  wallpaperMobile: "/assets/bg-mobile.jpg",
  lastUpdated: Date.now(),
};

// Helper pour vérifier si on est côté client
const isClient = typeof window !== "undefined";

// Fonction pour charger l'état depuis localStorage
const loadFromStorage = (): DesktopStorageState | null => {
  if (!isClient) return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    // Vérification de version (pour migration future)
    if (parsed.version !== STORAGE_VERSION) {
      console.log("Storage version mismatch, using defaults");
      return null;
    }

    return parsed.state as DesktopStorageState;
  } catch (error) {
    console.error("Error loading desktop state from storage:", error);
    return null;
  }
};

// Fonction pour sauvegarder l'état dans localStorage
const saveToStorage = (state: DesktopStorageState): void => {
  if (!isClient) return;

  try {
    const toStore = {
      version: STORAGE_VERSION,
      state: {
        ...state,
        lastUpdated: Date.now(),
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    console.error("Error saving desktop state to storage:", error);
  }
};

const DesktopStorageContext = createContext<DesktopStorageContextType | null>(null);

export const useDesktopStorage = () => {
  const context = useContext(DesktopStorageContext);
  if (!context) {
    throw new Error("useDesktopStorage must be used within a DesktopStorageProvider");
  }
  return context;
};

interface DesktopStorageProviderProps {
  children: React.ReactNode;
}

export const DesktopStorageProvider: React.FC<DesktopStorageProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<DesktopStorageState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger l'état au montage (côté client uniquement)
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setState({
        ...defaultState,
        ...stored,
      });
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder la position d'un item
  const saveItemPosition = useCallback((id: string, position: GridPosition) => {
    setState((prev) => {
      const existingIndex = prev.items.findIndex((item) => item.id === id);
      let newItems: DesktopItemStorage[];

      if (existingIndex >= 0) {
        // Mettre à jour l'item existant
        newItems = [...prev.items];
        newItems[existingIndex] = { id, position };
      } else {
        // Ajouter un nouvel item
        newItems = [...prev.items, { id, position }];
      }

      const newState = {
        ...prev,
        items: newItems,
        lastUpdated: Date.now(),
      };

      // Sauvegarder dans localStorage
      saveToStorage(newState);

      return newState;
    });
  }, []);

  // Récupérer la position sauvegardée d'un item
  const getItemPosition = useCallback(
    (id: string): GridPosition | null => {
      const item = state.items.find((item) => item.id === id);
      return item?.position || null;
    },
    [state.items]
  );

  // Supprimer un item du stockage
  const removeItem = useCallback((id: string) => {
    setState((prev) => {
      const newItems = prev.items.filter((item) => item.id !== id);
      const newState = {
        ...prev,
        items: newItems,
        lastUpdated: Date.now(),
      };

      saveToStorage(newState);
      return newState;
    });
  }, []);

  // Changer le fond d'écran desktop
  const setWallpaper = useCallback((wallpaper: string) => {
    setState((prev) => {
      const newState = {
        ...prev,
        wallpaper,
        lastUpdated: Date.now(),
      };

      saveToStorage(newState);
      return newState;
    });
  }, []);

  // Changer le fond d'écran mobile
  const setWallpaperMobile = useCallback((wallpaperMobile: string) => {
    setState((prev) => {
      const newState = {
        ...prev,
        wallpaperMobile,
        lastUpdated: Date.now(),
      };

      saveToStorage(newState);
      return newState;
    });
  }, []);

  // Réinitialiser toutes les positions
  const resetAllPositions = useCallback(() => {
    setState((prev) => {
      const newState = {
        ...prev,
        items: [],
        lastUpdated: Date.now(),
      };

      saveToStorage(newState);
      return newState;
    });
  }, []);

  // Réinitialiser tout (positions + wallpaper)
  const resetAll = useCallback(() => {
    if (isClient) {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState(defaultState);
  }, []);

  // Exporter la configuration (pour backup)
  const exportConfig = useCallback((): string => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  // Importer une configuration
  const importConfig = useCallback((configJson: string): boolean => {
    try {
      const imported = JSON.parse(configJson) as DesktopStorageState;

      // Validation basique
      if (!imported.items || !Array.isArray(imported.items)) {
        throw new Error("Invalid config format");
      }

      const newState = {
        ...defaultState,
        ...imported,
        lastUpdated: Date.now(),
      };

      setState(newState);
      saveToStorage(newState);
      return true;
    } catch (error) {
      console.error("Error importing config:", error);
      return false;
    }
  }, []);

  const contextValue: DesktopStorageContextType = {
    // État
    state,
    isLoaded,
    wallpaper: state.wallpaper,
    wallpaperMobile: state.wallpaperMobile,
    items: state.items,

    // Actions sur les items
    saveItemPosition,
    getItemPosition,
    removeItem,
    resetAllPositions,

    // Actions sur le wallpaper
    setWallpaper,
    setWallpaperMobile,

    // Actions globales
    resetAll,
    exportConfig,
    importConfig,
  };

  return (
    <DesktopStorageContext.Provider value={contextValue}>
      {children}
    </DesktopStorageContext.Provider>
  );
};

export default DesktopStorageProvider;
