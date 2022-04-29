// var : 재선언 가능, 재할당 가능
var variable1 = "var variable";
var variable1 = "new var variable"; // 재선언 가능
console.log("var: ", variable1);

// let : 재선언 불가, 재할당 가능
let variable2 = "let variable";
// let variable2 = "new let variable"; // 재선언 불가
variable2 = "new let variable"; // 재할당 가능
console.log("let: ", variable2);

//const : 재선언 불가, 재할당 불가
const variable3 = "const variable";
// const variable3 = "new const variable"; // 재선언 불가
// variable3 = "new const variable"; // 재할당 불가
console.log("const: ", variable3);