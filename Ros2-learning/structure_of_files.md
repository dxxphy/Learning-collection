### 工作空间结构
```
ros2_ws/                     <-- 工作空间根目录 (你自己创建)
├── src/                     <-- 源码目录 (你自己创建)
│   ├── my_robot_interfaces/  (你的接口包，定义消息)
│   ├── my_cpp_controller/    (你的 C++ 应用包)
│   └── my_py_teleop/         (你的 Python 应用包)
│
├── build/                   <-- 构建目录 (由 colcon 自动创建)，存放编译过程中产生的中间文件、缓存、Makefile 文件等
├── install/                 <-- 安装目录 (由 colcon 自动创建)，存放最终的成品：编译好的 C++ 可执行文件、Python 脚本的软链接、Launch 文件、package.xml 等。ROS 系统运行时只会看这里
│   └── setup.bash           <-- 核心文件：环境设置脚本
└── log/                     <-- 日志目录 (由 colcon 自动创建)
```

### Python包结构
```
my_python_pkg/             <-- 包的根目录
├── package.xml            # [必须] 包的“身份证”，包含包的基本信息和依赖，colcon根据依赖关系决定编译顺序
├── setup.py               # [必须] 安装和入口点配置 ***
├── setup.cfg              # [必须] setup.py 的辅助配置
├── resource/              # [必须] 包含一个空文件，帮助 ROS 找到这个包
│   └── my_python_pkg
├── my_python_pkg/         # [必须] 存放源代码的文件夹（与包同名）
│   ├── __init__.py        # 标识这是一个 Python 模块
│   └── my_node.py         # 你的 Python 代码文件
└── launch/                # [可选] 存放启动文件
    └── demo.launch.py
```
*** ：    
- 定义入口点： 告诉 ROS 如何将 `ros2 run pkg_name node_name` 命令映射到 Python 文件中的 main() 函数
- 安装文件： 定义哪些 Python 模块、Launch 文件、配置参数需要复制或链接到 `install/` 目录中


### C++包结构
```
my_cpp_pkg/                <-- 包的根目录
├── package.xml            # [必须] 包的“身份证”，包含包的基本信息和依赖，根据依赖关系决定编译顺序
├── CMakeLists.txt         # [必须] 编译的说明书，告诉编译器如何编译
├── src/                   # [必须] 存放 .cpp 源文件
│   └── my_node.cpp
├── include/               # [可选] 存放 .hpp 头文件
│   └── my_cpp_pkg/
└── launch/                # [可选] 存放启动文件
```

### install目录结构
```
install/
├── setup.bash          <-- 【总开关】最重要的文件
├── local_setup.bash    <-- 局部开关
├── my_python_pkg/      <-- 包 A 的安装结果
│   ├── lib/            <-- 存放 Python 可执行脚本
│   └── share/          <-- 存放 launch 文件、package.xml
└── my_cpp_pkg/         <-- 包 B 的安装结果
    ├── lib/            <-- 存放 C++ 可执行文件
    └── share/
```

`source install/setup.bash`的作用：把 install 文件夹的路径，添加到系统的环境变量中：
- `install/my_python_pkg/lib` 加到 `PYTHONPATH` 里 —— 这样 Python 才能 import 你的代码
- `install/` 的路径加到 `AMENT_PREFIX_PATH`(ROS 2 专属路径，用于找包) 里 —— 这样 ros2 run 才能找到你的节点。找包的时候，先去你的工作空间找，找不到了再去系统目录找

#### 自定义消息、服务和动作类型：
```
my_robot_ws/                     # 工作空间
└── src/
    └── my_robot_interfaces/     # 接口包的根目录
        ├── package.xml
        ├── CMakeLists.txt       # [注意] 接口包通常使用 CMake
        ├── msg/                 # 存放消息定义文件 (.msg)
        │   └── MotorStatus.msg  
        ├── srv/                 # 存放服务定义文件 (.srv)
        │   └── ResetOdom.srv
        └── action/              # 存放动作定义文件 (.action)
            └── MoveToGoal.action
```
创建一个专门的包来存放所有自定义接口，必须在包的根目录下创建 msg/、srv/ 或 action/ 文件夹，文件名使用 大驼峰命名法（UpperCamelCase），例如 MotorStatus.msg

1. 自定义消息.msg
```
# -----------------------------
# MotorStatus.msg
# -----------------------------

# 1. 消息头 (可选，但推荐用于时间戳)
std_msgs/Header header

# 2. 轮子速度信息 (使用基本类型)
int32 left_motor_speed_rpm  # 左轮转速 (RPM)
int32 right_motor_speed_rpm # 右轮转速 (RPM)

# 3. 数组（或列表）类型
float32[] temperature # 使用数组(可以包含任意数量的 float32)
float32[2] torque # (必须恰好包含 2 个 float32)

# 4. 常量（Constant）定义
int8 STATUS_OK=0
int8 STATUS_ERROR=1
int8 motor_status
```

2. 自定义服务.srv
```
# -----------------------------
# ResetOdom.srv
# -----------------------------

# --- 请求 (Request) ---
# 这个服务不需要输入任何参数，所以请求部分是空的。

---

# --- 响应 (Response) ---
bool success          # 是否成功重置
string message        # 失败时的错误消息
```
服务文件(.srv)的结构分为两部分：请求（Request） 和 响应（Response），它们之间用三个破折号 `---` 分隔

3. 修改`package.xml` (添加编译工具依赖)
```
<build_depend>ament_cmake</build_depend>  # 构建系统的依赖
<build_depend>rosidl_default_generators</build_depend> # 编译消息文件的工具
<exec_depend>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```

4. 修改 `CMakeLists.txt` (添加编译指令)
```
# 找到依赖包
find_package(ament_cmake REQUIRED)
find_package(rosidl_default_generators REQUIRED)

# 核心指令：生成接口
rosidl_generate_interfaces(
  # 指定你的包名
  my_robot_interfaces
  # 列出你要编译的所有消息和服务文件
  "msg/MotorStatus.msg"
  "srv/ResetOdom.srv"
  # 指定语言
  DEPENDENCIES std_msgs
)

# 安装接口文件
install(
  DIRECTORY share/${PROJECT_NAME}/msg
  DESTINATION share/${PROJECT_NAME}
)

ament_package()
```

### Workflow
1. cd ws/src
2. - `ros2 pkg create <pkg_name> --build-type ament_python --dependencies rclpy std_msgs`     
   - `ros2 pkg create <pkg_name> --build-type ament_cmake --dependencies rclcpp std_msgs`
3. 编写节点代码，声明依赖 (`package.xml`)，配置构建文件 (`CMakeLists.txt` / `setup.py`)
4. `colcon build`：build/ 和 install/ 目录生成
5. `source install/setup.bash`：激活环境
6. `ros2 run pkg_name node_name`：运行节点