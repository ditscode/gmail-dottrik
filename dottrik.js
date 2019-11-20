const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const fs = require('async-file');

const email = readlineSync.question('Email: ');

const dottrik = () => new Promise((resolve, reject) => {
    fetch(`http://api.ancreator.com/generator/dot-trick?email=${email}`, {
        method: 'GET',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'api.ancreator.com',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
        },
        redirect: 'follow',
        compress: false,
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});

(async () => {
    try {
        const dot = await dottrik();
        await dot.data.emails.map(async data => {
            console.log(data)
            await fs.appendFile('email.txt',`${data}\n`, function (err) {
                if (err) throw err;
                console.log('Gagal Menyimpan!');
            });
        });
        console.log('Saved On email.txt')
    } catch(e) {
        console.log(e)
    }
})();