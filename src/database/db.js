//import dependencie sqlite3
const sqlite3 = require( "sqlite3" ).verbose();

const db = new sqlite3.Database( "./src/database/database.db" );

module.exports = db;


// control key to perform deletion test manually
const staterKey = false;
const keyInsert = false;
const keyDelete = false;
let keyId = 0;

if( staterKey ){

    db.serialize( () => {
        db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );   
        `);

        if ( keyInsert ) {
            const query = 
            `INSERT INTO places ( 
                image, name, address, address2, state, city, items) 
                VALUES (?, ?, ?, ?, ?, ?, ?);`
            
            const values = ["http://repetreciclagem.com.br/img/papel.jpg",
                "Papersider", 
                "Guilherme Gemball, Jardim Amércia", 
                "Número 280", 
                "Santa Catarina",
                "Rio do Sul", 
                "Papéis e papelão"]
        }

        function AfterInsertData( err ) {
            if ( err ) {
                return console.log(err);
            }
            console.log( "Cadastrado com sucesso" );
            console.log( this );
        }

    //db.run( query, values, AfterInsertData )  
    
    db.all( `SELECT * FROM places`, function( err, rows ) {
            if ( err ) {
                return console.log( err );
            }
            console.log( "Seus registros" );
            console.log( rows );
    });

    if ( keyDelete ) {
        db.run( `DELETE FROM places WHERE ID = ?` , [keyId], function( err ) {
            if( err ) {
                return console.log( err );
            }
            console.log( "Registro Deletado" );
        });
    }

});

}