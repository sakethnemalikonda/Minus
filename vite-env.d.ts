/**
 * Replacement for vite/client types which are missing in this environment.
 */

// Augment NodeJS.ProcessEnv to include API_KEY.
// This resolves the "Cannot redeclare block-scoped variable 'process'" error 
// by relying on the existing process definition (e.g. from @types/node).
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
