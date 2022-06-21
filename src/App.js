// import './App.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from 'styled-components';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Nav } from './Nav';
import { Article } from './Article';
import { Create } from './Create';

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  padding: 10px;
  font-size: 20px;
`;

function Read(props) {
  const params = useParams();
  const id = Number(params.id);
  const [topic, setTopic] = useState({ title: null, body: null });

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3333/topics/' + id);
      const data = await response.json();
      setTopic(data);
    })();
  }, [id]);

  // const topic = props.topics.filter((el) => {
  //   if (el.id === id) return true;
  //   else return false;
  // })[0];

  return <Article title={topic.title} body={topic.body}></Article>;
}

function Control(props) {
  const params = useParams();
  const id = Number(params.id);

  let contextUI = null;
  if (id) {
    contextUI = (
      <>
        <Button variant='outlined'>Update</Button>
        <Button
          variant='outlined'
          onClick={() => {
            props.onDelete(id);
          }}
        >
          Delete
        </Button>
      </>
    );
  }
  return (
    <>
      <Button component={Link} to='/create' variant='outlined'>
        Create
      </Button>
      {contextUI}
    </>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME'); // todo 삭제 예정
  const [id, setId] = useState(null); // todo 삭제 예정
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ]);

  const refreshTopics = async () => {
    const response = await fetch('http://localhost:3333/topics');
    const data = await response.json();
    setTopics(data);
  };

  useEffect(() => {
    refreshTopics();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics} onSelect={navHandler()}></Nav>
      <Routes>
        <Route path='/' element={<Article title='Welcome' body='Hello, WEB!'></Article>}></Route>
        <Route path='/create' element={<Create onCreate={onCreateHandler}></Create>}></Route>
        <Route path='/read/:id' element={<Read topics={topics}></Read>}></Route>
      </Routes>
      {/* <a href='http://info.cern.ch'>Web</a> */}
      <br />

      <Routes>
        {['/', '/read/:id', '/update/:id'].map((path) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <Control
                  onDelete={(id) => {
                    deleteHandler(id);
                  }}
                ></Control>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );

  async function onCreateHandler(title, body) {
    const response = await fetch('http://localhost:3333/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await response.json();
    navigate(`/read/${data.id}`);
    refreshTopics();
  }

  function deleteHandler(id) {
    setTopics((curr) => curr.filter((e) => e.id !== id));
    navigate('/');
  }

  function navHandler() {
    return (id) => {
      // alert('Nav!!!,' + id);
      setMode('READ');
      setId(id);
    };
  }

  function createHandler() {
    return () => {
      setMode('CREATE');
    };
  }

  function headerHandler() {
    return () => {
      // alert('Header!!!');
      setMode('WELCOME');
    };
  }
}

export default App;
