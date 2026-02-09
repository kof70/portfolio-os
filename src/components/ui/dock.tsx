"use client";

import React, { PropsWithChildren, useRef, useCallback, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionProps } from "motion/react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const DEFAULT_DISABLEMAGNIFICATION = false;

const dockVariants = cva(
  "mx-auto flex h-20 w-max items-center justify-center gap-2 rounded-2xl border p-2 ",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);
    const prefersReducedMotion = useReducedMotion();

    const renderedChildren = React.useMemo(
      () =>
        React.Children.map(children, (child) => {
          if (
            React.isValidElement<DockIconProps>(child) &&
            child.type === DockIcon
          ) {
            return React.cloneElement(child, {
              ...child.props,
              mouseX: mouseX,
              size: iconSize,
              magnification: iconMagnification,
              disableMagnification: disableMagnification || prefersReducedMotion,
              distance: iconDistance,
            });
          }
          return child;
        }),
      [children, mouseX, iconSize, iconMagnification, disableMagnification, iconDistance, prefersReducedMotion],
    );

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderedChildren}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  magnification?: number;
  disableMagnification?: boolean;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<{ x: number; width: number }>({ x: 0, width: 0 });
  // Réduction du padding pour répondre au prompt "le padding est trop"
  const padding = Math.max(2, size * 0.1);
  const defaultMouseX = useMotionValue(Infinity);

  // Cache getBoundingClientRect to avoid forced layout reads on every mousemove
  const updateBounds = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      boundsRef.current = { x: rect.x, width: rect.width };
    }
  }, []);

  // Update bounds on mount, resize, and scroll
  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds, true);
    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds, true);
    };
  }, [updateBounds]);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = boundsRef.current;
    return val - bounds.x - bounds.width / 2;
  });

  const targetSize = disableMagnification ? size : magnification;

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size],
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 300,
    damping: 20,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        disableMagnification && "hover:bg-muted-foreground transition-colors",
        className,
      )}
      {...props}
    >
      <div>{children}</div>
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
