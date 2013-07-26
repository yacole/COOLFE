define(["base/Util"],function(Util){
    return {
        /*
         *   摘要:
         *        运算符、公式
        */

            //动作：= ; != ; > ; < ; LIKE ; NOT LIKE ;IN ; NOT IN ;
            IN : {name : "IN",description : Util.label.filter_action_IN},
            NOT_IN : {name : "NOT IN",description : Util.label.filter_action_NOT_IN},
            EQ : {name : "EQ",description : Util.label.filter_action_EQ},
            NE : {name : "NE",description : Util.label.filter_action_NE},
            GT : {name : "GT",description : Util.label.filter_action_GT},
            GE : {name : "GE",description : Util.label.filter_action_GE},
            LT : {name : "LT",description : Util.label.filter_action_LT},
            LE : {name : "LE",description : Util.label.filter_action_LE},
            HE : {name : "HE",description : Util.label.filter_action_HE},
            HNE : {name : "HNE",description : Util.label.filter_action_HNE},
            TE : {name : "TE",description : Util.label.filter_action_TE},
            TNE : {name : "TNE",description : Util.label.filter_action_TNE},
            LIKE : {name : "LIKE",description : Util.label.filter_action_LIKE},
            NOT_LIKE : {name : "NOT LIKE",description : Util.label.filter_action_NOT_LIKE}

    }
});