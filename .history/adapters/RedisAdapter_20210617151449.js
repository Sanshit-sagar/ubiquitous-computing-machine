// import React, {useState, useEffect, useContext, useReducer, useRef, useMemo,} from 'react'
// import { Profile, Session, User } from "next-auth"
// import { createHash, randomBytes } from "crypto"



// interface RedisVerificationRequest {
//   id,
//   identifier,
//   token,
//   expires,
// }

// export type RedisSession = Session & {
//   id,
//   expires
// };

// function RedisAdapter (config, options = {}) {
//     return {
//       async getAdapter (appOptions) {
//         async createUser (profile) {
//             const pipeline = await redis.pipeline();
//             pipeline.set()
//         },
//         async getUser (id) {
//             return null
//         },
//         async getUserByEmail (email) {
//             return null
//         },
//         async getUserByProviderAccountId (
//             providerId,
//             providerAccountId
//         ) {
//             return null
//         },
//         async updateUser (user) {
//             return null
//         },
//         async deleteUser (userId) {
//             return null
//         },
//         async linkAccount (
//             userId,
//             providerId,
//             providerType,
//             providerAccountId,
//             refreshToken,
//             accessToken,
//             accessTokenExpires
//         ) {
//             return null
//         },
//         async unlinkAccount (
//             userId,
//             providerId,
//             providerAccountId
//         ) {
//             return null
//         },
//         async createSession (user) {
//             return null
//         },
//         async getSession (sessionToken) {
//             return null
//         },
//         async updateSession (
//             session,
//             force
//         ) {
//             return null
//         },
//         async deleteSession (sessionToken) {
//             return null
//         },
//         async createVerificationRequest (
//             identifier,
//             url,
//             token,
//             secret,
//             provider
//         ) {
//           return null
//         },
//         async getVerificationRequest (
//             identifier,
//             token,
//             secret,
//             provider
//         ) {
//           return null
//         },
//         async deleteVerificationRequest (
//             identifier,
//             token,
//             secret,
//             provider
//         ) {
//           return null
//         }
//       }
//     }
//   }

// export default RedisAdapter