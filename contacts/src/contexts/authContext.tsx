import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { IChildren } from "@/interfaces/misc";
import {
  IUserLogin,
  ICreateUserBody,
  IUserData,
  IUpdateUser,
} from "@/interfaces/users";
import { api } from "@/services/api";
import { useToast, Box } from "@chakra-ui/react";
import {
  IContactData,
  ICreateContactBody,
  IUpdateContact,
} from "@/interfaces/contacts";
interface AuthProviderData {
  setToken: (value: string) => void;
  login: (data: IUserLogin) => void;
  registerUser: (data: ICreateUserBody) => void;
  getUserProfile: () => void;
  getContactsOfaUser: () => void;
  registerContact: (data: ICreateContactBody) => void;
  deleteContact: (id: string) => void;
  updateContact: (id: string, body: IUpdateContact) => void;
  updateUser: (id: string, body: IUpdateUser) => void;
  deleteUser: (id: string) => void;
  token: string | undefined;
  user: IUserData | null;
  contacts: IContactData[] | null;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: IChildren) => {
  const cookies = parseCookies();

  const [token, setToken] = useState<string>(cookies["@contacts:token"] || "");
  const [user, setUser] = useState<IUserData | null>(null);
  const [contacts, setContacts] = useState<IContactData[] | null>(null);

  useEffect(() => {
    if (token) {
      getUserProfile();
      getContactsOfaUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const updateUser = (id: string, body: IUpdateUser) => {
    api
      .patch(`/users/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: "success",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"green.300"}>
              {`Usuário atualizado com sucesso!`}
            </Box>
          ),
        });
        getUserProfile();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteUser = (id: string) => {
    api
      .delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: "success",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"green.300"}>
              {`Usuário deletado com sucesso!`}
            </Box>
          ),
        });
        destroyCookie(null, "@contacts:token");
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getContactsOfaUser = () => {
    api
      .get("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const registerContact = (body: ICreateContactBody) => {
    api
      .post("/contacts", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: "success",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"green.300"}>
              {`Contato ${res.data.first_name} criado com sucesso!`}
            </Box>
          ),
        });
        getContactsOfaUser();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteContact = (id: string) => {
    api
      .delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: "success",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"green.300"}>
              {`Contato deletado com sucesso!`}
            </Box>
          ),
        });
        getContactsOfaUser();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateContact = (id: string, body: IUpdateContact) => {
    api
      .patch(`/contacts/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: "success",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          duration: 2000,
          render: () => (
            <Box color={"white"} p={3} bg={"green.300"}>
              {`Contato atualizado com sucesso!`}
            </Box>
          ),
        });
        getContactsOfaUser();
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

  return (
    <AuthContext.Provider
      value={{
        login,
        registerUser,
        getUserProfile,
        getContactsOfaUser,
        updateUser,
        deleteUser,
        registerContact,
        deleteContact,
        updateContact,
        token,
        user,
        contacts,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
