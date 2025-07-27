"use client"
import React, { useEffect, useState } from 'react'
import UsersList from './UsersList';

// Define proper types
export interface User {
  id: number;
  role: string; 
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: "no-store",
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const userData: User[] = await response.json();
        setUsers(userData)
      } catch (err) {
        console.error('Error fetching users:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

if (loading) {
  return (
    <tbody>
      <tr>
        <td colSpan={6} className="text-center p-4">Loading users...</td>
      </tr>
    </tbody>
  )
}
  

  return (
    <tbody className="users-container">
      {users.map((user: User, index: number) => (
        <UsersList key={user.id} user={user} index={index} />
      ))}
    </tbody>
  )
}

export default ShowUsers