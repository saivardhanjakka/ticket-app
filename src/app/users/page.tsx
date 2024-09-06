import React from 'react'
import UserForm from '../../../components/UserForm'
import DataTableSimple from './data-table-simple'
import prisma from '../../../prisma/db';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';
import UserService from '../../../service/UserService';

const Users = async () => {
  const session =await getServerSession(options);

  if(session ?.user.role!=="ADMIN"){
    return <p className='text-destructive'>Admin access required.</p>
  }

//const users = await prisma.user.findMany();
 // Fetch users using UserService
 const users = await UserService.getAllUsers();


  return (
    <div>
      <UserForm/>
      <DataTableSimple users={users}/>
      </div>
  )
}

export default Users