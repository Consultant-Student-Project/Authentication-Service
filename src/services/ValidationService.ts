import { SignUpFormData } from '../interfaces/formTypes';
import * as validatorBase from 'validator';
const validator = validatorBase.default;

export default class ValidationService {

    public validateFormData(formData: SignUpFormData): boolean {
        return validator.isAlphanumeric(formData.username) &&
            validator.isAlpha(formData.firstname) &&
            validator.isAlpha(formData.lastname) &&
            validator.isEmail(formData.email) &&
            validator.isAlphanumeric(formData.password);
    }

}

