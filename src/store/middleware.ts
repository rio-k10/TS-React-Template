// src/store/middleware/logger.ts

import { Middleware, AnyAction } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    console.log("[Dispatch]", action);
    const result = next(action);
    console.log("[Next State]", storeAPI.getState());
    return result;
  };

export const logoutMiddleware: Middleware = () => (next) => (action) => {
  if (isTypedAction("auth/logout")) {
    //  some code to clear browser cache, cookies, or local storage
    console.log("User logged out, clearing session data...");
    // dispatch more actions or trigger redirect
  }

  return next(action);
};

function isTypedAction(action: unknown): action is { type: string } {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action as AnyAction).type === "string"
  );
}
