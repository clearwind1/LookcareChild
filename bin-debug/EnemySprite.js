// TypeScript file
/**
 * Create by hardy on 16/12/27
 * 敌人
 */
var EnemyType;
(function (EnemyType) {
    EnemyType[EnemyType["SOLDIER"] = 0] = "SOLDIER";
    EnemyType[EnemyType["GENERAL"] = 1] = "GENERAL";
    EnemyType[EnemyType["END"] = 2] = "END";
})(EnemyType || (EnemyType = {}));
;
var EnemySprite = (function (_super) {
    __extends(EnemySprite, _super);
    function EnemySprite() {
        _super.call(this);
        this.spframe = [4, 10];
        this.atttag = -1;
    }
    var d = __define,c=EnemySprite,p=c.prototype;
    p.init = function () {
        console.log('type====', this.type);
        this.bdie = false;
        var startpos = [[-50, -50], [-50, this.mStageH / 2], [-50, this.mStageH - 50]];
        this.sp = new Animation('enemyrun1', this.spframe[RoleState.RUN], 80, startpos[0][0], startpos[0][1]);
        this.sp.$setScaleX(-1);
        this.addChild(this.sp);
        this.sp.setLoop(-1);
        this.sp.play();
        this.life = new Lifesprite(2);
        this.life.$setScaleX(0.7);
        this.life.$setScaleY(0.7);
        this.life.x = this.sp.x;
        this.life.y = this.sp.y - this.sp.height / 2 - 30;
        this.addChild(this.life);
    };
    p.initdata = function (type) {
        this.type = type;
    };
    p.start = function () {
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        egret.Tween.get(this.sp).to({ x: posx, y: posy }, 12000);
        egret.Tween.get(this.life).to({ x: posx, y: posy - this.sp.height / 2 - 30 }, 12000).call(this.att, this);
    };
    p.att = function () {
        this.sp.switchani('enemyatt1', this.spframe[RoleState.ATT], -1);
        this.atttag = egret.setInterval(this.attplayer, this, 80 * this.spframe[RoleState.ATT]);
    };
    p.attplayer = function () {
        PlayerData._i().curlife--;
        (GameUtil.GameScene.curScene).getPlayer().updatalife();
    };
    p.beatt = function (attpow) {
        this.life.sublife(attpow);
        if (this.life.getlife() <= 0) {
            this.die();
        }
    };
    p.die = function () {
        this.bdie = true;
        this.sp.stop();
        if (this.atttag != -1) {
            console.log('clear===');
            egret.clearInterval(this.atttag);
        }
        egret.Tween.removeTweens(this.sp);
        egret.Tween.removeTweens(this.life);
        egret.Tween.get(this).to({ visible: false }, 200).to({ visible: true }, 200).to({ visible: false }, 200).to({ visible: true }, 200).to({ visible: false }, 200).call(function () {
            this.parent.removeChild(this);
            var attpower = 10;
            PlayerData._i().curenergy += attpower;
            (GameUtil.GameScene.curScene).getPlayer().updataenergy(attpower);
        }, this);
    };
    p.getsp = function () {
        return this.sp;
    };
    return EnemySprite;
}(GameUtil.BassPanel));
egret.registerClass(EnemySprite,'EnemySprite');
//# sourceMappingURL=EnemySprite.js.map