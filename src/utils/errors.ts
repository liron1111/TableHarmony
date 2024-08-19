export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const AUTHENTICATION_ERROR_MESSAGE =
  "You must be logged in to view this content";

export class AuthenticationError extends PublicError {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
}

export const AUTHORIZATION_ERROR_MESSAGE =
  "You are not authorized to view this content";

export class AuthorizationError extends PublicError {
  constructor() {
    super(AUTHORIZATION_ERROR_MESSAGE);
    this.name = "AuthorizationError";
  }
}