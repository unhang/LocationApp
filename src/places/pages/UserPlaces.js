import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { API_ENDPOINT } from "../../shared/util/constant";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = (props) => {
  const userId = useParams().userId;
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { sendRequest, error, clearError, isLoading } = useHttpClient();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${API_ENDPOINT}/place/user/${userId}`
        );
        console.log(responseData);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };

    fetchUserPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal onClear={clearError} />}
      {loadedPlaces.length !== 0 && <PlaceList items={loadedPlaces} />}
    </React.Fragment>
  );
};

export default UserPlaces;
