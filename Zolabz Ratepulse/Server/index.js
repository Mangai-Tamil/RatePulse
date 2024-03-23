import express from "express";
import mysql from 'mysql';
import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer';
import path from 'path';

import cors from 'cors';

import  {router}  from "./routes/productRouter.js";





const app = express()
const port = 8080;
// MySQL connection

  
  // Middleware

  app.use(bodyParser.json());
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('Public'))
  app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
  }

  ));
  
  //---------------------mttrial----------------------
  // routers

app.use('/api/products', router)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_sequelize_api_db',
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});



//testing
app.get('/', (req, res)=> {
    res.json({message: 'hello from api'})
})

//static Images Folder

app.use('/Images', express.static('./Images'))
//---------------mt trial fin--------------
  
  // Routes
  app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    // Perform validation and hash the password before storing in the database (not implemented here for simplicity)
  
    const sql = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
      if (err) {
        console.error('MySQL insertion error:', err);
        res.status(500).send('Error registering user');
      } else {
        console.log('User registered successfully');
        res.status(200).send('User registered successfully');
      }
    });
  });
  

app.post("/mylogin", (req, res) => {
    const sql = "SELECT * from logins Where email = ? and password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie('token', token)
        return res.json({ loginStatus: true });
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  app.post("/login", (req, res) => {
    const sql = "SELECT * from logins Where email = ? and password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie('token', token)
        return res.json({ loginStatus: true });
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });



app.get('/products', (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

app.post('/addcategory', (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  db.query(sql, [req.body.category], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
  })
})

app.post('/add_category', (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  db.query(sql, [req.body.category], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
  })
})

// image upload 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage
})
// end imag eupload 



app.get('/employee', (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

app.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  db.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})


app.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
      set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
      Where id = ?`
  const values = [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.address,
      req.body.category_id
  ]
  db.query(sql,[...values, id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})


app.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?"
  db.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

app.get('/admin_count', (req, res) => {
  const sql = "select count(id) as admin from products";
  db.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

app.get('/employee_count', (req, res) => {
  const sql = "select count(id) as employee from logins";
  db.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})


app.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})


////////////////////////////-------------EMPLOYEE ROUTER--------------------/////////////////

app.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employee Where email = ?";
  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
          if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
          if(response) {
              const email = result[0].email;
              const token = jwt.sign(
                  { role: "employee", email: email, id: result[0].id },
                  "jwt_secret_key",
                  { expiresIn: "1d" }
              );
              res.cookie('token', token)
              return res.json({ loginStatus: true, id: result[0].id });
          }
      })
      
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

app.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee where id = ?"
  db.query(sql, [id], (err, result) => {
      if(err) return res.json({Status: false});
      return res.json(result)
  })
})

app.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})


  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  