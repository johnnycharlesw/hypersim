import * as tcpPortUsed from 'tcp-port-used';
class LocalDiscoverer {
    port: number;
    constructor(port: number = 35565) {
        this.port=port;
    }

    async scan(): Promise<Array<Array<Number>>>{
        let discovered: Array<any> = [];
        for (let x = 0; x < 255; x++) {
            for (let y = 0; y < 255; y++) {
                for (let z = 0; z < 255; z++) {
                    for (let a = 0; a < 255; a++) {
                        let ip = x.toString() + "." + y.toString() + "." + z.toString() + "." + a.toString();
                        let tcpCheck = tcpPortUsed.check(this.port, ip);
                        tcpCheck.then(function (found){
                            discovered.concat([[x,y,z,a]]);
                        });
                        tcpCheck.catch(function (failed){});
                    }
                }
            }
        }
        return discovered;
    }
}