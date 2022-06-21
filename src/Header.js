import { Link } from 'react-router-dom';

//jsx -> react를 만드는 페이스북 팀에서 사용자 정의 태그를 만들때 return 후 tag를 명시할때 따옴표를 사용하지 않도록 js를 확장한 언어이다.
export function Header(props) {
  // const myStyle = {
  //   borderBottom: '1px solid gray',
  //   padding: '10px',
  //   fontSize: '20px',
  // };
  return (
    // <header style={myStyle}>
    <header className={props.className}>
      <h1>
        <Link
          to='/'
          onClick={(evt) => {
            // evt.preventDefault();
            props.onSelect();
          }}
        >
          Web
        </Link>
      </h1>
    </header>
  );
}
