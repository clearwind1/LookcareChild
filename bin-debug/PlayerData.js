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
        this.initdata();
    }
    var d = __define,c=PlayerData,p=c.prototype;
    p.initdata = function () {
        this.UserInfo.jifen = 0;
        this.UserInfo.killsoldier = 0;
        this.UserInfo.killgeneral = 0;
    };
    PlayerData._i = function () {
        return (this._inst = (this._inst == null ? new PlayerData() : this._inst));
    };
    PlayerData._inst = null;
    return PlayerData;
}());
egret.registerClass(PlayerData,'PlayerData');
//# sourceMappingURL=PlayerData.js.map