import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import useUsers from "../hooks/useUsers";
import UserElement from "./UserElement";

const checkIsUserActive = (activeUsersIDs: number[], userID: number) => {
  const findResult = activeUsersIDs.find(
    (activeUserID) => activeUserID === userID
  );
  return findResult !== undefined;
};

const UsersList = () => {
  const [activeUsersIDs, setActiveUsersIDs] = useState<number[]>([]);
  const { users, loadUsers, hasMore, loading, error } = useUsers();

  useEffect(() => {
    if (activeUsersIDs.length !== 0) {
      console.log(activeUsersIDs);
    }
  }, [activeUsersIDs]);

  const onUserClick = (clickedUserID: number) => {
    if (checkIsUserActive(activeUsersIDs, clickedUserID)) {
      setActiveUsersIDs(
        activeUsersIDs.filter((activeUserID) => activeUserID !== clickedUserID)
      );
      return;
    }

    setActiveUsersIDs([...activeUsersIDs, clickedUserID]);
  };

  return (
    <>
      {error && users.length === 0 && (
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        </Alert>
      )}
      {loading && !error ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <ListGroup className="h-100 w-100" as="ul" variant="flush">
          <InfiniteScroll
            dataLength={users.length}
            next={loadUsers}
            hasMore={hasMore}
            loader={<></>}
          >
            {users.map((user) => (
              <UserElement
                key={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                avatar={user.avatar}
                onClick={() => onUserClick(user.id)}
                isActive={checkIsUserActive(activeUsersIDs, user.id)}
              />
            ))}
          </InfiniteScroll>
        </ListGroup>
      )}
    </>
  );
};

export default UsersList;
