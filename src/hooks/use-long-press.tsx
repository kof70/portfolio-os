"use client";

import * as React from "react";

export interface LongPressOptions {
  /** Durée en ms avant de déclencher le long press (défaut: 500ms) */
  threshold?: number;
  /** Callback appelé quand le long press est déclenché */
  onLongPress: (event: React.TouchEvent | React.MouseEvent) => void;
  /** Callback appelé au début du press */
  onStart?: (event: React.TouchEvent | React.MouseEvent) => void;
  /** Callback appelé à la fin du press (release) */
  onFinish?: (event: React.TouchEvent | React.MouseEvent) => void;
  /** Callback appelé si le press est annulé (mouvement, release avant threshold) */
  onCancel?: (event: React.TouchEvent | React.MouseEvent) => void;
  /** Désactiver le long press */
  disabled?: boolean;
  /** Distance max de mouvement avant d'annuler (défaut: 10px) */
  moveThreshold?: number;
}

export interface LongPressHandlers {
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  onMouseMove: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
  onTouchMove: (event: React.TouchEvent) => void;
}

export function useLongPress({
  threshold = 500,
  onLongPress,
  onStart,
  onFinish,
  onCancel,
  disabled = false,
  moveThreshold = 10,
}: LongPressOptions): LongPressHandlers {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressTriggeredRef = React.useRef(false);
  const startPosRef = React.useRef<{ x: number; y: number } | null>(null);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = React.useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (disabled) return;

      // Obtenir la position initiale
      if ("touches" in event) {
        startPosRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      } else {
        startPosRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
      }

      isLongPressTriggeredRef.current = false;
      onStart?.(event);

      timerRef.current = setTimeout(() => {
        isLongPressTriggeredRef.current = true;
        onLongPress(event);

        // Vibration tactile si disponible
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(50);
        }
      }, threshold);
    },
    [disabled, onLongPress, onStart, threshold]
  );

  const move = React.useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (!startPosRef.current || disabled) return;

      let currentX: number;
      let currentY: number;

      if ("touches" in event) {
        currentX = event.touches[0].clientX;
        currentY = event.touches[0].clientY;
      } else {
        currentX = event.clientX;
        currentY = event.clientY;
      }

      // Calculer la distance de mouvement
      const deltaX = Math.abs(currentX - startPosRef.current.x);
      const deltaY = Math.abs(currentY - startPosRef.current.y);

      // Si le mouvement dépasse le seuil, annuler le long press
      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        clearTimer();
        if (!isLongPressTriggeredRef.current) {
          onCancel?.(event);
        }
        startPosRef.current = null;
      }
    },
    [clearTimer, disabled, moveThreshold, onCancel]
  );

  const end = React.useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      clearTimer();
      startPosRef.current = null;

      if (disabled) return;

      if (isLongPressTriggeredRef.current) {
        // Long press était déclenché, empêcher les actions par défaut
        event.preventDefault();
        onFinish?.(event);
      } else {
        // Press normal (pas assez long)
        onCancel?.(event);
      }
    },
    [clearTimer, disabled, onCancel, onFinish]
  );

  // Nettoyer le timer au démontage
  React.useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    onMouseDown: start as (event: React.MouseEvent) => void,
    onMouseUp: end as (event: React.MouseEvent) => void,
    onMouseLeave: end as (event: React.MouseEvent) => void,
    onMouseMove: move as (event: React.MouseEvent) => void,
    onTouchStart: start as (event: React.TouchEvent) => void,
    onTouchEnd: end as (event: React.TouchEvent) => void,
    onTouchMove: move as (event: React.TouchEvent) => void,
  };
}

export default useLongPress;
