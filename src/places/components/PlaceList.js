import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './PlaceList.css';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

const PlaceList = props => {


  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button>Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creator={place.creator}
            coordinates={place.location}
            onDelete={props.onPlaceDelete}
          />
        );
      })}
    </ul>
  );
}

export default PlaceList;