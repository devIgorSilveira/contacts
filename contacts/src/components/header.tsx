import { Flex, Text, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authContext";

const Header = () => {
  const router = useRouter();

  const { user } = useAuth();

  const logout = () => {
    destroyCookie(null, "@contacts:token");

    router.push("/");
  };

  return (
    <Flex bg={"blue.500"} p={"10"} justifyContent={"space-between"}>
      <Text color={"white"} fontSize={"xl"} fontWeight={"bold"}>
        {`${user?.first_name} ${user?.last_name}`}
      </Text>
      <Button
        bg={"white"}
        color={"blue.500"}
        variant={"solid"}
        fontWeight={"bold"}
        rightIcon={<ArrowBackIcon />}
        onClick={() => logout()}
      >
        Sair
      </Button>
    </Flex>
  );
};

export default Header;
