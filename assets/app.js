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
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const inputElement = document.querySelector(`#${e.target.id} input`);
        if(inputElement.name == "dit"){
            return sumPairs();
        }else if(inputElement.name == "fs"){
            return fibSeries();
        }
        
    })
    
}

// Dizideki ikili toplamlar
function sumPairs(){
    const ditDiv = document.querySelector('#dit-div');
    const ditTotal = document.querySelector('input[name="dit-total"]');
    const ditVal = document.querySelector('input[name="dit"]').value;
    let arr = ditVal.split(',');
    let trimmedArr = arr.map(s => s.trim());
    for (let i = 0 ; i < trimmedArr.length ; i++) {
        for(let j = i+1 ; j < trimmedArr.length ; j++){
            if(Number(trimmedArr[i]) == Number(trimmedArr[j])){
                return ditDiv.innerHTML += `<div class="result">Lütfen birbirinden farklı sayılar girin.</div>`
            }
        }
    }
    ditDiv.innerHTML += `<h3>Dizinin elemanları şunlardır: ${trimmedArr.map(s => ` ${s} `)}</h3>`;
    for(let i = 0 ; i < trimmedArr.length ; i++){
        for(let j = 0 ; j < trimmedArr.length ; j++){
            if( Number(trimmedArr[i]) + Number(trimmedArr[j]) == Number(ditTotal.value)){
                ditDiv.innerHTML += `<div class="result">${trimmedArr[i]} + ${trimmedArr[j]} = ${Number(trimmedArr[i]) + Number(trimmedArr[j])} <br></div>`
            }
        }
    }
}

// Fibonacci Serisi:
function fibSeries(val){
    const fsDiv = document.querySelector('#fs-div');
    const fsVal = document.querySelector('input[name="fs"]').value;
    let fib = [];
    let num1 = 1;
    let num2 = 1;
    fsDiv.innerHTML += `<h3>Fibonacci Toplamları : </h3>`
    for(let i = 0 ; i < fsVal ; i++){
        let total = num1 + num2;
        fsDiv.innerHTML += ` ${num1} + ${num2} = ${total} <br>`;
        num1 = num2;
        num2 = total;
        fib.push(num1);
        if(i == fsVal - 1 ){
            fib.push(total);
        }
    }
    fsDiv.innerHTML += `Fibonacci Serisi: ${fib.map(f => ` ${f} `)}`;
}

