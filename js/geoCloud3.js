var mapOption, M1;
var CloudDiskOption1, CloudDisk1, timeTicket = null, count = 0;
var PressOption, PressEC1,PressEC2,PressEC3;
var RateOption, RateEC1,RateEC2,RateEC3;
var dataTime, dataTimes, dataVslues, dataVslues = [[ 0, 0, 0, 0, 0],[ 0, 0, 0, 0, 0],[ 0, 0, 0, 0, 0]];
var dataUrl = 'http://localhost/geoCloud/get_data.php?act=';
$(function(){
	dataTime = [(new Date(new Date()-5*60*1000)).Format('hh:mm'),(new Date(new Date()-4*60*1000)).Format('hh:mm'),(new Date(new Date()-3*60*1000)).Format('hh:mm'),(new Date(new Date()-2*60*1000)).Format('hh:mm'),(new Date(new Date()-60*1000)).Format('hh:mm')];
	dataTimes = [dataTime, dataTime, dataTime];
	MainPartMap();
	cloudDiskOnlineUserUpdate();
	cloudDiskDataUpdate();
	RateDatas();
	MainDataUpdate();
	setIntervalAllData(5000);
})

function setIntervalAllData(millisec){
	setInterval(function(){
		MainDataUpdate();
		cloudDiskOnlineUserUpdate();
		cloudDiskDisplay();
	}, millisec);
	setInterval(function(){
		ajaxGetData('get_main_bottom', 'MAINRATE');
		
	}, 1000);
}

function MainPartMap(){

	var geoCoordMap = {
			'上海': [121.4648,31.2891],
			'东莞': [113.8953,22.901],
			'东营': [118.7073,37.5513],
			'中山': [113.4229,22.478],
			'临汾': [111.4783,36.1615],
			'临沂': [118.3118,35.2936],
			'丹东': [124.541,40.4242],
			'丽水': [119.5642,28.1854],
			'乌鲁木齐': [87.9236,43.5883],
			'佛山': [112.8955,23.1097],
			'保定': [115.0488,39.0948],
			'兰州': [103.5901,36.3043],
			'包头': [110.3467,41.4899],
			'北京': [116.4551,40.2539],
			'北海': [109.314,21.6211],
			'南京': [118.8062,31.9208],
			'南宁': [108.479,23.1152],
			'南昌': [116.0046,28.6633],
			'南通': [121.1023,32.1625],
			'厦门': [118.1689,24.6478],
			'台州': [121.1353,28.6688],
			'合肥': [117.29,32.0581],
			'呼和浩特': [111.4124,40.4901],
			'咸阳': [108.4131,34.8706],
			'哈尔滨': [127.9688,45.368],
			'唐山': [118.4766,39.6826],
			'嘉兴': [120.9155,30.6354],
			'大同': [113.7854,39.8035],
			'大连': [122.2229,39.4409],
			'天津': [117.4219,39.4189],
			'太原': [112.3352,37.9413],
			'威海': [121.9482,37.1393],
			'宁波': [121.5967,29.6466],
			'宝鸡': [107.1826,34.3433],
			'宿迁': [118.5535,33.7775],
			'常州': [119.4543,31.5582],
			'广州': [113.5107,23.2196],
			'廊坊': [116.521,39.0509],
			'延安': [109.1052,36.4252],
			'张家口': [115.1477,40.8527],
			'徐州': [117.5208,34.3268],
			'德州': [116.6858,37.2107],
			'惠州': [114.6204,23.1647],
			'成都': [103.9526,30.7617],
			'扬州': [119.4653,32.8162],
			'承德': [117.5757,41.4075],
			'拉萨': [91.1865,30.1465],
			'无锡': [120.3442,31.5527],
			'日照': [119.2786,35.5023],
			'昆明': [102.9199,25.4663],
			'杭州': [119.5313,29.8773],
			'枣庄': [117.323,34.8926],
			'柳州': [109.3799,24.9774],
			'株洲': [113.5327,27.0319],
			'武汉': [114.3896,30.6628],
			'汕头': [117.1692,23.3405],
			'江门': [112.6318,22.1484],
			'沈阳': [123.1238,42.1216],
			'沧州': [116.8286,38.2104],
			'河源': [114.917,23.9722],
			'泉州': [118.3228,25.1147],
			'泰安': [117.0264,36.0516],
			'泰州': [120.0586,32.5525],
			'济南': [117.1582,36.8701],
			'济宁': [116.8286,35.3375],
			'海口': [110.3893,19.8516],
			'淄博': [118.0371,36.6064],
			'淮安': [118.927,33.4039],
			'深圳': [114.5435,22.5439],
			'清远': [112.9175,24.3292],
			'温州': [120.498,27.8119],
			'渭南': [109.7864,35.0299],
			'湖州': [119.8608,30.7782],
			'湘潭': [112.5439,27.7075],
			'滨州': [117.8174,37.4963],
			'潍坊': [119.0918,36.524],
			'烟台': [120.7397,37.5128],
			'玉溪': [101.9312,23.8898],
			'珠海': [113.7305,22.1155],
			'盐城': [120.2234,33.5577],
			'盘锦': [121.9482,41.0449],
			'石家庄': [114.4995,38.1006],
			'福州': [119.4543,25.9222],
			'秦皇岛': [119.2126,40.0232],
			'绍兴': [120.564,29.7565],
			'聊城': [115.9167,36.4032],
			'肇庆': [112.1265,23.5822],
			'舟山': [122.2559,30.2234],
			'苏州': [120.6519,31.3989],
			'莱芜': [117.6526,36.2714],
			'菏泽': [115.6201,35.2057],
			'营口': [122.4316,40.4297],
			'葫芦岛': [120.1575,40.578],
			'衡水': [115.8838,37.7161],
			'衢州': [118.6853,28.8666],
			'西宁': [101.4038,36.8207],
			'西安': [109.1162,34.2004],
			'贵阳': [106.6992,26.7682],
			'连云港': [119.1248,34.552],
			'邢台': [114.8071,37.2821],
			'邯郸': [114.4775,36.535],
			'郑州': [113.4668,34.6234],
			'鄂尔多斯': [108.9734,39.2487],
			'重庆': [107.7539,30.1904],
			'金华': [120.0037,29.1028],
			'铜川': [109.0393,35.1947],
			'银川': [106.3586,38.1775],
			'镇江': [119.4763,31.9702],
			'长春': [125.8154,44.2584],
			'长沙': [113.0823,28.2568],
			'长治': [112.8625,36.4746],
			'阳泉': [113.4778,38.0951],
			'青岛': [120.4651,36.3373],
			'韶关': [113.7964,24.7028]
		};

		var BJData = [
			[{name:'北京'}, {name:'上海',value:95}],
			[{name:'北京'}, {name:'广州',value:90}],
			[{name:'北京'}, {name:'大连',value:80}],
			[{name:'北京'}, {name:'南宁',value:70}],
			[{name:'北京'}, {name:'南昌',value:60}],
			[{name:'北京'}, {name:'拉萨',value:50}],
			[{name:'北京'}, {name:'长春',value:40}],
			[{name:'北京'}, {name:'包头',value:30}],
			[{name:'北京'}, {name:'重庆',value:20}],
			[{name:'北京'}, {name:'常州',value:10}],
			[{name:'北京'}, {name:'武汉',value:75}],
			[{name:'北京'}, {name:'乌鲁木齐',value:90}],
			[{name:'北京'}, {name:'呼和浩特',value:80}],
			[{name:'北京'}, {name:'烟台',value:70}],
			[{name:'北京'}, {name:'福州',value:60}],
			[{name:'北京'}, {name:'哈尔滨',value:50}],
			[{name:'北京'}, {name:'郑州',value:40}],
			[{name:'北京'}, {name:'西安',value:30}],
			[{name:'北京'}, {name:'昆明',value:20}],
			[{name:'北京'}, {name:'成都',value:10}]
		];


		var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

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
		[['北京', BJData]].forEach(function (item, i) {
			series.push({
				name: item[0] + ' No.1',
				type: 'lines',
				zlevel: 1,
				effect: {
					show: true,
					period: 6,
					trailLength: 0.7,
					color: '#fff',
					symbolSize: 3
				},
				lineStyle: {
					normal: {
						color: color[i],
						width: 0,
						curveness: 0.2
					}
				},
				data: convertData(item[1])
			},
			{
				name: item[0] + ' No.1',
				type: 'lines',
				zlevel: 2,
				symbol: ['none', 'arrow'],
				symbolSize: 10,
				effect: {
					show: true,
					period: 6,
					trailLength: 0,
					symbol: planePath,
					symbolSize: 15
				},
				lineStyle: {
					normal: {
						color: color[i],
						width: 1,
						opacity: 0.6,
						curveness: 0.2
					}
				},
				data: convertData(item[1])
			},
			{
				name: item[0] + ' No.1',
				type: 'effectScatter',
				coordinateSystem: 'geo',
				zlevel: 2,
				rippleEffect: {
					brushType: 'stroke'
				},
				label: {
					normal: {
						show: true,
						position: 'right',
						formatter: '{b}  '
					}
				},
				symbolSize: function (val) {
					return val[2] / 8;
				},
				itemStyle: {
					normal: {
						color: color[i]
					}
				},
				data: 
				item[1].map(function (dataItem) {
					return {
						name: dataItem[1].name + ' ' + dataItem[1].value,
						value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
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
				data:['北京 No.1'],
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
				left:220,
				zoom: 1.2,
				roam: true,
				itemStyle: {
					normal: {
						areaColor: '#323c48',
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
	ajaxGetData('get_cloud_desktop_online','MAINDISK');
}

function cloudDiskDisplay(){
	CloudDisk1.dispatchAction({
		type: 'downplay',
		seriesIndex: 0
	});
	CloudDisk1.dispatchAction({
		type: 'highlight',
		seriesIndex: 0,
		dataIndex: count % 4
	});
	CloudDisk1.dispatchAction({
		type: 'showTip',
		seriesIndex: 0,
		dataIndex: count % 4
	});
	count++;
	// console.log((new Date()).getSeconds());
}

function cloudDiskOnlineUserUpdate(){
	ajaxGetData('get_cloud_desktop_online', 'MAINONLINEUSERS');
}

function MainDataUpdate(){
	ajaxGetData('get_accesses', 'MAINACCESSES');
	ajaxGetData('get_visits', 'MAINVISIT');
}


function displayNum(num, obj, digit, isUnit){
	num = parseInt(num).toString();
	num_test = num.split('');
	var j = num_test.length, decimal = 0, unit_eve = 1;
	if (isUnit) {
		if (j<=4){
			unit_eve = 1;
			decimal = 0;
		}else if(j>4 && j < 9) {
			$(obj).find('.unit').text('万').addClass('show');
			if (j == 8) {
				decimal = 1;
			}else{
				decimal = 2;
			};
			unit_eve = 10000;
		}else if(j>=9 && j<13){
			$(obj).find('.unit').text('亿').addClass('show');
			if (j == 12) {
				decimal = 1;
			}else{
				decimal = 2;
			};
			unit_eve = 100000000;
		}else{
			$(obj).find('.unit').text('万亿').addClass('show');
			decimal = 1;
			unit_eve = 1000000000000;
		};
	};
	num = (parseInt(num)/unit_eve).toFixed(decimal);
	num = num.split('');
	j = num.length;

	for (var i = digit; i > 0; i--) {
		if (j > 0) {
			$($(obj).find('.num-item').get(i - 1)).text(num[j - 1]);
			j--;
		}else{
			$($(obj).find('.num-item').get(i - 1)).text(0);
		};
		
	};
}

function cloudDiskOnlineUser(dataArray){
	var data = [];
	for (var i = 0; i < dataArray.length; i++) {
		data.push(dataArray[i].value);
	};
	var  img_length = 228;
	var max_data = Math.max.apply(null, data);
	var user_str = '';
	for (var i = 0; i < data.length; i++) {
		var percent = 0;
		if (max_data != 0) {
			if (max_data != data[i]) {
				percent = parseInt((data[i] / max_data)*100);
			}else{
				percent = 100;
			};
		};
		
		user_str += '<div class="user-item">'+
				'<div class="user-img user-img'+(i+1)+' Left" style="width:'+percent+'%;"></div>'+
				'<span class="user-data Right">'+data[i]+'人</span>'+
			'</div>';
	};
	$('#cloudDisk .online-users .user-list').html(user_str);
}

function RateDatas(){

	PressOption = {
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
						color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
						width: 2
					}
				},
				axisLabel: {            // 坐标轴小标记
					textStyle: {       // 属性lineStyle控制线条样式
						fontWeight: 'normal',
						color: '#fff'
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
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder',
						fontSize: 12,
						fontStyle: 'italic',
						color: '#fff'
					}
				},
				detail : {
					backgroundColor: 'transparent',
					offsetCenter: [0, '65%'],       // x, y，单位px
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder',
						color: '#fff',
						fontSize: 18
					},
					formatter:'{value}%'
				},
				data:[{value: 0, name: ''}]
			}
		]
	};

	RateOption = {
		backgroundColor: 'transparent',
		title: {
			text: '访问频率',
			show:false,
			textStyle: {
				fontWeight: 'normal',
				fontSize: 16,
				color: '#F1F1F3'
			},
			left: '6%'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: '#57617B'
				}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			splitNumber:5,
			axisTick: {
				show: false
			},
			axisLine: {
				// show:false,
				onZero:false,
				lineStyle: {
					color: '#8A86A7'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 12,
					color:'#FFFFFF'
				}
			} ,
			data: dataTimes[0]
		}],
		yAxis: [{
			type: 'value',
			name: '次',
			splitNumber: 3,
			axisTick: {
				show: false
			},
			axisLine: {
				show:true,
				lineStyle: {
					color: '#8A86A7'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 14,
					color:'#FFFFFF'
				}
			},
			splitLine: {
				show:false,
				lineStyle: {
					color: '#57617B'
				}
			}
		}],
		series: [{
			name: '',
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 5,
			showAllSymbol:true,
			showSymbol: true,
			lineStyle: {
				normal: {
					width: 1
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(137, 189, 27, 0.8)'
					}, {
						offset: 1,
						color: 'rgba(137, 189, 27, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: '#FFF600'
				}
			},
			data: dataVslues[0]
		}]
	};

	//model 1
	PressEC1 = echarts.init(document.getElementById('DataPress'));
	
	// PressOption.series[0].data[0].value = (Math.random()*100).toFixed(1) - 0;
	PressEC1.setOption(PressOption);
	RateEC1 = echarts.init(document.getElementById('DataRate'));
	RateEC1.setOption(RateOption);

	//model 2
	PressEC2 = echarts.init(document.getElementById('ProductPress'));
	PressEC2.setOption(PressOption);
	RateEC2 = echarts.init(document.getElementById('ProductRate'));
	RateEC2.setOption(RateOption);

	//model 3
	PressEC3 = echarts.init(document.getElementById('AppPress'));
	PressEC3.setOption(PressOption);
	RateEC3 = echarts.init(document.getElementById('AppRate'));
	RateEC3.setOption(RateOption);
	ajaxGetData('get_main_bottom', 'MAINRATE');
}

function pressDataDeal(echart, value){
	PressOption.series[0].data[0].value = value;
	echart.setOption(PressOption);
}

function RateDataDeal(echart, dataArray, dataType, value){
	dataArray.push(value);
	dataArray.splice(0,1);
	if (dataType == 'time') {
		for (var i = 0; i < dataArray.length; i++) {
			RateOption.xAxis[0].data[i] = dataArray[i];
		};
	}else {
		for (var i = 0; i < dataArray.length; i++) {
			RateOption.series[0].data[i] = dataArray[i];
		};
	};
	
}

function RateDataShow(data){
	var date = new Date();
	var timeCurr = date.Format('hh:mm');

	pressDataDeal(PressEC1, data.data_p);
	RateDataDeal(RateEC1, dataVslues[0], 'nums', data.data_f);
	RateDataDeal(RateEC1, dataTimes[0], 'time', timeCurr);
	RateEC1.setOption(RateOption);

	pressDataDeal(PressEC2, data.prod_p);
	RateDataDeal(RateEC2, dataVslues[1], 'nums', data.prod_f);
	RateDataDeal(RateEC2, dataTimes[1], 'time', timeCurr);
	RateEC2.setOption(RateOption);

	pressDataDeal(PressEC3, data.app_p);
	RateDataDeal(RateEC3, dataVslues[2], 'nums', data.app_f);
	RateDataDeal(RateEC3, dataTimes[2], 'time', timeCurr);
	RateEC3.setOption(RateOption);
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

function ajaxGetData(act, type){
	$.ajax({
		url: dataUrl+act,
		cache:false,
		success:function(data){
			data = JSON.parse(data);
			switch(type){
				case 'MAINRATE':
					RateDataShow(data);
					break;
				case 'MAINACCESSES':
					displayNum(data.accesses, $('#SysIn'), 5, false);
					break
				case 'MAINVISIT':
					displayNum(data.total, $('#Visit'), 7, true);
					$('#otherData .business span').text(data.user1);
					$('#otherData .internet span').text(data.user2);
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