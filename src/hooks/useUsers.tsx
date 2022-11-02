import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { User } from "../types/Types";
import { usersPath } from "../utils/paths";

const compareFn = (a: User, b: User) => {
  const nameA = a.last_name.toUpperCase();
  const nameB = b.last_name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const getUserFullName = (user: User) => {
  return user.first_name.concat(user.last_name).toLowerCase();
};

const prepareSearchParams = (searchParams: URLSearchParams) => {
  const clearedSearchParams = searchParams
    .get("user")
    ?.replace(/\s/g, "")
    .toLowerCase();
  return clearedSearchParams ? clearedSearchParams : null;
};

const filterUsers = (users: User[], searchParams: URLSearchParams) => {
  return users.filter((user) => {
    const userFullName = getUserFullName(user);
    const clearedSearchParams = prepareSearchParams(searchParams);
    if (clearedSearchParams) {
      return userFullName.includes(clearedSearchParams);
    }
    return true;
  });
};

const useUsers = () => {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState<undefined | boolean>();
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(usersPath);
        if(!response.ok) {
          throw new Error();
        }
        const data: User[] = await response.json();
        data.sort(compareFn);
        setFetchedUsers(data);
        setCurrentUsers(data.slice(0, 30));
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    if (!searchParams.get("user")) {
      setCurrentUsers(fetchedUsers.slice(0, 30));
      return;
    }

    setCurrentUsers(filterUsers(fetchedUsers, searchParams));
  }, [searchParams]);

  const loadUsers = () => {
    const newUsers = fetchedUsers.slice(0, currentUsers.length + 30);
    if (newUsers.length === fetchedUsers.length) {
      setHasMore(false);
    }
    setCurrentUsers(newUsers);
  };

  return { users: currentUsers, loadUsers, hasMore, loading, error };
};

export default useUsers;
