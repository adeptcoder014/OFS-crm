import { useEffect, useState } from "react";

export default function file() {
  const [state, setState] = useState("Hi");
  useEffect(() => {
    setTimeout(() => {
      setState("Bye");
    }, 5000);
  }, []);
  return <h1>{state}</h1>;
}
