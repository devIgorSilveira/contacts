import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/contexts/authContext";
import { ModalProvider } from "@/contexts/modalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
