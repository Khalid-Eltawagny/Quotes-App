const FIREBASE_DOMAIN = "https://quotes--app-default-rtdb.firebaseio.com";

export async function getAllQuotes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  const loadedQuotes = [];
  for (const key in data) {
    const quote = {
      id: key,
      ...data[key],
    };
    loadedQuotes.push(quote);
  } 
  return loadedQuotes;
}

export async function getSingleQuote(id) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${id}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Couldn't get this quote");
  }

  const retQoute = {
    id: id,
    ...data,
  };

  return retQoute;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.json();
  if (!response.ok) {
    throw new Error(data.message || "Couldn't add this quote");
  }
  return null;
}

export async function addComment(commentData) {
  const comment = {text:commentData.text} ; 
  console.log(commentData) ; 
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${commentData.quoteId}.json`,
    {
      method: "POST",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Couldn't add this comment");
  }

  return { commentId: data.name };
}

export async function getAllComment(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
  const data = await response.json();
  console.log(data) ; 
  if (!response.ok) {
    throw new Error(data.message || "Couldn't get comments for this quote!");
  }

  const loadedComments = [];
  for (const key in data) {
    const comment = { id: key, ...data[key] };
    loadedComments.push(comment);
  }
  console.log(loadedComments) ;  
  return loadedComments;
}
