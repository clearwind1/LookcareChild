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
        this.spframe = [4, 10]; //不同状态的总帧数
    }
    var d = __define,c=EnemySprite,p=c.prototype;
    p.init = function () {
        //console.log('type====', this.type);
        this.intervalarr = [];
        this.bdie = false;
        /**创建角色 */
        var startpos = [[-50, -50], [-50, this.mStageH / 2], [-50, this.mStageH - 50], [this.mStageW + 50, -50], [this.mStageW + 50, this.mStageH / 2], [this.mStageW + 50, this.mStageH - 50]];
        this.sp = new Animation('enemyrun1', this.spframe[RoleState.RUN], 80, startpos[this.dir][0], startpos[this.dir][1]);
        var sc = this.dir > 2 ? 1 : -1;
        this.sp.$setScaleX(sc);
        this.addChild(this.sp);
        this.sp.setLoop(-1);
        this.sp.play();
        /**创建生命条 */
        this.life = new Lifesprite(2);
        this.life.$setScaleX(0.7);
        this.life.$setScaleY(0.7);
        this.life.x = this.sp.x;
        this.life.y = this.sp.y - this.sp.height / 2 - 30;
        this.addChild(this.life);
    };
    /**初始配置 */
    p.initdata = function (type, dir) {
        this.type = type;
        this.dir = dir;
    };
    /**开始移动 */
    p.start = function () {
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        egret.Tween.get(this.sp).to({ x: posx, y: posy }, 12000);
        egret.Tween.get(this.life).to({ x: posx, y: posy - this.sp.height / 2 - 30 }, 12000).call(this.att, this);
    };
    /**攻击动作 */
    p.att = function () {
        this.sp.switchani('enemyatt1', this.spframe[RoleState.ATT], -1);
        this.intervalarr.push(egret.setInterval(this.attplayer, this, 80 * this.spframe[RoleState.ATT]));
    };
    /**定时攻击 */
    p.attplayer = function () {
        PlayerData._i().curlife--;
        (GameUtil.GameScene.curScene).getPlayer().updatalife();
    };
    /**被攻击 */
    p.beatt = function (attpow) {
        this.life.sublife(attpow);
        if (this.life.getlife() <= 0) {
            this.die();
        }
    };
    /**死亡 */
    p.die = function () {
        this.bdie = true;
        this.sp.stop();
        // if (this.atttag != -1) {
        //     //console.log('clear===');
        //     egret.clearInterval(this.atttag);
        // }
        GameUtil.clearinterval(this.intervalarr);
        /**移除动作 */
        egret.Tween.removeTweens(this.sp);
        egret.Tween.removeTweens(this.life);
        /**死亡效果 */
        egret.Tween.get(this).to({ visible: false }, 200).to({ visible: true }, 200).to({ visible: false }, 200).to({ visible: true }, 200).to({ visible: false }, 200).call(function () {
            this.parent.removeChild(this);
            /**玩家获得能量 */
            var attpower = 1;
            PlayerData._i().curenergy = GameUtil.MIN(PlayerData._i().curenergy + attpower, GameConfig.PLAYERENERGY);
            (GameUtil.GameScene.curScene).getPlayer().updataenergy(attpower);
        }, this);
    };
    /**获取敌人角色 */
    p.getsp = function () {
        return this.sp;
    };
    return EnemySprite;
}(GameUtil.BassPanel));
egret.registerClass(EnemySprite,'EnemySprite');
//# sourceMappingURL=EnemySprite.js.map