/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_API_URL: string;
  readonly VITE_STAGING_API_URL: string;
  readonly VITE_TINY_MCE_API_KEY: string;
  readonly VITE_TINY_MCE_PRIVATE_KEY: string;
  readonly VITE_TINY_MCE_PUBLIC_KEY: string;
  // more env variables...
}
