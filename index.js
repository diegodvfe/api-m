
const fs = require('fs');
const http = require('http')
const url = require('url')

// --------------------------


// blocking synchoroun way
// const text = fs.readFileSync('./txt/input.txt', 'utf-8')// pass the carater
// console.log(text)

// const textNow = `Quiero aprender como hacer nuevas cosas: ${text} crete on ${Date.now()}`
// fs.writeFileSync('./txt/outpt.txt', textNow)
// console.log('Writte')

// // Non-block
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2)
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err,data3) => {
//             console.log(data3)

//             fs.writeFile('./txt/final.txt', `${data2} and ${data3}` ,'utf-8', (err) => {
//                 console.log('Ya ha sido conectado tu codigo ')
//             } )
//         } )
//     })
//     // console.log(data)
// })
// console.log('Awesomen')

// ---------SERVER-------------

// Replace the placehoder objects
const replaceTemplate = (temp, product) => {
    // creo una variable dentro del

    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from)
    otuput = output.replace(/{%NUTRITIONS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    otuput = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    }

    return output

}

// async version 
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')// --> se debe hacer toda la parte directorio para poder dirigir la ruta adecuada.
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8') // --> se debe hacer toda la parte directorio para poder dirigir la ruta adecuada. 
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8') // --> se debe hacer toda la parte directorio para poder dirigir la ruta adecuada. 
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8') // --> se debe hacer toda la parte directorio para poder dirigir la ruta adecuada. 

const dataObj = JSON.parse(data)// usadon JSON.parse lo combertimos en sting                                                                                                                                                                                                     
        // --> donde esta la direccion
// console.log(data)
const server = http.createServer((req, res) => {
    const pathName = req.url;

{/* Overview page */}
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })

    //realizamos en variable hacemos uso de dataObj.map para pa
        const cardHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('')
        const output = templateOverview.replace('{%PRODUCTS_CARDS%}', cardHtml)
        res.end(output);
        // res.end(templateCard)
    
{/* Product page */}
    } else if (pathName === '/product') {
        res.end('Este es el producto')
        
    // } else if (pathName === '/about-us') {
    //     res.writeHead(200, {
    //      'Content-Type': 'text/html'
    //     })
    //     res.end('<h2> Conoce mas sobre nostros</h2>')
    }
// Api page
    else if (pathName === "/api") {
        {/* SyNC BLOCKING
        // usamps ``abrimos {}, luego __ nombre dirname se cierran 
        // {} luego / dev-data luego /data.json.
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {// --> se debe hacer toda la parte directorio para poder dirigir la ruta adecuada. 
            const productoData = JSON.parse(data)// usadon JSON.parse lo combertimos en sting
            res.writeHead(200, {
                'Content-type': 'application/json', // para json se utiliza application/json                                                                                                                            
                'my-own-header': 'data-from-server'
            })
            res.end(data) // data es un string y no objeto                                                                                                                                                                                                          
        })// --> donde esta la direccion
    */}
        {/* ASYNC BLOCKING */ }
        res.writeHead(200, {  'Content-type': 'application/json' })
        res.end(data)
        
    }
//Not found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hellos '
        })
        res.end('<h1>Page not found , Error!!</h1>')
    }
});

// 
server.listen(8080, '127.0.0.1', () => {
    console.log('Listening to request on port 8080')
}); // Ports que soporta es 8000, 5000, 3000



