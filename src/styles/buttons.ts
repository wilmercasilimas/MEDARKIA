// src/styles/buttons.ts

export const primaryButton = `
  bg-green-600 hover:bg-green-700
  text-white font-medium
  py-2 px-4 rounded-lg
  text-sm sm:text-base
  transition-all
`;

export const secondaryButton = `
  border border-gray-300
  dark:border-zinc-600
  text-gray-700 dark:text-gray-300
  hover:bg-gray-100 dark:hover:bg-zinc-800
  font-medium
  py-2 px-4 rounded-lg
  text-sm sm:text-base
  transition-all
`;

export const outlineButton = `
  border border-green-600
  text-green-600
  hover:bg-green-50 dark:hover:bg-zinc-800
  py-2 px-4 rounded-lg
  text-sm font-medium
  transition
`;

export const disabledButton = `
  bg-gray-300 text-white
  cursor-not-allowed opacity-60
  py-2 px-4 rounded-lg
  text-sm font-medium
`;

export const textButton = `
  text-green-600 hover:underline
  text-sm font-medium
`;
