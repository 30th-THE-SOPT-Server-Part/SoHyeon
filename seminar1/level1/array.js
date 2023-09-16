// 한 배열에 다양한 타입의 값 저장 가능
let arr = [1, 'item', true];
let arr2 = Array(4, null, {item: 'item'});

// map 함수 : 배열의 모든 요소에 대하여 각 호출한 함수의 대한 결과값 배열 반환
arr.map(item => console.log(item));
arr2.map(item => console.log(item));

// 함수 선언식
function sum(a, b) {
    return a+b;
}

// 함수 표현식
let sum2 = (a, b) => {
    return a+b;
}

// typeof : 타입 검사
console.log(typeof arr)
console.log(typeof 'hi');

// numArr에 모든 요소에 대하여 *2 함수 호출 결과 반환
let numArr = [1, 2, 3];
const newArr = numArr.map(x => x*2);
console.log(newArr);