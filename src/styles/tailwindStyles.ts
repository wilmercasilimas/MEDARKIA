// src/styles/tailwindStyles.ts

export const layoutPadding = `
  px-4 py-4
  sm:px-6 sm:py-6
  md:px-8 md:py-8
  xl:px-12 xl:py-10
  2xl:px-16 2xl:py-12
`;

export const sectionSpacing = `
  space-y-4 sm:space-y-6 md:space-y-8
`;

export const titleText = `
  text-xl sm:text-2xl md:text-3xl xl:text-4xl
  font-bold tracking-tight text-gray-900 dark:text-white
`;

export const subtitleText = `
  text-base sm:text-lg md:text-xl
  font-semibold text-gray-700 dark:text-gray-200
`;

export const contentText = `
  text-sm sm:text-base md:text-lg
  text-gray-700 dark:text-gray-300
`;

export const cardBase = `
  bg-white dark:bg-zinc-900
  rounded-2xl shadow-lg
  p-4 sm:p-6
`;

export const borderBox = `
  border border-gray-200 dark:border-zinc-700
  rounded-lg
`;

export const responsiveGrid = `
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
`;
