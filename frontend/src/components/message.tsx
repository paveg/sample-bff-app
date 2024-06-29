import { useQuery } from "@tanstack/react-query";

const BFF_URL = "http://localhost:8080"

export const Message = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["message"],
    queryFn: () =>
      fetch(`${BFF_URL}/api/p/message`, {
        method: "GET",
        headers: new Headers(),
      }).then((res) => res.json()),
  });
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <p>message: {data?.message}</p>
    </div>
  );
};
