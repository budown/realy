import bisect


class Solution:
    def maxProduct(self, nums):
        if not nums:
            return 0
        max_p = nums[0]
        min_p = nums[0]
        result = nums[0]
        for i in range(1, len(nums)):
            if nums[i] < 0:
                max_p, min_p = min_p, max_p
            max_p = max(nums[i], max_p*nums[i])
            min_p = min(nums[i], min_p*nums[i])
            result = max(result, max_p)
        return result


class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self):
        if self.stack:
            if self.stack[-1] == self.min_stack[-1]:
                self.min_stack.pop()
            self.stack.pop()

    def top(self):
        if self.stack:
            return self.stack[-1]

    def getMin(self):
        if self.min_stack:
            return self.min_stack[-1]


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def getIntersectionNode(self, headA, headB):
        if not headA or not headB:
            return None

        p1 = headA
        p2 = headB
        while p1 != p2:
            p1 = p1.next if p1 else headB
            p2 = p2.next if p2 else headA
        return p1


class Solution:
    def majorityElement(self, nums):
        a = None
        c = 0
        for i in nums:
            if c == 0:
                a = i
            if i == a:
                c += 1
            else:
                c -= 1
        return a


class Solution:
    def numIslands(self, grid):
        def dfs(grid, x, y):
            if not 0 <= x < len(grid) or not 0 <= y < len(grid[0]) or grid[x][y] == '0':
                return
            grid[x][y] = '0'
            dfs(grid, x+1, y)
            dfs(grid, x-1, y)
            dfs(grid, x, y+1)
            dfs(grid, x, y-1)
        count = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '1':
                    dfs(grid, i, j)
                    count += 1
        return count


class Solution:
    def search(self, nums, target):
        i = bisect.bisect_left(nums, target, 0)
        if i != len(nums) and nums[i] == target:
            return i
        else:
            return -1

    def search2(self, nums, target):
        left = 0
        right = len(nums)-1
        mid = 0
        while left <= right:
            mid = left+((right-left) >> 1)
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            elif nums[mid] > target:
                right = mid-1
        return -1


class Solution:
    def searchRange(self, nums, target):
        def search(nums, target):
            left = 0
            right = len(nums) - 1
            while (left <= right):
                mid = left+((right-left) >> 1)
                if nums[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1
            return left

        first = search(nums, target)
        if first == len(nums) or nums[first] != target:
            return [-1, -1]
        last = search(nums, target+1) - 1
        return [first, last]


# >= target 最左边位置
def findleft(nums, target):
    left = 0
    right = len(nums) - 1
    mid = 0
    res = -1
    while (left <= right):
        mid = left+((right-left) >> 1)
        if nums[mid] >= target:
            # 标记然后往左
            res = mid
            right = mid - 1
        else:
            left = mid + 1
    return res

# <= target 最右位置
def findright(nums, target):
    left = 0
    right = len(nums)-1
    mid = 0
    res = -1
    while (left <= right):
        mid = left+((right-left) >> 1)
        if nums[mid] <= target:
            res = mid
            left = mid + 1
        else:
            right = mid - 1
    return res
