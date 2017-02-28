function toolGit(id){
    return document.getElementById(id);
}
function tool_isRN(year){
    if((year%4==0)&&(year%100!=0)||(year%400==0)){
        return 1;
    }else{
        return 0;
    }
}

function calender_init(year,mouth,date){
    var init= new Date(year,mouth,date);
    var init_year = init.getFullYear();
    var init_mouth = init.getMonth()+1;
    var init_week = init.getDay();
    var init_day = init.getDate();
    var calender_title = {
        left_year_01 : "<",
        left_year_02 : "<",
        title_year : init_year,
        title_mouth : init_mouth,
        right_year_01 : ">",
        right_year_02 : ">"
    };
    var calender_type = {
        calender : "calender",
        title : "title",
        main : "main",
        main_title : "main_title",
        main_span : "main_span",
        main_span_title : "main_span_title",
        title_span : "title_span",
        main_span_hide : "main_span_hide"
    }
    var mouth_total = [31,28+tool_isRN(init_year),31,30,31,30,31,30,31,30,31,30,31];

    var calender = {
        day_list : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
        day_create : init_day,
        begin_date : init_week,
        begin_mouth : init_mouth,
        mouth_total : mouth_total,
        row_number : Math.ceil((mouth_total[init_mouth]+init_week)/7),
        calender_title :calender_title,
        calender_type : calender_type
    }
    calender_changed={
        yearPrevent :function(){

            delet("allShell");
            calender_init(init_year-1,init_mouth-1,1);
        },
        yearNext :function(){
            delet("allShell");
            calender_init(init_year+1,init_mouth-1,1);
        },
        mouthPrevent : function(){
            delet("allShell");
            if(init_mouth===1){
                calender_init(init_year-1,11,1);
            }else{
                calender_init(init_year,init_mouth-2,1);
            }
        },
        mouthNext :function(){
            delet("allShell");
            if(init_mouth===12){
                calender_init(init_year+1,0,1);
            }else{
                calender_init(init_year,init_mouth,1);
            }
        }
    }



    calender_create(calender);
    var mouth_prevent = document.getElementsByTagName('span')[1];
    var mouth_next = document.getElementsByTagName('span')[4];
    var year_prevent = document.getElementsByTagName('span')[0];
    var year_next = document.getElementsByTagName('span')[5];
    mouth_prevent.addEventListener('click',calender_changed.mouthPrevent);
    mouth_next.addEventListener('click',calender_changed.mouthNext);
    year_prevent.addEventListener('click',calender_changed.yearPrevent);
    year_next.addEventListener('click',calender_changed.yearNext);
}

function calender_create(calender){
    var arrayList = [];
    var bodyArray = [];
    var count = 0;
    var last = 0;


    var doc_calender = tool_git("calender");
    var div_title = document.createElement("div");
    var div_main_title = document.createElement("div");
    var div_main_body_shell = document.createElement("div");
    var div_main_body_allShell = document.createElement("div");
    var div_main_body = document.createElement("div");

    //添加抬头
    for(var element in calender.calender_title ){
        arrayList[element] = document.createElement('span');
        arrayList[element].innerHTML = calender.calender_title[element];
        arrayList[element].className = calender.calender_type.title_span;
        div_title.appendChild( arrayList[element]);
    }
    div_title.divID = "div_title";
    div_main_body_allShell.appendChild(div_title);
    //添加星期1-7
    for(var i=0;i<7;i++){
        var span = document.createElement("span");
        span.innerHTML = calender.day_list[i];
        span.className = calender.calender_type.main_span_title;
        span.font="verdana";
        div_main_title.appendChild(span);
    }
    div_main_title.className = calender.calender_type.main_title;
    div_main_body_allShell.appendChild(div_main_title);
    //添加主体日期
    for(j=0;j<calender.mouth_total[calender.begin_mouth-1];j++){
        var span = document.createElement("div");
        span.innerHTML = j+1;
        span.className = calender.calender_type.main_span;
        bodyArray.push(span);
    }


    for(var l=0;l<calender.begin_date-1;l++){
        var span = document.createElement("div");
        span.innerHTML =calender.mouth_total[calender.begin_mouth-1]-calender.begin_date+l;
        span.className = calender.calender_type.main_span_hide;
        div_main_body.appendChild(span);
    }


    for(var k=0;k<calender.row_number;k++){
        if(k===0){
            for(var m=calender.begin_date;m<=7;m++){
                div_main_body.appendChild(bodyArray[count++]);
            }
            div_main_body.className = calender.calender_type.main;
            div_main_body_shell.appendChild(div_main_body);
        }else{
            div_main_body = document.createElement("div");    //removechild()问题
            for(var i=0;i<7;i++){
                if(bodyArray[count]!==undefined){
                    div_main_body.appendChild(bodyArray[count++]);
                    last = i;
                }else{
                    var span = document.createElement("div");
                    span.innerHTML = (i-last);
                    span.className = calender.calender_type.main_span_hide;
                    div_main_body.appendChild(span);
                }

            }
            div_main_body.className = calender.calender_type.main;
            div_main_body_shell.appendChild(div_main_body);
        }
    }
    div_main_body.className = calender.calender_type.main;
    div_main_body_shell.appendChild(div_main_body);
    div_main_body_allShell.appendChild(div_main_body_shell);
    div_main_body_allShell.id = "allShell";
    doc_calender.appendChild(div_main_body_allShell);
}

function delet(_id){
    var doc = tool_git(_id);
    var parentNode = doc.parentNode;
    parentNode.removeChild(doc);
}
window.onload = calender_init(new Date().getFullYear(),new Date().getMonth(),1);
//window.onload = calender_init(2017,1,1);