import {ConfigParser} from '../ConfigParser.js';
import express from 'express';
import * as http from 'node:http';
import * as socketio from 'socket.io';
import {
  EmbedTypeScript,
  IEmbedTypeScriptResult
} from "embed-typescript";
import ts from "typescript";
import { Universe } from '../../common/geography/Universe.js';
import { existsSync } from 'node:fs';
import * as fs from 'fs';
import { MultiplayerEmbedTypecriptConfig } from './MultiplayerEmbedTypescriptConfig.js';
import { UniverseGenerator } from './UniverseGenerator.js';
import { Object_ } from '../../common/objects/Object_.js';
import path from 'node:path';
import { Save } from './saves/Save.js';

export class Server {
    configurator: ConfigParser;
    port: number;
    ip: string;
    io: socketio.Server;
    httpApp: express.Application;
    httpServer: http.Server;
    users: Map<string, string>;
    tsCompiler: EmbedTypeScript;
    universe: Universe;
    objects: Array<Object_>;
    save: Save;
    constructor() {
        console.log('Server: Parsing arguments and reading config');
        let args = process.argv.slice(2);
        let configLocationSpecified = args.includes('--config-file');
        let configFileName = args[args.indexOf('--config-file')+1] || 'game.config.toml';
        this.configurator=new ConfigParser(configFileName);
        
        console.log('Server: starting');
        this.ip = this.configurator.config['server']['server-ip'];
        this.port = this.configurator.config['server']['port'];
        this.httpApp=express();
        this.httpServer=http.createServer(this.httpApp);

        this.httpApp.get('/', this.getServerInfo);
        this.tsCompiler=new EmbedTypeScript(new MultiplayerEmbedTypecriptConfig());
        this.io = new socketio.Server(this.httpServer);
        this.users = new Map<string, string>();
        
        this.io.on('createAccount', this.createAccount);
        this.io.on('login', this.login);
        this.io.on('execTs', this.execTs);

        console.log('Finding or creating universe');
        let universePath = this.configurator.config['universe']['path'];
        this.save = new Save(universePath, this);
        if (!existsSync(universePath)) {
            console.log('Creating new universe...');
            this.universe = new Universe();
            let universeGenerator = new UniverseGenerator();
            universeGenerator.genUniverse(this);
            this.objects=[];
            //this.save.save();
        } else {
            this.universe = new Universe();
            this.objects=[];
            //this.save.load();
        }

        this.httpServer.listen(this.port);
    }



    public getServerInfo(req: express.Request, res: express.Response) {
        res.json({
            "hypersim":"true"
        });
    }

    public createAccount(username: string){
        let key = self.crypto.randomUUID();
        if (!this.users.has(username)) {
            this.users.set(username, key);
            this.io.emit('apiKeyDistribution', {
                'username':username,
                'key':key
            });
        }
    }

    public login(username:string, key:string){
        if (!(this.users.get(username) == key)) {
            this.io.emit('unauthorized', username);
        }
    }

    public async execTs(ts:string) { 
        let js_req = this.tsCompiler.compile({
            "command.ts": ts
        });
        if (js_req.type == "success") {
            let js = js_req.javascript;
            let result = eval(js['command.js']!);
            let ts_generated_result = "";
            
        }
    }
}