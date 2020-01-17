
import GetRules from './GetRules'

const validator = (data, rule) => {

    let regexForMail = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');
    let regexForName = new RegExp('[^a-z]+', 'i');
    const err = {};


    Object.keys(data).forEach((key) => {

        const dataValue = data[key];
        err[key] = {};

        GetRules(rule[key]).forEach((ruleKey) => {

            if (typeof ruleKey === 'object') {
                Object.entries(ruleKey).forEach(([key1, value]) => {
                    switch (key1) {
                        case "max":
                            if (dataValue.length > +value) {
                                err[key].max = `name must be maximum ${value} letters`
                            }
                            break;
                        case "min":
                            if (dataValue.length <= +value) {
                                err[key].min = `password must be ${value} letters or figures`
                            }
                            break;
                        default:
                            return true
                    }
                });

            }
            switch (ruleKey) {
                case "required":
                    if (dataValue.length === 0) {
                        err[key].required = "error required"
                    }
                    break;
                case "email":
                    if (!regexForMail.test(dataValue)) {
                        err[key].email = "email is wrong format";
                    }
                    break;
                case "letters":
                    if (regexForName.test(dataValue)) {
                        err[key].letters = "must be only letters";
                    }
                    break;
                case "number":
                    if(isNaN(dataValue)){
                        err[key].number = "must be only numbers";
                    }
                    break;
                default:
                    return true
            }
        })
    });


    const isEmpty = () => {
        for (let i in err) {
            if (Object.keys(err[i]).length === 0) {
                return true
            } else {
                return false

            }
        }
    };


    return [err, isEmpty()]


};

export default validator;