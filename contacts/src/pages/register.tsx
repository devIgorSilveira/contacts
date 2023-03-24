import { useState, useEffect } from "react";
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateUserBody } from "@/interfaces/users";
import { createUserSchema } from "@/schemas/users";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";

const Register = () => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const { registerUser } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUserBody>({
    resolver: yupResolver(createUserSchema),
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

  const onSubmit = (body: ICreateUserBody) => {
    registerUser(body);
  };

  const goToLoginPage = () => {
    router.push("/");
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
          Cadastre-se
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
          Cadastre-se
        </Button>
        <Text alignSelf={"center"}>
          Já possui conta?{" "}
          <Link color={"blue.500"} fontWeight={"bold"} onClick={goToLoginPage}>
            Login
          </Link>
        </Text>
      </FormControl>
    </Center>
  );
};

export default Register;
