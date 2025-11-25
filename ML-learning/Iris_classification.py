import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# 1. 加载数据集
iris = load_iris()

# 2. 将数据转换为 Pandas DataFrame (方便查看)
X = pd.DataFrame(iris.data, columns=iris.feature_names)
y = pd.Series(iris.target)

# 3. 探索数据
print("--- 特征数据 (X) 的前5行 ---")
print(X.head())

print("\n--- 目标变量 (y) 的类别名称 ---")
# 0, 1, 2 分别代表的鸢尾花种类
print(iris.target_names) 

print("\n--- 检查数据集大小 ---")
print(f"特征数据形状: {X.shape}")
print(f"目标变量形状: {y.shape}")

# 划分训练集和测试集 (80% 训练，20% 测试)
# X_train, y_train: 用于训练模型的数据和标签
# X_test, y_test: 用于测试模型性能的数据和标签
X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2, # 20% 作为测试集
    random_state=42, # 确保每次划分结果一致
    stratify=y # 确保训练集和测试集中各类别的比例与原数据集中一致
)

print("\n--- 划分后的数据集大小 ---")
print(f"训练集特征数据形状: {X_train.shape}")
print(f"测试集特征数据形状: {X_test.shape}")

# 1. 选择模型: K近邻分类器，设置 K=3 (即 n_neighbors=3)
knn = KNeighborsClassifier(n_neighbors=3)

# 2. 训练模型: 使用训练数据进行拟合
knn.fit(X_train, y_train)

print("\n--- 模型训练完成 ---")

# 1. 进行预测
# 使用训练好的模型对测试集数据进行预测
y_pred = knn.predict(X_test)

# 2. 评估模型性能
# 比较预测结果 (y_pred) 和真实标签 (y_test)
accuracy = accuracy_score(y_test, y_pred)

print("\n--- 模型预测与评估结果 ---")
print(f"模型的预测结果 (前5个): {y_pred[:5]}")
print(f"真实的测试集标签 (前5个): {y_test.head().values}")
print(f"模型的准确率 (Accuracy): {accuracy:.4f}")

# 3. 尝试预测新的单一样本 (可选)
# 假设有一个新的鸢尾花样本: 花萼长5.1, 花萼宽3.5, 花瓣长1.4, 花瓣宽0.2
new_data = [[5.1, 3.5, 1.4, 0.2]] 
# 注意: 模型要求输入是二维数组，即使只有一个样本

prediction = knn.predict(new_data)
predicted_species = iris.target_names[prediction[0]]

print(f"\n--- 单一样本预测 ---")
print(f"新样本的预测类别编号: {prediction[0]}")
print(f"新样本的预测花种是: {predicted_species}")