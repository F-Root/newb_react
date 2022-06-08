import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//jsx -> react를 만드는 페이스북 팀에서 사용자 정의 태그를 만들때 return 후 tag를 명시할때 따옴표를 사용하지 않도록 js를 확장한 언어이다.
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href='/'
          onClick={(evt) => {
            console.log('evt', evt);
            evt.preventDefault();
            props.onSelect();
          }}
        >
          Web
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const list = props.data.map((el) => {
    return (
      <li key={el.id}>
        <a
          href={'/read/' + el.id}
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect(el.id);
          }}
        >
          {el.title}
        </a>
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
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  console.log(mode, id);

  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ];

  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, WEB!'></Article>;
  } else if (mode === 'READ') {
    const topic = topics.filter((el) => {
      if (el.id === id) return true;
      else return false;
    })[0];
    console.log('topic', topic);
    content = <Article title={topic.title} body={topic.body}></Article>;
  }

  function createHandler() {
    alert('created!');
  }
  return (
    <div>
      <Header
        onSelect={() => {
          alert('Header!!!');
          setMode('WELCOME');
        }}
      ></Header>
      <Nav
        data={topics}
        onSelect={(id) => {
          alert('Nav!!!,' + id);
          setMode('READ');
          setId(id);
        }}
      ></Nav>
      {/* <Article title='Welcome' body='Hello, WEB!'></Article>
      <Article title='HTML' body='HTML is ...'></Article> */}
      {content}
      {/* <img src=''></img> */}
      <a href='http://info.cern.ch'>Web</a>
      <br />
      <ButtonGroup>
        <Button variant='outlined' onClick={createHandler}>
          Create
        </Button>
        <Button variant='outlined'>Update</Button>
        <Button variant='outlined'>Delete</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
