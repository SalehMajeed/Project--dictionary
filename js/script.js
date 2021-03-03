const span = document.querySelector('span');

span.addEventListener('dblclick', selected_text);

async function selected_text() {
  const word = document.getSelection().toString().toLowerCase().trim();

  if (word.length > 0) {
    const url = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
    ).catch((e) => console.log('error'));

    if (url.status == 200) {
      const result = await url.json();
      console.log(result[0].meanings[0].definitions[0].definition);
      console.log(result[0].meanings[0].definitions[0].example);
    }
  }
}
