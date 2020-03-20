import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
});

userSchema.pre('save', function (next) {
    const user: any = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (hashErr, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.isPasswordMatches = function (passwd, callback) {
    const user = this;
    bcrypt.compare(passwd, user.password, function (err, isMatch) {
        if (err) {
            return callback(false);
        }
        callback(isMatch);
    });
};


const User = mongoose.model('User', userSchema);

export default User;
