// import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//jsx -> react를 만드는 페이스북 팀에서 사용자 정의 태그를 만들때 return 후 tag를 명시할때 따옴표를 사용하지 않도록 js를 확장한 언어이다.
function Header(props) {
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

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  padding: 10px;
  font-size: 20px;
`;

function Nav(props) {
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

function Article(props) {
  console.log('props', props);
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('submit');
          const title = e.target.title.value;
          const body = e.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type='text' name='title' placeholder='title'></input>
        </p>
        <p>
          <textarea name='body' placeholder='body'></textarea>
        </p>
        <p>
          <input type='submit' value='create'></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ]);

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
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          //const newTopics = [...topics, newTopic];
          setTopics(newTopics);
          setId(nextId);
          setMode('READ');
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  }

  return (
    <div>
      <HeaderStyled
        onSelect={() => {
          alert('Header!!!');
          setMode('WELCOME');
        }}
      ></HeaderStyled>
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
        <Button
          component={Link}
          to='/create'
          variant='outlined'
          onClick={() => {
            setMode('CREATE');
          }}
        >
          Create
        </Button>
        <Button variant='outlined'>Update</Button>
        <Button
          variant='outlined'
          onClick={() => {
            // const newTopics = topics.filter((e) => {
            //   if (e.id === id) {
            //     return false;
            //   } else {
            //     return true;
            //   }
            // });
            // setTopics(newTopics); //비동기 처리
            setMode('WELCOME'); //동기식이었다면 setMode를 먼저 호출해 준다음에 setTopics를 호출해야 결과가 제대로 나옴.

            setTopics((curr) => curr.filter((e) => e.id !== id));
          }}
        >
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
