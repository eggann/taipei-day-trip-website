let insert = document.getElementsByClassName("insert").value;
let page = 0;
let isFetchingMore = false;
let noData = false;

function keyword(){
  const main = document.querySelector("main");
  let input = document.getElementById("ins").value;
  main.innerHTML = '';
  let divOuter= document.createElement("div");
  divOuter.id="siteOuter";
  divOuter.className="siteOuter";
  main.appendChild(divOuter);
  let currentPage=0;
  let src = `http://localhost:3000/api/attractions?page=${currentPage}&keyword=${insert}`;
  fetch(src).then(res => {return res.json();
  }).then(result => {
    if(result.data != null) {
      main.innerHTML = updateHtml(result);
    }
    else {
      main.innerHTML = `找不到${insert}的相關景點唷`;
    }
  })
}

// function keyword() {
//   let main = document.querySelector("main");
//   main.innerHTML = '';
//   let divOuter= document.createElement("div");
//   const src = `http://localhost:3000/api/attractions?page=${page}&keyword=${insert}`;
//   fetch(src).then((res) => {
//     return res.json();
//   }).then(result => {
//     if(result.error){
//       divOuter.innerHTML = `找不到${insert}的相關景點唷`;
//       // console.log(insert);
//     }
//     else {
//       updateHtml(result);
//       // console.log(insert);
//     }
//   })
// };

async function attractions() {
  if (isFetchingMore || noData) return null;

  console.log("fetching!");
  isFetchingMore = true;

  const src = `http://localhost:3000/api/attractions?page=${page}`;

  const response = await fetch(src).then((res) => {
    page += 1;
    isFetchingMore = false;
    return res.json();
  });

  if (response.data.length === 0) {
    noData = true;
  }

  return response;
}

function updateHtml(response) {
  if (response === null || noData) return;

  const main = document.querySelector("main");
  let content = document.querySelector(".content");

  if (!content) {
    content = document.createElement("div");
    content.setAttribute("class", "content");
    main.appendChild(content);
  }

  Array.from(response.data).forEach((_, index) => {
    /**
     * all section
     */
    const all = document.createElement("div");
    content.appendChild(all);
    all.setAttribute("class", "all");

    /**
     * img section
     */
    const myString = response.data[index]["images"][0];
    const img = document.createElement("img");
    all.appendChild(img);
    img.setAttribute("src", myString);
    img.setAttribute("class", "img");

    /**
     * name section
     */
    const title = document.createElement("div");
    all.appendChild(title);
    title.setAttribute("class", "title");

    const nameString = response.data[index]["name"];
    const name = document.createElement("div");
    title.appendChild(name);
    name.setAttribute("class", "name");
    name.textContent = nameString;

    const categoryString = response.data[index]["category"];
    const category = document.createElement("div");
    title.appendChild(category);
    category.setAttribute("class", "category");
    category.textContent = categoryString;

    const metString = response.data[index]["mrt"];
    const mrt = document.createElement("div");
    title.appendChild(mrt);
    mrt.setAttribute("class", "mrt");
    mrt.textContent = metString;
  });
}

/**　https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */
function createObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // 拉新的資料
          const res = await attractions();
          updateHtml(res);
          console.log("Done!");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }
  );

  return observer;
}

async function main() {
  const observer = createObserver();

  observer.observe(document.querySelector("footer"));
}

main();
