class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async findByEmail(email) {
        return await this.dao.findByEmail(email);
    }

    async createUser(userData) {
        return await this.dao.createUser(userData);
    }
}

module.exports = UserRepository;
