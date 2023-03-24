import { Center, FormControl } from "@chakra-ui/react";
import { ReactNode } from "react";

interface children {
  children: ReactNode;
}

const DefaultForm = ({ children }: children) => {
  return (
    <Center as={"main"} width={"100vw"} height={"100vh"}>
      <FormControl
        as={"form"}
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        width={"50%"}
      >
        {children}
      </FormControl>
    </Center>
  );
};

export default DefaultForm;
