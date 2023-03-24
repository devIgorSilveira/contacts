import { useModal } from "@/contexts/modalContext";
import { IChildren } from "@/interfaces/misc";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const GeneralModal = ({ children }: IChildren) => {
  const { isOpen, onClose } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>{children}</ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default GeneralModal;
