// Read email info

import * as path from 'path'
import * as fs from 'fs'

const emailInfoPath = path.join(__dirname, '..', 'emailInfo.csv');
const email = fs.readFileSync(emailInfoPath).toString().split(',')[0];
export default {
    username: 'testuser12',
    password: 'testuser12',
    email,
    firstname: 'test',
    lastname: 'user',
};