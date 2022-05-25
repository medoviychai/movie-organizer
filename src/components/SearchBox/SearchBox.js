import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../store/store';

class SearchBox extends Component {
    state = {
        searchLine: '',
        filmInfo: '',
    }
    getFilms = (filmName) => {
        let link = `http://www.omdbapi.com/?&apikey=fcd2505c&s=${filmName}`;
        fetch(link)
           .then((res) => res.json())
           .then((data) => {
              this.setState({filmInfo: data})
           })
           .catch((err) => console.log(err))
    }
    
    componentDidMount() {
        const state = store.getState();
        this.setState({searchLine: state.searchLine});
    }
    componentDidUpdate() {
        this.getFilms(this.state.searchLine)
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });        
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
    }

    findFilm = () => {
        store.dispatch({
            type: 'FIND_FILM',
            payload: {filmInfo: this.state.filmInfo}
        })
    }
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Taxi"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={() => this.findFilm()}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBox;
