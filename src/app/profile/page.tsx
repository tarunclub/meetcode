'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const [user, setUser] = React.useState({
    id: 0,
    name: '',
    email: '',
  });
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      toast.success("You've been logged out");
      router.push('/auth/login');
    } catch (error: any) {
      toast.error('Problem logging out');
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    try {
      const getUserData = async () => {
        const response = await axios.get('/api/users/me');
        setUser({
          id: response.data.user.id,
          name: response.data.user.username,
          email: response.data.user.email,
        });
      };

      getUserData();
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Profile</h1>
      <hr />
      <p>Profile page of {user.name}</p>
      <hr />
      <button
        className="bg-blue-500 p-3 text-white rounded-md"
        onClick={logout}
      >
        logout
      </button>
    </main>
  );
}
