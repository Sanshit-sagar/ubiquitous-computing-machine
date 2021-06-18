export class UnknownError extends Error {
    constructor(error) {
      // Support passing error or string
      super(error?.message ?? error)
      this.name = "UnknownError"
      if (error instanceof Error) {
        this.stack = error.stack
      }
    }
  
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        stack: this.stack,
      }
    }
  }
  
  export class OAuthCallbackError extends UnknownError {
    name = "OAuthCallbackError"
  }
  
  export class AccountNotLinkedError extends UnknownError {
    name = "AccountNotLinkedError"
  }
  
  export class CreateUserError extends UnknownError {
    name = "CreateUserError"
  }
  
  export class GetUserError extends UnknownError {
    name = "GetUserError"
  }
  
  export class GetUserByEmailError extends UnknownError {
    name = "GetUserByEmailError"
  }
  
  export class GetUserByIdError extends UnknownError {
    name = "GetUserByIdError"
  }
  
  export class GetUserByProviderAccountIdError extends UnknownError {
    name = "GetUserByProviderAccountIdError"
  }
  
  export class UpdateUserError extends UnknownError {
    name = "UpdateUserError"
  }
  
  export class DeleteUserError extends UnknownError {
    name = "DeleteUserError"
  }
  
  export class LinkAccountError extends UnknownError {
    name = "LinkAccountError"
  }
  
  export class UnlinkAccountError extends UnknownError {
    name = "UnlinkAccountError"
  }
  
  export class CreateSessionError extends UnknownError {
    name = "CreateSessionError"
  }
  
  export class GetSessionError extends UnknownError {
    name = "GetSessionError"
  }
  
  export class UpdateSessionError extends UnknownError {
    name = "UpdateSessionError"
  }
  
  export class DeleteSessionError extends UnknownError {
    name = "DeleteSessionError"
  }