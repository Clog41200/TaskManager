//const { app, BrowserWindow, ipcMain } = require("electron");
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
let connectPG;

const { Client } = require("pg");
connectPG = new Client({
  user: "postgres",
  host: "localhost",
  database: "TaskManager",
  password: "postgres",
  port: 5432
});

const appWeb = express();
appWeb.use(express.static(__dirname + '/dist/taskManager'));

const httpserv = http.createServer(appWeb);

const websocket = new WebSocket.Server({ port: 8181 });

const connectedClients = [];

websocket.on('connection', (clientws) => {

  connectedClients.push(clientws);

  clientws.on('message', message => {
    const objet = JSON.parse(message);

    if (objet.type == 'query') {

      const uuid = objet.queryID;
      const requete = objet.query;
      connectPG
        .query(requete, objet.args)
        .then(res => {
          clientws.send(JSON.stringify({
            type:'query',
            queryID: uuid,
            results: res.rows
          }));

          //event.sender.send(uuid, res.rows);
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (objet.type == 'notification') {

      const notificationName = objet.name;

      connectPG.query("UNLISTEN " + notificationName);
      connectPG.query("LISTEN " + notificationName).then();


    }
    if(objet.type=='deconnexion'){
      const userid = objet.iduser;

      connectPG.query('update users set est_connecte=false where id=$1',[userid]).then(()=>{
        connectPG.query('notify userconnexions, \'' + userid + '\'').then();
      });

    }


  });

  clientws.on('close', () => {

    // un client s'est déconnecté.
    var idx = connectedClients.findIndex((val)=>{
      return val == clientws;
    })

    if(idx!=-1){
      connectedClients.splice(idx,1);
    }

  });

});


appWeb.listen(80, () => {

});


connectPG.connect(err => {
  if (err) {
    //app.quit();
  } else {

    connectPG.on("notification", msg => {
      for (var i = 0; i < connectedClients.length; i++) {
        connectedClients[i].send(JSON.stringify({
          type: 'notification',
          name: msg.channel,
          results: msg.payload
        }
        ));
      }
    });

  }
});
// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let win;

var types = require("pg").types;
types.setTypeParser(20, function (val) {
  return parseInt(val);
});

// function createWindow() {
//   // Créer le browser window.
//   win = new BrowserWindow({ show: false, frame: false, webPreferences:{experimentalFeatures:true, experimentalCanvasFeatures:true} });
//   //win.maximize();





//   // et charge le index.html de l'application.

//   // Émit lorsque la fenêtre est fermée.
//   win.on("closed", () => {
//     // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
//     // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
//     // où vous devez supprimer l'élément correspondant.
//     win = null;
//     connectPG.end();
//   });
// }

// ipcMain.on("query", (event, uuid, query, args) => {

//   connectPG
//     .query(query, args)
//     .then(res => {
//       event.sender.send(uuid, res.rows);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// ipcMain.on("listenPG", (event, notificationName) => {
//   connectPG.query("UNLISTEN " + notificationName);
//   connectPG.query("LISTEN " + notificationName).then();
// });


// ipcMain.on("initialisation", (event, uuid, args) => {
//   connectPG
//     .query("select * from rights where label=$1", ["Administrateur"])
//     .then(exists => {
//       if (exists.rows.length > 0) {
//         connectPG
//           .query(
//             "INSERT INTO users (mail,password) VALUES($1,$2) RETURNING id",
//             [args.login, args.password]
//           )
//           .then(resuser => {
//             connectPG
//               .query(
//                 'INSERT INTO users_rights ("idRight","idUser") VALUES ($1,$2)',
//                 [exists.rows[0].id, resuser.rows[0].id]
//               )
//               .then(res => {
//                 win.hide();
//                 win.loadURL('file://' + __dirname + '/dist/taskManager/index.html');
//               });
//           });
//       } else {
//         connectPG
//           .query("insert into rights (label) VALUES($1) returning id", [
//             "Administrateur"
//           ])
//           .then(resrights => {
//             connectPG
//               .query(
//                 "INSERT INTO users (mail,password) VALUES($1,$2) RETURNING id",
//                 [args.login, args.password]
//               )
//               .then(resuser => {
//                 connectPG
//                   .query(
//                     'INSERT INTO users_rights ("idRight","idUser") VALUES ($1,$2)',
//                     [resrights.rows[0].id, resuser.rows[0].id]
//                   )
//                   .then(res => {
//                     win.hide();
//                     win.loadURL('file://' + __dirname + '/dist/taskManager/index.html');
//                   });
//               });
//           });
//       }
//     });
// });

// ipcMain.on("connexion", (event, uuid, data) => {
//   connectPG
//     .query("SELECT * FROM users WHERE mail = $1", [data.login])
//     .then(res => {
//       if (res.rows.length == 0) {
//         event.sender.send("connexion_erreur", "Utilisateur inexistant.");
//       } else {
//         if (data.password == res.rows[0].password) {
//           // win.hide();
//           // win.loadURL("http://localhost:4200/main");
//           event.sender.send("connexion_ok", res.rows[0]);
//         } else {
//           event.sender.send("connexion_erreur", "Password incorrect.");
//         }
//       }
//     })
//     .catch(res => {
//     });
// });

// ipcMain.on("GetUsers", event => {
//   connectPG.query("SELECT * FROM users").then(res => {
//     event.sender.send("GetUsers", res.rows);
//   });
// });

// ipcMain.on("Users_Add", (event, data) => {

//   connectPG
//     .query("INSERT into users (mail,password) VALUES ($1,$2) RETURNING *", [
//       data.data.mail,
//       data.data.password
//     ])
//     .then(res => {
//       event.sender.send(data.uuid, res.rows[0]);
//     })
//     .catch(res => {
//     });
// });

// ipcMain.on("Users_Update", (event, user) => {
//   connectPG
//     .query("UPDATE users SET mail=$1, password =$2 where id=$3", [
//       user.mail,
//       user.password,
//       user.id
//     ])
//     .then(() => {
//       event.sender.send("Users_updated");
//     });
// });

// ipcMain.on("Delete_User", (event, user) => {
//   connectPG.query("DELETE FROM users WHERE id = $1", [user.id]).then(res => {
//     event.sender.send("deleted_user");
//   });
// });
// // Cette méthode sera appelée quant Electron aura fini
// // de s'initialiser et sera prêt à créer des fenêtres de navigation.
// // Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
// app.on("ready", createWindow);

// // Quitte l'application quand toutes les fenêtres sont fermées.
// app.on("window-all-closed", () => {
//   // Sur macOS, il est commun pour une application et leur barre de menu
//   // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", () => {
//   // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
//   // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
//   if (win === null) {
//     createWindow();
//   }
// });

// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
