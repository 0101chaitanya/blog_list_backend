const fs = require("fs");
const path = require("path");

const User = require("../models/user");

const { Strategy, ExtractJwt } = require("passport-jwt");

//const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync("../id_rsa_priv.pem", "utf8");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
}