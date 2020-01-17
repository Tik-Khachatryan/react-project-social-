// import React from 'react'

const getRules = (rule) => {
    return rule.split("|").reduce((acc, item) => {

        if (item.includes(":")) {
            const rulObj = {};
            const key = item.split(":")[0];
            rulObj[key] = item.split(":")[1];
            acc.push(rulObj)
        } else {
            acc.push(item)
        }

        return acc
    }, []);
};

export default getRules