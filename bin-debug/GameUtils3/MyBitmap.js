/**
 * 创建图片
 * Created by pior on 16/1/19.
 */
var MyBitmap = (function (_super) {
    __extends(MyBitmap, _super);
    function MyBitmap(texture, posx, posy) {
        if (posx === void 0) { posx = 0; }
        if (posy === void 0) { posy = 0; }
        _super.call(this);
        this.init(texture, posx, posy);
    }
    var d = __define,c=MyBitmap,p=c.prototype;
    p.init = function (texture, posx, posy) {
        this.texture = texture;
        this.$setX(posx);
        this.$setY(posy);
        this.setanchorOff(0.5, 0.5);
    };
    p.setNewTexture = function (texture) {
        this.texture = texture;
        //this.setanchorOff(0.5,0.5);
    };
    p.setanchorOff = function (anchorx, anchory) {
        this.anchorOffsetX = this.$getWidth() * anchorx;
        this.anchorOffsetY = this.$getHeight() * anchory;
    };
    return MyBitmap;
}(egret.Bitmap));
egret.registerClass(MyBitmap,'MyBitmap');
//# sourceMappingURL=MyBitmap.js.map