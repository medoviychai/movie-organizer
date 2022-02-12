import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../../store/store';

class Movies extends Component {
    state = { 
        movies: [],
    }
    componentDidMount() {
        const state = store.getState();
        this.setState({movies: state.movies});
        
        store.subscribe(() => {
            const state = store.getState();
            this.setState({
                movies: state.movies
            })
        }) 
    }
    

    render() { 
        // console.log("this.state", this.state.movies);
        return ( 
            <>{this.state.movies ? 
                <ul className="movies">
                    {this.state.movies.map((movie) => (
                        <li className="movies__item" key={movie.imdbID}>
                            <MovieItem {...movie} />
                            {/* {console.log(movie.Title)} */}
                        </li>
                    ))}
                </ul> : <h1>По Вашему запросу ничего не найдено</h1>
                }
            </>
        );
    }
}
 
export default Movies;