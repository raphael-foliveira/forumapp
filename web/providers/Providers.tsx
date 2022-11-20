"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import AuthChecker from "./AuthChecker";

export function Providers({ children }: { children: ReactNode }) {
    const [localToken, setLocalToken] = useState<string>("");

    useEffect(() => {
        setLocalToken(localStorage.getItem("token") || "");
    }, []);

    return (
        <Provider store={store}>
            <AuthChecker localToken={localToken}>
                <ChakraProvider>{children}</ChakraProvider>
            </AuthChecker>
        </Provider>
    );
}
