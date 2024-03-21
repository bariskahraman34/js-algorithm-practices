const accordion = document.querySelectorAll(".accordion");
const forms = document.querySelectorAll('form');

for (const acc of accordion) {
    acc.addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
  });
}

for (const form of forms) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const inputElement = document.querySelector(`#${e.target.id} input`);
        if(inputElement.name == "dit"){
            sumPairs();
        }else if(inputElement.name == "fs"){
            fibSeries();
        }
        e.target.reset();
    })
}

// Dizideki ikili toplamlar
function sumPairs(){
    const resultDiv = document.querySelector('#dit-result-div');
    resultDiv.innerHTML = "";
    const ditTotalVal = document.querySelector('input[name="dit-total"]').value;
    const ditVal = document.querySelector('input[name="dit"]').value;
    let arr = ditVal.split(',');
    if(arr.length == 0 || ditTotalVal == ""){
        return resultDiv.innerHTML += `<p>Boş bırakmayınız.</p>`
    }
    let trimmedArr = arr.map(s => s.trim());
    if(trimmedArr.length % 2 != 0){
        return resultDiv.innerHTML += `<p>Lütfen sayı uzunluğunu çift yapınız.</p>`
    }
    for (let i = 0 ; i < trimmedArr.length ; i++) {
        for(let j = i+1 ; j < trimmedArr.length ; j++){
            if(Number(trimmedArr[i]) == Number(trimmedArr[j])){
                return resultDiv.innerHTML += `<p>Lütfen birbirinden farklı sayılar girin.</p>`
            }
        }
    }
    resultDiv.innerHTML += `
        <h3>Dizinin elemanları şunlardır: ${trimmedArr.map(s => ` ${s} `)}</h3>
        <h3>Dizideki ikili elemanlarının toplanmasında istenilen sonuç: ${ditTotalVal}</h3>
    `;
    let pairsArray = []; 
    for(let i = 0 ; i < trimmedArr.length ; i++){
        for(let j = 0 ; j < trimmedArr.length ; j++){
            if( Number(trimmedArr[i]) + Number(trimmedArr[j]) == Number(ditTotalVal)){
                pairsArray.push([Number(trimmedArr[i]),Number(trimmedArr[j])]);
                resultDiv.innerHTML += `<p>${trimmedArr[i]} + ${trimmedArr[j]} = ${Number(trimmedArr[i]) + Number(trimmedArr[j])}</p>`
            }
        }
    }
    if(pairsArray.length == 0){
        return resultDiv.innerHTML = "Girdiğiniz sonuca ulaşan ikili toplam bulunamamıştır."
    }
}

// Fibonacci Serisi:
function fibSeries(){
    const fsResultDiv = document.querySelector('#fs-result-div');
    fsResultDiv.innerHTML = "";
    const fsVal = document.querySelector('input[name="fs"]').value;
    let fib = [];
    let num1 = 1;
    let num2 = 1;
    fsResultDiv.innerHTML += `<h3>Fibonacci Toplamları : </h3>`
    for(let i = 0 ; i < fsVal ; i++){
        let total = num1 + num2;
        fsResultDiv.innerHTML += `<p>${num1} + ${num2} = ${total} </p>`;
        num1 = num2;
        num2 = total;
        fib.push(num1);
        if(i == fsVal - 1 ){
            fib.push(total);
        }
    }
    fsResultDiv.innerHTML += `<p>Fibonacci Serisi: ${fib.map(f => ` ${f} `)}</p>`;
}

