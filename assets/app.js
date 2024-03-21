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
            return sumPairs(inputElement.value);
        }else if(inputElement.name == "fs"){
            return fibSeries(inputElement.value);
        }
        
    })
    
}

// Dizideki ikili toplamlar
function sumPairs(array){
    const ditDiv = document.querySelector('#dit-div');
    const fsTotal = document.querySelector('input[name="dit-total"]');
    let arr = array.split(',');
    let trimmedArr = arr.map(s => s.trim());
    console.log(trimmedArr)
    for (let i = 0 ; i < arr.length ; i++) {
        for(let j = i+1 ; j < arr.length ; j++){
            if(Number(arr[i]) == Number(arr[j])){
                return ditDiv.innerHTML += `<div class="result">Lütfen birbirinden farklı sayılar girin.</div>`
            }
        }
    }
    ditDiv.innerHTML += `<h3>Dizinin elemanları şunlardır: ${trimmedArr.map(s => ` ${s} `)}</h3>`;
    for(let i = 0 ; i < trimmedArr.length ; i++){
        for(let j = 0 ; j < trimmedArr.length ; j++){
            if( Number(trimmedArr[i]) + Number(trimmedArr[j]) == Number(fsTotal.value)){
                ditDiv.innerHTML += `<div class="result">${trimmedArr[i]} + ${trimmedArr[j]} = ${Number(trimmedArr[i]) + Number(trimmedArr[j])} <br></div>`
            }
        }
    }
}


// Fibonacci Serisi:

function fibSeries(val){
    const fsDiv = document.querySelector('#fs-div');
    let fib = [];
    let num1 = 1;
    let num2 = 1;
    fsDiv.innerHTML += `<h3>Fibonacci Toplamları : </h3>`
    for(let i = 0 ; i < val ; i++){
        let total = num1 + num2;
        fsDiv.innerHTML += ` ${num1} + ${num2} = ${total} <br>`;
        num1 = num2;
        num2 = total;
        fib.push(num1);
        if(i == val - 1 ){
            fib.push(total);
        }
    }
    fsDiv.innerHTML += `Fibonacci Serisi: ${fib}`;
}

