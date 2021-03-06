document.addEventListener('dblclick', selected_text);

async function selected_text(e) {
  const word = document.getSelection().toString().toLowerCase().trim();
  const x = e.clientX;
  const y = e.clientY;

  if (word.length > 0) {
    const url = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
    );

    if (url.status == 200) {
      const result = await url.json();
      const definition = result[0].meanings[0].definitions[0].definition;
      const example = result[0].meanings[0].definitions[0].example;

      console.log(definition);

      create_form({ word, definition, example, x, y });
      document.addEventListener('click', remove_event);
    } else {
      create_form({
        word,
        definition: 'not available',
        example: 'not available',
        x,
        y,
      });
      document.addEventListener('click', remove_event);
    }
  }
}

function remove_event() {
  document.getElementById('dictionary_paragraph').remove();
  document.removeEventListener('click', remove_event);
}

function create_form({ word, definition, example, x, y }) {
  const box = document.createElement('div');
  const header = document.createElement('div');
  const side_bar = document.createElement('button');
  const heading = document.createElement('h1');
  const def = document.createElement('p');
  const eg = document.createElement('p');

  box.style.left = x + 'px';
  box.style.top = y + 'px';

  box.id = 'dictionary_paragraph';
  header.id = 'dictionary_header';

  heading.innerText = word;
  side_bar.innerText = 'Add word';
  def.innerText = `Definition: ${definition}`;
  eg.innerText = `Example: ${example}`;

  header.append(heading, side_bar);
  box.append(header, def, eg);
  document.body.append(box);

  side_bar.addEventListener('click', add_to_dictionary);
}

function add_to_dictionary() {
  console.log(word, definition, example);
}
