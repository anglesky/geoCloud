var mapOption, M1, pointStatusOption, statusChart;
var dataUrl = 'get_data.php?act=';
var geoCoordMap = null;
var status_num = 0;
var monthServiceOption, monthServiceECharts, numRun;
$(function(){
	// ajaxGetData('get_node_relationship','POINTSERVERLINK', true);
	// ajaxGetData('get_geo_dbs','POINTDATA', true);
	// ajaxGetData('get_data_visit_monitor','DATASERVERVISITMONITOR', true);
	
	// ajaxGetData('','POINTSTATUS', true);
	// calculateScale();
	// $(window).resize(function(){
	// 	calculateScale();
	// })
	getPointServerLinkPart();
	pointDataPart();
	rightPart2();
	pointStatusPart();
	
})


function ajaxGetData(act, type, async){
	$.ajax({
		url: dataUrl+act,
		cache: false,
		async: async,
		success:function(data){
			data = JSON.parse(data);
			switch(type){
				case 'POINTSERVERLINK':
					getPointServerLinkPart(data);
					break;
				case 'POINTDATA':
					pointDataPart(data);
					break;
				case 'DATASERVERVISITMONITOR':
					rightPart2(data);
					break;
				case 'POINTSTATUS':
					pointStatusPart(data);
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
// 节点服务关系图
function getPointServerLinkPart(data){
	var data = {"0":["国土资源部","中国地质调查局","地科院","发展研究中心","天津地调中心","沈阳地调中心","南京地调中心","武汉地调中心","成都地调中心","西安地调中心","广州海洋局","青岛海洋所","航空物探遥感中心","物化探所","油气调查中心","地质所","资源所","地质力学所","环境监测院","水环中心","岩溶所","实物资料中心","地质图书馆","矿业报社","实验测试中心","勘探技术所","探矿工程所","探矿工艺所","郑州综合利用所","成都综合利用所"],"1":["60","70","80","90","50","35","97","12","34","56","78","67","90","98","76","36","85","14","36","48","95","74","43","25","36","27","24","22","11","33"],"2":["1","2","2","2","2","2","2","2","3","3","3","3","3","3","3","3","3","3","3","3","4","4","4","4","4","4","4","4","4","4"],"total":1602};
	var data_r_1 = new Array();
	data_r_1[0] = new Array();
	data_r_1[1] = new Array();
	data_r_1[3] = new Array();
	for(var node_num=0;node_num<data[0].length;node_num++){
		data[2][node_num] --;
	}
	data_r_1[0] = data[0];
	data_r_1[1] = data[2];
	data_r_1[2] = data['total']+'GB';
	data_r_1[3] = data[1];
	// 统计
	pointServer(getDataL1(data_r_1),getLinkL1(data_r_1));
	function getDataL1(data){
		var arr = new Array();
		for(var i=0;i<data[0].length;i++){
			arr[i] =  new Object();
			arr[i]['name'] = data[0][i];
			arr[i]['category'] = data[1][i];
			arr[i]['value'] = data[3][i];
			if(data[1][i] === 0){
				arr[i]['symbolSize'] = 90;
			}else if(data[1][i] === 1){
				arr[i]['symbolSize'] = 55;
			}else{
				arr[i]['symbolSize'] = 35;
			}
		}
		return arr;
	}
	function getLinkL1(data){
		var arr = new Array();
		var num = 1;
		for(var i=0;i<data[0].length;i++){
			arr[i] =  new Object();
			arr[i]['source'] = 0;
			arr[i]['target'] = num;
			num ++;
		}
		return arr;
	}
	
	// 节点服务关系图
	function pointServer(data_r_1,link_r_1){
		var myChart = echarts.init(document.getElementById('r-1-1'));
		var option = {
		    title: {
		        text: ''
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'right',
		        y: 'bottom',
		        textStyle:{
		        	color:'#fff',
		        	fontSize: 24,
		        },
		        align: 'left',
		        itemWidth: 24,
		        itemHeight: 24,
		        data: ['中心节点','区节点','节点', '尚未接入节点'],
		     
		    },
		    tooltip: {
				trigger: 'item',
				formatter: function(params){
					var name = params.data['name'];
					var value = params.data['value'];
					return name+'<br/>'+value+'GB';
				},
				position: 'right',
				borderColor: '#FFFFFF',
				borderWidth: 1,
				backgroundColor: 'rgba(0,0,0,0.8)',
				textStyle: {
					fontSize: 18,
					fontWeight: 'normal'
				}
		    },
		    animationDurationUpdate: 1500,
		    animationDelayUpdate:1500,
		    animationEasing:'quinticInOut',
		    series: [
		        {
		            type: 'graph',
		            layout: 'force',
		            symbolSize: 45,
		            focusNodeAdjacency: true,
		            roam: true,
		            
		            categories: [{
		                name: '中心节点',
		                itemStyle: {
		                    normal: {
		                        color: "#1279e9",
		                    },
		                },
		                label: {
					        emphasis:{
			                    fontSize: 18
			                },
					    },
		            },{
		                name: '区节点',
		                itemStyle: {
		                    normal: {
		                        color: "#04cfed",
		                    }
		                },
		                label: {
					        emphasis:{
			                   	show: false,
			                   	fontSize: 18
			                },
					    },
		            },{
		                name: '节点',
		                itemStyle: {
		                    normal: {
		                        color: "#ffd300",
		                    }
		                },
		                label: {
					        emphasis:{
			                   	show: false,
			                    fontSize: 18
			                },
					    },
		            }, {
		                name: '尚未接入节点',
		                itemStyle: {
		                    normal: {
		                        color: "#585986",
		                    }
		                },
		                label: {
					        emphasis:{
			                   	show: false,
			                   	fontSize: 18
			                },
					    },
		            }],
		            
		            force: {
		                repulsion: 340,
		            },
		            data: data_r_1,
		            links: link_r_1,
		            lineStyle: {
		                normal: {
		                    opacity: 1,
		                    width: 1,
		                    curveness: 0
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
		var count = 0;
		var timeTicket = null;
		timeTicket && clearInterval(timeTicket);
		timeTicket = setInterval(function() {
			var data_length = option.series[0].data.length;
		    myChart.dispatchAction({
		    type: 'focusNodeAdjacency',
		    dataIndex: count % (data_length-1)+1,
		    });
		    myChart.dispatchAction({
			    type: 'showTip',
			    seriesIndex: 0,
			    dataIndex: count % (data_length-1)+1,
			});
		    count++;
		}, 5000);
	}
}
// 节点专业数据
function pointDataPart(data){
	var data = [{"db_name":"区域地质与基础地质数据库","info":"1200"},{"db_name":"矿产地质数据库","info":"1000"},{"db_name":"物化遥数据库","info":"1500"},{"db_name":"水工环地质数据库","info":"900"},{"db_name":"海洋地质数据库","info":"800"},{"db_name":"钻孔数据库","info":"1000"},{"db_name":"地质文献与资料数据库","info":"1000"},{"db_name":"能源矿产数据库","info":"700"},{"db_name":"管理支撑数据库","info":"1400"},{"db_name":"综合成果数据库","info":"2000"}];
	var randomDatas = data.sort(sortNumber);
	var pictorialBarDatas = new Object;
	pictorialBarDatas[1] = randomDatas.slice(0,5);
	pictorialBarDatas[2] = randomDatas.slice(5);

	var totalPage = 2, currPage = 1;
	var paperDataURI = './images/bar1.png';
	// var randomDatas = [
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20,
	// 	parseInt(Math.random()*1000)+20
	// ];
	function sortNumber(a,b)
	{
		return b['info'] - a['info']
	}
	// randomDatas = randomDatas.sort(sortNumber);
	// var pictorialBarDatas = {
	// 	1: [
	// 		{value: randomDatas[9], name: '区域地质与基础地质'},
	// 		{value: randomDatas[8], name: '物化遥'},
	// 		{value: randomDatas[7], name: '地质文献与资料'},
	// 		{value: randomDatas[6], name: '能源矿产'},
	// 		{value: randomDatas[5], name: '管理支撑'}
	// 	],
	// 	2: [
	// 		{value: randomDatas[4], name: '综合成果'},
	// 		{value: randomDatas[3], name: '矿产'},
	// 		{value: randomDatas[2], name: '水工环地质'},
	// 		{value: randomDatas[1], name: '海洋地质'},
	// 		{value: randomDatas[0], name: '钻孔'}
	// 	]
	// } ;
	totalPage = Object.keys(pictorialBarDatas).length;
	function pictorialBar(){

		pictorialBarSeries = [], xAxisDatas = [];
		for (var i = 0; i < pictorialBarDatas[currPage].length; i++) {
			pictorialBarSeries.push({
				value: pictorialBarDatas[currPage][i].info,
				symbol: 'image://' + paperDataURI,
				symbolRepeat: true,
				symbolSize: ['80%', '20%'],
				symbolMargin: '0%',
				animationDuration: 2000,
				animationDelay: function (dataIndex, params) {
					return params.index * 30;
				}
			});
			xAxisDatas.push(pictorialBarDatas[currPage][i]['db_name']);
		};
		currPage+=1;
		if (currPage > totalPage) {
			currPage = 1;
		};

		
		pictorialBarOption = {
			backgroundColor: 'transparent',
			tooltip: {},
			grid:{
				left: '1%',
				right: '1%',
			},
			xAxis: [{
				data: xAxisDatas,
				axisTick: {show: false},
				axisLine: {show: false},
				axisLabel: {
					margin: 20,
					interval: 0,
					textStyle: {
						color: '#FFFFFF',
						fontSize: 24
					}
				}
			}],
			yAxis: {
				splitLine: {show: false},
				axisTick: {show: false},
				axisLine: {show: false},
				axisLabel: {show: false}
			},
			markLine: {
				z: -1
			},
			animationEasing: 'elasticOut',
			series: {
				type: 'pictorialBar',
				name: '地质调查数据资源',
				hoverAnimation: true,
				label: {
					normal: {
						show: true,
						position: 'top',
						formatter: '{c} G',
						textStyle: {
							fontSize: 24,
							color: '#1FF4FC'
						}
					}
				},
				data: pictorialBarSeries,
			}
		};
		pictorialBarEcharts = echarts.init($('#point-data').get(0));
		pictorialBarEcharts.setOption(pictorialBarOption);
	}
	pictorialBar();
	setInterval(function(){
		echarts.dispose(pictorialBarEcharts);
		pictorialBar();
	},5000);
}
// 数据服务与访问实时监控
function rightPart2(data){
	var data = [{"资源部":{"visit":780,"data":"100"}},{"中国地调局":{"visit":1176,"data":"90"}},{"地科院":{"visit":702,"data":"75"}},{"发展研究":{"visit":894,"data":"80"}},{"天津地调":{"visit":613,"data":"40"}},{"沈阳地调":{"visit":1097,"data":"30"}},{"南京地调":{"visit":827,"data":"20"}},{"武汉地调":{"visit":1061,"data":"50"}},{"成都地调":{"visit":853,"data":"60"}},{"西安地调":{"visit":908,"data":"90"}},{"广州海洋":{"visit":878,"data":"80"}},{"青岛海洋":{"visit":813,"data":"40"}},{"航空物遥":{"visit":623,"data":"80"}},{"物化探所":{"visit":961,"data":"70"}},{"油气调查":{"visit":434,"data":"10"}},{"地质所":{"visit":971,"data":"70"}},{"资源所":{"visit":564,"data":"70"}},{"地质力学":{"visit":757,"data":"60"}},{"环境监测院":{"visit":357,"data":"20"}},{"水环":{"visit":821,"data":"60"}},{"岩溶所":{"visit":801,"data":"40"}},{"实物资料":{"visit":967,"data":"90"}},{"地质图书馆":{"visit":989,"data":"89"}},{"矿业报社":{"visit":353,"data":"60"}},{"实验测试":{"visit":390,"data":"50"}},{"勘探技术所":{"visit":461,"data":"80"}},{"探矿工程所":{"visit":270,"data":"50"}},{"探矿工艺所":{"visit":556,"data":"61"}},{"郑州利用所":{"visit":648,"data":"40"}},{"成都利用所":{"visit":462,"data":"10"}}];
	var data_array_x = new Array();
	var data_array_y = new Array();
	var data_x_1 = new Array();
	var data_x_2 = new Array();
	var data_x_3 = new Array();
	var data_x_4 = new Array();
	var data_y_11 = new Array();
	var data_y_12 = new Array();
	var data_y_13 = new Array();
	var data_y_14 = new Array();
	var data_y_21 = new Array();
	var data_y_22 = new Array();
	var data_y_23 = new Array();
	var data_y_24 = new Array();
	$.each(data, function (index, obj) {
        $.each(obj, function (i, j) {
    		data_array_x[index] = i;
    		data_array_y[index] = j;
        });
    });
   
    for(var array_num=0;array_num<data_array_x.length;array_num++){
    	if(array_num<8){
    		data_x_1[array_num] = data_array_x[array_num];
    		data_y_11[array_num] = data_array_y[array_num]['visit'];
    		data_y_21[array_num] = data_array_y[array_num]['data'];
    	}else if(array_num<16){
    		data_x_2[array_num-8] = data_array_x[array_num];
    		data_y_12[array_num-8] = data_array_y[array_num]['visit'];
    		data_y_22[array_num-8] = data_array_y[array_num]['data'];
    	}else if(array_num<24){
    		data_x_3[array_num-16] = data_array_x[array_num];
    		data_y_13[array_num-16] = data_array_y[array_num]['visit'];
    		data_y_23[array_num-16] = data_array_y[array_num]['data'];
    	}else if(array_num<32){
    		data_x_4[array_num-24] = data_array_x[array_num];
    		data_y_14[array_num-24] = data_array_y[array_num]['visit'];
    		data_y_24[array_num-24] = data_array_y[array_num]['data'];
    	}
    }
	// 轮播参数
	var index = 2;
	var picNum = 4;
	// 产品服务量数据
	var q_r_2_1 = 'r-2-1';
	var q_r_2_2 = 'r-2-2';
	var q_r_2_3 = 'r-2-3';
	var q_r_2_4 = 'r-2-4';
	
	dataAndAccess(q_r_2_1,data_x_1,data_y_11,data_y_21);
	dataAndAccess(q_r_2_2,data_x_2,data_y_12,data_y_22);
	dataAndAccess(q_r_2_3,data_x_3,data_y_13,data_y_23);
	dataAndAccess(q_r_2_4,data_x_4,data_y_14,data_y_24);
	// 定时刷新
	setInterval(function(){
		nextBannerRight(index);
	},5000);
	// 刷新
	function nextBannerRight(tarIndex){
		index = tarIndex + 1;
		if (index > picNum) {
			index = 1;
		}
		var _target = $('.right-2-bar .fw'+tarIndex);
		$('.right-2-bar .fw').removeClass('active');
		$('.right-2-bar .fw').css('opacity',0);
		_target.css('opacity',1);
		_target.addClass('active');
		$('.right-2-bar .banner').css('right','-1200px');
		$('.right-2-bar .banner').animate({'right':40},800,'swing');
		$('.right-2-bar .banner').animate({'right':0},100,'swing');
	};
	// 求最大值
	function getMaxNum(data){
		var data_max = 0;
		for(var i=0;i<data.length-1;i++){
			if(data[i]-data[i+1]>0 && data[i]-data_max>0){
				data_max = data[i];
			}else if(data[i+1] - data_max>0){
				data_max = data[i+1];
			}
		}
		return data_max;
	}
	// 数据服务与访问实时监控组合图
	function dataAndAccess(q,data_x,data_y_1,data_y_2){
		var data_y_1_max = getMaxNum(data_y_1);
		var data_y_2_max = getMaxNum(data_y_2);
		var myChart = echarts.init(document.getElementById(q)); 
		var option = {
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'cross',
			            crossStyle: {
			                color: '#999'
			            }
			        }
			    },
			    legend: {
			    	show: false,
			        data:['访问次数','服务个数'],
			        top:0,
			        right:40,
			        itemWidth:40,	
			        itemHeight:24,
			        textStyle:{
			        	color: '#fff',
			        	fontFamily:'Microsoft YaHei',
			        	fontSize:24,
			        }
			    },
			    grid: {
			    	left: '12%',
			    	right: '12%',
			    	top: '20%',
			    	bottom: '10%',
			    },
			    xAxis: [
			        {
			            type: 'category',
			            show: true,
			          	splitLine: {
			            	show:false
			            },
			          	axisLine: {
			              lineStyle: {
			          			color: '#777',
			          		}
			            },
			           	axisLabel: {
			           		textStyle: {
			                	color: '#fff',
			                	fontSize:24,
			                },
			             	interval: 0,
			          	},
			            data: data_x
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value',
			            name: '访问次数',
			            splitLine: {
			            	lineStyle: {
			            		color: '#333'
			            	}
			            },
			            axisLabel: {
			           		textStyle: {
			                	color: '#fff',
			                	fontSize:24,
			                }
			          	},
			          	nameTextStyle: {
			          		color: '#fff',
			          		fontSize:24,
			          		padding:[0,0,20,0],
			          	},
			          	axisTick: {
			          		lineStyle: {
			          			color: '#777',
			          		}	
			          	},
			          	axisLine: {
			          		lineStyle: {
			          			color: '#777',
			          		}	
			          	},
			            min: 0,
			            max: Math.ceil(data_y_1_max/10)*10,
			            interval: Math.ceil(data_y_1_max/10)*2,
			        },
			        {
			            type: 'value',
			            name: '服务个数',
			            splitLine: {
			            	lineStyle: {
			            		color: '#333'
			            	}
			            },
			            axisLabel: {
			           		textStyle: {
			                	color: '#f2fa0e',
			                	fontSize:24,
			                }
			          	},
			          	axisTick: {
			          		inside: true,
			          		lineStyle: {
			          			color: '#777',
			          		}	
			          	},
			          	axisLine: {
			          		lineStyle: {
			          			color: '#777',
			          		}	
			          	},
			          	nameTextStyle: {
			          		color: '#f2fa0e',
			          		fontSize:24,
			          		padding:[0,0,20,0],
			          	},
			            min: 0,
			            max: Math.ceil(data_y_2_max/10)*10,
			            interval: Math.ceil(data_y_2_max/10)*2,
			        }
			    ],
			    series: [
			        {
			            name:'访问次数',
			            type:'bar',
			            barWidth : 40,
			            barMinHeight:1,
			            itemStyle : { 
				            normal: {
				                color: new echarts.graphic.LinearGradient(
			                        0, 0, 0, 1,
			                        [
			                            {offset: 0, color: '#0596ea'},
			                            {offset: 1, color: '#2d79c6'}
			                        ]
			                    )
				            }
			            },
			            data:data_y_1
			        },
			        {
			            name:'服务个数',
			            type:'line',
			            smooth:true,
			            yAxisIndex: 1,
			            symbolSize: 10,
			            itemStyle: {
			                normal: {
			                    color: '#f2fa0e',
			                    lineStyle:{  
                                    width:'1'  
                                } 
			                }
			            },
			            areaStyle: {
			                normal: {
			                    color: {
								    type: 'linear',
								    x: 0,
								    y: 0,
								    x2: 0,
								    y2: 1,
								    colorStops: [{
								        offset: 0, color: 'rgba(242,250,14,0.3)'
								    }, {
								        offset: 1, color: 'rgba(242,250,14,0)'
								    }],
								    globalCoord: false
								}
			                }
			            },
			            data:data_y_2
			        }
			    ]
			};               
		myChart.setOption(option); 
	}
}
// 节点状态
function pointStatusPart(){

	dataStatus();
	setInterval(function(){
		for(var i=0;i<3;i++){
			if(i == status_num%3){
				pointStatusOption.series[0].data[i].selected = true;
			}else{
				pointStatusOption.series[0].data[i].selected = false;
			}
			
		}
		statusChart.setOption(pointStatusOption);
		status_num++;
	},5000);
	function dataStatus(){
		var data_status = [];
		var data_point = [];
		var status_color = [];
		var point_color = [];
		var data1 = [
	                {value:335, name:'正常'},
	                {value:679, name:'失败'},
	                {value:1548, name:'警告'}
	            ];
	    var data1_total = data1[0].value+data1[1].value+data1[2].value;   
	    var data2 = [
	                {value:335, name:'成都地调中心', status: '1'},
	                {value:310, name:'天津地调中心', status: '2'},
	                {value:234, name:'南京地调中心',status: '2'},
	                {value:135, name:'发展中心', status: '2'},
	                {value:1048, name:'实物地质资料中心', status: '3'},
	                {value:251, name:'西安地调中心', status: '3'},
	                {value:147, name:'武汉地调中心', status: '3'},
	                {value:102, name:'地学文献中心', status: '3'}
	            ];
	    for(var i=0;i<data1.length;i++){
	    	switch(data1[i].name){
	    		case'正常':
		    		status_color[i] = '#7cae58';
		    		break;
		    	case'失败':
		    		status_color[i] = '#ec1058';
		    		break;
		    	case'警告':
		    		status_color[i] = '#fa6e56';
		    		break;
		    	default:
		    		break;

	    	}
	    	data_status.push(
	    			{
	    			value:data1[i].value,
	    			name:data1[i].name+':'+Math.round(data1[i].value/data1_total*10000)/100.00+"%",
	    			itemStyle:{
	    			 	normal:{
	    			 		color:status_color[i],
	    			 	}
	    			}
	    		}
	    	)
	    }
	    for(var j=0;j<data2.length;j++){
	    	switch(data2[j]['status']){
	    		case'1':
		    		point_color[j] = '#7cae58';
		    		break;
		    	case'2':
		    		point_color[j] = '#ec1058';
		    		break;
		    	case'3':
		    		point_color[j] = '#fa6e56';
		    		break;
		    	default:
		    		break;

	    	}
	    	data_point.push(
	    			{
	    			value:data2[j].value,
	    			name:data2[j].name,
	    			itemStyle:{
	    			 	normal:{
	    			 		color:point_color[j],
	    			 	}
	    			}
	    		}
	    	)
	    }

	    console.log(point_color)


		pointStatusOption = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)",
		    },
		    series: [
		        {
		            name:'节点状态',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '40%'],

		            label: {
		                normal: {
		                    position: 'inner',
		                    color:'#fff',
		                    fontSize:18,
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:data_status
		        },
		        {
		            name:'节点状态',
		            type:'pie',
		            radius: ['60%', '85%'],
		            label: {
		                normal: {
		                    formatter: '{b}',
		                    fontSize:24,
		                }
		            },
		            data:data_point
		        }
		    ]
		};
		statusChart = echarts.init(document.getElementById('point-status'));
		statusChart.setOption(pointStatusOption);
	}
}
