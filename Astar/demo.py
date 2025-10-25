import math



class AStarPlanner:

    def __init__(self):
        pass
    class Node:
        def __init__(self, data={0: None}, cost=float('inf'), parent_index=None):
            self.data = data  # { 1: 'R1', 2: 'R2', 3: None...}
            self.cost = cost  # cost to reach this node
            self.parent_index = parent_index
            self.neighbors = []  # list of neighboring nodes' indexes

        def __str__(self):
            return str(self.data) + "," + str(self.cost) + "," + str(self.parent_index)
        
        def is_obstacle(self):
            """检查此节点是否为障碍物"""
            return self.data == 'kfs1' or self.data == 'kfs0'

        def add_neighbor(self, neighbor_index):
            """向当前节点添加一个邻居"""
            if neighbor_index not in self.neighbors:
                self.neighbors.append(neighbor_index)

def init_nodes(data_list):

    # 接受一个包含节点数据的字典，初始化节点
    node_array = [None] + [AStarPlanner.Node() for _ in range(12)] # 创建一个长度为13的列表，但忽略索引0的位置

    for index, stuff in data_list.items():
        if 1 <= index <= 12:
            node_array[index].data = {index: stuff} # 设置节点data属性

            if index == 1:
                for neighbor_idx in [2, 4]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 2:
                for neighbor_idx in [1, 3, 5]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 3:
                for neighbor_idx in [2, 6]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 4:
                for neighbor_idx in [1, 5, 7]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 5:
                for neighbor_idx in [2, 4, 6, 8]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 6:
                for neighbor_idx in [3, 5, 9]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 7:
                for neighbor_idx in [4, 8, 10]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 8:
                for neighbor_idx in [5, 7, 9, 11]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 9:
                for neighbor_idx in [6, 8, 12]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 10:
                for neighbor_idx in [7, 11]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 11:
                for neighbor_idx in [8, 10, 12]:
                    node_array[index].add_neighbor(neighbor_idx)
            elif index == 12:
                for neighbor_idx in [9, 11]:
                    node_array[index].add_neighbor(neighbor_idx)
    return node_array
