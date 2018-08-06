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
	
	
	// calculateScale();
	// $(window).resize(function(){
	// 	calculateScale();
	// })
	
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
			for (var i = 0; i < data.length; i++) {
				var dataItem = data[i];
				var fromCoord = geoCoordMap[dataItem[0].name];
				var toCoord = geoCoordMap[dataItem[1].name];
				if (fromCoord && toCoord) {
					res.push({
						fromName: dataItem[0].name,
						toName: dataItem[1].name,
						coords: [fromCoord, toCoord]
					});
				}
			}
			return res;
		};

		var color = ['#a6c84c'];
		var series = [];
		[['国土资源部', BJData]].forEach(function (item, i) {
			series.push({
				name: item[0] + ' No.1',
				type: 'lines',
				zlevel: 1,
				effect: {
					show: true,
					period: 6,
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
				data: convertData(item[1])
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
					return val[2]/4;
				},
				itemStyle: {
					normal: {
						color: '#35E0E8',
						borderColor: '#35E0E8'
					}
				},
				data:
				item[1].map(function (dataItem) {
					return {
						name: dataItem[0].name + ' ' + dataItem[0].value,
						value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
					};
				})
			});
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
				data:['国土资源部 No.1'],
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
				left:420,
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
		M1.setOption(mapOption);
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
	pressDataDeal(PressEC1, data.data_p, PressOption1, 'CPU');

	pressDataDeal(PressEC2, data.prod_p, PressOption2, '内存');

	pressDataDeal(PressEC3, data.app_p, PressOption3, '存储');
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
	$.ajax({
		url: dataUrl+act,
		cache: false,
		async: async,
		success:function(data){
			data = JSON.parse(data);
			switch(type){
				case 'MAPDATA':
					geoCoordMap = data;
					break;
				case 'MAINMAPINFO':
					MainPartMap(data);
					break;
				case 'MAINRATE':
					RateDataShow(data);
					break;
				case 'MAINACCESSES':
					// displayNum(data.accesses, $('#SysIn'), 5, false);
					numRun1.resetData(data.accesses);
					break
				case 'MAINVISIT':
					$('#otherData .business span').text(data.user1);
					$('#otherData .internet span').text(data.user2);
					numRun1.resetData(data.user1);
					numRun2.resetData(data.total);
					numRun3.resetData(data.user2);
					break;
				case 'MAINONLINEUSERS':
					cloudDiskOnlineUser(data);
					break;
				case 'MAINDISK':
					cloudDiskData(data);
					break;
				default:
					break;
			}

		}
	})
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
