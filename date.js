currentdate();
getnextmonth(2);
// 获取当前月份的日期
function currentdate(){

    var mydate = new Date();
    var myyear = mydate.getFullYear();  //获取完整的年份(4位)
    var mymonth = mydate.getMonth()+1;    //获取当前月份(0-11,0代表1月)
    var myday = mydate.getDate();       //获取当前日(1-31)
    var myweek = mydate.getDay();       //获取当前星期(0-6,0代表星期天)
    var myallday = allday(myyear,mymonth);            //获取当前月份的总天数
    var myfirstdayweek= getDay(myyear,mymonth-1,1);

    // 当前年月
    var year_month_html="";
    year_month_html+='<tr class="year-month">';
    year_month_html+='    <td colspan="7">'+myyear+'年'+mymonth+'月</td>';
    year_month_html+='</tr>';
    $("#calendar").append(year_month_html);


    var day_html="";
    // 第一行日期
    var myday01=7-myfirstdayweek;

    day_html+='<tr class="day">';
    for(var i=0;i<myfirstdayweek;i++){
        day_html+='<td></td>';
    }
    for(var i=1;i<=myday01;i++){
        if(i<myday){
            day_html+='<td class="gray">'+i+'</td>';
        }else{
            var date=stringDate(myyear,mymonth,i);
            day_html+='<td class="btn" data-date="'+date+'">'+i+'</td>';
        }
    }
    day_html+='</tr>';
    // 中间行日期
    var myday02=myallday-myday01;
    var row=parseInt(myday02/7);
    for(var i=0;i<row;i++){
        day_html+='<tr class="day">';
        for(var j=0;j<7;j++){
            myday01++;
            if(myday01<myday){
                day_html+='<td class="gray">'+myday01+'</td>';
            }else{
                var date=stringDate(myyear,mymonth,myday01);
                day_html+='<td class="btn" data-date="'+date+'">'+myday01+'</td>';
            }
        }
        day_html+='</tr>';
    }
    // 最后一行日期
    var col=myday02%7;
    var myday03=myallday-col;
    if(col!=0){
        day_html+='<tr class="day">';
        for(var i=0;i<col;i++){
            myday03++;
            if(myday03<myday){
                day_html+='<td class="gray">'+myday03+'</td>';
            }else{
                var date=stringDate(myyear,mymonth,myday03);
                day_html+='<td class="btn" data-date="'+date+'">'+myday03+'</td>';
            }
        }
        for(var i=0;i<7-col;i++){
            day_html+='<td></td>';
        }
        day_html+='</tr>';    
    }
    $("#calendar").append(day_html);
}
// 获取当前月份接下来x个月的日期
function getnextmonth(x){
    var mydate = new Date();
    var year = mydate.getFullYear();  //获取完整的年份(4位)
    var month = mydate.getMonth()+1;    //获取当前月份(0-11,0代表1月)
    var myyear = year;  //获取完整的年份(4位)
    var mymonth = month;    //获取当前月份(0-11,0代表1月)
    for(var num=1;num<=x;num++){
        myyear = yearMonth(year,month,num)['year'];    //获取年份
        mymonth = yearMonth(year,month,num)['month'];  //获取月份
        var myweek = getDay(myyear,mymonth-1,1);       //获取当前星期(0-6,0代表星期天)
        var myallday = allday(myyear,mymonth);         //获取当前月份的总天数

        // 当前年月
        var year_month_html="";
        year_month_html+='<tr class="year-month">';
        year_month_html+='    <td colspan="7">'+myyear+'年'+mymonth+'月</td>';
        year_month_html+='</tr>';
        $("#calendar").append(year_month_html);

        var day_html="";
        // 第一行日期
        var myday01=7-myweek;

        day_html+='<tr class="day">';
        for(var i=0;i<myweek;i++){
            day_html+='<td></td>';
        }
        for(var i=1;i<=myday01;i++){
            var date=stringDate(myyear,mymonth,i);
            day_html+='<td class="btn" data-date="'+date+'">'+i+'</td>';
        }
        day_html+='</tr>';
        // 中间行日期
        var myday02=myallday-myday01;
        var row=parseInt(myday02/7);
        for(var i=0;i<row;i++){
            day_html+='<tr class="day">';
            for(var j=0;j<7;j++){
                myday01++;
                var date=stringDate(myyear,mymonth,myday01);
                day_html+='<td class="btn" data-date="'+date+'">'+myday01+'</td>';
            }
            day_html+='</tr>';
        }
        // 最后一行日期
        var col=myday02%7;
        var myday03=myallday-col;
        if(col!=0){
            day_html+='<tr class="day">';
            for(var i=0;i<col;i++){
                myday03++;
                var date=stringDate(myyear,mymonth,myday03);
                day_html+='<td class="btn" data-date="'+date+'">'+myday03+'</td>';
            }
            for(var i=0;i<7-col;i++){
                day_html+='<td></td>';
            }
            day_html+='</tr>';    
        }
        // 将日期显示在页面中
        $("#calendar").append(day_html); 
    } 
}

// 返回某年某月的天数
function allday(year,month){
    var isleapyear=((year % 4 == 0) && (year % 100 != 0 ))|| (year % 400 == 0);
    if(isleapyear){
        var twoday=29;
    }else{
        var twoday=28;
    }
    switch(month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:{
            return 31;
            break;
        }
        case 4:
        case 6:
        case 9:
        case 11:{
            return 30;
            break;
        }
        case 2:{
            return twoday;
            break;
        }
    }
}
// 返回某个日期的星期
function getDay(year,month,date) {
    var birthDay = new Date();
    birthDay.setFullYear(year);
    birthDay.setMonth(month);
    birthDay.setDate(date);
    var day = birthDay.getDay();
    return day;
}
// 返回当前年月下x个月的年月
function yearMonth(year,month,x){
    var this_month=month;
    var this_year=year;
    for(var i=0;i<x;i++){
        this_month+=1;
        if(this_month==13){
            this_month=1;
            this_year=year+1;
        }
    }
    var info={"year":this_year,"month":this_month};
    return info;
}
// 转换日期格式
function stringDate(year,month,day){
    var date="";
    date+=year;
    if(month<10){
        date=date+"-0"+month;
    }else{
        date=date+"-"+month;
    }
    if(day<10){
        date=date+"-0"+day;
    }else{
        date=date+"-"+day;
    }
    return date;
}
// 星期显示固定
$("#week li").css({
    "width":$("td").width()
})
// 点击事件
$("#calendar .btn").on("click",function(){
    var date=$(this).data("date");
    alert(date);
})


