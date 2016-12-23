/**
 * Create by hardy on 16/12/22
 * 玩家类
 */

/**武器类型：弓箭，枪 */
enum Weapon { SPEAR, BOW, END };
/**方向 */
enum Direction { UP, RIGHT, DOWN, LEFT, END };
/**状态：跑动/攻击 */
enum RoleState { RUN, ATT };

class Player extends GameUtil.BassPanel {

    public life: Lifesprite;        //生命血量
    private curweapon: Weapon;      //当前武器
    private speed: number;          //速度
    private active: boolean;        //侦听活动状态
    private curDir: Direction;      //当前方向
    private adourole: Animation;    //阿斗
    private zhaoyunrole: Animation; //赵云
    private zyaniname: string[][] = [['spearrun', 'spearatt'], ['bowrun', 'bowatt']];
    private zyaniframe: number[][] = [[8, 10], [8, 8]];

    private intertag: number;       //定时器标志

    public constructor() {
        super();
    }

    public init() {
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
        var aniname: string = this.zyaniname[Weapon.SPEAR][RoleState.RUN];
        var aniframe: number = this.zyaniframe[Weapon.SPEAR][RoleState.RUN];
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

    }
    /**控制器 */
    private controlPanel() {
        /**赵云移动控制器 */
        var controlp: MyBitmap = new MyBitmap(RES.getRes('controlp_png'), this.mStageW / 2, GameUtil.absposy(210));
        this.addChild(controlp);
        controlp.touchEnabled = true;
        controlp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.DirTouchBegin, this);
        controlp.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.DirTouchMove, this);
        controlp.addEventListener(egret.TouchEvent.TOUCH_END, this.DirTouchEnd, this);
        controlp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.DirTouchCancel, this);

        /**移动按钮 */
        var movebtnpos: number[][] = [[195, 78], [295, 190], [195, 295], [86, 190]];
        for (var dir: Direction = Direction.UP; dir < Direction.END; dir++) {
            var movebtn: MyBitmap = new MyBitmap(RES.getRes('spear_png'));
            movebtn.name = '' + dir;
            movebtn.$setScaleX(1.3);
            movebtn.$setScaleY(1.3);
            movebtn.alpha = 0;
            this.addChild(movebtn);
            GameUtil.relativepos(movebtn, controlp, movebtnpos[dir][0], movebtnpos[dir][1]);
        }
        /**攻击按钮 */
        var attbtn: GameUtil.Menu = new GameUtil.Menu(this, 'spear_png', 'spear_png', this.att);
        attbtn.setBtnScale(1.6, 1.6);
        this.addChild(attbtn);
        GameUtil.relativepos(attbtn, controlp, 195, 190);
        /**切换武器按钮 */
        var swbName: string[] = ['spear_png', 'bow_png'];
        for (var i: Weapon = Weapon.SPEAR; i < Weapon.END; i++) {
            var switchwb: GameUtil.Menu = new GameUtil.Menu(this, swbName[i], swbName[i], this.switchweapon, [i, attbtn]);
            switchwb.setBtnScale(1.3, 1.3);
            this.addChild(switchwb);
            GameUtil.relativepos(switchwb, controlp, -75 + 525 * i, 222);
        }

    }

    /**切换武器 */
    private switchweapon(select: Weapon, attbtn: GameUtil.Menu) {
        if (select == this.curweapon)
            return;
        this.curweapon = select;
        var swbName: string[] = ['spear_png', 'bow_png'];
        attbtn.setButtonTexture(swbName[select], swbName[select]);

        var aniname: string = this.zyaniname[this.curweapon][RoleState.RUN];
        var aniframe: number = this.zyaniframe[this.curweapon][RoleState.RUN];
        this.zhaoyunrole.switchani(aniname, aniframe);
    }
    /**攻击 */
    private att() {
        var aniname: string = this.zyaniname[this.curweapon][RoleState.ATT];
        var aniframe: number = this.zyaniframe[this.curweapon][RoleState.ATT];
        this.zhaoyunrole.visible = false;
        this.zhaoyunrole.currentNumber = 0;
        this.zhaoyunrole.pause();
        var tpzyatt: Animation = new Animation(aniname, aniframe, 50, this.zhaoyunrole.x, this.zhaoyunrole.y);
        tpzyatt.setendcall(this.endatt, this);
        this.addChild(tpzyatt);
        tpzyatt.play();
    }
    private endatt() {
        this.zhaoyunrole.visible = true;
        this.zhaoyunrole.resume();
    }

    private DirTouchBegin(evt: egret.TouchEvent) {

        if (this.active) {
            return;
        }

        this.active = true;
        for (var i: Direction = Direction.UP; i < Direction.END; i++) {
            var dircontrolbtn: MyBitmap = <MyBitmap>this.getChildByName('' + i);
            var dir = parseInt(dircontrolbtn.name);
            //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
            if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
                this.curDir = dir;
                //this.playerrole.startmove(this.touchID);
                break;
            }
        }
    }
    private DirTouchMove(evt: egret.TouchEvent) {

        if (!this.active) {
            return;
        }

        for (var i: Direction = Direction.UP; i < Direction.END; i++) {
            var dircontrolbtn: MyBitmap = <MyBitmap>this.getChildByName('' + i);
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
    }
    private DirTouchEnd(evt: egret.TouchEvent) {

        if (!this.active) {
            return;
        }

        this.active = false;
        // this.playerrole.stopmove();
        this.curDir = Direction.END;
    }
    private DirTouchCancel(evt: egret.TouchEvent) {
        if (!this.active) {
            return;
        }

        this.active = false;
        //this.playerrole.stopmove();
        this.curDir = Direction.END;
    }
    /**移动 */
    private moving() {
        var speed: number = this.speed;
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
    }

    private getzytouchpoint(): number {
        return this.zhaoyunrole.y + 90;
    }
    private getadtouchpoint(): number {
        return this.adourole.y + 45;
    }

}