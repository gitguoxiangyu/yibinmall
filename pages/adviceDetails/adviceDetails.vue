<template>
	<view class="main">
		<form @submit="adviceSubmit">
			<view class="type">
				<view class="typeName">投诉类型</view>
				<view class="typeOptions">
					<!-- @change="optionChange" -->
					<picker  :value="index" :range="adviceType" name="adviceType">
						<view class="listItem">{{adviceType[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="content">
					<view class="contentHead">投诉详情</view>
					<view class="uni-textarea">
						<textarea placeholder-style="color:#999999" placeholder="请输入详细描述,不超过50字" maxlength="50" name="advice"/>
					</view>
					<button form-type="submit" class="submit" >提交</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				adviceType:["商品问题","优惠券问题","商城体验不佳","其他"],
				index:0,
			}
		},
		methods:{
			adviceSubmit(data){
				console.log(data)
			}
		}
	}
</script>

<style lang="scss">
	.main{
		height: 100vh;
		background-color: #f5f5f5;
	}
	.type{
		display: flex;
		background-color: white;
		height: 6vh;
		line-height: 6vh;
		padding: 0 5vw;
		.typeName{
			font-size: 14px;
			color: #2a2a2a;
			font-weight: 400;
		}
		.typeOptions{
			font-size: 14px;
			margin: 0 8vw;
			// width: ;
			flex-grow: 4;
		}
	}
	.content{
		height: 40vh;
		background-color: white;
		padding: 0 5vw;
		margin: 3vh 0;
		.contentHead{
			font-size: 14px;
			height: 6vh;
			line-height: 6vh;
			font-weight: 400;
			color: #2a2a2a;
		}
		.submit{
			width: 18vw;
			height: 5vh;
			line-height: 5vh;
			font-size: 15px;
			float: right;
			margin-top: 3vh;
			border: 1px #999999 solid;
			// position: relative;
			// bottom: 2vh;
			// right: 10vw;
		}
	}
</style>

<!-- {
						name:"商品损坏",
						typeNum:"1",
					},
					{
						name:"优惠券问题",
						typeNum:"2",
					},
					{
						name:"商城功能",
						typeNum:"3",
					},
					{
						name:"用户体验",
						typeNum:"4",
					},
					{
						name:"其他",
						typeNum:"5",
					}, -->