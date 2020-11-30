const { GraknClient } = require("grakn-client/rpc/GraknClient");
const { Grakn } = require("grakn-client/Grakn");
const SessionType = Grakn.SessionType;
const TransactionType = Grakn.TransactionType;

async function dothetests() {
    const client = new GraknClient();
    //await client.databases().create("thisisadatabase");
    const session = await client.session("thisisadatabase", SessionType.SCHEMA);
    const transaction = await session.transaction(TransactionType.WRITE);

    const stoneLion = await transaction.concepts().putEntityType("lion");
    await transaction.close()
    await session.close()
    client.close();
    console.log(stoneLion);
}

dothetests();