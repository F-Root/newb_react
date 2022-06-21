export function Article(props) {
  console.log('props', props);
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
