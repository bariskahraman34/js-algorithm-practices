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
        }else if(inputElement.name == "es"){
            findBiggestThreeNumbers();
        }else if(inputElement.name == "tas"){
            reversiblePrimeNumbers();
        }else if(inputElement.name == "pk"){
            isPalindrom();
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

// Dizide ki En Büyük 3 Sayıyı Bulma
Array.prototype.sortSelectionArray = function(){
    for(let i = 0 ; i < this.length; i++){
        let indexOfMin = i;
        for(let j = i + 1 ; j < this.length; j++){
            if(this[j] < this[indexOfMin]){
                indexOfMin = j;
            }
        }
        let temp = this[i];
        this[i] = this[indexOfMin];
        this[indexOfMin] = temp;
    }
    return this;
}

function findBiggestThreeNumbers(){
    const esResultDiv = document.querySelector('#es-result-div');
    esResultDiv.innerHTML = "";
    const esVal = document.querySelector('input[name="es"]').value;
    let arr = esVal.split(',');
    let trimmedArr = arr.map(s => parseInt(s.trim()));
    if(trimmedArr.length < 3){
        return esResultDiv.innerHTML = "<p>Lütfen 3 adetten daha fazla sayı giriniz."; 
    }
    trimmedArr = trimmedArr.sortSelectionArray();
    esResultDiv.innerHTML = "<h3>Dizinin en büyük üç elemanı şunlardır: </h3>"
    for(let i = 0 ; i < 3 ; i++){
        esResultDiv.innerHTML += `<span>${trimmedArr.pop()}</span>`
    }
}

// Ters Çevrilebilir Asal Sayılar

function reversiblePrimeNumbers(){
    const tasResultDiv = document.querySelector('#tas-result-div');
    tasResultDiv.innerHTML = "";
    const tasVal = Number(document.querySelector('input[name="tas"]').value);
    let primeNumbers = [];
    let uniquePairs = [];
    for(let i = 12 ; i < tasVal ; i++){
        let reversedNumber = Number(i.toString().split('').reverse().join(''));
        let smallNumber = reversedNumber;
        if(i < reversedNumber){
            smallNumber = i;
        }
        let counter = 0;
        if(i % 10 !== 0){
            for(let j = 2 ; j < Math.ceil(smallNumber / 2) ; j++){
                if(reversedNumber % j == 0 || i % j == 0 ){
                    counter++;
                }
            }
            if(counter == 0){
                primeNumbers.push([i , reversedNumber]);
            }
        }
    }

    primeNumbers.forEach(pair => {
        let reversePair = [pair[1] , pair[0]];
        if(!uniquePairs.some(existingPair => existingPair[0]=== reversePair[0] && existingPair[1] === reversePair[1])){
            uniquePairs.push(pair);
        }
    })
    tasResultDiv.innerHTML += `
        <h3>Girilen değer: ${tasVal}</h3>
        <h3>Sonuç:</h3>
        ${uniquePairs.map(pair => `<p>${pair.join(' ile ')} ters çevrilebilir asal sayıdır.</p>`).join(' ')}
    `;
}

// Palindrom Kontrolü
function isPalindrom(){
    const pkResultDiv = document.querySelector('#pk-result-div');
    pkResultDiv.innerHTML = "";
    const pkVal = document.querySelector('input[name="pk"]').value;
    console.log(pkVal);
    let arr = pkVal.replaceAll(' ','');
    for(let i = 0 ; i < arr.length ; i++){
        if(arr[i] !== arr[arr.length - 1 - i]){
            pkResultDiv.innerHTML = `<p>"${pkVal}" palindrom değildir.</p>`;
            return
        }
    }
    pkResultDiv.innerHTML = `<p>"${pkVal}" palindromdur.</p>`;
}