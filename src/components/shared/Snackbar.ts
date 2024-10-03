import { CommonState } from "@/reducer/CommonReducer";

export const CommonActionType = {
  SET_API_RES: "SET_API_RES",
  SET_MODAL: "SET_MODAL",
  SET_SNACKBAR: "SET_SNACKBAR",
  SET_USER_INFO: "SET_USER_INFO",
  SHOW_PROF_PIC: "SHOW_PROF_PIC",
  SET_LOADER: "SHOW_LOADER",
} as const;

export const setSnackbar = (
  snackbarProps: Partial<CommonState["snackbar"]>
) => ({
  type: CommonActionType.SET_SNACKBAR,
  snackbar: snackbarProps,
});

export type CommonAction = ReturnType<typeof setSnackbar>;
