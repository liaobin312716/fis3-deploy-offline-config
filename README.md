# fis3-packager-offline-config
自动生成离线组件配置工具

##安装

npm install fis3-packager-offline-config

##配置方式
目前只支持一下调用方式：

```javascript

fis.match('::package', {
  packager:fis.plugin('offline-config',{
    'id':'bdwm.plugin.ribao',
 	'reg':'page/**',
    'output':'config.json'
  }
})

```
配置参数：
	
>id:    [必须]  离线组件id

>reg:   [必须] 匹配哪些文件，类似fis.match()的参数;*目前不支持排除某个文件*

>output: [必须] 配置文件名称(如：config.json)


##运行结果

生成config.json文件，文件名可配置

```javascript
{
  "id":"bdwm.plugin.banff",
  "pages":[
	 {
	   "name":"b",
	   "file":"/views/a/b.html"
	 },
	 {
	   "name":"index",
		"file":"/views/index.html"
	 }
   ]
}

```
  
file 会根据 release 配置生成编译后的路径。
