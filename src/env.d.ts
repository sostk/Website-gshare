/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly GOOGLE_SHEETS_ID: string;
  readonly GOOGLE_SHEETS_CLIENT_EMAIL: string;
  readonly GOOGLE_SHEETS_PRIVATE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}