const url = "https://retoolapi.dev/KAsjRM/people";

document.addEventListener("DOMContentLoaded",()=>{
    emberek_listazasa();
    const uj_ember_urlap=document.getElementById('uj_ember_urlap');
    uj_ember_urlap.addEventListener("submit",(event)=>{
        event.preventDefault();
        uj_ember_felvetele();
    })
})

function uj_ember_felvetele(){
    const fname=document.getElementById('fname').value;
    const lname=document.getElementById('lname').value;
    const company=document.getElementById('company').value;
    const job=document.getElementById('job').value;
    const person={
        fname:fname,
        lname:lname,
        company:company,
        job:job
    }
    const xhttp=new XMLHttpRequest();
    xhttp.onload=function(){
        emberek_listazasa();
    };
    
    xhttp.open("POST",url);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(person));
}

function torles(id){
    const xhttp=new XMLHttpRequest();
    xhttp.onload=function(){
        emberek_listazasa();
    }
    xhttp.open("DELETE",`${url}/${id}`);
    xhttp.send();
}

function emberek_listazasa() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const { responseText } = xhttp;
        const peopleList = JSON.parse(responseText);
        console.log(peopleList);
        let html = "";
        for (let index = 0; index < peopleList.length; index++) {
            const element = peopleList[index];
            html += `<tr>
            <td>${element.fname}</td>
            <td>${element.lname}</td>
            <td>${element.company}</td>
            <td>${element.job}</td>
            <td><button onclick="torles(${element.id})">X</button></td>
            </tr>`;
        }
        const tablazat = document.getElementById('tablazat');
        tablazat.innerHTML = html;
    };
    xhttp.open("GET", url);
    xhttp.send();
}