import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //if there is no user logged in, then call api
    if (!user) {
      // console.log("getting data");
      axios.get("/profile").then(({ data }) => {
        // console.log(data);
        setUser(data);
        //now user is logged in
      });
    }
  }, []);
  console.log(user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* <button
        onClick={() => {
          console.log(user);
        }}
      >
        Button
      </button> */}
      {children}
    </UserContext.Provider>
  );
}
