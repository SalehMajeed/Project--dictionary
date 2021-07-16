async function search() {
  const txt = document.getElementById('search-txt');
  const res_txt = document.getElementById('result-txt');

  const add_data = document.createElement('button');

  // const data = await fetch(
  //   `https://api.dictionaryapi.dev/api/v2/entries/en_US/${txt.value}`
  // );
  // const result = await data.json();
  const word = txt.value;
  const definition = 'Move from one place to another';
  const example = 'he went out to the store';
  // const definition = result[0].meanings[0].definitions[0].definition;
  // const example = result[0].meanings[0].definitions[0].example;

  const definition_label = document.createElement('label');
  const example_label = document.createElement('label');

  definition_label.innerText = `Definition: ${definition}`;
  example_label.innerText = `Example: ${example}`;
  console.log(definition, example);

  res_txt.append(definition_label, example_label);
  add_data.innerText = 'save';
  add_data.id = 'save-me';
  res_txt.append(add_data);
  add_data.addEventListener('click', () => {
    console.log(definition_label.innerText, example_label.innerText);
    const data = {
      word: 'go',
      definition: definition_label.innerText,
      example: example_label.innerText,
    };
    fetch('/add-to-dictionary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });
}
