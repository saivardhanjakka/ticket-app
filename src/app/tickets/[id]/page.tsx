import React from "react";
import prisma from "../../../../prisma/db";
import TicketDetail from "./TicketDetails";
import TicketService from "../../../../service/TicketService";
import UserService from "../../../../service/UserService";

interface Props {
  params: { id: string };
}

const ViewTicket = async ({ params }: Props) => {
  /*const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });*/

  const ticket = await TicketService.getTicketById(parseInt(params.id));

  //const users = await prisma.user.findMany();
  const users = await TicketService.getAllUsers();

  if (!ticket) {
    return <p className=" text-destructive">Ticket Not Found!</p>;
  }

  return <TicketDetail ticket={ticket} users={users} />;
};

export default ViewTicket;