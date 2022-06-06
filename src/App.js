import logo from './logo.svg';
import './App.css';

//jsx -> react를 만드는 페이스북 팀에서 사용자 정의 태그를 만들때 return 후 tag를 명시할때 따옴표를 사용하지 않도록 js를 확장한 언어이다.
function Header() {
  return (
    <header>
      <h1>
        <a href='/'>Web</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  console.log(props.data);
  const list = props.data.map((el) => {
    return (
      <li key={el.id}>
        <a href={'/read/' + el.id}>{el.title}</a>
      </li>
    );
  });
  // const list = [
  //   <li>
  //     <a href='/read/1'>html</a>
  //   </li>,
  //   <li>
  //     <a href='/read/2'>css</a>
  //   </li>,
  //   <li>
  //     <a href='/read/3'>javaScript</a>
  //   </li>,
  // ];
  return (
    <nav>
      <ol>
        {/* <li>
          <a href='/read/1'>html</a>
        </li>
        <li>
          <a href='/read/2'>css</a>
        </li>
        <li>
          <a href='/read/3'>javaScript</a>
        </li> */}
        {list}
      </ol>
    </nav>
  );
}

function Article(props) {
  console.log('props', props);
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ];
  return (
    // <div className='App'>
    //   <header className='App-header'>
    //     <img src={logo} className='App-logo' alt='logo' />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Article title='Welcome' body='Hello, WEB!'></Article>
      <Article title='HTML' body='HTML is ...'></Article>
      {/* <img src=''></img> */}
      <a href='http://info.cern.ch'>Web</a>
    </div>
  );
}

export default App;
