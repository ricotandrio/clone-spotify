import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { QueryContext } from '@src/contexts/QueryContext.jsx';
import { UserContext } from '@src/contexts/UserContext.jsx';

import Loading from '@src/components/Loading.jsx';

import { SearchResultCard } from '@src/components/Card';
import { SpotifyService } from '@src/apis/services/spotify.service';

const QueryResultOutlet = () => {
  const { query } = useParams();
  const [tracksdata, setTracks] = useState();
  const [isLoading, setLoading] = useState(true);
  const { setQuery } = useContext(QueryContext);
  const { token } = useContext(UserContext);

  // this use state must be in format {ref: useRef(), name: song_title, _setPlayed: function to setplayed to false}
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // update song query when user searches via param
  useEffect(() => {
    setQuery(query);
  });

  useEffect(() => {

    const getSearch = async () => {
      setLoading(true);
      const response = await SpotifyService.search(token, query);

      if(response != null){
        setTracks(response.tracks.items);
        setCurrentlyPlaying(null);
        setLoading(false);
      }
    }

    if(token) getSearch(token, query);

  }, [query, token]);

  return (
    <>
      <div className='w-full text-white'>
        <div className='w-full'>
          <div>
            <h1 className='text-xl pl-3 pt-3'>Result for query { query }</h1>
          </div>
            {
              isLoading == true ? (
                <Loading />
              ) : (
                <div>{
                  tracksdata.map((track) => (
                    <SearchResultCard key={track?.id} track={track} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying}/>
                  ))
                }</div>
              )
            }
        </div>
      </div>
    </>
  )
}

export default QueryResultOutlet;