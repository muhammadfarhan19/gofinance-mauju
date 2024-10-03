/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { PencilEditIcon, SearchIcon, TrashDelIcon } from "../icons";
import { ProductType } from "@/types/product.type";
import ModalProduct from "../forms/ModalProduct";
import { useRouter } from "next/navigation";
import { TextLimiter } from "../shared/TextLimiter";
import ConfirmDialog from "../shared/ConfirmDialog";
import axios from "axios";
import { DATA_PRODUCTS } from "@/types/api/endpoints";
// import { useDispatch } from "react-redux";
// import { setSnackbar } from "../shared/Snackbar";
// import { SnackbarType } from "@/reducer/CommonReducer";
import Pagination from "../shared/Pagination";
import Cookies from "js-cookie";

const HomePage = ({ data }: { data: ProductType[] }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (!Cookies.get("token")) router.push("/auth/login");
  }, []);

  // const dispatch = useDispatch();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [confirmId, setConfirmId] = React.useState<number | undefined>(0);
  const [filterState, setFilterState] = React.useState<any>({
    page: 1,
    per_page: 4,
    search: "",
  });
  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    selectedId?: number;
  }>({
    open: false,
    selectedId: undefined,
  });

  const [checkedItems, setCheckedItems] = React.useState<{
    [key: number]: boolean;
  }>({});

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(DATA_PRODUCTS.GET_PRODUCT_LIST + confirmId);
      alert("Data berhasil dihapus");
      // dispatch(
      //   setSnackbar({
      //     show: true,
      //     message: "Data berhasil dihapus.",
      //     type: SnackbarType.INFO,
      //   }),
      // );
    } catch (error: any) {
      // dispatch(
      //   setSnackbar({
      //     show: true,
      //     message: "Terjadi Kesalahan",
      //     type: SnackbarType.ERROR,
      //   }),
      // );
      alert("Terjadi kesalahan saat menghapus");
    }
    setConfirmId(0);
  };

  const changeFilterState = (inputState: Partial<any>) => {
    const pageAffected = Object.keys(inputState).includes("page");
    const newState = {
      ...filterState,
      ...inputState,
    };

    if (!pageAffected) {
      newState.page = 1;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(
      () => setFilterState(newState),
      pageAffected ? 0 : 800,
    );
  };
  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = (isChecked: boolean) => {
    const updatedCheckedItems = data.reduce(
      (acc, item) => {
        acc[item.id] = isChecked;
        return acc;
      },
      {} as { [key: number]: boolean },
    );

    setCheckedItems(updatedCheckedItems);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(filterState.search.toLowerCase()) ||
      item.description.toLowerCase().includes(filterState.search.toLowerCase()),
  );

  return (
    <div className="w-full min-w-full py-4 my-10">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl lg:text-3xl font-medium">Data produk</h1>
        <button
          className="bg-[#0575E6] px-10 py-2 md:py-3 rounded-full text-white text-sm duration-300 ease-in-out hover:bg-blue-600"
          onClick={() => {
            handleShowForm(!formModalState?.open);
          }}
        >
          Tambah
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 border rounded-md px-2 py-2 xl:py-4 border-gray-300">
        <input
          type="text"
          placeholder="Search Product"
          className="focus:outline-none w-full"
          value={filterState.search}
          onChange={(e) => changeFilterState({ search: e.target.value })}
        />
        <SearchIcon />
      </div>

      <div className="overflow-x-auto max-h-screen md:max-h-[500px]">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="border-b">
              <th className="p-1 xl:p-3 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-2"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-1 xl:p-3 text-center">Item</th>
              <th className="p-1 xl:p-3 text-center">Price</th>
              <th className="p-1 xl:p-3 text-center">Category</th>
              <th className="p-1 xl:p-3 text-center">Description</th>
              <th className="p-1 xl:p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item: ProductType, index: number) => (
              <tr key={index} className="border-b">
                <td className="p-1 xl:p-3">
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-4 h-4 mt-2"
                  />
                </td>
                <td className="p-1 xl:p-3 truncate">
                  <TextLimiter text={item.title} limit={3} key={item.id} />
                </td>
                <td className="p-1 text-center xl:p-3">{item.price}</td>
                <td className="p-1 text-center xl:p-3">
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </td>
                <td className="p-1 xl:p-3">
                  <TextLimiter
                    text={item.description}
                    limit={5}
                    key={item.id}
                  />
                </td>
                <td className="p-1 xl:p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="p-2 md:p-4 bg-[#0575E6] rounded-full hover:bg-blue-600"
                      onClick={() => {
                        handleShowForm(!formModalState?.open, item?.id);
                      }}
                    >
                      <PencilEditIcon />
                    </button>
                    <button
                      className="p-2 md:p-4 bg-red-500 rounded-full hover:bg-red-600"
                      onClick={() => setConfirmId(item.id)}
                    >
                      <TrashDelIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {formModalState?.open && (
          <ModalProduct
            open={formModalState?.open}
            setOpen={(open: boolean) => handleShowForm(open, 0)}
            onSuccess={() => formModalState.open}
            selectedId={formModalState.selectedId}
          />
        )}
        <ConfirmDialog
          open={!!confirmId}
          message="Anda yakin ingin menghapus data ini?"
          onClose={() => setConfirmId(0)}
          onConfirm={handleDelete}
        />
      </div>

      <Pagination
        onChange={(value) => {
          changeFilterState({ page: value });
        }}
        totalData={filteredData.length}
        perPage={filterState?.per_page}
        page={filterState?.page}
      />
    </div>
  );
};

export default HomePage;
