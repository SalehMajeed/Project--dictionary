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
      const x = e.clientX;
      const y = e.clientY;

      console.log(definition);

      create_form({ word, definition, example, x, y });

      document.addEventListener('click', remove_event);
    }
  }
}

function remove_event() {
  document.getElementById('container').remove();
  document.removeEventListener('click', remove_event);
}

function create_form({ word, definition, example, x, y }) {
  const box = document.createElement('div');
  const heading = document.createElement('h1');
  const def = document.createElement('p');
  const eg = document.createElement('p');

  box.style.left = x + 'px';
  box.style.top = y + 'px';

  box.id = 'container';

  document.body.append(box);

  heading.innerText = word;
  def.innerText = `Definition: ${definition}`;
  eg.innerText = `Example: ${example}`;

  box.append(heading, def, eg);
}
