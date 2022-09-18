const takeImage = require("./methods/takeImage");
const replaceParams = require("./methods/replaceParams");
const jsonToQueryString = require("./methods/jsonToQueryString");

const template2Image = async (template = "", params = {}, elementId) => {
    try {
        if (typeof template === "string") {
            let replacedTemplate = template.url ? template : "";

            const splitedTemplate = template.split("}}");
            if (!splitedTemplate.length) replacedTemplate = template;

            splitedTemplate.forEach((templatePart, index) => {
                const isLastPart = index + 1 === splitedTemplate.length;
                replacedTemplate += replaceParams(`${templatePart} ${!isLastPart ? "}}" : ""}`, params);
            });

            return await takeImage(replacedTemplate, elementId);
        };

        if (typeof template === "object" && template.url) {
            const query = jsonToQueryString(params);
            return await takeImage({ url: `${template.url}${query}` }, elementId);
        };
    } catch (error) {
        console.error(error);
    };
};

module.exports = template2Image;