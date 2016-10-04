<?php
function Connect() {
	$IP = "127.0.0.1";
	$username = "root";
	$password = "diclab";
	$DB = "taiwan_poet";
	$link = mysqli_connect($IP, $username, $password, $DB);
	$link->query("SET NAMES UTF8");
	if (!$link) {
		//echo "Error: Unable to connect to MySQL." . PHP_EOL;
		//echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
		//echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
		exit;
	}
	//  echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
	//  echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;
	return $link;
}

class getAllPinyins {
	private $link;
	private $datas;
	public function __construct() {
		$this->link = Connect();
		$this->datas = array();
		$Selectsql = "SELECT * FROM `pinyin_table`";
		$rows = $this->link->query($Selectsql);
		while ($row = $rows->fetch_row()) {
			$data = array("pinyin" => $row[1], "phonetic" => $row[2]);
			array_push($this->datas, $data);
		}
	}

	public function getDatas() {
		return $this->datas;
	}
}

class getAllBihuas {
	private $link;
	private $bihuas;
	public function __construct() {
		$this->link = Connect();
		$this->bihuas = array();
		$Selectsql = "SELECT * FROM `bihuaname_table`";
		$rows = $this->link->query($Selectsql);
		while ($row = $rows->fetch_row()) {
			if (!in_array($row[2], $this->bihuas)) {
				array_push($this->bihuas, $row[2]);
			}
		}
	}

	public function getBihuas() {
		return $this->bihuas;
	}
}

class searchSurnameByPinyin {
	private $link;
	private $pinyin_id;
	private $surnames;
	public function __construct($pinyin) {
		$this->link = Connect();
		$Selectsql = "SELECT `pinyin_id` FROM `pinyin_table` WHERE `pinyin` = '$pinyin'";
		$row = $this->link->query($Selectsql);
		$this->pinyin_id = $row->fetch_row()[0];
		$Selectsql = "SELECT `surname` FROM `surname_table` WHERE `pinyin_id` = '$this->pinyin_id'";
		$rows = $this->link->query($Selectsql);
		$this->surnames = array();
		while ($row = $rows->fetch_row()) {
			$row = implode("", $row); //flatten array to string
			array_push($this->surnames, $row);
		}
	}
	public function getsurnames() {
		return $this->surnames;
	}
	public function printsurnames() {
		if (isset($this->surnames)) {
			foreach ($this->surnames as $surname) {
				echo "$surname</br>";
			}
		} else {
			echo "no surname</br>";
		}
	}
}

class searchSurnameByBihua {
	private $link;
	private $surnames;
	public function __construct($bihua) {
		$this->link = Connect();
		$Selectsql = "SELECT `surname` FROM `bihuaname_table` WHERE `bihua` = '$bihua'";
		$rows = $this->link->query($Selectsql);
		$this->surnames = array();
		while ($row = $rows->fetch_row()) {
			$row = implode("", $row); // flatten array to string
			array_push($this->surnames, $row);
		}

	}
	public function getSurnames() {
		return $this->surnames;
	}

	public function printSurnames() {
		if (isset($this->surnames)) {
			foreach ($this->surnames as $surname) {
				echo "$surname</br>";
			}
		} else {
			echo "no surname</br>";
		}
	}
}

class searchNameBySurname {
	private $link;
	private $datas;
	public function __construct($surname) {
		$this->link = Connect();
		$Selectsql = "SELECT * FROM `pname_relation` WHERE `people_name` Like '$surname%' && `poet_id` != -1";
		$rows = $this->link->query($Selectsql);
		$this->datas = array();
		while ($row = $rows->fetch_row()) {
			$data = array("people_name" => $row[1], "poet_id" => $row[2]);
			array_push($this->datas, $data);
		}
	}
	public function getDatas() {
		return $this->datas;
	}
}

class searchPoet {
	private $link;
	private $poet_id;
	//page 1
	private $name;
	private $abstract;
	private $editor_name;
	//page 2
	private $alias_0;
	private $alias_1;
	private $alias_2;
	private $alias_3;
	private $poet_gender;
	private $house_name;
	private $dynasty_name;
	private $era_name;
	private $poet_atTaiwan;
	private $ancestral_home;
	private $poet_ethnic;
	private $poet_birth;
	private $poet_death;
	private $birth_location;
	private $death_location;
	private $expertise_name;
	private $religion_name;
	//page 3
	private $biography_location;
	private $biography_time;
	private $family;
	private $teacher;
	private $friend;
	//page 4
	private $education;
	private $experience;
	private $society;
	private $deeds;
	private $work_0;
	private $work_1;
	//page 5
	private $volume;
	private $work_2;
	private $comment;
	private $other_link;

	public function __construct($poet_id) {
		$this->link = Connect();
		$this->poet_id = $poet_id;
		$this->alias_0 = array();
		$this->alias_1 = array();
		$this->alias_2 = array();
		$this->alias_3 = array();
		$this->house_name = array();
		$this->experience = array();
		$this->society = array();
		$this->expertise_name = array();
		$this->biography_location = array();
		$this->biography_time = array();
		$this->family = array();
		$this->teacher = array();
		$this->friend = array();
		$this->deeds = array();
		$this->work_0 = array();
		$this->work_1 = array();
		$this->work_2 = array();
		$this->comment = array();

		$this->getPoetInfoData();
		$this->getAliasTableData();
		$this->getHouseTableData();
		$this->getEraRelationData();
		$this->getPoetAtTaiwanData();
		$this->getBiographyInfo();
		$this->getEducationalRelationData();
		$this->getExperienceRelationData();
		$this->getExpertiseRelationData();
		$this->getSocietyRelationData();
		$this->getEditorTableData();
		$this->getFamilyRelationData();
		$this->getPoetWorkRelationData();
	}

	private function getPoetInfoData() {
		$table_name = "poet_info";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$row = $this->link->query($Selectsql);
		if (!$row) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($row->num_rows == 0) {
			//echo "no match</br>";
		} else {
			$row = $row->fetch_row();

			$pname_id = $row[1];
			$Selectsql = "SELECT `people_name` FROM `pname_relation` WHERE `pname_id` = '$pname_id'";
			$pnameRow = $this->link->query($Selectsql)->fetch_row();
			$this->name = $pnameRow[0];

			$poet_dynasty_s = $row[2];
			$Selectsql = "SELECT `dynasty_name` FROM `dynasty_relation` WHERE `dynasty_id` = '$poet_dynasty_s'";
			$dynastyRow = $this->link->query($Selectsql)->fetch_row();
			$dynasty_startName = $dynastyRow[0];
			$poet_dynasty_e = $row[3];
			$Selectsql = "SELECT `dynasty_name` FROM `dynasty_relation` WHERE `dynasty_id` = '$poet_dynasty_e'";
			$dynastyRow = $this->link->query($Selectsql)->fetch_row();
			$dynasty_endName = $dynastyRow[0];
			$this->dynasty_name = "$dynasty_startName-$dynasty_endName";

			$this->poet_gender = $row[4];
			$this->poet_birth = $row[5];
			$this->poet_death = $row[6];

			$birth_location_id = $row[7];
			$Selectsql = "SELECT * FROM `geography_info` WHERE `geography_id` = '$birth_location_id'";
			$LocationRow = $this->link->query($Selectsql)->fetch_row();
			$this->birth_location = "$LocationRow[1](今$LocationRow[2])";

			$death_location_id = $row[8];
			$Selectsql = "SELECT * FROM `geography_info` WHERE `geography_id` = '$death_location_id'";
			$LocationRow = $this->link->query($Selectsql)->fetch_row();
			$this->death_location = "$LocationRow[1](今$LocationRow[2])";

			$ancestral_home_id = $row[9];
			$Selectsql = "SELECT * FROM `geography_info` WHERE `geography_id` = '$ancestral_home_id'";
			$LocationRow = $this->link->query($Selectsql)->fetch_row();
			$this->ancestral_home = "$LocationRow[1](今$LocationRow[2])";

			$poet_ethnic_id = $row[10];
			$Selectsql = "SELECT `ethnic_name` FROM `ethnic_table` WHERE `ethnic_id` = '$poet_ethnic_id'";
			$EthnicRow = $this->link->query($Selectsql)->fetch_row();
			$this->poet_ethnic = $EthnicRow[0];

			$this->deeds = explode("\n",$row[11]);

			$religion_id = $row[12];
			$Selectsql = "SELECT `religion_name` FROM `religion_table` WHERE `religion_id` = '$religion_id'";
			$ReligionRow = $this->link->query($Selectsql)->fetch_row();
			$this->religion_name = $ReligionRow[0];

			$commentString = $row[15];
			$commentString = str_replace("`[*","[",$commentString);
			$commentString = str_replace("*]`","]",$commentString); 
			$this->comment = explode("\n",$commentString);
			
			$abstractString = $row[13];
			$commentCount = substr_count($abstractString,"`[*");
			$pattern = "/\`\[\*\d\*\]\`/";
			for($i=0;$i<$commentCount;$i++){
				if($i<=count($this->comment)){
					$abstractString = preg_replace($pattern,"<sup id= \"comment_".($i+1)."\"><a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"".$this->comment[$i]."\">[".($i+1)."]</a></sup>", $abstractString, 1);
				}
			}
			$this->abstract = $abstractString;
			
			$this->volume = $row[14];

			$this->other_link = $row[16];
		}
	}

	private function getAliasTableData() {
		$table_name = "alias_table";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$rows = $this->link->query($Selectsql);
		if (!$rows) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($rows->num_rows == 0) {
			//echo "no match</br>";
		} else {
			while ($row = $rows->fetch_row()) {
				if ($row[2] == 0) {
					array_push($this->alias_0, $row[1]);
				}
				if ($row[2] == 1) {
					array_push($this->alias_1, $row[1]);
				}
				if ($row[2] == 2) {
					array_push($this->alias_2, $row[1]);
				}
				if ($row[2] == 3) {
					array_push($this->alias_3, $row[1]);
				}
			}
		}
	}

	private function getHouseTableData() {
		$table_name = "house_table";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$rows = $this->link->query($Selectsql);
		if (!$rows) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($rows->num_rows == 0) {
			//echo "no match</br>";
		} else {
			while ($row = $rows->fetch_row()) {
				array_push($this->house_name, $row[1]);
			}
		}
	}

	private function getEraRelationData() {
		$table_name = "era_relation";
		$Selectsql = "SELECT `era_id` FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$row = $this->link->query($Selectsql);
		if (!$row) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($row->num_rows == 0) {
			//echo "no match</br>";
		} else {
			$row = $row->fetch_row();
			$era_id = $row[0];
			$Selectsql = "SELECT `era_name` FROM `era_table` WHERE `era_id` = '$era_id'";
			$EraRow = $this->link->query($Selectsql)->fetch_row();
			$this->era_name = $EraRow[0];
		}
	}

	private function getPoetAtTaiwanData() {
		$table_name = "poet_atTaiwan";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$row = $this->link->query($Selectsql);
		if (!$row) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($row->num_rows == 0) {
			//echo "no match</br>";
		} else {
			$row = $row->fetch_row();
			$this->poet_atTaiwan = "$row[1]-$row[2]";
		}
	}

	private function getBiographyInfo() {
		$table_name = "biography_info";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$rows = $this->link->query($Selectsql);
		if (!$rows) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($rows->num_rows == 0) {
			//echo "no match</br>";
		} else {
			while ($row = $rows->fetch_row()) {
				$biography_location_id = $row[2];
				$Selectsql = "SELECT * FROM `geography_info` WHERE `geography_id` = '$biography_location_id'";
				$LocationRow = $this->link->query($Selectsql)->fetch_row();
				array_push($this->biography_location , "$LocationRow[1](今$LocationRow[2])");
				array_push($this->biography_time , "$row[3]-$row[4]");
			}
		}
	}

	private function getEducationalRelationData() {
		$table_name = "educational_relation";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$row = $this->link->query($Selectsql);
		if (!$row) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($row->num_rows == 0) {
			//echo "no match</br>";
		} else {
			$row = $row->fetch_row();
			$educational_id = $row[3];
			$Selectsql = "SELECT `educational_name` FROM `educational_table` WHERE `educational_id` = '$educational_id'";
			$EducationRow = $this->link->query($Selectsql)->fetch_row();
			$this->education = $EducationRow[0];
		}
	}

	private function getExperienceRelationData() {
		$table_name = "experience_relation";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$rows = $this->link->query($Selectsql);
		if (!$rows) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($rows->num_rows == 0) {
			//echo "no match</br>";
		} else {
			while ($row = $rows->fetch_row()) {
				$experience_id = $row[3];
				$Selectsql = "SELECT `experience_name` FROM `experience_table` WHERE `experience_id` = '$experience_id'";
				$ExperienceRow = $this->link->query($Selectsql)->fetch_row();
				array_push($this->experience, $ExperienceRow[0]);
			}
		}
	}

	private function getExpertiseRelationData() {
		$table_name = "expertise_relation";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$rows = $this->link->query($Selectsql);
		if (!$rows) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($rows->num_rows == 0) {
			//echo "no match</br>";
		} else {
			while ($row = $rows->fetch_row()) {
				$expertise_id = $row[1];
				$Selectsql = "SELECT `expertise_name` FROM `expertise_table` WHERE `expertise_id` = '$expertise_id'";
				$ExpertiseRow = $this->link->query($Selectsql)->fetch_row();
				array_push($this->expertise_name, $ExpertiseRow[0]);
			}
		}
	}

	private function getSocietyRelationData() {
		$table_name = "society_relation";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$rows = $this->link->query($Selectsql);
		if (!$rows) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($rows->num_rows == 0) {
			//echo "no match</br>";
		} else {
			while ($row = $rows->fetch_row()) {
				$sname_id = $row[1];
				$Selectsql = "SELECT `society_name` FROM `sname_table` WHERE `sname_id` = '$sname_id'";
				$SocietyRow = $this->link->query($Selectsql)->fetch_row();
				array_push($this->society, $SocietyRow[0]);
			}
		}
	}

	private function getEditorTableData() {
		$table_name = "editor_table";
		$Selectsql = "SELECT `editor_name` FROM `$table_name` WHERE `correspond_id` = '$this->poet_id'";
		$row = $this->link->query($Selectsql);
		if (!$row) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($row->num_rows == 0) {
			//echo "no match</br>";
		} else {
			$row = $row->fetch_row();
			$this->editor_name = $row[0];
		}
	}

	private function getFamilyRelationData() {
		$table_name = "family_relation";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `family_poet` = '$this->poet_id'";
		$rows = $this->link->query($Selectsql);
		if (!$rows) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($rows->num_rows == 0) {
			//echo "no match</br>";
		} else {
			while ($row = $rows->fetch_row()) {
				$family_type = $row[3];
				$pname_id = $row[2];
				$Selectsql = "SELECT `people_name` FROM `pname_relation` WHERE `pname_id` = '$pname_id'";
				$PnameRow = $this->link->query($Selectsql)->fetch_row();
				if ($family_type == "T") {
					array_push($this->teacher, $PnameRow[0]);

				} else if ($family_type == "F") {
					array_push($this->friend, $PnameRow[0]);

				} else {
					array_push($this->family, $PnameRow[0]);
				}
			}
		}
	}

	private function getPoetWorkRelationData() {
		$table_name = "poetWork_relation";
		$Selectsql = "SELECT * FROM `$table_name` WHERE `poet_id` = '$this->poet_id'";
		$rows = $this->link->query($Selectsql);
		if (!$rows) {
			//echo "selectByEqual failed</br>";
			//echo "sql : $Selectsql</br>";
		} else if ($rows->num_rows == 0) {
			//echo "no match</br>";
		} else {
			while ($row = $rows->fetch_row()) {
				$work_type = $row[1];
				$work_id = $row[2];
				$Selectsql = "SELECT `work_content` FROM `work_info` WHERE `work_id` = '$work_id'";
				$WorkRow = $this->link->query($Selectsql)->fetch_row();
				if ($work_type == 0) {
					array_push($this->work_0, $WorkRow[0]);
				}
				if ($work_type == 1) {
					array_push($this->work_1, $WorkRow[0]);
				}
				if ($work_type == 2) {
					array_push($this->work_2, $WorkRow[0]);
				}
			}
		}
	}
	
	private function addBr(){
		$this->abstract = str_replace("\n\n","<br>　　",$this->abstract);
		$this->abstract = str_replace("\n","<br>　　",$this->abstract);
		$this->abstract = "　　".$this->abstract; //縮排
	}
	
	public function getObj() {
		$this->addBr();
		$page1 = array("name" => $this->name, "abstract" => $this->abstract, "editor_name" => $this->editor_name);
		$page2 = array("alias_0" => $this->alias_0, "alias_1" => $this->alias_1, "alias_2" => $this->alias_2,
			"alias_3" => $this->alias_3, "poet_gender" => $this->poet_gender, "house_name" => $this->house_name,
			"dynasty_name" => $this->dynasty_name, "era_name" => $this->era_name, "poet_atTaiwan" => $this->poet_atTaiwan,
			"ancestral_home" => $this->ancestral_home, "poet_ethnic" => $this->poet_ethnic, "poet_birth" => $this->poet_birth,
			"poet_death" => $this->poet_death, "birth_location" => $this->birth_location, "death_location" => $this->death_location,
			"expertise_name" => $this->expertise_name, "religion_name" => $this->religion_name);
		$page3 = array("biography_location" => $this->biography_location, "biography_time" => $this->biography_time,
			"family" => $this->family, "teacher" => $this->teacher, "friend" => $this->friend);
		$page4 = array("education" => $this->education, "experience" => $this->experience, "society" => $this->society,
			"deeds" => $this->deeds, "work_0" => $this->work_0, "work_1" => $this->work_1);
		$page5 = array("volume" => $this->volume, "work_2" => $this->work_2, "comment" => $this->comment,
			"other_link" => $this->other_link);
		$obj = array($page1, $page2, $page3, $page4, $page5);
		return $obj;
	}

	public function printPoetData() {
		//page 1
		echo "[page1]" . $this->name . "</br>";
		echo "[page1]" . $this->abstract . "</br>";
		echo "[page1]editor_name " . $this->editor_name . "</br>";
		//page 2
		echo "[page2]";
		print_r($this->alias_0);
		echo "</br>";
		echo "[page2]";
		print_r($this->alias_1);
		echo "</br>";
		echo "[page2]";
		print_r($this->alias_2);
		echo "</br>";
		echo "[page2]";
		print_r($this->alias_3);
		echo "</br>";
		echo "[page2]" . $this->poet_gender . "</br>";
		echo "[page2]";
		print_r($this->house_name);
		echo "</br>";
		echo "[page2]" . $this->dynasty_name . "</br>";
		echo "[page2]" . $this->era_name . "</br>";
		echo "[page2]" . $this->poet_atTaiwan . "</br>";
		echo "[page2]" . $this->ancestral_home . "</br>";
		echo "[page2]" . $this->poet_ethnic . "</br>";
		echo "[page2]" . $this->poet_birth . "</br>";
		echo "[page2]" . $this->poet_death . "</br>";
		echo "[page2]" . $this->birth_location . "</br>";
		echo "[page2]" . $this->death_location . "</br>";
		echo "[page2]";
		print_r($this->expertise_name);
		echo "</br>";
		echo "[page2]" . $this->religion_name . "</br>";
		//page 3
		echo "[page3] biography_location ";
		print_r($this->biography_location);
		echo "</br>";
		echo "[page3]";
		print_r($this->biography_time);
		echo "</br>";		
		echo "[page3]";
		print_r($this->family);
		echo "</br>";
		echo "[page3]";
		print_r($this->teacher);
		echo "</br>";
		echo "[page3]";
		print_r($this->friend);
		echo "</br>";
		//page 4
		echo "[page4]" . $this->education . "</br>";
		echo "[page4]";
		print_r($this->experience);
		echo "</br>";
		echo "[page4]";
		print_r($this->society);
		echo "</br>";
		echo "[page4] deeds";
		print_r($this->deeds);
		echo "</br>";		
		echo "[page4]";
		print_r($this->work_0);
		echo "</br>";
		echo "[page4]";
		print_r($this->work_1);
		echo "</br>";
		//page 5
		echo "[page5]" . $this->volume . "</br>";
		echo "[page5]";
		print_r($this->work_2);
		echo "</br>";
		echo "[page5]";
		print_r($this->comment);
		echo "</br>";		
		echo "[page5]" . $this->other_link . "</br>";
	}
}