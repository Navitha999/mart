const express = require("express")
const path = require("path")
const cors = require("cors")
const { open } = require("sqlite")
const sqlite3 = require("sqlite3")
const app = express()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
app.use(cors())
app.use(express.json())
const dbPath = path.join(__dirname, "mart.db")
let db = null
const serverCreation = async () => {
    try {

        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(5000, () => {
            console.log("runninggg")
        })
    }
    catch (err) {
        console.log(`Error Messeage: ${err}`)
        process.exit(1)
    }
}

serverCreation()


app.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        if (!db) {
            return res.status(500).json({ message: "DB not connected" })
        }
        const user = await db.get("SELECT * FROM users WHERE username=?", [username])

        if (!user) {
            return res.status(400).json({ message: "User not Found" })
        }
        const isPassExist = await bcrypt.compare(password, user.password)
        if (!isPassExist) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        else {
            const jwtToken = jwt.sign({ username: username }, "JWT_SECRET_TOKEN")
            res.status(200).json({ message: "Login Successfull", jwt_token: jwtToken })
        }
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }

})

app.post("/register", async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: "Username & password required!!" })
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be 8 charecters" })
    }
    try {
        if (!db) {
            return res.status(500).json({ message: "DB not connected" })
        }
        const user = await db.get("SELECT * FROM users WHERE username=?", [username])
        if (user) {
            return res.status(400).json({ message: "User already Exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await db.run(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );
        res.status(201).json({ message: "User registered successfully ✅" });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error" });
    }

})
false