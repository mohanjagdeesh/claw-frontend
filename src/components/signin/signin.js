import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../client";
import ClipLoader from "react-spinners/ClipLoader";

const Signin = () => {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSigninData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = signinData;
    try {
      // Sign in with Supabase
      const { data: userData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        const username = userData.user.email;
        localStorage.setItem("username", username);
        alert("Signed in successfully");
        navigate("/usertodos");
      }
      setLoading(false);
      setSigninData({ email: "", password: "" });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className=" bg-color-1 min-h-screen">
      <div className="container">
        <div className=" flex items-center justify-center h-screen  w-full lg:w-1/2 mx-auto">
          <div>
            <h1 className=" text-black font-medium text-[2.5rem] leading-none mb-3">
              WELCOME BACK
            </h1>
            <p className=" text-color-2 text-[1.2rem] font-normal leading-none">
              Welcome back! Please enter your details.
            </p>
            <form onSubmit={handleLogin} className=" space-y-6 mt-8 mb-4">
              <div className=" flex flex-col">
                <label className=" text-black font-semibold text-[1rem] mb-2">
                  Email
                </label>
                <input
                  value={signinData.email}
                  name="email"
                  onChange={handleChange}
                  className=" border-2 border-color-3 rounded-xl bg-color-1 p-2 text-color-2 placeholder:text-color-2 outline-none"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className=" flex flex-col">
                <label className=" text-black font-semibold text-[1rem] mb-2">
                  Password
                </label>
                <input
                  value={signinData.password}
                  name="password"
                  onChange={handleChange}
                  className=" border-2 border-color-3 rounded-xl bg-color-1 p-2 text-color-2 placeholder:text-color-2 outline-none"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <button
                className=" bg-color-4 border-none rounded-xl text-white text-[1rem] font-normal w-full py-2"
                type="submit"
              >
                Sign in
              </button>
            </form>
            <p className=" text-color-2 text-[0.8rem] font-semibold text-center leading-none">
              Don’t have an account?{" "}
              <span className=" text-color-4">
                <Link to="/signup">Sign up fo free!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      {loading && (
        <div className=" bg-black opacity-80 absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center">
          <ClipLoader color={"#F8F8F8"} loading={loading} size={150} />
          <p className="text-color-1 text-[1.5rem]">
            Signing in please wait.....
          </p>
        </div>
      )}
    </section>
  );
};

export default Signin;
