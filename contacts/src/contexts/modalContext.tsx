import { IChildren } from "@/interfaces/misc";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";

interface ModalProviderData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  modalType: string;
  setModalType: (value: string) => void;
}

const ModalContext = createContext<ModalProviderData>({} as ModalProviderData);

export const ModalProvider = ({ children }: IChildren) => {
  const [modalType, setModalType] = useState<string>("");

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ModalContext.Provider
      value={{ isOpen, onClose, onOpen, modalType, setModalType }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
