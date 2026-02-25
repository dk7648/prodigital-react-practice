// 요청 URL: http://jsonplaceholder.typicode.com/users

import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default function UserApp() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <>
      <h1>Users</h1>
      <ListGroup>
        {user.length > 0 && user.map((user) => <ListGroup.Item key={user.id}>{user.name}</ListGroup.Item>)}
      </ListGroup>
    </>
  );
}
