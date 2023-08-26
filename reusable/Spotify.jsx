export async function FetchSpotify(authOptions, link) {
  return fetch(link, authOptions)
    .then((response) => {
      // console.log('res', response);
      if(!response.ok){
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(`Error => ${error}`);
      return null;
  });
}
