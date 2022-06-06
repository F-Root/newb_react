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

function Nav() {
  return (
    <nav>
      <ol>
        <li>
          <a href='/read/1'>html</a>
        </li>
        <li>
          <a href='/read/2'>css</a>
        </li>
        <li>
          <a href='/read/3'>javaScript</a>
        </li>
      </ol>
    </nav>
  );
}

function Article() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB!
    </article>
  );
}

function App() {
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
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

export default App;
