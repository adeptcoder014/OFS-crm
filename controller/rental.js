import { useQuery } from "@tanstack/react-query";
import { getRent } from "../api/rental";
//=======================================
export const useRentController = () => {// Controller for all the Rental--server-side-state Managment
  const rentQuery = useQuery({
    queryKey: ["rent"],
    queryFn: getRent,
  });

  return { rentQuery };
};
