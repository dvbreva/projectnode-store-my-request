const Database = require('./utils/db');

const database = new Database;

// CREATE 
// add your desired name of table as first argument and entity data as second to create a table with one row
//database.create('test',{'name': 'innoson','price':'$4000'});

// SELECT - add the name of your "table" you want to select 
// database.read('test');

// INSERT - use insert to add more data 
// database.insert('test',{'name': 'another one','price':'$200'});
// database.insert('test',{'name': 'another one 2','price':'$200'});
// database.insert('test',{'name': 'another one 3','price':'$250'});

// DELETE A SPECIFIC ENTITY - use to delete a single "row"
// database.deleteSpecificEntity('test',{'name': 'another one 2','price':'$200'});

// UPDATE A SPECIFIC ENTITY - use to update a single "row"
// specify as follows (name of table, desired object to edit, new info)
// database.updateSpecificEntity('test',{'name': 'another one 3','price':'$250'},{'name': 'edited name','price':'edited price'});

// DROP - use to delete a whole "table"
// specify the name of the table
// database.drop('test');

