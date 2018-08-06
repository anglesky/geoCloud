var pictorialBarSeries = [], xAxisDatas = [];
var pictorialBarOption, pictorialBarEcharts;
$(function(){
	// ajaxGetDataRight('get_node_relationship', 'NODERELATIONSHIP');
	ajaxGetDataRight('get_data_visit_monitor', 'DATASHARE');
	// ajaxGetDataRight('get_geo_dbs', 'GEOLOGYDATA');
	setInterval(function(){
		// ajaxGetDataRight('get_node_relationship', 'NODERELATIONSHIP');
		ajaxGetDataRight('get_data_visit_monitor', 'DATASHARE');
		// ajaxGetDataRight('get_geo_dbs', 'GEOLOGYDATA');
	},1000*60*60*24);
	pictorialBarPart();
})
function rightPart2(data){
	var data_array_x = new Array();
	var data_array_y = new Array();
	var data_x_1 = new Array();
	var data_x_2 = new Array();
	var data_y_11 = new Array();
	var data_y_12 = new Array();
	var data_y_21 = new Array();
	var data_y_22 = new Array();
	$.each(data, function (index, obj) {
        $.each(obj, function (i, j) {
    		data_array_x[index] = i;
    		data_array_y[index] = j;
        });
    });
   
    for(var array_num=0;array_num<data_array_x.length;array_num++){
    	if(array_num<5){
    		data_x_1[array_num] = data_array_x[array_num];
    		data_y_11[array_num] = data_array_y[array_num]['visit'];
    		data_y_21[array_num] = data_array_y[array_num]['data'];
    	}else if(array_num<10){
    		data_x_2[array_num-5] = data_array_x[array_num];
    		data_y_12[array_num-5] = data_array_y[array_num]['visit'];
    		data_y_22[array_num-5] = data_array_y[array_num]['data'];
    	}
    }
	// 轮播参数
	var index = 2;
	var picNum = 2;
	var indexNum = 0;
	// 产品服务量数据
	var q_r_2_1 = 'r-2-1';
	var q_r_2_2 = 'r-2-2';
	// 下载量
	$('.secondTitle.downloadNum').text('666');
	dataAndAccess(q_r_2_1,data_x_1,data_y_11,data_y_21);
	dataAndAccess(q_r_2_2,data_x_2,data_y_12,data_y_22);
	// 定时刷新
	setInterval(function(){
		nextBannerRight(index);
	},5000);
	// 刷新
	function nextBannerRight(tarIndex){
		// index = tarIndex + 1;
		// if (index > picNum) {
		// 	index = 1;
		// }
		// var _target = $('.right-2-bar .fw'+tarIndex);
		// // $('.right-2-bar .fw').removeClass('active');
		// // $('.right-2-bar .fw').css('opacity',0);
		// _target.css('opacity',1);
		// _target.addClass('active');
		// $('.right-2-bar .banner').css('right','-988px');
		// $('.right-2-bar .banner').animate({'left':-988},800,'swing');
		// $('.right-2-bar .banner').animate({'right':40},800,'swing');
		// $('.right-2-bar .banner').animate({'right':0},100,'swing');
		$('.right-2-bar .banner').animate({'left':-1030},800,'swing');
		$('.right-2-bar .banner').animate({'left':-988},100,'swing');
		setTimeout(function(){
			if(indexNum%2){
				$('.right-2-bar .banner .fw').css('float','right');
			}else{
				$('.right-2-bar .banner .fw').css('float','left');
			}
			
			$('.right-2-bar .banner').css('left','0px');
		},1000);
		indexNum++;
		
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

function ajaxGetDataRight(act, type){
	// $.ajax({
	// 	url: dataUrl+act,
	// 	cache:false,
	// 	success:function(data){
	// 		data = JSON.parse(data);
	        var data = '';
			switch(type){
				case 'DATASHARE':
					rightPart2(DATASHARE);
					break;
				// case 'GEOLOGYDATA':
				// 	rightPart3(data);
				// 	break;
				case 'NODERELATIONSHIP':
					rightPart1(data);
					break;
				default:
					break;
			}

	// 	}
	// })
}

/****2017.10.25 add new*****/
function pictorialBarPart(){
	var totalPage = 2, currPage = 1;
	var paperDataURI = './images/bar1.png';
	var randomDatas = [
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20,
		parseInt(Math.random()*1000)+20
	];
	function sortNumber(a,b)
	{
		return a - b
	}
	randomDatas = randomDatas.sort(sortNumber);
	var pictorialBarDatas = {
		1: [
			{value: randomDatas[9], name: '区域地质与基础地质'},
			{value: randomDatas[8], name: '物化遥'},
			{value: randomDatas[7], name: '地质文献与资料'},
			{value: randomDatas[6], name: '能源矿产'},
			{value: randomDatas[5], name: '管理支撑'}
		],
		2: [
			{value: randomDatas[4], name: '综合成果'},
			{value: randomDatas[3], name: '矿产'},
			{value: randomDatas[2], name: '水工环地质'},
			{value: randomDatas[1], name: '海洋地质'},
			{value: randomDatas[0], name: '钻孔'}
		]
	} ;
	totalPage = Object.keys(pictorialBarDatas).length;
	function pictorialBar(){

		pictorialBarSeries = [], xAxisDatas = [];
		for (var i = 0; i < pictorialBarDatas[currPage].length; i++) {
			pictorialBarSeries.push({
				value: pictorialBarDatas[currPage][i].value,
				symbol: 'image://' + paperDataURI,
				symbolRepeat: true,
				symbolSize: ['80%', '20%'],
				symbolMargin: '0%',
				animationDuration: 2000,
				animationDelay: function (dataIndex, params) {
					return params.index * 30;
				}
			});
			xAxisDatas.push(pictorialBarDatas[currPage][i].name);
		};
		currPage+=1;
		if (currPage > totalPage) {
			currPage = 1;
		};

		
		pictorialBarOption = {
			backgroundColor: 'transparent',
			tooltip: {},
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
		pictorialBarEcharts = echarts.init($('#GeoSurveyData').get(0));
		pictorialBarEcharts.setOption(pictorialBarOption);
	}
	pictorialBar();
	setInterval(function(){
		echarts.dispose(pictorialBarEcharts);
		pictorialBar();
	},1000*20);
}

var DATASHARE = [{"国土资源部":{"visit":1195,"data":"100"}},{"中国地质调查局":{"visit":942,"data":"90"}},{"地科院":{"visit":1182,"data":"90"}},{"发展研究中心":{"visit":612,"data":"90"}},{"天津地调中心":{"visit":1027,"data":"90"}},{"沈阳地调中心":{"visit":623,"data":"90"}},{"南京地调中心":{"visit":892,"data":"90"}},{"武汉地调中心":{"visit":801,"data":"90"}},{"成都地调中心":{"visit":1046,"data":"90"}},{"西安地调中心":{"visit":754,"data":"90"}},{"广州海洋局":{"visit":944,"data":"80"}},{"青岛海洋所":{"visit":774,"data":"80"}},{"航空物探遥感中心":{"visit":712,"data":"80"}},{"物化探所":{"visit":925,"data":"70"}},{"油气调查中心":{"visit":437,"data":"70"}},{"地质所":{"visit":906,"data":"70"}},{"资源所":{"visit":750,"data":"70"}},{"地质力学所":{"visit":333,"data":"60"}},{"环境监测院":{"visit":829,"data":"60"}},{"水环中心":{"visit":822,"data":"60"}},{"岩溶所":{"visit":614,"data":"60"}},{"实物资料中心":{"visit":709,"data":"90"}},{"地质图书馆":{"visit":1114,"data":"90"}},{"矿业报社":{"visit":779,"data":"50"}},{"实验测试中心":{"visit":623,"data":"50"}},{"勘探技术所":{"visit":361,"data":"50"}},{"探矿工程所":{"visit":612,"data":"50"}},{"探矿工艺所":{"visit":694,"data":"50"}},{"郑州综合利用所":{"visit":658,"data":"40"}},{"成都综合利用所":{"visit":178,"data":"40"}}];

