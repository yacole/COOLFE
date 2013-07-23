define([],function(){
    // 浏览器脚本函数列表
//  boolean isNumber(numStr)         ：判断字符串是否是数值格式
//  boolean isBlank(szStr)           ：判断字符串是否为空字符串（或不包含除空格外的其他字符）
//  boolean isDateStr(ds)            ：判断字符串是否为合法的日期格式：YYYY-MM-DD HH:MM:SS 或 YYYY-MM-DD 或 HH:MM:SS
//  boolean isDatePart(dateStr)      ：判断字符串是否为合法的日期格式：YYYY-MM-DD
//  boolean isTimePart(dateStr)      ：判断字符串是否为合法的时间格式：HH:MM:SS
    return {
        isNumber : function(numStr){
            return !isNaN(numStr);
        },
        isBlank : function(szStr){
            if(szStr.length < 1){
                return true;
            }
            for(i = 0; i < szStr.length; i ++){
                if(szStr.substring(i, i + 1) != ' '){
                    return false;
                }
            }
            return true;
        },
        isDateStr : function(ds){
            var parts = ds.split(' ');
            switch(parts.length){
                case 2:
                    if(this.isDatePart( parts[0] ) == true && this.isTimePart( parts[1] )){
                        return true;
                    }else{
                        return false;
                    }
                case 1:
                    var aPart = parts[0];
                    if(aPart.indexOf(':') > 0 ){
                        return this.isTimePart(aPart);
                    }else{
                        return this.isDatePart(aPart);
                    }
                default:
                    return false;
            }
        },
        isDatePart : function(dateStr){
            var parts;
            if(dateStr.indexOf("-") > -1){
                parts = dateStr.split('-');
            }else if(dateStr.indexOf("/") > -1){
                parts = dateStr.split('/');
            }else{
                return false;
            }
            if(parts.length < 3){
                //日期部分不允许缺少年、月、日中的任何一项
                return false;
            }
            for(var i = 0 ;i < 3; i ++){
                //如果构成日期的某个部分不是数字，则返回false
                if(isNaN(parts[i])){
                    return false;
                }
            }
            var y = parts[0];//年
            var m = parts[1];//月
            var d = parts[2];//日
            if(y > 3000){
                return false;
            }
            if(m < 1 || m > 12){
                return false;
            }
            switch(d){
                case 29:
                    if(m == 2){
                        //如果是2月份
                        if( (y / 100) * 100 == y && (y / 400) * 400 != y){
                            //如果年份能被100整除但不能被400整除 (即闰年)
                        }else{
                            return false;
                        }
                    }
                    break;
                case 30:
                    if(m == 2){
                        //2月没有30日
                        return false;
                    }
                    break;
                case 31:
                    if(m == 2 || m == 4 || m == 6 || m == 9 || m == 11){
                        //2、4、6、9、11月没有31日
                        return false;
                    }
                    break;
                default:
            }
            return true;
        },
        isTimePart : function(timeStr){
            var parts = timeStr.split(':');
            if(parts.length < 2){
                //日期部分不允许缺少小时、分钟中的任何一项
                return false;
            }
            for(var i = 0 ;i < parts.length; i ++){
                //如果构成时间的某个部分不是数字，则返回false
                if(isNaN(parts[i])){
                    return false;
                }
            }
            var h = parts[0];//年
            var m = parts[1];//月
            if( h < 0 || h > 23){
                //限制小时的范围
                return false;
            }
            if( m < 0 || h > 59){
                //限制分钟的范围
                return false;
            }
            if(parts.length > 2){
                var s = parts[2];//日
                if( s < 0 || s > 59){
                    //限制秒的范围
                    return false;
                }
            }
            return true;
        }

    }
});