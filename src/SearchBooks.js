import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import SweetAlert from 'sweetalert-react';

class SearchBooks extends Component {
  static propTypes = {
      books: PropTypes.array.isRequired,
      onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trimLeft() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { query } = this.state

    const getShelf = (books, id) => {
      const book = books.find(b => b.id === id)
      return (book && book.shelf) ? book.shelf : 'none'
    }

    if(query) {
      BooksAPI.search(query).then((data) => {
        if(data && data.error !== 'empty query') {
          this.showingBooks = data.filter((b)=>{
              return (typeof b.imageLinks === 'undefined' ? '' : b.imageLinks)
            })
        }
      })
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ (event) => this.updateQuery(event.target.value) }
            />
          </div>
        </div>
          <div className="bookshelf" style={{paddingTop: '50px'}}>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.showingBooks && this.showingBooks.map((book, index)=>(
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={getShelf(this.props.books, book.id)} onChange={ (e)=> {
                                this.props.onUpdateBook(book, e.target.value)
                                this.setState({show: true})
                              }
                          }>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{ book.authors && book.authors.map( (author, index) => (<div key={index}>{author}</div>)  ) }</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <SweetAlert
            show={this.state.show}
            title="Done!"
            text="Your book has been added to your shelf."
            onConfirm={() => {
              this.setState({ show: false });
            }}
            onEscapeKey={() => this.setState({ show: false })}
            onOutsideClick={() => this.setState({ show: false })}
          />
      </div>
    )
  }
}

export default SearchBooks