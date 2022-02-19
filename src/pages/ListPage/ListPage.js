import React, { Component } from 'react';
import './ListPage.css';
import store from '../../store/store';

class ListPage extends Component {
    state = {
        title: '',
        movies: [],
    }
    componentDidMount() {
        console.log("params", this.props.match.params);
        const id = this.props.match.params.id;

        if (id) {
            const link = `https://acb-api.algoritmika.org/api/movies/list/${id}`
            // console.log(link);
            fetch(link)
                .then(res => res.json())
                .then(data => {
                    this.setState({movies: data.movies, title: data.title});
                    // console.log('listpage', this.state.movies)
                })
                .catch((err) => console.log(err))

                // console.log("state movies", this.state.movies);
        }  else {
            console.log(`Список не найден по id ${id}`);
        }

    }

    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        let link = item.id;
                        // console.log('id of item', link);
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