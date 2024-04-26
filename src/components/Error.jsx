import { Link } from "react-router-dom";

import "@src/assets/global.css";

const Error = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="relative flex h-3/4 w-1/2 flex-col items-center justify-normal rounded-xl bg-white p-8 text-center text-black">
          <h1 className="text-3xl">ERROR</h1>
          <h3 className="mt-2 text-gray-1">
            **This feature is currently unavailable**
          </h3>
          <p className="mt-5 font-scl">
            {`Error: You may have navigated to this website through random links or paths, or you may not have logged into the app yet`}
          </p>
          <Link
            to="/"
            className="absolute bottom-5 mt-6 w-1/2 rounded-full bg-black p-2 text-white hover:bg-white hover:text-black"
          >
            BACK
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
