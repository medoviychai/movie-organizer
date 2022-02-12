import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../store/store';

class SearchBox extends Component {
    state = {
        searchLine: '',
        filmInfo: '',
    }
    getFilms = (filmName) => {
        // console.log(filmName)
        let link = `http://www.omdbapi.com/?&apikey=fcd2505c&s=${filmName}`;
        // console.log('link',link);
        fetch(link)
           .then((res) => res.json())
           .then((data) => {
            //   console.log(data);
              this.setState({filmInfo: data})
           })
           .catch((err) => console.log(err))
    }
    
    componentDidMount() {
        // this.getFilms(this.state.searchLine)
        // console.log(this.state.filmInfo);

        const state = store.getState();
        this.setState({searchLine: state.searchLine});
    }
    componentDidUpdate() {
        this.getFilms(this.state.searchLine)
    }
    searchLineChangeHandler = (e) => {
        // console.log(e.target.value);
        this.setState({ searchLine: e.target.value });
        // this.getFilms(this.state.searchLine)
        
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
    }

    findFilm = () => {
        store.dispatch({
            type: 'FIND_FILM',
            payload: {filmInfo: this.state.filmInfo}
        })
        
        // const state = store.getState();
        // console.log(state.movies[0].Search);
        // console.log(this.state.filmInfo);
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
                            placeholder="Например, Shawshank Redemption"
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
