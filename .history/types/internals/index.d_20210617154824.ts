
export type NextAuthSharedOptions =
    | "pages"
    | "jwt"
    | "events"
    | "callbacks"
    | "cookies"
    | "adapter"

    export interface AppOptions
    extends Required<Pick<NextAuthOptions, NextAuthSharedOptions>> {
    providers: AppProvider[]
    baseUrl: string
    basePath: string
    action:
      | "providers"
      | "session"
      | "csrf"
      | "signin"
      | "signout"
      | "callback"
      | "verify-request"
      | "error"
    pkce?: {  
        code_verifier?: string
        code_challenge_method?: "S256" 
    }
    provider?: AppProvider
    csrfToken?: string
    csrfTokenVerified?: boolean
    secret: string
    theme: Theme
    debug: boolean
    logger: LoggerInstance
    session: Required<SessionOptions>
  }

export interface NextAuthRequest extends NextApiRequest {
    options: AppOptions
}
  
  export type NextAuthResponse = NextApiResponse