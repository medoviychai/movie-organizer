import React, { Component } from 'react';
import './MovieItem.css';
import store from '../../store/store';

class MovieItem extends Component {


    addToList = e => {
        store.dispatch({
            type: 'ADD_FILM_TO_FAVORITES',
            payload: {
                favFilmName: this.props.Title,
                favFilmYear: this.props.Year,
                favMovieImdbID: this.props.imdbID
            }
        })
    }

    render() {
        const { Title, Year, Poster } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={this.addToList}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;