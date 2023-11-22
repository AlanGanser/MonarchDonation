import ResetPassword from "../../componenets/login/resetPassword";
import { SignedOut, SignedIn, RedirectToUserProfile, RedirectToSignIn } from "@clerk/nextjs";

const Page = () => {
    return <ResetPassword />;
};

export default Page;
