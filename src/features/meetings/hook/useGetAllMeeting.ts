import { useQuery } from "@tanstack/react-query";
import getAllMeeting from "../api/getAllMeeting";


export default function useGetAllMeeting() {
    return useQuery({
        queryKey: ["meeting"],
        queryFn: getAllMeeting,
    });
}