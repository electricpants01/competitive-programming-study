#include <iostream>
#include <vector>
using namespace std;

using ll = long long;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  ll k;
  cin >> n >> k;
  vector<ll> a(n);
  for (ll& value : a) {
    cin >> value;
  }

  // Unfold two laps. Y[p] = A[p%n] - K*p
  vector<ll> y(2 * n);
  for (int i = 0; i < 2 * n; ++i) {
    y[i] = a[i % n] - k * i;
  }

  vector<int> catch_at(n, -1);
  vector<int> stack;
  for (int i = 0; i < 2 * n; ++i) {
    while (!stack.empty() && y[stack.back()] > y[i]) {
      int idx = stack.back();
      stack.pop_back();
      if (idx < n && catch_at[idx] == -1) {
        catch_at[idx] = i % n;
      }
    }
    stack.push_back(i);
  }

  for (int i = 0; i < n; ++i) {
    if (i > 0) {
      cout << ' ';
    }
    // 1-based filter index
    cout << catch_at[i] + 1;
  }
  cout << '\n';
  return 0;
}
