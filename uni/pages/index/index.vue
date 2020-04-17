<template>
	<view class="container">
	
		<image class="pig" mode="widthFix" src="/static/pig-01.jpg"></image>
		
		<view class="form-container">
			<form @submit="onSubmit">
			                
				<view class="form-group">
					<view class="text">工频空压机台数：</view>
					<view class="input">
						<view class="l">*</view>
						<view class="r">
							<input v-model="form.num1" type="digit" placeholder-class="input-placeholder" placeholder="必填">
						</view>
					</view>
				</view>
				
				<view class="form-group">
					<view class="text">变频空压机台数：</view>
					<view class="input">
						<view class="l">*</view>
						<view class="r">
							<input v-model="form.num2" type="digit" placeholder-class="input-placeholder" placeholder="必填">
						</view>
					</view>
				</view>
				
				<view class="form-group">
					<view class="text">联系号码：</view>
					<view class="input">
						<view class="l">*</view>
						<view class="r">
							<input v-model="form.tel" type="digit" placeholder-class="input-placeholder" placeholder="必填">
						</view>
					</view>
				</view>
				
				<view class="form-btn">
					<button form-type="submit">获取节能测算报告</button>
				</view>
				
			</form>
		</view>
		
		<image class="pig" mode="widthFix" src="/static/pig-02.jpg"></image>
		<image class="pig" mode="widthFix" src="/static/pig-03.jpg"></image>
		<image class="pig" mode="widthFix" src="/static/pig-04.jpg"></image>
		<image class="pig" mode="widthFix" src="/static/pig-05.jpg"></image>
		<image class="pig" mode="widthFix" src="/static/pig-07.jpg"></image>
		
		<view class="swiper-container">
			
			<view class="swiper-title">已<text class="b">服务</text>60+制造行业，累计省电超千万度</view>
			
			<swiper class="swiper" indicator-color="rgba(191,225,254)" indicator-active-color="#148ffa" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
				<swiper-item>
					<image mode="widthFix" class="img" src="/static/1.png"></image>
				</swiper-item>
				<swiper-item>
					<image mode="widthFix" class="img" src="/static/2.png"></image>
				</swiper-item>
				<swiper-item>
					<image mode="widthFix" class="img" src="/static/3.png"></image>
				</swiper-item>
			</swiper>
			
		</view>
		
		<view class="footer-container">
			<image class="pig" mode="center" src="/static/pig-06.jpg"></image>
			<view class="footer-content">
				<view class="btn">
					<button class="l" open-type="getUserInfo" @getuserinfo="getUserInfo">了解更多</button>
					<button class="r" @click="onCallTel">400-086-2020</button>
				</view>
				<!-- <view class="tel" @click="onCallTel">400-086-2020</view> -->
			</view>
			<view class="logo">
				<image class="img" src="/static/logo.png"></image>
			</view>
		</view>
		
		
		
		
		
		<view class="dialog-container" :class="{'on': dialogFlag}">
			
			<view class="dialog-hd" @click="onHideDialog">
				预约成功
				<image class="close" src="/static/close.png"></image>
			</view>
			
			<view class="dialog-bd">
			
				<view class="t">
					<image class="success" mode="widthFix" src="/static/success.png"></image>
				</view>
				<view class="m">我们将在24小时内发送您</view>
				<view class="b">联系我们：400-086-2020</view>
				
			</view>
			
		</view>
		
		<view class="mask-container" v-if="dialogFlag"></view>
		
	
	</view>
</template>

<script>
	import IndexModel from '@/models/index'
	import { checkMobile } from '@/util/utils'
	export default {
		data() {
			return {
				title: 'Hello1',
				list: [],
				form: {
					num1: '',
					num2: '',
					tel: ''
				},
				dialogFlag: false
			}
		},
		onLoad() {
		},
		methods: {
			async onSubmit() {
				
				const duration = 2000
				if (!this.form.num1) {
					uni.showToast({
					    title: '请输入工频空压机台数',
						icon: 'none',
					    duration
					})
					return
				}
				if (!this.form.num2) {
					uni.showToast({
					    title: '请输入变频空压机台数',
						icon: 'none',
					    duration
					})
					return
				}
				if (!checkMobile(this.form.tel)) {
					uni.showToast({
					    title: '请输入正确的手机号',
						icon: 'none',
					    duration
					})
					return
				}
				await IndexModel._submitForm({
					compressorss_number: this.form.num1,
					conversion_number: this.form.num2,
					phone: this.form.tel,
				})
				this.onClearForm()
				this.onShowDialog()
			},
			onClearForm() {
				this.form.num1 = ''
				this.form.num2 = ''
				this.form.tel = ''
			},
			onShowDialog() {
				this.dialogFlag = true
			},
			onHideDialog() {
				this.dialogFlag = false
			},
			async getUserInfo(e) {
				
				// 先走授权
				console.log(e)
				const { errMsg, userInfo } = e.detail
				console.log(userInfo)
				
				// 失败不管他
				if (errMsg != 'getUserInfo:ok') {
					uni.showToast({
					    title: '授权失败',
						icon: 'none',
					    duration: 2000
					})
					return
				}
				
				await IndexModel._submitUserInfo({
					nickname: userInfo.nickName,
					gender: userInfo.gender === 0 ? '未知' : userInfo.gender === 1 ? '男' : '女',
					user_avator: userInfo.avatarUrl,
					country: userInfo.country,
					province: userInfo.province,
					city: userInfo.city
				})
				uni.navigateTo({
				    url: `/pages/webView/webView?src=${encodeURIComponent('https://mp.weixin.qq.com/s/xU8FOaGlF0tqK_b5VGV1iQ')}`
				})
			},
			onCallTel() {
				uni.makePhoneCall({
				    phoneNumber: '400-086-2020' //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss">
	$color-theme: #1490fa;
	page {
		height: 100%;
		background-color: #020c18;
	}
	.container {
		.pig {
			display: block;
			width: 100%;
		}
		.form-container{
			width: 90%;
			margin: 0 auto;
			.form-group{
				.text {
					margin-top: 30rpx;
					color: #fff;
					font-size: 28rpx;
				}
				.input {
					margin-top: 30rpx;
					position: relative;
					display: flex;
					align-items: center;
					padding: 1px;
					background-image: linear-gradient(to right, $color-theme, #03e0fe);
					.l {
						position: relative;
						z-index: 2;
						display: flex;
						align-items: center;
						padding: 10rpx;
						height: 60rpx;
						color: red;
						background-color: #020c18;
					}
					.r {
						position: relative;
						z-index: 2;
						flex: 1;
						background-color: #020c18;
						input {
							display: block;
							padding: 10rpx;
							width: 100%;
							height: 60rpx;
							color: #fff;
						}
						.input-placeholder{
							color: #707070;
						}
					}
				}
			}
			.form-btn {
				margin: 80rpx 0;
				button {
					border-radius: 20px;
					background-color: $color-theme;
					color: #fff;
				}
			}
		}
		.swiper-container{
			position: relative;
			z-index: 9;
			width: 90%;
			margin: -40rpx auto 0 auto;
			background-color: #fff;	
			border-radius: 6px;
			text-align: center;
			.swiper-title {
				padding: 40rpx 0;
				font-size: 32rpx;
				color: $color-theme;
				.b {
					font-weight: bold;
				}
			}
			.swiper {
				padding-bottom: 60rpx;
				height: 500rpx;
				swiper-item {
					display: flex;
					justify-content: center;
					.img {
						display: block;
						width: 558rpx;
						height: 416rpx;
					}
				}
			}
		}
		.footer-container {
			margin-top: -160rpx;
			position: relative;
			.pig {
				height: 600rpx;
			}
			.footer-content{
				position: absolute;
				top: 45%;
				left: 10%;
				width: 80%;
				text-align: center;
				.btn {
					display: flex;
					flex-direction: column;
					button {
						margin-bottom: 30rpx;
						flex: 1;
						display: block;
						width: 100%;
						border-radius: 20px;
						background-color: $color-theme;
						color: #fff;
						font-size: 28rpx;
					}
				}
				.tel {
					font-size: 28rpx;
					color: #fff;
				}
			}
			.logo{
				position: absolute;
				bottom: 40rpx;
				left: 0;
				width: 100%;
				text-align: center;
				.img {
					width: 126rpx;
					height: 40rpx;
				}
			}
		}
	}
	
	.mask-container{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
	}
	
	.dialog-container {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 99;
		width: 80%;
		margin-left: -40%;
		margin-top: -200rpx;
		transition: all .3s;
		transform: translateY(300%);
		.dialog-hd{
			position: relative;
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 6px 6px 0 0;
			background-color: $color-theme;
			color: #fff;
			font-size: 36rpx;
			.close{
				position: absolute;
				right: 16rpx;
				top: 16rpx;
				width: 48rpx;
				height: 48rpx;
			}
		}
		.dialog-bd{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 300rpx;
			border-radius: 0 0 6px 6px;
			background-color: #fff;
			.t,.m{
				margin-bottom: 20rpx;
			}
			.t {
				.success{
					width: 54rpx;
					height: 54rpx;
				}
			}
			.b {
				color: #666;
				font-size: 24rpx;
			}
		}
		&.on {
			transform: translateY(0);
		}
	}
</style>
