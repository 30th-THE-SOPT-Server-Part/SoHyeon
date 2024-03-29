// 인터페이스 정의
interface Sopt {
    name: string;
    age: number;
    organization: string;
    completion: number[]; // or Array<number>
}

// 인터페이스 활용
const sopt2: Sopt = {
    name: '김소현',
    age: 23,
    organization: 'SOPT',
    completion: [30]
};
console.log(sopt2);

const sopts: Sopt[] = [
        {
            name: '김소현',
            age: 23,
            organization: 'SOPT',
            completion: [30]
        },
        {
            name: '장서현',
            age: 19,
            organization: 'SOPT',
            completion: [27, 28, 29]
        },
        {
            name: '이현우',
            age: 5,
            organization: 'SOPT',
            completion: [30, 31, 32]
        }
    ];

/**
 * 선택적 프로퍼티
 */
interface Closet {
    name: string;
    shirt: number;
    pants: number;
    sunglass?: number;
    hat?: number;
}

const ohmygirl: Array<Closet> = [
    {
        name: '효정',
        shirt: 5,
        pants: 3
    },
    {
        name: '아린',
        shirt: 2,
        pants: 8,
        sunglass: 1 // 선택적
    }
];


/**
 * function interface
 */
const showOhmygirl = (arr: Closet[]) => {
    arr.map(e => {
        console.log(e.name);
        console.log(e.pants);
        console.log(e.shirt);
        console.log(e.hat);
        console.log(e.sunglass);
    })
};
showOhmygirl(ohmygirl);

const returnOhmygirl = (arr: Closet[]): Closet[] => {
    return arr;
}
console.log(returnOhmygirl);


interface Sopt3 {
    season: number;
    group: string[];
    part: string[];
    president: string;
    introduce(): string[];
}

const currentSopt: Sopt3 = {
    season: 30,
    group: ['OB', 'YB'],
    part: ['서버', '기획', '디자인', '안드로이드', '웹', 'iOS'],
    president: '김규민',
    introduce: function () {
        return this.part.map(name => {
            // console.log(`솝트 내 파트는 $${name} 파트가 있어요!`);
            return `솝트 내 파트는 $${name} 파트가 있어요!`;
        });
    }
}
console.log(currentSopt.introduce());