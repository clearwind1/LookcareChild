/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
class GameScene extends GameUtil.BassPanel {
    public constructor() {
        super();
    }

    public init() {
        BGMPlayer._i().play(SoundName.gamebgm);
        this.showbg();
    }

    private showbg()
    {

    }

}