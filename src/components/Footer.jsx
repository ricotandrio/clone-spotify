import Twitter from "@src/assets/images/uil_twitter.png";
import Facebook from "@src/assets/images/ic_twotone-facebook.png";
import Instagram from "@src/assets/images/bi_instagram.png";

import "@src/assets/global.css";

const Footer = () => {
  return (
    <>
      <footer className="mt-20 p-2 pb-32">
        <div className="flex flex-row items-start justify-between p-2">
          <div className="p-2">
            <h1 className="mb-2">Company</h1>
            <ul className="font-scbk opacity-80">
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">About</a>
              </li>
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">Jobs</a>
              </li>
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">For the Record</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-2">Communities</h1>
            <ul className="font-scbk opacity-80">
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">For Artists</a>
              </li>
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">Developer</a>
              </li>
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">Advertising</a>
              </li>
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">Investors</a>
              </li>
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">Vendors</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-2">Useful links</h1>
            <ul className="font-scbk opacity-80">
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">Supports</a>
              </li>
              <li className="mb-2 duration-300 ease-in-out hover:underline">
                <a href="/error">Free Mobile App</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-3 hover:bg-gray-1">
              <a
                href="https://www.instagram.com/spotify/"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <img
                  src={Instagram}
                  alt="instagram"
                  className="h-full w-full"
                />
              </a>
            </div>
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-3 hover:bg-gray-1">
              <a
                href="https://twitter.com/spotify"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <img src={Twitter} alt="twitter" className="h-full w-full" />
              </a>
            </div>
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-3 hover:bg-gray-1">
              <a
                href="https://www.facebook.com/Spotify"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <img src={Facebook} alt="facebook" className="h-full w-full" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center p-4">
            <div className="w-full border-b border-gray-1"></div>
          </div>
          <h1 className="ml-4 mt-5 font-scbk opacity-80">© 2023 Spotify AB</h1>
        </div>
      </footer>
    </>
  );
};

export default Footer;
