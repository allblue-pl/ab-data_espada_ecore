'use strict';

const
    abData = require('ab-data'),
    js0 = require('js0'),

    f = abData.fields,
    v = abData.validators
;

module.exports = function (ds, tableId) {
    js0.args(arguments, abData.DataScheme, 'int');

    let dsFn = () => {
        ds
            .defT(tApp_Infos)
            .defT(tCache_Files)
            .defT(tConfig_Settings)
            .defT(tLog_Logs)
            .defT(tSession_Sessions)
            .defT(tTasks_Tasks)
            .defT(tUsers_ResetPasswordHashes)
            .defT(tUsers_Users)
    }

    let tApp_Infos = new abData.TableDef(tableId++, 'App_Infos', 'a_i', [
        [ 'Id',                 f.AutoIncrementId() ],
        [ 'User_Id',            f.Long({ notNull: true }) ],
        [ 'AuthenticationHash', f.String(256, { notNull: true }) ],
        [ 'Data',               f.Text('medium', { notNull: true }) ],
            ]);

    let tCache_Files = new abData.TableDef(tableId++, 'Cache_Files', 
            'c_f', [
        [ 'Id',         f.AutoIncrementId() ],
        [ 'User_Id',    f.Long({ notNull: false }) ],
        [ 'Hash',       f.String(128, { notNull: true }) ],
        [ 'Expires',    f.Long({ notNull: true }) ],
            ]);

    let tConfig_Settings = new abData.TableDef(tableId++, 'Config_Settings', 
            'c_s', [
        [ 'Name',   f.String(32, { notNull: true }) ],
        [ 'Value',   f.Text('medium', { notNull: true }) ],
            ])
        .setPKs([ 'Name' ]);
    
    let tLog_Logs = new abData.TableDef(tableId++, 'Log_Logs', 
            'l_l', [
        [ 'Id',         f.AutoIncrementId() ],
        [ 'User_Id',    f.Long({ notNull: false }) ],
        [ 'DateTime',   f.Long({ notNull: false }) ],
        [ 'Message',    f.String(256, { notNull: false }) ],
        [ 'Data',       f.Text('medium', { notNull: false }) ],
            ]);

    let tSession_Sessions = new abData.TableDef(tableId++, 'Session_Sessions', 
            's_s', [
        [ 'Id',         f.String(32, { notNull: true }) ],
        [ 'Access',     f.Int({ notNull: false, unsigned: true, }) ],
        [ 'Data',       f.Text('regular', { notNull: false }) ],
            ])
        .setPKs([ 'Id' ]);

    let tTasks_Tasks = new abData.TableDef(tableId++, 'Tasks_Tasks', 
            't_t', [
        [ 'Hash',       f.String(128, { notNull: true, }) ],
        [ 'User_Id',    f.Long({ notNull: false, }) ],
        [ 'DateTime',   f.DateTime({ notNull: true }) ],
        [ 'Finished',   f.Bool({ notNull: true} ) ],
        [ 'Info',       f.Text('medium', { notNull: true }) ],
        [ 'Data',       f.Text('medium', { notNull: true }) ],
            ])
        .setPKs([ 'Hash' ]);

    let tUsers_ResetPasswordHashes = new abData.TableDef(tableId++, 
            'Users_ResetPasswordHashes', 'u_rph', [
        [ 'Id',         f.AutoIncrementId() ],
        [ 'User_Id',    f.Long({ notNull: true, }) ],
        [ 'DateTime',   f.DateTime({ notNull: true }) ],
        [ 'Hash',       f.String(128, { notNull: true} ) ],
            ])
        .setIndexes({
            'User_Id': [ [ 'User_Id', false ] ],
        });

    let tUsers_Users = new abData.TableDef(tableId++, 'Users_Users', 
            'u_u', [
        [ 'Id',             f.Long({ notNull: true, }) ],
        [ 'Type',           f.String(16, { notNull: true, }) ],
        [ 'LoginHash',      f.String(256, { notNull: true, }) ],
        [ 'EmailHash',      f.String(256, { notNull: true, }) ],
        [ 'PasswordHash',   f.String(256, { notNull: true, }) ],
        [ 'Groups',         f.String(128, { notNull: true, }) ],
        [ 'Active',         f.Bool({ notNull: true, }) ],
            ])
        .setPKs([ 'Id' ])
        .setIndexes({
            'Login': [
                [ 'LoginHash', false, ],
                [ 'PasswordHash', false, ],
                [ 'Active', false, ],
            ],
        });

    dsFn();
};