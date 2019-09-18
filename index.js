const express = require("express");
const Expo = require("expo-server-sdk").default;
const cors = require("cors");


const expo = new Expo();
const expressServer = express();

expressServer.use(cors());
expressServer.listen(process.env.PORT || 3000, () => {
    expressServer.get("/", function (req, res) {
        const token = req.query.token;
        if (!Expo.isExpoPushToken(token)) {
            res.send({ err : "Token Invalide" })
        } else {
            let message = [
                {
                    to : token,
                    sound : "default",
                    body : "Notif Test",
                    data : { test : "fesfsdfdsflkdmf" }
                }
            ]
            expo.sendPushNotificationsAsync(message).then( ticket => {
                res.send({ ticket : ticket })
            }).catch( err => {
                console.log("Erreur d'envoi")
                res.send({ err : "Erreur d'envoi" })
            })
        }
    })
})