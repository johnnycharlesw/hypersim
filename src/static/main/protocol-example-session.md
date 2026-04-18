Hello 127.0.0.1:35565
ServerA = 127.0.0.1

127.0.0.1 Hello
127.0.0.1 ServerB = 127.0.0.1:35565

127.0.0.1:35565 
```ts
class RetrieveFocusPup824DataControlPacket extends RetrieveDataControlPacket {
    _sendback(): PlayerEntity{
        let FocusPup824: PlayerEntity = server.getPlayer("FocusPup824");
        return FocusPup824;
    }
};
let controlPacket=new RetrieveFocusPup824DataControlPacket();
```

127.0.0.1 
```ts
let FocusPup824=new PlayerEntity(isOnline: boolean = false, username: string = "FocusPup824");
```

127.0.0.1:35565 
`FocusPup824` joined the game:
```toml
[client]
modded = false
mod_count = 0
mobile = false
username = "FocusPup824"
# ...
```


127.0.0.1 
```ts
FocusPup824.isOnline = true;
server.entities = [...entities];
server.universe={...universe};
```

127.0.0.1:35565
```ts
class TeleportFocusPup824ControlPacket extends TeleportEntityControlPacket {
    position: Vector3D;
    constructor(position: Vector3D){
        super();
        this.position = position;
    }
    _sendback(): Vector3D{
        return super._sendback(globalThis.FocusPup824);
    }
};
let controlPacket=new TeleportFocusPup824ControlPacket();
```

127.0.0.1
```ts
globalThis.FocusPup824.position = new Vector3D(0,0,0);
```

[some regular gameplay session here]

127.0.0.1:35565
```ts
FocusPup824.logOff(serverMessage: string = "FocusPup824 is at his grandpa's house eating easter dinner");
```

127.0.0.1
```ts
FocusPup824.isOnline = false;
```

127.0.0.1:35565
```ts
connection.keepAlive = false;
```

[end of tcp connection]