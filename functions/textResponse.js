const recordResponse = require("./utils/recordResponse");

exports.handler = async (event) => {
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "POST request only" }),
        };
    } else if (event.httpMethod === "POST") {
        // return await recordResponse(event);
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "Success" }),
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
