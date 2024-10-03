import { CommonAction, CommonActionType } from "@/components/shared/Snackbar";
import { shallowEqual, useSelector } from "react-redux";

export enum ModalType {
  INFO,
  WARNING,
  ERROR,
}

export enum SnackbarType {
  INFO,
  WARNING,
  ERROR,
}

export interface CommonState {
  apiRes: Record<string, object>;
  userId: string;
  showProfPic: boolean;
  showLoader: boolean;
  modal: {
    show: boolean;
    type: ModalType;
    message: string;
    redirect: string | null;
  };
  snackbar: {
    show: boolean;
    type: SnackbarType;
    message: string;
    timeout: number;
  };
}

const initialState: CommonState = {
  apiRes: {},
  userId: "",
  showProfPic: false,
  showLoader: false,
  modal: {
    show: false,
    type: ModalType.INFO,
    message: "",
    redirect: null,
  },
  snackbar: {
    show: false,
    type: SnackbarType.INFO,
    message: "",
    timeout: 3000, // 3 seconds
  },
};

export default function commonReducer(
  state = initialState,
  action: CommonAction,
) {
  switch (action.type) {
    case CommonActionType.SET_SNACKBAR: {
      const newState = { ...state };
      newState.snackbar = {
        ...state.snackbar,
        ...action.snackbar,
      };
      return newState;
    }
    default:
      return state;
  }
}

export const useCommonState = () =>
  useSelector<{ common: CommonState }, CommonState>(
    (state) => state.common,
    shallowEqual,
  );
