//  Skapar variabel för ändring av poduct id i urlLocalhost
 let productUrl = '';

// funktion som används onclick vid skapandet av div för varje objekt
//  Funktionen tar emot element.id och productUrl tar det som värde som senare hamnar i urlLocalhost
function getInfo(props){
    productUrl = '/'+ props
    console.log(productUrl);
    localStorage.setItem('objId', productUrl);
}

async function renderObjects(){

    let apiUrl = "http://localhost:1337";

    console.log(apiUrl);
    console.log('test'+productUrl);

    // URL för visning av produkter
    let urlLocalhost = apiUrl +`/api/Laptops${productUrl}?populate=image`;
    console.log('Product URL:' + productUrl)

     // Fetchar url och gör om till json
    let urlResponse = await fetch (urlLocalhost);
    let productObject = await urlResponse.json();
    let output = '';
    
    //Kolla om data är en array
    if(Array.isArray(productObject.data)){
        productObject.data.forEach(element => {
            
            let attr = element.attributes;
            
            console.log(element);

            // Om bild är null(existerar inte i strapi att hämta), visa en vit bild
            // Bilden hämtas från en cloud databas kallad cloudinary
            if (attr.image.data === null){
                img = 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1649245136/white_omnxo9.jpg';
                
            }else{
                img = attr.image.data.attributes.formats.medium.url;
            }
            
            output += `
               <div class="col-4 click" onclick="getInfo(${element.id})">
            <a href="productDetails.html"><div class="card h-100 shadow-sm"> <img src="${img}" class="card-image-top"/>
              <div class="card-body">
                <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary">Qty:${attr.qty}</span> <span class="float-end price-hp">${attr.price}kr</span> </div>
                    <h5 class="card-title">${attr.title}</h5>                  
                    </div>                               
                </div></a>
            </div>
            `;
             
        });
        // Om det bara är ett objekt
    }else{
        
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
    document.getElementById('output').innerHTML = output;
}

renderObjects();