const takeImage = require("./methods/takeImage");
const replaceParams = require("./methods/replaceParams");

const template2Image = async (template = "", params = {}, elementId) => {
    try {
        let replacedTemplate = "";

        const splitedTemplate = template.split("}}");
        if (!splitedTemplate.length) replacedTemplate = template;
        
        splitedTemplate.forEach((templatePart) => {
            replacedTemplate += replaceParams(`${templatePart}}}`, params);
        });

        return await takeImage(replacedTemplate, elementId);
    } catch (error) {
        console.error(error);
    };
};

module.exports = template2Image;