//Metod för att hämta data från Strapi
async function getDataFromStrapi() {
  //Url till Strapi.js API form sida keyboards
  let url = "http://localhost:1337/api/keyboards";

  //Hämtar JSON från API och konverterar det till JS objekt
  let stringResponse = await fetch(url);
  let myObjekt = await stringResponse.json();

  // console.log(myObjekt);

  let output = "<table>";

  //Checkar om det är ett eller flera objekt som hämtas
  // en array är definnerad även om det inte finns index, därför ska array vara större en 0 för att kontrollera om det finns något spara, om inte skapas ingen array
  if (Array.isArray(myObjekt.data) && myObjekt.data.length > 0) {
    //Anropa generateRow för att skapa en header-rad
    output += generateRow(myObjekt.data[0].attributes, null, true);

    //Skapar en ForEach loop för varje elemet i Data-arrayen
    myObjekt.data.forEach((element) => {
      //Gör en pekare till attribut objektet
      let obj = element.attributes;

      //skapar en row för varje obj. refererad till id.
      output += generateRow(obj, element.id, false);
    });
  } else {
    // skapar en variabel med path till attributer i objectet
    let obj = myObjekt.data.attributes;

    //Skapa en Header Rad med detta
    output += generateRow(obj, null, true);

    //Skriver Output string
    output += generateRow(obj, myObjekt.data.id, false);
  }
  //Avsluta <table> tag tabelen
  output += "</table>";

  // stringar skriv ut på div elementet
  document.getElementById("keyboardFetched").innerHTML = output;
}

// med dena funktion hämtar vi Token för använda senara
// för att Token ska hemtas ska user och passwor vara korrekta
async function getToken() {
  // boolean initieras som true
  let valid = true;

  //Validera användarnamn och lösenord!
  //misslyckad inloggning på validateLogin function
  if (!validateLogin()) valid = false;

  //Validera producter
  //om inmatad data inte är tillräckligt för att den har vissa krav
  if (!validateProduct()) valid = false;

  //vid misslyckade valideringar avbryta processen
  if (!valid) return null;

  //Url till Strapi.js UserList som user namn och lösenord gemförs mot
  const urlUser = "http://localhost:1337/api/auth/local/";

  // hämtar värden från .html filen
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  //Skapar ett objekt av det användarnamn och lösenord som user har skrivit in i fält.
  let userObject = {
    identifier: user,
    password: pass,
  };

  //Anropar API med inloggningsdata.
  //Inkluderar Method (Post) och Headers (från user i strapi)
  let userResponse = await fetch(urlUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  //Konverterar API response JSON string till ett objekt
  let userJson = await userResponse.json();
  // "deletePost" på knappen delete som skapas
  console.log(document.getElementById("deletePost"));
  console.log(userJson);

  //Kontrollerar om objektet har Token.
  //Token ligger under attribut jwt
  //Om inloggning är korrekt. Fortsätt till funktion postData med token som parameter.
  if (userJson.jwt) return userJson.jwt;
  else {
    //Inloggningen har misslyckats. Skriv ut errormeddelande från Strapi.js
    let errMessage = userJson.error.message;
    //let errMessage skrivs ut på .html
    document.getElementById("userError").innerText = errMessage;
    // metod avslutar
    return null;
  }
}
// hantera data från .html
async function postData() {
  //Anropa GetToken() för att få en inloggnings-nyckel.
  let token = await getToken();
  //Om detta misslyckas, avbryt funktionen.
  if (!token) return;

  //URL till Strapi producter collection.
  const urlProduct = "http://localhost:1337/api/keyboards/";

  // Hämtar data från fält på .html fil
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const qty = document.getElementById("qty").value;

  //Skapa ett objekt med data från .html
  let productObjekt = {
    data: {
      title: title,
      description: description,
      price: price,
      qty: qty,
    },
  };

  //Anropar API med productObjekt och gör en POST med data i obj
  let productResponse = await fetch(urlProduct, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token, //Inkluderar Token från tidigare inloggning.
    },
    body: JSON.stringify(productObjekt),
  });
  //Konverterar API response JSON string till ett objekt
  let productJson = await productResponse.json();

  console.log(productJson);
}

//Funktioner för validering
//Validering av User Input
function userValidate(comp) {
  //Fältet måste vara ifyllt för att metoden ska gå vidare (true)
  let valid = true;

  // måste vara störe än 0 för att få true
  if (comp.value.length == 0) {
    //Misslyckad validering och user input är lika med 0(false och metod avslutar)
    valid = false;
  }

  //om misslyckad skrivs tex ut
  if (!valid) {
    document.getElementById("userError").innerText = "det är tomt här!";
    return false;
  } else {
    // tömmer fält vid tru eller false
    document.getElementById("userError").innerText = "";
    return true;
  }
}

//Validering av Password input
function passValidate(comp) {
  let valid = true;
  // måste vara större än 4 tecken
  if (comp.value.length <= 4) {
    //Misslyckad validering och user input är lika eller mindre med 4(false och metod avslutar)
    valid = false;
  }
  //om "valid" inte stämmer
  if (!valid) {
    // detta text skrivs på .html fil om ifyld data inte uppfylls
    document.getElementById("passwordError").innerText =
      "minst 5 tecken långt!";
    return false;
  } else {
    //fält tömms vid true eller false
    document.getElementById("passwordError").innerText = "";
    return true;
  }
}

//funktion för validering av inloggninfsförsök
function validateLogin() {
  //Variabel för att initiera metod som ture
  let valid = true;

  //om användar namn från .html inte är korrekt returns false och metod avslutar
  if (!userValidate(document.getElementById("user"))) {
    valid = false;
  }

  //om lösenord inte stämmer med .html returns false och metod avslutas
  if (!passValidate(document.getElementById("pass"))) {
    valid = false;
  }
  // annars returneras "valid"
  return valid;
}

//Funktion för validering av "name" från .html
function titelValidate(comp) {
  // 1. Fältet måste innehålla ett värde
  // 2. Fältet får inte vara ett nummer

  let valid = true;

  //om validering är lika med 0
  if (comp.value.length == 0) {
    //"valid" är false och string skrivs ut på .html och metod avslutas
    valid = false;
    document.getElementById("titelError").innerText =
      "Titel måste vara ifyllt.";
  }

  //kontrollera att det inte är en string
  // om parameter "comp" inte är ett nummer och value längd inte är mer än 0 false
  if (!isNaN(comp.value) && comp.value.length != 0) {
    //Felaktig validering
    valid = false;
    // skriver ut string till .html
    document.getElementById("titelError").innerText =
      "Namnet får inte vara ett nummer.";
  }
  // tömmer input fält efter att metod är färdig
  if (valid) {
    document.getElementById("titelError").innerText = "";
  }

  return valid;
}

//validering av titel
function validateProduct() {
  let valid = true;

  //Validate titel av for
  if (!titelValidate(document.getElementById("title"))) {
    valid = false;
  }

  //TODO - Skapa validering för Type och Level

  return valid;
}

//Genererat tabellrad med det inkludera objektet. Skapar TH rad om header=true
function generateRow(obj, objId, header) {
  let output = "<tr>";
  // dessa parametrar döljs med "forbiddenParameters" som är en inbyggd metod för a tt dölaja parametrar
  let forbiddenParameters = ["createdAt", "updatedAt", "publishedAt"];

  //For in loop för att gå igenom alla parametrar i obj
  for (x in obj) {
    //Kontrollera att x är en tillåten parameter.
    // Keyword Continue går vidare till nästa parameter i loopen
    //Fungerar också i en ForEach loop.
    if (forbiddenParameters.includes(x)) continue;
    // generera en header med parameter namn
    if (header) output += `<th>${x}</th>`;
    // generera tabel för data med data till respektiv parameter
    else output += `<td> ${obj[x]}</td>`;
  }

  // console.log(obj, objId, header);
  //Skapa update och Delete knapp för TD rad
  // om header och objekt inte är definerade knappar ska inte visas
  if (!header && obj) {
    //URL för den specifika posten
    let postURL = `http://localhost:1337/api/keyboards/${objId}`;

    output += `<td><button onclick="updatePost('${postURL}');">Update Post</button></td>`;
    output += `<td><button onclick="deletePost('${postURL}');">Delete Post</button></td>`;
  }

  //Stänga <tr> taggen
  output += "</tr>";

  return output;
}

async function updatePost(url) {
  //Hämta Token från GetToken()
  let token = await getToken();
  //Om ingen Token returneras, avbryt funktionen
  if (!token) return;

  // Hämtar data från fält i .html fil spara de till en variabel
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const qty = document.getElementById("qty").value;

  //Skapa ett objekt med data inkluderat.
  let productObjekt = {
    data: {},
  };

  //Fyller upp Data med parameter-värden från .html till databas
  if (title) productObjekt.data["title"] = title;
  if (description) productObjekt.data["description"] = description;
  if (price) productObjekt.data["price"] = price;
  if (qty) productObjekt.data["qty"] = qty;

  //Anropar API med productObjekt
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, //Inkluderar Token från inloggning tidigare.
    },
    body: JSON.stringify(productObjekt),
  });

  //Anropa "GetDataFromStrapi" för att skriva ut ny tabell från användare
  await getDataFromStrapi();
}
// radera post data
async function deletePost(url) {
  //Hämta Token från GetToken()
  let token = await getToken();
  //Om ingen Token returneras, avbryt funktionen
  if (!token) return;

  //Anropar API med inloggningsdata.
  //Inkluderar Method (DELETE) och Headers TOKEN för använda validering
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, //Inkluderar Token från inloggning tidigare.
    },
  });

  //Anropa "GetDataFromStrapi" för att skriva ut ny tabell
  await getDataFromStrapi();
}
