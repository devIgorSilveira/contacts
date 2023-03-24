import ContactCard from "@/components/contactCard";
import Header from "@/components/header";
import { useAuth } from "@/contexts/authContext";
import { IDashboardProps } from "@/interfaces/misc";
import { Button, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";

const Dashboard = ({ cookieToken }: IDashboardProps) => {
  const { setToken, contacts } = useAuth();

  useEffect(() => {
    setToken(cookieToken);
  }, []);

  console.log("+++");
  return (
    <>
      <Header />
      <Flex as={"nav"} m={"10"} marginBottom={"1"}>
        <Button
          bg={"blue.500"}
          variant={"solid"}
          color={"white"}
          leftIcon={<AddIcon />}
        >
          Adicinar novo contato
        </Button>
      </Flex>
      <Flex as={"ul"} p={"10"} gap={"1rem"} flexWrap={"wrap"}>
        {contacts?.map((contact) => (
          <ContactCard key={contact.id} data={contact} />
        ))}
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const token = cookies["@contacts:token"];

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { cookieToken: token },
  };
};

export default Dashboard;
