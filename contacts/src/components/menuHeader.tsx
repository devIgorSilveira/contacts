import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useModal } from "@/contexts/modalContext";

const MenuHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { onOpen } = useModal();

  const logout = () => {
    destroyCookie(null, "@contacts:token");

    router.push("/");
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        onClick={() => setIsOpen(!isOpen)}
        bg={"white"}
        color={"blue.500"}
      >
        Menu
      </MenuButton>
      <MenuList color={"blue.500"}>
        <MenuItem onClick={onOpen}>Atulizar seus dados</MenuItem>
        <MenuItem onClick={onOpen}>Deletar sua conta</MenuItem>
        <MenuItem onClick={() => logout()}>Sair</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuHeader;
