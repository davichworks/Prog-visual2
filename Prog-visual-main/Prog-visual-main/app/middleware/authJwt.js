const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = require('../models/user.model.js');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send(
            {
                message: "No token provided"
            });
    }

    jwt.verify(token, config.secret, (err,decoded) => {
        if(err){d
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        req.userId = decoded.id;
        next();
    });
};


isAdmin = (req, res, next) => {
    User.findById(req.userId).then(user => {
        if (user && user.rol === "admin") {
            next();
            return;
        }
        res.status(403).send({
            message: "Require admin role"
        });
    }).catch(error => {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    });
};

isModerator = (req, res, next) => {
    User.findById(req.userId).then(user => {
        if (user && user.rol === "moderator") {
            next();
            return;
        }
        res.status(403).send({
            message: "Require MOD role"
        });
    }).catch(error => {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findById(req.userId).then(user => {
        if (user && (user.rol === "moderator" || user.rol === "admin")) {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Moderator or ADMIN role"
        });
    }).catch(error => {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
  };
  module.exports = authJwt;