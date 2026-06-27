# 🧮 Number Theory for Competitive Programming

> A comprehensive guide to number theory concepts needed for Codeforces, LeetCode, AtCoder, and ICPC.
> Each section includes ASCII art diagrams, C++ code, and curated practice problems.

---

## 📋 Topic Overview

| # | Topic | Difficulty | Importance | Prerequisites |
|---|-------|-----------|------------|--------------|
| 1 | Primality Testing | Beginner | Essential | None |
| 2 | Prime Factorization | Beginner | Essential | Primality testing |
| 3 | GCD & LCM (Euclidean) | Beginner | Essential | None |
| 4 | Extended Euclidean | Intermediate | Essential | Euclidean algorithm |
| 5 | Modular Arithmetic | Intermediate | Essential | Modular inverse |
| 6 | Euler's Totient φ(n) | Intermediate | High | Sieve, Prime factorization |
| 7 | Euler's Theorem | Intermediate | High | Modular arithmetic, Totient |
| 8 | Chinese Remainder Theorem | Intermediate | Medium | Extended Euclidean |
| 9 | Linear Diophantine Equations | Intermediate | Medium | Extended Euclidean |
| 10 | Möbius Function & Multiplicative Functions | Advanced | Medium | Sieve |

---

## 1. Primality Testing

### Concept

A number `n` is **prime** if it has exactly two divisors: 1 and itself.

```
Is 17 prime?

Trial division up to √17 ≈ 4.12:
  ÷2 → remainder 1  ✗
  ÷3 → remainder 2  ✗
  ÷4 → remainder 1  ✗
→ 17 is PRIME ✓

Is 1 prime? NO — it has only one divisor (itself).
Is 2 prime? YES — it has exactly 2 divisors: {1, 2}.
```

### ASCII Art — Trial Division

```
Check if n = 101 is prime:

Divisors up to √101 ≈ 10:
  2  3  4  5  6  7  8  9  10
  ✗  ✗  ✗  ✗  ✗  ✗  ✗  ✗   ✗

→ 101 is PRIME ✓

Key insight: If n is composite, its smallest divisor d ≤ √n.
Why? If n = a×b and a ≤ b, then a² ≤ a×b = n → a ≤ √n.
```

### C++ Code — Trial Division

```cpp
bool is_prime(long long n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;

    // Check divisors of form 6k±1 up to √n
    for (long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}
```

### Miller-Rabin (Probabilistic, for large numbers)

```cpp
// Miller-Rabin deterministic for 64-bit integers
// Uses bases: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37

long long mulmod(long long a, long long b, long long mod) {
    // Multiply a*b mod m without overflow (using __int128)
    return (long long)((__int128)a * b % mod);
}

long long powmod(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = mulmod(result, base, mod);
        base = mulmod(base, base, mod);
        exp >>= 1;
    }
    return result;
}

bool miller_rabin(long long n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0) return false;

    // Write n-1 = d * 2^s
    long long d = n - 1;
    int s = 0;
    while (d % 2 == 0) { d /= 2; s++; }

    // Deterministic bases for 64-bit
    vector<long long> bases = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37};

    for (long long a : bases) {
        if (a >= n) continue;
        long long x = powmod(a, d, n);
        if (x == 1 || x == n - 1) continue;

        bool composite = true;
        for (int r = 0; r < s - 1; r++) {
            x = mulmod(x, x, n);
            if (x == n - 1) { composite = false; break; }
        }
        if (composite) return false;
    }
    return true;
}
```

### Practice Problems
- LeetCode 204: Count Primes (Sieve)
- Codeforces 230B: T-primes
- SPOJ PRIME1: Prime Generator
- Codeforces 17A: Noldbach problem

---

## 2. Prime Factorization

### Concept

Every integer n ≥ 2 can be uniquely expressed as a product of prime powers:

```
n = p₁^e₁ × p₂^e₂ × ... × pₖ^eₖ

Example:
  60 = 2² × 3¹ × 5¹
  84 = 2² × 3¹ × 7¹
  100 = 2² × 5²
```

### ASCII Art — Trial Division Factorization

```
Factorize 84:

Start with smallest prime = 2:
  84 ÷ 2 = 42  ✓  [factor 2]
  42 ÷ 2 = 21  ✓  [factor 2]
  21 ÷ 2 = ✗   (next prime)

Try 3:
  21 ÷ 3 = 7   ✓  [factor 3]
  7 ÷ 3 = ✗    (next prime)

Try 5: ✗ (next prime)

Try 7:
  7 ÷ 7 = 1   ✓  [factor 7]

Result: 84 = 2² × 3 × 7

Stop when p × p > remaining n — n itself is prime
```

### C++ Code — Trial Division

```cpp
vector<long long> factorize(long long n) {
    vector<long long> factors;

    // Extract all 2s
    while (n % 2 == 0) {
        factors.push_back(2);
        n /= 2;
    }

    // Extract odd factors
    for (long long i = 3; i * i <= n; i += 2) {
        while (n % i == 0) {
            factors.push_back(i);
            n /= i;
        }
    }

    // If n is still > 1, it's prime
    if (n > 1) factors.push_back(n);

    return factors;
}
```

### C++ Code — Count Distinct Prime Factors (using SPF Sieve)

```cpp
// Count distinct prime factors for all numbers ≤ N in O(N log log N)
const int MAXN = 1e6 + 5;
int prime_factors_count[MAXN];

void compute_distinct_factors() {
    for (int i = 2; i < MAXN; i++) {
        if (prime_factors_count[i] == 0) {  // i is prime
            for (int j = i; j < MAXN; j += i) {
                prime_factors_count[j]++;
            }
        }
    }
}
```

### Pollard's Rho (Large Numbers, O(n^(1/4)))

```cpp
// Pollard's Rho for factoring up to 64-bit numbers
long long pollard_rho(long long n) {
    if (n % 2 == 0) return 2;
    if (n % 3 == 0) return 3;

    long long x = 2, y = 2, d = 1;
    auto f = [&](long long v) { return (mulmod(v, v, n) + 1) % n; };

    while (d == 1) {
        x = f(x);
        y = f(f(y));
        d = __gcd(abs(x - y), n);
    }
    return (d == n) ? pollard_rho(n) : d;
}
```

### Practice Problems
- Codeforces 26A: Almost Prime
- Codeforces 1165D: Almost All Divisors
- SPOJ FACT0: Integer Factorization
- LeetCode 2521: Distinct Prime Factors of Product of Array

---

## 3. GCD & LCM

### Concept

- **GCD** (Greatest Common Divisor): the largest number that divides both a and b
- **LCM** (Least Common Multiple): the smallest number divisible by both a and b

```
gcd(a, b) × lcm(a, b) = a × b

Example: a = 12, b = 18

  12 = 2² × 3
  18 = 2 × 3²

  gcd(12, 18) = 2 × 3 = 6  (take min exponent)
  lcm(12, 18) = 2² × 3² = 36  (take max exponent)

  6 × 36 = 216 = 12 × 18 ✓
```

### ASCII Art — Euclidean Algorithm

```
gcd(48, 18):

  48 = 2 × 18 + 12     gcd(48, 18) = gcd(18, 12)
  18 = 1 × 12 + 6      gcd(18, 12) = gcd(12, 6)
  12 = 2 × 6  + 0      gcd(12, 6)  = 6

  → gcd(48, 18) = 6

The algorithm: repeatedly replace (a, b) with (b, a mod b) until b = 0.
Each step reduces the larger number — converges in O(log min(a,b)).
```

### C++ Code

```cpp
// Iterative Euclidean algorithm
long long gcd(long long a, long long b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

// Recursive (one-liner)
long long gcd_rec(long long a, long long b) {
    return b ? gcd_rec(b, a % b) : a;
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;  // Divide first to avoid overflow
}

// C++17 built-in
// long long g = gcd(a, b);  // <numeric>
// long long l = lcm(a, b);  // <numeric> C++17
```

### Properties

```
gcd(a, 0) = a
gcd(a, b) = gcd(a - b, b) = gcd(a % b, b)
gcd(a, b) = gcd(b, a)
gcd(ka, kb) = k × gcd(a, b)

If n is odd: gcd(n, n+2) = 1
gcd(n, n+1) = 1  (always)
```

### GCD of Multiple Numbers

```cpp
// gcd(a, b, c) = gcd(gcd(a, b), c)
long long multi_gcd(vector<long long>& v) {
    long long g = v[0];
    for (int i = 1; i < v.size(); i++)
        g = gcd(g, v[i]);
    return g;
}
```

### Practice Problems
- Codeforces 75C: Modified GCD
- Codeforces 1108D: Diverse Garland (GCD application)
- LeetCode 1979: Find GCD of Array
- Codeforces 1458A: Row GCD

---

## 4. Extended Euclidean Algorithm

### Concept

Finds integers `x` and `y` such that: `ax + by = gcd(a, b)`

This is the workhorse for:
- **Modular inverse**: `a⁻¹ mod m` when gcd(a,m) = 1
- **Linear Diophantine equations**: `ax + by = c`
- **Chinese Remainder Theorem**

```
Example: a = 35, b = 15

Back-substitution from Euclidean steps:
  35 = 2×15 + 5    → 5 = 35 - 2×15
  15 = 3×5  + 0

  So: 35×(1) + 15×(-2) = 5 = gcd(35, 15) ✓
       x = 1, y = -2
```

### ASCII Art — Extended Euclidean

```
Find x, y for 30x + 12y = gcd(30, 12) = 6

Step 1: Euclidean Table
  a    b    q (quotient)   r (remainder = a - q×b)
  30  12    2              6
  12   6    2              0
   6   0    —              —

Step 2: Back-substitute
  6 = 30 - 2×12

Result: x = 1, y = -2
  30(1) + 12(-2) = 30 - 24 = 6 ✓
```

### C++ Code — Recursive

```cpp
// Returns gcd(a, b) and sets x, y such that ax + by = gcd(a, b)
long long extended_gcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = extended_gcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

// Modular inverse of a mod m (when gcd(a,m) = 1)
long long mod_inverse(long long a, long long m) {
    long long x, y;
    long long g = extended_gcd(a, m, x, y);
    if (g != 1) return -1;  // Inverse doesn't exist
    return (x % m + m) % m;
}

// Usage:
// long long inv = mod_inverse(3, 7);  // inv = 5  (3×5 = 15 ≡ 1 mod 7)
```

### Comparison: Modular Inverse Methods

| Method | When to Use | Time | Requires |
|--------|------------|------|----------|
| **Fermat's Little Theorem**: `a^(MOD-2) mod MOD` | MOD is prime | O(log MOD) | Prime modulus |
| **Extended Euclidean**: solve `ax ≡ 1 (mod m)` | Any m, gcd(a,m)=1 | O(log min(a,m)) | Coprimeness |

### Practice Problems
- Codeforces 1244C: The Football Season
- Codeforces 7C: Line (classic Diophantine)
- Codeforces 300C: Beautiful Numbers
- POJ 1061: Frog's Dating (CRT)

---

## 5. Modular Arithmetic (with Extended Euclidean)

### Concept — The Modular Clock

```
Mod 7 clock:

  ...21 → 14 → 7 → 0
  ...22 → 15 → 8 → 1
  ...23 → 16 → 9 → 2

  9 + 5 = 14 ≡ 0 (mod 7)
  3 × 5 = 15 ≡ 1 (mod 7)  → 5 is the inverse of 3 mod 7

  (a + b) % m = ((a % m) + (b % m)) % m
  (a × b) % m = ((a % m) × (b % m)) % m
```

### Fast Exponentiation (Binary)

```
Compute 3^13 mod 7:

13 = 1101₂

  bit  power     cumulative
   1    3^1 = 3   result = 3
   0    3^2 = 2   skip (bit is 0)
   1    3^4 = 4   result = 3×4 = 12 ≡ 5
   1    3^8 = 2   result = 5×2 = 10 ≡ 3

3^13 ≡ 3 (mod 7) ✓
```

### C++ Code — Complete Modular Toolkit

```cpp
const long long MOD = 1e9 + 7;

// Fast exponentiation
long long power(long long base, long long exp, long long mod = MOD) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return result;
}

// Modular inverse using Fermat (MOD must be prime)
long long inv_fermat(long long a, long long mod = MOD) {
    return power(a, mod - 2, mod);
}

// Modular inverse using Extended Euclidean (works for any coprime a,m)
long long inv_extended(long long a, long long m) {
    long long x, y;
    long long g = extended_gcd(a, m, x, y);
    return (x % m + m) % m;
}

// Handle negative mod correctly
long long norm(long long x, long long mod = MOD) {
    return (x % mod + mod) % mod;
}

// Modular division: a / b mod m
long long div_mod(long long a, long long b, long long mod = MOD) {
    return a * inv_fermat(b, mod) % mod;
}
```

### Safe Arithmetic Without Overflow

```cpp
// Multiply without overflow (for 64-bit intermediate)
long long mul_mod(long long a, long long b, long long m) {
    return (long long)((__int128)a * b % m);
}

// Alternative: Binary multiplication (log b)
long long mul_mod_safe(long long a, long long b, long long m) {
    long long res = 0;
    a %= m;
    while (b) {
        if (b & 1) res = (res + a) % m;
        a = (a + a) % m;
        b >>= 1;
    }
    return res;
}
```

### Practice Problems
- Codeforces 509C: Sum of Digits
- LeetCode 372: Super Pow
- Codeforces 615D: Multipliers
- LeetCode 50: Pow(x, n)

---

## 6. Euler's Totient Function φ(n)

### Concept

φ(n) = count of integers 1 ≤ k ≤ n such that gcd(k, n) = 1

```
φ(1)  = 1    (1 is coprime to itself)
φ(2)  = 1    (only 1)
φ(3)  = 2    (1, 2)
φ(4)  = 2    (1, 3)
φ(5)  = 4    (1, 2, 3, 4) — all numbers < prime
φ(6)  = 2    (1, 5)
φ(7)  = 6    (all < 7)
φ(8)  = 4    (1, 3, 5, 7)
φ(9)  = 6    (1, 2, 4, 5, 7, 8)
φ(10) = 4    (1, 3, 7, 9)
```

### Formula

```
For n = p₁ᵉ¹ × p₂ᵉ² × ... × pₖᵉᵏ:

  φ(n) = n × (1 - 1/p₁) × (1 - 1/p₂) × ... × (1 - 1/pₖ)

Special cases:
  φ(p) = p - 1                    (p is prime)
  φ(pᵏ) = pᵏ - pᵏ⁻¹ = pᵏ⁻¹(p-1)
  φ(ab) = φ(a) × φ(b)             (if gcd(a,b) = 1 — multiplicative!)
```

### ASCII Art — Computing φ(60)

```
60 = 2² × 3 × 5

φ(60) = 60 × (1 - 1/2) × (1 - 1/3) × (1 - 1/5)
      = 60 × 1/2 × 2/3 × 4/5
      = 60 × 8/30
      = 16

Numbers coprime to 60: 1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 49, 53, 59
Count: 16 ✓
```

### C++ Code — Single Number O(√n)

```cpp
long long phi(long long n) {
    long long result = n;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}
```

### C++ Code — Sieve for ALL φ(n) up to N  O(N log log N)

```cpp
const int MAXN = 1e6 + 5;
int phi[MAXN];

void compute_phi() {
    iota(phi, phi + MAXN, 0);  // phi[i] = i initially

    for (int i = 2; i < MAXN; i++) {
        if (phi[i] == i) {  // i is prime
            for (int j = i; j < MAXN; j += i) {
                phi[j] -= phi[j] / i;
            }
        }
    }
}
```

### Key Properties

```
1.  Σ φ(d) = n   (sum of totients of all divisors of n)
    d|n

    Example: n = 6, divisors: 1, 2, 3, 6
    φ(1) + φ(2) + φ(3) + φ(6) = 1 + 1 + 2 + 2 = 6 ✓

2.  Reduced fraction counting:
    Number of fractions a/b in [0,1] with denominator ≤ N:
    Σ φ(i) for i=1..N
```

### Practice Problems
- Codeforces 1295D: Same GCDs
- Codeforces 776C: Molly's Chemicals
- SPOJ ETFS: Euler Totient Function
- CSES 1713: Counting Divisors

---

## 7. Euler's Theorem

### Concept

If gcd(a, m) = 1, then: **a^φ(m) ≡ 1 (mod m)**

```
Fermat's Little Theorem is a special case (p is prime):
  a^(p-1) ≡ 1 (mod p)   if gcd(a,p) = 1

Euler's Theorem generalizes to any modulus m:
  a^φ(m) ≡ 1 (mod m)     if gcd(a,m) = 1

Example: a = 5, m = 7 (prime)
  φ(7) = 6
  5^6 = 15625 ≡ 1 (mod 7) ✓

Example: a = 5, m = 8 (not prime)
  φ(8) = 4
  5^4 = 625 ≡ 1 (mod 8) ✓  (625 = 78×8 + 1)

Example: a = 3, m = 8
  φ(8) = 4
  3^4 = 81 ≡ 1 (mod 8) ✓
```

### ASCII Art — Why It Works

```
For m = 8, numbers coprime to 8: {1, 3, 5, 7}
Multiply each by 3 (coprime to 8):

  1×3 = 3  ≡ 3 (mod 8)
  3×3 = 9  ≡ 1 (mod 8)
  5×3 = 15 ≡ 7 (mod 8)
  7×3 = 21 ≡ 5 (mod 8)

  The set is just permuted: {3, 1, 7, 5}

So the product of the set doesn't change:
  (1·3·5·7) ≡ (3·1·7·5)  ≡ 3^4 × (1·3·5·7) (mod 8)
  → 3^4 ≡ 1 (mod 8) ✓
```

### Application: Power Tower Reduction

```
Compute a^b mod m when b is very large:

  a^b mod m = a^(b mod φ(m) + φ(m)) mod m   (if b ≥ φ(m))

This is the basis for problems involving huge exponents!
```

### C++ Code

```cpp
// Compute a^b mod m using Euler's theorem for large b
long long power_mod_large_exp(long long a, string b, long long m) {
    // Reduce b modulo φ(m)
    long long phi_m = phi(m);
    long long exp = 0;
    bool large = false;

    for (char c : b) {
        exp = exp * 10 + (c - '0');
        if (exp >= phi_m) {
            large = true;
            exp %= phi_m;
        }
    }

    if (large) exp += phi_m;
    return power(a, exp, m);
}
```

### Practice Problems
- LeetCode 372: Super Pow
- Codeforces 17D: Notepad
- SPOJ ZSUM: Just Add It
- UVA 10692: Huge Mod

---

## 8. Chinese Remainder Theorem (CRT)

### Concept

Given pairwise coprime moduli m₁, m₂, ..., mₖ, the system:

```
x ≡ a₁ (mod m₁)
x ≡ a₂ (mod m₂)
...
x ≡ aₖ (mod mₖ)
```

has a unique solution modulo M = m₁ × m₂ × ... × mₖ.

### ASCII Art — CRT Example

```
Solve:  x ≡ 2 (mod 3)
        x ≡ 3 (mod 5)
        x ≡ 2 (mod 7)

M = 3 × 5 × 7 = 105

For each modulus, find its "partial product" and its inverse:

  i  m_i  a_i   M_i = M/m_i     inv(M_i mod m_i)   term = a_i·M_i·inv
  1   3    2     35               35 ≡ 2 mod 3       → inv of 2 mod 3 = 2
                                        term = 2 × 35 × 2 = 140

  2   5    3     21               21 ≡ 1 mod 5       → inv of 1 mod 5 = 1
                                        term = 3 × 21 × 1 = 63

  3   7    2     15               15 ≡ 1 mod 7       → inv of 1 mod 7 = 1
                                        term = 2 × 15 × 1 = 30

x = (140 + 63 + 30) mod 105 = 233 mod 105 = 23

Check:  23 mod 3 = 2 ✓    23 mod 5 = 3 ✓    23 mod 7 = 2 ✓
```

### C++ Code

```cpp
// CRT for coprime moduli
// Returns (x mod M, M) where x is the solution
pair<long long, long long> crt(
    vector<long long>& a,   // remainders
    vector<long long>& m    // moduli (pairwise coprime)
) {
    long long M = 1;
    for (long long mod : m) M *= mod;

    long long x = 0;
    for (int i = 0; i < a.size(); i++) {
        long long Mi = M / m[i];
        long long inv = mod_inverse(Mi, m[i]);  // Mi^{-1} mod m[i]
        x = (x + a[i] * Mi % M * inv % M) % M;
    }
    return {x, M};
}
```

### CRT for Non-Coprime Moduli

When moduli aren't coprime, merge equations one at a time:

```cpp
// Merge x ≡ a1 (mod m1)  and  x ≡ a2 (mod m2)
// Uses: a1 + m1·k ≡ a2 (mod m2)  →  k·m1 ≡ a2 - a1 (mod m2)
// Returns {x, lcm(m1, m2)} or {-1, -1} if no solution

pair<long long, long long> crt_merge(
    long long a1, long long m1,
    long long a2, long long m2
) {
    long long g = gcd(m1, m2);
    if ((a2 - a1) % g != 0) return {-1, -1};  // No solution

    long long m1g = m1 / g, m2g = m2 / g;
    long long k = ((a2 - a1) / g) % m2g;
    k = k * mod_inverse(m1g, m2g) % m2g;
    if (k < 0) k += m2g;

    long long x = a1 + m1 * k;
    long long l = m1 / g * m2;
    return {x % l, l};
}
```

### Practice Problems
- Codeforces 687B: Remainders Game
- Codeforces 1165E: Two Arrays and Sum of Functions
- POJ 1006: Biorhythms (classic CRT)
- Codeforces 1930D1: Sum over all substrings

---

## 9. Linear Diophantine Equations

### Concept

Equation: **ax + by = c** where a, b, c are integers, find integer solutions (x, y).

```
Theorem: ax + by = c has integer solutions  ⟺  gcd(a,b) | c

Example: 15x + 21y = 6
  gcd(15, 21) = 3
  3 | 6 ✓  →  Solutions exist!

  Extended Euclidean on 15, 21:
    15(3) + 21(-2) = 45 - 42 = 3 = gcd(15,21)

  Multiply by c/g = 6/3 = 2:
    15(6) + 21(-4) = 6  ← One solution

  All solutions:
    x = 6 + (21/3)·t = 6 + 7t
    y = -4 - (15/3)·t = -4 - 5t
    for any integer t
```

### ASCII Art — Finding Solutions

```
Solve: 10x + 6y = 14

Step 1: gcd(10, 6) = 2, 14/2 = 7 → solutions exist

Step 2: Extended Euclidean on (10, 6):
  10(1) + 6(-1) = 10 - 6 = 4 ≠ 2...

  Better: 10(-1) + 6(2) = -10 + 12 = 2 ✓

Step 3: Scale to c = 14 (×7):
  x₀ = -7, y₀ = 14

Step 4: General solution:
  x = -7 + (6/2)·t = -7 + 3t
  y = 14 - (10/2)·t = 14 - 5t

Find positive solutions: x > 0, y > 0
  -7 + 3t > 0  →  t > 2.33  →  t ≥ 3
  14 - 5t > 0  →  t < 2.8   →  t ≤ 2
  No integer t satisfies both → no positive solution.
```

### C++ Code

```cpp
// Find one solution to ax + by = c
// Returns true if solution exists, and sets x0, y0
bool diophantine(long long a, long long b, long long c,
                 long long& x0, long long& y0) {
    long long g = gcd(abs(a), abs(b));
    if (c % g != 0) return false;

    // Solve a·x' + b·y' = g
    extended_gcd(abs(a), abs(b), x0, y0);
    if (a < 0) x0 = -x0;
    if (b < 0) y0 = -y0;

    // Scale to c
    x0 *= c / g;
    y0 *= c / g;
    return true;
}

// Generate k-th solution
// x_k = x0 + k × (b / g)
// y_k = y0 - k × (a / g)
void kth_solution(long long a, long long b, long long c,
                  long long k, long long& x, long long& y) {
    long long g = gcd(abs(a), abs(b));
    // x0, y0 from above
    long long x0, y0;
    diophantine(a, b, c, x0, y0);
    x = x0 + k * (b / g);
    y = y0 - k * (a / g);
}

// Count solutions in range [x_min, x_max] × [y_min, y_max]
// Returns number of integer k that satisfy both bounds
int count_solutions_in_range(long long a, long long b, long long c,
                             long long x_min, long long x_max,
                             long long y_min, long long y_max) {
    long long g = gcd(abs(a), abs(b));
    long long x0, y0;
    if (!diophantine(a, b, c, x0, y0)) return 0;

    // x = x0 + k·(b/g)  →  k = (x - x0) / (b/g)
    // y = y0 - k·(a/g)  →  k = (y0 - y) / (a/g)

    long long bg = b / g, ag = a / g;

    // From x bounds
    auto ceil_div = [](long long num, long long den) -> long long {
        if (den < 0) { num = -num; den = -den; }
        if (num >= 0) return (num + den - 1) / den;
        return num / den;
    };
    auto floor_div = [](long long num, long long den) -> long long {
        if (den < 0) { num = -num; den = -den; }
        if (num >= 0) return num / den;
        return (num - den + 1) / den;
    };

    long long k_min = ceil_div(x_min - x0, bg);
    long long k_max = floor_div(x_max - x0, bg);

    // From y bounds (note: y = y0 - k·ag, so k = (y0 - y)/ag)
    long long k_y1 = ceil_div(y0 - y_max, ag);  // y ≤ y_max
    long long k_y2 = floor_div(y0 - y_min, ag); // y ≥ y_min

    k_min = max(k_min, min(k_y1, k_y2));
    k_max = min(k_max, max(k_y1, k_y2));

    return max(0LL, k_max - k_min + 1);
}
```

### Practice Problems
- Codeforces 7C: Line
- Codeforces 1244C: The Football Season
- Codeforces 633A: Ebony and Ivory
- Codeforces 76D: Plus and Square Root (uses Diophantine)

---

## 10. Möbius Function & Multiplicative Functions

### Möbius Function μ(n)

```
Definition:
  μ(1) = 1
  μ(n) = 0           if n has a squared prime factor
  μ(n) = (-1)^k      if n is product of k distinct primes

Examples:
  μ(1)  = 1
  μ(2)  = -1    (one distinct prime)
  μ(3)  = -1
  μ(4)  = 0     (2² divides 4)
  μ(5)  = -1
  μ(6)  = 1     (2×3, two distinct primes → (-1)² = 1)
  μ(7)  = -1
  μ(8)  = 0     (2² = 4 divides 8)
  μ(9)  = 0     (3² = 9)
  μ(10) = 1     (2×5, two distinct primes)
  μ(30) = -1    (2×3×5, three distinct primes → (-1)³ = -1)
```

### Key Property: Möbius Inversion

```
If  g(n) = Σ f(d)    then  f(n) = Σ μ(d) × g(n/d)
        d|n                     d|n

Example: Sum of coprime counts
  Let f(n) = count of k ≤ n with gcd(k, n) = 1 = φ(n)
  Then Σ φ(d) = n   (well-known identity!)
       d|n

  By Möbius inversion:
  φ(n) = Σ μ(d) × (n/d) = n × Σ μ(d)/d
          d|n                    d|n
```

### ASCII Art — Computing μ up to N

```
Sieve for Möbius function up to 12:

  n:   1  2  3  4  5  6  7  8  9  10  11  12
  μ:   1 -1 -1  0 -1  1 -1  0  0   1  -1   0

  Mark multiples of primes:
    p=2: divide [2,4,6,8,10,12] by 2  → μ flips sign
    p=3: divide [3,6,9,12] by 3        → μ flips sign
    p=5: divide [5,10] by 5            → μ flips sign

  For numbers divisible by p² (like 4, 8, 9, 12), set μ = 0
```

### C++ Code — Linear Sieve for μ(n)

```cpp
const int MAXN = 1e6 + 5;
int mu[MAXN];
bool is_composite[MAXN];
vector<int> primes;

void compute_mu() {
    mu[1] = 1;

    for (int i = 2; i < MAXN; i++) {
        if (!is_composite[i]) {
            primes.push_back(i);
            mu[i] = -1;  // i is prime → one distinct prime factor
        }

        for (int p : primes) {
            if (i * p >= MAXN) break;
            is_composite[i * p] = true;

            if (i % p == 0) {
                // p² divides i*p → squared prime factor
                mu[i * p] = 0;
                break;
            } else {
                // One more distinct prime factor → flip sign
                mu[i * p] = -mu[i];
            }
        }
    }
}
```

### Application: Counting Coprime Pairs in Array

```cpp
// Count pairs (i, j) with a[i] coprime to a[j]
// Using Möbius inversion

const int MAXV = 1e6 + 5;
int freq[MAXV];  // frequency of each value
int cnt[MAXV];   // count of multiples

long long count_coprime_pairs(int n) {
    // Count how many numbers are multiples of each d
    for (int d = 1; d < MAXV; d++) {
        for (int m = d; m < MAXV; m += d)
            cnt[d] += freq[m];
    }

    // Inclusion-exclusion via Möbius
    long long ans = 0;
    for (int d = 1; d < MAXV; d++) {
        if (mu[d] == 0) continue;
        // C(cnt[d], 2) pairs share gcd = multiple of d
        long long pairs = (long long)cnt[d] * (cnt[d] - 1) / 2;
        ans += mu[d] * pairs;
    }
    return ans;
}
```

### Other Multiplicative Functions

```
All computable via linear sieve in O(N):

  d(n)  — number of divisors
  σ(n)  — sum of divisors
  φ(n)  — Euler's totient
  μ(n)  — Möbius function

A function f is MULTIPLICATIVE if:
  f(a·b) = f(a)·f(b)   when gcd(a,b) = 1
```

### Practice Problems
- Codeforces 547C: Mike and Foam
- Codeforces 839D: Winter is Here
- SPOJ COPRIME: Coprime Triples
- Codeforces 1139D: Steps to One

---

## 🗺️ Teaching Slide Structure Recommendation

| Slide | Type | Content |
|-------|------|--------|
| 1 | Title | "Number Theory for Competitive Programming" |
| 2 | Grid | Topic overview (Primes, GCD, Modular, Totient, CRT, Diophantine) |
| 3 | Definition | What is a prime? Trial division concept |
| 4 | Code Card | Trial division code + Miller-Rabin overview |
| 5 | Definition | Prime factorization — unique factorization theorem |
| 6 | ASCII Art | Factorize 84 step-by-step |
| 7 | Definition | GCD & LCM — definitions, relationship |
| 8 | ASCII Art | Euclidean algorithm walkthrough |
| 9 | Definition | Extended Euclidean — why it matters |
| 10 | Counter | Modular inverse: Fermat vs Extended Euclidean comparison |
| 11 | Code Card | Complete modular arithmetic template |
| 12 | Definition | Euler's Totient — what φ(n) counts |
| 13 | ASCII Art | Computing φ(60) using the formula |
| 14 | Definition | Euler's Theorem → generalizes Fermat |
| 15 | Counter | Power tower reduction with φ |
| 16 | Definition | CRT — reconstructing from remainders |
| 17 | ASCII Art | CRT example with (2,3), (3,5), (2,7) |
| 18 | Definition | Linear Diophantine equations |
| 19 | ASCII Art | Solving 10x + 6y = 14 |
| 20 | Definition | Möbius function — definition and inversion |
| 21 | Code Card | Counting coprime pairs with Möbius |
| 22 | CTA | Practice problems + next steps |

---

## 📚 External Resources

- [CP-Algorithms: Number Theory](https://cp-algorithms.com/algebra/module-inverse.html)
- [USACO Guide: Number Theory](https://usaco.guide/gold/modular?lang=cpp)
- [Codeforces Blog: Number Theory Topics](https://codeforces.com/blog/entry/49494)
- [CSES Problem Set: Mathematics](https://cses.fi/problemset/)
- Book: "Competitive Programmer's Handbook" (Chapter 21: Number Theory)

---

> **Built for the CP Study Guide project.** Each section maps to an existing or planned algorithm card.
> Run `npm run dev` to preview the live guide at `http://localhost:4321/competitive-programming-study/en/guide`.
