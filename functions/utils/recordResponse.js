require("dotenv").config();

const { responseStatus, slackNotification } = require("./helpers");

const AirtableApi = require("./airtable");
const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

module.exports = async (event) => {
    try {
        const res = JSON.parse(event.body);
        const { full_name, workflow, message, contact_id, location } = res;

        // if (workflow.name === "Record Response") {
        //     return {
        //         statusCode: 200,
        //         body: JSON.stringify({ res }),
        //     };
        // }

        const client = await Airtable.getLocation(location.id);

        let contact = await Airtable.findTextContactByID(client["Base ID"], contact_id);

        if (!contact) {
            contact = await Airtable.findTextContact(client["Base ID"], full_name, workflow.name);
        }

        if (contact && !("Responded" in contact)) {
            const Status = responseStatus(message.body);

            const updatedFields = {
                Responded: true,
                Response: message.body,
                "Response Date": new Date(),
                Status,
                Campaign: workflow.name,
            };

            await Airtable.updateContact(client["Base ID"], contact.recordID, updatedFields);

            console.log(
                `Client: ${client.Client}\nWorkflow: ${workflow.name} \nFrom: ${full_name} \nResponse: ${message.body}\n`
            );

            if (Status === null) {
                await slackNotification(
                    process.env.SLACK_TEXT_NOTIFICATIONS,
                    `\n*Client:* ${client.Client}\n*Workflow:* ${workflow.name} \n*From:* ${full_name} \n*Response:* ${message.body}\n`,
                    message.body,
                    `https://app.gohighlevel.com/location/${location.id}/conversations`
                );
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ res }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: error }),
        };
    }
};
