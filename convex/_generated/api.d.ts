/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as classroomMemberships from "../classroomMemberships.js";
import type * as classrooms from "../classrooms.js";
import type * as clerk from "../clerk.js";
import type * as feedbacks from "../feedbacks.js";
import type * as http from "../http.js";
import type * as notifications from "../notifications.js";
import type * as schoolEnrollments from "../schoolEnrollments.js";
import type * as schoolMemberships from "../schoolMemberships.js";
import type * as schools from "../schools.js";
import type * as users from "../users.js";
import type * as util from "../util.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  classroomMemberships: typeof classroomMemberships;
  classrooms: typeof classrooms;
  clerk: typeof clerk;
  feedbacks: typeof feedbacks;
  http: typeof http;
  notifications: typeof notifications;
  schoolEnrollments: typeof schoolEnrollments;
  schoolMemberships: typeof schoolMemberships;
  schools: typeof schools;
  users: typeof users;
  util: typeof util;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
