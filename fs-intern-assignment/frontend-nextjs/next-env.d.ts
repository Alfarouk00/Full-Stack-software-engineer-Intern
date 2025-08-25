// eslint-disable-next-line @typescript-eslint/no-unused-vars
/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE?: string;
  }
}
