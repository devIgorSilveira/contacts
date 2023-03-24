import { useAuth } from "@/contexts/authContext";
import { useModal } from "@/contexts/modalContext";
import { IUpdateContact } from "@/interfaces/contacts";
import { updateContactSchema } from "@/schemas/contacts";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UpdateContactForm = () => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const { updateContact } = useAuth();

  const { onClose, actualId } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateContact>({
    resolver: yupResolver(updateContactSchema),
  });

  useEffect(() => {
    errors.first_name ? setFirstNameError(true) : setFirstNameError(false);
    errors.last_name ? setLastNameError(true) : setLastNameError(false);
    errors.email ? setEmailError(true) : setEmailError(false);
    errors.phone ? setPhoneError(true) : setPhoneError(false);
  }, [errors.first_name, errors.last_name, errors.email, errors.phone]);

  const onSubmit = (body: IUpdateContact) => {
    for (let key in body) {
      if (body[key] == "") {
        delete body[key];
      }
    }
    updateContact(actualId, body);
    onClose();
  };

  return (
    <Center as={"main"} width={"100%"} mt={"10"} mb={"10"}>
      <FormControl
        as={"form"}
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        width={"50%"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading color={"blue.500"} alignSelf={"center"}>
          Atualizar
        </Heading>
        <FormLabel>Primeiro nome</FormLabel>
        <Input
          id={"first_name"}
          {...register("first_name")}
          type={"text"}
          focusBorderColor={"blue.300"}
          errorBorderColor={"red.300"}
          isInvalid={firstNameError}
        />
        {errors.first_name ? (
          <Text fontSize={"sm"} color={"red.300"}>
            {errors.first_name?.message}
          </Text>
        ) : null}
        <FormLabel>Sobrenome</FormLabel>
        <Input
          id={"last_name"}
          {...register("last_name")}
          type={"text"}
          focusBorderColor={"blue.300"}
          errorBorderColor={"red.300"}
          isInvalid={lastNameError}
        />
        {errors.last_name ? (
          <Text fontSize={"sm"} color={"red.300"}>
            {errors.last_name?.message}
          </Text>
        ) : null}
        <FormLabel>E-mail</FormLabel>
        <Input
          id={"email"}
          {...register("email")}
          type={"email"}
          focusBorderColor={"blue.300"}
          errorBorderColor={"red.300"}
          isInvalid={emailError}
        />
        {errors.email ? (
          <Text fontSize={"sm"} color={"red.300"}>
            {errors.email?.message}
          </Text>
        ) : null}
        <FormLabel>Celular</FormLabel>
        <Input
          id={"phone"}
          {...register("phone")}
          type={"tel"}
          focusBorderColor={"blue.300"}
          errorBorderColor={"red.300"}
          isInvalid={phoneError}
        />
        {errors.phone ? (
          <Text fontSize={"sm"} color={"red.300"}>
            {errors.phone?.message}
          </Text>
        ) : null}
        <Button
          bg={"blue.500"}
          textColor={"white"}
          variant={"solid"}
          type={"submit"}
        >
          Enviar
        </Button>
      </FormControl>
    </Center>
  );
};

export default UpdateContactForm;
