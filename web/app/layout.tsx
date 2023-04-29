import React from "react";
import NavBar from "../components/NavBar";
import "./globals.css";
import styles from "./page.module.css";
import { Providers } from "../providers/Providers";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <Providers>
                    <NavBar />
                    <div className={styles.container}>{children}</div>
                </Providers>
            </body>
        </html>
    );
}
