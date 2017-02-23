/**
 * Create by hardy on 16/12/28
 * 控制面板类
 */
var ControlPanel = (function (_super) {
    __extends(ControlPanel, _super);
    function ControlPanel() {
        _super.call(this);
    }
    var d = __define,c=ControlPanel,p=c.prototype;
    p.init = function () {
        this.active = false;
        /**控制器 */
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
            movebtn.alpha = 0;
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
            switchwb.setBtnSound(GameData._i().gamesound[SoundName.click]);
            GameUtil.relativepos(switchwb, controlp, -75 + 525 * i, 222);
        }
    };
    /**切换武器 */
    p.switchweapon = function (select, attbtn) {
        if (select == PlayerData._i().curweapon)
            return;
        PlayerData._i().curweapon = select;
        var swbName = ['spear_png', 'bow_png'];
        attbtn.setButtonTexture(swbName[select], swbName[select]);
        var gamescene = this.parent;
        gamescene.getPlayer().switchweapon();
    };
    /**攻击 */
    p.att = function () {
        var gamescene = this.parent;
        gamescene.getPlayer().att();
    };
    p.DirTouchBegin = function (evt) {
        if (this.active) {
            return;
        }
        this.active = true;
        for (var i = Direction.UP; i < Direction.END; i++) {
            var dircontrolbtn = this.getChildByName('' + i);
            var dir = parseInt(dircontrolbtn.name);
            if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
                PlayerData._i().curDir = dir;
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
            if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
                if (PlayerData._i().curDir != dir) {
                    PlayerData._i().curDir = dir;
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
        PlayerData._i().curDir = Direction.END;
    };
    p.DirTouchCancel = function (evt) {
        if (!this.active) {
            return;
        }
        this.active = false;
        PlayerData._i().curDir = Direction.END;
    };
    return ControlPanel;
}(GameUtil.BassPanel));
egret.registerClass(ControlPanel,'ControlPanel');
//# sourceMappingURL=ControlPanel.js.map