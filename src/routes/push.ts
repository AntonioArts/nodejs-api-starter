import express from 'express';
import { Expo } from 'expo-server-sdk';

const router = express.Router();

router.post('/', (req: any, res: any) => {
    const { pushToken, title, body } = req.body
    
    if (!Expo.isExpoPushToken(pushToken) || !pushToken || !title || !body) {
        res.status(406).json({"Error": "Push notification can't be sent"})
    }
    
    const messages = []
    
    const messageData = {
        to: pushToken,
        title,
        body
    }
    
    messages.push(messageData)
    
    const expo = new Expo()
    const chunks = expo.chunkPushNotifications(messages)

    const sendNotifications = async () => {
        for (let chunk of chunks) {
            await expo.sendPushNotificationsAsync(chunk)
        }
    }

    (async () => {
        await sendNotifications()
        .then(() => {
            res.json({"status": 'OK'})
        }).catch(error => {
            res.json({"error": "There was an error: " + error.message})
        })
    })()
})

export default router;