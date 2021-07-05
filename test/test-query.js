/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const { Grakn } = require("grakn-client/Grakn");
const { SessionType } = require("grakn-client/api/GraknSession");
const { TransactionType } = require("grakn-client/api/GraknTransaction");

async function run() {
    const client = Grakn.coreClient("localhost:1729");
    try {
        const dbs = await client.databases().all();
        console.log(`get databases - SUCCESS - the databases are [${dbs}]`);
        const grakn = dbs.find(x => x.name() === "grakn");
        if (grakn) {
            await grakn.delete();
            console.log(`delete database - SUCCESS - 'grakn' has been deleted`);
        }
        await client.databases().create("grakn");
        console.log("create database - SUCCESS - 'grakn' has been created");
    } catch (err) {
        console.error(`database operations - ERROR: ${err.stack || err}`);
        client.close();
        return;
    }

    let session;
    let tx;
    try {
        session = await client.session("grakn", SessionType.SCHEMA);
        tx = await session.transaction(TransactionType.WRITE);
        await tx.query().define(`define
        ## PROPERTIES

        family sub relation,
          abstract,
          plays object:object_to;
  
        big-family sub family,
          abstract;
      
        object sub big-family,
          relates object_from,
          relates object_to;
      `);
        await tx.commit();
        await tx.close();
        await session.close();
        console.log("define query - SUCCESS");
    } catch (err) {
        console.error(`define query - ERROR: ${err.stack || err}`);
        await tx.close();
        await session.close();
        client.close();
        return;
    }

    client.close();
}

run();
