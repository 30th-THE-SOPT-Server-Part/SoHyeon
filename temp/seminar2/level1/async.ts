/**
 * async
 */

let asyncFun1 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFun1 > ${msg}`);
        }, 1000);
    });
}

let asyncFun2 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFun2 > ${msg}`);
        }, 1500);
    });
}

// 함수명 : 인자 string Promise<string> 반환
let PromiseMain1 = (): void => {
    asyncFun1('server part').then((result: string) => {
        console.log(result);
        return asyncFun2('김소현');
    }).then((result: string) => {
        console.log(result);
    });
}

PromiseMain1();

/*
[실행 결과]
asyncFun1 > server part
asyncFun2 > 김소현
*/


// async & await
const asyncMain1 = async () => {
    let result = await asyncFun1('server part');
    console.log(result);
    result = await asyncFun2('김소현');
    console.log(result);
}

asyncMain1();

/*
[실행 결과]
asyncFun1 > server part
asyncFun2 > 김소현
*/