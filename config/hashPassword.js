const bcrypt = require('bcryptjs')

const hashedPassword = async (password) => await bcrypt.hash(password, 10);

module.exports = hashedPassword