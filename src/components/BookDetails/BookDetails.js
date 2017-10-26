import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Loader } from 'react-loaders'
import BookshelfChanger from '../BookshelfChanger/BookshelfChanger'
import * as BooksAPI from '../../utils/BooksAPI'
import './BookDetails.css'

class BookDetails extends Component {
  state = {
    book: null,
    isFetching: false
  }

  componentDidMount() {
    this.setState({ isFetching: true })
    BooksAPI.get(this.props.match.params.bookId).then(book => {
      this.setState({ book, isFetching: false })
    })
  }

  render() {
    const { book, isFetching } = this.state

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
        </div>
        <div className='search-books-results'>
          {isFetching? (
            <Loader type='ball-scale-multiple' />
          ) : (
            book && (
              <div className="book-details">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                <div>
                  <dl>
                    <dt>Shelf</dt>
                    <dd>
                      <BookshelfChanger
                        book={book}
                        onUpdateShelf={this.props.onUpdateShelf} />
                    </dd>
                    <dt>Title</dt>
                    <dd>{book.title}{book.subtitle? `: ${book.subtitle}` : ''}</dd>
                    <dt>Author(s)</dt>
                    <dd>{book.authors? book.authors.join(', ') : ''}</dd>
                    <dt>Publisher</dt>
                    <dd>{book.publisher}</dd>
                    <dt>Pages</dt>
                    <dd>{book.pageCount}</dd>
                    <dt>ISBN10 / ISBN13</dt>
                    <dd>{`${book.industryIdentifiers[0].identifier} / ${book.industryIdentifiers[1].identifier}`}</dd>
                    <dt>Description</dt>
                    <dd><p>{book.description}</p></dd>
                  </dl>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}

export default BookDetails
