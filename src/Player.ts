/**
 * Create by hardy on 16/12/22
 * 玩家类
 */

/**方向 */
enum Direction { UP, RIGHT, DOWN, LEFT, END };
/**状态：跑动/攻击 */
enum RoleState { RUN, ATT };
/**武器类型：弓箭，枪 */
enum Weapon { SPEAR, BOW, END };

class Player extends GameUtil.BassPanel {

    private life: Lifesprite;       //生命血量
    private adourole: Animation;    //阿斗
    private zhaoyunrole: Animation; //赵云
    private zyaniname: string[][] = [['spearrun', 'spearatt'], ['bowrun', 'bowatt']];
    private zyaniframe: number[][] = [[8, 10], [8, 11]];
    private rolelayer: egret.DisplayObjectContainer;

    private intertag: number;       //定时器标志
    private batting: boolean;       //正在攻击

    public constructor() {
        super();
    }

    public init() {
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
        var aniname: string = this.zyaniname[Weapon.SPEAR][RoleState.RUN];
        var aniframe: number = this.zyaniframe[Weapon.SPEAR][RoleState.RUN];
        this.zhaoyunrole = new Animation(aniname, aniframe, 80, this.mStageW / 2, this.mStageH / 2 + 100);
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

    }
    /**切换武器 */
    public switchweapon() {
        var aniname: string = this.zyaniname[PlayerData._i().curweapon][RoleState.RUN];
        var aniframe: number = this.zyaniframe[PlayerData._i().curweapon][RoleState.RUN];
        this.zhaoyunrole.switchani(aniname, aniframe);
    }
    /**攻击 */
    public att() {

        if (this.batting) {
            return;
        }
        this.batting = true;
        var aniname: string = this.zyaniname[PlayerData._i().curweapon][RoleState.ATT];
        var aniframe: number = this.zyaniframe[PlayerData._i().curweapon][RoleState.ATT];
        this.zhaoyunrole.switchani(aniname, aniframe, 0, false);
        this.zhaoyunrole.setendcall(this.endatt, this);

        this.checkattenemy();

    }
    private endatt() {
        this.batting = false;
        var aniname: string = this.zyaniname[PlayerData._i().curweapon][RoleState.RUN];
        var aniframe: number = this.zyaniframe[PlayerData._i().curweapon][RoleState.RUN];
        this.zhaoyunrole.switchani(aniname, aniframe, -1, false);
    }
    /**检测攻击结果 */
    private checkattenemy() {
        var gamescene: GameScene = <GameScene>(this.parent);
        var enemycontain: egret.DisplayObjectContainer = gamescene.enemyContain;
        for (var i: number = 0; i < enemycontain.numChildren; i++) {
            var enemysp = <EnemySprite>enemycontain.getChildAt(i);
            if (enemysp.bdie) {
                continue;
            }
            if (PlayerData._i().curweapon == Weapon.SPEAR) {
                var rect1 = this.getrect(this.zhaoyunrole, 1, 1);
                var rect2 = this.getrect(enemysp.getsp(), 1, 0.9);
                if (rect1.intersects(rect2)) {
                    enemysp.beatt(1);
                    break;
                }
            }
            else {

            }
        }
    }
    /**移动 */
    private moving() {

        if (!this.checkrun()) {
            return;
        }

        var speed: number = PlayerData._i().speed;
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
    }

    private getzytouchpoint(): number {
        return this.zhaoyunrole.y + 90;
    }
    private getadtouchpoint(): number {
        return this.adourole.y + 45;
    }
    /**检查赵云能否通过阿斗 */
    private checkrun(): boolean {
        var disx: number = Math.abs(this.zhaoyunrole.x - this.adourole.x);
        var disy: number = Math.abs(this.getzytouchpoint() - this.getadtouchpoint());
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
    }
    /**获取碰撞矩形 */
    private getrect(obj: any, scx: number, scy: number): egret.Rectangle {
        var rect: egret.Rectangle = obj.getBounds();
        rect.x = obj.x - obj.width * scx / 2;
        rect.y = obj.y - obj.height * scy / 2;
        rect.width = obj.width * scx;
        rect.height = obj.height * scy;

        // var sh: egret.Shape = GameUtil.createRect(rect.x, rect.y, rect.width, rect.height);
        // this.parent.addChild(sh);

        return rect;
    }
    /**玩家能量 */
    private energy: MyBitmap;
    private energymask: egret.Shape;
    private createEnergy() {
        var energybottle: MyBitmap = new MyBitmap(RES.getRes('energyBottle_png'), 50, 56);
        this.addChild(energybottle);
        this.energy = new MyBitmap(RES.getRes('energy_png'), 50, 65);
        this.addChild(this.energy);
        this.energymask = GameUtil.createRect(28, 90, this.energy.width, this.energy.height);
        this.addChild(this.energymask);
        this.energy.mask = this.energymask;

        //this.updataenergy();
    }
    /**更新玩家生命 */
    public updatalife() {
        this.life.setlife(PlayerData._i().curlife);
    }
    /**更新玩家能量 */
    public updataenergy(value:number)
    {
        this.energymask.y -= this.energy.height * (value / GameConfig.PLAYERENERGY); 
    }

}