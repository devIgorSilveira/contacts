import DefaultForm from "@/components/defaultForm";
import {
  Flex,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  FormErrorMessage,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <DefaultForm>
      <Heading color={"blue.500"} alignSelf={"center"}>
        Login
      </Heading>
      <FormLabel>E-mail</FormLabel>
      <Input />
      <FormLabel>Senha</FormLabel>
      <Input />
      <Button
        bg={"blue.500"}
        textColor={"white"}
        variant={"solid"}
        type={"submit"}
      >
        Login
      </Button>
      <Text alignSelf={"center"}>
        Ainda não possui conta?{" "}
        <Link color={"blue.500"} fontWeight={"bold"}>
          Cadastre-se
        </Link>
      </Text>
    </DefaultForm>
  );
};

export default Home;
