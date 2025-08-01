# Shamir's Secret Sharing Algorithm Solution

This project implements a solution for the Shamir's Secret Sharing algorithm assignment. The goal is to find the constant term (secret) of a polynomial given its roots.

---

## 🧩 Problem Description

Given a polynomial of degree `m` with roots provided in a specific format, we need to find the constant term **`c`** of the polynomial. The roots are provided as **(x, y)** coordinates where:
- `x` is the key of the object
- `y` is a value encoded in a specific base that needs to be decoded

---

## 💡 Solution Approach

The solution uses **Lagrange Interpolation** to find the polynomial coefficients and extract the constant term. Here's how it works:

1. **Parse Input**: Read JSON files containing test cases with polynomial roots  
2. **Decode Values**: Convert y-values from their given base to decimal  
3. **Lagrange Interpolation**: Use the minimum required number of points (k) to reconstruct the polynomial  
4. **Extract Secret**: The constant term of the interpolated polynomial is the secret  

---

## 📁 Files

| File | Description |
|------|-------------|
| `solution.js` | Main solution implementation |
| `testcase1.json` | First test case with 4 roots, k = 3 |
| `testcase2.json` | Second test case with 10 roots, k = 7 |
| `package.json` | Node.js project configuration |
| `README.md` | This documentation |

---

## 🚀 Running the Solution

```bash
# Install Node.js (if not already installed)
# Then run:
node solution.js

# Or using npm:
npm start
