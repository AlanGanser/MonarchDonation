"use client"

// import { UserResource  } from "@clerk/dist/types/server";
import { EmailAddress, User } from "@clerk/nextjs/dist/types/server";
import { createContext, useEffect } from "react";
import { UserResource, EmailAddressResource } from "@clerk/types";
import { currentUser } from "@clerk/nextjs";

type UserDataT = {
    id: string;
    imageUrl: string;
    emailAddresses: EmailAddress[] | EmailAddressResource[];
    firstName: string | null;
    lastName: string | null;
};

export const UserCont = createContext<UserDataT | null>(null);

// passes the useUser hook value as context but uses the curent user prop as a backup.
// I made this weird functionality because I prefer to use the hook because it can automatically refresh when calling user.refresh().
const UserContext = ({ children, user }: { children: React.ReactNode; user: User | null }) => {
    return <UserCont.Provider value={user}>{children}</UserCont.Provider>;
};

export default UserContext;
