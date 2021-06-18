import { AppOptions } from "./internals"
import { User, Profile, Session } from "."
import { EmailConfig } from "./providers"

/** Legacy */

export {
  TypeORMAccountModel,
  TypeORMSessionModel,
  TypeORMUserModel,
  TypeORMVerificationRequestModel,
} from "@next-auth/typeorm-legacy-adapter"

import {
  TypeORMAdapter,
  TypeORMAdapterModels,
} from "@next-auth/typeorm-legacy-adapter"

import { PrismaLegacyAdapter } from "@next-auth/prisma-legacy-adapter"

export const TypeORM: {
  Models: TypeORMAdapterModels
  Adapter: TypeORMAdapter
}

export const Prisma: {
  Adapter: PrismaLegacyAdapter
}

declare const Adapters: {
  Default: TypeORMAdapter
  TypeORM: typeof TypeORM
  Prisma: typeof Prisma
}
export default Adapters

export interface AdapterInstance<U = User, P = Profile, S = Session> {
  /** Used as a prefix for adapter related log messages. (Defaults to `ADAPTER_`) */
  displayName?: string
  createUser(profile: P): Promise<U>
  getUser(id: string): Promise<U | null>
  getUserByEmail(email: string | null): Promise<U | null>
  getUserByProviderAccountId(
    providerId: string,
    providerAccountId: string
  ): Promise<U | null>
  updateUser(user: U): Promise<U>
  /** @todo Implement */
  deleteUser?(userId: string): Promise<void>
  linkAccount(
    userId: string,
    providerId: string,
    providerType: string,
    providerAccountId: string,
    refreshToken?: string,
    accessToken?: string,
    accessTokenExpires?: null
  ): Promise<void>
  /** @todo Implement */
  unlinkAccount?(
    userId: string,
    providerId: string,
    providerAccountId: string
  ): Promise<void>
  createSession(user: U): Promise<S>
  getSession(sessionToken: string): Promise<S | null>
  updateSession(session: S, force?: boolean): Promise<S | null>
  deleteSession(sessionToken: string): Promise<void>
  createVerificationRequest?(
    identifier: string,
    url: string,
    token: string,
    secret: string,
    provider: EmailConfig & { maxAge: number; from: string }
  ): Promise<void>
  getVerificationRequest?(
    identifier: string,
    verificationToken: string,
    secret: string,
    provider: Required<EmailConfig>
  ): Promise<{
    id: string
    identifier: string
    token: string
    expires: Date
  } | null>
  deleteVerificationRequest?(
    identifier: string,
    verificationToken: string,
    secret: string,
    provider: Required<EmailConfig>
  ): Promise<void>
}

export type Adapter<
  C = unknown, 
  O = Record<string, unknown>, 
  U = unknown, 
  P = unknown, 
  S = unknown
> = (
    client: C, 
    options?: O
  ) => { 
    getAdapter(appOptions: AppOptions): Promise<AdapterInstance<U, P, S>> 
}