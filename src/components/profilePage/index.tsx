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
  const [username, setUsername] = React.useState<string | null>(null);
  const { data, loading, error } = useUser();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | undefined>(
    undefined,
  );

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setIsModalOpen(open);
    setSelectedId(selectedId);
  };

  React.useEffect(() => {
    if (!Cookies.get("token")) {
      push("/auth/login");
    }

    const storedUsername =
      localStorage.getItem("username") || userData?.username || null;
    setUsername(storedUsername);
  }, [push, userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

          {data?.address && (
            <>
              <h1 className="">Address</h1>
              <h1 className="font-semibold italic text-xl">
                {data?.address?.street ?? "N/A"},{" "}
                {data?.address?.number ?? "N/A"},
                {data?.address?.geolocation?.lat ?? "N/A"},{" "}
                {data?.address?.geolocation?.long ?? "N/A"},
                {data?.address?.zipcode ?? "N/A"}
              </h1>
              <div className="w-full h-0.5 rounded-full bg-black mb-4" />

              <h1 className="">City</h1>
              <h1 className="font-semibold italic text-xl">
                {data?.address?.city ?? "N/A"}
              </h1>
              <div className="w-full h-0.5 rounded-full bg-black mb-4" />
            </>
          )}
        </div>

        <button
          className="bg-[#0575E6] px-10 py-2 md:py-3 rounded-full text-white text-sm duration-300 ease-in-out hover:bg-blue-600"
          onClick={() => handleShowForm(true, data?.id)}
        >
          Edit
        </button>
      </aside>

      {isModalOpen && (
        <ModalProfile
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onSuccess={() => setIsModalOpen(false)}
          selectedId={selectedId}
        />
      )}
    </section>
  );
};

export default ProfilePage;
