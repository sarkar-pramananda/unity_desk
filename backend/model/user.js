const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        next();
    }
    catch(err){
        next(err)
    }
    
});

module.exports = mongoose.model("user", UserSchema)