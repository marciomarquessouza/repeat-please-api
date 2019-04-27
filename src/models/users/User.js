const mongoose = require('mongoose');
const validator = require('validator');
const DBError = require('../../errors/DatabaseError');
const AppError = require('../../errors/AppError');
const logger = require('../../config/winston');

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
                logger.error('models.users.user.email.invalid_email');
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
                logger.error('models.users.user.findUser.invalid_email');
                logger.error(error);

                return reject(new DBError('Database Error', 500));
            }

            if (!user) {
                logger.info('models.users.user.findUser.not_found');

                return reject(new AppError('User not found', 404));
            }

            logger.info('models.users.user.findUser.user_logged');
            logger.info(`User ${user.email} logged`);

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
                logger.error('models.users.user.createUser.create_error');
                logger.error(error);

                return reject(new DBError('Database error', 500));
            }

            logger.info('models.users.user.createUser.create_user');
            logger.info(`User ${user.email} created`);

            return resolve(user);
        });
    });
};

module.exports = mongoose.model('User', UserSchema);
