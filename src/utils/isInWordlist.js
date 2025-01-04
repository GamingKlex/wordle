let wordlist = null;

export default async function isInWordlist(word) {
  if (!wordlist) {
    let res = await fetch("/wordle/wordlist.txt").catch(() => {
      alert("Failed to load the wordlist... Try refreshing the page!");
    });
    let text = await res.text();
    wordlist = text.split("\n").map((word) => word.toUpperCase().trim());
  }
  return wordlist.includes(word);
}
