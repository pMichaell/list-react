import Image from "react-bootstrap/Image";
import type { User } from "../types/Types";

const UserAvatar = ({
  avatar,
  first_name,
  last_name,
}: Pick<User, "avatar" | "first_name" | "last_name">) => {
  return avatar ? (
    <Image
      src={avatar}
      fluid
      roundedCircle
      className="border border-white border-2 rounded-circle"
    />
  ) : (
    <div
      style={{ height: "54px", aspectRatio: 1 }}
      className="border border-2 rounded-circle border-white fs-5 d-flex justify-content-center align-items-center"
    >
      {first_name.charAt(0)}
      {last_name.charAt(0)}
    </div>
  );
};

export default UserAvatar;
