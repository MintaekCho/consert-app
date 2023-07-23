import { modalDesState, modalState } from "@/atom";
import { useRecoilState } from "recoil";

export function useModal() {
  const [modalDes, setModalDes] = useRecoilState(modalDesState);

  const [modalVisible, setModalVisible] = useRecoilState(modalState);

  return {
    modalVisible,
    setModalVisible,
    modalDes,
    setModalDes,
  };
}
