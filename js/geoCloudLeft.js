$(function(){
	leftPart3();
})
function leftPart3(){
	$('.l-3-title-text').css('margin-right',-(20+$('.l-3-title-num').width()+$('.l-3-title-text').width())/2);
	// 轮播参数
	var index = 2;
	var picNum = 3;
	// 产品服务量数据
	var q_l_3_1 = 'l-3-1';
	var q_l_3_2 = 'l-3-2';
	var q_l_3_3 = 'l-3-3';
	var data_x_1 = ['国土资源部','中国地址调查局','国土资源部','地科院','发展研究中心','天津地调中心','沈阳地调中心','南京地调中心','武汉地调中心','成都地调中心'];
	var data_x_2 = ['国土资源部','中国地址调查局','国土资源部','地科院','发展研究中心','天津地调中心','沈阳地调中心','南京地调中心','武汉地调中心','上海地调中心'];
	var data_x_3 = ['中国地址调查局','国土资源部','地科院','发展研究中心','天津地调中心','沈阳地调中心','南京地调中心','武汉地调中心','新疆地调中心'];
	var data_y_1 = [10, 232, 256, 767, 1356, 162, 3213, 200, 64, 33];
	var data_y_2 = [20, 232, 256, 767, 1356, 1622, 326, 200, 64, 33];
	var data_y_3 = [20, 49, 70, 232, 1356, 1622, 326, 20000000, 64];
	goods_service_num(q_l_3_1,data_x_1,data_y_1);
	goods_service_num(q_l_3_2,data_x_2,data_y_2);
	goods_service_num(q_l_3_3,data_x_3,data_y_3);
	// 定时刷新
	setInterval(function(){
		$('.l-3-title .l-3-title-num').text(numAddComma(Math.ceil(Math.random()*1234560).toString()));
		nextBanner(index);
	},100000);
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
	// 数字没３个增加逗号
	function numAddComma(str){
		return str.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
	}
	// 产品服务量柱状图
	function goods_service_num(q,data_x,data_y){
		var myChart = echarts.init(document.getElementById(q)); 
		var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    calculable : true,
			    grid: {
			        borderWidth: 0,
			    },
			    xAxis : [
			        {
			            type : 'category',
			          	show: true,
			          	splitLine: {
			            	show:false
			            },
			          	axisLine: {
			              show: false,
			            },
			            axisTick: {
			          		lineStyle: {
			          			color: '#1e1753',
			          		}	
			          	},
			           	axisLabel: {
			           		textStyle: {
			                	color: '#fff'
			                },
			             	interval: 0,
			             	rotate: -30
			          	},
			            data : data_x
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value', 
			          	show: false
			        }
			    ],
			    series : [
			        {
			            name:'产品服务量',
			            type:'bar',
			            itemStyle : { 
			              normal: {
			                label : {
			                	show: true, 
			                	position: 'top',
			                	textStyle: {
		                             color: '#fff'
		                        }
		                    },
			              
			                color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#12aeff'},
		                            {offset: 0.5, color: '#12aeff'},
		                            {offset: 1, color: '#0252ff'}
		                        ]
		                    )
			              }
			            },
			            data:data_y,
			            markPoint : {
			               tooltip: {
			                    trigger: 'item',
			               },
			                data : [ ]
			            },
			            barWidth : 24,
			            barMinHeight:1,
			        },   
			    ]
			};               
		myChart.setOption(option);
	}
}
