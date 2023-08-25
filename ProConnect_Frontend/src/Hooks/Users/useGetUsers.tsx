import { useState, useEffect } from "react";
import { get } from "../../Services/Requests";
import { User } from "../../Models/User";

const URI = "test/getUsers";

export function useGetUsers()
{
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() =>
  {
    get(URI)
      .then((response) =>
      {
        setUsers(response.data);
      })
      .catch((error) =>
      {
        alert(error.message);
      });
  });

  return users;
}
