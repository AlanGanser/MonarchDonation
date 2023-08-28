import Navbar from "../../componenets/dashboard/dashboard-navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar>{children}</Navbar>
        </>
    );
};

export default Layout;
