const initialState = {
   searchLine: '',
   movies: [],
   favMovies: [],
   idList: "",
}

function reducer(state = initialState, action) {
   if (action.type === 'FIND_FILM') {
      let movInf = action.payload.filmInfo;
      // console.log("Фильм", movInf)
      initialState.movies = movInf.Search
      
      // const movies = [movInf]
      // // console.log('Стадия2', movies);
      // const m2 = {state, movies};
      // // console.log("Стадия3", m2);
      // // return {...state, movies}
      // return m2;
      // console.log("films in reducer", initialState.movies);
      return initialState;
   }
   else if (action.type === 'ADD_FILM_TO_FAVORITES') {
      let favMovieName = action.payload.favFilmName; 
      let favMovieYear = action.payload.favFilmYear;
      let favMovieImdbID = action.payload.favMovieImdbID;

      // console.log("favMovie", favMovieName)
      const fav = {
         title: favMovieName, 
         year: favMovieYear,
         id: favMovieImdbID
      }
      
      let isExistInFav = initialState.favMovies.find(item => item.id === fav.id)
      // console.log(isExistInFav);
      if (isExistInFav) {
         return state
      } else {
         state.favMovies.push(fav)
      }
      // console.log("filter", isExistInFav);

      // initialState.favMovies.push(fav)

      // console.log(initialState.favMovies)
      return initialState;
      // return {...state, favMovies: arr}
   }
   else if (action.type === 'GET_LIST_ID') {
      return {
         ...state, idList: action.payload.listId
      }
   }

   return initialState;
}
// console.log("reducer", initialState)
export default reducer;