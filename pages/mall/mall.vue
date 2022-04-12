<template>
	<view>
		<view class="headerBac"><image src="../../static/img/headerBac.png"></image></view>
		<view class="usr">
			<view class="headPortait"><image src="../../static/img/headPortrait.png"></image></view>
			<view class="usrInfo">
				<view class="usrInfoHeader">
					<view class="name">吴青年</view>
					<view class="star">
						<image src="../../static/img/star.png"></image>
						<view class="starTxt">3星青年</view>
					</view>
				</view>
				<view class="usrInfoCenter">
					<view class="starRate" :style="{'width' : this.starRate + '%'}"></view>
				</view>
				<view class="usrInfoFooter">青年成长值300,还需要700升级为4星青年</view>
			</view>
		</view>
		<view class="wallet">
			<view class="bean">
				<view class="beanHeader">
					<view class="beanName">鲜豆</view>
					<view class="beanNum">1240</view>
				</view>
				<view class="beanFooter">有240个3.31到期</view>
			</view>
			<view class="ticket">
				<view class="ticketHeader">
					<view class="ticketIcon"></view>
					<view class="ticketName">兑换记录</view>
				</view>
				<view class="ticketFooter">有2张3.31到期</view>
				<uni-icons type="arrowthinup" size="50" color="red"></uni-icons>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				starRate:20
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
		position: relative;
		z-index: -3;
		.headerBac{
			width: 100vw;
			height: 19vh;
			position: absolute;
			top: 0;
			z-index: -2;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.usr{
			width: 100vw;
			height: 9vh;
			display: flex;
			padding-top: 4vh;
			flex-direction: row; 
			align-items: center;
			.headPortait{
				width: 60px;
				height: 60px;
				margin-left: 8.4vw;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.usrInfo{
				width: 60vw;
				margin-left: 4vw;
				.usrInfoHeader{
					width: 50vw;
					height: 4vh;
					display: flex;
					.name{
						width: 15vw;
						line-height: 4vh;
						color: #f53a33;
						font-weight: bold;
						font-size: 18px;
					}
					.star{
						height: 4vh;
						width: 22vw;
						position: relative;
						image{
							height: 100%;
							width: 100%;
							position: absolute;
							z-index: -1;
						}
						.starTxt{
							position: absolute;
							right: 1vw;
							font-size: 14px;
							line-height: 4vh;
							color: #f53a33;
							font-style: italic;
							font-weight: bold;
						}
					}
				}
				.usrInfoCenter{
					margin-top: 1vh;
					margin-bottom: 1vh;
					width: 40vw;
					height: 1vh;
					background-color: rgb(255, 255, 255);
					opacity: 0.502;
					border-radius: 2vw;
					.starRate{
						
						height: 100%;
						background-color: rgb(245, 58, 51);
						opacity: 0.502;
						border-radius: 2vw;
						
					}
				}
				.usrInfoFooter{
					height: 3vh;
					font-size: 8px;
					color: #8e8b85;
				}
			}
		}
		.wallet{
			width: 94vw;
			height: 8vh;
			border-radius: 5vw;
			background-color: rgb(255, 255, 255);
			margin: 2vh 0 0 3vw;
			display: flex; 
			flex-direction: row; 
			align-items: center;
			.bean{
				width: 35vw;
				padding-left: 10vw;
				border-right: #95928c 1px solid;
				.beanHeader{
					width: 35vw;
					height: 3vh;
					line-height: 3vh;
					display: flex;
					justify-content: space-between;
					.beanName{
						font-weight: bold;
					}
					.beanNum{
						padding-right: 10vw;
						font-size: 20px;
						color: #f53a33;
						font-weight: bold;
					}
				}
				.beanFooter{
					width: 35vw;
					height: 3vh;
					left: 3vh;
					font-size: 10px;
					color: #9b9b9b;
				}
			}
			.ticket{
				width: 45vw;
				padding-left: 10vw;
				.ticketHeader{
					width: 45vw;
					height: 3vh;
					line-height: 3vh;
					display: flex;
					.ticketIcon{
						
					}
					.ticketName{
						font-weight: bold;
					}
				}
				.ticketFooter{
					width: 45vw;
					height: 3vh;
					line-height: 3vh;
					font-size: 10px;
					color: #9b9b9b;
				}
			}
		}

	}
</style>
