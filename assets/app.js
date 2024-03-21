// Dizideki İkili Toplamlar:
const array = [1,2,3,4,5,6,7,8,9,10];
console.log(`Dizinin elemanları şunlardır: ${array}`);
for(let i = 0 ; i < array.length ; i++){
    for(let j = 0 ; j < array.length ; j++){
        if( i + j == 10){
            console.log(`${i} + ${j} = ${i + j}`);
        }
    }
}

// Fibonacci Serisi:
let fib = []
let num1 = 1;
let num2 = 1;

for(let i = 0 ; i < 10 ; i++){
    let total = num1 + num2;
    console.log(`Fibonacci Toplamları : ${num1} + ${num2} = ${total}`);
    num1 = num2;
    num2 = total;
    fib.push(num1);

}
console.log(`Fibonacci Serisi: ${fib}`);

