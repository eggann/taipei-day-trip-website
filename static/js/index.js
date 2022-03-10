function main(){
    let src = "http://192.168.18.3:3000/api/attractions";
    fetch(src)
    .then(function(response) {
        return response.json();
    }).then(function(result){
        console.log(result);
    });
};

main();