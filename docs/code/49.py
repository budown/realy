from collections import defaultdict


def groupAnagrams(strs):
    res = defaultdict(list)
    for word in strs:
        sorted_word = "".join(sorted(word))
        res[sorted_word].append(word)

    return list(res.values())


strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

res = groupAnagrams(strs)
print(res)
