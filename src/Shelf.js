import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Shelf extends Component {
  static propTypes = {
      books: PropTypes.array.isRequired,
      shelfName: PropTypes.string.isRequired,
      shelf: PropTypes.string.isRequired,
      onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.filter((book, index) => {
              return book.shelf === this.props.shelf
            }).map((book, index)=>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf} onChange={ (e)=>{this.props.onUpdateBook(book, e.target.value)} }>
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
        <div className="open-search">
          <Link to="/search" className="close-search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default Shelf