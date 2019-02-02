function generateXp() {
    let min = 10;
    let max = 30;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    generateXp
};