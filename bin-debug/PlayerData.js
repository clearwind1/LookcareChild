/**
 * 玩家信息
 * Created by pior on 16/12/15.
 */
var PlayerData = (function () {
    function PlayerData() {
        this.UserInfo = {
            ID: '',
            nickname: '',
            openid: '',
            jifen: 0,
            killsoldier: 0,
            killgeneral: 0,
            shareopenid: '',
        };
        this.curweapon = Weapon.END; //当前武器
        this.initdata();
    }
    var d = __define,c=PlayerData,p=c.prototype;
    p.initdata = function () {
        this.UserInfo.jifen = 0;
        this.UserInfo.killsoldier = 0;
        this.UserInfo.killgeneral = 0;
        this.speed = 20;
        this.curweapon = (this.curweapon == Weapon.END) ? Weapon.SPEAR : this.curweapon;
        this.curDir = Direction.END;
        this.curlife = GameConfig.PLAYERLIFE;
        this.curenergy = GameConfig.PLAYERENERGY;
    };
    PlayerData._i = function () {
        return (this._inst = (this._inst == null ? new PlayerData() : this._inst));
    };
    PlayerData._inst = null;
    return PlayerData;
}());
egret.registerClass(PlayerData,'PlayerData');
//# sourceMappingURL=PlayerData.js.map