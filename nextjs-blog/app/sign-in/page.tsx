import { currentUser } from "@clerk/nextjs";
import UserSignIn from "../../componenets/login/userSignIn";
import { redirect } from 'next/navigation'


const Page = async () => {
    const user = await currentUser()
    if (user) {
        redirect("/dashboard/user");
    }
    return (
        <UserSignIn />
    )
};

export default Page;
