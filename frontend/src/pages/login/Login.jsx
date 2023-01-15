import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AppContext);

  // useEffect(() => {
  //   console.log(username);
  // }, [username]);

  // useEffect(() => {
  //   console.log(password);
  // }, [password]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        username,
        password,
      };
      const response = await axios.post("/api/users/login", formData);

      if (response.data) {
        setUser({
          username: response.data.username,
          token: response.data.token,
        });
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="h-screen w-screen flex flex-col items-center justify-center"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-black mb-2"
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-black"
      ></input>
      <button type="submit">Submit yo shit</button>
    </form>
  );
}
export default Login;
