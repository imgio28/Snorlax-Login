require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))   
.catch(err => console.log(err));

const saltRounds = 10;

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await EmployeeModel.findOne({ email });

        if (!user) {
            return res.json({ message: "Account does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.json({ message: "Login successful", user });
        } else {
            res.json({ message: "Email or Password is incorrect" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await EmployeeModel.findOne({ email });

        if (existingUser) {
            return res.json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newEmployee = new EmployeeModel({ email, password: hashedPassword, name });
        await newEmployee.save();

        res.json({ message: "Registration successful" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user" });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
