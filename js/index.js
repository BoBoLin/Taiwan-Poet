
$(document).ready(function(){
	//-------index

	
	//-------poet
    $(".bihua").click(function(){
		$(".bihua").css("background-color","#009eb7");
		$(".pinyin").css("background-color","#dddcda");
		$(".bihua > a").css("color", "white");
		$(".pinyin > a").css("color", "#694201");
		$(".wrapper-dropdown-1").css("background", "#eaf5f7")
        $("#pinyin").hide();
        $("#bihua").show();
    });

	$(".pinyin").click(function(){
		$(".pinyin").css("background-color","#00a191");
		$(".bihua").css("background-color","#dddcda");
		$(".pinyin > a").css("color", "white");
		$(".bihua > a").css("color", "#694201");
		$(".wrapper-dropdown-1").css("background", "#e6f4f4")
        $("#bihua").hide();
		$("#pinyin").show();
    });

	$("#bihua_select").on( "click", "option", function(){ //下拉式選單選取到值
		var bihua_select = $(this).val();
		if(bihua_select != -1)
		{
			searchSurnameByBihua(bihua_select); //得到此筆畫數的所有姓氏
			$("#show_bihua > input").remove();
			$("#bihua_number").text($(this).text());
			$("#cc > span").text("　　　"+$(this).text());
        }
		$("#bihua_last_name").text("");
		
	});
	
	$("#pinyin_select").on( "click", "option", function(){ //下拉式選單選取到值
		var pinyin_select = $(this).val();
		if(pinyin_select != -1)
		{
			searchSurnameByPinyin(pinyin_select);
			$("#show_pinyin > input").remove();
			$("#pinyin_number").text($(this).text());
			$("#dd > span").text("　　　"+$(this).text());
		}
		$("#pinyin_last_name").text("");
	});
	
	$("#show_bihua").on( "click", "#find_last_name", function(){ //點下姓氏
		$("#show_bihua > input").remove();
		$("#bihua_last_name").text($(this).attr('value'));
		var last_name = $(this).attr('value');
		searchNameBySurname(last_name, 1);
		
	});
	
	$("#show_pinyin").on( "click", "#find_last_name", function(){ //點下姓氏
		$("#show_pinyin > input").remove();
		$("#pinyin_last_name").text($(this).attr('value'));
		var last_name = $(this).attr('value');
		searchNameBySurname(last_name, 2);
		
	});
	
	$("#show_bihua, #show_pinyin").on("click", ".post_id", function(){
		window.location.href='poet_info.html?'+$(this).attr('id');
	});
	
	//-------------------poet_info
	$("#summary").click(function(){
		$("#summary > a > p").css({"background-color": "#928e06", "color": "white"});
		$("#information > a > p, #life > a > p, #experience > a > p, #studies > a > p, #relationship > a > p").css({"background-color": "", "color": "#734c00"});
		$("#summary_content").show();
        $("#information_content, #life_content, #experience_content, #studies_content, #relationship_content").hide();
		$("#editor_name, #editor_name_show").show();
	});
	
	$("#information").click(function(){
		$("#information > a > p").css({"background-color": "#928e06", "color": "white"});
		$("#summary > a > p, #life > a > p, #experience > a > p, #studies > a > p, #relationship > a > p").css({"background-color": "", "color": "#734c00"});
		$("#information_content").show();
        $("#summary_content, #life_content, #experience_content, #studies_content, #relationship_content").hide();
		$("#editor_name, #editor_name_show").hide();
	});
	
	$("#life").click(function(){
		$("#life > a > p").css({"background-color": "#928e06", "color": "white"});
		$("#summary > a > p, #information > a > p, #experience > a > p, #studies > a > p, #relationship > a > p").css({"background-color": "", "color": "#734c00"});
		$("#life_content").show();
        $("#summary_content, #information_content, #experience_content, #studies_content, #relationship_content").hide();
		$("#editor_name, #editor_name_show").hide();
	});
	
	$("#experience").click(function(){
		$("#experience > a > p").css({"background-color": "#928e06", "color": "white"});
		$("#summary > a > p, #information > a > p, #life > a > p, #studies > a > p, #relationship > a > p").css({"background-color": "", "color": "#734c00"});
		$("#experience_content").show();
        $("#summary_content, #information_content, #life_content, #studies_content, #relationship_content").hide();
		$("#editor_name, #editor_name_show").hide();
	});
	
	$("#studies").click(function(){
		$("#studies > a > p").css({"background-color": "#928e06", "color": "white"});
		$("#summary > a > p, #information > a > p, #life > a > p, #experience > a > p, #relationship > a > p").css({"background-color": "", "color": "#734c00"});
		$("#studies_content").show();
        $("#summary_content, #information_content, #life_content, #experience_content, #relationship_content").hide();
		$("#editor_name, #editor_name_show").hide();
	});
	
	$("#relationship").click(function(){
		$("#relationship > a > p").css({"background-color": "#928e06", "color": "white"});
		$("#summary > a > p, #information > a > p, #life > a > p, #experience > a > p, #studies > a > p").css({"background-color": "", "color": "#734c00"});
		$("#relationship_content").show();
        $("#summary_content, #information_content, #life_content, #studies_content, #experience_content").hide();
		$("#editor_name, #editor_name_show").hide();
	});
	

	
});

//-----取得資料庫中所有筆畫
function getAllBihuas() {
	var value = "";
	var type = 1;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		// ["2","3"]
		var obj = JSON.parse(this.responseText);
		var output = "";
		for(var i = 0;i<obj.length;i++){
			if((i)%2 ==0)
				$("#bihua_select").append("<option style='background-color:#f6f6f6; color:#039db5; font-size:18px; text-align:center;' value='" + obj[i]+ "'>" + obj[i] + "劃</option>");
			else
				$("#bihua_select").append("<option style='background-color:#eeedeb; color:#039db5; font-size:18px; text-align:center;' value='" + obj[i]+ "'>" + obj[i] + "劃</option>");
		}     
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+value+"&type="+type, true);
	xhttp.send();  
}

//-----取得資料庫中所有拼音
function getAllPinyins() {
	var value = "";
	var type = 0;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var obj = JSON.parse(this.responseText);
		var output = "";
		for(var i = 0;i<obj.length;i++){
			if((i)%2 ==0)
				$("#pinyin_select").append("<option style='background-color:#edf7f6; color:#19a79b; font-size:18px; text-align:center;' value='" + obj[i].pinyin+ "'>" + obj[i].pinyin +"　"+ obj[i].phonetic + "</option>");
			else
				$("#pinyin_select").append("<option style='background-color:#ffffff; color:#19a79b; font-size:18px; text-align:center;' value='" + obj[i].pinyin+ "'>" + obj[i].pinyin +"　"+ obj[i].phonetic + "</option>");

	  }
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+value+"&type="+type, true);
	xhttp.send();  
};

//------輸入筆畫 得到此筆畫之姓氏
function searchSurnameByBihua(bihua) {
	var type = 3;  
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var obj = JSON.parse(this.responseText);
		for(var i = 0;i<obj.length;i++){
			if( parseInt(i/7)%2 ==0)
				$("#show_bihua").append("<input id='find_last_name' type='button' value='"+obj[i]+"' style='background-color: #eaf6f6; font-size:18px;'>");
			else
				$("#show_bihua").append("<input id='find_last_name' type='button' value='"+obj[i]+"' style='background-color: #eaf6f6; font-size:18px;'>");
			
		}
    	
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+bihua+"&type="+type, true);
	xhttp.send();  
}

//-----輸入拼音 得到此筆畫之姓氏
function searchSurnameByPinyin(pinyin) {
	var type = 2;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var obj = JSON.parse(this.responseText);
		for(var i = 0;i<obj.length;i++){
			if( parseInt(i/7)%2 ==0)
				$("#show_pinyin").append("<input id='find_last_name' type='button' value='"+obj[i]+"' style='background-color: #e2f1ec; font-size:18px;'>");
			else
				$("#show_pinyin").append("<input id='find_last_name' type='button' value='"+obj[i]+"' style='background-color: #e2f1ec; font-size:18px;'>");
		}
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+pinyin+"&type="+type, true);
	xhttp.send();  
}

//----輸入姓氏 得到此姓氏之所有人名
function searchNameBySurname(surname, choose) {
  //var surname = "沈";
	var type = 4;  
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {

		var obj = JSON.parse(this.responseText);
		var output = "";
		for(var i = 0;i<obj.length;i++){
			output += "name : "+obj[i].people_name+"，poet_id : "+obj[i].poet_id+"</br>";
			if(choose == 1)
			{
				$("#show_bihua").append("<input class='post_id' id="+ obj[i].poet_id+ " type='button' value='"+obj[i].people_name+"' style='background-color: #eaf6f6; font-size:18px;'>");
			}
			else
				$("#show_pinyin").append("<input class='post_id' id="+obj[i].poet_id+ " type='button' value='"+obj[i].people_name+"' style='background-color: #e2f1ec; font-size:18px;'>");
		}
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+surname+"&type="+type, true);
	xhttp.send();  
}

function searchPoet(poet_id)
{
	var type = 5; 
	var xhttp = new XMLHttpRequest();
	var obj;
	var tmp_combine = "";
	var open_tmp = 0 ;
	var count = 0;
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {

		obj = JSON.parse(this.responseText);
		
		$("#poet_name").text(obj[0].name);
		/*var string = obj[0].abstract;
		var target = 'id="comment_1">';
		var myRegExp = new RegExp(target, 'g');
		var replaceText = '<a href="#" data-toggle="tooltip" data-placement="top" title="Hooray!">';
		var new_string = string.replace(myRegExp, replaceText); //開始替換
		target = '</sup>';
		myRegExp = new RegExp(target, 'g');
		replaceText = '</a></sup>';
		new_string = string.replace(myRegExp, replaceText);
		
		$("#summary_content").append("<p id ='summary_p'>"+ new_string + "</p>");*/
		$("#summary_content").append("<p id ='summary_p'>"+ obj[0].abstract + "</p>");

		$("#editor_name_show").append("<p>"+ obj[0].editor_name +"</p>");
		
		//----------------基本資料
		for(var i= 0; i<obj[1].alias_0.length; i++)
		{
			tmp_combine += obj[1].alias_0[i];
			if((i+1) != obj[1].alias_0.length)
				tmp_combine += "　";
		}
		$("#information_content_first").append("<p style= 'width: 370px; height: 25px;'>"+ tmp_combine);
		tmp_combine = "";
		
		for(var i= 0; i<obj[1].alias_2.length; i++)
		{
			tmp_combine += obj[1].alias_2[i];
			if((i+1) != obj[1].alias_2.length)
				tmp_combine += "　";
		}
		$("#information_content_first").append("<p style= 'width: 370px; height: 25px;'>"+ tmp_combine);
		tmp_combine = "";
		
		for(var i= 0; i<obj[1].alias_3.length; i++)
		{
			tmp_combine += obj[1].alias_3[i];
			if((i+1) != obj[1].alias_3.length)
				tmp_combine += "　";
		}
		$("#information_content_first").append("<p style= 'width: 370px; height: 25px;'>"+ tmp_combine);
		tmp_combine = "";
		
		for(var i= 0; i<obj[1].house_name.length; i++)
		{
			tmp_combine += obj[1].house_name[i];
			if((i+1) != obj[1].house_name.length)
				tmp_combine += "　";
		}
		$("#information_content_first").append("<p style= 'width:800px; height:25px;'>"+ tmp_combine);
		tmp_combine = "";
		
		$("#information_content_first").append("<p style= 'width:800px; height:25px; '>"+ obj[1].dynasty_name);
		$("#information_content_first").append("<p style= 'width:800px; height:25px; '>"+ obj[1].era_name);
		$("#information_content_first").append("<p style= 'width: 800px; height: 25px;'>"+ obj[1].poet_atTaiwan);
		$("#information_content_first").append("<p style= 'width: 370px; height: 25px;'>"+ obj[1].ancestral_home);
		$("#information_content_first").append("<p style= 'width: 370px; height: 25px;'>"+ obj[1].poet_birth);
		$("#information_content_first").append("<p style= 'width: 370px; height: 25px;'>"+ obj[1].birth_location);
		
		for(var i= 0; i<obj[1].alias_1.length; i++)
		{
			tmp_combine += obj[1].alias_1[i];
			if((i+1) != obj[1].alias_1.length)
				tmp_combine += "　";
		}
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px;'>"+ tmp_combine);
		tmp_combine = "";
		
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px; opacity: 1;'>　");
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px;'>" + obj[1].poet_gender);
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px; opacity: 1;'>　");
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px; opacity: 1;'>　");
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px; opacity: 1;'>　");
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px; opacity: 1;'>　");
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px;'>" + obj[1].poet_ethnic);
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px; '>" + obj[1].poet_death);
		$("#information_content_second").append("<p style= 'width: 290px; height: 25px;'>" + obj[1].death_location);
		
		for(var i= 0; i<obj[1].expertise_name.length; i++)
		{
			tmp_combine += obj[1].expertise_name[i];
			if((i+1) != obj[1].expertise_name.length)
				tmp_combine += "　";
		}
		$("#information_expertise_name").append("<p style= 'width: 800px;'>"+ tmp_combine);
		tmp_combine = "";
		
		$("#information_religion_name").append("<p style= 'width: 800px;'>" + obj[1].religion_name);
		
		//----------------生平及人際介紹
		//生平相關地點
		for(var i= 0; i<obj[2].biography_location.length; i++)
		{
			tmp_combine += obj[2].biography_location[i];
			if((i+1) != obj[2].biography_location.length)
				tmp_combine += "　";
			if(count == 2 && obj[2].biography_location.length > 3)
			{
				$("#information_biography_location").append("<p style= 'width: 800px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[2].biography_location.length <= 3)
		{
			$("#information_biography_location").append("<p style= 'width: 800px;'>"+ tmp_combine);
		}
		tmp_combine = "";
		count = 0;
		
		if(obj[2].biography_location.length >= 10)
		{
			$("#open_img_biography_location").click(function(){
				open_tmp = 40 + (Math.floor((obj[2].biography_location.length-1)/3+1)) * 35 ;
				$("#information_biography_location").animate({height: open_tmp+ "px"});
				open_tmp = (Math.floor((obj[2].biography_location.length-1)/3+1)) * 35 ;
				$("#open_img_biography_location").hide();
				$("#close_img_biography_location").show();
				$("#open_img_biography_location").css("top", open_tmp + "px");
				$("#close_img_biography_location").animate({top: open_tmp + "px"});
				open_tmp = 0 ;
			});
			
			$("#information_biography_location").on( "click", "#close_img_biography_location", function(){
				//alert("!!");
				$("#information_biography_location").animate({height: "123px"});
				$("#close_img_biography_location").hide();
				$("#open_img_biography_location").show();
				$("#close_img_biography_location").css("display", "hide");
				$("#open_img_biography_location").css("display", "show");
				$("#open_img_biography_location").animate({top: "80px"});
				$("#close_img_biography_location").animate({top: "80px"});
			});
		}
		else
			$("#open_img_biography_location").hide();
		
		//生平相關地點年
		for(var i= 0; i<obj[2].biography_time.length; i++)
		{
			tmp_combine += obj[2].biography_time[i];
			if((i+1) != obj[2].biography_time.length)
				tmp_combine += "　";
			if(count == 2 && obj[2].biography_time.length > 3)
			{
				$("#information_biography_time").append("<p style= 'width: 800px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[2].biography_time.length <= 3)
		{
			$("#information_biography_time").append("<p style= 'width: 800px;'>"+ tmp_combine);
		}
		tmp_combine = "";
		count = 0;
		//alert(Math.floor(3/2));
		if(obj[2].biography_time.length >= 4)
		{
			$("#open_img_biography_time").click(function(){
				open_tmp = 20 + (Math.floor((obj[2].biography_time.length-1)/3+1)) * 35 ;
				$("#information_biography_time").animate({height: open_tmp+ "px"});
				open_tmp = (Math.floor((obj[2].biography_time.length-1)/3+1)) * 35 ;
				$("#open_img_biography_time").hide();
				$("#close_img_biography_time").show();
				$("#open_img_biography_time").css("top", open_tmp + "px");
				$("#close_img_biography_time").animate({top: open_tmp + "px"});
				open_tmp = 0 ;
			});
			
			$("#information_biography_time").on( "click", "#close_img_biography_time", function(){
				//alert("!!");
				$("#information_biography_time").animate({height: "80px"});
				$("#close_img_biography_time").hide();
				$("#open_img_biography_time").show();
				$("#close_img_biography_time").css("display", "hide");
				$("#open_img_biography_time").css("display", "show");
				$("#open_img_biography_time").animate({top: "30px"});
				$("#close_img_biography_time").animate({top: "30px"});
			});
		}
		else
			$("#open_img_biography_time").hide();
		
		//親族
		for(var i= 0; i<obj[2].family.length; i++)
		{
			tmp_combine += obj[2].family[i];
			if((i+1) != obj[2].family.length)
				tmp_combine += "　";
			
			if(count == 7 && obj[2].family.length > 7)
			{
				$("#information_family").append("<p style= 'width: 800px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[2].family.length <= 7)
			$("#information_family").append("<p style= 'width: 800px;'>"+ tmp_combine);
		tmp_combine = "";
		count = 0;
		// 師
		for(var i= 0; i<obj[2].teacher.length; i++)
		{
			tmp_combine += obj[2].teacher[i];
			if((i+1) != obj[2].teacher.length)
				tmp_combine += "　";
			
			if(count == 7 && obj[2].teacher.length > 7)
			{
				$("#information_teacher").append("<p style= 'width: 800px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[2].teacher.length <= 7)
			$("#information_teacher").append("<p style= 'width: 800px;'>"+ tmp_combine);
		tmp_combine = "";
		count = 0;
		// 友
		for(var i= 0; i<obj[2].friend.length; i++)
		{
			tmp_combine += obj[2].friend[i];
			if((i+1) != obj[2].friend.length)
				tmp_combine += "　";
			
			if(count == 7 && obj[2].friend.length > 7)
			{
				$("#information_friend").append("<p style= 'width: 800px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[2].friend.length <= 7)
			$("#information_friend").append("<p style= 'width: 800px;'>"+ tmp_combine);
		tmp_combine = "";
		count = 0;
		
		//---------相關學經歷簡介information_education
		$("#information_education").append("<p>" + obj[3].education)
		// 經歷
		for(var i= 0; i<obj[3].experience.length; i++)
		{
			tmp_combine += obj[3].experience[i];
			if((i+1) != obj[3].experience.length)
				tmp_combine += "　";
			
			if(count == 7 && obj[3].experience.length > 7)
			{
				$("#information_experience").append("<p style= 'width: 790px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[3].experience.length <= 7)
			$("#information_experience").append("<p style= 'width: 790px;'>"+ tmp_combine);
		tmp_combine = "";
		count = 0;
		//文學社團
		for(var i= 0; i<obj[3].society.length; i++)
		{
			tmp_combine += obj[3].society[i];
			if((i+1) != obj[3].society.length)
				tmp_combine += "　";
			
			if(count == 7 && obj[3].society.length > 7)
			{
				$("#information_society").append("<p style= 'width: 790px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[3].society.length <= 7)
			$("#information_society").append("<p style= 'width: 790px;'>"+ tmp_combine);
		tmp_combine = "";
		count = 0;
		//重要事蹟
		$("#information_deeds").append("<p>" + obj[3].deeds);
		
		
		//重要著作
		for(var i= 0; i<obj[3].work_0.length; i++)
		{
			tmp_combine += obj[3].work_0[i];
			if((i+1) != obj[3].work_0.length)
				tmp_combine += "　";
			
			if(count == 7 && obj[3].work_0.length > 7)
			{
				$("#information_work_0").append("<p style= 'width: 790px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[3].work_0.length <= 7)
			$("#information_work_0").append("<p style= 'width: 790px;'>"+ tmp_combine);
		tmp_combine = "";
		count = 0;
		//作品出處
		for(var i= 0; i<obj[3].work_1.length; i++)
		{
			tmp_combine += obj[3].work_1[i];
			if((i+1) != obj[3].work_1.length)
				tmp_combine += "&nbsp;&nbsp;/&nbsp;&nbsp;";
			
			if(count == 3 && obj[3].work_1.length > 3)
			{
				$("#information_work_1").append("<p style= 'width: 790px;'>"+ tmp_combine);
				tmp_combine = "";
				count = 0;
			}
			else
				count++;
		}
		if(obj[3].work_1.length <= 3)
			$("#information_work_1").append("<p style= 'width: 790px;'>"+ tmp_combine);
		tmp_combine = "";
		count = 0;
		//------------相關文學研究註解
		//《全臺詩》冊次
		$("#information_volume").append("<p>" + obj[4].volume)
		//當代相關研究
		for(var i= 0; i<obj[4].work_2.length; i++)
		{
			//$("img").before("<b>Before</b>");
			if(i%2 == 0)
				$("#information_work_2").append("<p style= 'width: 790px; height: 25px; background-color: rgba(250, 253, 254, 0.9) '>"+ obj[4].work_2[i]);
			else
				$("#information_work_2").append("<p style= 'width: 790px; height: 25px; background-color: rgba(250, 253, 254, 0.7) '>"+ obj[4].work_2[i]);		
		}
		if(obj[4].work_2.length >=3)
		{
			$("#open_img_work_2").click(function(){
				open_tmp = 40 + (obj[4].work_2.length) * 35 ;
				$("#information_work_2").animate({height: open_tmp+ "px"});
				open_tmp = obj[4].work_2.length * 35 ;
				$("#open_img_work_2").hide();
				$("#close_img_work_2").show();
				$("#open_img_work_2").css("top", open_tmp + "px");
				$("#close_img_work_2").animate({top: open_tmp + "px"});
				open_tmp = 0 ;
			});
			
			$("#information_work_2").on( "click", "#close_img_work_2", function(){
				//alert("!!");
				$("#information_work_2").animate({height: "150px"});
				$("#close_img_work_2").hide();
				$("#open_img_work_2").show();
				$("#close_img_work_2").css("display", "hide");
				$("#open_img_work_2").css("display", "show");
				$("#open_img_work_2").animate({top: "125px"});
				$("#close_img_work_2").animate({top: "125px"});
			});
		}
		else
			$("#open_img_work_2").hide();
		//註解
			
		for(var i= 0; i<obj[4].comment.length; i++)
		{
			if(i%2 == 0)
				$("#information_comment").append("<p style= 'width: 800px; height: 25px; background-color: rgba(250, 253, 254, 0.9) '>"+ obj[4].comment[i]);
			else
				$("#information_comment").append("<p style= 'width: 800px; height: 25px; background-color: rgba(250, 253, 254, 0.7) '>"+ obj[4].comment[i]);		
		}
		if(obj[4].comment.length >= 2)
		{
			$("#open_img_comment").click(function(){
				//open_tmp = 25 + obj[4].work_2.length * 25 ;
				$("#information_comment").animate({height: "300px"});
				$("#open_img_comment").hide();
				$("#close_img_comment").show();
				$("#open_img_comment").css("top", "200px");
				$("#close_img_comment").animate({top: "200px"});
				open_tmp = 0 ;
			});
			
			$("#information_comment").on( "click", "#close_img_comment", function(){
				$("#information_comment").animate({height: "75px"});
				$("#close_img_comment").hide();
				$("#open_img_comment").show();
				$("#close_img_comment").css("display", "hide");
				$("#open_img_comment").css("display", "show");
				$("#open_img_comment").animate({top: "50px"});
				$("#close_img_comment").animate({top: "50px"});
			});
		}
		else
			$("#open_img_comment").hide();
		//其他連結
		$("#information_other_link").append("<p style= 'width: 790px; height: 25px; background-color: rgba(250, 253, 254, 0.9) '>"+ obj[4].other_link);
		

	}
		
	};
	xhttp.open("GET","background/searchPoet.php?value="+poet_id+"&type="+type, true);
	xhttp.send();  
	

	
}


//----------dropdown
function DropDown(el) {//初始設定
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.dropdown > li');
	this.val = '';
	this.index = -1;
	this.initEvents();
}

DropDown.prototype = {//把 div 得行為改成像 dropdown
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			return false;
		});

		obj.opts.on('click',function(){
			var opt = $(this);
			obj.val = opt.text();
			obj.index = opt.index();
			obj.placeholder.text('Gender: ' + obj.val);
		});
	},
	getValue : function() {
		return this.val;
	},
	getIndex : function() {
		return this.index;
	}
}

$(function() {// 綁定
	var bihua = new DropDown( $('#cc') );
	var pinyin = new DropDown( $('#dd') );
	$(document).click(function() {
		// all dropdowns
		$('.wrapper-dropdown-1').removeClass('active');
	});
});

