import { ConvexError } from "convex/values";

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

export const NOT_FOUND_ERROR_MESSAGE = "Could not find resource";

export class NotFoundError extends PublicError {
  constructor() {
    super(NOT_FOUND_ERROR_MESSAGE);
    this.name = "NotFoundError";
  }
}

export function shapeErrors({ error }: any) {
  const isAllowed =
    error instanceof PublicError || error instanceof ConvexError;

  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = process.env.NODE_ENV === "development";
  if (isAllowed || isDev) {
    console.error(error);
    return {
      code: error.code ?? "ERROR",
      message: `${!isAllowed && isDev ? "DEV ONLY ENABLED - " : ""}${getErrorMessage(
        error
      )}`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

function getErrorMessage(error: Error) {
  if (error instanceof ConvexError) {
    return error.data;
  }
  return error.message;
}
