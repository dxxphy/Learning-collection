## 一、小东西 
1. 转义字符：右斜杠`\`
2. 保留整数的除法：`//`     

3. 文件开头    

```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
```
![alt text](image.png)     

4. f-string：
```
a=1.123456
print(f"保留两位小数r = {r:.2f}")
```    
  
5. `range(x)`：0 ~ x-1的整数序列    

6. `raise ValueError('wrong value')`：错误处理，并立即中断程序




## 二、数据类型
### 1. list (可变)
`stu = ['Michael', 'Bob', 'Tracy']`     

1. 索引： stu[0] , stu[1] , stu[-1] , stu[-2] . . .    
2. 末尾追加：`stu.append('Adam')`
3. 插入指定位置：`stu.insert(1, 'Jack')`
4. 删除指定位置：`stu.pop(1)`    

### 2. tuple (不可改变元素)
`stu = ('Michael', 'Bob', 'Tracy')`    

### 3. dict 
```
>>> d = {'key':value}
>>>d['key']
value
```    
**dict的key必须是不可变对象**
1. 查询value：`d.get('key')`
2. 删除key：`d.pop('key')`

### 4. set
`s = {1, 2, 3}`    
**重复元素在set中自动被过滤**
1. 添加元素：`s.add(4)`
2. 删除元素：`s.remove(4)`
3. 交 / 并操作：
```
>>> s1 = {1, 2, 3}
>>> s2 = {2, 3, 4}

>>> s1 & s2
{2, 3}

>>> s1 | s2
{1, 2, 3, 4}
```
set和dict的唯一区别仅在于没有存储对应的value

## 三、 判断与循环
### 1. if
```
if <条件判断1>:
    <执行1>
elif <条件判断2>:
    <执行2>
elif <条件判断3>:
    <执行3>
else:
    <执行4>
```    
### 2. 循环
```
for x in ...:
    <执行...>
```
for x in ...循环就是把每个元素代入变量x，然后执行缩进块的语句

## 四、 函数
### 1. 定义函数
```
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
```    
### 2. 返回多个值
```
import math

def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny
```    
本质是返回一个tuple，接受返回值时按照位置顺序接收：`x ,y = move(...)`
### 3. 默认参数
```
def power(x, n=2):
    ...
```
**默认参数必须指向不变对象，否则多次调用会改变默认参数的值**

### 4.可变参数 (传入0个或任意个参数)    
可变参数在函数调用时自动组装为一个**tuple**
```
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
```    
使用方法一：  
`calc(1, 2, 3)`    
使用方法二：    
```
>>> nums = [1, 2, 3]
>>> calc(*nums)
```
nums表示把nums这个list的所有元素作为可变参数传进去

### 5. 关键字参数 (传入0个或任意个含参数名的参数)   
关键字参数在函数内部自动组装为一个**dict**     
```
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
```    

```
>>> person('Michael', 30)
name: Michael age: 30 other: {}

>>> person('Adam', 45, gender='M', job='Engineer')
name: Adam age: 45 other: {'gender': 'M', 'job': 'Engineer'}
```     
使用方法一：    
```
>>> extra = {'city': 'Beijing', 'job': 'Engineer'}
>>> person('Jack', 24, city=extra['city'], job=extra['job'])
name: Jack age: 24 other: {'city': 'Beijing', 'job': 'Engineer'}
```    
使用方法二：
```
>>> extra = {'city': 'Beijing', 'job': 'Engineer'}
>>> person('Jack', 24, **extra)
name: Jack age: 24 other: {'city': 'Beijing', 'job': 'Engineer'}
```     

#**命名关键字参数**
```
def person(name, age, **kw):
    if 'city' in kw:
        # 有city参数
        pass
    if 'job' in kw:
        # 有job参数
        pass
    print('name:', name, 'age:', age, 'other:', kw)
```

## 五、高级特性    

### 1.切片
取 list、tuple、string 的部分元素：     
- L[a:b]：从a到b-1的元素（0可以省略）
- L[a:b:c]：从a到b-1的每隔c个元素
- [:]表示所有元素
- L[::n]：所有元素每n个取一个    

### 2.列表生成式
创建有规律的list    
```
- [x * x for x in range(1, 11)]
- [x * x for x in range(1, 11) if x % 2 == 0]
- [m + n for m in 'ABC' for n in 'XYZ']
- [x if x % 2 == 0 else -x for x in range(1, 11)]
```    
### 3. 生成器
……    

## 六、 函数式编程
### 1. 高级函数
1. map(function, sequence)    
    作用：将函数作用到序列（list、tuple、string等）的每一个元素上，返回一个新的序列
2. reduce(function, sequence)  
    function只能接受两个参数  
    作用：把前两个参数输入function的结果和下一个元素输入function
……    

## 七、类    
### 1. 类和实例    
模板：
```
class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s: %s' % (self.name, self.score))
```    
- 括号内放的是父类，object是所有类的最顶层基类，也可以括号和父类都不写
-  `__init__(self, x, y)`，一种特殊方法，self指向创建的实例，x,y指创建实例时需要提供的变量
-  ` __str__(self) `，一种特殊方法，定义当一个对象被转换成字符串时，应该如何显示。用 print() 函数打印一个实例时，Python 就会自动调用这个 __str__ 方法，并显示它返回的字符串。例：    
    ```
    def __str__(self):
        return str(self.x) + "," + str(self.y) + "," + str(self.cost) + "," + str(self.parent_index)
    ```
- 类中的方法第一个参数永远是实例变量self，并且调用时不用传递该参数
- **动态绑定**：定义好一个类后，具体的实例也可以添加另外的变量或者方法
    - 每个实例对象内部都维护着一个名为 `__dict__` 的字典（或者一个类似的映射结构）
    - 当你执行 `instance.variable = value` 时，Python 实际上是在该实例的`__dict__` 字典中添加或修改一个键值对，键是变量名，值是变量数据
- 以`__`开头的变量是私有变量
- `__xxx__`是特殊变量，是 Python 解释器保留的    

#### 1. 装饰器
##### @staticmethod    
静态方法就是一个放在类里面的普通函数，不用传入self参数也不用实例化就可以使用，相应的也不能访问类内的任何变量。静态方法是一种比较通用的方法（比如add(x,y)），本身与类无关，也不需要访问这个类的任何内部状态，放在类里只是因为这个类需要经常用到这个方法，让代码更清晰    
##### @classmethod    
类方法的第一个参数不是实例 `self`，而是类本身 `cls`（它与类绑定，而不是与类的实例绑定），不需要创建类的实例就可以直接调用类方法。    
提供除了 `__init__` 之外的、创建类实例的备用方式，可以根据不同的输入（如字典、JSON、文件等）来构造对象。（比如在`__init__`中需要`name`来创建实例，但调用classmethod就可以用`age`创建实例）