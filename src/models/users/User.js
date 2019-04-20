const mongoose = require('mongoose');
const validator = require('validator');
const DBError = require('../../errors/DatabaseError');
const AppError = require('../../errors/AppError');

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
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
});

const findUser = (query, userQuery) => {
    return new Promise((resolve, reject) => {
        userQuery.findOne(query, (error, user) => {
            if (error) {
                return reject(new DBError('Database Error', 500));
            }

            if (!user) {
                return reject(new AppError('User not found', 404));
            }

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
            name: this.email,
            password: this.password
        }, (error, user) => {
            if (error) {
                return reject(new DBError('Database error', 500));
            }

            return resolve(user);
        });
    });
};

module.exports = mongoose.model('User', UserSchema);
