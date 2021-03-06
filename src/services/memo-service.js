const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'memo-service-001' });
const commons = require('../commons/commons');
const {
    jsonResponseTypeMessage,
    jsonResponseType1,
    jsonResponseType2,
    jsonResponseType3,
    jsonResponseType4
} = require('./base-service');


exports.saySomething = (request, response, next) => {
    const bots = [
        {
            username: 'bot1',
            id: 1
        },
        {
            username: 'bot2',
            id: 2
        },
        {
            username: 'bot3',
            id: 3
        },
    ];

    loggerWinston.info('saySomething::log memo function via winston with data', bots);
    jsonResponseType1(response, "This is list of bots", bots);
    /*
    jsonResponseTypeMessage(response, 'This is text message');
    jsonResponseType1(response, "This is Message", arrays);
    jsonResponseType2(response, "This is Message", arrays, commons.httpStatus.OK);
    jsonResponseType3(response, "This is Message", commons.httpStatus.OK);
    jsonResponseType4(response, arrays, commons.httpStatus.OK);
    */
}