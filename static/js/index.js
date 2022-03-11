function main(){
    let src = "http://192.168.18.3:3000/api/attractions";
    fetch(src)
    .then((response) => {
        return response.json();
    }).then((result) => {
        let content = document.createElement('div');
        document.body.appendChild(content);
        content.setAttribute("class", "content");

        Array.from(Array(12)).forEach((_, index) => {
            /**
             * all section
             */
            const all = document.createElement('div');
            content.appendChild(all);
            all.setAttribute("class", "all");
        
            /**
             * img section
             */
            const myString = result.data[index]["images"][0];
            const img = document.createElement('img');
            all.appendChild(img);
            img.setAttribute("src", myString);
            img.setAttribute("class", "img");
        
            /**
             * name section
             */
            const title = document.createElement('div');
            all.appendChild(title);
            title.setAttribute("class", "title");

            const nameString = result.data[index]["name"];
            const name = document.createElement('div');
            title.appendChild(name);
            name.setAttribute("class", "name");
            name.textContent = nameString;

            const categoryString = result.data[index]["category"];
            const category = document.createElement('div');
            title.appendChild(category);
            category.setAttribute("class", "category");
            category.textContent = categoryString;

            const metString = result.data[index]["mrt"];
            const mrt = document.createElement('div');
            title.appendChild(mrt);
            mrt.setAttribute("class", "mrt");
            mrt.textContent = metString;
            // name.textContent = result.result.results[index].stitle;
            // name.setAttribute("class", "img_name");

            // console.log(result.data[index])
        });
        let footer = document.createElement('footer');
        footer.textContent = 'COPYRIGHT © 2021 台北一日遊';
        document.body.appendChild(footer);

        console.log(result.nexPage);

        window.addEventListener('scroll', ()=>{
            // console.log(result.data);
        });
    });
};

main();