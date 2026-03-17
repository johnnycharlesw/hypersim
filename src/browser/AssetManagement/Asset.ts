import { Vector2D } from "../../common/vectors.js";

enum AssetType{
    _3d_Model,
    Image,
    Video,
    Audio
};



class Asset {
    size: Vector2D;
    uri: URL;
    type: AssetType;
    constructor(size: Vector2D, uri: URL, type: AssetType) {
        this.size = size;
        this.uri = uri;
        this.type = type;
    }

    toAFrameHTMLElement(){
        switch (this.type) {
            case AssetType._3d_Model:
                let aAssetItem = document.createElement('a-asset-item');
                aAssetItem.setAttribute('src', this.uri.toString());
                aAssetItem.setAttribute('response-type', 'arraybuffer');
                return aAssetItem;
        
            case AssetType.Image:
                let image = document.createElement('img');
                image.src = this.uri.toString();
                image.width=this.size.x;
                image.height=this.size.y;
                return image;
            case AssetType.Video:
                let video = document.createElement('video');
                video.src = this.uri.toString();
                video.width=this.size.x;
                video.height=this.size.y;
                return video;
            case AssetType.Audio:
                let audio = document.createElement('audio');
                audio.src = this.uri.toString();
                // size does not apply to audio
                return audio;

            default:
                break;
        }
    }
}