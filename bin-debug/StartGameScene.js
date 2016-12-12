/**
 * Created by pior on 16/9/9.
 */
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        _super.call(this);
    }
    var d = __define,c=StartGameScene,p=c.prototype;
    p.init = function () {
        this.showbg();
    };
    p.showbg = function () {
        var bg = new GameUtil.MyBitmap(RES.getRes('startgamebg_jpg'), 0, 0);
        bg.setanchorOff(0, 0);
        this.addChild(bg);
        var startbtn = new GameUtil.Menu(this, 'startgamebtn_png', 'startgamebtn_png', this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW / 2;
        startbtn.y = 600;
        this.addChild(startbtn);
    };
    p.startgame = function () {
        console.log('start');
    };
    return StartGameScene;
}(GameUtil.BassPanel));
egret.registerClass(StartGameScene,'StartGameScene');
