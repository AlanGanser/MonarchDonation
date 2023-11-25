import { currentUser } from "@clerk/nextjs";
import Navbar from "../../components/donations/homeNavbar";
import Footer from "../../components/general/footer";

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
