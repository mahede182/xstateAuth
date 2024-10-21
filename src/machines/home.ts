import { ActorRefFrom, assign, setup } from "xstate";

export type HomeMachineActor = ActorRefFrom<typeof homeMachine>;

export const homeMachine = setup({
  types: {
    context: {} as { selectedLanguage: string },
    events: {} as { type: "selectBangla" } | { type: "selectEnglish" },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBsCGA7KBXVMDKYyYAxgC4D2ATgHRqY76EmmQCCsAopsgJawAWAYlhMyAIQxQ0AbQAMAXUSgADuVg9SPcuiUgAHogAsAZgCM1Y4YAcATkM2AbA9l2ArKYA0IAJ6JTAdgdqV38rU1knV2dTACZTVwBfBK86bFwwAiIyKlpJBgzRFgh2CW5UYUKuKT5+OUUkEFV1TW1dAwQTc0tbeycXQ3cvXwQwixiYm1MHY1l7G395pOSQdHIIOF1U-MzmKl0mjS0dBvaAWgchxHOklLz0neyaLfvCtk5uGv21Q9aToxjLggbK5qLIAsZXOMnMZQrJjDcQM9GFkKE87sjmG9SlJUF9mkc2ohXDZZNQbPNjOTDIZAv5XIZAfNguDKbFTNZ-HElgkgA */
  context: {},

  states: {},
});
