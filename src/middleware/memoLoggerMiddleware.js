const commons = require('../commons/commons');

const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

exports.writeHttpRequestTails = (request, response, next) => {

    // begin::Declare path to save file log request
    const path = './logs/http_request.log';

    let current_date = new Date();
    let formatted_date =
        current_date.getFullYear() +
        "-" +
        (current_date.getMonth() + 1) +
        "-" +
        current_date.getDate() +
        " " +
        current_date.getHours() +
        ":" +
        current_date.getMinutes() +
        ":" +
        current_date.getSeconds();

    // begin::List attributes http    
    let method = request.method;
    let url = request.url;
    let status = response.statusCode;

    // begin::Calculate http request
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
    let log = `[${commons.chalk.blue(formatted_date)}]  ${method}:${url} ${status} ${commons.chalk.red(durationInMilliseconds.toLocaleString() + "ms")}`;
    console.log(log);
    log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;

    // begin::Save to file
    commons.fs.appendFile(path, log + '\n', error => {
        if (error) {
            console.error(error);
        }
    });

    next();
}


exports.logHttpRequestTails = (request, response, next) => {

    next();
}