import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import spotify_black from "@src/assets/images/Spotify_Logo_CMYK_Black.png";

import Loading from "@src/components/Loading.jsx";

import { UserContext } from "@src/contexts/UserContext.jsx";

import { FirebaseService } from "@src/apis/services/firebase.service";
import {
  registerUserSchema,
  validateExtractor,
} from "@src/apis/validations/user.validate";

const RegisterPage = () => {
  const { authUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);

  // form
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    date_of_birth: {
      day: "",
      month: "default",
      year: "",
    },
  });

  // form errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    date_of_birth: "",
    form: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formToObject = {
        email: form.email,
        password: form.password,
        name: form.name,
        date_of_birth: new Date(
          form.date_of_birth.year,
          form.date_of_birth.month - 1,
          form.date_of_birth.day,
        ),
      };

      const zodValidate = validateExtractor(
        registerUserSchema.safeParse(formToObject),
      );

      setErrors(zodValidate);

      if (zodValidate === true){
        // console.log(formToObject);

        // eslint-disable-next-line no-unused-vars
        const response = await FirebaseService.signUp(formToObject);
        // console.log("sd");
      }

    } catch (e) {
      console.log(`Error: ${e.message}`);
      setErrors({ ...errors, form: e.message });
    } finally {
      setLoading(false);
    }
  };

  if (authUser)
    return (
      <>
        <div className="min-h-[100vh] w-full bg-white pb-20 text-black xl:h-full">
          <Link
            to="/"
            className="flex items-center justify-center border-black p-8"
          >
            <img src={spotify_black} alt="spotify logo" className="w-32" />
          </Link>
          <div className="flex flex-col items-center justify-center border-black p-8 text-black">
            <h1 className="font-scb text-3xl">Already Login.</h1>
            <Link
              to="/"
              className="mt-6 flex w-[15%] items-center justify-center rounded-full bg-white p-2 text-black hover:bg-black hover:text-white"
            >
              HOME
            </Link>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="w-full bg-white pb-20 text-black xl:h-full">
        <Link
          to="/"
          className="flex items-center justify-center border-black p-8"
        >
          <img src={spotify_black} alt="spotify logo" className="w-32" />
        </Link>
        <div className="flex items-center justify-center border-black p-8 text-black">
          <h1 className="font-scb text-3xl">
            Sign up for free to start listening.
          </h1>
        </div>

        <div className="flex w-full justify-center">
          <form
            action=""
            autoComplete="off"
            className="w-1/2 sm:w-1/3"
            onSubmit={handleSignUp}
          >
            <div className="m-2 mt-8 flex flex-col items-start">
              <label htmlFor="email" className="mb-2">
                {`What's your email?`}
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your mail."
                name="email"
                className="w-full rounded-md border border-gray-1 p-3 font-scbk outline-black"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <div className="mt-3 flex flex-row gap-2 font-scbk text-xs text-red-500">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red-500"
                  />
                  <h1>{errors.email}</h1>
                </div>
              )}
            </div>

            <div className="relative m-2 mt-8 flex flex-col items-start">
              <label htmlFor="password" className="mb-2">
                Create a password
              </label>
              <div className="flex w-full flex-row">
                <input
                  type={isVisible ? "text" : "password"}
                  id="password"
                  placeholder="Create a password."
                  className="w-full rounded-md border border-gray-1 p-3 font-scbk outline-black"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <div className="absolute right-0 z-20 flex cursor-pointer items-center p-3 opacity-80 hover:scale-105 hover:opacity-100">
                  {isVisible ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      size="xl"
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      size="xl"
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              {errors.password && (
                <div className="mt-3 flex flex-row gap-2 font-scbk text-xs text-red-500">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red-500"
                  />
                  <h1>{errors.password}</h1>
                </div>
              )}
            </div>

            <div className="m-2 mt-8 flex flex-col items-start">
              <label htmlFor="name" className="mb-2">
                What should we call you?
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter a profile name."
                name="name"
                className="w-full rounded-md border border-gray-1 p-3 font-scbk outline-black"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <div className="mt-3 flex flex-row gap-2 font-scbk text-xs text-red-500">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red-500"
                  />
                  <h1>{errors.name}</h1>
                </div>
              )}
              <h3 className="mb-6 mt-3 font-scbk text-[0.8rem] opacity-80">
                This appear on your profile.
              </h3>
            </div>

            <div className="flex flex-col p-2">
              <h1 className="">{`What's your date of birth?`}</h1>
              {errors.date_of_birth && (
                <div className="mt-3 flex flex-row gap-2 font-scbk text-xs text-red-500">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red-500"
                  />
                  <h1>{errors.date_of_birth}</h1>
                </div>
              )}
              <div className="flex w-full flex-row">
                <div className="flex w-1/3 flex-col p-2">
                  <label htmlFor="ddob">Day</label>
                  <input
                    type="number"
                    id="ddob"
                    placeholder="DD"
                    name="day"
                    className="w-full appearance-none rounded-md border-[0.1em] border-gray-1 p-3"
                    min="1"
                    max="31"
                    value={form.date_of_birth.day}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date_of_birth: {
                          ...form.date_of_birth,
                          day: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex w-2/3 flex-col p-2">
                  <label htmlFor="mob">Month</label>

                  <select
                    type="text"
                    id="mob"
                    placeholder="Month"
                    name="month"
                    className="h-full w-full rounded-md border-[0.1em] border-gray-1 p-2"
                    style={{
                      opacity: form.date_of_birth.month == "default" ? 0.5 : 1,
                    }}
                    value={form.date_of_birth.month}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date_of_birth: {
                          ...form.date_of_birth,
                          month: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="default" disabled>
                      Month
                    </option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>

                <div className="flex w-1/3 flex-col p-2">
                  <label htmlFor="yob">Year</label>
                  <input
                    type="number"
                    id="yob"
                    placeholder="YYYY"
                    name="year"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full rounded-md border-[0.1em] border-gray-1 p-3"
                    value={form.date_of_birth.year}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date_of_birth: {
                          ...form.date_of_birth,
                          year: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8">
              <div className="mb-5 text-center font-scl text-[0.6rem]">
                <h6 className="mb-3">
                  {`By clicking on sign-up, you agree to Spotify's`}
                  <a href="#" className="text-green underline">
                    Terms and Conditions of Use.
                  </a>
                </h6>
                <h6>
                  By clicking on sign-up, you agree to the{" "}
                  <a href="#" className="text-green underline">
                    Spotify Privacy Policy.
                  </a>
                </h6>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full rounded-full bg-green p-4 pl-6 pr-6 hover:scale-105 hover:opacity-90 sm:w-1/3"
                style={{
                  cursor: isLoading == false ? "cursor" : "not-allowed",
                }}
              >
                {isLoading == false ? "Sign Up" : <Loading />}
              </button>
              <div className="mt-8 text-center font-scbk">
                Have an account ?
                <Link
                  to="/login"
                  className="font-scbk text-green underline underline-offset-2 hover:opacity-70"
                >
                  {" "}
                  Login.
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
