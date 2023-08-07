import AdminNavbar from "../../../componenets/admin/admin-navbar";

const ControlLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <AdminNavbar>{children}</AdminNavbar>
        </>
    );
};

export default ControlLayout;
