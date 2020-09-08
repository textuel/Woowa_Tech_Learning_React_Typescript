let x = 'string';

let x = {
    a: 'a'
}

function foo() {

}

const p1 = new Promise((resolve, reject) => {
    //Promise
    setTimeout(()=> {
        resolve("응딥")
    }, 1000)
})

const p2 = new Promise((resolve, reject) => {
    //Promise
    setTimeout(()=> {
        resolve("응딥2")
    }, 1000)
})

p1.then(p2).then(function(r) {
    //callback 함수
    console.log(r)
}).catch(function() {

})

const delay = ms => new Promise((resolve) {
    setTimeout(resolve, ms)
}) 

async function main() {
    console.log('1');
    try {
        const x = await delay(2000);
    } catch(e) {
        console.log(e)
    }
    console.log('2');
}

main();

setTimeout(function (x) {
    console.log('앗싸')
    setTimeout(function(y) {
        console.log('웃싸')
    }, 2000)
}, 1000)
