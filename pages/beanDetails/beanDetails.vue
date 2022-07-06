<template>
	<view class="main">
		<view class="bean">鲜豆&emsp;<span style="color: red; font-weight: bold;">1040</span></view>
		<view class="msg">其中鲜豆，将于过期，请尽快使用</view>
		<view class="showOption">
			<view class="showing">全部</view>
			<view class="option">已获取</view>
			<view class="option">已消耗</view>
		</view>
		<view class="itemContainer">
			<view class="item">
				<view class="volunteer">
					<view class="volunteerTime">共青团志愿活动</view>
					<view class="beanChange">鲜豆+8</view>
				</view>
				<view class="changeTime">2022-03-21 16:17:18</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.main{
		height: 100vh;
		padding: 5vw;
		background-color: rgb(245,245,245);
	}
	
	.item{
		height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
		
	.msg{
		margin: 2vh 0vw;
		font-size: 10px;
		color: rgb(152,152,152);
	}
	
	.showOption{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.option{
		width: 14vw;
		height: 4vh;
		color: rgb(152,152,152);
		background-color: white;
		font-size: 10px;
		text-align: center;
		line-height: 4vh;
		border-radius: 10%;
	}
	
	.showing{
		width: 14vw;
		height: 4vh;
		color: red;
		background-color: white;
		font-size: 10px;
		text-align: center;
		line-height: 4vh;
		border-radius: 10%;
	}
	
	.item{
		margin-top: 3vh;
		height: 7vh;
		padding: 3vw;
		background-color: white;
		border-radius: 5%;
	}
	
	.volunteer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.volunteerTime{
		font-size: 14px;
		font-weight: bold;
	}
	
	.beanChange{
		color: red;
		font-size: 15px;
		font-weight: bold;
	}
	
	.changeTime{
		color: rgb(152,152,152);
		font-size: 13px;
	}
</style>