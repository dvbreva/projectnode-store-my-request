const fs = require('fs');
const path = require('path');
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const baseDir = ('./database');

class Database {

    //Write data to a file
    create(file, data) {
        fs.open(`${baseDir}/${file}.json`, 'wx', (err, identifier) => {
            if (!err && identifier) {
                let jsonArray = [];

                jsonArray.push(data);

                let stringData = JSON.stringify(jsonArray, null, 3);

                fs.writeFile(identifier, stringData, (err) => {
                    if (!err) {
                        fs.close(identifier, (err) => {
                            if (!err) console.log('Successfully created a table.');
                            else console.log(err);
                        })
                    } else console.log(err);
                })
            } else console.log(err);
        });
    };

    read(file) {
        fs.readFile(`${baseDir}/${file}.json`, 'utf8', (err, data) => {
            if (err) return err;
            console.log(data);
        });
    };

    insert(file, data) {

        //readFile returns promises
        readFile(`${baseDir}/${file}.json`, 'utf8')
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
                fs.truncate(`${baseDir}/${file}.json`, (err) => {
                    if (!err) {
                        fs.writeFile(`${baseDir}/${file}.json`, finalData, (err) => {
                            if (err) return err;
                        })
                    } else return err;
                })
            })
            .catch(err => console.log(err));
    }

    drop(file) {
        fs.unlink(`${baseDir}/${file}.json`, err => {
            if (!err) console.log('Successfully dropped a table.');
            else return err;
        })
    }

    deleteSpecificEntity(file, data) {
        readFile(`${baseDir}/${file}.json`, 'utf8')
        .then(newStream => {
            //Change the string to a JS object
            var newData = JSON.parse(newStream);

            for (var i = 0; i <= newData.length - 1; i++) {
                if (JSON.stringify(newData[i]) === JSON.stringify(data)) {
                    console.log('You have successfully deleted a row.');
                    newData.splice(i,1);
                    break;
                }
            }
           
            // return our data as a string 
            return JSON.stringify(newData, null, 3);

        })
        .then(finalData => {
            //replace the content in the file, with the updated data.
            fs.truncate(`${baseDir}/${file}.json`, (err) => {
                if (!err) {
                    fs.writeFile(`${baseDir}/${file}.json`, finalData, (err) => {
                        if (err) return err;
                    })
                } else return err;
            })
        })
        .catch(err => console.log(err))
    }

    updateSpecificEntity(file, data, data2) {
        readFile(`${baseDir}/${file}.json`, 'utf8')
        .then(newStream => {
            //Change the string to a JS object
            var newData = JSON.parse(newStream);

            for (var i = 0; i <= newData.length - 1; i++) {
              
                if (JSON.stringify(newData[i]) === JSON.stringify(data)) {
                    console.log('You have successfully updated a row.');
                    newData[i].name = data2.name;
                    newData[i].price = data2.price;
                    break;
                }
            }
           
            // return our data as a string 
            return JSON.stringify(newData, null, 3);

        })
        .then(finalData => {
            //replace the content in the file, with the updated data.
            fs.truncate(`${baseDir}/${file}.json`, (err) => {
                if (!err) {
                    fs.writeFile(`${baseDir}/${file}.json`, finalData, (err) => {
                        if (err) return err;
                    })
                } else return err;
            })
        })
        .catch(err => console.log(err))
    }

};

module.exports = Database;