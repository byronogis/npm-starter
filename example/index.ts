import { sum } from '../src'

// Basic usage examples
// 基本用法示例
sum(2, 3) // => 5

// Large number examples
// 大数计算示例
sum(1000, 2000) // => 3000

// Decimal examples (with precision handling)
// 小数计算示例（已处理精度问题）
sum(0.1, 0.2) // => 0.3
sum(1.5, 2.7) // => 4.2

// Negative number examples
// 负数计算示例
sum(-5, 3) // => -2
sum(-2, -3) // => -5
