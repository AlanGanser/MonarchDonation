import { User } from "@clerk/nextjs/dist/types/server";
import Navbar from "../../componenets/dashboard/dashboardNavbar";
import { currentUser } from "@clerk/nextjs";

export const metadata = {
    title: "Dashboard"
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser() as User;
    return (
        <>
            <Navbar user={user}>{children}</Navbar>
        </>
    );
};

export default Layout;
