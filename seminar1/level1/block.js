// var : function scope => block 외부 사용 가능
if (true) {
    var x = 'var';
}
console.log(`var: ${x}`);

// let : block scope => block 외부 사용 불가
if (true) {
    let y = 'let';
}
// console.log(`let: ${y}`); // 사용 불가

// const : block scope => block 외부 사용 불가
if (true) {
    const z = 'const';
}
// console.log(`const: ${z}`); // 사용 불가

// var : function 내에서 사용 가능, 외부에서 불가
function foo () {
    if (true) {
        var variable = 'hello';
        console.log('if block - ', variable);
    }
    console.log('function block - ', variable);
}
foo();
// console.log('global - ', variable); // 사용 불가