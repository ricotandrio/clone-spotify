import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import "@src/assets/global.css";

const Loading = () => {
  return (
    <div className="z-[999] mb-2 mt-2 flex flex-row items-center pl-3">
      <FontAwesomeIcon icon={faCircle} size="2xs" className="mr-2" fade />
      <FontAwesomeIcon icon={faCircle} size="2xs" className="mr-2" fade />
      <FontAwesomeIcon icon={faCircle} size="2xs" className="mr-2" fade />
    </div>
  );
}

export default Loading;