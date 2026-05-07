# Conda 常用命令总结

## 环境管理

### 创建环境

```bash
# 创建指定 Python 版本的环境
conda create -n env_name python=3.10

# 创建指定包的环境
conda create -n env_name numpy pandas

# 基于指定 Python 版本并安装包
conda create -n env_name python=3.10 numpy pandas
```

### 激活 / 退出环境

```bash
# 激活环境
conda activate env_name

# 退出当前环境
conda deactivate
```

### 查看环境列表

```bash
# 列出所有环境
conda env list

# 或等价写法
conda info --envs
```

### 删除环境

```bash
conda env remove -n env_name
# 或
conda remove -n env_name --all
```

### 导出 / 导入环境

```bash
# 导出当前环境到 yml 文件
conda env export > environment.yml

# 从 yml 文件创建环境
conda env create -f environment.yml

# 导出精简列表（仅手动安装的包）
conda env export --from-history > environment.yml

# 更新已有环境
conda env update -f environment.yml
```

---

## 包管理

### 安装包

```bash
# 安装单个包
conda install numpy

# 安装指定版本
conda install numpy=1.24

# 安装多个包
conda install numpy pandas matplotlib

# 从 conda-forge 频道安装
conda install -c conda-forge package_name

# 使用 pip 安装（conda 没有的包）
pip install package_name
```

### 卸载包

```bash
conda remove package_name
```

### 更新包

```bash
# 更新单个包
conda update numpy

# 更新所有包
conda update --all

# 更新 conda 自身
conda update conda

# 更新 anaconda 元包
conda update anaconda
```

### 查看包

```bash
# 列出当前环境所有包
conda list

# 搜索包
conda search package_name

# 查看包信息
conda info package_name
```

---

## 频道管理

```bash
# 添加频道
conda config --add channels conda-forge

# 移除频道
conda config --remove channels conda-forge

# 查看当前频道配置
conda config --show channels

# 设置频道优先级（strict 表示严格按顺序）
conda config --set channel_priority strict
```

---

## 清理与维护

```bash
# 清理未使用的包和缓存
conda clean --all

# 仅清理索引缓存
conda clean -i

# 清理 tar 包缓存
conda clean -t

# 清理临时文件
conda clean -p
```

---

## 信息查看

```bash
# 查看 conda 版本
conda --version

# 查看 conda 详细信息
conda info

# 查看当前环境信息
conda info --envs

# 查看当前配置
conda config --show
```

---

## 配置管理

```bash
# 查看所有配置
conda config --show

# 设置自动激活 base 环境
conda config --set auto_activate_base true

# 取消自动激活 base 环境
conda config --set auto_activate_base false

# 显示配置文件路径
conda config --describe
```

---

## 常见技巧

| 场景 | 命令 |
|------|------|
| 快速查看当前环境 | `conda info --envs` 或 `echo $CONDA_DEFAULT_ENV` |
| 复制环境 | `conda create -n new_env --clone old_env` |
| 在指定环境中运行命令 | `conda run -n env_name python script.py` |
| 查看环境历史变更 | `conda list --revisions` |
| 回滚到上一个版本 | `conda install --revision N` |
