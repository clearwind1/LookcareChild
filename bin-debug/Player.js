/**
 * Create by hardy on 16/12/22
 * 玩家类
 */
/**武器类型：弓箭，枪 */
var Weapon;
(function (Weapon) {
    Weapon[Weapon["SPEAR"] = 0] = "SPEAR";
    Weapon[Weapon["BOW"] = 1] = "BOW";
    Weapon[Weapon["END"] = 2] = "END";
})(Weapon || (Weapon = {}));
;
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.zyaniname = [['spearrun', 'spearatt'], ['bowrun', 'bowatt']];
        this.zyaniframe = [[8, 10], [8, 8]];
    }
    var d = __define,c=Player,p=c.prototype;
    p.init = function () {
        this.speed = 20;
        this.active = false;
        this.curweapon = Weapon.SPEAR;
        this.curDir = Direction.END;
        /**阿斗 */
        this.adourole = new Animation('dou', 10, 100, this.mStageW / 2, this.mStageH / 2);
        this.addChild(this.adourole);
        this.adourole.setLoop(-1);
        this.adourole.play();
        /**赵云 */
        var aniname = this.zyaniname[Weapon.SPEAR][RoleState.RUN];
        var aniframe = this.zyaniframe[Weapon.SPEAR][RoleState.RUN];
        this.zhaoyunrole = new Animation(aniname, aniframe, 100, this.mStageW / 2, this.mStageH / 2 + 100);
        this.addChild(this.zhaoyunrole);
        this.zhaoyunrole.setLoop(-1);
        this.zhaoyunrole.play();
        this.controlPanel();
        /**玩家生命 */
        this.life = new Lifesprite(GameConfig.PLAYERLIFE);
        this.life.x = 105;
        this.life.y = 35;
        this.addChild(this.life);
        this.intertag = egret.setInterval(this.moving, this, 100);
    };
    /**控制器 */
    p.controlPanel = function () {
        /**赵云移动控制器 */
        var controlp = new MyBitmap(RES.getRes('controlp_png'), this.mStageW / 2, GameUtil.absposy(210));
        this.addChild(controlp);
        controlp.touchEnabled = true;
        controlp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.DirTouchBegin, this);
        controlp.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.DirTouchMove, this);
        controlp.addEventListener(egret.TouchEvent.TOUCH_END, this.DirTouchEnd, this);
        controlp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.DirTouchCancel, this);
        /**移动按钮 */
        var movebtnpos = [[195, 78], [295, 190], [195, 295], [86, 190]];
        for (var dir = Direction.UP; dir < Direction.END; dir++) {
            var movebtn = new MyBitmap(RES.getRes('spear_png'));
            movebtn.name = '' + dir;
            movebtn.$setScaleX(1.3);
            movebtn.$setScaleY(1.3);
            this.addChild(movebtn);
            GameUtil.relativepos(movebtn, controlp, movebtnpos[dir][0], movebtnpos[dir][1]);
        }
        /**攻击按钮 */
        var attbtn = new GameUtil.Menu(this, 'spear_png', 'spear_png', this.att);
        attbtn.setBtnScale(1.6, 1.6);
        this.addChild(attbtn);
        GameUtil.relativepos(attbtn, controlp, 195, 190);
        /**切换武器按钮 */
        var swbName = ['spear_png', 'bow_png'];
        for (var i = Weapon.SPEAR; i < Weapon.END; i++) {
            var switchwb = new GameUtil.Menu(this, swbName[i], swbName[i], this.switchweapon, [i, attbtn]);
            switchwb.setBtnScale(1.3, 1.3);
            this.addChild(switchwb);
            GameUtil.relativepos(switchwb, controlp, -75 + 525 * i, 222);
        }
    };
    /**切换武器 */
    p.switchweapon = function (select, attbtn) {
        if (select == this.curweapon)
            return;
        this.curweapon = select;
        var swbName = ['spear_png', 'bow_png'];
        attbtn.setButtonTexture(swbName[select], swbName[select]);
        var aniname = this.zyaniname[this.curweapon][RoleState.RUN];
        var aniframe = this.zyaniframe[this.curweapon][RoleState.RUN];
        this.zhaoyunrole.switchani(aniname, aniframe);
    };
    /**攻击 */
    p.att = function () {
        var aniname = this.zyaniname[this.curweapon][RoleState.ATT];
        var aniframe = this.zyaniframe[this.curweapon][RoleState.ATT];
        this.zhaoyunrole.visible = false;
        this.zhaoyunrole.currentNumber = 0;
        this.zhaoyunrole.pause();
        var tpzyatt = new Animation(aniname, aniframe, 50, this.zhaoyunrole.x, this.zhaoyunrole.y);
        tpzyatt.setendcall(this.endatt, this);
        this.addChild(tpzyatt);
        tpzyatt.play();
    };
    p.endatt = function () {
        this.zhaoyunrole.visible = true;
        this.zhaoyunrole.resume();
    };
    p.DirTouchBegin = function (evt) {
        if (this.active) {
            return;
        }
        this.active = true;
        for (var i = Direction.UP; i < Direction.END; i++) {
            var dircontrolbtn = this.getChildByName('' + i);
            var dir = parseInt(dircontrolbtn.name);
            //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
            if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
                this.curDir = dir;
                //this.playerrole.startmove(this.touchID);
                break;
            }
        }
    };
    p.DirTouchMove = function (evt) {
        if (!this.active) {
            return;
        }
        for (var i = Direction.UP; i < Direction.END; i++) {
            var dircontrolbtn = this.getChildByName('' + i);
            var dir = parseInt(dircontrolbtn.name);
            //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
            if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
                if (this.curDir != dir) {
                    this.curDir = dir;
                    //this.playerrole.stopmove();
                    //this.playerrole.startmove(this.touchID);
                    break;
                }
            }
        }
    };
    p.DirTouchEnd = function (evt) {
        if (!this.active) {
            return;
        }
        this.active = false;
        // this.playerrole.stopmove();
        this.curDir = Direction.END;
    };
    p.DirTouchCancel = function (evt) {
        if (!this.active) {
            return;
        }
        this.active = false;
        //this.playerrole.stopmove();
        this.curDir = Direction.END;
    };
    /**移动 */
    p.moving = function () {
        var speed = this.speed;
        switch (this.curDir) {
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
    return Player;
}(GameUtil.BassPanel));
egret.registerClass(Player,'Player');
//# sourceMappingURL=Player.js.map