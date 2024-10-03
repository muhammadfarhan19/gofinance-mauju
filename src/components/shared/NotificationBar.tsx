/* eslint-disable react-hooks/exhaustive-deps */
import { Transition } from "@headlessui/react";
import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { CommonState, SnackbarType } from "../../reducer/CommonReducer";
import { setSnackbar } from "./Snackbar";
import { classNames } from "./Pagination";
import { CloseIcon, SpeakerInfoIcon } from "../icons";

type SnackbarProps = {
  message: string;
  timeout?: number;
  type?: SnackbarType;
};

function Snackbar(props: SnackbarProps) {
  const dispatch = useDispatch();
  const { message, timeout, type } = props;

  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(true);
    if (timeout) {
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          dispatch(setSnackbar({ show: false }));
        }, 500);
      }, timeout);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(setSnackbar({ show: false }));
    }, 500);
  };

  return (
    <Transition appear show={open} as={"div"}>
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="fixed inset-x-0 top-12 z-40 pt-2 sm:pt-5">
          <div className="mx-auto max-w-xl px-2 sm:px-6 lg:px-8">
            <div
              className={classNames(
                type === SnackbarType.INFO ? "bg-[#0575E6]" : "",
                type === SnackbarType.ERROR ? "bg-red-500" : "",
                type === SnackbarType.WARNING ? "bg-amber-600" : "",
                "rounded-lg p-2 shadow-lg sm:p-3",
              )}
            >
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center">
                  <span
                    className={classNames(
                      // type === SnackbarType.INFO ? "bg-teal-400" : "",
                      // type === SnackbarType.ERROR ? "bg-red-500" : "",
                      // type === SnackbarType.WARNING ? "bg-amber-600" : "",
                      "flex rounded-lg p-2",
                    )}
                  >
                    <SpeakerInfoIcon />
                  </span>
                  <p className="ml-3 truncate font-medium text-white">
                    <span className="inline">{message}</span>
                  </p>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    className={classNames(
                      type === SnackbarType.INFO ? "hover:bg-teal-400" : "",
                      type === SnackbarType.ERROR ? "hover:bg-red-500" : "",
                      type === SnackbarType.WARNING ? "hover:bg-amber-500" : "",
                      "-mr-1 flex rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-white",
                    )}
                    onClick={handleClose}
                  >
                    <span className="sr-only">Tutup</span>
                    <CloseIcon aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
}

export default function NotificationBar() {
  const { show, message, timeout, type } = useSelector<
    { common: CommonState },
    CommonState["snackbar"]
  >((state) => {
    return state.common.snackbar;
  }, shallowEqual);

  if (show) {
    return <Snackbar message={message} timeout={timeout} type={type} />;
  }

  return null;
}
