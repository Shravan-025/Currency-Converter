let dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn")
let message = document.querySelector(".message")

for(let select of dropdown){
    for(code in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if(select.name=="frm" && code=="USD"){
            newoption.selected = "selected";
        }
        if(select.name=="to" && code=="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption)
    }
    select.addEventListener("click",(event)=>{
        updateflag(event.target);
    });
}

const updateflag = (event)=>{
    let currCode = event.value;
    let countrycode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = event.parentElement.querySelector("img");
    img.src = newsrc
}

async function exchange(url,amt,form,to) {
    let promise = await fetch(url)
    console.log(promise,amt);
    let data = await promise.json();
    console.log(data)
    const rate = data[form][to];
    const amount = (rate * amt).toFixed(2);
    form = form.toUpperCase();
    to = to.toUpperCase();
    message.innerHTML = `${amt} ${form} = ${amount} ${to}`
}

btn.addEventListener("click",(eve)=>{
    eve.preventDefault();
    let amount = document.querySelector("#Amt")
    let value = amount.value;
    if(value=="" || value<0){
        value = 1
        amount.value = "1"
    }
    let form = document.querySelector("#frm").value.toLowerCase();
    let to = document.querySelector("#to").value.toLowerCase();
    let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${form}.json`
    exchange(URL,value,form,to)
})

