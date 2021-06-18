
import * as React from "react"
import { Session } from ".."

export interface BroadcastMessage {
  event?: "session"
  data?: { trigger?: "signout" | "getSession" }
  clientId: string
  timestamp: number
}

export interface NextAuthConfig {
    baseUrl: string
    basePath: string
    baseUrlServer: string
    basePathServer: string
    keepAlive: number
    clientMaxAge: number
    _clientLastSync: number
    _clientSyncTimer: ReturnType<typeof setTimeout>
    _eventListenersAdded: boolean
    _clientSession: Session | null | undefined
    _getSession: any
  }
  
  export type SessionContext = React.Context<Session>