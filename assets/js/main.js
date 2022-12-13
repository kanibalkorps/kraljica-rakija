var objName, objLastName, objAddress, objCity, objPhone, objEmail, objOrderDdl, arrOrderRadio, arrOrderCheck;
var submitBtn = document.getElementById("btn-order");

var reFullName = /^([A-ZŠČĆĐŽ][a-zščćđž]{2,14}){1,3}$/;
var reAddress = /^(([A-ZŠĐČĆŽ][a-zšđžčć]{1,15}(\.)?)|([1-9][0-9]{0,2}(\.)?))[a-zA-Z0-9\s\/\-]+$/;
var reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var reCity = /^[A-ZŠČĆĐŽ][a-zščćđž]{2,14}\s[1-9][0-9]{4}$/;
var rePhone = /^(\+381)?(\s|-)?06(([0-6]|[8-9])\d{6,8}|(77|78)\d{7}){1}$/;

window.onload = function(){

    const BASE_IMG = "assets/img";

    createNavBar();


   


    objName = document.querySelector("#user-name");
    objLastName = document.querySelector("#user-lastname");
    objAddress = document.querySelector("#user-address");
    objCity = document.querySelector("#user-city");
    objPhone = document.querySelector("#user-phone");
    objEmail = document.querySelector("#user-email");
    arrOrderRadio = document.getElementsByName("orderer");//mozda treba noivObj = Array.from(arrOrderRadio)
    arrOrderCheck = document.getElementsByName("terms");

    objName.addEventListener("blur",function(){
        regexValidation(reFullName, objName);
    });
    objLastName.addEventListener("blur",function(){
        regexValidation(reFullName, objLastName);
    });
    objAddress.addEventListener("blur",function(){
        regexValidation(reAddress, objAddress);
    });
    objCity.addEventListener("blur",function(){
        regexValidation(reCity, objCity);
    });
    objPhone.addEventListener("blur",function(){
        regexValidation(rePhone, objPhone);
    });
    objEmail.addEventListener("blur",function(){
        regexValidation(reEmail, objEmail);
    });

    //select, radio i check validacija
    createDdl();
    let ddl = document.getElementById("order-method"); 
    ddl.addEventListener("click",checkDdl);    

    //validacija na submit
    submitBtn.addEventListener("click",formValidationOnSubmit);   
}

function formValidationOnSubmit(){
    //text validacija
    regexValidation(reFullName, objName);
    regexValidation(reFullName, objLastName);
    regexValidation(reAddress, objAddress);
    regexValidation(reCity, objCity);
    regexValidation(rePhone, objPhone);
    regexValidation(reEmail, objEmail);

    //select validacija
    checkDdl();

    //check validacija
    let chbTerms = document.getElementsByName("terms");
    try {
        if (!chbTerms[0].checked) {
            chbTerms[0].nextElementSibling.nextElementSibling.classList.remove("d-none");
            chbTerms[0].nextElementSibling.nextElementSibling.classList.add("d-block");
            throw ("Niste pročitali uslove korišćenja.");
        }
        else {
            chbTerms[0].nextElementSibling.nextElementSibling.classList.add("d-none");
            chbTerms[0].nextElementSibling.nextElementSibling.classList.remove("d-block");
            chbTerms[0].nextElementSibling.nextElementSibling.innerHTML = "";
        }
    }
    catch (error) {
        chbTerms[0].nextElementSibling.nextElementSibling.innerHTML = error;
    }
    
   
}
function regexValidation(re, obj){    
    try {
        if (!re.test(obj.value)) {
            obj.nextElementSibling.classList.remove("d-none");
            obj.nextElementSibling.classList.add("d-block");

            
            //proverava koji je element u pitanju
            if (obj == objName || obj == objLastName) {
                throw("Mora sadržati bar jedno veliko slovo i maksimum 15 malih.")
                // obj.nextElementSibling.innerHTML = "Mora sadržati bar jedno veliko slovo i maksimum 15 malih.";
            }
            else if (obj == objAddress) {
                throw("Adresa nije u dobrom formatu. Primer: Kralja Petra I 44, Sarajevska 14b...")
                // obj.nextElementSibling.innerHTML = "Adresa nije u dobrom formatu. Primer: Kralja Petra I 44, Sarajevska 14b...";
            }
            else if (obj == objCity) {
                throw("Grad nije u dobrom formatu. Primer: Zaječar 19000...");
                //obj.nextElementSibling.innerHTML = "Grad nije u dobrom formatu. Primer: Zaječar 19000...";
            }
            else if (obj == objPhone) {
                throw("Telefon mora da započne sa 06 ili +381 i da nema preko 8 cifara.");
                //obj.nextElementSibling.innerHTML = "Telefon mora da započne sa 06 ili +381 i da nema preko 8 cifara.";
            }
            else if (obj == objEmail) {
                throw("Email nije u dobrom formatu. Primer: username@gmail.com...");
                //obj.nextElementSibling.innerHTML = "Email nije u dobrom formatu. Primer: username@gmail.com...";
            }
            
        }
        else {
            obj.previousElementSibling.classList.remove("d-inline");
            obj.previousElementSibling.classList.add("d-none");
            obj.nextElementSibling.classList.remove("d-block");
            obj.nextElementSibling.classList.add("d-none");
            obj.nextElementSibling.innerHTML = "";
            if (submitBtn.hasAttribute("disabled")){
                submitBtn.removeAttribute("disabled");
            }
    
        }
    }
    catch (err) {
        obj.previousElementSibling.classList.remove("d-none");
        obj.previousElementSibling.classList.add("d-inline");
        obj.nextElementSibling.innerHTML = err;
        // //deaktivira dugme za submit ako unos nije dobar
        // if (!submitBtn.hasAttribute("disabled")) {
        //     submitBtn.setAttribute("disabled","disabled");
        //     console.log("disejvl");
        // }
    }
}
function createNavBar() {
    let aTagsHrefs = new Array("#home","#tradition","#products","#about","#shopping","o-autoru.html");
    let aTagsText = new Array("Početak","Tradicija","Rakija","O nama","Kontakt","O autoru");

    let navContent =  "<ul class='navbar-nav mb-2 mb-lg-0'>";

    for (let i = 0; i < aTagsHrefs.length; i++) {
        navContent += `<li class='nav-item'><a href="${aTagsHrefs[i]}" class="nav-link">${aTagsText[i]}</a></li>`;
        // let newLi = document.createElement("li");
        // newLi.classList.add("nav-item");
        // newLi.innerHTML = aTags[i];
        
        // navUl.append(newLi);
    }
    navContent += "</ul>";
    document.getElementById("mb-nav-container").innerHTML += navContent;
}
function showNavLinks() {
    $(".navbar-nav").slideToggle();
}
function createDdl() {
    let optionsText = new Array("Način dostavljanja","Pošta","Pouzećе");
    let optionsValues = new Array("0","1","2");


    let objOrderDdl = document.createElement("select");
    objOrderDdl.setAttribute("id","order-method");
    objOrderDdl.classList.add("form-select");

    let opt0 = document.createElement("option");
    opt0.setAttribute("value","0");
    opt0.innerHTML = optionsText[0];

    objOrderDdl.appendChild(opt0);
    for (let i = 1 ; i < optionsText.length ; i++) {
        let newOpt = document.createElement("option");
        newOpt.setAttribute("value",optionsValues[i]);
        let newOptText = document.createTextNode(optionsText[i]);
        newOpt.appendChild(newOptText);

        objOrderDdl.appendChild(newOpt);
    }

    document.getElementById("ddl-container").appendChild(objOrderDdl);
}
function checkDdl(){
    let ddlContainer = document.getElementById("ddl-container");
    let ddl = document.getElementById("order-method"); 
        try {
            if (ddl.options[ddl.options.selectedIndex].value == "0") {
                ddlContainer.nextElementSibling.classList.remove("d-none");
                ddlContainer.nextElementSibling.classList.add("d-block");
                throw ("Morate izabrati način dostavljanja.");
            }
            else {
                ddlContainer.nextElementSibling.classList.remove("d-block");
                ddlContainer.nextElementSibling.classList.add("d-none");
            }
        } catch (err) {
            ddlContainer.nextElementSibling.innerHTML = err;
        }
}


