import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getFilteredUsers } from "../api/user";

export const useController = (props) => {
  //------------------ QUERY -------------------------------------
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => getFilteredUsers({ filter: props.filter }),
  });

  const queryAll = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  return { query, queryAll };
};
