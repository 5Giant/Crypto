import React from "react";
import { CryptoContextProvider } from "./context/crypto-context";
import AppLayout from "./components/AppLayout";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CryptoContextProvider>
          <AppLayout />
        </CryptoContextProvider>
      </BrowserRouter>
    </>
  );
}
