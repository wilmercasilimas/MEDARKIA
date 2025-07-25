// src/styles/forms.ts

export const labelBase = `
  block text-sm font-medium
  text-gray-700 dark:text-gray-300 mb-1
`;

export const inputBase = `
  w-full rounded-lg border
  border-gray-300 dark:border-zinc-600
  bg-white dark:bg-zinc-800
  text-sm text-gray-900 dark:text-white
  px-4 py-2
  focus:outline-none focus:ring-2 focus:ring-green-500
  transition-all
`;

export const errorText = `
  text-xs text-red-600 dark:text-red-400 mt-1
`;

export const selectBase = `
  w-full rounded-lg border
  border-gray-300 dark:border-zinc-600
  bg-white dark:bg-zinc-800
  text-sm text-gray-900 dark:text-white
  px-4 py-2
  focus:outline-none focus:ring-2 focus:ring-green-500
`;

export const switchContainer = `
  flex items-center gap-2 cursor-pointer select-none
`;

export const switchLabel = `
  text-sm text-gray-700 dark:text-gray-300
`;

export const textareaBase = `
  w-full min-h-[100px] rounded-lg border
  border-gray-300 dark:border-zinc-600
  bg-white dark:bg-zinc-800
  text-sm text-gray-900 dark:text-white
  px-4 py-2 resize-none
  focus:outline-none focus:ring-2 focus:ring-green-500
`;
