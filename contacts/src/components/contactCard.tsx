import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IContactData } from "@/interfaces/contacts";

const ContactCard = ({
  first_name,
  last_name,
  email,
  phone,
  createdAt,
}: IContactData) => {
  return (
    <Card as={"li"} w={"calc(90%/3)"} border={"2px"} borderColor={"blue.500"}>
      <CardHeader bg={"blue.500"}>
        <Heading
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
          color={"white"}
        >
          `${first_name} ${last_name}`
        </Heading>
      </CardHeader>
      <CardBody textAlign={"center"}>
        <Text>`Email: ${email}`</Text>
        <Text>
          Phone: `(${phone.slice(0, 2)}) ${phone.slice(2)}`
        </Text>
        <Text>`Adicionado em: ${createdAt}`</Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup
          size={"sm"}
          variant={"solid"}
          color={"white"}
          w={"100%"}
          display={"flex"}
          justifyContent={"space-around"}
        >
          <Button bg={"blue.500"} leftIcon={<EditIcon />}>
            Editar
          </Button>
          <Button bg={"red.500"} leftIcon={<DeleteIcon />}>
            Deletar
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
