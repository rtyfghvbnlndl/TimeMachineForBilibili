function dayMove(dDict,limit,y,m,n){
    //目标字典，最大的偏移天数，年增减，月增减，日增减
    function yearM(year){
        if((year%4==0 && year%100!=0) || year%400==0)return [31,29,31,30,31,30,31,31,30,31,30,31]
        else return [31,28,31,30,31,30,31,31,30,31,30,31]
    }
    function mChange(yyyy,mm){
        while (mm>11){
            mm-=12
            yyyy+=1}
        while(mm<0){
            mm+=12
            yyyy-+1}
        return [yyyy,mm]
    }
    function dChange(yyyy,mm,dd){
        while(dd>yearM(yyyy)[mm]){
            dd-=yearM(yyyy)[mm]
            mm+=1
            a=mChange(yyyy,mm)
            mm=a[1]
            yyyy=a[0]
        }
        while(dd<1){
            mm-=1
            a=mChange(yyyy,mm)
            mm=a[1]
            yyyy=a[0]
            dd+=yearM(yyyy)[mm]  
        }
        return [yyyy,mm,dd]
        
    }
    d=new Date()
    var yyyy=d.getFullYear()+y
    var mm=d.getMonth()+m
    a=mChange(yyyy,mm)
    yyyy=a[0];mm=a[1]
    var dd=d.getDate()+n
    a=dChange(yyyy,mm,dd)
    yyyyy=a[0];mm=a[1];dd=a[2]
 
    
    var monLis=yearM(d.getFullYear())
    num=0
    var date
    
    while(num<=limit){
        
        
        //优先减天数
        for(i=1;i<=2;i++){
            var years=yyyy;var months=mm;var days=dd
            days+=num
            a=dChange(years,months,days)
            years=a[0];months=a[1];days=a[2]
            date=years*10000+(months+1)*100+days
            if(dDict[date]){console.log(date);return date }
            //加天数
            num*=-1
        }
        num+=1 
    }
    return ('不在范围内')
}
//var a={20190126:'123',20190130:'123',20190131:'123'}
//b=dayMove(a,30,-4,1,5)
//console.log(b)