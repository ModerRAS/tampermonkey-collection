// ==UserScript==
// @name         知乎使用增强
// @namespace    Higex_HHHHHHHHH_X_zhihu
// @version      1.0.1
// @description  知乎使用增强：外链接直接跳出、问题,回答时间标注、短视频下载等
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAY1JREFUWEfdV0tywyAMRV64PYXbZXKKOidLcrI4p0iWbU7RZoE6MOABIpBVyrhTVvZYlp6evoBa+cDK9hUL4PL6PCqtRwMUAN44wIh4DmW2t/uh9A8JwBgFxL1CtIZrDyp1VF03bd8/p1TXA4DL0B9AqX2tUep/AyRlJAJgPdf61MK414ldtwuZiAE09H52CmDafHzt/HsE4Dr02NJ7r3tzu89254di7AEmBDga6qycqYaKBA3DwAKgEsd4UsNWqJMHkCSNJEQ5VkUAwnhJjHtZkqkgEWcGri9PJyquadl4xbZDMifbzCQAVFI2xmZ1vxABcF7adurnQUUFWHU/AcDRLfr+fwGYhuXGcXGgtWCAqpZcZclywLVhLsbUrM9Wi4SBFo1I1Alzs4BjpNQJRQAWGSKalW1Ymf2CBlC7DbkKMCuXX2RzlUACqB2xi5hyQuRCYgFkBpJEOSeb5tTfWkpLicN5tuQ7u5ZHs17r8dfuB8FOmQLlr2ZDH12tRNezzG0oBMECWEJtjczqAL4BysQhMPukapkAAAAASUVORK5CYII=
// @author       Higex,Unknown
// @include      *://*.zhihu.com/*
// @require      https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/2.0.3/jquery.min.js
// @grant        GM_addStyle
// @run-at       document-idle
// @license      AGPL License
// @charset		 UTF-8
// ==/UserScript==

(function() {
	'use strict';

	var $ = $ || window.$; //获得jquery的$标识符

	/**
	 * 知乎助手开始
	 */
	const zhihuHelper={};
	zhihuHelper.autoJumpTarget = function(){ //直接跳转到目标网页
		var regexResult = location.search.match(/target=(.+?)(&|$)/);
		if(regexResult && regexResult.length==3){
			location.href = decodeURIComponent(regexResult[1]);
		}
	};
	zhihuHelper.clearAdvert = function(){  //去除广告，可能造成误伤，用最小策略
		const loopTask = ()=>{
			[".Question-sideColumnAdContainer", ".AppBanner", ".AdblockBanner", ".AdvertImg"]
				.map((elementName)=> document.querySelector(elementName))
				.forEach((element)=>{
					if(element){
						element.style.display = "none";
					}
				});
		}
		loopTask();
		setInterval(function(){
			loopTask();
		}, 1000);
	};
	zhihuHelper.changeHeightQualityPic = function(){ //图片自动高清
		setInterval(function(){
			$("body").find("img").each(function(){
				var dataoriginal = $(this).attr("data-original");
				if(!!dataoriginal){
					$(this).attr("src", dataoriginal);
				}
			});
		}, 500);
	};
	zhihuHelper.noLoginBox = function(){ //去除登录提示
		var IntervalUnit = 200;
		var totalIntervalMs = 0;
		var loginInterval = setInterval(function(){
			$(".signFlowModal").children(".Modal-closeButton").click();
			totalIntervalMs += IntervalUnit;
			if(totalIntervalMs >= 2000){  //循环多次，我就不信还显示
				clearInterval(loginInterval);
			}
		}, IntervalUnit);
		$(".AppHeader-login").click(function(){
			clearInterval(loginInterval);
			$(".Modal-wrapper").show();
		});
	};
	zhihuHelper.markArticleOrQuestion = function(){
		var questionsCss = `
			.AnswerItem .ContentItem-title a::before {
				content: '问题';
				color: #f68b83;
				background-color: #f68b8333;
				font-weight: bold;
				font-size: 13px;
				padding: 1px 4px 0px;
				border-radius: 2px;
				display: inline-block;
				vertical-align: middle;
				margin: 0px 4px 0px 0px;
			}
			.ArticleItem .ContentItem-title a::before {
				content: '文章';
				color: #0066FF;
				background-color: #E5EFFF;
				font-weight: bold;
				font-size: 13px;
				padding: 1px 4px 0;
				border-radius: 2px;
				display: inline-block;
				vertical-align: middle;
				margin: 0px 4px 0px 0px;
			}
			.ZvideoItem .ContentItem-title a::before {
				content:'视频';
				color: #00BCD4;
				background-color: #00BCD433;
				font-weight: bold;
				font-size: 13px;
				padding: 1px 4px 0;
				border-radius: 2px;
				display: inline-block;
				vertical-align: middle;
				margin: 0px 4px 0px 0px;
			}
			.TopstoryItem--advertCard{
				text-decoration:line-through;
			}
		`;
		GM_addStyle(questionsCss);
	}
	zhihuHelper.DateFormat = function(time, format){
		//时间格式化
		var o = {
			"M+": time.getMonth() + 1, //月份
			"d+": time.getDate(), //日
			"h+": time.getHours(), //小时
			"m+": time.getMinutes(), //分
			"s+": time.getSeconds(), //秒
			"q+": Math.floor((time.getMonth() + 3) / 3), //季度
			"S": time.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(format)){
			format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o){
			if(new RegExp("(" + k + ")").test(format)){
				format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return format;
	};
	zhihuHelper.addDateQuestion = function(){
		var title = document.querySelector(".QuestionPage");
		if(!!title){
			var dateCreated = title.querySelector("[itemprop~=dateCreated][content]").content;
			var dateModified = title.querySelector("[itemprop~=dateModified][content]").content;
			var createDate = this.DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
			var editDate = this.DateFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");

			var side = title.querySelector(".QuestionHeader-side");
			var timeDiv = document.createElement('div');
			timeDiv.innerHTML = `<p>创建于:&nbsp;${createDate}</p><p>编辑于:&nbsp;${editDate}</p>`;
			timeDiv.style.cssText = 'color:#6f6f6f;font-size:13px;';
			side.appendChild(timeDiv);
		}
	};
	zhihuHelper.addTimeAnswerItems = function(){
		var list = document.querySelectorAll(".AnswerItem:not(div[zh_date_mk='true'])");
		var item = null;
		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if (item.getAttribute('zh_date_mk') === 'true') {
				continue;
			}
			item.setAttribute("zh_date_mk", "true");
			try{
				var dateCreated = item.querySelector("[itemprop~=dateCreated][content]").content;
				var dateModified = item.querySelector("[itemprop~=dateModified][content]").content;
				var createDate = this.DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
				var editDate = this.DateFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");

				var sideItem = item.querySelector(".ContentItem-meta");
				var timeDiv = document.createElement('div');
				timeDiv.innerHTML = `创建于:&nbsp;${createDate}&nbsp;&nbsp;&nbsp;修改于:&nbsp;${editDate}`;
				timeDiv.class = "Voters";
				timeDiv.style.cssText = 'color:#6f6f6f;font-size:13px;display:block;padding:5px 0px;';
				sideItem.appendChild(timeDiv);
			}catch(e){}
		}
		return true;
	};
	// 提问者标识出来
	zhihuHelper.showQuestionAuthor = function(){
		if (document.querySelector('.SpecialQuestionAuthor-Wrapper, .SpecialQuestionAuthor')){
			return;
		}
		let qJson = JSON.parse(document.querySelector('#js-initialData').textContent).initialState.entities.questions[/\d+/.exec(location.pathname)[0]].author,
			html = `<div class="BrandQuestionSymbol"><a class="BrandQuestionSymbol-brandLink" href="/people/${qJson.urlToken}"><img role="presentation" src="${qJson.avatarUrl}" class="BrandQuestionSymbol-logo" alt=""><span class="BrandQuestionSymbol-name">${qJson.name}</span></a><div class="BrandQuestionSymbol-divider" style="margin-left: 5px;margin-right: 10px;"></div></div>`;
		document.querySelector('.QuestionHeader-topics').insertAdjacentHTML('beforebegin', html);
	};
	zhihuHelper.startDealwithQuestion = function(){
		let isMarkComplete = true;
		setInterval(()=>{
			if(isMarkComplete){
				isMarkComplete = false;
				isMarkComplete = this.addTimeAnswerItems();
			}
		}, 2500);
		this.showQuestionAuthor();
		this.addDateQuestion();
	};
	zhihuHelper.start = function(){
		const host = window.location.host;
		const self = this;
		if(host == "link.zhihu.com"){
			this.autoJumpTarget();
		}
		if(host.indexOf("zhihu.com")!=-1){
			this.markArticleOrQuestion();
			if(window.location.href.indexOf("www.zhihu.com/question/")!=-1){
				this.startDealwithQuestion();
			}
			this.noLoginBox();     //去除登录框
			this.clearAdvert();    //去除广告
		}
	};
	zhihuHelper.start();
})(); 