import { IChildren } from "@/interfaces/misc";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

interface ModalProviderData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const ModalContext = createContext<ModalProviderData>({} as ModalProviderData);

export const ModalProvider = ({ children }: IChildren) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ModalContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
