import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import { API_ENDPOINT } from "../../shared/util/constant";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState();
  // const [error, setError] = useState(null);

  const { error, isLoading, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    // const sendRequest = async () => {
    //   try {
    //     const response = await fetch(`${API_ENDPOINT}/user`);
    //     const responseData = await response.json();
    //     if (!response.ok) {
    //       throw new Error(responseData.message);
    //     }
    //     setLoadedUsers(responseData.users);
    //     console.log(responseData);
    //     setIsLoading(false);
    //   } catch (err) {
    //     setIsLoading(false);
    //     setError(err.message);
    //   }
    // };
    console.log(error, isLoading,);
    const send = async () => {
      const response = await sendRequest(`${API_ENDPOINT}/user`);
      setLoadedUsers(response.users);
    };
    send();

  }, []);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      {!error && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
