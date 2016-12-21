/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.init = function () {
        BGMPlayer._i().play(SoundName.gamebgm);
        this.showbg();
    };
    p.showbg = function () {
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map