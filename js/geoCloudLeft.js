var productMapEC, productMapOption;
var productUpdateCount = 0;
var l_1_option1,l_1_option2,l_1_option3;
var l_1_myoption1,l_1_myoption2,l_1_myoption3;
var l_1_count1=0;
var l_1_count2=0;
var l_1_count3=0;
$(function(){
	ajaxGetDataLeft('get_geo_info_prod', 'GEOINFOPROD');
	// ajaxGetDataLeft('get_prod_update', 'PRODUCTUPDATE');
	// ajaxGetDataLeft('get_prod_service_visit', 'PRODUCTSERVER');
	setInterval(function(){
		// ajaxGetDataLeft('get_prod_update', 'PRODUCTUPDATE');
		// ajaxGetDataLeft('get_prod_service_visit', 'PRODUCTSERVER');
		ajaxGetDataLeft('get_geo_info_prod', 'GEOINFOPROD');
	},1000*60*60*24);

	/***funnel***/
	addCanvasFunnel();
	setInterval(function(){
		addCanvasFunnel();
	},1000*10);
	// leftPart2();

})

function leftPart2(data){
	// 产品服务量数据
	var q_l_2_1 = 'o-l-1-1';
	var t_l_1_option1;
	var t_l_1_myoption1;
	var data_max_array = new Array();
	var data_all_l1 = new Array();
	var t_l_1_count1 = 1;
	var data_goods_all = [
		['数据','出版物','软件','地学科普','地质园','技术方法与标准','仪器设备','仪器设备'],
		[['基础地质','能源','矿产','地质环境','水资源地质水','物/化/遥','地质环境','水资源','物/化/遥','地质环境','水资源','物/化/遥'],['基础地质','能源','矿产','地质环境','水资源','物/化/遥'],['能源','矿产','地质环境','水资源','物/化/遥'],['能源','矿产','地质环境','水资源','物/化/遥'],['能源'],['能源','地质环境','水资源','物/化/遥'],['能源','矿产'],['能源','矿产','资料']],
		[2345,4321929,234,332,322,678,899,765],
		[[2341,23,3411,5656,2131,1231,3231,3411,5656,4213,4123,4323],[234,2321,34,5656,213,123],[2321,34,5656,223,123],[2321,34,5656,223,123],[2321],[2321,34,5656,213],[2321,34],[221,34,445]
		]
	];

	max_x = 878;// 978-150
	max_y = 220;// 320-150
	max_r = 100;// 150
	min_r = 60;// 75
	data_max_array = getMaxBydata(data_goods_all[3]);
	
	var r_array = getR(data_goods_all[3],data_max_array)
	getDataAll();
	startLeft1(0);
	startBra();
	creatDiv();
	// 定时
	setInterval(function(){
		var i = t_l_1_count1%data_goods_all[3].length;
		startLeft1(i);
		startBra();
		// 呼吸效果
		setTimeout(function(){
			dataHighlightTl();
			setTimeout(function(){
				dataDownplayTl();
			},100);
		},200);
		// 底部样式
		$('.o-l-1-bottom').removeClass('active');
		$('.o-bottom').find('.o-l-1-bottom').eq(i).addClass('active');
		t_l_1_count1++;
	},5000);
	// 生成div
	function creatDiv(){
		var bottom_div = '';
		for(var i=0;i<data_goods_all[0].length;i++){
			if(i == 0){
				bottom_div += '<div class="o-l-1-bottom active">';
			}else{
				bottom_div += '<div class="o-l-1-bottom">';
			}
			if(data_goods_all[0][i].length>4){
				bottom_div += '<div class="bottom_small">'+data_goods_all[0][i]+'</div>';
			}else{
				bottom_div += '<div>'+data_goods_all[0][i]+'</div>';
			}
			if(data_goods_all[2][i]>9999999){
				bottom_div += '<div style="font-size:18px;">'+data_goods_all[2][i]+'</div>';
			}else{
				bottom_div += '<div>'+data_goods_all[2][i]+'</div>';
			}
					
			bottom_div += '</div>';
		}
		var bottom_width = 122 * data_goods_all[0].length + 'px';
		$('.o-bottom').append(bottom_div).css('width',bottom_width);
	}
	// 图形初始化
	function startLeft1(i){
		geologyScatter(data_all_l1[i],q_l_2_1,i);
	}
	// 初始化
	function startBarLeft1(t_l_1_option,t_l_1_myoption){
		t_l_1_myoption.setOption(t_l_1_option);
	}
	// 
	function startBra(){
		startBarLeft1(t_l_1_option1,t_l_1_myoption1);
	}

	// 生成随机位置
	function getPositionCoord(data_all,data_max,r,data_name){
		var data_array = new Array();
		var data_x = '';
		var data_y = '';
		
		for(var i=0;i<data_all.length;i++){
			data_array[i] = new Array();
			if(data_all.length<6){
				data_x = 150+Math.random()*(max_x-300);
			}else{
				data_x = Math.random()*max_x;
			}
			data_y = Math.random()*max_y;
			
			if(i == 0){
				data_array[0][0] = data_x;
				data_array[0][1] = data_y;
				data_array[0][2] = data_all[i];
				data_array[0][3] = data_name[i];
			}else{
				var n = 0;
				while(!checkPosition(data_array,r,data_x,data_y,i)){
					if(data_all.length<6){
						data_x = 150+Math.random()*(max_x-300);
					}else{
						data_x = Math.random()*max_x;
					}
					data_y = Math.random()*max_y;
					// 防止死循环
					if(n>100000){
						break;
					}
					n++;
				}
				data_array[i][0] = data_x;
				data_array[i][1] = data_y;
				data_array[i][2] = data_all[i];
				data_array[i][3] = data_name[i];
			}	
		}
		return data_array;
	}
	// 计算半径
	function getR(data_all,data_max){
		var r_array = new Array();
		for(var i=0;i<data_all.length;i++){
			r_array[i] = new Array();
			for(var j=0;j<data_all[i].length;j++){
				r_array[i][j] = ((max_r-min_r)*data_all[i][j]/data_max[i]+min_r)/2;
			}
		}
		return r_array;
	}
	function checkPosition(data_array,r,data_x,data_y,i){
		for(var j=0;j<data_array.length;j++){

			if((data_x-data_array[j][0])*(data_x-data_array[j][0])+(data_y-data_array[j][1])*(data_y-data_array[j][1])-(r[i]+r[j])*(r[i]+r[j])<4000){
			return false;
			}
		}
		return true;
	}
	// 获取最大数据
	function getMaxBydata (data_array) {
	    var arr = JSON.stringify(data_array);
		var data = $.parseJSON(arr);
		var max_data = new Array();
		for(var m=0;m<data.length;m++){
			if(data[m].length>0){
				for(var n=0;n<data[m].length-1;n++){
					if(data[m][n]>data[m][n+1]){
						data[m][n+1] = data[m][n];
					}
				}
				max_data[m] = data[m][data[m].length-1];
			}else{
				max_data[m] = 0;
			}
		}
		return max_data;
	}
	function getDataAll(){
		for(var i=0;i<data_goods_all[3].length;i++){
			data_all_l1[i] = getPositionCoord(data_goods_all[3][i],data_max_array[i],r_array[i],data_goods_all[1][i]);
		}
	}
	// 高亮显示
	function dataHighlightTl(){
	    t_l_1_myoption1.dispatchAction({
	        type: 'highlight',
	    });
	}
	// 取消高亮显示
	function dataDownplayTl(){
	    t_l_1_myoption1.dispatchAction({
	        type: 'downplay',
	    });
	}
	// 气泡图
	// position_num:位置和数据，byid:元素对象,num:第几个，class_name:类名称,size_array:最大值，
	function geologyScatter(position_num,byid,num){
		var series = [];
		series.push({
            name: data_goods_all[1][num],
            type: 'scatter',
            itemStyle: {
                normal: {
                	color: '#2a6ae2',
                    opacity: 1,
                }
            },
            label: {
                normal: {
                    show: true,
                    fontSize: 24,
                    formatter: function (val) {
	                    return val.data[2] +'\n'+val.data[3];
	                },
                },
            },
            data: position_num
        })
		var option = {
		    grid: {
		        x: max_r/2,
		        x2: max_r/2+15,
		        y: max_r/2,
		        y2: max_r/2
		    },
		    xAxis: {
		        type: 'value',
		        max: max_x,
		        splitLine: {
		            show: false
		        },
		        axisLine: {
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
		        type: 'value',
		        max: max_y,
		        axisLine: {
		            show:false
		        },
		        splitLine: {
		            show: false
		        },
		        axisTick:{
		            show:false
		        },
		        axisLabel:{
		            show:false
		        }
		    },
		    visualMap: {
		        show:false,
		        dimension: 2,
		        min: 0,
		        max: data_max_array[num],
		        inRange: {
		            symbolSize: [min_r, max_r]
		        },
		   	},
		    series: series,
		};
			t_l_1_option1 = option;
			t_l_1_myoption1 = echarts.init(document.getElementById(byid));
	}
}

function productUpdateMap(BJData){

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
	series.push(
		{
			zlevel: 1,
			name: '中国',
			type: 'map',
			mapType: 'china',
			selectedMode : 'single',
			top: 65,
			left: 40,
			zoom: 1.2,
			roam: false,
			label: {
				normal: {
					show: false,
					color: '#FFFFFF'
				},
				emphasis: {
					show: false,
					color: '#FFFFFF'
				}
			},
			lineStyle: {
				normal: {
					color: '#4893FF',
					width: 0,
					curveness: 0.2
				}
			},
			itemStyle:{
				normal: {
					borderColor: '#3660E1'
				}
			},
			data:[
				{name: '北京',value: randomData() },
				{name: '天津',value: randomData() },
				{name: '上海',value: randomData() },
				{name: '重庆',value: randomData() },
				{name: '河北',value: randomData() },
				{name: '河南',value: randomData() },
				{name: '云南',value: randomData() },
				{name: '辽宁',value: randomData() },
				{name: '黑龙江',value: randomData() },
				{name: '湖南',value: randomData() },
				{name: '安徽',value: randomData() },
				{name: '山东',value: randomData() },
				{name: '新疆',value: randomData() },
				{name: '江苏',value: randomData() },
				{name: '浙江',value: randomData() },
				{name: '江西',value: randomData() },
				{name: '湖北',value: randomData() },
				{name: '广西',value: randomData() },
				{name: '甘肃',value: randomData() },
				{name: '山西',value: randomData() },
				{name: '内蒙古',value: randomData() },
				{name: '陕西',value: randomData() },
				{name: '吉林',value: randomData() },
				{name: '福建',value: randomData() },
				{name: '贵州',value: randomData() },
				{name: '广东',value: randomData() },
				{name: '青海',value: randomData() },
				{name: '西藏',value: randomData() },
				{name: '四川',value: randomData() },
				{name: '宁夏',value: randomData() },
				{name: '海南',value: randomData() },
				{name: '台湾',value: randomData() },
				{name: '香港',value: randomData() },
				{name: '澳门',value: randomData() }
			]
		}
	);
	[['北京', BJData]].forEach(function (item, i) {
		series.push(
		{
			backgroundColor:'transparent',
			name: item[0] + ' No.1',
			type: 'effectScatter',
			coordinateSystem: 'geo',
			zlevel: 2,
			rippleEffect: {
				brushType: 'stroke'
			},
			label: {
				normal: {
					show: false,
					position: 'right',
					formatter: function(params){
						var name = params.name[0];
						return name;
					}
				},
				emphasis: {
					color: color[i],
					show: true
				}
			},
			symbol: 'circle',
			symbolSize: 3,
			hoverAnimation: true,
			itemStyle: {
				normal: {
					color: '#D5D2FF'
				},
				emphasis: {
					color: '#FFFFFF'
				}
			},
			data: 
			item[1].map(function (dataItem) {
				var names = [];
				names.push(dataItem[1].name);
				names.push(dataItem[1].children);
				return {
					name: names,
					value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
				};
			})
		});
	});


	function randomData() {
		return Math.round(Math.random()*2500);
	}

	productMapOption = {
		tooltip: {
			trigger: 'item',
			formatter: function(params){
				if (params.seriesIndex == 0) {
					return;
				};
				var name = params.name[0];
				var children = params.name[1];
				var showId = Math.ceil(Math.random()*(children.length - 1));
				return children[showId].type+"<br/>"+name+'<br/>'+children[showId].value+'个';
			},
			borderColor: '#FFFFFF',
			borderWidth: 1,
			backgroundColor: 'rgba(0,0,0,0.8)',
			textStyle: {
				fontSize: 16,
				fontWeight: 'normal'
			}
		},
		visualMap: {
			seriesIndex: 0,
			min: 0,
			max: 2500,
			left: 'left',
			top: 'bottom',
			text: ['高','低'],           // 文本，默认为数值文本
			calculable: true,
			show: false,
			color:['#1F1E60','#18144A']
		},
		geo: {
			map: 'china',
			label: {
				emphasis: {
					show: false
				}
			},
			top:65,
			left:40,
			zoom: 1.2,
			roam: false,
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
	productMapEC = echarts.init(document.getElementById('productMap'));
	productMapEC.setOption(productMapOption);

	function productUpdateDisplay(){
		var totalDataLength = productMapOption.series[1].data.length;
		productMapEC.dispatchAction({
			type: 'downplay',
			seriesIndex: 1
		});
		productMapEC.dispatchAction({
			type: 'highlight',
			seriesIndex: 1,
			dataIndex: productUpdateCount % totalDataLength
		});
		productMapEC.dispatchAction({
			type: 'showTip',
			seriesIndex: 1,
			dataIndex: productUpdateCount % totalDataLength
		});
		productUpdateCount++;
	}
	productUpdateDisplay();
	setInterval(function(){
		productUpdateDisplay();
	},5000);
}

/****funnel canvas*****/
function addCanvasFunnel(){
	var series = [],delays = [],FunnelECharts;
	var lineColors = ['#FB0203', '#FF6D00', '#FFD302','#FFD302', '#E3FF00', '#E3FF00','#E3FF00','#E3FF00'];
	var timerStart = 0, funnelTimer;
	var serverData = [
		{value: '1,060,920', name: '地质空间数据'},
		{value: '1,060,100', name: '地质图件'},
		{value: '1,050,700', name: '地学科普'},
		{value: '1,040,120', name: '地质资料库'},
		{value: '106,012', name: '出版物'},
		{value: '105,010', name: '技术方法与标准'},
		{value: '1,050', name: '软件'},
		{value: '150', name: '仪器设备'}
	]
	var data = [
		{value: 160, name: '地质空间数据'},
		{value: 140, name: '地质图件'},
		{value: 120, name: '地学科普'},
		{value: 100, name: '地质资料库'},
		{value: 80, name: '出版物'},
		{value: 60, name: '技术方法与标准'},
		{value: 40, name: '软件'},
		{value: 20, name: '仪器设备'}
	];
	function canvasFunnel(data){
		getSeriesData(data);
		funnelOption = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c}%"
			},
			calculable: true,
			series: series
		};
		FunnelECharts = echarts.init($('#FunnelCanvas').get(0));
		// markLineAnimate();
		FunnelECharts.setOption(funnelOption);

		funnelTimer = setInterval(function(){
		 	markLineAnimate();
		 },500);
	}

	function markLineAnimate(){
		for (var i = 0; i < delays.length; i++) {
	 		if (delays[i] == timerStart) {
	 			funnelOption.series[i].markLine.label.normal.show = true;
	 			funnelOption.series[i].markLine.data[0][1].x = (50+i*2)+'%';
	 			funnelOption.series[i].data[0].value = data[i].value;
	 			funnelOption.series[i].markLine.lineStyle.normal.color = lineColors[i];
	 			FunnelECharts.setOption(funnelOption);
	 		};
	 	};
	 	if (delays[delays.length-1] == timerStart) {
	 		clearInterval(funnelTimer);
	 	};
	 	timerStart+=500;
	}
	
	function getSeriesData(data){
		var top = [40, 85, 130,175, 220, 265,310, 355];
		var color = [	'rgba(4, 46, 75, 0.5)',
				'rgba(10, 59, 89, 0.5)',
				'rgba(15, 83, 111, 0.5)',
				'rgba(10, 119, 160, 0.5)',
				'rgba(8, 149, 196, 0.5)',
				'rgba(1, 190, 252, 0.5)',
				'rgba(0, 247, 253, 0.5)',
				'rgba(0, 251, 173, 1)'
			];
		data.forEach(function(item,i){
			var itemName = serverData[i].name + ' ('+serverData[i].value + ')';
			item.name = itemName;
			var newItem = {
				name: itemName,
				value: item.value
			}
			// if (i>0) {
				newItem.value = 0;
			// };
			var durationTime = (i+1)*500;
			delays.push(durationTime);
			series.push({
				name:'地质产品服务',
				type:'funnel',
				left: '18%',
				top: top[i],
				bottom: 2,
				width: '40%',
				min: 0,
				max: data[0].value,
				minSize: '0%',
				maxSize: '100%',
				sort: 'ascending',
				silent: 'true',
				funnelAlign: 'center',
				gap: 1,
				label: {
					normal: {
						show: false,
						position: 'right',
						color: 'white',
						fontSize: 24,
						padding: 5
					},
					emphasis: {
						textStyle: {
							fontSize: 24
						}
					}
				},
				labelLine: {
					normal: {
						length: 200,
						lineStyle: {
							width: 1,
							type: 'solid',
							color: lineColors[i]
						}
					}
				},
				itemStyle: {
					normal: {
						borderColor: '#fff',
						borderWidth: 0,
						color: color[i]
					}
				},
				animation: 'true',
				animationDuration: 1000,
				animationDelay: durationTime,
				animationEasting: 'cubicInOut',
				markLine: {
					silent: true,
					symbol:'circle',
					symbolSize: 5,
					animationDuration:1500,
					animationDelay: durationTime,
					animationEasting: 'cubicInOut',
					label:{
						normal:{
							show: false,
							fontSize: 24,
							color:'white'
						}
					},
					lineStyle:{
						normal:{
							color: 'transparent',
							type: 'solid'
						}
					},
					data: [
						[
							{
								name: item.name,
								x: '38%',
								y: top[i]
							},
							{
								x: '38%',
								y: top[i],
								symbol:'arrow'
							},
						]
					]
				},
				data: [newItem]
			})
		})
	}
	canvasFunnel(data);
}

function ajaxGetDataLeft(act, type){
	$.ajax({
		url: dataUrl+act,
		cache:false,
		success:function(data){
			data = JSON.parse(data);
			switch(type){
				case 'PRODUCTUPDATE':
					productUpdateMap(data);
					break;
				case 'PRODUCTSERVER':
					leftPart3(data);
					break;
				case 'GEOINFOPROD':
					leftPart2(data);
					break;
				default:
					break;
			}

		}
	})
}
