import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { signOut } from "firebase/auth";
import { auth } from "@src/configs/firebase";

import "@src/assets/global.css";

UserOption.propTypes = {
  _setProfileVisible: PropTypes.func.isRequired,
};

export default function UserOption({ _setProfileVisible }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    return signOut(auth)
      .then(() => {
        console.log("Signed Out");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Sign Out Error", error);
      });
  };

  return (
    <>
      <div className="absolute right-5 top-20 z-30 w-1/5 bg-black">
        <ul className="p-1 font-scbk text-white">
          <li className="cursor-not-allowed bg-black-3 p-2 opacity-80">
            Account
          </li>
          <li
            className="cursor-pointer bg-black-3 p-2 opacity-80 hover:bg-[#3E3E3E] hover:opacity-100"
            onClick={() => {
              _setProfileVisible(false);
              navigate("/profile");
            }}
          >
            Profile
          </li>
          <li className="cursor-not-allowed bg-black-3 p-2 opacity-80">
            Premium
          </li>
          <li className="cursor-not-allowed bg-black-3 p-2 opacity-80">
            Support
          </li>
          <li className="cursor-not-allowed bg-black-3 p-2 opacity-80">
            Download
          </li>
          <li className="cursor-not-allowed bg-black-3 p-2 opacity-80">
            Settings
          </li>
          <li
            className="cursor-pointer bg-black-3 p-2 opacity-80 hover:bg-[#3E3E3E] hover:opacity-100"
            onClick={handleSignOut}
          >
            Log out
          </li>
        </ul>
      </div>
    </>
  );
}
