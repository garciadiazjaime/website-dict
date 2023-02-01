export const defineWord = (word, lang) => {
  return fetch(`/.netlify/functions/define?word=${word}&lang=${lang}`).then(
    (resp) => resp.json()
  );
};

export const saveWord = (word, lang, definitions) => {
  if (!word || !lang || !Array.isArray(definitions) || !definitions.length) {
    return;
  }

  const payload = {
    word,
    lang,
    definitions,
  };

  return fetch("/.netlify/functions/save-word", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
};
