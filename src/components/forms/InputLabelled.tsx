import { classNames } from "../shared/Pagination";

interface TextInput {
  name: string;
  type: string;
  label: string;
  errorMessage: any;
  isError: any;
  validation: any;
  maxLength?: number;
  value?: string;
  isUneditable?: boolean;
  additionalStyle?: string;
  additionalLabelStyle?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clipBoard?: boolean;
  clipBoardIconSize?: string;
  onCopyToClipboard?: () => void;
  animateClipboard?: boolean;
  disableClipboard?: boolean;
}

export function InputLabelled(props: TextInput) {
  const { clipBoard = false, animateClipboard = false } = props;
  return (
    <div className="mt-5 sm:col-span-6">
      <label
        htmlFor="nama"
        className={`block text-sm font-medium text-gray-700 ${props.additionalLabelStyle}`}
      >
        {props.label}{" "}
        {clipBoard ? (
          <div className="flex flex-row items-center space-x-1">
            {animateClipboard ? (
              <p
                onClick={() => {
                  if (!props.disableClipboard && props.onCopyToClipboard) {
                    return props.onCopyToClipboard();
                  }
                  return;
                }}
                className="cursor-pointer text-xs text-green-600"
              >
                Copy to Clipboard
              </p>
            ) : null}
            <button
              disabled={props.disableClipboard}
              type="button"
              onClick={props.onCopyToClipboard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={
                  props.disableClipboard ? "currentColor" : "rgb(22 163 74)"
                }
                className={classNames(
                  animateClipboard ? "animate-bounce" : "",
                  "h-5 w-5"
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </label>
      <div className="mt-1">
        <input
          onChange={props.onChange}
          disabled={props.isUneditable}
          value={props.value}
          {...props.validation}
          className={`block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm ${props.additionalStyle}`}
          name={props.name}
          type={props.type}
          maxLength={props.maxLength}
        />
        {props.isError && (
          <p className="mt-1 text-xs text-red-500">{props.errorMessage}</p>
        )}
      </div>
    </div>
  );
}
