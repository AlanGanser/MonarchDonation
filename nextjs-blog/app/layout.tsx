import "../styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;
