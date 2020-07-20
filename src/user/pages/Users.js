import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import { API_ENDPOINT } from "../../shared/util/constant";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { error, isLoading, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    console.log(error, isLoading);
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${API_ENDPOINT}/user`);
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      {!error && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
