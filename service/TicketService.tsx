import { Status, Ticket, Priority } from '@prisma/client';
import prisma from '../prisma/db';
import dayjs from 'dayjs'
class TicketService {
 
  async getRecentTickets() {
    const tickets = await prisma.ticket.findMany({
      where: {
        NOT: [{ status: 'CLOSED' }],
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip: 0,
      take: 5,
      include: {
        assignedToUser: true,
      },
    });
    return tickets;
  }

  
  async getGroupedTickets() {
    const groupTicket = await prisma.ticket.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    const data = groupTicket.map((item) => ({
      name: item.status,
      total: item._count.id,
    }));
    return data;
  }

  
  
  async getTickets(page: number, pageSize: number, orderBy: keyof Ticket, status?: Status, searchQuery?: string, dateFilter?: string) {
    const searchQueryLower = searchQuery?.toLowerCase() || '';

    let dateCondition = {};
    const today = dayjs().startOf('day');
    const yesterday = dayjs().subtract(1, 'day').startOf('day');

    if (dateFilter === 'Today') {
      dateCondition = {
        createdAt: {
          gte: today.toDate(),
          lt: dayjs().add(1, 'day').startOf('day').toDate(),
        },
      };
    } else if (dateFilter === 'Yesterday') {
      dateCondition = {
        createdAt: {
          gte: yesterday.toDate(),
          lt: today.toDate(),
        },
      };
    }

    const where = {
      ...(status ? { status } : { NOT: { status: 'CLOSED' as Status } }),
      ...(searchQueryLower
        ? {
            OR: [
              { title: { contains: searchQueryLower } },
              { description: { contains: searchQueryLower } },
            ],
          }
        : {}),
      ...dateCondition, 
    };

    const tickets = await prisma.ticket.findMany({
      where,
      orderBy: { [orderBy]: 'desc' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return tickets;
  }


  // Get the total count of tickets based on status
  async getTicketCount(status?: Status, searchQuery?: string) {
    const searchQueryLower = searchQuery?.toLowerCase() || '';

    const ticketCount = await prisma.ticket.count({
      where: {
       ... (status ? { status } : { NOT: { status: "CLOSED" as Status } }),
       ... (searchQueryLower ? { title: { contains: searchQueryLower } } : {}),
      },
    });

    return ticketCount;
  }
   // Fetch a ticket by its ID
   async getTicketById(id: number) {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });
    return ticket;
  }
  async editTicket(id: number) {
    const ticket = await prisma?.ticket.findUnique({
      where: { id },
    });
    return ticket;
}
 async getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

}

export default new TicketService();
