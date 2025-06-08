import {temples} from "../data/temples.js"
//console.log(temples); // For debugging, remove in production

import {url} from "../data/temples.js";
//console.log(url); // For debugging, remove in production

const showHere = document.querySelector("#showHere")
//
const mydialog = document.querySelector("#mydialog")
const mytitle = document.querySelector("#mydialog h2")
const myclose = document.querySelector("#mydialog button")
const mydescription = document.querySelector("#mydialog p")

myclose.addEventListener("click", () => mydialog.close());

function displayItems(data){
    console.log(data); // For debugging, remove in production
    data.forEach(item => { 
        console.log(item)
        const photo = document.createElement('img')
        const info = document.createElement('p')
        photo.src =`${url} ${item.path}`
        photo.alt = item.name
        photo.loading = "lazy"; // For better performance
        photo.addEventListener("click", () => {showStuff(item)});
        showHere.appendChild(photo);
        showHere.appendChild(info);
    })
};



displayItems(temples);

function showStuff(item){
    mytitle.innerHTML = item.name;
    mydescription.innerHTML = `Dedicated in ${item.dedicated} by ${item.person}`;
    mydialog.showModal();
}