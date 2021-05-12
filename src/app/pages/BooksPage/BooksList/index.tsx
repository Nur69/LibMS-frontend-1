import { memo } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchBooksSlice } from './slice';
import { selectState } from './slice/selectors';

const features = [
  'Title',
  'ISBN',
  'Authors',
  'Publisher',
  'PageCount',
  'Published Date',
];
export const BooksList = memo(() => {
  const { actions } = useFetchBooksSlice();
  const dispatch = useDispatch();
  dispatch(actions.requestFetchBooks());
  const booksSelected = useSelector(selectState);

  return (
    <>
      <Table className="w-75 " striped bordered hover>
        <thead>
          <tr
            style={{
              backgroundColor: '#707070',
              color: '#E5E5E5',
              fontFamily: 'Lato',
            }}
          >
            {features.map(feature => (
              <th>{feature}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {booksSelected.books.map(book => (
            <tr>
              <td>{book.title}</td>
              <td>{book.isbn}</td>
              <td>{book.authors.map(author => author.fullName + ', ')}</td>
              <td>{book.publisher}</td>
              <td>{book.pageCount}</td>
              <td>{book.publishedDate.substring(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
});
