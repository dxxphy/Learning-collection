import heapq

# --- 1. 方格（节点）定义 ---

class Node:
    """
    代表网格中的一个方格（节点）
    """
    def __init__(self, number, r, c, block_info=None):
        self.number = number  # 编号 1-12
        self.r = r            # 行 (0-2)
        self.c = c            # 列 (0-3)
        self.block_info = block_info  # 'kfs0', 'kfs1', 'kfs2', or None
        
        # A* 算法所需的属性
        self.g = float('inf')  # 从起点到此节点的实际代价
        self.h = 0             # 启发式代价（到终点的估计代价）
        self.f = float('inf')  # f = g + h
        self.parent = None     # 路径中的父节点

    def is_obstacle(self):
        """检查此节点是否为障碍物"""
        return self.block_info == 'kfs1' or self.block_info == 'kfs0'

    # --- 为了 heapq 和 set 操作定义的方法 ---
    def __lt__(self, other):
        """比较 f 值，用于优先队列"""
        return self.f < other.f

    def __eq__(self, other):
        """比较节点是否相同（基于编号）"""
        return isinstance(other, Node) and self.number == other.number

    def __hash__(self):
        """哈希（基于编号），用于 set"""
        return hash(self.number)

    def __repr__(self):
        """方便打印调试"""
        return f"Node({self.number}, {self.block_info or 'Empty'})"

# --- 2. 网格和辅助函数 ---

ROWS, COLS = 3, 4

def create_grid(block_assignments):
    """
    根据物块分配字典创建网格。
    :param block_assignments: 字典 {node_number: block_name}
    :return: (grid_map, grid_2d)
             grid_map: {number: Node} 方便按编号查找
             grid_2d: [[Node, ...], ...] 方便按坐标查找邻居
    """
    grid_map = {}
    grid_2d = []
    current_num = 1
    for r in range(ROWS):
        row_list = []
        for c in range(COLS):
            block = block_assignments.get(current_num)
            node = Node(current_num, r, c, block)
            grid_map[current_num] = node
            row_list.append(node)
            current_num += 1
        grid_2d.append(row_list)
    return grid_map, grid_2d

def get_traversable_neighbors(node, grid_2d):
    """(A* 移动用) 获取4个方向（上下左右）的可通行邻居"""
    neighbors = []
    for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        nr, nc = node.r + dr, node.c + dc
        
        # 检查是否越界
        if 0 <= nr < ROWS and 0 <= nc < COLS:
            neighbor_node = grid_2d[nr][nc]
            # 检查是否为障碍物
            if not neighbor_node.is_obstacle():
                neighbors.append(neighbor_node)
    return neighbors

def get_4_neighbors(node, grid_2d):
    """(约束检查用) 获取4个方向（上下左右）的邻居节点，无论是否为障碍物"""
    neighbors = []
    for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        nr, nc = node.r + dr, node.c + dc
        
        # 检查是否越界
        if 0 <= nr < ROWS and 0 <= nc < COLS:
            neighbors.append(grid_2d[nr][nc])
    return neighbors

def heuristic(node, end_node):
    """A* 启发式函数（曼哈顿距离）"""
    return abs(node.r - end_node.r) + abs(node.c - end_node.c)

def reconstruct_path(current_node):
    """从终点通过 parent 指针回溯路径"""
    path = []
    while current_node:
        path.append(current_node)
        current_node = current_node.parent
    return path[::-1]  # 翻转为 S -> E

# --- 3. 路径验证 ---

def validate_path_constraints(path, grid_2d):
    """
    检查路径是否满足 kfs2 约束条件。
    """
    if not path:
        return False

    kfs2_on_path_count = 0
    total_kfs2_neighbor_count = 0

    for node in path:
        # 检查条件1：路径本身是否包含 kfs2
        if node.block_info == 'kfs2':
            kfs2_on_path_count += 1
        
        # 检查条件2：路径格子的周围 (*** 已修改为4方向 ***)
        # 使用 get_4_neighbors 获取上下左右的邻居
        for neighbor in get_4_neighbors(node, grid_2d): 
            if neighbor.block_info == 'kfs2':
                total_kfs2_neighbor_count += 1
    
    # 满足条件1：路径上至少有2个kfs2
    if kfs2_on_path_count >= 2:
        return True
    
    # 满足条件2：周围(4方向)的kfs2总数至少为2
    if total_kfs2_neighbor_count >= 2:
        return True
        
    # 两个条件都不满足
    return False

# --- 4. A* 算法核心 ---

def find_path_a_star(grid_map, grid_2d, start_num, end_num):
    """
    执行A*算法查找一条满足约束的路径。
    :return: Node 列表（路径），如果找不到则返回 None
    """
    
    start_node = grid_map.get(start_num)
    end_node = grid_map.get(end_num)

    # 检查起点终点是否有效
    if not start_node or not end_node:
        return None
    if start_node.is_obstacle() or end_node.is_obstacle():
        return None
    # 检查是否符合1-3和10-12的约束
    if start_num not in [1, 2, 3] or end_num not in [10, 11, 12]:
        return None

    # open_list 存储 (f_score, node)
    open_list = []
    closed_set = set()

    # 重置所有节点的 G/H/F/Parent 值（以便多次调用）
    for node in grid_map.values():
        node.g = float('inf')
        node.h = 0
        node.f = float('inf')
        node.parent = None

    # 初始化起点
    start_node.g = 0
    start_node.h = heuristic(start_node, end_node)
    start_node.f = start_node.g + start_node.h
    
    heapq.heappush(open_list, (start_node.f, start_node))

    while open_list:
        # 取出 f 值最小的节点
        current_f, current_node = heapq.heappop(open_list)
        
        if current_node in closed_set:
            continue
            
        # --- 目标检查 ---
        if current_node == end_node:
            path = reconstruct_path(current_node)
            # 找到终点时，必须验证路径是否满足 kfs2 约束
            if validate_path_constraints(path, grid_2d):
                return path  # 找到满足条件的路径！
            
            # 如果不满足条件，我们不返回
            # A*会继续搜索次优路径（可能更长，但可能满足kfs2条件）
            # (注意：在某些情况下，这可能不是最优的A*，
            # 但对于找到 *任何* 满足条件的路径是可行的)
            
        closed_set.add(current_node)

        # 遍历邻居
        for neighbor in get_traversable_neighbors(current_node, grid_2d):
            if neighbor in closed_set:
                continue
                
            # 假设每一步代价为 1
            tentative_g = current_node.g + 1

            if tentative_g < neighbor.g:
                # 找到了更好的路径
                neighbor.parent = current_node
                neighbor.g = tentative_g
                neighbor.h = heuristic(neighbor, end_node)
                neighbor.f = neighbor.g + neighbor.h
                
                # 检查是否已在 open_list 中（避免重复）
                in_open_list = False
                for f, n in open_list:
                    if n == neighbor:
                        in_open_list = True
                        break
                
                if not in_open_list:
                    heapq.heappush(open_list, (neighbor.f, neighbor))

    # 循环结束，open_list 为空，没有找到满足条件的路径
    return None

# --- 5. 主执行函数 ---

def find_valid_path_in_constraints(grid_map, grid_2d):
    """
    遍历所有合法的起终点组合，寻找第一条可行路径。
    """
    possible_starts = [1, 2, 3]
    possible_ends = [10, 11, 12]
    
    for start_num in possible_starts:
        for end_num in possible_ends:
            print(f"--- 正在尝试: 起点 {start_num} -> 终点 {end_num} ---")
            
            path = find_path_a_star(grid_map, grid_2d, start_num, end_num)
            
            if path:
                print(f"成功找到路径！")
                return path
            else:
                print(f"路径 {start_num} -> {end_num} 不可行或不满足kfs2条件。")
    
    return None # 遍历所有组合均失败

# --- 示例运行 ---
if __name__ == "__main__":
    
    # --- 网格布局定义 ---
    # 4个 kfs2, 3个 kfs1, 1个 kfs0, 4个 Empty
    # 这是一个示例布局，您可以根据需要修改
    # [ 1:E ] [ 2:kfs2] [ 3:E ] [ 4:O-kfs1]
    # [ 5:kfs2] [ 6:E ] [ 7:O-kfs1] [ 8:O-kfs0]
    # [ 9:kfs2] [ 10:E ] [ 11:kfs2] [ 12:O-kfs1]
    
    block_assignments = {
        # kfs2 (4个)
        2: 'kfs2',
        5: 'kfs2',
        9: 'kfs2',
        11: 'kfs2',
        # kfs1 (3个) - 障碍物
        4: 'kfs1',
        7: 'kfs1',
        12: 'kfs1',
        # kfs0 (1个) - 障碍物
        8: 'kfs0'
        # 1, 3, 6, 10 为 None (Empty)
    }

    # 1. 创建网格
    grid_map, grid_2d = create_grid(block_assignments)

    # 2. 寻找路径
    final_path = find_valid_path_in_constraints(grid_map, grid_2d)

    # 3. 输出结果
    if final_path:
        print("\n=================================")
        print("最终找到的有效路径（节点编号）：")
        print([node.number for node in final_path])
        print("路径详情：")
        print(" -> ".join([repr(node) for node in final_path]))
    else:
        print("\n=================================")
        print("遍历所有可能的起终点组合后，没有找到可行的路径，停下等待。")