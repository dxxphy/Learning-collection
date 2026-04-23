Docker 核心命令速查笔记

Docker 的命令按照“镜像（模板） -> 容器（实例） -> 排错 -> 清理”的逻辑分类，掌握这些可以覆盖 95% 以上的日常开发和部署场景。

1. 镜像管理 (Image)

镜像是只读的模板，相当于“菜谱”或面向对象中的 Class。

拉取镜像

docker pull <镜像名>:<标签>
# 示例: docker pull mysql:8.0 (如果不加标签，默认拉取 latest 最新版)


场景： 从 Docker Hub 下载需要的环境预制件。

查看本地镜像

docker images
# 或 docker image ls


场景： 查看本地已下载的镜像列表、大小和 ID。

删除本地镜像

docker rmi <镜像名或镜像ID>


场景： 清理不再需要的镜像以释放磁盘空间（注意：有容器正在使用的镜像无法直接删除）。

构建自定义镜像

docker build -t <自定义镜像名>:<标签> .
# 示例: docker build -t my-app:v1.0 .


场景： 根据当前目录（.）下的 Dockerfile 打包你自己的代码和环境。

2. 容器管理 (Container)

容器是镜像运行起来的实体，相当于“做好的菜”或面向对象中的 Object。

创建并运行容器 (最常用)

docker run [参数] <镜像名>


常用参数解析：

-d: 后台运行 (Detached mode)，不占用当前终端。

-p 主机端口:容器端口: 端口映射（例：-p 8080:80，访问本机的 8080 即访问容器的 80）。

-v 主机目录:容器目录: 数据卷挂载（例：-v /data:/var/lib/mysql，持久化数据或同步代码）。

--name <名字>: 指定容器名称，方便后续管理。

--rm: 容器停止后自动删除，适合一次性测试任务。

完整示例： docker run -d -p 6379:6379 --name my_redis redis

查看容器状态

docker ps      # 仅列出正在运行的容器
docker ps -a   # 列出所有容器 (包括已停止/退出的，排错必备)


启停与删除容器

docker start <容器名或ID>   # 启动已存在的容器
docker stop <容器名或ID>    # 优雅停止运行中的容器
docker restart <容器名或ID> # 重启容器
docker rm <容器名或ID>      # 删除已停止的容器 (加上 -f 参数可强制删除运行中的)


3. 进阶排错与运维 (Debugging)

当容器跑起来但服务不正常时，排错“三板斧”。

查看容器日志 (排错首选)

docker logs -f <容器名或ID>


场景： 实时追踪程序报错信息（-f 相当于 tail -f）。

进入容器内部

docker exec -it <容器名或ID> /bin/bash
# 如果镜像是基于 Alpine 构建的，可能没有 bash，需改用 sh:
# docker exec -it <容器名或ID> sh


场景： 开启交互式终端，进入容器内部查看配置文件、测试网络连通性。

宿主机与容器互传文件

docker cp <宿主机路径> <容器名>:<容器内路径>  # 从本机拷入容器
docker cp <容器名>:<容器内路径> <宿主机路径>  # 从容器拷出到本机


场景： 临时修改容器内配置文件，或将容器内的日志备份拷出。

4. 网络与数据流 (Network & Volume)

创建自定义网络

docker network create <网络名>


场景： 让多个容器互联。在同一网络下的容器，可以通过容器名直接通信，无需知道对方 IP。
(启动容器时加上 --network <网络名> 即可加入)

数据卷管理

docker volume ls           # 查看所有 Docker 托管的数据卷
docker volume rm <卷名>    # 删除无用数据卷


5. 系统级清理 (核弹操作)

一键清理无用资源

docker system prune


场景： 磁盘告急时使用。自动清理所有已停止的容器、未使用的网络和悬空镜像 (dangling images)。
(注意：加 -a 参数 docker system prune -a 会额外删除所有未被当前任何容器使用的正常镜像，谨慎使用！)

## 核心学习法则

开发流程： build (打包) -> run (运行) -> logs (看运行状态) -> stop (停止) -> rm (删除)

排错三步曲： docker ps -a (看谁挂了) -> docker logs (看为什么挂) -> docker exec (进去修)
