import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import banners from "@src/assets/datas/banner.jsx";

import { UserContext } from "@src/contexts/UserContext.jsx";

import "@src/assets/global.css";

const DefaultOutlet = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  return (
    <>
      <div className="w-full text-white">
        <h1 className="pl-5 pt-5 text-2xl">Browse All</h1>
        <div className="flex w-full flex-row flex-wrap p-2">
          {banners.map((banner) => (
            <div
              key={banner.index}
              className="relative m-2 aspect-square w-[22%] cursor-pointer overflow-hidden rounded-lg"
              style={{ backgroundColor: banner.color }}
              onClick={() => {
                if (login == "true") {
                  navigate(`/search/${encodeURIComponent(banner.name)}`);
                }
              }}
            >
              <h1 className="line-clamp-1 pl-5 pt-5 text-xl">{banner.name}</h1>
              <img
                src={banner.images}
                className="relative left-20 top-10 w-1/2 rotate-12 shadow-2xl shadow-black sm:left-32 sm:top-16"
                alt={banner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DefaultOutlet;
