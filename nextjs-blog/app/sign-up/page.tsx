import { currentUser } from "@clerk/nextjs";
import UserSignUp from "../../componenets/login/userSignUp";
import { redirect } from "next/navigation";

const Page = async () => {
    const user = await currentUser()
    if (user) {
        redirect("/dashboard/user");
    }
    return <UserSignUp />;
};

export default Page;
