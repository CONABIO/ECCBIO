<?php
	function limpia($text){
		$text=str_replace(" ", "",$text);
		$text=str_replace("�", "a",$text);
		$text=str_replace("�", "e",$text);
		$text=str_replace("�", "i",$text);
		$text=str_replace("�", "o",$text);
		$text=str_replace("�", "u",$text);
		$text=str_replace("�", "A",$text);
		$text=str_replace("�", "E",$text);
		$text=str_replace("�", "I",$text);
		$text=str_replace("�", "O",$text);
		$text=str_replace("�", "U",$text);
		$text=str_replace("�", "n",$text);
		$text=str_replace("�", "N",$text);
		return $text;
	}
?>