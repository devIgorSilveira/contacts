import { useModal } from "@/contexts/modalContext";
import { IChildren } from "@/interfaces/misc";
import { Modal, ModalContent, ModalOverlay, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const GeneralModal = ({ children }: IChildren) => {
  const { isOpen, onClose, setModalType } = useModal();

  const closeModal = () => {
    setModalType("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay>
        <ModalContent>
          <Button
            w={"fit-content"}
            alignSelf={"flex-end"}
            bg={"blue.500"}
            color={"white"}
            m={"1"}
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
          {children}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default GeneralModal;
