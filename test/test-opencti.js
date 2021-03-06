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

const { GraknClient } = require("grakn-client/rpc/GraknClient");
const { Grakn } = require("grakn-client/Grakn");
const { SessionType, TransactionType } = Grakn;

async function run() {
    const client = new GraknClient();
    try {
        const names = await client.databases().all();
        console.log(`get databases - SUCCESS - the databases are [${names}]`);
        if (names.includes("grakn")) {
            await client.databases().delete("grakn");
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
      
        # Common
        internal_id sub attribute, value string;
        standard_id sub attribute, value string;
        entity_type sub attribute, value string;
        created_at sub attribute, value datetime;
        i_created_at_day sub attribute, value string;
        i_created_at_month sub attribute, value string;
        i_created_at_year sub attribute, value string;
        updated_at sub attribute, value datetime;
        name sub attribute, value string;
        description sub attribute, value string;
        x_opencti_graph_data sub attribute, value string;
        issuer sub attribute, value string;
        revoked sub attribute, value boolean;
      
        # STIX Common
        spec_version sub attribute, value string;
        x_opencti_stix_ids sub attribute, value string;
        created sub attribute, value datetime;
        modified sub attribute, value datetime;
        confidence sub attribute, value long;
        lang sub attribute, value string;
      
        # STIX General
        first_seen sub attribute, value datetime;
        i_first_seen_day sub attribute, value string;
        i_first_seen_month sub attribute, value string;
        i_first_seen_year sub attribute, value string;
        last_seen sub attribute, value datetime;
        i_last_seen_day sub attribute, value string;
        i_last_seen_month sub attribute, value string;
        i_last_seen_year sub attribute, value string;
      
        # Internal Relationships
        grant sub attribute, value string;
      
        # STIX Core Relationship
        relationship_type sub attribute, value string;
        start_time sub attribute, value datetime;
        i_start_time_day sub attribute, value string;
        i_start_time_month sub attribute, value string;
        i_start_time_year sub attribute, value string;
        stop_time sub attribute, value datetime;
        i_stop_time_day sub attribute, value string;
        i_stop_time_month sub attribute, value string;
        i_stop_time_year sub attribute, value string;
      
        # STIX Sighting Relationship
        attribute_count sub attribute, value long;
        x_opencti_negative sub attribute, value boolean;
      
        # Internal Entities
        platform_title sub attribute, value string;
        platform_language sub attribute, value string;
        platform_email sub attribute, value string;
        platform_url sub attribute, value string;
        title sub attribute, value string;
        timestamp sub attribute, value long;
        lastRun sub attribute, value string;
        uuid sub attribute, value string;
        duration sub attribute, value string;
        firstname sub attribute, value string;
        lastname sub attribute, value string;
        user_email sub attribute, value string;
        password sub attribute, value string;
        language sub attribute, value string;
        external sub attribute, value boolean;
        default_assignation sub attribute, value boolean;
        attribute_order sub attribute, value double;
        active sub attribute, value boolean;
        auto sub attribute, value boolean;
        connector_type sub attribute, value string;
        connector_scope sub attribute, value string;
        connector_state sub attribute, value string;
        connector_user_id sub attribute, value string;
        connector_state_reset sub attribute, value boolean;
        workspace_type sub attribute, value string;
        workspace_data sub attribute, value string;
      
        # STIX Object
        value sub attribute, value string;
        url sub attribute, value string;
      
        # STIX Meta Objects
        definition_type sub attribute, value string;
        definition sub attribute, value string;
        x_opencti_order  sub attribute, value long;
        x_opencti_color sub attribute, value string;
        color sub attribute, value string;
        source_name sub attribute, value string;
        hash sub attribute, value string;
        external_id sub attribute, value string;
        kill_chain_name sub attribute, value string;
        phase_name sub attribute, value string;
      
        # STIX Core Objects
      
        # STIX Domain Object
        aliases sub attribute, value string;
        i_aliases_ids sub attribute, value string;
        x_opencti_aliases sub attribute, value string;
        x_mitre_detection sub attribute, value string;
        x_mitre_platforms sub attribute, value string;
        x_mitre_permissions_required sub attribute, value string;
        x_mitre_id sub attribute, value string;
        contact_information sub attribute, value string;
        x_opencti_firstname sub attribute, value string;
        x_opencti_lastname sub attribute, value string;
        x_opencti_organization_type sub attribute, value string;
        x_opencti_reliability sub attribute, value string;
        latitude sub attribute, value double;
        longitude sub attribute, value double;
        precision sub attribute, value double;
        objective sub attribute, value string;
        hashes sub attribute, value string;
        pattern_type sub attribute, value string;
        pattern_version sub attribute, value string;
        pattern sub attribute, value string;
        indicator_types sub attribute, value string;
        valid_from sub attribute, value datetime;
        i_valid_from_day sub attribute, value string;
        i_valid_from_month sub attribute, value string;
        i_valid_from_year sub attribute, value string;
        valid_until sub attribute, value datetime;
        i_valid_until_day sub attribute, value string;
        i_valid_until_month sub attribute, value string;
        i_valid_until_year sub attribute, value string;
        x_opencti_score sub attribute, value long;
        x_opencti_detection sub attribute, value boolean;
        x_opencti_main_observable_type sub attribute, value string;
        infrastructure_types sub attribute, value string;
        goals sub attribute, value string;
        resource_level sub attribute, value string;
        primary_motivation sub attribute, value string;
        secondary_motivations sub attribute, value string;
        street_address sub attribute, value string;
        postal_code sub attribute, value string;
        malware_types sub attribute, value string;
        is_family sub attribute, value boolean;
        architecture_execution_envs sub attribute, value string;
        implementation_languages sub attribute, value string;
        capabilities sub attribute, value string;
        attribute_abstract  sub attribute, value string;
        content sub attribute, value string;
        authors sub attribute, value string;
        first_observed sub attribute, value datetime;
        last_observed sub attribute, value datetime;
        number_observed sub attribute, value long;
        explanation sub attribute, value string;
        opinion sub attribute, value string;
        report_types sub attribute, value string;
        x_opencti_report_status sub attribute, value long;
        published sub attribute, value datetime;
        i_published_day sub attribute, value string;
        i_published_month sub attribute, value string;
        i_published_year sub attribute, value string;
        threat_actor_types sub attribute, value string;
        sophistication sub attribute, value string;
        personal_motivations sub attribute, value string;
        roles sub attribute, value string;
        tool_types sub attribute, value string;
        tool_version sub attribute, value string;
        x_opencti_base_score sub attribute, value double;
        x_opencti_base_severity sub attribute, value string;
        x_opencti_attack_vector sub attribute, value string;
        x_opencti_integrity_impact sub attribute, value string;
        x_opencti_availability_impact sub attribute, value string;
        identity_class sub attribute, value string;
        x_opencti_location_type sub attribute, value string;
      
        # STIX Cyber Observables
        x_opencti_description sub attribute, value string;
        mime_type sub attribute, value string;
        payload_bin sub attribute, value string;
        encryption_algorithm sub attribute, value string;
        decryption_key sub attribute, value string;
        number sub attribute, value long;
        rir sub attribute, value string;
        path sub attribute, value string;
        path_enc sub attribute, value string;
        ctime sub attribute, value datetime;
        mtime sub attribute, value datetime;
        atime sub attribute, value datetime;
        display_name sub attribute, value string;
        is_multipart sub attribute, value boolean;
        attribute_date sub attribute, value datetime;
        content_type sub attribute, value string;
        message_id sub attribute, value string;
        subject sub attribute, value string;
        received_lines sub attribute, value string;
        body sub attribute, value string;
        content_disposition sub attribute, value string;
        size sub attribute, value long;
        extensions sub attribute, value string;
        name_enc sub attribute, value string;
        magic_number_hex sub attribute, value string;
        start sub attribute, value datetime;
        end sub attribute, value datetime;
        is_active sub attribute, value boolean;
        protocols sub attribute, value string;
        src_port sub attribute, value long;
        dst_port sub attribute, value long;
        src_byte_count sub attribute, value long;
        dst_byte_count sub attribute, value long;
        src_packets sub attribute, value long;
        dst_packets sub attribute, value long;
        is_hidden sub attribute, value boolean;
        pid sub attribute, value long;
        created_time sub attribute, value datetime;
        cwd sub attribute, value string;
        command_line sub attribute, value string;
        environment_variables sub attribute, value string;
        cpe sub attribute, value string;
        swid sub attribute, value string;
        languages sub attribute, value string;
        vendor sub attribute, value string;
        version sub attribute, value string;
        user_id sub attribute, value string;
        credential sub attribute, value string;
        account_login sub attribute, value string;
        account_type sub attribute, value string;
        is_service_account sub attribute, value boolean;
        is_privileged sub attribute, value boolean;
        can_escalate_privs sub attribute, value boolean;
        is_disabled sub attribute, value boolean;
        account_created sub attribute, value datetime;
        account_expires sub attribute, value datetime;
        credential_last_changed sub attribute, value datetime;
        account_first_login sub attribute, value datetime;
        account_last_login sub attribute, value datetime;
        attribute_key sub attribute, value string;
        modified_time sub attribute, value datetime;
        number_of_subkeys sub attribute, value double;
        data sub attribute, value string;
        data_type sub attribute, value string;
        is_self_signed sub attribute, value boolean;
        serial_number sub attribute, value string;
        signature_algorithm sub attribute, value string;
        validity_not_before sub attribute, value datetime;
        validity_not_after sub attribute, value datetime;
        subject_public_key_algorithm sub attribute, value string;
        subject_public_key_modulus sub attribute, value string;
        subject_public_key_exponent sub attribute, value string;
        basic_constraints sub attribute, value string;
        name_constraints sub attribute, value string;
        policy_constraints sub attribute, value string;
        key_usage sub attribute, value string;
        extended_key_usage sub attribute, value string;
        subject_key_identifier sub attribute, value string;
        authority_key_identifier sub attribute, value string;
        subject_alternative_name sub attribute, value string;
        issuer_alternative_name sub attribute, value string;
        subject_directory_attributes sub attribute, value string;
        crl_distribution_points sub attribute, value string;
        inhibit_any_policy sub attribute, value string;
        private_key_usage_period_not_before sub attribute, value datetime;
        private_key_usage_period_not_after sub attribute, value datetime;
        certificate_policies sub attribute, value string;
        policy_mappings sub attribute, value string;
      
        ## RELATIONS
      
        basic-relationship sub relation,
          abstract,
          owns internal_id @key,
          owns standard_id @key,
          owns entity_type,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at;
      
        # Internal relations
        internal-relationship sub basic-relationship,
          abstract;
      
        authorized-by sub internal-relationship,
          relates authorized-by_from,
          relates authorized-by_to;
      
        accesses-to sub internal-relationship,
          relates accesses-to_from,
          relates accesses-to_to;
      
        migrates sub internal-relationship,
          relates migrates_from,
          relates migrates_to;
      
        member-of sub internal-relationship,
          relates member-of_from,
          relates member-of_to;
      
        allowed-by sub internal-relationship,
          owns grant,
          relates allowed-by_from,
          relates allowed-by_to;
      
        has-role sub internal-relationship,
          relates has-role_from,
          relates has-role_to;
      
        has-capability sub internal-relationship,
          relates has-capability_from,
          relates has-capability_to;
      
        # STIX relations
        stix-relationship sub basic-relationship,
          abstract,
          owns x_opencti_stix_ids,
          owns spec_version,
          owns revoked,
          owns confidence,
          owns lang,
          owns created,
          owns modified,
          plays object:object_to;
      
        # STIX Core Relationships
        stix-core-relationship sub stix-relationship,
          abstract,
          owns relationship_type,
          owns description,
          owns start_time,
          owns i_start_time_day,
          owns i_start_time_month,
          owns i_start_time_year,
          owns stop_time,
          owns i_stop_time_day,
          owns i_stop_time_month,
          owns i_stop_time_year,
          plays created-by:created-by_from,
          plays object-marking:object-marking_from,
          plays object-label:object-label_from,
          plays external-reference:external-reference_from,
          plays duplicate-of:duplicate-of_from,
          plays derived-from:derived-from_from,
          plays related-to:related-to_from,
          plays duplicate-of:duplicate-of_to,
          plays derived-from:derived-from_to,
          plays related-to:related-to_to;
      
        delivers sub stix-core-relationship,
          relates delivers_from,
          relates delivers_to,
          plays indicates:indicates_to;
      
        targets sub stix-core-relationship,
          relates targets_from,
          relates targets_to,
          plays located-at:located-at_from;
      
        uses sub stix-core-relationship,
          relates uses_from,
          relates uses_to,
          plays kill-chain-phase:kill-chain-phase_from,
          plays indicates:indicates_to;
      
        attributed-to sub stix-core-relationship,
          relates attributed-to_from,
          relates attributed-to_to;
      
        compromises sub stix-core-relationship,
          relates compromises_from,
          relates compromises_to;
      
        originates-from sub stix-core-relationship,
          relates originates-from_from,
          relates originates-from_to;
      
        investigates sub stix-core-relationship,
          relates investigates_from,
          relates investigates_to;
      
        mitigates sub stix-core-relationship,
          relates mitigates_from,
          relates mitigates_to;
      
        located-at sub stix-core-relationship,
          relates located-at_from,
          relates located-at_to;
      
        indicates sub stix-core-relationship,
          plays kill-chain-phase:kill-chain-phase_from,
          relates indicates_from,
          relates indicates_to;
      
        based-on sub stix-core-relationship,
          relates based-on_from,
          relates based-on_to;
      
        communicates-with sub stix-core-relationship,
          relates communicates-with_from,
          relates communicates-with_to,
          plays indicates:indicates_to;
      
        consists-of sub stix-core-relationship,
          relates consists-of_from,
          relates consists-of_to;
      
        controls sub stix-core-relationship,
          relates controls_from,
          relates controls_to;
      
        relation-has sub stix-core-relationship,
          relates relation-has_from,
          relates relation-has_to;
      
        hosts sub stix-core-relationship,
          relates hosts_from,
          relates hosts_to;
      
        relation-owns sub stix-core-relationship,
          relates owns_from,
          relates owns_to;
      
        authored-by sub stix-core-relationship,
          relates authored-by_from,
          relates authored-by_to;
      
        beacons-to sub stix-core-relationship,
          relates beacons-to_from,
          relates beacons-to_to,
          plays indicates:indicates_to;
      
        exfiltrate-to sub stix-core-relationship,
          relates exfiltrate-to_from,
          relates exfiltrate-to_to;
      
        downloads sub stix-core-relationship,
          relates downloads_from,
          relates downloads_to;
      
        drops sub stix-core-relationship,
          plays kill-chain-phase:kill-chain-phase_from,
          relates drops_from,
          relates drops_to;
      
        exploits sub stix-core-relationship,
          plays kill-chain-phase:kill-chain-phase_from,
          relates exploits_from,
          relates exploits_to,
          plays indicates:indicates_to;
      
        variant-of sub stix-core-relationship,
          relates variant-of_from,
          relates variant-of_to;
      
        characterizes sub stix-core-relationship,
          relates characterizes_from,
          relates characterizes_to;
      
        analysis-of sub stix-core-relationship,
          relates analysis-of_from,
          relates analysis-of_to;
      
        static-analysis-of sub stix-core-relationship,
          relates static-analysis-of_from,
          relates static-analysis-of_to;
      
        dynamic-analysis-of sub stix-core-relationship,
          relates dynamic-analysis-of_from,
          relates dynamic-analysis-of_to;
      
        impersonates sub stix-core-relationship,
          relates impersonates_from,
          relates impersonates_to;
      
        remediates sub stix-core-relationship,
          relates remediates_from,
          relates remediates_to;
      
        related-to sub stix-core-relationship,
          relates related-to_from,
          relates related-to_to;
      
        derived-from sub stix-core-relationship,
          relates derived-from_from,
          relates derived-from_to;
      
        duplicate-of sub stix-core-relationship,
          relates duplicate-of_from,
          relates duplicate-of_to;
      
        part-of sub stix-core-relationship,
          relates part-of_from,
          relates part-of_to;
      
        subtechnique-of sub stix-core-relationship,
          relates subtechnique-of_from,
          relates subtechnique-of_to;
      
        revoked-by sub stix-core-relationship,
          relates revoked-by_from,
          relates revoked-by_to;
      
        # STIX Sighting Relationships
        stix-sighting-relationship sub stix-relationship,
          owns description,
          owns first_seen,
          owns i_first_seen_day,
          owns i_first_seen_month,
          owns i_first_seen_year,
          owns last_seen,
          owns i_last_seen_day,
          owns i_last_seen_month,
          owns i_last_seen_year,
          owns attribute_count,
          owns x_opencti_negative,
          plays created-by:created-by_from,
          plays object-marking:object-marking_from,
          plays object-label:object-label_from,
          plays external-reference:external-reference_from,
          relates stix-sighting-relationship_from,
          relates stix-sighting-relationship_to;
      
        # STIX Meta Relationships
        stix-meta-relationship sub stix-relationship,
          abstract;
      
        created-by sub stix-meta-relationship,
          relates created-by_from,
          relates created-by_to;
      
        object-marking sub stix-meta-relationship,
          relates object-marking_from,
          relates object-marking_to;
      
        object sub stix-meta-relationship,
          relates object_from,
          relates object_to;
      
        # STIX Internal Meta Relationships
        internal-meta-relationship sub stix-meta-relationship,
          abstract;
      
        object-label sub stix-meta-relationship,
          relates object-label_from,
          relates object-label_to;
      
        external-reference sub internal-meta-relationship,
          relates external-reference_from,
          relates external-reference_to;
      
        kill-chain-phase sub internal-meta-relationship,
          relates kill-chain-phase_from,
          relates kill-chain-phase_to;
      
        # STIX Cyber Observable Relationships
        stix-cyber-observable-relationship sub stix-relationship,
          abstract,
          owns relationship_type,
          owns start_time,
          owns i_start_time_day,
          owns i_start_time_month,
          owns i_start_time_year,
          owns stop_time,
          owns i_stop_time_day,
          owns i_stop_time_month,
          owns i_stop_time_year;
      
        operating-system sub stix-cyber-observable-relationship,
          relates operating-system_from,
          relates operating-system_to;
      
        sample sub stix-cyber-observable-relationship,
          relates sample_from,
          relates sample_to;
      
        contains sub stix-cyber-observable-relationship,
          relates contains_from,
          relates contains_to;
      
        resolves-to sub stix-cyber-observable-relationship,
          relates resolves-to_from,
          relates resolves-to_to;
      
        belongs-to sub stix-cyber-observable-relationship,
          relates belongs-to_from,
          relates belongs-to_to;
      
        from sub stix-cyber-observable-relationship,
          relates from_from,
          relates from_to;
      
        sender sub stix-cyber-observable-relationship,
          relates sender_from,
          relates sender_to;
      
        to sub stix-cyber-observable-relationship,
          relates to_from,
          relates to_to;
      
        cc sub stix-cyber-observable-relationship,
          relates cc_from,
          relates cc_to;
      
        bcc sub stix-cyber-observable-relationship,
          relates bcc_from,
          relates bcc_to;
      
        raw-email sub stix-cyber-observable-relationship,
          relates raw-email_from,
          relates raw-email_to;
      
        body-raw sub stix-cyber-observable-relationship,
          relates body-raw_from,
          relates body-raw_to;
      
        parent-directory sub stix-cyber-observable-relationship,
          relates parent-directory_from,
          relates parent-directory_to;
      
        relation-content sub stix-cyber-observable-relationship,
          relates relation-content_from,
          relates relation-content_to;
      
        src sub stix-cyber-observable-relationship,
          relates src_from,
          relates src_to;
      
        dst sub stix-cyber-observable-relationship,
          relates dst_from,
          relates dst_to;
      
        src-payload sub stix-cyber-observable-relationship,
          relates src-payload_from,
          relates src-payload_to;
      
        dst-payload sub stix-cyber-observable-relationship,
          relates dst-payload_from,
          relates dst-payload_to;
      
        encapsulates sub stix-cyber-observable-relationship,
          relates encapsulates_from,
          relates encapsulates_to;
      
        encapsulated-by sub stix-cyber-observable-relationship,
          relates encapsulated-by_from,
          relates encapsulated-by_to;
      
        opened-connection sub stix-cyber-observable-relationship,
          relates opened-connection_from,
          relates opened-connection_to;
      
        creator-user sub stix-cyber-observable-relationship,
          relates creator-user_from,
          relates creator-user_to;
      
        image sub stix-cyber-observable-relationship,
          relates image_from,
          relates image_to;
      
        parent sub stix-cyber-observable-relationship,
          relates parent_from,
          relates parent_to;
      
        child sub stix-cyber-observable-relationship,
          relates child_from,
          relates child_to;
      
        # Interrnal Cyber Observable Relationships
        internal-cyber-observable-relationship sub stix-cyber-observable-relationship,
            abstract;
      
        body-multipart sub internal-cyber-observable-relationship,
          relates body-multipart_from,
          relates body-multipart_to;
      
        values sub internal-cyber-observable-relationship,
          relates values_from,
          relates values_to;
      
        x509-v3-extensions sub internal-cyber-observable-relationship,
          relates x509-v3-extensions_from,
          relates x509-v3-extensions_to;
      
      
        ## ENTITIES
      
        Basic-Object sub entity,
          abstract,
          owns internal_id @key,
          owns standard_id @key,
          owns entity_type;
      
        # Internal entities
        Internal-Object sub Basic-Object,
          abstract;
      
        Settings sub Internal-Object,
          owns platform_title,
          owns platform_email,
          owns platform_url,
          owns platform_language,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at;
      
        MigrationStatus sub Internal-Object,
          owns lastRun,
          plays migrates:migrates_from;
      
        MigrationReference sub Internal-Object,
          owns title,
          owns timestamp,
          plays migrates:migrates_to;
      
        Token sub Internal-Object,
          owns uuid @key,
          owns name,
          owns duration,
          owns issuer,
          owns revoked,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at,
          plays authorized-by:authorized-by_to;
      
        Group sub Internal-Object,
          owns name,
          owns description,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at,
          plays member-of:member-of_to,
          plays accesses-to:accesses-to_from;
      
        User sub Internal-Object,
          owns user_email,
          owns password,
          owns name,
          owns description,
          owns firstname,
          owns lastname,
          owns language,
          owns external,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at,
          plays authorized-by:authorized-by_from,
          plays has-role:has-role_from,
          plays member-of:member-of_from,
          plays allowed-by:allowed-by_from;
      
        Role sub Internal-Object,
          owns name @key,
          owns default_assignation,
          owns description,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at,
          plays allowed-by:allowed-by_to,
          plays has-capability:has-capability_from,
          plays has-role:has-role_to;
      
        Capability sub Internal-Object,
          owns name @key,
          owns attribute_order,
          owns description,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at,
          plays has-capability:has-capability_to;
      
        Connector sub Internal-Object,
          owns name,
          owns active,
          owns auto,
          owns connector_type,
          owns connector_scope,
          owns connector_state,
          owns connector_state_reset,
          owns connector_user_id,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at;
      
        Workspace sub Internal-Object,
          owns workspace_type,
          owns name,
          owns description,
          owns x_opencti_graph_data,
          owns workspace_data,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at;
      
        # STIX Object Entities
        Stix-Object sub Basic-Object,
          abstract,
          owns x_opencti_stix_ids,
          owns spec_version,
          owns created_at,
          owns i_created_at_day,
          owns i_created_at_month,
          owns i_created_at_year,
          owns updated_at;
      
        # STIX Meta Object Entities
        Stix-Meta-Object sub Stix-Object,
          abstract,
          owns created,
          owns modified;
      
        Marking-Definition sub Stix-Meta-Object,
          owns definition_type,
          owns definition,
          owns x_opencti_order,
          owns x_opencti_color,
          plays accesses-to:accesses-to_to,
          plays object-marking:object-marking_to;
      
        Label sub Stix-Meta-Object,
          owns value @key,
          owns color,
          plays object-label:object-label_to;
      
        External-Reference sub Stix-Meta-Object,
          owns source_name,
          owns description,
          owns url,
          owns hash,
          owns external_id,
          plays external-reference:external-reference_to;
      
        Kill-Chain-Phase sub Stix-Meta-Object,
          owns kill_chain_name,
          owns phase_name,
          owns x_opencti_order,
          plays kill-chain-phase:kill-chain-phase_to;
      
        Stix-Core-Object sub Stix-Object,
          abstract,
          plays created-by:created-by_from,
          plays object-marking:object-marking_from,
          plays object-label:object-label_from,
          plays external-reference:external-reference_from,
          plays object:object_to;
      
        # STIX Domain Object Entities
        Stix-Domain-Object sub Stix-Core-Object,
          abstract,
          owns revoked,
          owns confidence,
          owns lang,
          owns created,
          owns modified,
          plays revoked-by:revoked-by_from,
          plays duplicate-of:duplicate-of_from,
          plays derived-from:derived-from_from,
          plays related-to:related-to_from,
          plays stix-sighting-relationship:stix-sighting-relationship_from,
          plays revoked-by:revoked-by_to,
          plays duplicate-of:duplicate-of_to,
          plays derived-from:derived-from_to,
          plays related-to:related-to_to;
      
        Attack-Pattern sub Stix-Domain-Object,
          owns name,
          owns description,
          owns aliases,
          owns i_aliases_ids,
          owns x_mitre_platforms,
          owns x_mitre_permissions_required,
          owns x_mitre_detection,
          owns x_mitre_id,
          plays kill-chain-phase:kill-chain-phase_from,
          plays subtechnique-of:subtechnique-of_from,
          plays delivers:delivers_from,
          plays targets:targets_from,
          plays uses:uses_from,
          plays subtechnique-of:subtechnique-of_to,
          plays indicates:indicates_to,
          plays mitigates:mitigates_to,
          plays uses:uses_to;
      
        Campaign sub Stix-Domain-Object,
          owns name,
          owns description,
          owns aliases,
          owns i_aliases_ids,
          owns first_seen,
          owns i_first_seen_day,
          owns i_first_seen_month,
          owns i_first_seen_year,
          owns last_seen,
          owns i_last_seen_day,
          owns i_last_seen_month,
          owns i_last_seen_year,
          owns objective,
          plays attributed-to:attributed-to_from,
          plays compromises:compromises_from,
          plays originates-from:originates-from_from,
          plays targets:targets_from,
          plays uses:uses_from,
          plays attributed-to:attributed-to_to,
          plays indicates:indicates_to;
      
        Container sub Stix-Domain-Object,
          abstract,
          plays object:object_from;
      
        Note sub Container,
          owns attribute_abstract,
          owns content,
          owns authors;
      
        Observed-Data sub Container,
          owns first_observed,
          owns last_observed,
          owns number_observed,
          plays based-on:based-on_to,
          plays consists-of:consists-of_to;
      
        Opinion sub Container,
          owns explanation,
          owns authors,
          owns opinion;
      
        Report sub Container,
          owns name,
          owns description,
          owns report_types,
          owns x_opencti_report_status,
          owns published,
          owns i_published_day,
          owns i_published_year,
          owns i_published_month,
          owns x_opencti_graph_data;
      
        Course-Of-Action sub Stix-Domain-Object,
          owns name,
          owns description,
          owns x_opencti_aliases,
          owns i_aliases_ids,
          owns x_mitre_id,
          plays mitigates:mitigates_from,
          plays investigates:investigates_from,
          plays migrates:migrates_from,
          plays remediates:remediates_from;
      
        Identity sub Stix-Domain-Object,
          abstract,
          owns name,
          owns description,
          owns contact_information,
          owns identity_class,
          owns roles,
          owns x_opencti_aliases,
          owns i_aliases_ids,
          plays located-at:located-at_from,
          plays part-of:part-of_from,
          plays stix-sighting-relationship:stix-sighting-relationship_to,
          plays targets:targets_to,
          plays attributed-to:attributed-to_to,
          plays impersonates:impersonates_to;
      
        Individual sub Identity,
          owns x_opencti_firstname,
          owns x_opencti_lastname,
          plays created-by:created-by_to;
      
        Organization sub Identity,
          owns x_opencti_organization_type,
          owns x_opencti_reliability,
          plays created-by:created-by_to,
          plays part-of:part-of_to;
      
        Sector sub Identity,
          plays part-of:part-of_to;
      
        Indicator sub Stix-Domain-Object,
          owns pattern_type,
          owns pattern_version,
          owns pattern @key,
          owns name,
          owns description,
          owns indicator_types,
          owns valid_from,
          owns i_valid_from_day,
          owns i_valid_from_month,
          owns i_valid_from_year,
          owns valid_until,
          owns i_valid_until_day,
          owns i_valid_until_month,
          owns i_valid_until_year,
          owns x_opencti_score,
          owns x_opencti_detection,
          owns x_opencti_main_observable_type,
          owns x_mitre_platforms,
          plays kill-chain-phase:kill-chain-phase_from,
          plays indicates:indicates_from,
          plays based-on:based-on_from,
          plays investigates:investigates_to,
          plays mitigates:mitigates_to;
      
        Infrastructure sub Stix-Domain-Object,
          owns name,
          owns description,
          owns aliases,
          owns i_aliases_ids,
          owns infrastructure_types,
          owns first_seen,
          owns i_first_seen_day,
          owns i_first_seen_month,
          owns i_first_seen_year,
          owns last_seen,
          owns i_last_seen_day,
          owns i_last_seen_month,
          owns i_last_seen_year,
          plays kill-chain-phase:kill-chain-phase_from,
          plays communicates-with:communicates-with_from,
          plays consists-of:consists-of_from,
          plays controls:controls_from,
          plays relation-has:relation-has_from,
          plays hosts:hosts_from,
          plays located-at:located-at_from,
          plays uses:uses_from,
          plays compromises:compromises_to,
          plays beacons-to:beacons-to_to,
          plays exfiltrate-to:exfiltrate-to_to,
          plays hosts:hosts_to,
          plays indicates:indicates_to,
          plays relation-owns:owns_to,
          plays targets:targets_to,
          plays uses:uses_to;
      
        Intrusion-Set sub Stix-Domain-Object,
          owns name,
          owns description,
          owns aliases,
          owns i_aliases_ids,
          owns first_seen,
          owns i_first_seen_day,
          owns i_first_seen_month,
          owns i_first_seen_year,
          owns last_seen,
          owns i_last_seen_day,
          owns i_last_seen_month,
          owns i_last_seen_year,
          owns goals,
          owns resource_level,
          owns primary_motivation,
          owns secondary_motivations,
          plays attributed-to:attributed-to_from,
          plays compromises:compromises_from,
          plays hosts:hosts_from,
          plays relation-owns:owns_from,
          plays originates-from:originates-from_from,
          plays targets:targets_from,
          plays uses:uses_from,
          plays attributed-to:attributed-to_to,
          plays authored-by:authored-by_to,
          plays indicates:indicates_to;
      
        Location sub Stix-Domain-Object,
          abstract,
          owns name,
          owns description,
          owns latitude,
          owns longitude,
          owns precision,
          owns x_opencti_aliases,
          owns i_aliases_ids,
          owns x_opencti_location_type,
          plays located-at:located-at_from,
          plays stix-sighting-relationship:stix-sighting-relationship_to,
          plays located-at:located-at_to,
          plays originates-from:originates-from_to,
          plays targets:targets_to;
      
        City sub Location;
      
        Country sub Location;
      
        Region sub Location;
      
        Position sub Location,
          owns street_address,
          owns postal_code;
      
        Malware sub Stix-Domain-Object,
          owns name,
          owns description,
          owns aliases,
          owns i_aliases_ids,
          owns malware_types,
          owns is_family,
          owns first_seen,
          owns i_first_seen_day,
          owns i_first_seen_month,
          owns i_first_seen_year,
          owns last_seen,
          owns i_last_seen_day,
          owns i_last_seen_month,
          owns i_last_seen_year,
          owns architecture_execution_envs,
          owns implementation_languages,
          owns capabilities,
          plays kill-chain-phase:kill-chain-phase_from,
          plays operating-system:operating-system_from,
          plays sample:sample_from,
          plays authorized-by:authorized-by_from,
          plays beacons-to:beacons-to_from,
          plays exfiltrate-to:exfiltrate-to_from,
          plays communicates-with:communicates-with_from,
          plays controls:controls_from,
          plays downloads:downloads_from,
          plays drops:drops_from,
          plays exploits:exploits_from,
          plays originates-from:originates-from_from,
          plays targets:targets_from,
          plays uses:uses_from,
          plays variant-of:variant-of_from,
          plays variant-of:variant-of_to,
          plays delivers:delivers_to,
          plays indicates:indicates_to,
          plays mitigates:mitigates_to,
          plays remediates:remediates_to,
          plays uses:uses_to,
          plays drops:drops_to,
          plays controls:controls_to,
          plays characterizes:characterizes_to,
          plays static-analysis-of:static-analysis-of_to,
          plays dynamic-analysis-of:dynamic-analysis-of_to;
      
        Threat-Actor sub Stix-Domain-Object,
          owns name,
          owns description,
          owns aliases,
          owns i_aliases_ids,
          owns threat_actor_types,
          owns first_seen,
          owns i_first_seen_day,
          owns i_first_seen_month,
          owns i_first_seen_year,
          owns last_seen,
          owns i_last_seen_day,
          owns i_last_seen_month,
          owns i_last_seen_year,
          owns goals,
          owns sophistication,
          owns resource_level,
          owns primary_motivation,
          owns secondary_motivations,
          owns personal_motivations,
          plays attributed-to:attributed-to_from,
          plays compromises:compromises_from,
          plays hosts:hosts_from,
          plays relation-owns:owns_from,
          plays impersonates:impersonates_from,
          plays located-at:located-at_from,
          plays targets:targets_from,
          plays uses:uses_from,
          plays attributed-to:attributed-to_to,
          plays authored-by:authored-by_to,
          plays indicates:indicates_to;
      
        Tool sub Stix-Domain-Object,
          owns name,
          owns description,
          owns aliases,
          owns i_aliases_ids,
          owns tool_types,
          owns tool_version,
          plays kill-chain-phase:kill-chain-phase_from,
          plays delivers:delivers_from,
          plays drops:drops_from,
          plays relation-has:relation-has_from,
          plays targets:targets_from,
          plays uses:uses_from,
          plays hosts:hosts_to,
          plays downloads:downloads_to,
          plays drops:drops_to,
          plays indicates:indicates_to,
          plays uses:uses_to;
      
        Vulnerability sub Stix-Domain-Object,
          owns name,
          owns description,
          owns x_opencti_base_score,
          owns x_opencti_base_severity,
          owns x_opencti_attack_vector,
          owns x_opencti_integrity_impact,
          owns x_opencti_availability_impact,
          plays targets:targets_to,
          plays exploits:exploits_to,
          plays mitigates:mitigates_to,
          plays remediates:remediates_to,
          plays relation-has:relation-has_to;
      
        X-OpenCTI-Incident sub Stix-Domain-Object,
          owns name,
          owns description,
          owns aliases,
          owns i_aliases_ids,
          owns first_seen,
          owns i_first_seen_day,
          owns i_first_seen_month,
          owns i_first_seen_year,
          owns last_seen,
          owns i_last_seen_day,
          owns i_last_seen_month,
          owns i_last_seen_year,
          owns objective,
          plays attributed-to:attributed-to_from,
          plays compromises:compromises_from,
          plays targets:targets_from,
          plays uses:uses_from,
          plays indicates:indicates_to;
      
         # STIX Cyber Observables Entities
        Stix-Cyber-Observable sub Stix-Core-Object,
          abstract,
          owns x_opencti_description,
          owns x_opencti_score,
          plays stix-sighting-relationship:stix-sighting-relationship_from,
          plays related-to:related-to_from,
          plays consists-of:consists-of_to,
          plays based-on:based-on_to,
          plays related-to:related-to_to;
      
        Autonomous-System sub Stix-Cyber-Observable,
          owns number,
          owns name,
          owns rir,
          plays belongs-to:belongs-to_to;
      
        Directory sub Stix-Cyber-Observable,
          owns path,
          owns path_enc,
          owns ctime,
          owns mtime,
          owns atime,
          plays contains:contains_from;
      
        Domain-Name sub Stix-Cyber-Observable,
          owns value,
          plays resolves-to:resolves-to_to,
          plays src:src_to,
          plays dst:dst_to;
      
        Email-Addr sub Stix-Cyber-Observable,
          owns value,
          owns display_name,
          plays belongs-to:belongs-to_from,
          plays from:from_to,
          plays sender:sender_to,
          plays to:to_to,
          plays cc:cc_to,
          plays bcc:bcc_to;
      
        Email-Message sub Stix-Cyber-Observable,
          owns is_multipart,
          owns attribute_date,
          owns content_type,
          owns message_id,
          owns subject,
          owns received_lines,
          owns body,
          plays from:from_from,
          plays sender:sender_from,
          plays to:to_from,
          plays cc:cc_from,
          plays bcc:bcc_from,
          plays body-multipart:body-multipart_from,
          plays raw-email:raw-email_from;
      
        Email-Mime-Part-Type sub Stix-Cyber-Observable,
          owns body,
          owns content_type,
          owns content_disposition,
          plays body-raw:body-raw_from,
          plays body-multipart:body-multipart_to;
      
        Hashed-Observable sub Stix-Cyber-Observable,
          abstract,
          owns hashes;
      
        Artifact sub Hashed-Observable,
          owns mime_type,
          owns payload_bin,
          owns url,
          owns encryption_algorithm,
          owns decryption_key,
          plays raw-email:raw-email_to,
          plays body-raw:body-raw_to;
      
        StixFile sub Hashed-Observable,
          owns extensions,
          owns size,
          owns name,
          owns name_enc,
          owns magic_number_hex,
          owns mime_type,
          owns ctime,
          owns mtime,
          owns atime,
          plays parent-directory:parent-directory_from,
          plays contains:contains_from,
          plays relation-content:relation-content_from,
          plays parent-directory:parent-directory_to,
          plays contains:contains_to,
          plays image:image_to;
      
        X509-Certificate sub Hashed-Observable,
          owns is_self_signed,
          owns version,
          owns serial_number,
          owns signature_algorithm,
          owns issuer,
          owns validity_not_before,
          owns validity_not_after,
          owns subject,
          owns subject_public_key_algorithm,
          owns subject_public_key_modulus,
          owns subject_public_key_exponent,
          plays x509-v3-extensions:x509-v3-extensions_from;
      
        IPv4-Addr sub Stix-Cyber-Observable,
          owns value,
          plays located-at:located-at_from,
          plays resolves-to:resolves-to_from,
          plays belongs-to:belongs-to_from,
          plays resolves-to:resolves-to_to,
          plays src:src_to,
          plays dst:dst_to;
      
        IPv6-Addr sub Stix-Cyber-Observable,
          owns value,
          plays located-at:located-at_from,
          plays resolves-to:resolves-to_from,
          plays belongs-to:belongs-to_from,
          plays resolves-to:resolves-to_to,
          plays src:src_to,
          plays dst:dst_to;
      
        Mac-Addr sub Stix-Cyber-Observable,
          owns value,
          plays resolves-to:resolves-to_to,
          plays src:src_to,
          plays dst:dst_to;
      
        Mutex sub Stix-Cyber-Observable,
          owns name;
      
        Network-Traffic sub Stix-Cyber-Observable,
          owns extensions,
          owns start,
          owns end,
          owns is_active,
          owns src_port,
          owns dst_port,
          owns protocols,
          owns src_byte_count,
          owns dst_byte_count,
          owns src_packets,
          owns dst_packets,
          plays src:src_from,
          plays dst:dst_from,
          plays src-payload:src-payload_from,
          plays dst-payload:dst-payload_from,
          plays encapsulates:encapsulates_from,
          plays encapsulated-by:encapsulated-by_from,
          plays encapsulates:encapsulates_to,
          plays encapsulated-by:encapsulated-by_to,
          plays opened-connection:opened-connection_to;
      
        Process sub Stix-Cyber-Observable,
          owns extensions,
          owns is_hidden,
          owns pid,
          owns created_time,
          owns cwd,
          owns command_line,
          owns environment_variables,
          plays opened-connection:opened-connection_from,
          plays creator-user:creator-user_from,
          plays image:image_from,
          plays parent:parent_from,
          plays child:child_from,
          plays parent:parent_to,
          plays child:child_to;
      
        Software sub Stix-Cyber-Observable,
          owns name,
          owns cpe,
          owns swid,
          owns languages,
          owns vendor,
          owns version;
      
        Url sub Stix-Cyber-Observable,
          owns value;
      
        User-Account sub Stix-Cyber-Observable,
          owns extensions,
          owns user_id,
          owns credential,
          owns account_login,
          owns account_type,
          owns display_name,
          owns is_service_account,
          owns is_privileged,
          owns can_escalate_privs,
          owns is_disabled,
          owns account_created,
          owns account_expires,
          owns credential_last_changed,
          owns account_first_login,
          owns account_last_login,
          plays creator-user:creator-user_to;
      
        Windows-Registry-Key sub Stix-Cyber-Observable,
          owns attribute_key,
          owns modified_time,
          owns number_of_subkeys,
          plays values:values_from,
          plays creator-user:creator-user_from;
      
        Windows-Registry-Value-Type sub Stix-Cyber-Observable,
          owns name,
          owns data,
          owns data_type,
          plays values:values_to;
      
        X509-V3-Extensions-Type sub Stix-Cyber-Observable,
          owns basic_constraints,
          owns name_constraints,
          owns policy_constraints,
          owns key_usage,
          owns extended_key_usage,
          owns subject_key_identifier,
          owns authority_key_identifier,
          owns subject_alternative_name,
          owns issuer_alternative_name,
          owns subject_directory_attributes,
          owns crl_distribution_points,
          owns inhibit_any_policy,
          owns private_key_usage_period_not_before,
          owns private_key_usage_period_not_after,
          owns certificate_policies,
          owns policy_mappings,
          plays x509-v3-extensions:x509-v3-extensions_to;
      
        X-OpenCTI-Cryptographic-Key sub Stix-Cyber-Observable,
          owns value;
      
        X-OpenCTI-Cryptocurrency-Wallet sub Stix-Cyber-Observable,
          owns value;
      
        X-OpenCTI-Hostname sub Stix-Cyber-Observable,
          owns value;
      
        X-OpenCTI-Text sub Stix-Cyber-Observable,
          owns value;
      
        X-OpenCTI-User-Agent sub Stix-Cyber-Observable,
          owns value;
      `);
        await tx.commit();
        await tx.close();
        tx = await session.transaction(TransactionType.READ);
        const subtypes = await (await tx.concepts().getRootThingType()).asRemote(tx).getSubtypes().collect();
        console.log(subtypes);
        console.log(subtypes.length);
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
