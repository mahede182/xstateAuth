import { ActorRefFrom, setup, assign } from "xstate";
import { AuthenticatedParamList } from "../types/navigation";
import { HomeMachineActor, homeMachine } from "./home";
import { navigationSubscriber } from "./shared/actors";

export type AuthenticatedMachineActor = ActorRefFrom<
  typeof authenticatedMachine
>;

export const authenticatedMachine = setup({
  types: {
    context: {} as {
      refHome: HomeMachineActor | undefined;
    },
    events: {} as { type: "NAVIGATE"; screen: keyof AuthenticatedParamList },
  },
  actions: {
    setRefHome: assign({
      refHome: ({ spawn }) => {
        return spawn("homeMachine");
      },
    }),
  },
  actors: {
    homeMachine,
    navigationSubscriber,
  },
  guards: {
    isHomeScreen(_, params: { screen: keyof AuthenticatedParamList }) {
      return params.screen === "Home";
    },
    isListScreen(_, params: { screen: keyof AuthenticatedParamList }) {
      return params.screen === "List";
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqA2BLAxsgLlgPYB2AxAHICCAagJIDiVAKgKIDaADALqKipFYWQqT4gAHogAsAJgA0IAJ6IZAVgBsAOnUB2VToCcnVVJ2ddUqQF8rCtJlwFi5avSZt2ARl5IQAoSIkYpIIsgrKCJ6qnpoAzDrqsZzGJqaxJja2ICREEHBi9th4gWL+ws7BiAC06uHV6jZ26EVOpJoAFkQAtmAAyjgATmBgQb5lJb4hsfGa+jIAHAZSqvP68zI6dQgy05pSsTIyBvPG87Hq+o0ghY6Bmtiw+P1DI6WC5aKTiNM6szoLSxWaw2W08C00ngOJxOFx0Ok8cMyViAA */
  context: { refHome: undefined, refList: undefined },
  id: "application",
  initial: "homeScreen",
  invoke: { src: "navigationSubscriber" },
  on: {
    NAVIGATE: [
      {
        guard: {
          type: "isHomeScreen",
          params: ({ event }) => {
            return {
              screen: event.screen,
            };
          },
        },
        target: ".homeScreen",
      },
    ],
  },
  states: {
    homeScreen: { entry: ["setRefHome"] },
  },
});
