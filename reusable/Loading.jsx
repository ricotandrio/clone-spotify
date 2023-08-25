import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import '../src/index.css';

export default function Loading() {
  return (
    <div className='flex flex-row items-center pl-3 mt-5'>
      <FontAwesomeIcon icon={faCircle} size='2xs' className='mr-2'fade/>
      <FontAwesomeIcon icon={faCircle} size='2xs' className='mr-2'fade/>
      <FontAwesomeIcon icon={faCircle} size='2xs' className='mr-2'fade/>
    </div>
  )
}
