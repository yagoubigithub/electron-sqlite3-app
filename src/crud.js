const { app, ipcMain } = require("electron");
const db = require("./db");
const mainWindow = require("./mainWindow");

const methode = Crud.prototype;

function Crud() {
  //db.run('DROP TABLE user');

  db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT ,
        password TEXT 
       
    )`);

  //get user
  ipcMain.on("user", (event, value) => {
    db.all(`SELECT * FROM user`, function (err, rows) {
      console.log("user")
      if (err) mainWindow.webContents.send("user", err);
      mainWindow.webContents.send("user", rows);
    });
  });

  ipcMain.on("user:add", (event, value) => {
    db.run(
      `
                    INSERT INTO user( username ,  password   ) VALUES (?,?) `,
      [value.username, value.password],
      function (err) {
        if (err) mainWindow.webContents.send("user:add", err);
        db.all(`SELECT * FROM user`, function (err, rows) {
          if (err) mainWindow.webContents.send("user:add", err);
          mainWindow.webContents.send("user:add", rows);
        });
      }
    );
  });

  ipcMain.on("user:delete", (event, value) => {
    if (value.id !== undefined) {
      // delete  projet


      db.run(
        `DELETE FROM user   WHERE id=${value.id};`,
        function (err) {
          if (err) mainWindow.webContents.send("user:delete", err);


          db.all(`SELECT * FROM user`, function (err, rows) {
            console.log("user")
            if (err) mainWindow.webContents.send("user:delete", err);
            mainWindow.webContents.send("user:delete", rows);
          });
         
        }
      );
    }
  });

 
  ipcMain.on("user:update", (event, value) => {
    console.log(value)
    if (value.id !== undefined) {   
        db.run(
          `UPDATE user  SET   username=? ,  password=?   WHERE id = ?;`,
          [value.username, value.password, value.id],

          function (err) {
            if (err) mainWindow.webContents.send("user:update", err);
          
            db.all(`SELECT * FROM user`, function (err, rows) {
              if (err) mainWindow.webContents.send("user:add", err);
              mainWindow.webContents.send("user:add", rows);
            });
          }
        );
      
    }
  });
 
}


module.exports = Crud;
