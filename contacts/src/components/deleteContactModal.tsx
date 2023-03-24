import { useAuth } from "@/contexts/authContext";
import { useModal } from "@/contexts/modalContext";
import { Box, Button, ButtonGroup, Center, Heading } from "@chakra-ui/react";

const DeleteContactModal = () => {
  const { deleteContact } = useAuth();
  const { onClose, actualId } = useModal();

  const onClickYes = () => {
    deleteContact(actualId);
    onClose();
  };

  return (
    <Center as={"main"} width={"100%"} mt={"10"} mb={"10"}>
      <Box display={"flex"} flexDirection={"column"} gap={"2rem"} width={"50%"}>
        <Heading
          color={"blue.500"}
          alignSelf={"center"}
          fontSize={"md"}
          textAlign={"center"}
        >
          Tem Certeza que deseja deletar esse contato?
        </Heading>
        <ButtonGroup
          size={"md"}
          variant={"solid"}
          color={"white"}
          w={"100%"}
          display={"flex"}
          justifyContent={"space-around"}
        >
          <Button bg={"blue.500"} onClick={onClickYes}>
            Sim
          </Button>
          <Button bg={"red.500"} onClick={onClose}>
            Não
          </Button>
        </ButtonGroup>
      </Box>
    </Center>
  );
};

export default DeleteContactModal;
