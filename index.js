const takeImage = require("./methods/takeImage");

const template2Image = async (template = "", params = {}, elementId) => {
    try {
        let replacedTemplate = template;

        const paramsKeys = Object.keys(params);
        paramsKeys.forEach((key) => replacedTemplate = replacedTemplate.replace(new RegExp(`{{.*?${key}.*?}}`, "gm"), params[key]));

        return await takeImage(replacedTemplate, elementId);
    } catch (error) {
        console.error(error);
    };
};

module.exports = template2Image;