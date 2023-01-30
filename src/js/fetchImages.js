export const fetchImages = async (query, pageNr) => {
    return await fetch(
      `https://pixabay.com/api/?key=33235528-f77f5559eb18b5179aa92c19b&q=${query}&orientation=horizontal&safesearch=true&image_type=photo&per_page=42&page=${pageNr}`
    )
      .then(async response => {
        if (!response.ok) {
          if (response.status === 404) {
            return [];
          }
          throw new Error(response.status);
        }
        return await response.json();
      })
      .catch(error => {
        console.error(error);
      });
  };