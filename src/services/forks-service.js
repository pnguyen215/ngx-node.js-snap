const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'forks-service-003' });
const commons = require('../commons/commons');
const validationUrl = commons.validation_url;
const { allNotNull, trimAsWhitespace } = require('./../utils/objectUtils');
const { removeDirectories, isDirectoryExisted } = require('./../utils/sysUtils');
const {
    jsonResponseTypeMessage,
    jsonResponseType1,
    jsonResponseType2,
    jsonResponseType3,
    jsonResponseType4
} = require('./base-service');


exports.createOne = async (request, response, next) => {

    loggerWinston.info(`forksService::createOne = ${JSON.stringify(request.body, null, 2)}`);

    const url = request.body.url;
    const path = request.body.path;

    if (!allNotNull(url) || !validationUrl.isUri(url)) {
        jsonResponseType3(
            response,
            'Url is required valid',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!allNotNull(path)) {
        jsonResponseType3(
            response,
            'Path is required',
            commons.httpStatus.BAD_REQUEST);
    }

    url = trimAsWhitespace(url);

    if (await isDirectoryExisted(path)) {
        await removeDirectories(path);
    }

    let options = {
        urls: [url],
        directory: path,
        request: {
            gzip: true
        },
    };

    commons.scrape(options).then((result) => {
        jsonResponseType2(response, 'Forks has been archived successfully', request.body, commons.httpStatus.OK);
    }).catch((error) => {
        jsonResponseType2(response, error.stack, request.body, commons.httpStatus.INTERNAL_SERVER_ERROR);
    })

}