import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

export const ButtonStylePrev = () => {
  const navigate = useNavigate();
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      className='p-3 rounded-full cursor-pointer'
      onClick={() => {
        if(window.history.state && window.history.state.idx > 0){
          navigate(-1)
        }
      }}
      style={{
        opacity: window.history.state && window.history.state.idx > 0 ? 1 : 0.8,
        cursor: window.history.state && window.history.state.idx > 0 ? 'pointer' : 'not-allowed'
      }}
    />

  )
}

export const ButtonStyleNext = () => {
  const navigate = useNavigate();
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      className='p-3 rounded-full cursor-pointer'
      onClick={() => navigate(1) }
      style={{
        opacity: window.history.state && window.history.state.idx - window.history.length == -2 ? 0.8 : 1,
        cursor: window.history.state && window.history.state.idx - window.history.length == -2 ? 'not-allowed' : 'pointer'
      }}
    />
  )
}
