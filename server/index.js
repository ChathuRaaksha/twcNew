const express=require('express');
const app=express()
const bodyParser=require('body-parser')
const mysql=require('mysql');
const cors=require('cors');
const multer = require('multer');
const path = require('path');
const db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'twc'
});
app.use(cors());
app.use(express.static("./public"))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))



app.get('/api/get',(req,res)=>{
  
    const sqlGet="select * from dummies ;";
    db.query(sqlGet,(err, result)=>{
        console.log(result);
        res.send(result);
    })
})


var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});

app.post("/api/insert", upload.single('image'), (req, res) => {
   // console.log(req.file.filename)
    const fullname=req.body.fullname;
    const email=req.body.email;
    const phone_no=req.body.phone_no;
    const file=req.body.file;
    
       
        //const profile_pic2 =req.body.profile_pic;
        var profile_pic = 'http://127.0.0.1:3000/images/' + req.body.profile_pic
        
        const sqlInsert="insert into dummies (fullname,email,phone_no,profile_pic) VALUES (?,?,?,?);";
        db.query(sqlInsert,[fullname,email,phone_no,profile_pic],(err, result)=>{
            console.log(result);
        })
   
});




app.put ('/api/update',(req,res)=>{
    const id=req.body.id
    const fullname=req.body.fullname;
    const email=req.body.email;
    const phone_no=req.body.phone_no;
    db.query("UPDATE dummies SET fullname=?,email=?,phone_no=? WHERE id=?", [fullname,email,phone_no,id]
    ,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send (result);
        }
    });
});

app.delete ('/api/delete:id',(req,res)=>{
    const id=req.params.id
    const fullname=req.body.fullname;
    const email=req.body.email;
    const phone_no=req.body.phone_no;
    db.query("DELETE from dummies WHERE id=?", id
    ,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send (result);
        }
    });
});






/*


app.post('/api/insert',(req,res)=>{
   //! Use of Multer
   //! Use of Multer

    const fullname=req.body.fullname;
    const email=req.body.email;
    const phone_no=req.body.phone_no;
    //const profile_pic2 =req.body.profile_pic;
    var profile_pic = 'http://127.0.0.1:3000/images/' + req.body.profile_pic
    
    const sqlInsert="insert into dummies (fullname,email,phone_no,profile_pic) VALUES (?,?,?,?);";
    db.query(sqlInsert,[fullname,email,phone_no,profile_pic],(err, result)=>{
        console.log(result);
    })
})*/

app.listen(3001,()=>{
    console.log('Running 3001');
});