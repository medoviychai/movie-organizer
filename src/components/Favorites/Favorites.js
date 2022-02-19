import React, { Component } from 'react';
import store from '../../store/store';
import './Favorites.css';
import {Link} from "react-router-dom";

class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [],
        buttonSaveClass: "favorites__save",
        linkClass: "link_hidden",
        inpDisable: false,
        listId: []
    }
    removeFilm = (idx) => {
        const clone = this.state.movies;
        let elem = clone.splice(idx, 1);
        clone.filter(film => {
            return film != elem
        })
        this.setState({movies: clone})
    }

    handleChangeInp = e => {
        this.setState({title: e.target.value})
    }

    saveList = e => {
        this.setState({
            buttonSaveClass: "favorites__save_hidden", 
            linkClass: "link_active", 
            inpDisable: true})

            this.state.movies.filter(item => {
                this.state.listId.push(item.id)
            });
    
            const data = {
                title: this.state.title,
                movies: this.state.movies
            }    
                fetch('https://acb-api.algoritmika.org/api/movies/list/', {
                  method: 'POST',
                  body: JSON.stringify(data), 
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({listId: data.id})  
                    console.log("Data", data) 
                })
                .catch(err => {
                    console.log(err);
                })
    }

    componentDidMount() {
        const state = store.getState();
        this.setState({movies: state.favMovies});

        store.subscribe(() => {
            const state = store.getState();
            this.setState({
                movies: state.favMovies
            })
        }) 
    }

    getListId = (listId) => {
        store.dispatch({
            type: 'GET_LIST_ID',
            payload: {
                listId: listId,
            }
        })
    }

    render() { 
        return (
            <div className="favorites">
                <input value={this.state.title} onChange={this.handleChangeInp} className="favorites__name" disabled={this.state.inpDisable}/>
                <ul className="favorites__list">
                    {this.state.movies.map((item, idx) => {
                        return <li key={item.id}>{item.title} ({item.year}) <button className="remove-film-button" onClick={() => this.removeFilm(idx)}>X</button></li>;
                    })}
                </ul>
                <button type="button" className={this.state.buttonSaveClass} onClick={this.saveList}>Сохранить список</button>
                <Link to={`/list/${this.state.listId}`} className={this.state.linkClass}>Перейти к списку</Link>
            </div>
        );
    }
}
 
export default Favorites;