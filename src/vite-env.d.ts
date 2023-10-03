/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_API_URL: string;
  readonly VITE_STAGING_API_URL: string;
  readonly VITE_TINY_MCE_API_KEY?: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_IBB_IMAGE_UPLOAD_API_URL: string;
  readonly VITE_ENV: "PROD" | "LOCAL";
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  // more env variables...
}
