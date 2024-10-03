import NotificationBar from "@/components/shared/NotificationBar";
import commonReducer from "@/reducer/CommonReducer";
import config from "@/utils/Config";
import { configureStore } from "@reduxjs/toolkit";
import * as React from "react";
import { Provider } from "react-redux";
import {
  AnyAction,
  combineReducers,
  Dispatch,
  MiddlewareAPI,
  ReducersMapObject,
} from "redux";
import thunk from "redux-thunk";

function logger({ getState }: MiddlewareAPI) {
  return (next: Dispatch) => (action: AnyAction) => {
    console.groupCollapsed("Redux");
    console.log("%cState before", "color:yellow", getState());
    console.log("Dispatch", action);
    const returnValue = next(action);
    console.log("%cState after", "color:teal", getState());
    console.groupEnd();
    return returnValue;
  };
}

interface WithReduxPage {
  (Component: React.FC<any>): React.FC<any>;
}

export const withReduxPage =
  (reducers: ReducersMapObject = {}): WithReduxPage =>
  (Component) => {
    const ReduxPage: React.FC = (props = {}) => {
      const store = configureStore({
        reducer: combineReducers({
          common: commonReducer,
          ...reducers,
        }),
      });

      return (
        <Provider store={store}>
          <NotificationBar />
          {/* @ts-ignore */}
          <Component {...props} />
        </Provider>
      );
    };
    return ReduxPage;
  };
