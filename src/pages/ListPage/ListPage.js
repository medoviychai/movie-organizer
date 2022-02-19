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
        console.log("list page id", id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
        // const state = store.getState();
        // this.setState({movies: state.favMovies});

        // store.subscribe(() => {
        //     const state = store.getState();
        //     this.setState({
        //         movies: state.favMovies
        //     })
        // }) 

        // let ids = '535c2062-c93d-4e37-9883-e845fd1c1e7f';

        if (id) {
            const link = `https://acb-api.algoritmika.org/api/movies/list/${id}`
            console.log(link);
            fetch(link)
                .then(res => res.json())
                .then(data => {
                    this.setState({movies: data.movies, title: data.title});
                    console.log('listpage', data)
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