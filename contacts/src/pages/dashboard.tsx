import ContactCard from "@/components/contactCard";
import Header from "@/components/header";
import { useAuth } from "@/contexts/authContext";
import { IDashboardProps } from "@/interfaces/misc";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useEffect } from "react";

const Dashboard = ({ cookieToken }: IDashboardProps) => {
  const { setToken } = useAuth();

  useEffect(() => {
    setToken(cookieToken);
  });

  return (
    <>
      <Header />
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
