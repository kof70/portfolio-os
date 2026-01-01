"use client";

import * as React from "react";
import { GridPosition } from "@/components/desktop/desktop-grid";

// Types
export interface DesktopItemStorage {
  id: string;
  position: GridPosition;
}

export interface DesktopStorageState {
  items: DesktopItemStorage[];
  wallpaper: string;
  lastUpdated: number;
}

const STORAGE_KEY = "portfolio-os-desktop-state";
const STORAGE_VERSION = 1;

// Valeurs par défaut
const defaultState: DesktopStorageState = {
  items: [],
  wallpaper: "/assets/bg-3.jpg",
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

// Hook principal
export function useDesktopStorage() {
  const [state, setState] = React.useState<DesktopStorageState>(defaultState);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Charger l'état au montage (côté client uniquement)
  React.useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setState(stored);
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder la position d'un item
  const saveItemPosition = React.useCallback(
    (id: string, position: GridPosition) => {
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
    },
    []
  );

  // Récupérer la position sauvegardée d'un item
  const getItemPosition = React.useCallback(
    (id: string): GridPosition | null => {
      const item = state.items.find((item) => item.id === id);
      return item?.position || null;
    },
    [state.items]
  );

  // Supprimer un item du stockage
  const removeItem = React.useCallback((id: string) => {
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

  // Changer le fond d'écran
  const setWallpaper = React.useCallback((wallpaper: string) => {
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

  // Réinitialiser toutes les positions
  const resetAllPositions = React.useCallback(() => {
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
  const resetAll = React.useCallback(() => {
    if (isClient) {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState(defaultState);
  }, []);

  // Exporter la configuration (pour backup)
  const exportConfig = React.useCallback((): string => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  // Importer une configuration
  const importConfig = React.useCallback((configJson: string): boolean => {
    try {
      const imported = JSON.parse(configJson) as DesktopStorageState;

      // Validation basique
      if (!imported.items || !Array.isArray(imported.items)) {
        throw new Error("Invalid config format");
      }

      setState(imported);
      saveToStorage(imported);
      return true;
    } catch (error) {
      console.error("Error importing config:", error);
      return false;
    }
  }, []);

  return {
    // État
    state,
    isLoaded,
    wallpaper: state.wallpaper,
    items: state.items,

    // Actions sur les items
    saveItemPosition,
    getItemPosition,
    removeItem,
    resetAllPositions,

    // Actions sur le wallpaper
    setWallpaper,

    // Actions globales
    resetAll,
    exportConfig,
    importConfig,
  };
}

// Hook simplifié pour un seul item (pour DraggableItem)
export function useItemPosition(id: string, initialPosition: GridPosition) {
  const { getItemPosition, saveItemPosition, isLoaded } = useDesktopStorage();

  const [position, setPosition] = React.useState<GridPosition>(initialPosition);

  // Charger la position sauvegardée au montage
  React.useEffect(() => {
    if (isLoaded) {
      const savedPosition = getItemPosition(id);
      if (savedPosition) {
        setPosition(savedPosition);
      }
    }
  }, [id, isLoaded, getItemPosition]);

  // Mettre à jour la position
  const updatePosition = React.useCallback(
    (newPosition: GridPosition) => {
      setPosition(newPosition);
      saveItemPosition(id, newPosition);
    },
    [id, saveItemPosition]
  );

  return {
    position,
    updatePosition,
    isLoaded,
  };
}

export default useDesktopStorage;
