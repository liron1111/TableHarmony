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
import type * as classes from "../classes.js";
import type * as clerk from "../clerk.js";
import type * as courseEnrollments from "../courseEnrollments.js";
import type * as courseMemberships from "../courseMemberships.js";
import type * as courses from "../courses.js";
import type * as crons from "../crons.js";
import type * as feedbacks from "../feedbacks.js";
import type * as http from "../http.js";
import type * as notifications from "../notifications.js";
import type * as schoolEnrollments from "../schoolEnrollments.js";
import type * as schoolMemberships from "../schoolMemberships.js";
import type * as schools from "../schools.js";
import type * as semesters from "../semesters.js";
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
  classes: typeof classes;
  clerk: typeof clerk;
  courseEnrollments: typeof courseEnrollments;
  courseMemberships: typeof courseMemberships;
  courses: typeof courses;
  crons: typeof crons;
  feedbacks: typeof feedbacks;
  http: typeof http;
  notifications: typeof notifications;
  schoolEnrollments: typeof schoolEnrollments;
  schoolMemberships: typeof schoolMemberships;
  schools: typeof schools;
  semesters: typeof semesters;
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
