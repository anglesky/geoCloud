$(function(){
	rightPart3();
})
function rightPart3(){
	// 轮播参数
	var index = 2;
	var picNum = 3;
	// 产品服务量数据
	var q_r_3_1 = 'r-3-1';
	var q_r_3_2 = 'r-3-2';
	var q_r_3_3 = 'r-3-3';
	var data_x_1 = ['国土资源部','中国地址调查局','国土资源部','地科院','发展研究中心','天津地调中心','沈阳地调中心','南京地调中心','武汉地调中心','成都地调中心'];
	var data_x_2 = ['国土资源部','中国地址调查局','国土资源部','地科院','发展研究中心','天津地调中心','沈阳地调中心','南京地调中心','武汉地调中心','上海地调中心'];
	var data_x_3 = ['中国地址调查局','国土资源部','地科院','发展研究中心','天津地调中心','沈阳地调中心','南京地调中心','武汉地调中心','新疆地调中心'];
	var data_y_11 = [10, 232, 256, 767, 13561, 162, 3213, 200, 64, 33];
	var data_y_12 = [20, 232, 256, 767, 11356, 1622, 326, 200, 64, 33];
	var data_y_13 = [20, 49, 70, 232, 1356, 1622, 326, 2000000000, 64];
	var data_y_21 = [107, 2732, 2756, 7767, 73561, 1672, 32713, 2070, 674, 373];
	var data_y_22 = [20, 8232, 8256, 7678, 13568, 16228, 3268, 2008, 684, 383];
	var data_y_23 = [220, 249, 270, 2232, 21356, 16222, 3226, 200000, 642];
	dataAndAccess(q_r_3_1,data_x_1,data_y_11,data_y_21);
	dataAndAccess(q_r_3_2,data_x_2,data_y_12,data_y_22);
	dataAndAccess(q_r_3_3,data_x_3,data_y_13,data_y_23);
	// 定时刷新
	setInterval(function(){
		nextBanner(index);
	},1000);
	// 刷新
	function nextBanner(tarIndex){
		index = tarIndex + 1;
		if (index > picNum) {
			index = 1;
		}
		var _target = $('.fw'+tarIndex);
		_target.animate({opacity:'1'},800,'swing',function(){
			_target.addClass('active').siblings('.fw').removeClass('active');
		})
		.siblings('.fw').animate({opacity:'0'},800,'swing')
	};
	// 求最大值
	function getMaxNum(data){
		var data_max = 0
		for(var i=0;i<data.length-1;i++){
			if(data[i]>data[i+1] && data[i]>data_max){
				data_max = data[i];
			}else if(data[i+1]>data_max){
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
			    grid: {
			    	left: '15%',
			    	right: '15%',
			    	bottom: '23%',
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
			                	color: '#fff'
			                },
			             	interval: 0,
			             	rotate: -30
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
			                	color: '#fff'
			                }
			          	},
			          	nameTextStyle: {
			          		color: '#fff'
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
			            interval: Math.ceil(data_y_1_max/50)*10,
			        },
			        {
			            type: 'value',
			            name: '数据个数',
			            splitLine: {
			            	lineStyle: {
			            		color: '#333'
			            	}
			            },
			            axisLabel: {
			           		textStyle: {
			                	color: '#f2fa0e'
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
			          		color: '#f2fa0e'
			          	},
			            min: 0,
			            max: Math.ceil(data_y_2_max/10)*10,
			            interval: Math.ceil(data_y_2_max/50)*10,
			        }
			    ],
			    series: [
			        {
			            name:'访问次数',
			            type:'bar',
			            barWidth : 24,
			            barMinHeight:1,
			            itemStyle : { 
				            normal: {
				                color: new echarts.graphic.LinearGradient(
			                        0, 0, 0, 1,
			                        [
			                            {offset: 0, color: '#26aae7'},
			                            {offset: 1, color: '#0756fa'}
			                        ]
			                    )
				            }
			            },
			            data:data_y_1
			        },
			        {
			            name:'数据个数',
			            type:'line',
			            smooth:true,
			            yAxisIndex: 1,
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
										        offset: 0, color: 'rgba(242,250,14,0.8)'
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
