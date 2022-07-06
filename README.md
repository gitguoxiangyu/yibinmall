

# hydropower_station_monitor

#### 介绍

水电站管理系统app，前端代码

#### 文件架构

```
components: uni-app组件目录，放可复用的组件 (后添加文件)
pages: 业务页面文件存放的目录  
static:  存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此  
App.vue:  应用配置，用来配置App全局样式以及监听 应用生命周期    
main.js:  Vue初始化入口文件  
mainfest.json:  配置应用名称、
appid、logo、: 版本等打包信息，详见   
pages.json:  配置页面路由、导航条、选项卡等页面类信息，
uni.scss: 文件的用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格， uni.scss文件里预置了一批scss变量预置。
unpackage:  就是打包目录，在这里有各个平台的打包文件 (后添加文件)
utils:  此文件狭存放自己封装的工具类函数，是一个共享的方法。(后添加文件)
```


#### 安装教程

```
git clone https://gitee.com/ljies/chord_length_meter/new/master
```

#### 仓库连接

```
git remote remove origin  #移除远程项目
git init 
git remote add origin https://gitee.com/ljies/chord_length_meter/new/master
```

#### 修改源码后提交

```
git add . #将当前目录所有文件添加到git暂存区
git commit -m "my first commit" #提交并备注提交信息
git push origin master #将本地提交推送到远程仓库
git push origin master --force # 强制推送远程
```

```
git status #获取状态
git branch #查看分支
git branch [名字] # 创建分支
=======
# chord_length_meter

#### 介绍
弦长仪app

#### 文件架构
```

