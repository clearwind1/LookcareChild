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
            shareopenid: '',
        };
    }
    var d = __define,c=PlayerData,p=c.prototype;
    PlayerData._i = function () {
        return (this._inst = (this._inst == null ? new PlayerData() : this._inst));
    };
    PlayerData._inst = null;
    return PlayerData;
}());
egret.registerClass(PlayerData,'PlayerData');
//# sourceMappingURL=PlayerData.js.map