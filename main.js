const { app, BrowserWindow, ipcMain } = require('electron');
const {Client} = require('pg');

  // Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
  // fermee automatiquement quand l'objet JavaScript sera garbage collected.
  let win
  let connectPG;

  function createWindow () {
    // Créer le browser window.
    win = new BrowserWindow({ show: false, frame: false});
    win.maximize();
    connectPG = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'TaskManager',
      password: 'postgres',
      port: 5432,
    });

    connectPG.connect((err)=>{
      if(err){
        console.log(err.message);
        app.quit();
      }
      else{

        connectPG.query('SELECT COUNT(*) as nb FROM users', (err,res)=>{
          if(err){
            console.log(err.stack);
          }else{
            var count = res.rows[0].nb;
            if(count==0)
            {
              //win.loadFile('dist/taskManager/index.html');
              win.loadURL('http://localhost:4200/nousers');

            }else{
              //win.loadFile('dist/taskManager/index.html');
              win.loadURL('http://localhost:4200');
            }
          }
        });


      }
    });

    // et charge le index.html de l'application.




    // Émit lorsque la fenêtre est fermée.
    win.on('closed', () => {
      // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
      // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
      // où vous devez supprimer l'élément correspondant.
      win = null
      connectPG.end();
    })
  }

  ipcMain.on('initialisation', (event, uuid, args) => {
    connectPG.query('select * from rights where label=$1',['Administrateur']).then((exists)=>{
      if(exists.rows.length>0)
      {
          connectPG.query('INSERT INTO users (mail,password) VALUES($1,$2) RETURNING id',[args.login,args.password]).then((resuser)=>{
            connectPG.query('INSERT INTO users_rights ("idRight","idUser") VALUES ($1,$2)',[exists.rows[0].id,resuser.rows[0].id]).then((res)=>{
              win.hide();
              win.loadURL('http://localhost:4200');

            });
          });
      }
      else{
        connectPG.query('insert into rights (label) VALUES($1) returning id',['Administrateur']).then((resrights)=>{
          connectPG.query('INSERT INTO users (mail,password) VALUES($1,$2) RETURNING id',[args.login,args.password]).then((resuser)=>{
            connectPG.query('INSERT INTO users_rights ("idRight","idUser") VALUES ($1,$2)',[resrights.rows[0].id,resuser.rows[0].id]).then((res)=>{
              win.hide();
              win.loadURL('http://localhost:4200');

            });
          });
        });
      }
    });

  });

  ipcMain.on('connexion',(event,uuid,data)=>{
    console.log('connexion');
    connectPG.query('SELECT * FROM users WHERE mail = $1',[data.login]).then((res)=>{
      if(res.rows.length==0){
        event.sender.send('connexion_erreur','Utilisateur inexistant.');
      }else{
        if(data.password == res.rows[0].password){
          // win.hide();
          // win.loadURL("http://localhost:4200/main");
          event.sender.send('connexion_ok',res.rows[0]);

        }
        else{
          event.sender.send('connexion_erreur','Password incorrect.');
        }
      }
    }).catch((res)=>{
      console.log(res);
    });

  });

  ipcMain.on('GetUsers',(event)=>{
    connectPG.query('SELECT * FROM users').then((res)=>{
      event.sender.send('GetUsers',res.rows);
    });
  });
  // Cette méthode sera appelée quant Electron aura fini
  // de s'initialiser et sera prêt à créer des fenêtres de navigation.
  // Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
  app.on('ready', createWindow)

  // Quitte l'application quand toutes les fenêtres sont fermées.
  app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (win === null) {
      createWindow()
    }
  })

  // Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
