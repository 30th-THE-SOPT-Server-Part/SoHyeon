// object (객체)
const sopt = {
    season: 30,
    group: ['YB', 'OB'],
    part: ['서버', '기획', '디자인', '안드로이드', '웹', 'iOS'],
    president: '김규민',
    introduce: function () {
        this.part.map(name => {
            console.log(`솝트 내 파트는 ${name} 파트가 있어요!`);
        });
    }
}

// sopt 객체의 introduce 함수 호출
sopt.introduce()

// sopt 객체의 season 출력
console.log(sopt.season);