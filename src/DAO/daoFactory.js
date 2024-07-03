const userDaoMongo = require('./user.dao.mongo');
class DaoFactory {
    static getUserDao() {
        const daoType = process.argv[2] || 'mongo';
        switch (daoType) {
            case 'mongo':
                return userDaoMongo;
            // case 'other':
            //     return userDaoOther;
            default:
                throw new Error('DAO type not supported');
        }
    }
}

module.exports = DaoFactory;
