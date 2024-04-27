import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { QueryContext } from "@src/contexts/QueryContext.jsx";
import { UserContext } from "@src/contexts/UserContext.jsx";

import Loading from "@src/components/Loading.jsx";

import { SearchResultCard } from "@src/components/Card";
import { SpotifyService } from "@src/apis/services/spotify.service";

const QueryResultOutlet = () => {
  const { query } = useParams();
  const [tracksdata, setTracks] = useState();
  const [isLoading, setLoading] = useState(true);
  const { queryDebounce, setQuery } = useContext(QueryContext);
  const { token } = useContext(UserContext);

  // this use state must be in format {ref: useRef(), name: song_title, _setPlayed: function to setplayed to false}
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // get search results
  const getSearch = useCallback(async () => {
    try {
      setLoading(true);

      const response = await SpotifyService.search(token, queryDebounce);

      setTracks(response.tracks.items);
      setCurrentlyPlaying(null);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [queryDebounce, token]);

  // update song query when user searches via param
  useEffect(() => {
    setQuery(query);
  });

  useEffect(() => {
    if (token) getSearch();

    return () => {
      setTracks([]);
    };
  }, [queryDebounce, token, getSearch]);

  return (
    <>
      <div className="w-full text-white">
        <div className="w-full">
          <div>
            <h1 className="pl-3 pt-3 text-xl">Result for query {query}</h1>
          </div>
          {isLoading == true ? (
            <Loading />
          ) : (
            <div>
              {tracksdata.map((track) => (
                <SearchResultCard
                  key={track?.id}
                  track={track}
                  currentlyPlaying={currentlyPlaying}
                  setCurrentlyPlaying={setCurrentlyPlaying}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QueryResultOutlet;
