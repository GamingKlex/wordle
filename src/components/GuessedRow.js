export default function GuessedRow({ letters }) {
  return (
    <div className="row">
      {letters.map((letter, i) => (
        <div key={i} className={"guessed-letter " + letter.type}>
          {letter.value}
        </div>
      ))}
    </div>
  );
}
