import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState()
    const [password,setpassword] = useState()

    function handleInputChange(event,type){
        type === "username" ? setusername(event.target.value) : setpassword(event.target.value)

    }

    async function handleLogin(){
      const res = await loginUser(username,password);
      res ? navigate("/Dashboard") : window.alert("Incorrect Username or Password");
    }


    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
        <div className="p-6 bg-white shadow-md rounded-lg w-80">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <input
            onChange={(event) => handleInputChange(event, "username")}
            placeholder="Username"
            type="text"
            value={username}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />
          <input
            onChange={(event) => handleInputChange(event, "password")}
            placeholder="Password"
            type="password"
            value={password}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  };

export default Login;