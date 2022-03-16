let path = location.pathname;
let url = 'http://localhost:3000/api' + path;
let attractionId;

console.log(url);

// call attraction/<id> api
async function attraction() {
    const response = await fetch(url).then((res) => {
        return res.json();
    }).then((result) => {
        attractionId = result.data.id;
    });
  return response;
}


function updateHtml(response) {
    const main = document.querySelector("main");
    let content = document.querySelector(".content");
    // content = document.createElement("div");
    // content.setAttribute("class", "content");
    // main.appendChild(content);

    /**
     * img section
     */
     const myString = response.data["images"][0];
     const img = document.createElement("img");
     content.appendChild(img);
     img.setAttribute("src", myString);
     img.setAttribute("class", "img");

    /**
     * name section
     */
     const title = document.querySelector(".title");

     const all = document.createElement("div");
     title.appendChild(all);
     all.setAttribute("class", "all");

     const nameString = response.data["name"];
     const name = document.createElement("div");
     all.appendChild(name);
     name.setAttribute("class", "name");
     name.textContent = nameString;

     /**
     * mrt & category section
     */
     const place = document.createElement("div");
     all.appendChild(place);
     place.setAttribute("class", "place");

     const metString = response.data["mrt"];
     const mrt = document.createElement("div");
     place.appendChild(mrt);
     mrt.setAttribute("class", "mrt");
     mrt.textContent = metString;

     let at = document.createElement('div');
     at.textContent = 'at';
     at.setAttribute('class', 'at');
     place.appendChild(at);

     const categoryString = response.data["category"];
     const category = document.createElement("div");
     place.appendChild(category);
     category.setAttribute("class", "category");
     category.textContent = categoryString;

     /**
     * description & address & traffic way section
     */
     let content2 = document.createElement("div");
     content2.setAttribute("class", "content2");
     main.appendChild(content2);

     const descriptionString = response.data["description"];
     const description = document.createElement("div");
     content2.appendChild(description);
     description.setAttribute("class", "description");
     description.textContent = descriptionString;

     let attraction_address = document.createElement('div');
     attraction_address.textContent = '景點地址:';
     attraction_address.setAttribute('class', 'attraction_address');
     content2.appendChild(attraction_address);

     const addressString = response.data["address"];
     const address = document.createElement("div");
     content2.appendChild(address);
     address.setAttribute("class", "address");
     address.textContent = addressString;

     let attraction_transport = document.createElement('div');
     attraction_transport.textContent = '交通方式:';
     attraction_transport.setAttribute('class', 'attraction_transport');
     content2.appendChild(attraction_transport);

     const transportString = response.data["transport"];
     const transport = document.createElement("div");
     content2.appendChild(transport);
     transport.setAttribute("class", "transport");
     transport.textContent = transportString;
    

    // Array.from(response.data).forEach((_, index) => {
    //     /**
    //      * all section
    //      */
    //     const all = document.createElement("div");
    //     content.appendChild(all);
    //     all.setAttribute("class", "all");

    //     /**
    //      * img section
    //      */
    //     const myString = response.data[index]["images"][0];
    //     const img = document.createElement("img");
    //     all.appendChild(img);
    //     img.setAttribute("src", myString);
    //     img.setAttribute("class", "img");
    //     })
}

async function main() {
    const response = await attraction();
    updateHtml(response);
}

main();