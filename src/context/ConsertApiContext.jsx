'use client'
import { createContext, useContext } from "react";
import Consert from "@/api/consert/Consert";
import React from "react";

const ConsertContext = createContext();

const consert = new Consert();

export default function ConsertApiProvider({ children }) {
  return (
    <ConsertContext.Provider value={consert}>
      {children}
    </ConsertContext.Provider>
  );
}

export function useConsertApi() {
  return useContext(ConsertContext);
}
