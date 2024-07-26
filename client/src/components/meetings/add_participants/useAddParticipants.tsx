import { useState } from "react";
import { IUser } from "../../../types/users.interface";

export const useAddParticipants = (data: IUser[]) => {
  const [allUsers] = useState<IUser[]>(data);
  const [users, setUsers] = useState<IUser[]>(data);
  const [receivers, setReceivers] = useState<IUser[]>([]);

  const onClickHandler = (receiver: IUser, checked: boolean) => {
    if (checked) setReceivers([...receivers, receiver]);
    else setReceivers(receivers.filter((member) => member._id !== receiver._id));
  };

  const onFilterHandler = (value: string) => {
    if (value === "") return setUsers(allUsers);
    setUsers(allUsers.filter((user) => user.full_name.toLowerCase().includes(value.toLowerCase())));
  };

  return {
    users,
    onClickHandler,
    onFilterHandler,
    receivers,
  };
};
