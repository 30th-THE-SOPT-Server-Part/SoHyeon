// boolean 타입 지정
let isDone: boolean = true;
const str: string = 'hello';
let num: number = 2;

// Type 'string' is not assignable to type 'number'.
// const sum: number = 'sum number';

// 배열 타입 지정
let array: number[] = [1, 2, 3];
const strArr: Array<string> = ['hello', 'world'];

// 배열 선언 및 할당
const objArr: Array<object> = [
    {item: 'value'},
    {item: 'value2'}
];

// obj 타입 지정 X
// objArr.map(obj => {
//     console.log(`item: ${obj.item1}`);
// })

// obj 타입 지정 (any, 남발X)
objArr.map((obj: any) => {
    console.log(`item: ${obj.item}`);
})

/**
 * object vs Object
 */

// 원시 타입 제외 타입 할당 가능
const foo2 = (obj: object): void => {
    console.log(obj);
};

// 모든 타입 할당 가능
const boo2 = (obj: Object): void => {
    console.log(obj);
};

// Argument of type 'string' is not assignable to parameter of type 'object'.
// foo2('hi');

boo2('hi'); // 가능!


/**
 * function return type
 */
function foo3(a: number, b: number): number {
    return a+b;
}

const boo3 = (a: number, b:number): number => {
    return a+b;
}

// return 없는 함수 타입은  void
const noReturn = (): void => {
    console.log('hihi');
}

// Argument of type 'string' is not assignable to parameter of type 'number'
// foo3('hi', 2); // argument 타입은 (number, number)
console.log(boo3(3,3));
noReturn();


/**
 * null, undefined
 */
let a: null = null;
// let x: null = 2; // null 타입은 null만 가능하므로 오류
let b: undefined = undefined;
// let y: undefined = null; // Type 'null' is not assignable to type 'undefined'.
console.log(a);
console.log(b);


/**
 * Type assertions
 */

// angle-bracket
let myName: any = '김소현';
let myNameLength: number = (<string>myName).length; // string 형변환 후 길이 구하기
console.log(myNameLength);

// as
let yourName: any = "강민재";
let yourNameLength: number = (yourName as string).length;
console.log(yourNameLength);


/**
 * any
 */
const unknown: any = {
    name: '김소현',
    age: 23,
    organization: 'SOPT',
    completion: [28, 29]
}
console.log(unknown);