var mapOption, M1;
var CloudDiskOption1, CloudDisk1, timeTicket = null, cloudDiskCount = 0;
var PressOption1,PressOption2,PressOption3, PressEC1,PressEC2,PressEC3;
var linePointsNum = 15;
var dataValue1 = [], dataValue2 = [], dataValue3 = [], dataTime1 = [], dataTime2 = [], dataTime3 = [];
var dataUrl = 'get_data.php?act=';
var timeFormat = "hh:mm:ss";
var geoCoordMap = null;
var cloudDiskOption,cloudDiskECharts;
var numRun1,numRun2,numRun3;

$(function(){
	for (var i = 0; i < linePointsNum; i++) {
		dataValue1.push(0);
		dataValue2.push(0);
		dataValue3.push(0);
		var currTime = (new Date()).Format(timeFormat);
		dataTime1.push(currTime);
		dataTime2.push(currTime);
		dataTime3.push(currTime);
	};
	ajaxGetData('get_map','MAPDATA', false);
	ajaxGetData('get_main_map_info','MAINMAPINFO', true);
	// cloudDiskOnlineUserUpdate();
	// cloudDiskDataUpdate();
	RateDatas();
	// MainDataUpdate();
	// setIntervalAllData(5000);

	/****2017.10.24*****/
	canvasCloudDisk('ss');

	/**num run**/
	numRun1 = $("#GeoInfoProduct").numberAnimate({num:'0', speed:2000, symbol:",", showName: false});
	numRun2 = $("#VisitDataNum").numberAnimate({num:'0', speed:2000, symbol:",", showName: false});
	numRun3 = $("#GeoSurveyDataNum").numberAnimate({num:'0', speed:2000, symbol:",", showName: false});
	ajaxGetData('get_visits', 'MAINVISIT', true);
	setInterval(function(){
		ajaxGetData('get_visits', 'MAINVISIT', true);
	},5000);
	/****num run***/
	setInterval(function(){
		ajaxGetData('get_main_map_info','MAINMAPINFO', true);
	},1000*60*60*24);

	newMsgs();
	setInterval(function(){
		newMsgs();
	},1000*60);
	setInterval(function(){
		ajaxGetData('get_main_bottom', 'MAINRATE', true);
	},2000);
	
	
	calculateScale();
	$(window).resize(function(){
		calculateScale();
	})
	
})

function setIntervalAllData(millisec){
	setInterval(function(){
		MainDataUpdate();
		cloudDiskOnlineUserUpdate();
		cloudDiskDisplay();
	}, millisec);
	setInterval(function(){
		// ajaxGetData('get_main_bottom', 'MAINRATE', true);
	}, 1000);
}

function MainPartMap(BJData){

		var convertData = function (data) {
			var res = [];
			// for (var i = 0; i < data.length; i++) {
				var dataItem = data;
				var fromCoord = geoCoordMap[dataItem[0].name];
				var toCoord = geoCoordMap[dataItem[1].name];
				if (fromCoord && toCoord) {
					res.push({
						fromName: dataItem[0].name,
						toName: dataItem[1].name,
						coords: [fromCoord, toCoord]
					});
				}
			// }
			return res;
		};

		var color = ['#a6c84c'];
		var series = [], totalDatas = [], seriesIndex = 0, MapTimer;
		[['发展中心', BJData]].forEach(function (item, i) {
			for (var j = 0; j < item[1].length; j++) {
				totalDatas.push(item[1][j].value);
				series.push(
					{
						name: item[0] + ' No.1',
						type: 'lines',
						zlevel: 1,
						effect: {
							show: false,
							period: 2,
							trailLength: 0.3,
							color: 'white',
							symbolSize: 4
						},
						lineStyle: {
							normal: {
								opacity: 0,
								color: color[i],
								width: 0,
								curveness: 0.2
							}
						},
						data: convertData(item[1][j])
					},
					{
						type: 'effectScatter',
						coordinateSystem: 'geo',
						zlevel: 2,
						rippleEffect: {
							period: 4,
							scale: 4,
							brushType: 'stroke',
						},
						label: {
							normal: {
								show: false,
								position: 'right',
								formatter: '{b}'
							}
						},
						symbolSize: function(val){
							return val[2]/3;
						},
						itemStyle: {
							normal: {
								color: '#35A7E8',
								borderColor: '#35A7E8'
							}
						},
						data:
						item[1][j].map(function (dataItem) {
							return {
								name: dataItem.name,
								value: geoCoordMap[dataItem.name].concat([dataItem.value])
							};
						})
					}
				);
			};
		});

		mapOption = {
			backgroundColor: 'transparent',
			title : {
				text: '',
				subtext: '',
				left: 'center',
				textStyle : {
					color: '#fff'
				}
			},
			tooltip : {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				top: 'bottom',
				left: 'right',
				show: false,
				data:['发展中心 No.1'],
				textStyle: {
					color: '#fff'
				},
				selectedMode: 'single'
			},
			geo: {
				map: 'china',
				label: {
					emphasis: {
						show: false
					}
				},
				top:70,
				left:320,
				zoom: 1.2,
				roam: true,
				itemStyle: {
					normal: {
						borderColor: 'rgba(100,149,237,1)',
						areaColor:'transparent'
					},
					emphasis: {
						areaColor: '#2a333d'
					}
				}
			},
			series: series
		};
		M1 = echarts.init(document.getElementById('Map'));
		animateShowLabel();
		M1.setOption(mapOption);

		MapTimer = setInterval(function(){
		 	animateShowLabel();
		 },500);

		function animateShowLabel(){
			for (var i = 0; i < totalDatas.length; i++) {
				if (seriesIndex == i) {
					seriesIndexStart = seriesIndex*2;
					mapOption.series[seriesIndexStart].effect.show = true;
					mapOption.series[seriesIndexStart+1].itemStyle.normal.color = '#FFF600';
					mapOption.series[seriesIndexStart+1].zlevel = 3;
					mapOption.series[seriesIndexStart+1].itemStyle.normal.borderColor = '#FFF600';
					mapOption.series[seriesIndexStart+1].label.normal.show = true;
					if (i>0) {
						var item_str = '<div class="item">'+
								'<div class="unit-name fromData Left"><span>'+mapOption.series[seriesIndexStart+1].data[0].name+'</span></div>'+
								'<div class="unit-name toData Right"><span>'+mapOption.series[1].data[0].name+'</span></div>'+
							'</div>'
						$('.mapDataInfoList .items').append(item_str);
						var marginV = '-' + i*43;
						$('.mapDataInfoList .items').animate({'marginTop': marginV+'px'}, 1000, 'swing');
					};
					
				};
			};
			
			M1.setOption(mapOption);
			if ((totalDatas.length - 1) == seriesIndex) {
				for (var i = 0; i < totalDatas.length; i++) {
					seriesIndexStart = i*2;
					// mapOption.series[seriesIndexStart].effect.show = true;
				}
				// M1.setOption(mapOption);
		 		clearInterval(MapTimer);
		 	};
			seriesIndex +=1;
		}
		var lastLabel = 0;
		// setInterval()
		lastLabelAnimate();
		function lastLabelAnimate(){
			var newTimer = setInterval(function(){
				var totalNum =  $('.mapDataInfoList .items .item').length;
				var currMarginTop = -(totalNum -3)*43;
				if (currMarginTop >= parseInt($('.mapDataInfoList .items').css('margin-top'))) {
					newAnimate();
				};
			},1000);
			function newAnimate(){
				for (var i = 0; i < 3; i++) {
					if (i == lastLabel) {
						var marginTop = parseInt($('.mapDataInfoList .items').css('margin-top')) - 43;
						$('.mapDataInfoList .items').animate({'marginTop': marginTop+'px'}, 1000, 'swing');
						console.log(marginTop);
					};
					if (lastLabel == 2) {
						clearInterval(newTimer);
					};
				};
				lastLabel+=1;
			}
			
			
		}
}

function cloudDiskData(data){
	var legendData = [];
	for (var i = 0; i < data.length; i++) {
		legendData.push(data[i].name);
	};
	CloudDiskOption1 = {
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c}<br /> {d}%"
		},
		legend: {
			orient: 'horizontal',
			x: 'left',
			data:legendData,
			itemHeight:12,
			itemWidth:12,
			itemGap:16,
			textStyle : {
				color: '#FFFFFF',
				fontSize:14
			}
		},
		color:['#39B1D3','#DC5969','#77BB67','#E2C969'],
		series: [
			{
				name:'总计100',
				type:'pie',
				radius: ['50%', '70%'],
				center: ['50%', '55%'],
				avoidLabelOverlap: true,
				label: {
					normal: {
						formatter: "{b} ：{c}个 ({d}%)",
						show: false,
						position: 'center',
						textStyle:{
							fontSize: 14,
							color:'#FFFFFF'
						}
						
					},
					emphasis: {
						show: false,
						textStyle: {
							fontSize: '18',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false,
						color: '#12B6FF',
						lineStyle: {
							color: '#12B6FF'
						}
					}
				},
				data:data
			}
		]
	};
	CloudDisk1 = echarts.init(document.getElementById('softType'));
	CloudDisk1.setOption(CloudDiskOption1);
	var app_total = 0;
	for (var i = 0; i < CloudDisk1.getOption().series[0].data.length; i++) {
		app_total += parseInt(CloudDisk1.getOption().series[0].data[i].value);
	};
	$('#cloudDisk .title .total-count').text('共计：'+app_total);
	cloudDiskDisplay();
}

function cloudDiskDataUpdate(){
	ajaxGetData('get_cloud_desktop_online','MAINDISK', true);
}

function cloudDiskDisplay(){
	var cloudDiskLength = CloudDiskOption1.series[0].data.length;
	CloudDisk1.dispatchAction({
		type: 'downplay',
		seriesIndex: 0
	});
	CloudDisk1.dispatchAction({
		type: 'highlight',
		seriesIndex: 0,
		dataIndex: cloudDiskCount % cloudDiskLength
	});
	CloudDisk1.dispatchAction({
		type: 'showTip',
		seriesIndex: 0,
		dataIndex: cloudDiskCount % cloudDiskLength
	});
	cloudDiskCount++;
}

function cloudDiskOnlineUserUpdate(){
	ajaxGetData('get_cloud_desktop_online', 'MAINONLINEUSERS', true);
}

function MainDataUpdate(){
	ajaxGetData('get_accesses', 'MAINACCESSES', true);
	ajaxGetData('get_visits', 'MAINVISIT', true);
}

function RateDatas(){

	PressOption1 = {
		backgroundColor: 'transparent',
		tooltip : {
			formatter: "{c} {b}"
		},
		series : [
			{
				name:'',
				type:'gauge',
				min:0,
				max:100,
				splitNumber:10,
				radius: '100%',
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						color: [[0.2, '#00A2FF'],[0.8, '#187FE9'],[1, '#16CFDB']],
						width: 2
					}
				},
				axisLabel: {            // 坐标轴小标记
					textStyle: {       // 属性lineStyle控制线条样式
						fontWeight: 'normal',
						color: 'transparent',
						show: false
					}
				},
				axisTick: {            // 坐标轴小标记
					length :5,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				splitLine: {           // 分隔线
					length :10,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						width:1,
						color: '#fff'
					}
				},
				pointer: {           // 分隔线
					shadowColor : '#fff', //默认透明
					shadowBlur: 5,
					width: 3
				},
				title : {
					offsetCenter: [0, '-30%'],
					textStyle: {
						fontSize: 24,
						color: '#fff'
					}
				},
				detail : {
					backgroundColor: 'transparent',
					offsetCenter: [0, '65%'],       // x, y，单位px
					textStyle: {
						color: '#FEE55A',
						fontSize: 30
					},
					formatter:'{value}%'
				},
				data:[{value: 0, name: 'CPU'}]
			}
		]
	};
	PressOption2 = PressOption1;
	PressOption3 = PressOption1;


	//model 1
	PressEC1 = echarts.init(document.getElementById('CPUData'));
	PressEC1.setOption(PressOption1);

	//model 2
	PressOption2.series[0].data[0].name = "内存";
	PressEC2 = echarts.init(document.getElementById('RAMData'));
	PressEC2.setOption(PressOption2);

	//model 3
	PressOption3.series[0].data[0].name = "存储";
	PressEC3 = echarts.init(document.getElementById('StoreData'));
	PressEC3.setOption(PressOption3);
	ajaxGetData('get_main_bottom', 'MAINRATE', true);
}

function pressDataDeal(echart, value, option, name){
	option.series[0].data[0].value = value;
	option.series[0].data[0].name = name;
	echart.setOption(option);
}

function RateDataShow(data){
	var data_p = Math.floor((Math.random()*100)+1);
	var prod_p = Math.floor((Math.random()*100)+1);
	var app_p = Math.floor((Math.random()*100)+1);
	pressDataDeal(PressEC1, data_p, PressOption1, 'CPU');

	pressDataDeal(PressEC2, prod_p, PressOption2, '内存');

	pressDataDeal(PressEC3, app_p, PressOption3, '存储');
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function ajaxGetData(act, type, async){
	// $.ajax({
	// 	url: dataUrl+act,
	// 	cache: false,
	// 	async: async,
	// 	success:function(data){
	// 		data = JSON.parse(data);
			switch(type){
				case 'MAPDATA':
					geoCoordMap = MAPDATA;
					break;
				case 'MAINMAPINFO':
					MainPartMap(MAINMAPINFO);
					break;
				case 'MAINRATE':
					RateDataShow(MAINRATE);
					break;
				case 'MAINACCESSES':
					// displayNum(data.accesses, $('#SysIn'), 5, false);
					var ass = MAINACCESSES.accesses+Math.floor((Math.random()*100)+1);
					numRun1.resetData(ass);
					break
				case 'MAINVISIT':
					var user1 = MAINVISIT.user1+Math.floor((Math.random()*100)+1);
					var user2 = MAINVISIT.user2+Math.floor((Math.random()*100)+1);
					var total = MAINVISIT.total+Math.floor((Math.random()*100)+1);
					$('#otherData .business span').text(user1);
					$('#otherData .internet span').text(user2);
					numRun1.resetData(user1);
					numRun2.resetData(total);
					numRun3.resetData(user2);
					break;
				case 'MAINONLINEUSERS':
					cloudDiskOnlineUser(MAINONLINEUSERS);
					break;
				case 'MAINDISK':
					cloudDiskData(MAINDISK);
					break;
				default:
					break;
			}

	// 	}
	// })
}

/*****2017.10.24 add new******/

function canvasCloudDisk(data){
	var myData = ['应用类型', '办公软件', '工具软件', '专业应用'];
	var databeast = {
	    1: [389, 259, 262, 324]
	};
	var databeauty = {
	    1: [121, 388, 233, 309]
	};
	var timeLineData = [1];

	cloudDiskOption = {
		backgroundColor: 'transparent',
		grid: [{
			show: false,
			left: '15%',
			top: 0,
			bottom: 0,
			containLabel: true,
			width: '35%',
		}, {
			show: false,
			left: '51.5%',
			top: 20,
			bottom: 0,
			width: '0%',
		}, {
			show: false,
			right: '15%',
			top: 0,
			bottom: 0,
			containLabel: true,
			width: '35%',
		}],
		xAxis: [{
			type: 'value',
			inverse: true,
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			position: 'top',
			axisLabel: {
				show: false
			},
			splitLine: {
				show: false
			},
		}, {
			gridIndex: 1,
			show: false,
		}, {
			gridIndex: 2,
			type: 'value',
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			position: 'top',
			axisLabel: {
				show: false
			},
			splitLine: {
				show: false
			},
		}],
		yAxis: [{
			type: 'category',
			inverse: true,
			position: 'right',
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false,
				textStyle: {
					color: '#9D9EA0',
					fontSize: 12,
				},
			},
		data: myData,
		}, {
			gridIndex: 1,
			type: 'category',
			inverse: true,
			position: 'left',
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#FFFFFF',
					fontSize: 24,
				},
			},
			data: myData.map(function(value) {
				return {
					value: value,
					textStyle: {
						align: 'center',
					}
				}
			})
		}, {
			gridIndex: 2,
			type: 'category',
			inverse: true,
			position: 'left',
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false,
				textStyle: {
					color: '#9D9EA0',
					fontSize: 12,
				},
			},
			data: myData,
		}],
		series: []
	};

	for (var i = 0; i < timeLineData.length; i++) {
		cloudDiskOption.series.push(
			{
				name: '软件资源',
				type: 'bar',
				barGap: 16,
				barWidth: 24,
				xAxisIndex: 0,
				yAxisIndex: 0,
				label: {
					normal: {
						show: true,
						position: ['100%',0],
						offset:[-180,0],
						fontSize: 24,
						color: '#FFFFFF'
					}
				},
				itemStyle: {
					normal: {
						color: '#02A8BD',
					},
					emphasis: {
						color: '#08C7AE',
					},
				},
				data: databeast[timeLineData[i]],
			},
			{
				name: '在线人数',
				type: 'bar',
				barGap: 16,
				barWidth: 24,
				xAxisIndex: 2,
				yAxisIndex: 2,
				label: {
					normal: {
						show: true,
						position: [130,0],
						fontSize: 24,
						color: '#FFFFFF'
					}
				},
				itemStyle: {
					normal: {
						color: '#0773FF',
					},
					emphasis: {
						color: '#F94646',
					}
				},
				data: databeauty[timeLineData[i]],
			}
		);
	}
	cloudDiskECharts = echarts.init($('#cloudDisk').get(0));
	cloudDiskECharts.setOption(cloudDiskOption);
}

function newMsgs(){

	var data = {
			datas:[
				'2017-10-27 14:00 拦截了来自勒索病毒的攻击',
				'2017-10-27 13:55 拦截了不明网站的攻击',
				'2017-10-27 13:50 拦截了来自黑客的攻击',
				'2017-10-27 13:25 拦截了来自XXX的攻击',
				'2017-10-27 12:11 拦截了来自敲诈病毒的攻击'
			],
			total: parseInt(Math.random()*1000)
		};
	$('.runMsgs #newMsg .msgList ').html('');
	$('.runMsgs #totalMsg .msgList .num').text(data.total);
	var msg_str = '<div class="marquee"><ul class="marquee-content-items">';
	for (var i = 0; i < data.datas.length; i++) {
		msg_str += '<li><span class="logo warning"></span><span class="text">'+data.datas[i]+'</span></li>';
	};
	msg_str += '</ul></div>';
	$('.runMsgs #newMsg .msgList').html(msg_str);
	createMarquee({
		duration: 40000,
		padding: 50,
		marquee_class:'.marquee', 
		container_class: '.msgItems', 
		hover: true
	});
}

function calculateScale(){
	var standardX = 3840, standardY = 1080;
	var borserW = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
	var borserH = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
	var newH = Math.round((9/32)*borserW);
	var marginTop = (borserH - newH)/2;
	var scaleX = parseFloat(borserW/standardX);
	$('.GeoCloud').css('-webkit-transform','scale('+scaleX+')');
	$('.GeoCloud').css('-ms-transform','scale('+scaleX+')');
	$('.GeoCloud').css('transform','scale('+scaleX+')');
	$('.GeoCloud').css('margin-top',marginTop+'px');
}


var MAPDATA = {"发展中心":["116.377028","39.929777"],"中国地质调查局":["116.343165","39.92899"],"地科院":["116.343196","39.933796"],"发展研究中心":["116.343165","39.92899"],"天津地调中心":["117.249978","39.116134"],"沈阳地调中心":["123.408987","41.910475"],"南京地调中心":["118.831177","32.044777"],"武汉地调中心":["114.426555","30.456324"],"成都地调中心":["104.082141","30.690319"],"西安地调中心":["108.955011","34.247059"],"广州海洋局":["113.324663","23.101892"],"青岛海洋所":["120.40475","36.081436"],"航空物探遥感中心":["116.354081","39.994898"],"物化探所":["116.739236","39.529416"],"油气调查中心":["116.739218","39.529369"],"地质所":["116.342407","39.933477"],"资源所":["116.342407","39.933477"],"地质力学所":["116.322746","39.952045"],"环境监测院":["116.338389","39.9609"],"水环中心":["115.494505","38.888381"],"岩溶所":["110.330263","25.262583"],"实物资料中心":["116.806278","39.956326"],"地质图书馆":["116.356384","39.99725"],"矿业报社":["116.35441","39.889"],"实验测试中心":["116.343196","39.933796"],"勘探技术所":["116.739274","39.52901"],"探矿工程所":["116.356384","39.99725"],"探矿工艺所":["103.942234","30.789608"],"郑州综合利用所":["113.614842","34.741829"],"成都综合利用所":["104.068274","30.626756"]};
var MAINMAPINFO = [[{"name":"发展中心","value":""},{"name":"发展中心"}],[{"name":"中国地质调查局","value":"10"},{"name":"发展中心"}],[{"name":"地科院","value":"20"},{"name":"发展中心"}],[{"name":"发展研究中心","value":"30"},{"name":"发展中心"}],[{"name":"天津地调中心","value":"40"},{"name":"发展中心"}],[{"name":"沈阳地调中心","value":"50"},{"name":"发展中心"}],[{"name":"南京地调中心","value":"60"},{"name":"发展中心"}],[{"name":"武汉地调中心","value":"70"},{"name":"发展中心"}],[{"name":"成都地调中心","value":"80"},{"name":"发展中心"}],[{"name":"西安地调中心","value":"90"},{"name":"发展中心"}],[{"name":"广州海洋局","value":"10"},{"name":"发展中心"}],[{"name":"青岛海洋所","value":"20"},{"name":"发展中心"}],[{"name":"航空物探遥感中心","value":"30"},{"name":"发展中心"}],[{"name":"物化探所","value":"40"},{"name":"发展中心"}],[{"name":"油气调查中心","value":"50"},{"name":"发展中心"}],[{"name":"地质所","value":"60"},{"name":"发展中心"}],[{"name":"资源所","value":"70"},{"name":"发展中心"}],[{"name":"地质力学所","value":"80"},{"name":"发展中心"}],[{"name":"环境监测院","value":"90"},{"name":"发展中心"}],[{"name":"水环中心","value":"10"},{"name":"发展中心"}],[{"name":"岩溶所","value":"20"},{"name":"发展中心"}],[{"name":"实物资料中心","value":"30"},{"name":"发展中心"}],[{"name":"地质图书馆","value":"40"},{"name":"发展中心"}],[{"name":"矿业报社","value":"50"},{"name":"发展中心"}],[{"name":"实验测试中心","value":"60"},{"name":"发展中心"}],[{"name":"勘探技术所","value":"70"},{"name":"发展中心"}],[{"name":"探矿工程所","value":"80"},{"name":"发展中心"}],[{"name":"探矿工艺所","value":"90"},{"name":"发展中心"}],[{"name":"郑州综合利用所","value":"10"},{"name":"发展中心"}],[{"name":"成都综合利用所","value":"20"},{"name":"发展中心"}]];
var MAINRATE = {"data_f":Math.floor((Math.random()*100)+1),"data_p":Math.floor((Math.random()*100)+1),"prod_f":Math.floor((Math.random()*100)+1),"prod_p":24,"app_f":Math.floor((Math.random()*100)+1),"app_p":Math.floor((Math.random()*100)+1)};
var MAINACCESSES = {"accesses":Math.floor((Math.random()*10000000)+1)};
var MAINVISIT = {"total":Math.floor((Math.random()*1000000)+1),"user1":Math.floor((Math.random()*100)+1),"user2":Math.floor((Math.random()*10000)+1)};
var MAINONLINEUSERS = [{"name":"应用类型","value":172},{"name":"工具类","value":86},{"name":"办公类","value":112},{"name":"专业类","value":106}];
var MAINDISK = [{"name":"应用类型","value":135},{"name":"工具类","value":157},{"name":"办公类","value":143},{"name":"专业类","value":199}];











