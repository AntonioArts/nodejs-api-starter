import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../db';
import config from '../config';

const router = express.Router();

router.post('/', (req: any, res) => {
    const { email, type, password, pushTzoken } = req.body

    db.query('SELECT id FROM user WHERE email = ?', [email], function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            bcrypt.hash(password, 10).then(hash => {
                db.query('INSERT INTO user (email, type, hash, pushTzoken) VALUES (?, ?, ?, ?)', [email, type, hash, pushTzoken], function (error, results, fields) {
                    if (error) throw error;
                    const token = jwt.sign({
                        id: results.insertId,
                        email
                    }, config.jwtSecret);
                    res.json({"jwtToken": token})
                })
            }).catch(err => {
                res.status(500).json({"error": "Error during hashing password"})
            })
        } else {
            res.status(409).json({"error": "User already exists"})
        }
    })
})

router.post('/login', (req: any, res) => {
    const { email, password } = req.body

    db.query('SELECT id, hash FROM user WHERE email = ?', [email], function (error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            const { id, hash } = results[0]
            if (bcrypt.compareSync(password, hash)) {
                const token = jwt.sign({
                    id,
                    email
                }, config.jwtSecret);
                res.json({"jwtToken": token})
            } else {
                res.status(403).json({"error": "Invalid user credentials"})
            }
        } else {
            res.status(404).json({"error": "User or password do not exists"})
        }
    })
})

router.post('/avatar', (req: any, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({"error": "No files were uploaded"});
    }
    
    const fileUploadDir = 'assets/user/'
    const filename = String(Date.now()) + ".jpg"
    
    const image = req.files.image;
    image.mv(fileUploadDir + filename, function (err: Error) {
        if (err) {
            res.status(500).json({"error": err});  
        } 

        res.json({'path': fileUploadDir + filename});
    });
})

router.put('/', (req: any, res) => {
    const {
        name,
        age,
        bio,
        experience,
        avatar,
        activity,
        lat,
        lng,
        phone
    } = req.body

    const id = req.userId

    db.query('UPDATE user SET name = ?, age = ?, bio = ?, experience = ?, avatar = ?, activity = ?, lat = ?, lng = ?, phone = ?, complete = 1 WHERE id = ?', [name, age, bio, experience, avatar, activity, lat, lng, phone, id], function (error, results, fields) {
        if (error) throw error;
        if (results.affectedRows) {
            res.json({"status": 'OK'})
        } else {
            res.status(500).json({"error": "Error during user data update"})
        }
    })
})

router.put('/', (req: any, res) => {
    const {
        name,
        age,
        bio,
        experience,
        avatar,
        activity,
        lat,
        lng,
        phone
    } = req.body

    // pass and recieve a correct id
    const id = req.userId

    db.query('UPDATE user SET name = ?, age = ?, bio = ?, experience = ?, avatar = ?, activity = ?, lat = ?, lng = ?, phone = ?, complete = 1 WHERE id = ?', [name, age, bio, experience, avatar, activity, lat, lng, phone, id], function (error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            res.json({ "status": 'OK' })
        } else {
            res.json({ "error": "Error during user data update" })
        }
    })
})

router.put('/', (req: any, res) => {
    const {
        name,
        age,
        bio,
        experience,
        avatar,
        activity,
        lat,
        lng,
        phone
    } = req.body

    // pass and recieve a correct id
    const id = req.userId

    db.query('UPDATE user SET name = ?, age = ?, bio = ?, experience = ?, avatar = ?, activity = ?, lat = ?, lng = ?, phone = ?, complete = 1 WHERE id = ?', [name, age, bio, experience, avatar, activity, lat, lng, phone, id], function (error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            res.json({ "status": 'OK' })
        } else {
            res.json({ "error": "Error during user data update" })
        }
    })
});

router.post('/verify', (req: any, res) => {
    res.json({"status": "OK"})
})

router.post('/public/ping', (req: any, res) => {
    res.send("Hello from public api")
})

router.post('/private/ping', (req: any, res) => {
    res.send("Hello from private api, MAGIC_CONST = " + req.userId)
})

export default router;
