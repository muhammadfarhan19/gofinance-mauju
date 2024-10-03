import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UserType } from "@/types/user.type";
import { useUser } from "@/app/hooks/UseUserData";
import ModalProfile from "../forms/ModalProfile";

interface ProfilePageProps {
  userData: UserType | undefined;
}

const ProfilePage = ({ userData }: ProfilePageProps) => {
  const { push } = useRouter();
  const username = localStorage.getItem("username") || userData?.username;
  const { data, loading, error } = useUser();

  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    selectedId?: number;
  }>({
    open: false,
    selectedId: undefined,
  });

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  React.useEffect(() => {
    if (!Cookies.get("token")) push("/auth/login");
  }, [push]);

  return (
    <section className="min-w-full max-w-screen-md m-auto border flex flex-col justify-center items-end max-h-screen min-h-fit md:min-h-96 md:max-h-[500px] border-[#0575E6] rounded-2xl shadow-2xl py-10 px-4 md:px-6">
      <aside className="w-full text-center flex flex-col items-end sm:px-20 md:px-32 lg:px-40 xl:px-52 2xl:px-96">
        <div className="w-full">
          <h1 className="">Username</h1>
          <h1 className="font-semibold italic text-xl">{username}</h1>
          <div className="w-full h-0.5 rounded-full bg-black mb-4" />

          <h1 className="">Email</h1>
          <h1 className="font-semibold italic text-xl">{data?.email}</h1>
          <div className="w-full h-0.5 rounded-full bg-black mb-4" />

          <h1 className="">Phone</h1>
          <h1 className="font-semibold italic text-xl">{data?.phone}</h1>
          <div className="w-full h-0.5 rounded-full bg-black mb-4" />

          <h1 className="">Address</h1>
          <h1 className="font-semibold italic text-xl">
            {data?.address.street}, {data?.address.number},{" "}
            {data?.address.geolocation.lat}, {data?.address.geolocation.long},{" "}
            {data?.address.zipcode}
          </h1>
          <div className="w-full h-0.5 rounded-full bg-black mb-4" />

          <h1 className="">City</h1>
          <h1 className="font-semibold italic text-xl">{data?.address.city}</h1>
          <div className="w-full h-0.5 rounded-full bg-black mb-4" />
        </div>

        <button
          className="bg-[#0575E6] px-6 py-2 md:py-3 rounded-full text-white text-sm"
          onClick={() => {
            handleShowForm(!formModalState?.open, data?.id);
          }}
        >
          Edit
        </button>
      </aside>
      {formModalState?.open && (
        <ModalProfile
          open={formModalState?.open}
          setOpen={(open: boolean) => handleShowForm(open, 0)}
          onSuccess={() => formModalState.open}
          selectedId={formModalState.selectedId}
        />
      )}
    </section>
  );
};

export default ProfilePage;
