import PersonalDetails from "../_components/PersonalDetails/PersonalDetails";
import ContactInfo from "../_components/ContactInfo/ContactInfo";
import ChangePassword from "../_components/ChangePassword/ChangePassword";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";

export default async function ProfilePage() {
  const session = await auth();
  const loggedInUser = await getUserByEmail(session?.user?.email);
  return (
    <>
      <PersonalDetails userInfo={loggedInUser}/>
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <ContactInfo />
          <ChangePassword />
        </div>
      </div>
    </>
  );
}
