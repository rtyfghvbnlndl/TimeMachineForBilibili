function dayMove(dDict,limit,y,m,n){
    //目标字典，最大的偏移天数，年增减，月增减，日增减
    function yearM(year){
        if((year%4==0 && year%100!=0) || year%400==0)return [31,29,31,30,31,30,31,31,30,31,30,31]
        else return [31,28,31,30,31,30,31,31,30,31,30,31]
    }
    function mChange(yyyy,mm,dd){
        while (mm>11){
            mm-=11
            yyyy+=1}
        while(mm<0){
            mm+=11
            yyyy-+1}
        return [yyyy,mm,dd]
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
    a=mChange(yyyy,mm,dd)
    yyyy,mm,dd=a[0],a[1],a[2]
    var dd=d.getDate()+n
    a=dChange(yyyy,mm,dd)
    yyyy,mm,dd=a[0],a[1],a[2]
 
    
    var monLis=yearM(d.getFullYear())
    num=0
    var date
    var years,months,days=yyyy,mm,dd
    while(num<=limit){
        //优先减天数
        for(i=1;i<=2;i++){
        dChange(years,months,days)
        years,months,days=a[0],a[1],a[2]
        date=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()-num
        if(dDict[date]){console.log(num);return (dDict[date]) }
        //加天数
        num*=-1
        }
        num+=1 
    }
    return ('不在范围内')
}
var a={20190129:'123'}
b=dayMove(a,999999,-4,1,0)
console.log(b)