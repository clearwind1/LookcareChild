// TypeScript file
/**
 * Create by hardy on 16/12/27
 * 敌人
 */
enum EnemyType { SOLDIER, GENERAL, END };
class EnemySprite extends GameUtil.BassPanel {
    private type: EnemyType;
    private spframe: number[] = [4, 10];
    private life: Lifesprite;
    private sp: Animation;
    public bdie: boolean;
    private atttag: number = -1;
    public constructor() {
        super();
    }
    public init() {
        console.log('type====', this.type);
        this.bdie = false;
        var startpos: number[][] = [[-50, -50], [-50, this.mStageH / 2], [-50, this.mStageH - 50]];
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
    }

    public initdata(type: EnemyType) {
        this.type = type;
    }

    public start() {
        var posx: number = this.mStageW / 2;
        var posy: number = this.mStageH / 2;
        egret.Tween.get(this.sp).to({ x: posx, y: posy }, 12000);
        egret.Tween.get(this.life).to({ x: posx, y: posy - this.sp.height / 2 - 30 }, 12000).call(this.att, this);
    }
    private att() {
        this.sp.switchani('enemyatt1', this.spframe[RoleState.ATT], -1);
        this.atttag = egret.setInterval(this.attplayer, this, 80 * this.spframe[RoleState.ATT]);
    }

    private attplayer() {
        PlayerData._i().curlife--;
        (<GameScene>(GameUtil.GameScene.curScene)).getPlayer().updatalife();
    }

    public beatt(attpow: number) {
        this.life.sublife(attpow);
        if (this.life.getlife() <= 0) {
            this.die();
        }
    }
    private die() {
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
            /**敌人死亡获得能量 */
            var attpower: number = 1;
            PlayerData._i().curenergy = GameUtil.MIN(PlayerData._i().curenergy+attpower,GameConfig.PLAYERENERGY);
            (<GameScene>(GameUtil.GameScene.curScene)).getPlayer().updataenergy(attpower);
        }, this);
    }

    public getsp(): Animation {
        return this.sp;
    }

}