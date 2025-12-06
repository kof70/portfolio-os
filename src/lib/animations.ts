// =============================================================================
// ANIMATION CONFIGURATIONS
// Centralized animation settings for consistent motion throughout the app
// =============================================================================

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

/**
 * Spring transition for smooth, natural animations
 * Used for pop effects, scale animations, dock icons
 */
export const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
};

/**
 * Soft spring for gentler animations
 * Used for menu items, tooltips
 */
export const softSpringTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Bouncy spring for playful effects
 * Used for notifications, alerts
 */
export const bouncySpringTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 15,
  mass: 0.5,
};

/**
 * Pop animation config - smooth and fluid
 * Used for dock icons appearing/disappearing
 */
export const popTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
};

/**
 * Ease transition for subtle animations
 * Used for opacity, color changes
 */
export const easeTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

/**
 * Slow ease for longer animations
 * Used for page transitions, modals
 */
export const slowEaseTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

/**
 * Fade in/out animation
 */
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Scale and fade animation (for modals, popups)
 */
export const scaleVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Pop animation (for icons, buttons)
 */
export const popVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

/**
 * Slide up animation
 */
export const slideUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

/**
 * Slide down animation
 */
export const slideDownVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Slide from left animation
 */
export const slideLeftVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/**
 * Slide from right animation
 */
export const slideRightVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/**
 * Window minimize animation (macOS style)
 */
export const windowMinimizeVariants = {
  visible: {
    scale: 1,
    y: 0,
    opacity: 1,
  },
  minimized: {
    scale: 0.3,
    y: "100vh",
    opacity: 0,
  },
};

/**
 * Stagger children animation
 */
export const staggerContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const staggerItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

// =============================================================================
// HOVER ANIMATIONS
// =============================================================================

/**
 * Hover scale effect
 */
export const hoverScale = {
  scale: 1.05,
  transition: springTransition,
};

/**
 * Hover scale small effect
 */
export const hoverScaleSmall = {
  scale: 1.02,
  transition: springTransition,
};

/**
 * Tap/Press effect
 */
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

/**
 * Hover lift effect (scale + shadow simulation)
 */
export const hoverLift = {
  scale: 1.02,
  y: -2,
  transition: springTransition,
};

// =============================================================================
// DOCK ANIMATIONS
// =============================================================================

/**
 * Dock icon magnification settings
 */
export const dockMagnification = {
  baseSize: 48,
  maxSize: 64,
  distance: 140,
};

/**
 * Dock bounce animation (for notifications)
 */
export const dockBounceVariants = {
  initial: { y: 0 },
  bounce: {
    y: [-5, 0, -5, 0],
    transition: {
      duration: 0.5,
      repeat: 2,
      ease: "easeInOut",
    },
  },
};

// =============================================================================
// CSS ANIMATION CLASSES
// These match the classes defined in globals.css
// =============================================================================

export const cssAnimationClasses = {
  windowAnimate: "window-animate",
  windowMinimize: "window-minimize",
  windowRestore: "window-restore",
  windowNoTransition: "window-no-transition",
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Create a stagger delay based on index
 */
export const getStaggerDelay = (index: number, baseDelay = 0.05) =>
  index * baseDelay;

/**
 * Create a custom spring transition
 */
export const createSpringTransition = (
  stiffness = 400,
  damping = 25,
  mass = 0.8,
) => ({
  type: "spring" as const,
  stiffness,
  damping,
  mass,
});

/**
 * Create a custom ease transition
 */
export const createEaseTransition = (
  duration = 0.2,
  ease: readonly number[] = [0.25, 0.1, 0.25, 1],
) => ({
  duration,
  ease,
});
