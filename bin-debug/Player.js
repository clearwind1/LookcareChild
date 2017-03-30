/**
 * Create by hardy on 16/12/22
 * 玩家类
 */
/**方向 */
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
    Direction[Direction["END"] = 4] = "END";
})(Direction || (Direction = {}));
;
/**状态：跑动/攻击 */
var RoleState;
(function (RoleState) {
    RoleState[RoleState["RUN"] = 0] = "RUN";
    RoleState[RoleState["ATT"] = 1] = "ATT";
})(RoleState || (RoleState = {}));
;
/**武器类型：弓箭，枪 */
var Weapon;
(function (Weapon) {
    Weapon[Weapon["SPEAR"] = 0] = "SPEAR";
    Weapon[Weapon["BOW"] = 1] = "BOW";
    Weapon[Weapon["END"] = 2] = "END";
})(Weapon || (Weapon = {}));
;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.zyaniname = [['spearrun', 'spearatt'], ['bowrun', 'bowatt']];
        this.zyaniframe = [[8, 10], [8, 5]];
    }
    var d = __define,c=Player,p=c.prototype;
    p.init = function () {
        this.batting = false;
        /**阿斗 */
        this.adourole = new Animation('dou', 10, 100, this.mStageW / 2, this.mStageH / 2);
        this.addChild(this.adourole);
        this.adourole.setLoop(-1);
        this.adourole.play();
        /**攻击动画层 */
        this.rolelayer = new egret.DisplayObjectContainer();
        this.addChild(this.rolelayer);
        /**赵云 */
        var aniname = this.zyaniname[Weapon.SPEAR][RoleState.RUN];
        var aniframe = this.zyaniframe[Weapon.SPEAR][RoleState.RUN];
        this.zhaoyunrole = new Animation(aniname, aniframe, 80, this.mStageW / 2, this.mStageH / 2 + 100);
        this.zhaoyunrole.setanchorOff(0.3, 0.5);
        this.addChild(this.zhaoyunrole);
        this.zhaoyunrole.setLoop(-1);
        this.zhaoyunrole.play();
        /**玩家生命 */
        this.life = new Lifesprite(GameConfig.PLAYERLIFE);
        this.life.x = this.adourole.x;
        this.life.y = this.adourole.y - this.adourole.height / 2 - 30;
        this.addChild(this.life);
        /**玩家能量 */
        this.createEnergy();
        this.intertag = egret.setInterval(this.moving, this, 100);
    };
    /**切换武器 */
    p.switchweapon = function () {
        if (this.batting) {
            return;
        }
        var aniname = this.zyaniname[PlayerData._i().curweapon][RoleState.RUN];
        var aniframe = this.zyaniframe[PlayerData._i().curweapon][RoleState.RUN];
        this.zhaoyunrole.switchani(aniname, aniframe);
    };
    /**攻击 */
    p.att = function () {
        if (this.batting) {
            return;
        }
        if (PlayerData._i().curweapon == Weapon.BOW) {
            GameData._i().gamesound[SoundName.bowatt].play();
        }
        else {
            GameData._i().gamesound[SoundName.spearatt].play();
        }
        this.batting = true;
        var aniname = this.zyaniname[PlayerData._i().curweapon][RoleState.ATT];
        var aniframe = this.zyaniframe[PlayerData._i().curweapon][RoleState.ATT];
        this.zhaoyunrole.switchani(aniname, aniframe, 0, false, 20);
        this.zhaoyunrole.setendcall(this.endatt, this);
    };
    p.endatt = function () {
        this.checkattenemy();
        this.batting = false;
        var aniname = this.zyaniname[PlayerData._i().curweapon][RoleState.RUN];
        var aniframe = this.zyaniframe[PlayerData._i().curweapon][RoleState.RUN];
        this.zhaoyunrole.switchani(aniname, aniframe, -1, false, 80);
    };
    /**检测攻击结果 */
    p.checkattenemy = function () {
        var gamescene = (this.parent);
        var enemycontain = gamescene.enemyContain;
        for (var i = 0; i < enemycontain.numChildren; i++) {
            var enemysp = enemycontain.getChildAt(i);
            if (enemysp.bdie) {
                continue;
            }
            if (PlayerData._i().curweapon == Weapon.SPEAR) {
                var rect1 = this.getrect(this.zhaoyunrole, 0.3, 0.7, 50 * this.zhaoyunrole.$getScaleX());
                var rect2 = this.getrect(enemysp.getsp(), 1, 0.9);
                if (rect1.intersects(rect2)) {
                    enemysp.beatt(GameConfig.PLAYERSPEARPOW);
                }
            }
            else {
                var boweffect = new MyBitmap(RES.getRes('boweffect_png'), this.zhaoyunrole.x + 50 * this.zhaoyunrole.$getScaleX(), this.zhaoyunrole.y - 20);
                this.parent.addChild(boweffect);
                var rot = Math.atan((enemysp.getsp().y - this.zhaoyunrole.y) / (enemysp.getsp().x - this.zhaoyunrole.x)) * 180 / Math.PI;
                if (enemysp.getsp().x < this.zhaoyunrole.x) {
                    rot += 180;
                }
                //console.log('rot=====', rot);
                boweffect.$setRotation(rot);
                egret.Tween.get(boweffect).to({ x: enemysp.getsp().x, y: enemysp.getsp().y }, 200).call(function () {
                    boweffect.parent.removeChild(boweffect);
                    if (enemysp.parent != null) {
                        enemysp.beatt(GameConfig.PLAYERBOWPOW);
                    }
                }, this);
                //enemysp.beatt(1);
                break;
            }
        }
    };
    /**移动 */
    p.moving = function () {
        // if (!this.checkrun()) {
        //     return;
        // }
        var speed = PlayerData._i().speed;
        switch (PlayerData._i().curDir) {
            case Direction.UP:
                this.zhaoyunrole.y = GameUtil.MAX(this.zhaoyunrole.y - speed, this.zhaoyunrole.height / 2);
                var zyindex = this.getChildIndex(this.zhaoyunrole);
                var adindex = this.getChildIndex(this.adourole);
                if (this.getzytouchpoint() < this.getadtouchpoint() && zyindex > adindex) {
                    this.swapChildren(this.zhaoyunrole, this.adourole);
                }
                if (this.getzytouchpoint() > this.getadtouchpoint() && zyindex < adindex) {
                    this.swapChildren(this.zhaoyunrole, this.adourole);
                }
                break;
            case Direction.RIGHT:
                this.zhaoyunrole.$setScaleX(1);
                this.zhaoyunrole.x = GameUtil.MIN(this.zhaoyunrole.x + speed, GameConfig.getSW() - this.zhaoyunrole.width / 2);
                break;
            case Direction.DOWN:
                this.zhaoyunrole.y = GameUtil.MIN(this.zhaoyunrole.y + speed, GameConfig.getSH() - this.zhaoyunrole.height / 2);
                var zyindex = this.getChildIndex(this.zhaoyunrole);
                var adindex = this.getChildIndex(this.adourole);
                if (this.getzytouchpoint() < this.getadtouchpoint() && zyindex > adindex) {
                    this.swapChildren(this.zhaoyunrole, this.adourole);
                }
                if (this.getzytouchpoint() > this.getadtouchpoint() && zyindex < adindex) {
                    this.swapChildren(this.zhaoyunrole, this.adourole);
                }
                break;
            case Direction.LEFT:
                this.zhaoyunrole.$setScaleX(-1);
                this.zhaoyunrole.x = GameUtil.MAX(this.zhaoyunrole.x - speed, this.zhaoyunrole.width / 2);
                break;
        }
    };
    p.getzytouchpoint = function () {
        return this.zhaoyunrole.y + 90;
    };
    p.getadtouchpoint = function () {
        return this.adourole.y + 45;
    };
    /**检查赵云能否通过阿斗 */
    p.checkrun = function () {
        var disx = Math.abs(this.zhaoyunrole.x - this.adourole.x);
        var disy = Math.abs(this.getzytouchpoint() - this.getadtouchpoint());
        //console.log('zyyyy=====', this.getzytouchpoint(), 'adouy======', this.getadtouchpoint(), 'disx====', disx, 'disy====', disy);
        switch (PlayerData._i().curDir) {
            case Direction.UP:
                if (this.getzytouchpoint() > this.getadtouchpoint() && (this.getzytouchpoint() - this.getadtouchpoint() < 36) && disx < 140) {
                    return false;
                }
                break;
            case Direction.DOWN:
                if (this.getzytouchpoint() < this.getadtouchpoint() && (this.getzytouchpoint() - this.getadtouchpoint() > -36) && disx < 140) {
                    return false;
                }
                break;
            case Direction.LEFT:
                if (this.zhaoyunrole.x > this.adourole.x && this.zhaoyunrole.x - this.adourole.x < 158 && disy < 25) {
                    return false;
                }
                break;
            case Direction.RIGHT:
                if (this.zhaoyunrole.x < this.adourole.x && this.zhaoyunrole.x - this.adourole.x > -158 && disy < 25) {
                    return false;
                }
                break;
        }
        return true;
    };
    /**获取碰撞矩形 */
    p.getrect = function (obj, scx, scy, offx) {
        if (offx === void 0) { offx = 0; }
        var rect = obj.getBounds();
        rect.x = obj.x - obj.width * scx / 2 + offx;
        rect.y = obj.y - obj.height * scy / 2;
        rect.width = obj.width * scx;
        rect.height = obj.height * scy;
        //var sh: egret.Shape = GameUtil.createRect(rect.x, rect.y, rect.width, rect.height);
        //this.parent.addChild(sh);
        return rect;
    };
    p.createEnergy = function () {
        var energybottle = new MyBitmap(RES.getRes('energyBottle_png'), 76, 88);
        this.addChild(energybottle);
        this.energy = new GameUtil.Menu(this, 'energy_png', 'energy_png', this.powatt);
        this.energy.x = 76;
        this.energy.y = 106;
        this.addChild(this.energy);
        this.energymask = GameUtil.createRect(42, 150, this.energy.width, this.energy.height);
        this.addChild(this.energymask);
        this.energy.mask = this.energymask;
        this.updataenergy(GameConfig.PLAYERENERGY);
    };
    /**能量满，放技能*/
    p.powatt = function () {
        if (PlayerData._i().curenergy >= GameConfig.PLAYERENERGY) {
            var poweffect = new Animation('poweffect', 18, 100, this.mStageW / 2, this.mStageH / 2);
            this.addChild(poweffect);
            poweffect.play();
            var gamescene = (this.parent);
            var enemycontain = gamescene.enemyContain;
            for (var i = 0; i < enemycontain.numChildren; i++) {
                var enemysp = enemycontain.getChildAt(i);
                if (enemysp.bdie) {
                    continue;
                }
                enemysp.beatt(10000, true);
            }
            PlayerData._i().curenergy = 0;
            egret.Tween.removeTweens(this.energy);
            this.energy.scaleX = 1;
            this.energy.scaleY = 1;
            this.energymask.y = 150;
        }
    };
    /**更新玩家生命 */
    p.updatalife = function () {
        if (GameData._i().GameOver) {
            return;
        }
        if (PlayerData._i().curlife <= 0) {
            this.parent.gameover();
            GameData._i().gamesound[SoundName.fail].play();
            return;
        }
        this.life.setlife(PlayerData._i().curlife);
    };
    /**更新玩家能量 */
    p.updataenergy = function (value) {
        this.energymask.y -= this.energy.height * (value / GameConfig.PLAYERENERGY);
        if (PlayerData._i().curenergy == GameConfig.PLAYERENERGY) {
            egret.Tween.get(this.energy, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        }
    };
    /**重置 */
    p.reset = function () {
        this.energymask.y = 150;
        this.updatalife();
    };
    return Player;
}(GameUtil.BassPanel));
egret.registerClass(Player,'Player');
//# sourceMappingURL=Player.js.map