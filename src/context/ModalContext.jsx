"use client";
import React, { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
  modalVisible: null,
  setModalVisible: null,
});

export default function ModalProvider({ children }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ModalContext.Provider
      value={{ modalVisible: modalVisible, setModalVisible: setModalVisible }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const { modalVisible, setModalVisible } = useContext(ModalContext);
  if (modalVisible === null || setModalVisible === null) {
    throw new Error("");
  }
  return { modalVisible, setModalVisible };
}
