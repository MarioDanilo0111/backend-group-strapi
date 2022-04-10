 let productUrl = '';
 let myId = 0;


function getInfo(props){
    myId = props;
   productUrl = '/'+ props
    console.log(productUrl);
    localStorage.setItem('objId', productUrl);
    // renderObjects(laptopsUrl);
    
}

async function renderObjects(){
    
    
    let apiUrl = "http://localhost:1337";
    console.log(apiUrl);
    console.log('test'+productUrl);
   
    let urlLocalhost = apiUrl +`/api/Laptops${productUrl}?populate=image`;
    console.log('Hello' + productUrl)
    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    let index = 0;
    
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            // <img src="${attr.image.data.attributes.formats.medium.url}"></img>
            // <a href="index2.html"><div class="grid-item" onclick="getInfo(${element.id})">
            let attr = element.attributes;
            console.log(element);
            // console.log(attr.Image.data.attributes.formats.thumbnail.url);
            output += `
            
            <div class="col-4" onclick="getInfo(${element.id})">
            <div class="card h-100 shadow-sm"> <img  src="${attr.image.data.attributes.formats.medium.url}" class="card-image-top"/>
              <div class="card-body">
                <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary">Qty:${attr.qty}</span> <span class="float-end price-hp">${attr.price}kr</span> </div>
                    <h5 class="card-title">${attr.title}</h5>                  
                    </div>                               
                </div>
            </div>
            `;
             
               index++;
              
        });
    }else{
        
        let object = myobject.data.attributes;
        
         output += `<div class="grid-item">
                    <div class="laptop-image">
                        <img src="${laptopsImages[myId-1].image}"></img>
                    </div>
                    <div class="item-info">
                        <div class="item-title">${object.title}</div>
                        <div>Price: ${object.price}</div>
                        <div>Qty: ${object.qty}</div>
                    </div>
                    
                </div>`;
    }
    document.getElementById('output').innerHTML = output;
     
}

renderObjects();


// `
                
//             <a href="index2.html"><div class="col-4" onclick="getInfo(${element.id})">
//                 <div class="card h-100 shadow-sm"> <img src="${attr.image.data.attributes.formats.medium.url}"  class="card-image-top">
//                 <div class="card-body">
//                 <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary">Qty:${attr.qty}</span> <span class="float-end price-hp">${attr.price}kr</span> </div>
//                     <h5 class="card-title">${attr.title}</h5>                  
//                     </div>                               
//                 </div>
//             </div></a>
                
//             `