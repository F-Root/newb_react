import { Link } from 'react-router-dom';

export function Nav(props) {
  const list = props.data.map((el) => {
    return (
      <li key={el.id}>
        <Link
          to={'/read/' + el.id}
          onClick={(evt) => {
            // evt.preventDefault();
            props.onSelect(el.id);
          }}
        >
          {el.title}
        </Link>
      </li>
    );
  });
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}
