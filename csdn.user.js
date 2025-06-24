// ==UserScript==
// @name         CSDN使用增强
// @namespace    Higex_HHHHHHHHH_X_csdn
// @version      1.0.1
// @description  CSDN使用增强：广告移除、净化剪切板、未登录查看折叠评论等
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAY1JREFUWEfdV0tywyAMRV64PYXbZXKKOidLcrI4p0iWbU7RZoE6MOABIpBVyrhTVvZYlp6evoBa+cDK9hUL4PL6PCqtRwMUAN44wIh4DmW2t/uh9A8JwBgFxL1CtIZrDyp1VF03bd8/p1TXA4DL0B9AqX2tUep/AyRlJAJgPdf61MK414ldtwuZiAE09H52CmDafHzt/HsE4Dr02NJ7r3tzu89254di7AEmBDga6qycqYaKBA3DwAKgEsd4UsNWqJMHkCSNJEQ5VkUAwnhJjHtZkqkgEWcGri9PJyquadl4xbZDMifbzCQAVFI2xmZ1vxABcF7adurnQUUFWHU/AcDRLfr+fwGYhuXGcXGgtWCAqpZcZclywLVhLsbUrM9Wi4SBFo1I1Alzs4BjpNQJRQAWGSKalW1Ymf2CBlC7DbkKMCuXX2RzlUACqB2xi5hyQuRCYgFkBpJEOSeb5tTfWkpLicN5tuQ7u5ZHs17r8dfuB8FOmQLlr2ZDH12tRNezzG0oBMECWEJtjczqAL4BysQhMPukapkAAAAASUVORK5CYII=
// @author       Higex,Unknown
// @include      *://bbs.csdn.net/*
// @include      *://www.csdn.net/*
// @include      *://blog.csdn.net/*/article/details/*
// @include      *://*.blog.csdn.net/article/details/*
// @require      https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/2.0.3/jquery.min.js
// @run-at       document-idle
// @license      AGPL License
// @charset		 UTF-8
// ==/UserScript==

(function() {
	'use strict';

	var $ = $ || window.$; //获得jquery的$标识符
	const window_host = window.location.host;
	const window_url = window.location.href;

	/**
	 * CSDN使用增强
	 */
	const csdnHelper={};
	csdnHelper.isRun=function(){
		if(window_host.indexOf("csdn.")!=-1){
			return true;
		}
		return false;
	};
	csdnHelper.start = function(){
		if(!this.isRun()){
			return;
		}
		// 针对csdn文章详情页
        if( (window_host === "blog.csdn.net" || window_host.endsWith(".blog.csdn.net")) &&
            window_url.includes("article/details") ){
			setInterval(function(){
				$("#footerRightAds").remove();     //移除左侧google广告
				$(".side-question-box").remove();  //移除右侧那个学习弹框
				$("div[id^='dmp_ad']").remove();

				$("div[class^='ad_']").remove();
				$("div[id^='floor-ad_']").remove();

				$('.toolbar-advert').remove();
				$('#recommendAdBox').remove();
			},500);
			//未登录查看全部评论
			$(".comment-list-box").css({
				"max-height":"unset",
				"overflow":"auto"
			});
            // 展开折叠的代码
            $(".hide-preCode-box").hide();
            $("pre").css("height", "auto");
		}
        if(window_host.includes("csdn.net")){
            // 去除剪贴板劫持
            try {
                csdn.copyright.init("", "", "");
            } catch (e) {}
             // 移除url拦截
		    $("#content_views").unbind("click");
        }
        // 免登陆
		localStorage.setItem("anonymousUserLimit", "");
	};
	csdnHelper.start();

})(); 