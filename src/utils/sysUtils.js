const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'sysUtils-004' });
const { allNotNull, trimAsWhitespace } = require('./objectUtils');
const commons = require('../commons/commons');

async function createDirectories(pathName) {

    if (!allNotNull(pathName)) {
        return false;
    }

    pathName = trimAsWhitespace(pathName);

    const __dirname = commons.paths.resolve();
    pathName = pathName.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension

    await commons.fs.mkdir(commons.paths.resolve(__dirname, pathName), { recursive: true }, error => {
        if (error) {
            loggerWinston.error(error);
            return false;
        } else {
            loggerWinston.info(`createDirectories::status = ${pathName} has been created successfully`);
            return true;
        }
    });
}

async function removeDirectories(pathName) {
    if (commons.fs.existsSync(pathName)) {
        await commons.fs.readdirSync(pathName).forEach(function (entry) {
            let entriesPath = commons.paths.join(pathName, entry);
            if (commons.fs.lstatSync(entriesPath).isDirectory()) {
                removeDirectories(entriesPath);
            } else {
                commons.fs.unlinkSync(entriesPath);
            }
        });
        await commons.fs.rmdirSync(pathName);
    }
}

async function isDirectoryExisted(pathName) {

    if (!allNotNull(pathName)) {
        return false;
    }

    return commons.fs.existsSync(pathName);
}

async function isDirectoriesExisted(...paths) {

    if (!allNotNull(paths)) {
        return false;
    }

    paths.forEach(path => isDirectoryExisted(path));
}

module.exports = {
    createDirectories,
    removeDirectories,
    isDirectoryExisted,
    isDirectoriesExisted
}