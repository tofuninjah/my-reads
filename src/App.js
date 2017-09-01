import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './Shelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.refreshState()
  }

  refreshState = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  setUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data)=> {
      this.refreshState()
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={ () => (
          <SearchBooks
            books={this.state.books}
            onUpdateBook={this.setUpdateBook}
          />
        )} />

        <Route exact path="/" render={ () => (
          <div className="list-books-content">
            <Shelf
              shelfName={"Currently Reading"}
              shelf={"currentlyReading"}
              books={this.state.books}
              onUpdateBook={this.setUpdateBook}
            />
            <Shelf
              shelfName="Want to Read"
              shelf={"wantToRead"}
              books={this.state.books}
              onUpdateBook={this.setUpdateBook}
            />
            <Shelf
              shelfName="Read"
              shelf={"read"}
              books={this.state.books}
              onUpdateBook={this.setUpdateBook}
            />
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
