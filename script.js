document.addEventListener('dblclick', selected_text);

async function selected_text(e) {
  const word = document.getSelection().toString().toLowerCase().trim();

  if (word.length > 0) {
    const url = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
    ).catch((e) => console.log('error'));

    if (url.status == 200) {
      const result = await url.json();
      const definition = result[0].meanings[0].definitions[0].definition;
      const example = result[0].meanings[0].definitions[0].example;

      create_form({ word, definition, example });
    }
  }
}

function create_form({ word, definition, example }) {
  const box = document.createElement('div');
  const heading = document.createElement('h1');
  const def = document.createElement('p');
  const eg = document.createElement('p');

  box.id = 'container';
  document.body.append(box);

  heading.innerText = word;
  def.innerText = `Definition: ${definition}`;
  eg.innerText = `Example: ${example}`;

  box.append(heading, def, eg);
}
