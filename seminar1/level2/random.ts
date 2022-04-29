// 과제 조건
// 1. Member, Dinner interface 만들고 타입 지정하기
// 2. organize 내부 로직 채우기

// Member interface
interface Member {
    name: string;
    group: string;
}

// Dinner interface
interface Dinner {
    member: Member[];
    shuffle(array: Member[]): Member[];
    organize(array: Member[]): void;
}

// object
const dinner = {
    member: [
        {
            name: '채정아',
            group: 'ob'
        },
        {
            name: '김동재',
            group: 'yb'
        },
        {
            name: '강민재',
            group: 'yb'
        },
        {
            name: '김루희',
            group: 'ob'
        },
        {
            name: '박진수',
            group: 'ob'
        },
        {
            name: '김소현',
            group: 'yb'
        }
    ],
    shuffle(array: Member[]) {
        array.sort(() => Math.random() - 0.5);
        return array;
    },
    organize(array: Member[]) {
        const dinnerMember: Member[] = this.shuffle(array);

        let ob: string = '';
        let yb: string = '';

        for(let i=0; i<dinnerMember.length; i++){
            if(dinnerMember[i].group=='ob' && ob === ''){
                ob = dinnerMember[i].name;
            }
            else if(yb === '') {
                yb = dinnerMember[i].name
            }

            if (ob !== '' && yb !== ''){
                break
            }
        }
       
        console.log(`오늘의 저녁 식사 멤버는 ${ob}, ${yb}`);
    }
};

dinner.organize(dinner.member);