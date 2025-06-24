// ==UserScript==
// @name         百度网盘功能加强
// @namespace    Higex_HHHHHHHHH_X_baidupan
// @version      1.0.1
// @description  百度网盘资源页广告过滤
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAY1JREFUWEfdV0tywyAMRV64PYXbZXKKOidLcrI4p0iWbU7RZoE6MOABIpBVyrhTVvZYlp6evoBa+cDK9hUL4PL6PCqtRwMUAN44wIh4DmW2t/uh9A8JwBgFxL1CtIZrDyp1VF03bd8/p1TXA4DL0B9AqX2tUep/AyRlJAJgPdf61MK414ldtwuZiAE09H52CmDafHzt/HsE4Dr02NJ7r3tzu89254di7AEmBDga6qycqYaKBA3DwAKgEsd4UsNWqJMHkCSNJEQ5VkUAwnhJjHtZkqkgEWcGri9PJyquadl4xbZDMifbzCQAVFI2xmZ1vxABcF7adurnQUUFWHU/AcDRLfr+fwGYhuXGcXGgtWCAqpZcZclywLVhLsbUrM9Wi4SBFo1I1Alzs4BjpNQJRQAWGSKalW1Ymf2CBlC7DbkKMCuXX2RzlUACqB2xi5hyQuRCYgFkBpJEOSeb5tTfWkpLicN5tuQ7u5ZHs17r8dfuB8FOmQLlr2ZDH12tRNezzG0oBMECWEJtjczqAL4BysQhMPukapkAAAAASUVORK5CYII=
// @author       Higex,Unknown
// @include      *://pan.baidu.com/s/*
// @require      https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/2.0.3/jquery.min.js
// @run-at       document-idle
// @license      AGPL License
// @charset		 UTF-8
// ==/UserScript==

(function() {
	'use strict';

	var $ = $ || window.$; //获得jquery的$标识符

	/**
	 * 百度网盘资源页广告过滤
	 */
	var baiduWangpanHelper = {};
	baiduWangpanHelper.removeAd = function(){
        setInterval(()=>{
            $(".ad-platform-tips").hide();
            $("div[class*='ad-'],div[class*='-ad-']").hide();
        }, 300);
	};
	baiduWangpanHelper.start = function(){
		if(window.location.host==="pan.baidu.com" && window.location.pathname.indexOf("/s/")!=-1){
			this.removeAd();
		}
	};
	baiduWangpanHelper.start();
})(); 