/* eslint-disable react-hooks/exhaustive-deps */
import { DATA_USER } from "@/types/api/endpoints";
import { Dialog, Textarea, Transition } from "@headlessui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { CloseIcon } from "../icons";
import { setSnackbar } from "../shared/Snackbar";
import { useDispatch } from "react-redux";
import { SnackbarType } from "@/reducer/CommonReducer";
import { useUser } from "@/app/hooks/UseUserData";
import { UserType } from "@/types/user.type";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: number | undefined;
}

function ModalProfile(props: ModalProps) {
  const { open, setOpen, onSuccess, selectedId } = props;
  const { data, error, loading } = useUser();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm<UserType>();

  const submitHandler = async (formData: UserType) => {
    await axios.patch(DATA_USER.GET_USER_LIST + `/${selectedId}`, formData);
    dispatch(
      setSnackbar({
        show: true,
        message: "Data berhasil disimpan.",
        type: SnackbarType.INFO,
      }),
    );
    onSuccess();
    setOpen(!open);
  };

  React.useEffect(() => {
    if (selectedId && data) {
      setValue("id", data && data.id);
      setValue("username", data && data?.username);
      setValue("email", data && data?.email);
      setValue("phone", data && data?.phone);
      setValue("address.street", data && data?.address.street);
      setValue("address.city", data && data?.address.city);
      setValue("address.zipcode", data && data?.address.zipcode);
      setValue("address.number", data && data?.address.number);
      setValue(
        "address.geolocation.lat",
        data && data?.address.geolocation.lat,
      );
      setValue(
        "address.geolocation.long",
        data && data?.address.geolocation.long,
      );
    }
  }, [data && selectedId]);

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
                <div className="grid grid-cols-2 gap-x-2">
                  <div className="my-4 w-full col-span-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      {...register("username", {
                        required: `Silakan ubah username`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.username && (
                      <span className="text-red-500 text-sm">
                        {errors.username.message}
                      </span>
                    )}
                  </div>

                  <div className="my-4 w-full col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: `Silakan ubah Email`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email?.message}
                      </span>
                    )}
                  </div>

                  <div className="my-4 w-full col-span-1">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="text"
                      inputMode="numeric"
                      {...register("phone", {
                        required: `Silakan ubah nomor HP`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm">
                        {errors.phone?.message}
                      </span>
                    )}
                  </div>

                  <div className="my-4 w-full col-span-1">
                    <label
                      htmlFor="address.street"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street
                    </label>
                    <Textarea
                      id="description"
                      {...register("address.street", {
                        required: `Silakan ubah alamat`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.address?.street && (
                      <span className="text-red-500 text-sm">
                        {errors.address?.street.message}
                      </span>
                    )}
                  </div>

                  <div className="my-4 w-full col-span-1">
                    <label
                      htmlFor="address.number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street number
                    </label>
                    <input
                      id="address.number"
                      type="text"
                      inputMode="numeric"
                      {...register("address.number", {
                        required: `Silakan ubah Nomor jalan`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.address?.number && (
                      <span className="text-red-500 text-sm">
                        {errors.address?.number?.message}
                      </span>
                    )}
                  </div>

                  <div className="my-4 w-full col-span-1">
                    <label
                      htmlFor="address.zipcode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Zipcode
                    </label>
                    <input
                      id="address.zipcode"
                      type="text"
                      inputMode="numeric"
                      {...register("address.zipcode", {
                        required: `Silakan ubah Nomor jalan`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.address?.zipcode && (
                      <span className="text-red-500 text-sm">
                        {errors.address?.zipcode?.message}
                      </span>
                    )}
                  </div>

                  <div className="my-4 w-full col-span-1">
                    <label
                      htmlFor="address.zipcode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Geolocation Lat
                    </label>
                    <input
                      id="address.geolocation.lat"
                      type="text"
                      inputMode="numeric"
                      {...register("address.geolocation.lat", {
                        required: `Silakan ubah Nomor jalan`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.address?.geolocation?.lat && (
                      <span className="text-red-500 text-sm">
                        {errors.address?.geolocation?.lat?.message}
                      </span>
                    )}
                  </div>

                  <div className="my-4 w-full col-span-1">
                    <label
                      htmlFor="address.zipcode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Geolocation Long
                    </label>
                    <input
                      id="address.geolocation.long"
                      type="text"
                      inputMode="numeric"
                      {...register("address.geolocation.long", {
                        required: `Silakan ubah Nomor jalan`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.address?.geolocation?.long && (
                      <span className="text-red-500 text-sm">
                        {errors.address?.geolocation?.long?.message}
                      </span>
                    )}
                  </div>

                  <div className="my-4 w-full col-span-1">
                    <label
                      htmlFor="address.city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      id="address.city"
                      type="text"
                      {...register("address.city", {
                        required: `Silakan ubah kota`,
                      })}
                      className="mt-1 block w-full p-4 rounded-xl border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.address?.city && (
                      <span className="text-red-500 text-sm">
                        {errors.address?.city?.message}
                      </span>
                    )}
                  </div>
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

export default ModalProfile;
