import { memo, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFetchBooksSlice } from './slice';
import { selectState } from './slice/selectors';

const features = [
  'Title',
  'ISBN',
  'Authors',
  'Publisher',
  'PageCount',
  'Published Date',
  'Actions',
];
export const BooksList = memo(() => {
  const { actions } = useFetchBooksSlice();
  const dispatch = useDispatch();
  const booksSelected = useSelector(selectState);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.requestFetchBooks());
  });

  return (
    <Table className="w-75 " striped bordered hover>
      <thead>
        <tr
          key={0}
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
        {booksSelected.books.map((book, i) => (
          <tr key={i + 1}>
            <td>{book.title}</td>
            <td>{book.isbn}</td>
            <td>{book.authors.map(author => author.fullName).join(', ')}</td>
            <td>{book.publisher}</td>
            <td>{book.pageCount}</td>
            <td>{book.publishedDate.substring(0, 10)}</td>
            <td>
              <Link to={`/dashboard/books/${book.isbn}`}>
                <Button className="btn-primary btn-sm">Details</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});
