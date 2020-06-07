/* 
 * config server
 * author: Charles Martins
 */

const express = require( "express" );
const server = express();

// get database
const db = require( "./database/db.js" );


// config public dir to be listen
server.use( express.static( "public" )  );

//enable req.body to use in aplication
server.use( express.urlencoded( { extended: true } ) );

// template engine
const nunjucks = require( "nunjucks" );
nunjucks.configure( "src/views" , {
    express: server, 
    noCache: true
} );


//config routers
server.get( "/" , ( req , res ) => {
    return res.render( "index.html" , { title: "Seu marketplace de coleta de resíduos" } );
});


// get query string of form 
server.get( "/create-point" , ( req , res ) => {
   // console.log(req.query); 
    return res.render( "create-point.html");
});


// INSERT
server.post( "/savepoint", ( req , res ) => {
       
    const query = 
       `INSERT INTO places ( 
        image, name, address, address2, state, city, items) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items 
    ]


    function AfterInsertData( err ) {
        if ( err ) {
            console.log(err);
            return res.send( "erro no cadastro!!!" );
        }
        //console.log( "Cadastrado com sucesso" );
        //console.log( this );

        return res.render( "create-point.html" , { saved: true } );
    }
    
     //console.log(req.body);
   
    db.run( query, values, AfterInsertData )  


});


// SELECT
server.get( "/search" , ( req , res ) => {

    const search = req.query.search;
   
    // empty search 
    if ( search == "" ) {
        return res.render( "search-results.html" , { total: 0 } );
    } 

    
    db.all( `SELECT * FROM places WHERE city LIKE '%${ search }%'`, function( err, rows ) {
        if ( err ) {
            return console.log( err );
        }
        const totalSearchPoint = rows.length;
        //show html page with datas of database
        return res.render( "search-results.html" , { places:rows , total:totalSearchPoint } );
        //console.log( "Seus registros" );
        //console.log( rows );
   });
    
   /*
    * function to selecet all places - wait
    */
    
});

server.listen( 3000 );
