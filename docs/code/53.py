

def maxSubArray(nums):
    n = len(nums)
    dp = [0]*n
    dp[0] = nums[0]

    max_sum = dp[0]
    for i in range(1, n):
        # dp[i]表示以第i个元素结尾的子数组的最大和
        dp[i] = max(dp[i-1]+nums[i], nums[i])
        max_sum = max(max_sum, dp[i])
    return max_sum


nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

print(maxSubArray(nums))
