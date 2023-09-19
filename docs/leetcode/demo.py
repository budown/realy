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
