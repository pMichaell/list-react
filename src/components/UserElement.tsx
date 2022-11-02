import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";

import { User } from "../types/Types";

import UserAvatar from "./UserAvatar";

const UserElement = ({
  first_name,
  last_name,
  avatar,
  email,
  isActive,
  onClick,
}: Pick<User, "first_name" | "last_name" | "avatar" | "email"> & {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <ListGroup.Item action active={isActive} onClick={onClick}>
      <Stack direction="horizontal" gap={2} className="align-items-end">
        <UserAvatar
          first_name={first_name}
          last_name={last_name}
          avatar={avatar}
        />
        <Stack className="justify-content-end">
          <p className='m-0'>
            {first_name} {last_name}
          </p>
          <small>{email}</small>
        </Stack>
      </Stack>
    </ListGroup.Item>
  );
};

export default UserElement;
