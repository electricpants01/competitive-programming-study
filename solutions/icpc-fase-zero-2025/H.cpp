#include <iostream>
using namespace std;

using ll = long long;

ll make_palindrome(ll left, int len) {
  int half = (len + 1) / 2;
  ll answer = left << (len - half);
  for (int i = 0; i < len - half; ++i) {
    int from = (len - 1 - i) - (len - half);
    if (left & (1LL << from)) {
      answer |= 1LL << i;
    }
  }
  return answer;
}

ll largest_palindrome(ll x) {
  if (x <= 1) {
    return x;
  }
  int len = 64 - __builtin_clzll(x);
  int half = (len + 1) / 2;
  ll left = x >> (len - half);
  ll candidate = make_palindrome(left, len);
  if (candidate <= x) {
    return candidate;
  }
  return make_palindrome(left - 1, len);
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  ll x;
  cin >> x;
  cout << largest_palindrome(x) << '\n';
  return 0;
}
