
$(document).ready(function(){
	
    $(".bihua").click(function(){
		$(".bihua").css("background-color","#a86811");
		$(".pinyin").css("background-color","#AFA941");
        $("#pinyin").hide();
        $("#bihua").show();
    });

	$(".pinyin").click(function(){
		$(".pinyin").css("background-color","#a86811");
		$(".bihua").css("background-color","#AFA941");
        $("#bihua").hide();
		$("#pinyin").show();
    });

	$("#bihua_select").change(function(){ //下拉式選單選取到值
		var bihua_select = $("#bihua_select").val();
		if(bihua_select != -1)
		{
			searchSurnameByBihua(bihua_select); //得到此筆畫數的所有姓氏
			$("#show_bihua > input").remove();
			$("#bihua_number").text($('#bihua_select :selected').text());
		}
	});
	
	$("#pinyin_select").change(function(){ //下拉式選單選取到值
		var pinyin_select = $("#pinyin_select").val();
		if(pinyin_select != -1)
		{
			searchSurnameByPinyin(pinyin_select);
			$("#show_pinyin > input").remove();
			$("#pinyin_number").text($('#pinyin_select :selected').text());
		}
	});
	
});

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
			if((i+1)%2 ==0)
				$("#bihua_select").append("<option style='background-color:#F0FFFF; font-size:18px;' value='" + obj[i]+ "'>　　　" + obj[i] + "劃</option>");
			else
				$("#bihua_select").append("<option style='background-color:white; font-size:18px;' value='" + obj[i]+ "'>　　　" + obj[i] + "劃</option>");
		}     
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+value+"&type="+type, true);
	xhttp.send();  
}

function getAllPinyins() {
	var value = "";
	var type = 0;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var obj = JSON.parse(this.responseText);
		var output = "";
		for(var i = 0;i<obj.length;i++){
			if((i+1)%2 ==0)
				$("#pinyin_select").append("<option style='background-color:#F0FFFF; font-size:18px;' value='" + obj[i].pinyin+ "'>　　" + obj[i].pinyin +"　"+ obj[i].phonetic + "</option>");
			else
				$("#pinyin_select").append("<option style='background-color:white; font-size:18px;' value='" + obj[i].pinyin+ "'>　　" + obj[i].pinyin +"　"+ obj[i].phonetic + "</option>");
			
	  }
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+value+"&type="+type, true);
	xhttp.send();  
};

function searchSurnameByBihua(bihua) {
	var type = 3;  
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var obj = JSON.parse(this.responseText);
		for(var i = 0;i<obj.length;i++){
			if( parseInt(i/7)%2 ==0)
				$("#show_bihua").append("<input type='button' value='"+obj[i]+"' style='background-color: #f1f4d5; font-size:18px;'>");
			else
				$("#show_bihua").append("<input type='button' value='"+obj[i]+"' style='background-color: #e6eebd; font-size:18px;'>");
			
		}    	
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+bihua+"&type="+type, true);
	xhttp.send();  
}

function searchSurnameByPinyin(pinyin) {
	var type = 2;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var obj = JSON.parse(this.responseText);
		for(var i = 0;i<obj.length;i++){
			console.log(obj[i]);
			if( parseInt(i/7)%2 ==0)
				$("#show_pinyin").append("<input type='button' value='"+obj[i]+"' style='background-color: #f1f4d5; font-size:18px;'>");
			else
				$("#show_pinyin").append("<input type='button' value='"+obj[i]+"' style='background-color: #e6eebd; font-size:18px;'>");
		}
	}
	};
	xhttp.open("GET","background/searchPoet.php?value="+pinyin+"&type="+type, true);
	xhttp.send();  
}
/*
function searchBihua() 
{
	var obj;
	var inputString = "11";
	var bihuaXhttp = new XMLHttpRequest();
	bihuaXhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		// ["白","柏"]
		obj = JSON.parse(this.responseText);
		var output = "";
		for(var i = 0; i< obj.length; i++){
			output += obj[i]+" ";
			if((i+1)%2 ==0)
			{
				$("#pinyin_select").append("<option style='background-color:#F0FFFF; font-size:18px;' value='" + obj[i]+ "'>　　　" + obj[i] + "</option>");
				$("#bihua_select").append("<option style='background-color:#F0FFFF; font-size:18px;' value='" + obj[i]+ "'>　　　" + obj[i] + "</option>");
			}
			else
			{
				$("#pinyin_select").append("<option style='background-color:white; font-size:18px;' value='" + obj[i]+ "'>　　　" + obj[i] + "</option>");
				$("#bihua_select").append("<option style='background-color:white; font-size:18px;' value='" + obj[i]+ "'>　　　" + obj[i] + "</option>");
			}
			if( parseInt(i/7)%2 ==0)
				$("#show_bihua").append("<input type='button' value='"+obj[i]+"' style='background-color: #f1f4d5;'>");
			else
				$("#show_bihua").append("<input type='button' value='"+obj[i]+"' style='background-color: #e6eebd;'>");
		}    	
		//$("#pinyin_title > p").text(output);
		//$("#bihua_title > p").text(output);

	}
	};
	bihuaXhttp.open("GET","background/poet.php?inputString="+inputString, true);
	bihuaXhttp.send();
};*/


