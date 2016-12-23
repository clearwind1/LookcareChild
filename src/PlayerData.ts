/**
 * 玩家信息
 * Created by pior on 16/12/15.
 */

class PlayerData {

    public UserInfo: any = {
        ID: '',
        nickname: '',
        openid: '',
        jifen: 0,           //积分
        killsoldier: 0,     //杀敌数
        killgeneral: 0,     //杀将数
        shareopenid: '',    //分享者的openid
    };

    public constructor() {
        this.initdata();
    }
    public initdata()
    {
        this.UserInfo.jifen = 0;
        this.UserInfo.killsoldier = 0;
        this.UserInfo.killgeneral = 0;
    }

    private static _inst: PlayerData = null;

    public static _i(): PlayerData {
        return (this._inst = (this._inst == null ? new PlayerData() : this._inst));
    }
}

