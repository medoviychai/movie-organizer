const initialState = {
   searchLine: '',
   movies: [],
   favMovies: [],
   idList: "",
}

function reducer(state = initialState, action) {
   if (action.type === 'FIND_FILM') {
      let movInf = action.payload.filmInfo;
      initialState.movies = movInf.Search

      return initialState;
   }
   else if (action.type === 'ADD_FILM_TO_FAVORITES') {
      let favMovieName = action.payload.favFilmName; 
      let favMovieYear = action.payload.favFilmYear;
      let favMovieImdbID = action.payload.favMovieImdbID;

      const fav = {
         title: favMovieName, 
         year: favMovieYear,
         id: favMovieImdbID
      }
      
      let isExistInFav = initialState.favMovies.find(item => item.id === fav.id)
      if (isExistInFav) {
         return state
      } else {
         state.favMovies.push(fav)
      }
      return initialState;
   }
   else if (action.type === 'GET_LIST_ID') {
      return {
         ...state, idList: action.payload.listId
      }
   }

   return initialState;
}
export default reducer;