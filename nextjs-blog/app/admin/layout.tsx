import { currentUser } from "@clerk/nextjs";
import AdminNavbar from "../../componenets/admin/adminNavbar";
import { User } from "@clerk/nextjs/dist/types/server";
import prisma from "../../lib/prisma";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Admin"
};

const ControlLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = (await currentUser()) as User;
    const userDB = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })
    if (userDB?.type !== "Admin") {
        notFound()
    }

    return (
        <>
            <AdminNavbar>{children}</AdminNavbar>
        </>
    );
};

export default ControlLayout;
