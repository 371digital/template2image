const replaceParams = (template = "", params = {}) => {
    let replacedTemplate = template;
    const paramsKeys = Object.keys(params);

    for (const index in paramsKeys) {
        const key = paramsKeys[index];
        const regex = new RegExp(`{{.*?${key}.*?}}`, "g");
        replacedTemplate = replacedTemplate.replace(regex, params[key])
    }
    
    return replacedTemplate;
};

module.exports = replaceParams;