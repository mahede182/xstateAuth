import React from "react";
import { setup, assign, stopChild } from "xstate";
import { createActorContext, useSelector } from "@xstate/react";
import {
  AuthenticatingMachineActor,
  authenticatingMachine,
} from "../machines/authenticating.navigator";
import {
  AuthenticatedMachineActor,
  authenticatedMachine,
} from "../machines/authenticated.navigator";
import {
  NotificationCenterMachineActor,
  notificationCenterMachine,
} from "../machines/notificationCenter";

export const appMachine = setup({
  types: {
    events: {} as
      | { type: "START_APP" }
      | {
          type: "SIGN_IN";
          user: any | null;
        },
    context: {} as {
      user: any | null;
      refAuthenticating: AuthenticatingMachineActor | null;
      refAuthenticated: AuthenticatedMachineActor | null;
      refNotificationCenter: NotificationCenterMachineActor | undefined;
    },
  },
  actions: {
    setRefAuthenticating: assign({
      refAuthenticating: ({ spawn, self }) => {
        return spawn("authenticatingMachine", { input: { parent: self } });
      },
    }),
    stopRefAuthenticating() {
      stopChild("refAuthenticating");
    },
    setRefAuthenticated: assign({
      refAuthenticated: ({ spawn, self }) => {
        return spawn("authenticatedMachine", { input: { parent: self } });
      },
    }),
    stopRefAuthenticated() {
      stopChild("refAuthenticated");
    },
    setUsername: assign({
      username: (_, { username }: { username: string }) => {
        return username;
      },
    }),
    setUserInfo: assign({
      user: (_, event) => event.user,
    }),
  },
  actors: {
    authenticatingMachine,
    authenticatedMachine,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqA2BLAxsgLlgPYB2AdFiVoctgF6VQDEAygCoCCASmwPocAFAQG0ADAF1EoVEVjViJKSAAeiACwB2MgFYAnAA4D+-QDZ9G0bt0aANCACeiAIxPdZXWrWjRAZlcAmEw1PfwBfULs0TFwCBTJkAFd8AAswEkI8QhJmFgBJAHEAOV5cwrFJJBAZOUJSJVUENW1RMhNrXW01XSd9H00TbTtHBGsyf3GB4Kd-YM81cIiQEiIIOCUo7EyFJWr5OsqGgFoZt39tbR6fEybvDR8hxEOfVqcNHo1tHw1zL-1-H3CkXQm1ipAoVBo9EYO1ke0UB0e-ycY3Ol2uzVEd38DxGJjIFlEF3Oohm+iaAMWGxitXIiRSaQysWyMJq2wRCFc2jIhKsah6qNm9wciF6+MJdx8mM+Vl0FKB0S2YLpqXS1MgLLh9UQJkxOj0hg6ah1pjUONFFm0EqlPhlFPCQA */
  id: "application",
  initial: "initializing",
  context: {
    user: null,
    refAuthenticating: null,
    refAuthenticated: null,
    refNotificationCenter: undefined,
  },
  states: {
    initializing: {
      entry: "setRefNotificationCenter",
      on: { START_APP: { target: "authenticating" } },
    },
    authenticating: {
      entry: ["setRefAuthenticating"],
      on: {
        SIGN_IN: {
          actions: [
            {
              type: "setUserInfo",
              params: ({ event: { user } }) => {
                return { user };
              },
            },
          ],
          target: "authenticated",
        },
      },
      exit: ["stopRefAuthenticating"],
    },
    authenticated: {
      entry: ["setRefAuthenticated"],
      exit: ["stopRefAuthenticated"],
    },
  },
});

export const AppContext = createActorContext(appMachine);

export function AppProvider({ children }: React.PropsWithChildren<unknown>) {
  return <AppContext.Provider>{children}</AppContext.Provider>;
}

export function useApp() {
  const actorRef = AppContext.useActorRef();
  const state = useSelector(actorRef, (snapshot) => {
    return snapshot;
  });

  return {
    state,
    send: actorRef.send,
  };
}
