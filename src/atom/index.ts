import { atom } from "recoil";

export const writeTitleState = atom({
  key: "writeTitleState",
  default: "",
});

export const writeContentState = atom({
  key: "writeContentState",
  default: "",
});

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalDesState = atom({
  key: "modalDesState",
  default: ''
})

export const writeTitleValidateState = atom({
  key: "writeTitleValidateState",
  default: false,
});

export const errorMessageState = atom({
  key: "errorMessageState",
  default: "",
});

export const isWriteUpdateState = atom({
  key: 'isWriteUpdateState',
  default: false,
});

export const updateWriteIdState = atom({
  key: 'updateWriteIdState',
  default: '',
});

export const isupdateWriteCommentState = atom({
  key: 'isupdateWriteCommentState',
  default: {id: '', isUpdate: false},
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});

