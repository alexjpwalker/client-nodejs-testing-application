const { Grakn } = require("grakn-client/Grakn");

// Load Grakn databases
const client = Grakn.coreClient(Grakn.DEFAULT_ADDRESS);
const listDBs = client.databases().all();

// Create heading node
const heading = document.createElement('h1')
heading.textContent = "Loading databases...";
listDBs.then(databases => {
    heading.textContent = databases.toString();
    // Append heading node to the DOM
    const app = document.querySelector('#root')
    app.append(heading)
});
