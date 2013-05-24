/**
 * Created with JetBrains PhpStorm.
 * User: ybchenyy
 * Date: 13-4-12
 * Time: 下午4:59
 * 用于存放ID
 */
define(function(){

    return {
        //baf.main
        appContainer : "appContainer",
        NavigatorPane : "bafDijitNavigator",
        WorkspacePane : "bafDijitWso",
        StatusPane  : "bafDijitStatus",
        loading : "bafLoading",
        vlbutton : "valuelistbt",
        confirmDialog : "confirmDialog",
        queryform : "QueryForm",
        queryresult : "QueryResult",
        qrGrid : "QueryResultGrid",
        qrGrid_class : "QueryResultGrid",

        //baf.dijit.layout.Navigator
        rolePane : "bafDijitNavigatorRole",
        rolePane_tree : "bafDijitNavigatorRoleTree",
        wstablist : "bafDijitWso_tablist",  //根据WorkspacePane的ID
        favoritePane : "bafDijitNavigatorFavorite",

        //baf.dijit.layout.StatusBar
        statusbarblock_class : "bafDijitStatusblock",
        messageblock : "bafDijitStatusmessage",
        userinfoblock : "bafDijitStatususerinfo",
        hostblock : "bafDijitStatushost",
        ToolbarSeparator_class :  "statusbarToolbarSeparator",
        messageDetailDialog_class :  "messageDetailDialog",

        //baf.wso.Form
        wso_Form : "bafwsoForm_",
        wso_MenuBar :  "bafDijitMenuBar_",
        wso_ToolBar :  "bafDijitToolBar_",
        wso_Content : "bafwsoFormContent_",
        wso_innerForm : "bafwsoForminnerForm_",
        wso_Content_class : "bafwsoFormContent",
        wso_FormContent_class : "bafwsoinnerFormContent",
        wso_innerForm : "bafwsoinnerForm_",


        //rightMenu
        wsotabMenu : "wsotabMenu",

        //program TYPE
        programTYPE_FORM : "01",
        programTYPE_REPORT : "02",
        programTYPE_BATCH : "03",
        programTYPE_INTERFACE : "04",

        //message TYPE
        messageTYPE_ERROR : "E",
        messageTYPE_WARNNING : "W",
        messageTYPE_INFO : "I"

    }
});