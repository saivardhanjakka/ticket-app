import React from "react";
import prisma from "../../../../prisma/db"
import UserForm from "../../../../components/UserForm";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import UserService from "../../../../service/UserService";
interface Props{
    params:{id:string};
}
const EditUser = async ({params}:Props)=>{

    const session =await getServerSession(options);

    if(session ?.user.role!=="ADMIN"){
      return <p className='text-destructive'>Admin access required.</p>
    }

    /*const user =await prisma ?.user.findUnique({
        where :{id:parseInt(params.id)},
    });*/

     // Fetch user by ID using UserService
  const user = await UserService.getUserById(parseInt(params.id));
  
    if(!user){
        return <p className="text-destructive">User Not Found.</p>;
    }
    user.password="";
     return <UserForm user={user}/>
};
export default EditUser;