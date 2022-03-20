let path = location.pathname;
let url = 'http://localhost:3000/api' + path;

async function attraction() {
    const response = await fetch(url).then((res) => {
        return res.json();
    });
  return response;
}

async function dotNum(response) {
    const dots = document.querySelector(".dots");
    let dot = document.createElement("li");
    let dotNumber = response.data.images.length;
    for (i=0; i<dotNumber; i++) {
        dot.setAttribute("class", "dot");
        dots.appendChild(dot.cloneNode(true));
    }
}

function slide() {
    let slidePosition = 0;
    let slides = document.getElementsByClassName('image');
    let totalSlides = slides.length;
    // console.log(totalSlides);

    document.getElementById("right-btn").addEventListener("click", function() {
        moveToNextSlide();
    });
    document.getElementById("left-btn").addEventListener("click", function() {
        moveToPrevSlide();
    });

    function updateSlidePosition() {
        for (let slide of slides) {
            slide.classList.remove('image--visible');
            slide.classList.add('image--hidden');
        }
        slides[slidePosition].classList.add('image--visible');
    }

    function moveToNextSlide() {
        if (slidePosition === totalSlides -1) {
            slidePosition = 0;
        }else {
            slidePosition++;
        }
        updateSlidePosition();
    }
    function moveToPrevSlide() {
        if (slidePosition === 0) {
            slidePosition = totalSlides -1;
        } else {
            slidePosition--;
        }
        updateSlidePosition();
    }
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
    //  const myString = response.data["images"][0];
    //  const img = document.querySelector("img");
    // //  content.appendChild(img);
    //  img.setAttribute("src", myString);
    // //  img.setAttribute("class", "img");

     const myString = response.data.images;
     const img = document.createElement("img");
     let imgNumber = response.data.images.length;
     for (i=0; i<imgNumber; i++) {
        img.setAttribute("src", myString[i]);
        img.setAttribute("class", `image`);
        img.setAttribute("id", 'imgs');
        cover.appendChild(img.cloneNode(true));
    }

    

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
}

function check(n) {
    let morningBtn = document.querySelector("#input_time1");
    let afternoonBtn = document.querySelector("#input_time2");
    let money = document.querySelector(".money");
    if (n == 1) {
        morningBtn.style.backgroundColor = "#448899";
        afternoonBtn.style.backgroundColor = "#FFFFFF";
        money.textContent = "新台幣 2000 元";
    } else if (n == 2) {
        morningBtn.style.backgroundColor = "#FFFFFF";
        afternoonBtn.style.backgroundColor = "#448899";
        money.textContent = "新台幣 2500 元";
    }
}

async function main() {
    const response = await attraction();
    updateHtml(response);
    dotNum(response);
    slide();
}

main();