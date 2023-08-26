import '../index.css';
import PropTypes from 'prop-types';

PopupPlay.propTypes = {
  _song: PropTypes.string,
}

export default function PopupPlay({ _song }) {
  console.log(_song);

  return (
    <>
      <div className='fixed bottom-0 z-[999] w-full h-[14%] bg-black'>
        <div>PopupPlay</div>
        <audio src={_song}></audio>
      </div>
    </>
  )
}
