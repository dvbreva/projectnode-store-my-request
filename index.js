const Database = require('./utils/db');
const uuid = require('uuid');

const database = new Database;

// CREATE 
// add your desired name of table as first argument and entity data as second to create a table with one row
//database.create('test',{'id': uuid.v4(),'name': 'first','price':'$4000'});

// SELECT - add the name of your "table" you want to select 
// database.select('test');

// INSERT - use insert to add more data 
// database.insert('test',{'id': uuid.v4(),'name': 'trying id one more time','price':'$250'});

// DELETE A SPECIFIC ENTITY - use to delete a single "row"
// database.deleteSpecificEntity('test',{'id':'889082be-0a18-4054-9304-1e1d27670023','name': 'trying id one more time','price':'$250'});

// UPDATE A SPECIFIC ENTITY - use to update a single "row"
// specify as follows (name of table, desired object to edit with ID, params you want to edit without ID)
// database.updateSpecificEntity('test', {'id': '45b700ff-495c-41ed-82a7-487d50d77c55','name': 'trying id','price': '$250'},{'name': 'editing name','price': '$500'});

// DROP - use to delete a whole "table"
// specify the name of the table
// database.drop('test');
