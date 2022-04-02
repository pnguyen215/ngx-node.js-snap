const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'sys-service-003' });
const commons = require('../commons/commons');
const { allNotNull } = require('./../utils/objectUtils');
const { isDirectoryExisted, createDirectories } = require('./../utils/sysUtils');
const {
    jsonResponseTypeMessage,
    jsonResponseType1,
    jsonResponseType2,
    jsonResponseType3,
    jsonResponseType4
} = require('./base-service');


exports.downloadZip = async (request, response, next) => {

}

exports.zipDirectories = async (request, response, next) => {

    const path = request.body.path;
    const zipPath = request.body.zipPath;

    if (!allNotNull(path)) {
        jsonResponseType3(
            response,
            'Path is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!allNotNull(zipPath)) {
        jsonResponseType3(
            response,
            'zipPath is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(path))) {
        jsonResponseType3(
            response,
            'Path not found',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(zipPath))) {
        await createDirectories(zipPath);
    }

    try {
        const zip = new commons.admZip();
        zip.addLocalFolder(path);
        zip.writeZip(zipPath);
        jsonResponseType2(response, 'Zip path has been created successfully', request.body, commons.httpStatus.CREATED);
    } catch (error) {
        loggerWinston.error(`Can't zip, cause: ${error}`);
        jsonResponseType2(response, error.stack, request.body, commons.httpStatus.INTERNAL_SERVER_ERROR);
    }

}