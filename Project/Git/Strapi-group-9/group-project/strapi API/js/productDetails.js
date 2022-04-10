
// Hämtar variabel sparad i localstorage från ProductList för att hämta korrekt id nummer
// i urlLocalhost
productUrl = localStorage.getItem('objId');

async function renderObjects(){
    let apiUrl = "http://localhost:1337";
    console.log(apiUrl);

    let urlLocalhost = `http://localhost:1337/api/Laptops${productUrl}?populate=image`;
    // Fetchar url och gör om till json
    let urlResponse = await fetch (urlLocalhost);
    let productObject = await urlResponse.json();
    let output = '';
    
     
    //För produkt sidan / Flera objekt
    if(Array.isArray(productObject.data)){
        productObject.data.forEach(element => {
            
            let attr = element.attributes;
            console.log(element);

            // Om bild är null(existerar inte i strapi att hämta), visa en vit bild
            // Bilden hämtas från en cloud databas kallad cloudinary
            if (attr.image.data === null){
                img = 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1649245136/white_omnxo9.jpg';
              // Om bild finns  på Strapi hämta bild som url
            }else{
                img = attr.image.data.attributes.formats.thumbnail.url;
            }

             output += `
                <div class="col-4 click" onclick="getInfo(${element.id})">
            <a href="laptop-0"><div class="card h-100 shadow-sm"> <img src="${img}" class="card-image-top"/>
              <div class="card-body">
                <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary">Qty:${attr.qty}</span> <span class="float-end price-hp">${attr.price}kr</span> </div>
                    <h5 class="card-title">${attr.title}</h5>                  
                    </div>                               
                </div></a>
            </div>
                
            `;
               
        });
    }else{
        // För detaljerad sida / Singel objekt
        let object = productObject.data.attributes;

         output = `
        <div class="container">
        <div class="card mb-6" style="max-width: 1980px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${object.image.data.attributes.formats.medium.url}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">${object.title}</h5>
              <p class="card-text">${object.description}</p>              
              <p class="card-text"><span class="float-start badge rounded-pill bg-secondary">Qty:${object.qty}</span> <span class="float-end price-hp">Price: ${object.price}kr</span></p>
            </div>
          </div>
        </div>
      </div>
      </div>
  
        `
    }
     document.getElementById("desc").innerHTML = output;
}

renderObjects();




