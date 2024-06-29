import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BFF_URL = "http://localhost:8080";

export const CallMessage = () => {
  const [name, setName] = useState("");
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["message", name],
    queryFn: () =>
      fetch(`${BFF_URL}/api/p/message?name=${name}`, {
        method: "GET",
        headers: new Headers(),
      }).then((res) => res.json()),
  });
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <input
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onBlur={() => refetch()}
        value={name}
      />
      <p>message: {data?.message}</p>
    </div>
  );
};
