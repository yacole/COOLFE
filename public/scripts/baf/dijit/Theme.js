/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-9
 * Time: 上午9:45
 * 切换主题相关
 */
define(["dojo/query"],function(query){
    return {
        change_to : function(newTheme){
            dojo.forEach(query("link"),function(link_theme){

                if((link_theme.id != newTheme) && link_theme.id != "dojo" && link_theme.id != "obe"){
                    link_theme.disabled = true;
                }else{
                    link_theme.disabled = false;
                    dojo.addClass(dojo.body(),newTheme)
                }

            })
        }
    }
});