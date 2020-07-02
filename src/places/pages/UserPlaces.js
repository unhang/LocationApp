import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Landmark 81',
    description: 'The most famous sky scraper in Vietnam',
    imageUrl: 'https://kinhdoanhdiaoc.net/wp-content/uploads/2017/06/landmark-81-1.jpg',
    address: '20 W 34th St, New York, NY 1001',
    location: {
      lat: 10.7941662,
      lng: 106.7186276
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Landmark 81',
    description: 'The most famous sky scraper in Vietnam',
    imageUrl: 'https://kinhdoanhdiaoc.net/wp-content/uploads/2017/06/landmark-81-1.jpg',
    address: '20 W 34th St, New York, NY 1001',
    location: {
      lat: 10.7941662,
      lng: 106.7186276
    },
    creator: 'u2'
  }
];

const UserPlaces = props => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces;