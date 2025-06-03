// src/store/middleware/logger.ts

import { Middleware, AnyAction } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("[Dispatch]", action);
  const result = next(action);
  console.log("[Next State]", store.getState());
  return result;
};

export const logoutRedirectMiddleware: Middleware =
  () => (next) => (action) => {
    //  some code to clear browser cache, cookies, or local storage
    if (
      isTypedAction(action) &&
      action.type === "auth/logout" // Adjust this to your actual logout action type
    ) {
      console.log("Redirecting to /login due to logout");
      // history.push('/login');
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
