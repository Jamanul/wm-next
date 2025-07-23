"use client"

import React from 'react'

export interface User {
  id: number;
  role: string; 
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UsersList = ({user,index}:{user:User,index:number}) => {
    const handleRoleChange = async(e:any)=>{
  e.preventDefault();
  const newRole = e.target.value;
const res = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    role: newRole,
    id: user.id,
  }),
});
const data = await res.json()
if(data.success){
  alert('Role Changed')
}
}
  return (
      <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
              >
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize text-blue-500">
                  <select onChange={handleRoleChange} name="" id="">
                    <option value={user.role}>{user.role}</option>
                    <option value="user">user</option>
                    <option value="vendor">vendor</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                   <td className="py-2 px-4">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </td>
              </tr>
  )
}

export default UsersList