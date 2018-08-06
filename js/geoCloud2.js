var mapOption, M1;
var dataUrl = 'get_data.php?act=';
var geoCoordMap = null;
var monthServiceOption, monthServiceECharts, numRun;
$(function(){

	ajaxGetData('get_map','MAPDATA', false);
	ajaxGetData('get_map','MAINMAPINFO', true);
	ajaxGetData('get_main_map_info','MAINMAPINFO', true);
	
	monthServiceStatus('', '');
	numRun = $("#pSNum").numberAnimate({num:'0', speed:2000, symbol:","});
	ajaxGetData('get_visits', 'MAINVISIT', true);
	setIntervalAllData(5000);

	setTagCloud('tagCloud1', 'a');
	setTagCloud('tagCloud2', 'a');
	// calculateScale();
	// $(window).resize(function(){
	// 	calculateScale();
	// })
	getPointServer();
	getPointNumber()
	// MainPartMap()
})

function setIntervalAllData(millisec){
	setInterval(function(){
		ajaxGetData('get_visits', 'MAINVISIT', true);
	}, millisec);
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
			series.push(
			{
				name: ' Sky',
				type: 'heatmap',
				coordinateSystem: 'geo',
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
				data:['国土资源部 No.1'],
				textStyle: {
					color: '#fff'
				},
				selectedMode: 'single'
			},
			visualMap: {
				min: 0,
				max: 100,
				splitNumber: 5,
				inRange: {
					color: ['#FBF9FA','#FFFF42','#FFE400'].reverse()
				},
				textStyle: {
					color: '#fff'
				}
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

function monthServiceStatus(xValues, yValues){
	monthServiceOption = {
		backgroundColor: 'transparent',
		title: {
			text: '月度服务状态',
			show:false,
			textStyle: {
				fontWeight: 'normal',
				fontSize: '1rem',
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
			right: '3%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			name: '月',
			type: 'category',
			boundaryGap: true,
			splitNumber: 5,
			axisTick: {
				show: false
			},
			axisLine: {
				// show:false,
				onZero:false,
				lineStyle: {
					color: '#FFFFFF'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 24,
					color:'#FFFFFF'
				}
			} ,
			data: ['2016.10', '2016.11', '2016.12', '2017.01', '2017.02', '2017.03', '2017.04', '2017.05', '2017.06', '2017.07', '2017.08', '2017.09']
		}],
		yAxis: [{
			type: 'value',
			name: '次',
			splitNumber: 3,
			axisTick: {
				show: false
			},
			axisLine: {
				show:false,
				lineStyle: {
					color: '#FFFFFF'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 24,
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
			// smoothMonotone: 'x',
			animate: false,
			// sampling: 'average',
			label: {
				normal: {
					show:false
				}
			},
			lineStyle: {
				normal: {
					width: 2,
					color: '#20B1BE'
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(32, 177, 190, 0.8)'
					}, {
						offset: 1,
						color: 'rgba(32, 177, 190, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: '#20B1BE'
				}
			},
			data: [25, 60, 45, 15, 30, 51, 20, 64,  85, 47,  63,  75]
		}]
	};
	monthServiceECharts = echarts.init(document.getElementById('monthServiceStatus'));
	monthServiceECharts.setOption(monthServiceOption);
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
				case 'MAINACCESSES':
					displayNum(data.accesses, $('#SysIn'), 5, false);
					break
				case 'MAINVISIT':
					numRun.resetData(data.total);
					break;
				case 'MAINONLINEUSERS':
					cloudDiskOnlineUser(data);
					break;
				default:
					break;
			}

		}
	})
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

function getPointServer(){
	// 轮播参数
	var index = 2;
	var picNum = 2;
	// 最大x
	var max_x_num = 0;
	// 产品服务量数据
	var q_r_1_1 = 't-r-1-1';
	var q_r_1_2 = 't-r-1-2';
	var q_r_1_3 = 't-r-1-3';
	var q_r_1_4 = 't-r-1-4';
	var t_r_1_option1,t_r_1_option2,t_r_1_option3,t_r_1_option4;
	var t_r_1_myoption1,t_r_1_myoption2,t_r_1_myoption3,t_r_1_myoption4;
	var data_y_1 = ['国土资源部','中国地质调查局','地科院','发展研究中心','天津地调中心','沈阳地调中心','南京地调中心','武汉地调中心'];
	var data_y_2 = ['成都地调中心','西安地调中心','广州海洋局','青岛海洋所','航空物探遥感中心','物化探所','油气调查中心','地质所'];
	var data_y_3 = ['资源所','地质力学所','环境监测院','水环中心','岩溶所','实物资料中心','地质图书馆','矿业报社'];
	var data_y_4 = ['实验测试中心','勘探技术所','探矿工程所','探矿工艺所','郑州综合利用所'];
	var data_x_1 = [232, 256, 767, 1356, 162, 200, 64, 33];
	var data_x_2 = [20, 232, 256, 767, 1356, 1622, 326, 33];
	var data_x_3 = [20, 49, 70, 232, 1356, 1622, 326, 64];
	var data_x_4 = [10, 232, 256, 767, 1356];

	// 获取最大值
	max_x_num = Math.max(Math.max.apply(null, data_x_1),Math.max.apply(null, data_x_2),Math.max.apply(null, data_x_3),Math.max.apply(null, data_x_4));

	startRight1();
	startBra('14%',16);
	// 定时刷新
	setInterval(function(){
		
		nextBannerRight1(index);
		startBra('32%',0);
		setTimeout(function(){
			startBra('3%',20);
			setTimeout(function(){
				startBra('14%',16);
			},200);

		},500);

	},5000);
	// 刷新
	function nextBannerRight1(tarIndex){
		index = tarIndex + 1;
		if (index > picNum) {
			index = 1;
		}
		var _target = $('.t-right-1-bar .tfw'+tarIndex);
		$('.t-right-1-bar .tfw').removeClass('active');
		$('.t-right-1-bar .tfw').css('opacity',0);
		_target.css('opacity',1);
		_target.addClass('active');
		$('.t-right-1-bar .banner').css('right','-1200px');
		$('.t-right-1-bar .banner').animate({'right':0},600,'swing');
	};
	// 图形初始化
	function startRight1(){
		goods_service_num(q_r_1_1,data_y_1,data_x_1,1);
		goods_service_num(q_r_1_2,data_y_2,data_x_2,2);
		goods_service_num(q_r_1_3,data_y_3,data_x_3,3);
		goods_service_num(q_r_1_4,data_y_4,data_x_4,4);
	}
	// 初始化
	function startBarRight1(t_r_1_option,t_r_1_myoption,a,b){
		if(a){
			t_r_1_option.grid.top= a;
		}
		if(b){
			t_r_1_option.series[0].barCategoryGap = b;
		}
		t_r_1_myoption.setOption(t_r_1_option);
	}
	// 
	function startBra(a,b){
		startBarRight1(t_r_1_option1,t_r_1_myoption1,a,b);
		startBarRight1(t_r_1_option2,t_r_1_myoption2,a,b);
		startBarRight1(t_r_1_option3,t_r_1_myoption3,a,b);
		startBarRight1(t_r_1_option4,t_r_1_myoption4,a,b);
	}
	// 节点柱状图
	function goods_service_num(q,data_y,data_x,pos){
		var bottom_num = (8 - data_x.length) * 10 + '%';
		var myChart = echarts.init(document.getElementById(q)); 
		var labelOption = {
			    normal: {
			        show: true,
			        position: [250,0],
			        color: '#fff',
			        fontSize: 24,
			        fontStyle: 'normal',
			        fontFamily: 'Arial',
			        fontWeight: 'bold',
			        textBorderColor: 'auto',
			      
			    }
			};
		var option = {
			    tooltip: {
			    	show:false,
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    grid: {
			        left: '40%',
			        right: '22%',
			        top: '14%',
			        bottom: bottom_num,
			        containLabel: false
			    },
			    xAxis: {
			        type: 'value',
			        max:max_x_num,
			        splitLine: {
			        	show:false
			        },
			        axisLine:{
			            show:false
			        },
			        axisTick:{
			            show:false
			        },
			        axisLabel:{
			            show:false
			        }
			    },
			    yAxis: {
			        type: 'category',
			        data: data_y,
			        axisLabel:{
			            inside:false,
			            color:'#fff',
			            fontSize:24,
			            margin: 24,
			            interval:0,
			        },
			        axisTick:{
			            show:false
			        },
			        axisLine:{
			            show:false
			        },  
			    },
			    series: [
			        {
			            name: '节点服务',
			            type: 'bar',
			            barCategoryGap:32,
			            barWidth: 24,
			            data: data_x,
			            label: labelOption,
			            itemStyle : { 
							normal: {
								color: new echarts.graphic.LinearGradient(
								    0, 0, 1, 0,
								    [
								        {offset: 0, color: '#0299B0'},
								        {offset: 1, color: '#00F8FF'}
								    ]
								)
							}
						}
			        }
			    ]
			};
		switch(pos){
			case 1:
				t_r_1_option1 = option;
				t_r_1_myoption1 = echarts.init(document.getElementById(q));
			break;
			case 2:
				t_r_1_option2 = option;
				t_r_1_myoption2 = echarts.init(document.getElementById(q));
			break;
			case 3:
				t_r_1_option3 = option;
				t_r_1_myoption3 = echarts.init(document.getElementById(q));
			break;
			case 4:
				t_r_1_option4 = option;
				t_r_1_myoption4 = echarts.init(document.getElementById(q));
			break;
			default :
				t_r_1_option1 = option;
				t_r_1_myoption1 = echarts.init(document.getElementById(q));
			break;
		}
			
	}   
}
// 节点数量
function getPointNumber(){
	// 轮播参数
	var index = 2;
	var picNum = 2;
	// 最大x
	var max_x_num = 0;
	// 节点数量数据
	var q_l_1_1 = 't-l-1-1';
	var q_l_1_2 = 't-l-1-2';
	var q_l_1_3 = 't-l-1-3';
	var q_l_1_4 = 't-l-1-4';
	var t_l_1_option1,t_l_1_option2,t_l_1_option3,t_l_1_option4;
	var t_l_1_myoption1,t_l_1_myoption2,t_l_1_myoption3,t_l_1_myoption4;
	var data_y_1 = ['国土资源部','中国地质调查局','地科院','发展研究中心','天津地调中心','沈阳地调中心','南京地调中心','武汉地调中心'];
	var data_y_2 = ['成都地调中心','西安地调中心','广州海洋局','青岛海洋所','航空物探遥感中心','物化探所','油气调查中心','地质所'];
	var data_y_3 = ['资源所','地质力学所','环境监测院','水环中心','岩溶所','实物资料中心','地质图书馆','矿业报社'];
	var data_y_4 = ['实验测试中心','勘探技术所','探矿工程所','探矿工艺所','郑州综合利用所'];
	var data_x_1 = [232, 256, 767, 1356, 112, 1200, 164, 313];
	var data_x_2 = [201, 2322, 2516, 7671, 1356, 1221, 326, 133];
	var data_x_3 = [201, 492, 7711, 2321, 1356, 1221, 326, 164];
	var data_x_4 = [101, 2322, 7711, 2561, 1356];

	// 获取最大值
	max_x_num = Math.max(Math.max.apply(null, data_x_1),Math.max.apply(null, data_x_2),Math.max.apply(null, data_x_3),Math.max.apply(null, data_x_4));
	
	startLeft1();
	startBra('14%',16);
	// 定时刷新
	setInterval(function(){
		
		nextBannerLeft1(index);
		startBra('32%',0);
		setTimeout(function(){
			startBra('3%',20);
			setTimeout(function(){
				startBra('14%',16);
			},200);

		},500);

	},5000);
	// 刷新
	function nextBannerLeft1(tarIndex){
		index = tarIndex + 1;
		if (index > picNum) {
			index = 1;
		}
		var _target = $('.t-left-1-bar .tfw'+tarIndex);
		$('.t-left-1-bar .tfw').removeClass('active');
		$('.t-left-1-bar .tfw').css('opacity',0);
		_target.css('opacity',1);
		_target.addClass('active');
		$('.t-left-1-bar .banner').css('left','-1200px');
		$('.t-left-1-bar .banner').animate({'left':0},600,'swing');
	};
	// 图形初始化
	function startLeft1(){
		goods_service_num(q_l_1_1,data_y_1,data_x_1,1);
		goods_service_num(q_l_1_2,data_y_2,data_x_2,2);
		goods_service_num(q_l_1_3,data_y_3,data_x_3,3);
		goods_service_num(q_l_1_4,data_y_4,data_x_4,4);
	}
	// 初始化
	function startBarLeft1(t_l_1_option,t_l_1_myoption,a,b){
		if(a){
			t_l_1_option.grid.top= a;
		}
		if(b){
			t_l_1_option.series[0].barCategoryGap = b;
		}
		t_l_1_myoption.setOption(t_l_1_option);
	}
	// 
	function startBra(a,b){
		startBarLeft1(t_l_1_option1,t_l_1_myoption1,a,b);
		startBarLeft1(t_l_1_option2,t_l_1_myoption2,a,b);
		startBarLeft1(t_l_1_option3,t_l_1_myoption3,a,b);
		startBarLeft1(t_l_1_option4,t_l_1_myoption4,a,b);
	}
	// 节点柱状图
	function goods_service_num(q,data_y,data_x,pos){
		var bottom_num = (8 - data_x.length) * 10 + '%';
		var myChart = echarts.init(document.getElementById(q)); 
		var labelOption = {
			    normal: {
			        show: true,
			        position: [250,0],
			        color: '#fff',
			        fontSize: 24,
			        fontStyle: 'normal',
			        fontFamily: 'Arial',
			        fontWeight: 'bold',
			        textBorderColor: 'auto',
			      
			    }
			};
		var option = {
			    tooltip: {
			    	show:false,
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    grid: {
			        left: '40%',
			        right: '22%',
			        top: '14%',
			        bottom: bottom_num,
			        containLabel: false
			    },
			    xAxis: {
			        type: 'value',
			        // boundaryGap: ['10%', '10%'],
			        max:max_x_num,
			        splitLine: {
			        	show:false
			        },
			        axisLine:{
			            show:false
			        },
			        axisTick:{
			            show:false
			        },
			        axisLabel:{
			            show:false
			        }
			    },
			    yAxis: {
			        type: 'category',
			        data: data_y,
			        axisLabel:{
			            inside:false,
			            color:'#fff',
			            fontSize:24,
			            margin: 24,
			            interval:0,
			        },
			        axisTick:{
			            show:false
			        },
			        axisLine:{
			            show:false
			        },  
			    },
			    series: [
			        {
			            name: '节点数量',
			            type: 'bar',
			            barCategoryGap:32,
			            barWidth: 24,
			            data: data_x,
			            label: labelOption,
			            itemStyle : { 
							normal: {
								color: new echarts.graphic.LinearGradient(
								    0, 0, 1, 0,
								    [
								        {offset: 0, color: '#0299B0'},
								        {offset: 1, color: '#00F8FF'}
								    ]
								)
							}
						}
			        }
			    ]
			};
		switch(pos){
			case 1:
				t_l_1_option1 = option;
				t_l_1_myoption1 = echarts.init(document.getElementById(q));
			break;
			case 2:
				t_l_1_option2 = option;
				t_l_1_myoption2 = echarts.init(document.getElementById(q));
			break;
			case 3:
				t_l_1_option3 = option;
				t_l_1_myoption3 = echarts.init(document.getElementById(q));
			break;
			case 4:
				t_l_1_option4 = option;
				t_l_1_myoption4 = echarts.init(document.getElementById(q));
			break;
			default :
				t_l_1_option1 = option;
				t_l_1_myoption1 = echarts.init(document.getElementById(q));
			break;
		}	
	}
}
