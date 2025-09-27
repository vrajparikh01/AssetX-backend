const bigIntReplacer = (key, value) => {
    return typeof value === 'bigint' ? value.toString() : value;
};

module.exports = {
    bigIntReplacer,
};
