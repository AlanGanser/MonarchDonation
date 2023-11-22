import { currentUser } from "@clerk/nextjs";
import Navbar from "../../componenets/donations/homeNavbar";
import Footer from "../../componenets/general/footer";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();

    return (
        <>
            <Navbar user={user} />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
