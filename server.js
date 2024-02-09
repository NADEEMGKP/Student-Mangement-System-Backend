// / CLASS DATE ==> 29-Jan-2024-8:00 PM-10:00 PM)
// npm init -y ==>  server folder
// npm install nodemon express mongoose ejs ==> server folder
// npx create-react-app sms-fronted ==> Client Folder
// Client\sms-fronted> npm install axios ==> Client Folder
// npm i cors ==> server folder
// npm install axios
// npm install cors

const Express = require("express");
const Cors = require("cors");
const Mongoose = require("mongoose");

const app = Express();
app.use(Express.urlencoded());
app.use(Cors());
app.use(Express.json());

// Mongoose.connect("mongodb://localhost:27017/studentdatabase");
// Mongoose.connect("mongodb+srv://<username>:<password>@nadeemkhan.4v2dnmg.mongodb.net/<databse>?retryWrites=true&w=majority");
Mongoose.connect("mongodb+srv://students:studentsstudents@nadeemkhan.4v2dnmg.mongodb.net/studentdatabse?retryWrites=true&w=majority");

const studentSchema = new Mongoose.Schema({
    "rollNo": {
        type: Number,
        required: true,
        unique: true
    },
    "name": {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    "age": {
        type: Number,
        required: true,
    }, 
    "city": {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
        validate: {
            validator: function(cityName) {
                return cityName.length >= 3 && cityName.length <= 10;
            },
            message: 'City name should be between 3 and 10 characters.'
        }
    }
});

const studentModal = Mongoose.model("students", studentSchema);

// CRETAE DATA

app.post("/collect", function (req, res) {
    const myRollNo = req.body.rollNo;
    const myName = req.body.name;
    const myAge = req.body.age;
    const myCity = req.body.city;

    // COLLECT DATA
    // res.send("Data collected successfully INSERTED");

    // SAVE INSERT THE DATA IN MONGO DB
    const studentData = new studentModal({
        "rollNo": myRollNo,
        "age": myAge,
        "name": myName,
        "city": myCity
    });

    studentData.save()
        .then(function(output) {
            // Send a response after saving the data
            // console.log(output);
            // res.send(`DATA IS SAVED. ${output}`)
            res.status(201).send(`DATA IS SUCCESSFULLY SAVED.`)
        })
        .catch(function(error) {
            // Handle errors and send an appropriate response
            // console.error(error);
            // res.send(`DATA IS NOT SAVED. PLEASE TRY AGAIN! ${error}`)
            res.send(`DATA IS NOT SAVED. PLEASE TRY AGAIN!`)
        });
});


// GET DATA ALL

app.get("/read", async function(req, res)
{
    const readData =  await studentModal.find() 
    // console.log(readData)  
    res.send(readData)
})


// GET DATA PERTICULER
// Example Express route handling the POST request
app.get('/read/data/:id', async function( req, res)
{
    // Handle the POST request logic here
    // console.log(req.body.studentid)
    const studentid = req.params.id
    const studentData1 =  await studentModal.find({rollNo: studentid})
    // console.log(studentData1)
    res.send(studentData1)
})

// DELETE PERTICULER DATA
app.delete("/delete/data/:id", async function(req, res)
{
    const studentId = req.params.id
    // console.log(studentId)
    const studentData = await studentModal.deleteOne({rollNo: studentId})
    if(studentData.deletedCount == 1)
    {
        res.send("STUDENT DATA IS NOT SUCCESSFUL DELETE")
    }
    else{
        res.send("STUDENT DATA IS SUCCESSFUL DELETE")
    }
})

app.put("/update/data/:id", async function(req, res) {
    const studentId = req.params.id;
    const { name, age, city } = req.body;
    const studentData = await studentModal.updateOne({ rollNo: studentId }, { name: name, age: age, city: city });
    if (studentData.modifiedCount === 1) {
        res.send("STUDENT DATA WAS SUCCESSFULLY UPDATED");
    } else {
        res.send("STUDENT DATA WAS NOT UPDATED");
    }
});


app.listen(9000, function () {
    console.log("SERVER IS RUNNING ON PORT 9000");
});


// READ DATA ==> http://localhost:3000/add
// SERVER ==> http://localhost:3000/add