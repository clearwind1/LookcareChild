/**
 * Created by pior on 16/12/15.
 */
var GameData = (function () {
    function GameData() {
        this.gamesound = [];
        this.init();
    }
    var d = __define,c=GameData,p=c.prototype;
    p.init = function () {
        this.GameOver = false;
        this.isLoadingend = false;
    };
    GameData._i = function () {
        return (this._inst = (this._inst == null ? new GameData() : this._inst));
    };
    GameData._inst = null;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
//# sourceMappingURL=GameData.js.map