import { createContext, useContext, useEffect, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { IChildren } from "@/interfaces/misc";
import { IUserLogin, ICreateUserBody, IUserData } from "@/interfaces/users";
import { api } from "@/services/api";
import { useToast, Box } from "@chakra-ui/react";
interface AuthProviderData {
  setToken: (value: string) => void;
  login: (data: IUserLogin) => void;
  registerUser: (data: ICreateUserBody) => void;
  getUserProfile: () => void;
  token: string | undefined;
  user: IUserData | null;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: IChildren) => {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<IUserData | null>(null);

  useEffect(() => {
    getUserProfile();
  }, [token]);

  const toast = useToast();

  const router = useRouter();

  const login = (body: IUserLogin) => {
    api
      .post("/login", body)
      .then((res) => {
        setCookie(null, "@contacts:token", res.data.token);

        toast({
          title: "success",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"green.300"}>
              Login realizado com sucesso!
            </Box>
          ),
        });

        setToken(res.data.token);
        router.push("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"red.300"}>
              {err.response?.data ? err.response.data.message : err.message}
            </Box>
          ),
        });
      });
  };

  const registerUser = (body: ICreateUserBody) => {
    api
      .post("/users", body)
      .then((res) => {
        toast({
          title: "success",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"green.300"}>
              Conta criada com sucesso!
            </Box>
          ),
        });

        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"red.300"}>
              {err.response?.data ? err.response.data.message : err.message}
            </Box>
          ),
        });
      });
  };

  const getUserProfile = () => {
    api
      .get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{ login, registerUser, getUserProfile, token, user, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
