const fs = require('fs');
const path = require('path');
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const database = {};
database.baseDir = path.join(__dirname, './database');

database.create = (file, data) => {
    fs.open(`${database.baseDir}/${file}.json`, 'wx', (err, identifier) => {
        if (!err && identifier) {
            let jsonArray = [];

            jsonArray.push(data);

            let stringData = JSON.stringify(jsonArray, null, 3);

            fs.writeFile(identifier, stringData, (err) => {
                if (!err) {
                    fs.close(identifier, (err) => {
                        if (!err) console.log('no errors');
                        else console.log(err);
                    })
                } else console.log(err);
            })
        } else console.log(err);
    });
};

database.read = (file) => {
    fs.readFile(`${database.baseDir}/${file}.json`, 'utf8', (err, data) => {
        if (err) return err;
        console.log(data);
    });
};

database.insert = (file, data) => {
    //readFile returns promises
    readFile(`${database.baseDir}/${file}.json`, 'utf8')
        .then(newStream => {
            //Change the string to a JS object
            let newData = JSON.parse(newStream);
            // Push our update to the array
            newData.push(data);
            // return our data as a string 
            return JSON.stringify(newData, null, 3);
        })
        .then(finalData => {
            //replace the content in the file, with the updated data.
            fs.truncate(`${database.baseDir}/${file}.json`, (err) => {
                if (!err) {
                    fs.writeFile(`${database.baseDir}/${file}.json`, finalData, (err) => {
                        if (err) return err;
                    })
                } else return err;
            })
        })
        .catch(err => console.log(err))
}

database.deleteSpecificEntity = (file, data) => {

    readFile(`${database.baseDir}/${file}.json`, 'utf8')
        .then(newStream => {
            //Change the string to a JS object
            var newData = JSON.parse(newStream);

            for (var i = 0; i <= newData.length - 1; i++) {
                if (JSON.stringify(newData[i]) === JSON.stringify(data)) {
                    console.log('yess');
                    newData.splice(i,1);
                    break;
                }
            }
           
            // return our data as a string 
            return JSON.stringify(newData, null, 3);

        })
        .then(finalData => {
            //replace the content in the file, with the updated data.
            fs.truncate(`${database.baseDir}/${file}.json`, (err) => {
                if (!err) {
                    fs.writeFile(`${database.baseDir}/${file}.json`, finalData, (err) => {
                        if (err) return err;
                    })
                } else return err;
            })
        })
        .catch(err => console.log(err))
}


database.delete = (file) => {
    fs.unlink(`${database.baseDir}/${file}.json`, err => {
        if (!err) console.log('deleted');
        else return err;
    })
}


database.updateSpecificEntity = (file, data, data2) => {

    readFile(`${database.baseDir}/${file}.json`, 'utf8')
        .then(newStream => {
            //Change the string to a JS object
            var newData = JSON.parse(newStream);

            for (var i = 0; i <= newData.length - 1; i++) {
              
                if (JSON.stringify(newData[i]) === JSON.stringify(data)) {
                    console.log('yay');
                    newData[i].name = data2.name;
                    newData[i].price = data2.price;
                  //  newData.push(data2);
                    break;
                }
            }
           
            // return our data as a string 
            return JSON.stringify(newData, null, 3);

        })
        .then(finalData => {
            //replace the content in the file, with the updated data.
            fs.truncate(`${database.baseDir}/${file}.json`, (err) => {
                if (!err) {
                    fs.writeFile(`${database.baseDir}/${file}.json`, finalData, (err) => {
                        if (err) return err;
                    })
                } else return err;
            })
        })
        .catch(err => console.log(err))
}

//database.create('cars',{'name': 'innoson','price':'$4000'});
//database.read('cars');
//database.create('cars-updated',{name:'mercedes',price:'$400'});
//database.insert('cars-updated',{name:'Toyota',price:'$550'});
//database.delete('cars');

//database.insert('cars-updated',{name:'kola2',price:'$590'});
//database.deleteSpecificEntity('cars-updated',{name:'Toyota2',price:'$550'});

// works database.deleteSpecificEntity('cars-updated', {name: 'kola2',price: '$590'});
// works 
/*  database.updateSpecificEntity('cars-updated', {
    "name": "Toyota BEE",
    "price": "$66"
 },{name:'Toyota promeneno',price:'$66'});
 */
