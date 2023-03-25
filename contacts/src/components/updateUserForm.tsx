import { useAuth } from "@/contexts/authContext";
import { useModal } from "@/contexts/modalContext";
import { IUpdateUser } from "@/interfaces/users";
import { updateUserSchema } from "@/schemas/users";
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

const UpdateUserForm = () => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const { updateUser } = useAuth();

  const { actualId, onClose } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUser>({
    resolver: yupResolver(updateUserSchema),
  });

  useEffect(() => {
    errors.first_name ? setFirstNameError(true) : setFirstNameError(false);
    errors.last_name ? setLastNameError(true) : setLastNameError(false);
    errors.email ? setEmailError(true) : setEmailError(false);
    errors.password ? setPasswordError(true) : setPasswordError(false);
    errors.phone ? setPhoneError(true) : setPhoneError(false);
  }, [
    errors.first_name,
    errors.last_name,
    errors.email,
    errors.password,
    errors.phone,
  ]);

  const onSubmit = (body: IUpdateUser) => {
    for (let key in body) {
      if (body[key] == "") {
        delete body[key];
      }
    }
    updateUser(actualId, body);
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
        <FormLabel>Senha</FormLabel>
        <Input
          id={"password"}
          {...register("password")}
          type={"password"}
          focusBorderColor={"blue.300"}
          errorBorderColor={"red.300"}
          isInvalid={passwordError}
        />
        {errors.password ? (
          <Text fontSize={"sm"} color={"red.300"}>
            {errors.password?.message}
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

export default UpdateUserForm;
