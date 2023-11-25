import ResetPassword from "../../components/login/resetPassword";
import { SignedOut, SignedIn, RedirectToUserProfile, RedirectToSignIn } from "@clerk/nextjs";

const Page = () => {
    return <ResetPassword />;
};

export default Page;
