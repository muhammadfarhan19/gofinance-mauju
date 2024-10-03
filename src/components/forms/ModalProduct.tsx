/* eslint-disable react-hooks/exhaustive-deps */
import { DATA_PRODUCTS } from "@/types/api/endpoints";
import { CategoryType, ProductType } from "@/types/product.type";
import { Dialog, Textarea, Transition } from "@headlessui/react";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { CloseIcon } from "../icons";
import AutoComplete from "../shared/AutoComplete";
// import { setSnackbar } from "../shared/Snackbar";
// import { useDispatch } from "react-redux";
// import { SnackbarType } from "@/reducer/CommonReducer";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: number | undefined;
}

function ModalProduct(props: ModalProps) {
  const { open, setOpen, onSuccess, selectedId } = props;
  const [dataProduct, setDataProduct] = React.useState<ProductType>();
  const [queryCategory, setQueryCategory] = React.useState("");
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const debounce = React.useRef<number>(0);
  // const dispatch = useDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm<ProductType>();

  const submitHandler = async (formData: ProductType) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await axios.patch(
        DATA_PRODUCTS.GET_PRODUCT_LIST + `/${selectedId}`,
        formData,
      );
    } else {
      resSubmit = await axios.post(DATA_PRODUCTS.GET_PRODUCT_LIST, formData);
    }
    // dispatch(
    //   setSnackbar({
    //     show: true,
    //     message: `Berhasil ${selectedId ? "memperbarui" : "menambahkan"} data`,
    //     type: SnackbarType.INFO,
    //   }),
    // );
    alert(`Berhasil ${selectedId ? "memperbarui" : "menambahkan"} data`);
    onSuccess();
    setOpen(!open);
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(DATA_PRODUCTS.GET_CATEGORY_LIST);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  React.useEffect(() => {
    const fetchData = async (id: number) => {
      const { data } = await axios.get(
        DATA_PRODUCTS.GET_PRODUCT_LIST + `/${id}`,
      );
      setDataProduct(data);
    };

    if (selectedId !== undefined) {
      fetchData(selectedId);
    }
  }, [selectedId]);

  React.useEffect(() => {
    if (selectedId && dataProduct) {
      setValue("id", dataProduct?.id);
      setValue("title", dataProduct?.title);
      setValue("price", dataProduct?.price);
      setValue("category", dataProduct?.category);
      setValue("description", dataProduct?.description);
    }
  }, [dataProduct && selectedId]);

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={toggleModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-brightness-50" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-sm transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <h1 className="text-2xl font-medium leading-6 text-gray-900">
                  {selectedId ? "Edit " : "Tambah "}
                </h1>
                <button onClick={toggleModal}>
                  <CloseIcon />
                </button>
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="my-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    // defaultValue={dataProduct?.title}
                    {...register("title", {
                      required: `Silahkan ${
                        selectedId ? "Ubah" : "Masukkan"
                      } Judul Transaksi`,
                    })}
                    className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div className="my-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="text"
                    {...register("price", {
                      required: `Silahkan ${
                        selectedId ? "Ubah" : "Masukkan"
                      } Harga`,
                    })}
                    className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.price && (
                    <span className="text-red-500 text-sm">
                      {errors.price?.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="category">Category</label>
                  <Controller
                    control={control}
                    name="category"
                    rules={{ required: "Mohon Pilih Kategori" }}
                    render={({ field: { onChange } }) => (
                      <>
                        <AutoComplete
                          onChange={(input) => {
                            onChange(input?.text);
                          }}
                          placeholder="Pilih Kategori"
                          label={null}
                          onQueryChange={(queryText) => {
                            if (debounce.current) {
                              clearTimeout(debounce.current);
                            }
                            debounce.current = window.setTimeout(() => {
                              setQueryCategory(queryText);
                            }, 500);
                          }}
                          defaultValue={{
                            text: dataProduct?.category ?? "",
                            value: "",
                          }}
                          options={categories?.map((each: CategoryType) => ({
                            text: each,
                            value: String(each),
                          }))}
                        />
                      </>
                    )}
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="my-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    {...register("description", {
                      required: `Silahkan ${
                        selectedId ? "Edit" : "Add"
                      } Description`,
                    })}
                    className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-blue-600 px-2.5 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {selectedId ? "Save" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalProduct;
