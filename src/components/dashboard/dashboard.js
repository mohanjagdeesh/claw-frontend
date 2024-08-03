import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <section className=" bg-color-1 min-h-screen w-full flex flex-col items-center justify-center">
      <div>
        <h1 className=" text-black font-medium text-[2.5rem] leading-none">
          Hi! There Welcome to Todo App,create your todos to manage your daily
          activities
        </h1>
      </div>
      <div className="flex gap-10 mt-10">
        <button
          onClick={() => navigate("/signin")}
          className=" bg-color-4 border-none rounded-xl text-white text-[1rem] font-normal w-fit py-2 px-6"
        >
          Signin
        </button>
        <button
          onClick={() => navigate("/signup")}
          className=" bg-color-4 border-none rounded-xl text-white text-[1rem] font-normal w-fit py-2 px-6"
        >
          Signup
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
