import { Flex, Text } from "@chakra-ui/react";
import { useAuth } from "@/contexts/authContext";
import MenuHeader from "./menuHeader";

const Header = () => {
  const { user } = useAuth();

  return (
    <Flex
      as={"header"}
      bg={"blue.500"}
      p={"10"}
      justifyContent={"space-between"}
    >
      <Text color={"white"} fontSize={"xl"} fontWeight={"bold"}>
        {`${user?.first_name} ${user?.last_name}`}
      </Text>
      <MenuHeader />
    </Flex>
  );
};

export default Header;
