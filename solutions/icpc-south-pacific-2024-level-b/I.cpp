#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(const string& s, int left, int right) {
  while (left < right) {
    if (s[left] != s[right]) return false;
    ++left;
    --right;
  }
  return true;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  string s;
  cin >> s;
  const int n = static_cast<int>(s.size());

  // Shortest palindrome starting with s: find largest suffix of s that is a
  // palindrome prefix when we keep the whole string as a prefix of the answer.
  // Equivalently: largest k such that s[0..k) equals reverse(s[0..k)) after
  // appending the reverse of the unmatched prefix — i.e. s[n-k..n) is palindrome
  // of the whole string's "center" ... 
  // Min chars to append = n - L where L is the longest suffix of s that is a
  // palindrome? No: we need the whole result to be a palindrome starting with s.
  // That means we append reverse(s[0..i)) for the smallest i where s[i..n) is
  // already a palindrome.
  for (int i = 0; i < n; ++i) {
    if (isPalindrome(s, i, n - 1)) {
      cout << i << '\n';
      return 0;
    }
  }
  cout << n - 1 << '\n';
}
