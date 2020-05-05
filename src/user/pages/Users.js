import React from 'react';
import UserList from '../components/UserList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Hang Ung',
      image: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png',
      places: 3
    }
  ];
  return <UserList items={USERS} />
}

export default Users;