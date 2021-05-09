import { Table } from 'react-bootstrap';
import { memo } from 'react';
import { useFetchBooksSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
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
  dispatch(actions.requestFetchBook());
  const books = useSelector(selectState);

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
          {books.map(book => (
            <tr>
              <td>{book.title}</td>
              <td>{book.isbn}</td>
              <td>
                {book.authors.map(
                  author => author.firstName + ' ' + author.lastName + '',
                )}
              </td>
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
