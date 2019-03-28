module.exports = (body, requireds, callback) => {
    const hasAllRequireds = requireds.
    filter((required) => body[required] === undefined);

    return hasAllRequireds.length === 0 || callback(hasAllRequireds);
};
