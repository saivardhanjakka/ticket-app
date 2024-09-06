import prisma from '../../../prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '../../../components/Pagination';
import StatusFilter from '../../../components/StatusFilter';
import { Status, Ticket } from '@prisma/client';
import TicketService from '../../../service/TicketService';
import DateFilter from '../../../components/DateFilter';
import SearchBox from '../../../components/SearchBox';

export interface SearchParams {
  page: string;
  status: Status;
  orderBy: keyof Ticket;
  searchQuery?: string;
  dateFilter?: string;  // Date filter

}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt";
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const searchQuery = searchParams.searchQuery || '';
  const dateFilter = searchParams.dateFilter || '';

  const tickets = await TicketService.getTickets(page, pageSize, orderBy, status,searchQuery,dateFilter);
  const ticketCount = await TicketService.getTicketCount(status,searchQuery);

  return (
    <div>
      <div className="flex gap-2">
        <Link href="/tickets/new" className={buttonVariants({ variant: "default" })}>
          New Ticket
        </Link>
        <br /> &nbsp;
        <StatusFilter />
        <DateFilter/>
        <SearchBox/>
        
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={page} />
    </div>
  );
};

export default Tickets;
