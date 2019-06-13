# projectnode-store-my-request
This project contains my implementation of a database-like-system using only the file system. You can store JSON objects into desired folders which represent rows and tables. You can insert/delete/update "rows" or "tables".  

## Prerequisites  
You need to have the uuid package in order for my db script to run properly as I'm using it to generate unique ids.  
Simply type in  
```
npm install uuid
```  
then try any of the commands below and finally run the **index.js**.

## Commands
Here is a basic representation of the commands.  
* CREATE (a table) - add your desired name of table as first argument and entity data as second to create a table with it as first "row"  
```
database.create('test',{'id': uuid.v4(),'name':'first','price':'$4000'});
``` 
* SELECT (a table) - add the name of your "table" you want to select 
```
 database.select('{table name}');
```
* INSERT (a specific entity) - use insert to add more data ("rows")
```
database.insert('{table name}',{object data});
```
* DELETE (a specific entity) - use to delete a single "row"
```
database.deleteSpecificEntity('{table name}',{object data});
```
* UPDATE (a specific entity) - use to edit a single "row"
```
database.updateSpecificEntity('{table name}',{object data with id},{new object data});
```
* DROP (a table)
```
 database.drop('{table name}');
```
There are some valid test commands which are in the index.js file. Use them if you face issues with any functionality
