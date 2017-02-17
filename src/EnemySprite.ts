// TypeScript file
/**
 * Create by hardy on 16/12/27
 * 敌人
 */
enum EnemyType { SOLDIER, GENERAL, END };
class EnemySprite extends GameUtil.BassPanel {
    private type: EnemyType;                //类型
    private dir: number;                    //出场方向
    private spframe: number[] = [4, 10];    //不同状态的总帧数
    private life: Lifesprite;               //生命值
    private sp: Animation;                  //角色
    public bdie: boolean;                   //是否死亡
    //private atttag: number = -1;            //攻击定时器标志
    public intervalarr: number[];
    public constructor() {
        super();
    }
    public init() {
        //console.log('type====', this.type);
        this.intervalarr = [];
        this.bdie = false;
        /**创建角色 */
        var startpos: number[][] = [[-50, -50], [-50, this.mStageH / 2], [-50, this.mStageH - 50], [this.mStageW + 50, -50], [this.mStageW + 50, this.mStageH / 2], [this.mStageW + 50, this.mStageH - 50]];
        this.sp = new Animation('enemyrun1', this.spframe[RoleState.RUN], 80, startpos[this.dir][0], startpos[this.dir][1]);
        var sc: number = this.dir > 2 ? 1 : -1;
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
    }
    /**初始配置 */
    public initdata(type: EnemyType, dir: number) {
        this.type = type;
        this.dir = dir;
    }
    /**开始移动 */
    public start() {
        var posx: number = this.mStageW / 2;
        var posy: number = this.mStageH / 2;
        egret.Tween.get(this.sp).to({ x: posx, y: posy }, 12000);
        egret.Tween.get(this.life).to({ x: posx, y: posy - this.sp.height / 2 - 30 }, 12000).call(this.att, this);
    }
    /**攻击动作 */
    private att() {
        this.sp.switchani('enemyatt1', this.spframe[RoleState.ATT], -1);
        this.intervalarr.push(egret.setInterval(this.attplayer, this, 80 * this.spframe[RoleState.ATT]));
    }
    /**定时攻击 */
    private attplayer() {
        PlayerData._i().curlife--;
        (<GameScene>(GameUtil.GameScene.curScene)).getPlayer().updatalife();
    }
    /**被攻击 */
    public beatt(attpow: number, bpowatt: boolean=false) {
        this.life.sublife(attpow);
        if (this.life.getlife() <= 0) {
            this.die(bpowatt);
        }
    }
    /**死亡 */
    private die(bpowatt: boolean) {
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
        egret.Tween.get(this).to({ visible: false }, 100).to({ visible: true }, 100).to({ visible: false }, 100).to({ visible: true }, 100).to({ visible: false }, 100).call(function () {
            this.parent.removeChild(this);
            if (!bpowatt) {
                /**玩家获得能量 */
                var attpower: number = 50;
                PlayerData._i().curenergy = PlayerData._i().curenergy + attpower;
                if (PlayerData._i().curenergy > GameConfig.PLAYERENERGY) {
                    PlayerData._i().curenergy = GameConfig.PLAYERENERGY;
                }
                else {
                    (<GameScene>(GameUtil.GameScene.curScene)).getPlayer().updataenergy(attpower);
                }
            }
        }, this);
    }
    /**获取敌人角色 */
    public getsp(): Animation {
        return this.sp;
    }

}