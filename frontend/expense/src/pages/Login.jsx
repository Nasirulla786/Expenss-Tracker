import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userdata/userslice";

export default function Login() {
    const naviagte = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
            const email = e.target.email.value;
            const password =e.target.password.value;

            const res = await axios.post(`${serverURL}/api/user/login` , {email , password},{withCredentials:true});

          if(res){
              dispatch(setUserData(res.data));
              naviagte("/");
          }

        } catch (error) {
            dispatch(setUserData(null));
            console.log("Login error", error);

        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-white via-sky-100 to-white rounded-xl shadow-xl p-8 border border-sky-300">


        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-sky-600">
          Expense Tracker
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2 mb-8">
          Create your account to start tracking expenses
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>


          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center bg-white border border-sky-300 rounded-lg px-4 py-3 shadow-sm">
              <svg
                className="w-5 h-5 text-sky-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12l-4-4-4 4m0 0l4 4 4-4m-4-4v8"
                />
              </svg>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none"
                name="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center bg-white border border-sky-300 rounded-lg px-4 py-3 shadow-sm">
              <svg
                className="w-5 h-5 text-sky-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zM5 11h14v10H5V11z"
                />
              </svg>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none"
                name = "password"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Login  In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Create a new account?{" "}
          <Link to="/signup" className="text-sky-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
