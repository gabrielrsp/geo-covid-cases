/// <reference types="vite/client" />

import 'typescript'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_SUPABASE_URL: string
      VITE_SUPABASE_KEY: string
    }
  }
}

type DeepPartial<T> = {
  [P in keyof T]?:
  T[P] extends Array<infer U> ? Array<DeepPartial<U>> :
    T[P] extends Record<string, any> ? DeepPartial<T[P]> :
      T[P];
}
