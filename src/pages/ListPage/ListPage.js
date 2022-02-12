import React, { Component } from 'react';
import './ListPage.css';
import store from '../../store/store';

class ListPage extends Component {
    state = {
        movies: []
    }
    componentDidMount() {
        const id = this.props.match.params;
        console.log(id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
        const state = store.getState();
        this.setState({movies: state.favMovies});

        store.subscribe(() => {
            const state = store.getState();
            this.setState({
                movies: state.favMovies
            })
        }) 
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        let link = item.id;
                        let filmLink = `https://www.imdb.com/title/${link}/`
                        return (
                            <li key={item.imdbID}>
                                <a href={filmLink} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;