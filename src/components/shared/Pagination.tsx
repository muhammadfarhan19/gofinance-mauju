import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/16/solid";
import * as React from "react";

interface PaginationProps {
  onChange: (page: number) => void;
  totalData: number;
  page: number;
  perPage: number;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Pagination(props: PaginationProps) {
  const { onChange, totalData, page, perPage } = props;
  const totalPage = Math.ceil(totalData / perPage);
  const renderNumber = page + 5 >= totalPage ? [] : ["..."];
  for (let index = Math.min(totalPage, 2); index >= 0; index--) {
    let lower = page + index;
    const high = totalPage - index;
    if (page + 5 > totalPage) {
      lower -= page + 5 - totalPage;
    }
    if (lower > 0) renderNumber.unshift(String(lower));
    if (high > 0) renderNumber.push(String(high));
  }

  const handleNavigate =
    (type: "next" | "previous" | "index" | "first" | "last", index?: number) =>
    () => {
      let nextPage = Number(page);
      if (type === "next" && nextPage + 1 <= totalPage) {
        nextPage++;
      } else if (type === "previous" && nextPage - 1 >= 1) {
        nextPage--;
      } else if (type === "index" && index !== undefined) {
        nextPage = index;
      } else if (type === "first" && index !== 1) {
        nextPage = 1;
      } else if (type === "last" && index !== totalPage) {
        nextPage = totalPage;
      } else {
        return;
      }
      onChange(nextPage);
    };

  return (
    <div className="flex items-center justify-between border-t px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          onClick={handleNavigate("previous")}
          className="text-gray-700 hover:bg-gray-50 relative inline-flex items-center rounded-md  bg-primary px-4 py-2 text-sm font-medium"
        >
          Previous
        </a>
        <a
          onClick={handleNavigate("next")}
          className="text-gray-700 hover:bg-gray-50 relative ml-3 inline-flex items-center rounded-md  bg-primary px-4 py-2 text-sm font-medium"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-gray-700 text-sm">
            Menampilkan{" "}
            <span className="font-medium">
              {Number(page) * perPage - (perPage - 1)} -{" "}
              {Math.min(Number(page) * perPage, totalData)}
            </span>{" "}
            dari <span className="font-medium">{totalData}</span> data
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={handleNavigate("first")}
              className="text-gray-500 hover:bg-gray-50 relative inline-flex cursor-pointer items-center rounded-l-md  bg-primary px-2 py-2 text-sm font-medium"
            >
              <span className="sr-only">First</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              onClick={handleNavigate("previous")}
              className="text-gray-500 hover:bg-gray-50 relative inline-flex cursor-pointer items-center  bg-primary px-2 py-2 text-sm font-medium"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {renderNumber.map((each, index) =>
              each === "..." ? (
                <span
                  key={"paginationNumber" + index}
                  className="text-gray-500 relative inline-flex items-center  bg-primary px-4 py-2 text-sm font-medium"
                >
                  {each}
                </span>
              ) : (
                <a
                  key={"paginationNumber" + index}
                  onClick={handleNavigate("index", Number(each))}
                  className={classNames(
                    page === Number(each)
                      ? "z-10 bg-indigo-50 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-50 bg-primary",
                    "relative inline-flex cursor-pointer items-center  px-4 py-2 text-sm font-medium"
                  )}
                >
                  {each}
                </a>
              )
            )}
            <a
              onClick={handleNavigate("next")}
              className="text-gray-500 hover:bg-gray-50 relative inline-flex cursor-pointer items-center  bg-primary px-2 py-2 text-sm font-medium"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              onClick={handleNavigate("last")}
              className="text-gray-500 hover:bg-gray-50 relative inline-flex cursor-pointer items-center rounded-r-md  bg-primary px-2 py-2 text-sm font-medium"
            >
              <span className="sr-only">Last</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
