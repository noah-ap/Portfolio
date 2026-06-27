import type { AnimationsConfig } from '@/lib/types/animations'

export const animations: AnimationsConfig = {
  presets: {
    cardHover: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      scale: 1.05,
      translateY: -4,
    },
    fadeIn: {
      duration: 600,
      easing: 'ease-out',
      opacity: [0, 1],
    },
    pageTransition: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: [1, 0],
      translateY: [0, -50],
    },
    sectionReveal: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: [0, 1],
      translateY: [50, 0],
    },
    staggerChildren: {
      duration: 300,
      easing: 'ease-out',
      delay: 50,
    },
    scrollSnap: {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    cylinderRotate: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: { stiffness: 100, damping: 30, mass: 1 },
    },
    expandCollapse: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      translateY: [-150, 0],
    },
    categorySpin: {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: [1, 0],
      opacityDelay: 0,
      opacityDuration: 400,
      delay: 20,
      scale: 0.8,
    },
    fogEntrance: {
      duration: 1500,
      easing: 'ease-in-out',
      delay: 1000,
      opacity: [0, 1],
    },
    navFadeIn: {
      duration: 1500,
      easing: 'ease-in-out',
      opacity: [0, 1],
    },
    indicatorStagger: {
      duration: 300,
      easing: 'ease-out',
      delay: 50,
      scale: 0.8,
    },
  },
}
