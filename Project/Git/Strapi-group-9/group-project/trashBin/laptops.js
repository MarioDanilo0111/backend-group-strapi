
async function renderObjects(){
    let apiUrl = "http://localhost:1337";
    console.log(apiUrl);

    let urlLocalhost = "http://localhost:1337/api/Laptops/1?populate=";

    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    let index = 0;
    let title  = '';
    let details  = '';
    let price  = 0;
    let qty  = 0;
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            
            let attr = element.attributes;
            console.log(element);

            output += `
                <div class="grid-item"><a href="laptop-1">
                    <div class="laptop-image">
                        <img src="${images[index].image}"></img>
                    </div>
                    <div class="item-info">
                        <div class="item-title">${attr.Title}</div>
                        <div>Price: ${attr.Price}</div>
                        <div>Qty: ${attr.Qty}</div>
                    </div>
                    
                </div></a>
                
            `;
               index++;
        });
    }else{
        let object = myobject.data.attributes;
       
         title += `<div class="title"> Title: ${object.Title}</div>`;
         details += `<div> Description: ${object.Description}</div>`;
         price += `<div> Price: ${object.Price}</div>`;
         qty += `<div> In stock: ${object.Qty}</div>`;
    }
     document.getElementById("output").innerHTML = output;
     
}

renderObjects();