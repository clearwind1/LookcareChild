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
        this.gamelevel = RandomUtils.limitInteger(1, 8);
        if (this.gamelevel == 8) {
            if (RandomUtils.limitInteger(0, 100) < 50) {
                this.gamelevel = RandomUtils.limitInteger(1, 7);
            }
        }
        this.bdie = false;
        /**创建角色 */
        this.anispeed = GameUtil.MAX(30, 80 - GameData._i().GameLevel);
        var startpos = [[-50, -50], [-50, this.mStageH / 2], [-50, this.mStageH - 50], [this.mStageW + 50, -50], [this.mStageW + 50, this.mStageH / 2], [this.mStageW + 50, this.mStageH - 50]];
        var enemyname = 'enemyrun' + this.gamelevel;
        this.sp = new Animation(enemyname, this.spframe[RoleState.RUN], this.anispeed, startpos[this.dir][0], startpos[this.dir][1]);
        var sc = this.dir > 2 ? 1 : -1;
        this.sp.$setScaleX(sc);
        this.addChild(this.sp);
        this.sp.setLoop(-1);
        this.sp.play();
        /**创建生命条 */
        this.life = new Lifesprite(this.gamelevel);
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
        var speed = GameUtil.MAX(3000, 12000 - GameData._i().GameLevel * 250);
        egret.Tween.get(this.sp).to({ x: posx, y: posy }, speed);
        egret.Tween.get(this.life).to({ x: posx, y: posy - this.sp.height / 2 - 30 }, speed).call(this.att, this);
    };
    /**攻击动作 */
    p.att = function () {
        var enemyname = 'enemyatt' + this.gamelevel;
        this.sp.switchani(enemyname, this.spframe[RoleState.ATT], 0, true, 40);
        //this.intervalarr.push(egret.setInterval(this.attplayer, this, this.anispeed * this.spframe[RoleState.ATT]));
        this.sp.setendcall(this.attplayer, this);
    };
    /**定时攻击 */
    p.attplayer = function () {
        PlayerData._i().curlife--;
        (GameUtil.GameScene.curScene).getPlayer().updatalife();
        this.parent.removeChild(this);
    };
    /**被攻击 */
    p.beatt = function (attpow, bpowatt) {
        if (bpowatt === void 0) { bpowatt = false; }
        GameData._i().gamesound[SoundName.beatt].play();
        this.life.sublife(attpow);
        if (!this.bdie && this.life.getlife() <= 0) {
            this.die(bpowatt);
        }
    };
    /**死亡 */
    p.die = function (bpowatt) {
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
        var self = this;
        egret.Tween.get(this).to({ visible: false }, 100).to({ visible: true }, 100).to({ visible: false }, 100).to({ visible: true }, 100).to({ visible: false }, 100).call(function () {
            self.parent.removeChild(self);
            GameData._i().gamesound[SoundName.die].play();
            GameData._i().gamesound[SoundName.goal].play();
            if (self.gamelevel == 8) {
                PlayerData._i().UserInfo.killgeneral++;
            }
            else {
                PlayerData._i().UserInfo.killsoldier++;
            }
            if (self.gamelevel % 8 == 0) {
                PlayerData._i().UserInfo.jifen += (2 + GameData._i().GameLevel * 4);
            }
            else {
                PlayerData._i().UserInfo.jifen += (2 + GameData._i().GameLevel * 2);
            }
            if (!bpowatt) {
                /**玩家获得能量 */
                var attpower = 1;
                PlayerData._i().curenergy = PlayerData._i().curenergy + attpower;
                if (PlayerData._i().curenergy > GameConfig.PLAYERENERGY) {
                    PlayerData._i().curenergy = GameConfig.PLAYERENERGY;
                }
                else {
                    (GameUtil.GameScene.curScene).getPlayer().updataenergy(attpower);
                }
            }
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