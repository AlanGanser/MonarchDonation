import "../styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export const metadata = {
    title: {
        default: "Monarch Donations",
        template: '%s | Monarch Donations'
    },
    icons: {
        icon: [
            {
                url: "/images/monarch-logo.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/images/monarch-logo-dark.png",
                media: "(prefers-color-scheme: dark)",
            },
        ],
    },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();
    return (
        <ClerkProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;
