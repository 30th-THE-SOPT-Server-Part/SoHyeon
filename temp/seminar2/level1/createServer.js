const http = require('http');

http.createServer((req, res) => {
    // 여기서 서버 보내기
    res.write('<h1>Hello Server Part</h1>')
    res.end('<p>Server Love</p>')
}).listen(8080, () => {
    console.log('8080번에서 서버 대기 중');
})