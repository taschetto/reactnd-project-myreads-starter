import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from './Header/Header'
import Bookshelf from './Bookshelf/Bookshelf'

import './ListBooks.css'

class ListBooks extends Component {
  render() {
    const { books } = this.props
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const read = books.filter(book => book.shelf === 'read')

    return (
      <div className="list-books">
        <Header />
        <div className="list-books-content">
          <div>
            <Bookshelf
              title='Currently Reading'
              books={currentlyReading}
              isFetching={this.props.isFetching}
              onUpdateShelf={this.props.onUpdateShelf} />
            <Bookshelf
              title='Want to Read'
              books={wantToRead}
              isFetching={this.props.isFetching}
              onUpdateShelf={this.props.onUpdateShelf} />
            <Bookshelf
              title='Read'
              books={read}
              isFetching={this.props.isFetching}
              onUpdateShelf={this.props.onUpdateShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
