import { createServerActionProcedure } from "zsa";

import { assertAuthenticated } from "@/utils/session";
import { shapeErrors } from "@/utils/errors";

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertAuthenticated();

    return { user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: null, session: null };
  });
