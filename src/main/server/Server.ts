import {ConfigParser} from '../ConfigParser.js';
import express from 'express';
import * as http from 'node:http';
import * as socketio from 'socket.io';
import {
  EmbedTypeScript,
  IEmbedTypeScriptResult
} from "embed-typescript";
import ts from "typescript";



class Server {
    configurator: ConfigParser;
    port: number;
    ip: string;
    io: socketio.Server;
    httpApp: express.Application;
    httpServer: http.Server;
    users: Map<string, string>;
    tsCompiler: EmbedTypeScript;
    constructor() {
        let args = process.argv.slice(2);
        let configLocationSpecified = args.includes('--config-file');
        let configFileName = args[args.indexOf('--config-file')+1] || 'game.config.toml';
        this.configurator=new ConfigParser(configFileName);
        
        this.ip = this.configurator.config['server']['server-ip'];
        this.port = this.configurator.config['server']['port'];
        this.httpApp=express();
        this.httpServer=http.createServer(this.httpApp);

        this.httpApp.get('/', this.getServerInfo);
        this.tsCompiler=new EmbedTypeScript(IEmbed)
        this.io = new socketio.Server(this.httpServer);
        this.users = new Map<string, string>();

        
        this.io.on('createAccount', this.createAccount);
        this.io.on('login', this.login);
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

}