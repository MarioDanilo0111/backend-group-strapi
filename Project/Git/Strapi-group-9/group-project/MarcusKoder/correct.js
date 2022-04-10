//Funktion för att hämta data från Strapi CMS
async function getDataFromStrapi() {
    //Url till Strapi.js API för att hämta alla Pokemons
    let url = "http://localhost:1337/api/pokemons";

    //Hämtar JSON från API och konverterar det till JS objekt
    let stringResponse = await fetch(url);
    let myObjekt = await stringResponse.json();

    console.log(myObjekt);

    let output = "";

    //Checkar om det är ett eller flera objekt som hämtas
    //Kan undvikas genom flera funktioner; en för alla och en för unik
    if (Array.isArray(myObjekt.data)){
        //Skapar en ForEach loop för varje elemet i Data-arrayen
        myObjekt.data.forEach(element => {
            
            //Gör en pekare till attribut objektet
            let obj = element.attributes;

            for (x in obj) {
                console.log( x + ": " + obj[x]);
            }

            //Skriver Output string
            //document.write(`Namn: ${attr.name}`);
            output += `<div>Namn: ${obj.name}</div>`;
        });
    } else {
        //Gör en pekare till attribut objektet
        let obj = myObjekt.data.attributes;
        for (x in obj) {
            console.log( x + ": " + obj[x]);
        }

        //Skriver Output string
        output += `<div>Namn: ${obj.name}</div>`;
    }
    
    //Skriver ut Output string till div-element
    //document.write(output);
    document.getElementById("pokemonFetched").innerHTML = output;
}

//Funktion för att hämta Token för användare
//Om en Token hämtas så betyder det att user/password är korrekt skrivet
async function getToken() {
    /*
    1. Göra ett inloggningsförsök för att få en Token returnerad
    2. Sammla data och skapa ett objekt av dessa
    3. Skicka iväg JSON till API
    */

    //Url till Strapi.js UserList
    const urlUser = "http://localhost:1337/api/auth/local/";

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    //Skapar ett objekt av det användarnamn och lösenord som user har skrivit in i fält.
    let userObject = {
        identifier : user,
        password : pass
    }

    //Anropar API med inloggningsdata.
    //Inkluderar Method och Headers
    let userResponse = await fetch(urlUser,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObject)
    });

    //Konverterar API response JSON string till ett objekt
    let userJson = await userResponse.json();
    console.log(userJson);

    //Kontrollerar om objektet har Token.
    //Token ligger under attribut jwt
    //Om så; inloggning är korrekt. Fortsätt till funktion postData med token som parameter.
    if (userJson.jwt) postData(userJson.jwt);
}

async function postData(token) {

    //URL till Strapi Pokemon collection.
    const urlPokemon = "http://localhost:1337/api/pokemons/";

    // Hämtar data från fält
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const level = document.getElementById("level").value;

    //Skapa ett objekt med data inkluderat.
    let pokemonObjekt = {
        data : {
            name : name,
            type : type,
            level : level
        }
    };

    //Anropar API med pokemonObjekt
    let pokemonResponse = await fetch(urlPokemon,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
        },
        body: JSON.stringify(pokemonObjekt)
    });

    let pokemonJson = await pokemonResponse.json();

    console.log(pokemonJson);
}
//Funktion av validering för title
function titleValidate(comp){
    //1. Fältet måste innehålla ett värde  
    //2. Får inte innehålla ett nummer

    let valid = true;

    //Check om value är större än 0
    if(comp.value.length == 0){
        //Felaktig validering
        valid = false;
        document.getElementById('titleError').innerText = 'Title måste vara ifyllt';
    }

    //Kolla att värdet inte är ett nummer
    if(!isNaN(comp.value) && comp.value.length != 0){
        valid = false;
        document.getElementById('titleError').innerText = 'Title kan inte vara ett nummer'
    }
    if(valid){
        document.getElementById('titleError').innerText = '';
    }

    return valid;

}

function validateProduct(){
    let valid = true;

    //Validate product
    if(!titleValidate(document.getElementById('name'))){
        valid = false;
    }

    // Todo - skapa validering för price och qty

    return valid;
}