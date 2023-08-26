import { useState, useEffect, useContext } from 'react';
import SongSection from '../sub_components/SongSection.jsx';
import PropTypes from 'prop-types';

import Footer from './Footer.jsx';

import '../index.css';
import { FetchSpotify } from '../../reusable/Spotify.jsx';
import { LoginContext } from '../context/LoginContext.jsx';
import Loading from '../../reusable/Loading.jsx';

Content.propTypes = {
  _songdata: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      contents: PropTypes.array.isRequired
    })
  ).isRequired
}

export default function Content({_songdata: songDatas}) {
  const [countWidth, setCountWidth] = useState(screen.width >= '640' ? 4 : 3);

  useEffect(() => {
    const updateWidth = () => {
      screen.width >= '640' ? setCountWidth(4) : setCountWidth(3);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const [isLoading, setLoading] = useState(true);
  const [featuredPlaylists, setFeaturedPlaylists] = useState();
  const { token } = useContext(LoginContext);

  useEffect(() => {
    FetchSpotify(
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }, `https://api.spotify.com/v1/browse/featured-playlists`
    ).then((response) => {
      // console.log(response);
      if(response != null){
        setFeaturedPlaylists(response);
        setLoading(false);
      }
    })
  }, []);

  return (
    <>
      <div className='relative w-full h-full'>
        <div className='relative bg-gradient-to-b from-black-2 to-black-1 w-full sm:w-3/4 ml-[3rem] sm:ml-[20rem] text-white font-sbbs'>
          {
            isLoading == true ? (
              <div className='w-full p-10 pb-16 flex items-center justify-center'>
                <Loading />
              </div>
            ) : (
              <>
                <SongSection data={featuredPlaylists.playlists.items} playlists_name={featuredPlaylists.message} show={ countWidth } />
                <SongSection data={featuredPlaylists.playlists.items.slice(5, 10)} playlists_name='Your Playlist' show={ countWidth } />
                <Footer/>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}
