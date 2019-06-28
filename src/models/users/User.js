const mongoose = require('mongoose');
const httpErrors = require('http-errors');
const log = require('../../config/logger');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    coutry: {
        type: String,
        required: false,
        trim: true,
        uppercase: true
    },
    link: {
        type: String,
        required: false,
        trim: true
    }
});

const findUser = (query, userQuery) => {
    return new Promise((resolve, reject) => {
        userQuery.findOne(query, (error, user) => {
            if (error) {
                return reject(httpErrors(500, `DB Error: ${error.message}`));
            }

            if (!user) {
                return reject(httpErrors(404, 'User not found'));
            }

            log.info(`User ${user.email} logged`);
            return resolve(user);
        });
    });
};

UserSchema.methods.findUserById = function findUserById() {
    return findUser({ _id: this._id }, this.model('User'));
};

UserSchema.methods.findUserByEmail = function findUserByEmail() {
    return findUser({ email: this.email }, this.model('User'));
};

UserSchema.methods.createUser = function createUser() {
    return new Promise((resolve, reject) => {
        this.model('User').create({
            email: this.email,
            name: this.name,
            password: this.password
        }, (error, user) => {
            if (error) {
                return reject(httpErrors(500, error.message));
            }

            log.build(log.lv.ERROR, `User ${user.email} created`);
            return resolve(user);
        });
    });
};

module.exports = mongoose.model('User', UserSchema);
