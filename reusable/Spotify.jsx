export async function FetchSpotify(authOptions, link) {
  return fetch(link, authOptions)
    .then((response) => {
      if(!response.ok){
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch((error) => {
      setTimeout(() => { window.location.reload() }, 5000);
      console.log(`Error => ${error}`);
      return null;
  });
}
