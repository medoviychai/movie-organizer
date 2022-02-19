import React, { Component } from 'react';
import './ListPage.css';

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
            fetch(link)
                .then(res => res.json())
                .then(data => {
                    this.setState({movies: data.movies, title: data.title});
                })
                .catch((err) => console.log(err))
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