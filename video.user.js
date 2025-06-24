// ==UserScript==
// @name         全网VIP视频免费破解去广告
// @namespace    Higex_HHHHHHHHH_X_video
// @version      1.0.1
// @description  全网VIP视频免费破解去广告(综合线路电视剧免跳出选集)支持爱奇艺、腾讯、优酷、哔哩哔哩等
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAY1JREFUWEfdV0tywyAMRV64PYXbZXKKOidLcrI4p0iWbU7RZoE6MOABIpBVyrhTVvZYlp6evoBa+cDK9hUL4PL6PCqtRwMUAN44wIh4DmW2t/uh9A8JwBgFxL1CtIZrDyp1VF03bd8/p1TXA4DL0B9AqX2tUep/AyRlJAJgPdf61MK414ldtwuZiAE09H52CmDafHzt/HsE4Dr02NJ7r3tzu89254di7AEmBDga6qycqYaKBA3DwAKgEsd4UsNWqJMHkCSNJEQ5VkUAwnhJjHtZkqkgEWcGri9PJyquadl4xbZDMifbzCQAVFI2xmZ1vxABcF7adurnQUUFWHU/AcDRLfr+fwGYhuXGcXGgtWCAqpZcZclywLVhLsbUrM9Wi4SBFo1I1Alzs4BjpNQJRQAWGSKalW1Ymf2CBlC7DbkKMCuXX2RzlUACqB2xi5hyQuRCYgFkBpJEOSeb5tTfWkpLicN5tuQ7u5ZHs17r8dfuB8FOmQLlr2ZDH12tRNezzG0oBMECWEJtjczqAL4BysQhMPukapkAAAAASUVORK5CYII=
// @author       Higex,Unknown
// @include      *://*.youku.com/v_*
// @include      *://www.iqiyi.com/*
// @include      *://www.iqiyi.com
// @include      *://*.iqiyi.com/v_*
// @include      *://*.iqiyi.com/w_*
// @include      *://*.iqiyi.com/a_*
// @include      *://*.le.com/ptv/vplay/*
// @include      *://v.qq.com/x/cover/*
// @include      *://v.qq.com/x/page/*
// @include      *://*.tudou.com/listplay/*
// @include      *://*.tudou.com/albumplay/*
// @include      *://*.tudou.com/programs/view/*
// @include      *://*.mgtv.com/b/*
// @include      *://film.sohu.com/album/*
// @include      *://tv.sohu.com/v/*
// @include      *://*.acfun.cn/v/*
// @include      *://*.bilibili.com/video/*
// @include      *://*.bilibili.com/anime/*
// @include      *://*.bilibili.com/bangumi/play/*
// @include      *://*.baofeng.com/play/*
// @include      *://vip.pptv.com/show/*
// @include      *://v.pptv.com/show/*
// @require      https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/2.0.3/jquery.min.js
// @grant        GM_openInTab
// @grant        GM_addStyle
// @run-at       document-idle
// @license      AGPL License
// @charset		 UTF-8
// ==/UserScript==

(function() {
	'use strict';

	var $ = $ || window.$; //获得jquery的$标识符

	//自定义视频解析接口
	var customizeMovieInterface=[
		//{"name":"此处填接口名称","url":"此处填接口url"}
	];

	/**
	 * VIP视频破解开始
	 */
	const movievipHelper={};
	movievipHelper.customizeSourceArray=customizeMovieInterface;
	movievipHelper.defaultSourceArray=[
		{"name":"纯净1","url":"https://im1907.top/?jx=","mobile":1},
		{"name":"B站1","url":"https://jx.jsonplayer.com/player/?url=","mobile":1},
		{"name":"YT","url":"https://jx.yangtu.top/?url=","mobile":0},
		{"name":"BL","url":"https://vip.bljiex.com/?v=","mobile":0},
		{"name":"冰豆","url":"https://bd.jx.cn/?url=","mobile":0},
		{"name":"CK","url":"https://www.ckplayer.vip/jiexi/?url=","mobile":0},
		{"name":"弹幕","url":"https://dmjx.m3u8.tv/?url=","mobile":0},
		{"name":"IK9","url":"https://yparse.ik9.cc/index.php?url=","mobile":0},
		{"name":"JX","url":"https://jiexi.site/?url=","mobile":0},
		{"name":"JY","url":"https://jx.playerjy.com/?url=","mobile":0},
		{"name":"解析la","url":"https://api.jiexi.la/?url=","mobile":0},
		{"name":"M3U8","url":"https://jx.m3u8.tv/jiexi/?url=","mobile":0},
		{"name":"PM","url":"https://www.playm3u8.cn/jiexi.php?url=","mobile":0},
		{"name":"盘古","url":"https://www.pangujiexi.cc/jiexi.php?url=","mobile":0},
		{"name":"盘古2","url":"https://www.pangujiexi.com/jiexi/?url=","mobile":0},
		{"name":"剖云","url":"https://www.pouyun.com/?url=","mobile":0},
		{"name":"七哥","url":"https://jx.nnxv.cn/tv.php?url=","mobile":0},
		{"name":"神哥","url":"https://json.ovvo.pro/jx.php?url=","mobile":0},
		{"name":"听乐","url":"https://jx.dj6u.com/?url=","mobile":1},
		{"name":"维多","url":"https://jx.ivito.cn/?url=","mobile":0},
		{"name":"虾米","url":"https://jx.xmflv.com/?url=","mobile":0},
		{"name":"虾米2","url":"https://jx.xmflv.cc/?url=","mobile":0},
		{"name":"夜幕","url":"https://www.yemu.xyz/?url=","mobile":0},
		{"name":"云析","url":"https://jx.yparse.com/index.php?url=","mobile":0},
		{"name":"17云","url":"https://www.1717yun.com/jx/ty.php?url=","mobile":0},
		{"name":"180","url":"https://jx.000180.top/jx/?url=","mobile":0},
		{"name":"2ys","url":"https://gj.fenxiangb.com/player/analysis.php?v=","mobile":0},
		{"name":"8090","url":"https://www.8090g.cn/?url=","mobile":0}
	];
	movievipHelper.getServerSource=function(){
		//合并自定义接口和默认接口
		try{
			movievipHelper.defaultSourceArray = movievipHelper.customizeSourceArray.concat(movievipHelper.defaultSourceArray);
		}catch(e){
			console.log("合并出现异常，请检查自定义接口");
		}
		//执行操作
		movievipHelper.addStyle();
		movievipHelper.generateHtml();
		movievipHelper.operation();
	};
	movievipHelper.eleId = Math.ceil(Math.random()*100000000);
	movievipHelper.isRun = function(){
		var isVip = false;
		var host = window.location.host;
		var href = window.location.href;
		var vipWebsites = ["iqiyi.com","v.qq.com","youku.com", "le.com","tudou.com","mgtv.com","sohu.com","acfun.cn","bilibili.com","baofeng.com","pptv.com"];
   		for(var b=0; b<vipWebsites.length; b++){
	   		if(host.indexOf(vipWebsites[b]) != -1){
				if("iqiyi.com"===vipWebsites[b]){
					//爱奇艺需要特殊处理
					if(href.indexOf("iqiyi.com/a_")!=-1 || href.indexOf("iqiyi.com/w_")!=-1 || href.indexOf("iqiyi.com/v_")!=-1){
						isVip = true;
						break;
					}
				}else{
					isVip = true;
					break;
				}
	   		}
	   	}
   		return isVip;
	};
	movievipHelper.addStyle=function(){
		var themeColor = "#ee3e31";
		var innnerCss =
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" {position:fixed;top:200px; left:0px; padding:5px 0px; width:38px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item{cursor:pointer; width:100%; text-align:center;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.jump_analysis_website{padding:10px 0px;background-color:"+themeColor+";}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.open_page_inner_source{margin-top:6px; padding:5px 0px;background-color:"+themeColor+";}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item >img{width:60%; display:inline-block; vertical-align:middle;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box{display:none;width:310px;height:400px;position:absolute;left:25px;overflow:hidden;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box{width:330px;height:100%;padding-left:10px;overflow-y:scroll;overflow-x:hidden;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table{width:300px;border-spacing:5px;border-collapse:separate;line-height:20px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table td{border-bottom:3px solid "+themeColor+";border-top:3px solid "+themeColor+";width:33%;color:#FFF;font-size:11px;text-align:center;cursor:pointer;background-color:"+themeColor+";box-shadow:0px 0px 5px #fff;border-radius:3px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table td:hover{border-bottom:3px solid #FEF2A6;border-top:3px solid #FEF2A6;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table .td_hover{border-bottom:3px solid #FEF2A6;border-top:3px solid #FEF2A6;}";
		GM_addStyle(innnerCss);
	};
	movievipHelper.generateHtml=function(){
		var html="";
		var vipImgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABACAYAAABFqxrgAAADBklEQVR4Xu2cz6tNURTHP7tI5iRlID9CJFMlkYGSRPGklBRKiCSSxJMBkYGSgWQq/gBT/gMDUzMzf8RX6959nuO9e+75sff54d69B+/W23evvdbnrLX32j/OdfgiaStwGzgBvHfOPc7qln9KsrpHRfU9/n+xgt6ngW/AK+fcT9PV2R9JZ4A3wHpvQBVh/yuETO/fwDXn3GfnAXxa9vTmAUJm8oJBMADmCfkyTxC+GAT1GMOD6DpBsIExeUKCMArH5AkJwnhcTp4wBcI85QmFnpAgAAlCgjAeMJMnJAjJE5YWdSkcIq5vvwP7IsprRVSrGaNzzuSfAz4Aa1qxIILQ1iHkNnKfAA8j6BxdRGcQ/IbuOuAtYDu+gymdQsh5xX7gHbB7CCR6gZCDccGPF6Ot/75KrxB8iKwCngL35hZCzit2Ac/8CVinPIo8YRH4OkWTQ1WO4WyKrGuNJDsGfAlsr9vW0v0mehdCqHCmV3oM1wRCzjPuAC9qgmiU6Q4Wgh8vNgJ2+HulIozZg5DzioMexuESGLMLIQfjkh+LNhXAmH0IPkTueq9YOwHEbEOQdMobv3dKSMwmBEl7fAhUWW/EhTCBdnaEn839bU+RtvS2PmyqXF11dmiid+9p8yTjJF0ELPZ3VjQ+6GuDgiDpAHAfOBZkVc3Gg4AgaQPwALieXSaraUfQ13uHIOmmN35bkCUBjXuDIOm4N/5ogP5RmnYOQdIOwJ7+1SgWRBDSGQRJNrXajVmL+80RdI8mYtp+QlknlfMESSe98UfKhAbW235CWVmhd6tLacBS3BvA5TLNItXHzRhjbKoAv4CiFV8ku/8RM0gIbRg6TWaC0PRKQdtjQvKErgkkTxgTjzsmNNm/7+HJL+8y6rnDAOzpToVW0+buzAjrKUFIF7zHHpQ8IUFInrA0mqZw8OHwY8IFqkaZV9hEFaV1E71HL4c+9wcdeS2aCItiRaCQJnovZC+MfwTO5hRoIixQ/yjN6+j994XxrGtJt4DzwBbgdaSdpSiW1RBSBcKKnw74AzEYpoku7zbwAAAAAElFTkSuQmCC";
		html+= "<div id='plugin_analysis_vip_movie_box_"+movievipHelper.eleId+"' style='z-index:999999999999999999999;'>";
		html+= "<div class='plugin_item open_page_inner_source'><img src='"+vipImgBase64+"'>";
		html+= "<div class='play_source_box'>";
		html+= "<div class='inner_table_box'>";
		html+= "<table style=''><tr>";
		for(var playLineIndex=0; playLineIndex<this.defaultSourceArray.length; playLineIndex++){
			if(playLineIndex%3==0){
				html +="<tr>";
				html += "<td data-url='"+this.defaultSourceArray[playLineIndex].url+"'>"+this.defaultSourceArray[playLineIndex]['name']+"</td>";
				continue;
			}
			html += "<td data-url='"+this.defaultSourceArray[playLineIndex].url+"'>"+this.defaultSourceArray[playLineIndex]['name']+"</td>";
			if((playLineIndex+1)%3==0){
				html +="</tr>";
			}
		}
		html+= "</tr></table>";
		html+= "</div></div>";
		html+= "</div>";
		html+= "</div>";
		$("body").append(html);
		var $vipMovieBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+"");
		var $playSourceBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.plugin_item>.play_source_box");
		var btnHeight = $vipMovieBox.height();
		var playSourceBoxHeight = $playSourceBox.height();
		var playSourceBoxTop = (playSourceBoxHeight-btnHeight)*0.3;
		$playSourceBox.css("top","-"+playSourceBoxTop+"px");
	};
	movievipHelper.comprehensiveAnalysis=function(videoUrl, newWindow){ //综合解析
		var jumpWebsite = "https://tv.wandhi.com/go.html?url="+videoUrl;
		if(newWindow && (typeof GM_openInTab==="function")){
			GM_openInTab(jumpWebsite, {active: true});
		}else{
			location.href = jumpWebsite;
		}
	};
	movievipHelper.operation=function(){
		$("body").on("click", "#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" .jump_analysis_website", function(){
			movievipHelper.comprehensiveAnalysis(window.location.href, true);
		});
		var $vipMovieBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.open_page_inner_source");
		var $playSourceBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.plugin_item>.play_source_box");
		$vipMovieBox.on("mouseover", () => {
			$playSourceBox.show();
		});
		$vipMovieBox.on("mouseout", () => {
			$playSourceBox.hide();
		});
		var player_nodes = [
			{ url:"v.qq.com", node:"#player"},
			{ url:"www.iqiyi.com", node:"#video"},
			{ url:"v.youku.com", node:"#player"},
			{ url:"w.mgtv.com", node:".kernel-video-element"},
			{ url:"www.mgtv.com", node:".kernel-video-element"},
			{ url:"tv.sohu.com", node:"#player"},
			{ url:"film.sohu.com", node:"#playerWrap"},
			{ url:"www.le.com", node:"#le_playbox"},
			{ url:"video.tudou.com", node:".td-playbox"},
			{ url:"v.pptv.com", node:"#pptv_playpage_box"},
			{ url:"vip.pptv.com", node:".w-video"},
			{ url:"www.wasu.cn", node:"#flashContent"},
			{ url:"www.acfun.cn", node:"#ACPlayer"},
			{ url:"vip.1905.com", node:"#player"},
			{url:"play.tudou.com",node:"#player"},
			{url:"www.bilibili.com/video",node:"#bilibiliPlayer"},
			{url:"www.bilibili.com/bangumi",node:"#player_module"},
		];
		var node = "";
		for(var m in player_nodes) {
			var playUrl = window.location.href;
			if(playUrl.indexOf(player_nodes[m].url)!= -1){
				node = player_nodes[m].node;
			}
		}
		$("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box>.inner_table_box> table td").on("click", function(){
			$("#play-iframe-outer-7788op").remove();

			$("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box>.inner_table_box> table td").removeClass("td_hover");
			$(this).addClass("td_hover");

			var playUrl = window.location.href;
			var playHtml = "<div id='play-iframe-outer-7788op' style='width:100%;height:100%;'><iframe allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play' style='height:100%;width:100%' id='play-iframe-6677i-7788'></iframe></div>";
			$(node).html(playHtml);
			var iframeSrc= $(this).attr("data-url")+playUrl;
			$("#play-iframe-6677i-7788").attr("src", iframeSrc);
		})
	};
	movievipHelper.start=function(){
    	if(movievipHelper.isRun() && window.top==window.self){
    		movievipHelper.getServerSource();
    	}
    };
	movievipHelper.start();
})(); 