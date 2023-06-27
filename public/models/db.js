class connection {

 static conn(){
      const connection = require('pg')
      const conn = new connection.Pool({
      user: "postgres",
      password: "Syspro2014$",
      host: "127.0.0.1",
      port: 5432,
      database: "MokuTech"
    })

    return conn;
  }


  static select(query){

    return new Promise((resolve,reject)=>{
      
      let conn = this.conn();
      
      conn.connect();

      conn.query(query, (err,results)=>{
        if(results){
          let rows = results.rows;
          resolve(rows);
        }
        else{
          reject(err);
        }
      });  
    });

  }

  static insert(query, values){

    return new Promise((resolve, reject)=>{

      let conn = this.conn();
      
      conn.connect();
      
      conn.query(query,values, (err,results)=>{
        if(results){
          resolve(results);
            
        }
        else{
          reject(err);
        }
      });
    }); 

  }



  static delete(query, value){

    return new Promise((resolve,reject)=>{

      let conn = this.conn();
      
      conn.connect();
      
        conn.query(query,value,(err,results)=>{

          if(results){
            resolve(results);
          }
          else{
            reject(err);
          }
          
        });
      
    });

  }



  static update(query){

    return new Promise((resolve,reject)=>{

      let conn = this.conn();
      
      conn.connect();
      
        conn.query(query,(err,results)=>{

          if(results){
            resolve(results);
          }
          else{
            reject(err);
          }
        });
      
    });
  }
}




module.exports = connection;


  
