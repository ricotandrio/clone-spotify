import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import '../assets/index.css';

export default function Loading() {
  return (
    <div className='flex flex-row items-center pl-3 mt-2 mb-2 z-[999]'>
      <FontAwesomeIcon icon={faCircle} size='2xs' className='mr-2'fade/>
      <FontAwesomeIcon icon={faCircle} size='2xs' className='mr-2'fade/>
      <FontAwesomeIcon icon={faCircle} size='2xs' className='mr-2'fade/>
    </div>
  )
}
