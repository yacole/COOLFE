define(["dojo/query"],function(query){
    /*
     *   摘要:
     *       可用于切换主题（已废弃）
     */
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