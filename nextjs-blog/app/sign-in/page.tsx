import { currentUser } from "@clerk/nextjs";
import UserSignIn from "../../components/login/userSignIn";
import { redirect } from 'next/navigation'


const Page = async () => {
    const user = await currentUser()
    if (user) {
        redirect("/dashboard/dashboard");
    }
    return (
        <UserSignIn />
    )
};

export default Page;
