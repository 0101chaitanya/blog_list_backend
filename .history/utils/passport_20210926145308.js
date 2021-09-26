const fs = require("fs");
const path = require("path");

const User = require("../models/user");

const { Strategy, ExtractJwt } = require("passport-jwt");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");