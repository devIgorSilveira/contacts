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
import { IUserLogin } from "@/interfaces/users";
import { userLoginSchema } from "@/schemas/users";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";

const Register = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { login } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: yupResolver(userLoginSchema),
  });

  useEffect(() => {
    errors.email ? setEmailError(true) : setEmailError(false);
    errors.password ? setPasswordError(true) : setPasswordError(false);
  }, [errors.email, errors.password]);

  const onSubmit = (body: IUserLogin) => {
    login(body);
  };

  const goToRegisterPage = () => {
    router.push("/register");
  };

  return (
    <Center as={"main"} width={"100vw"} height={"100vh"}>
      <FormControl
        as={"form"}
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        width={"50%"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading color={"blue.500"} alignSelf={"center"}>
          Login
        </Heading>
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
          <Link
            color={"blue.500"}
            fontWeight={"bold"}
            onClick={goToRegisterPage}
          >
            Cadastre-se
          </Link>
        </Text>
      </FormControl>
    </Center>
  );
};

export default Register;
