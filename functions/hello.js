exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ msg: "hello world - 2/12/2020" }),
    };
};
