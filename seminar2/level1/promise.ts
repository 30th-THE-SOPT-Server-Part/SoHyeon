/**
 * promise
 */

const condition: boolean = true;

const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject(new Error('reject !! error'));
    }
});

promise
    .then((resolveData): void => {
        console.log(resolveData);
    })
    .catch(error => console.log(error));

/*
[실행 결과]
(condition == true) : 성공
(condition == false) : Error: reject !! error
*/


/**
 * promise chaining
 */

const restaurant = (callback: () => void, time: number) => {
    setTimeout(callback, time);
}

const order = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황: 음식 주문]');
            resolve('음식 주문 시작');
        }, 1000);
    });
}

const cook = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황: 음식 조리 중]');
            resolve(`${progress} -> 음식 조리 중`);
        }, 2000);
    });
}

const serving = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황: 음식 서빙 중]');
            resolve(`${progress} -> 음식 서빙 중`);
        }, 2500);
    });
}

const eat = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황: 음식 먹는 중]');
            resolve(`${progress} -> 음식 먹는 중`);
        }, 3000);
    });
}

order()
    .then(progress => cook(progress))
    .then(progress => serving(progress))
    .then(progress => eat(progress))
    .then(progress => console.log(progress));

/*
[실행 결과]
[레스토랑 진행 상황: 음식 주문]
[레스토랑 진행 상황: 음식 조리 중]
[레스토랑 진행 상황: 음식 서빙 중]
[레스토랑 진행 상황: 음식 먹는 중]
음식 주문 시작 -> 음식 조리 중 -> 음식 서빙 중 -> 음식 먹는 중
*/


/**
 * 단일 catch
 */

Promise.resolve(123)
    .then(res => {
        throw new Error('에러 발생');
        return 456; // 앞에서 에러를 던져서 실행 X
    })
    .then(res => {
        console.log(res); // 절대 실행되지 않음
        return Promise.resolve(789);
    })
    .catch(error => {
        console.log(error.message);
    });

/*
[실행 결과]
에러 발생
*/