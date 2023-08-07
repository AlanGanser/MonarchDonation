import Navbar from "../../componenets/navbar";

const DonateLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default DonateLayout;
