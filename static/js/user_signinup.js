// PATCH
function signIn() {
    lEmail = document.getElementById("dialog--email").value;
    lPassword = document.getElementById("dialog--password").value;
    lError = document.getElementById("error1--message").value;
    if (lEmail.indexOf(" ") != -1 || lPassword.indexOf(" ") != -1) {
        lError.textContent = "請勿輸入空白符號";
        lError.style.display = "block";
    } else if (lEmail == "" || lPassword == "") {
        lError.textContent = "請輸入完整資訊";
        lError.style.display = "block";
    } else if (lEmail != "" && lPassword != "") {
        let data = {
            "email": lEmail,
            "password": lPassword
        };
        let src = '/api/user';
        fetch(src, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            return res.json();
        }).then(result => {
            if(result.ok) {
                window.location.reload();
            } else if (result.error) {
                console.log(result);
                lError.textContent = result.message;
                lError.style.display = "block";
            }
            console.log(result);
        })
    }
}


//POST
function signUp() {
    rName = document.getElementById("dialog2--name").value;
    rEmail = document.getElementById("dialog2--email").value;
    rPassword = document.getElementById("dialog2--password").value;
    rError = document.getElementById("error2--message");
    rSuccess = document.getElementById("success2--message");
    if (rName.indexOf(" ") != -1 || rEmail.indexOf(" ") != -1 || rPassword.indexOf(" ") != -1) {
        rError.textContent = "請勿輸入空白符號";
        rError.style.display = "block";
    } else if (rName == "" || rEmail == "" || rPassword == ""){
        rError.textContent = "請輸入完整資訊";
        rError.style.display = "block";
    } else if (rEmail.indexOf("@") == -1){
        rError.textContent = "請輸入正確的電子信箱格式";
        rError.style.display = "block";
    } else if (rName != "" && rEmail != "" && rPassword != "") {
        let data = {
            "name": rName,
            "email": rEmail,
            "password": rPassword
        };
        let src = '/api/user';
        fetch(src, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.ok) {
                rError.style.display = "none";
                rSuccess.style.display = "block";
            } else if (result.error) {
                rError.textContent = result.message;
                rError.style.display = "block";
                rSuccess.style.display = "none";
            }
            console.log(result);
        })
    }
}
