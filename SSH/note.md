## 记录ssh时遇到的问题和解决方法、常用命令  

### 互传文件  
` scp username@ip:/path /path` ：获取远端的文件   
` scp /path username@ip:/path` ：推送本地的文件  

可能遇见OpenSSL version mismatch的报错
原因：scp是Linux系统自带的底层网络工具。可能是有一端使用了conda虚拟环境，conda的OpenSSL加密库版本是30500050,和ubuntu系统原生的OpenSSL版本(30000020)不一样  
解决方法：`conda deactivate`或者使用另一端拉取或推送文件


