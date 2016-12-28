/**
 * Create by hardy on 16/12/22
 * 血量类
 */
var Lifesprite = (function (_super) {
    __extends(Lifesprite, _super);
    function Lifesprite(lifecount) {
        _super.call(this, [lifecount]);
    }
    var d = __define,c=Lifesprite,p=c.prototype;
    p.init = function (params) {
        this.lifecount = params[0];
        this.life = params[0];
        var lifeframe = new MyBitmap(RES.getRes('lifeframe_png'));
        this.addChild(lifeframe);
        this.lifebar = new MyBitmap(RES.getRes('lifebar_png'));
        this.lifebar.setanchorOff(0, 0.5);
        this.addChild(this.lifebar);
        GameUtil.relativepos(this.lifebar, lifeframe, 42, 18);
        this.lifemask = new MyBitmap(this.lifebar.texture, this.lifebar.x, this.lifebar.y);
        this.lifemask.setanchorOff(0, 0.5);
        this.addChild(this.lifemask);
        this.lifebar.mask = this.lifemask;
    };
    p.addlife = function (value) {
        var life = this.lifecount + value;
        this.lifecount = GameUtil.MIN(life, this.life);
        this.updatalifebar();
    };
    p.sublife = function (value) {
        var life = this.lifecount - value;
        this.lifecount = GameUtil.MAX(life, 0);
        this.updatalifebar();
    };
    p.updatalifebar = function () {
        this.lifemask.width = this.lifebar.width * (this.lifecount / this.life);
        this.lifebar.mask = this.lifemask;
    };
    p.getlife = function () {
        return this.lifecount;
    };
    p.setlife = function (value) {
        this.lifecount = value;
        this.updatalifebar();
    };
    return Lifesprite;
}(GameUtil.BassPanel));
egret.registerClass(Lifesprite,'Lifesprite');
//# sourceMappingURL=Lifesprite.js.map