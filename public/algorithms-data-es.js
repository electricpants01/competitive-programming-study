// Competitive Programming Study Guide — Algorithms Data (ES)
const algorithmsData = {
  "complexity-analysis": {
    title: "Análisis de Complejidad",
    category: "Fundamentos",
    difficulty: "Principiante",
    timeToLearn: "3-5 días",
    importance: "Esencial",
    description:
      "La notación Big-O describe cómo escala el tiempo de ejecución o la memoria a medida que crece la entrada. Dominar el análisis de complejidad es la base de todas las decisiones de diseño de algoritmos.",
    asciiArt: `Comparación de tasas de crecimiento (menor = más rápido):

 n = 10⁶      O(1)  O(log n) O(n)    O(n log n) O(n²)
 Operaciones:   1       20   10⁶       2×10⁷     10¹²
                ✓        ✓     ✓           ✓        ✗

 O(1) ────────────────────────────────── constante
 O(log n) ─────────────────────────╮    muy rápido
 O(n) ───────────────────────╮          lineal
 O(n log n) ───────────╮               aceptable
 O(n²) ──────╮                          lento
 O(2ⁿ) ─╮                              ¡evitar!`,
    keyTechniques: [
      "Notación Big-O / Big-Θ / Big-Ω",
      "Análisis amortizado",
      "Relaciones de recurrencia (Teorema Maestro)",
      "Complejidad espacial",
    ],
    benefits: [
      "Identificar de inmediato si una solución es suficientemente rápida antes de codificar",
      "Elegir la estructura de datos correcta para cada operación",
      "Comunicar la eficiencia de algoritmos claramente en entrevistas",
    ],
    typicalConstraints: [
      "n ≤ 10⁸ → O(n) o O(n log n)",
      "n ≤ 10⁴ → O(n²) OK",
      "n ≤ 500 → O(n³) OK",
    ],
    examples: [
      {
        title: "Determinar Complejidad a partir de Restricciones",
        description: "Regla general: 10⁸ operaciones por segundo",
        codeSnippet: `// Límite de tiempo 1 seg, n = 10^5:
// O(n²) = 10^10 ops → TLE ✗
// O(n log n) = ~1.7×10^6 → OK ✓

// Bucles anidados → O(n²)
for (int i = 0; i < n; i++)      // n
  for (int j = i; j < n; j++)   // ~n/2
    // cuerpo O(1)               // total: O(n²)

// Búsqueda binaria → O(log n)
int lo = 0, hi = n - 1;
while (lo <= hi) {
  int mid = (lo + hi) / 2;      // divide a la mitad cada vez
  // O(log n) iteraciones
}`,
      },
      {
        title: "Teorema Maestro y Análisis Amortizado",
        description: "Resuelve recurrencias divide y vencerás; comprende el O(1) amortizado",
        codeSnippet: `// Master Theorem: T(n) = a·T(n/b) + f(n), a≥1, b>1
// Let c = log_b(a). Compare f(n) with n^c:
//
// Case 1: f(n) = O(n^(c-ε))   → T(n) = Θ(n^c)
// Case 2: f(n) = Θ(n^c)       → T(n) = Θ(n^c · log n)
// Case 3: f(n) = Ω(n^(c+ε))   → T(n) = Θ(f(n))
//
// Common examples:
// T(n) = T(n/2)   + O(1)  → O(log n)    [binary search]
// T(n) = 2T(n/2)  + O(n)  → O(n log n)  [merge sort]
// T(n) = 2T(n/2)  + O(1)  → O(n)        [tree traversal]
// T(n) = 4T(n/2)  + O(n²) → O(n²)       [some divide & conquer]
//
// Amortized Analysis — vector push_back:
// When vector doubles: copies 1+2+4+...+n/2 = n-1 elements total
// n push_backs → at most 2n copies → O(1) amortized per push_back`,
      },
        ],
    bestPractices: [
      "Siempre calcular la complejidad antes de enviar, no después del TLE",
      "n ≤ 10⁵ permite O(n log n); n ≤ 10³ permite O(n²)",
      "Vigilar constantes ocultas — 2×10⁸ puede dar TLE en límites ajustados",
    ],
    problems: ["Leetcode 1 (variantes de Two Sum)", "Codeforces 4A", "USACO 2016 Jan (Div 2)"],
    quiz: [
      { q: "¿Qué describe la notación Big-O?", options: ["Tiempo exacto en segundos", "Cota superior del crecimiento del tiempo", "Rendimiento en el caso promedio", "Solo el uso de memoria"], answer: 1 },
      { q: "¿Cuál es la complejidad temporal de la búsqueda binaria?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
      { q: "Para n = 10⁶, ¿qué complejidad daría TLE en 1 segundo (límite 10⁸ ops/seg)?", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], answer: 2 },
      { q: "¿Qué complejidad es mejor para n = 10⁸?", options: ["O(n log n)", "O(n²)", "O(n)", "O(1)"], answer: 3 },
      { q: "¿Cuál es la complejidad temporal de dos bucles anidados que corren n veces cada uno?", options: ["O(n)", "O(2n)", "O(n²)", "O(n log n)"], answer: 2 },
    ],
  },

  "arrays-strings": {
    title: "Arrays y Strings",
    category: "Fundamentos",
    difficulty: "Principiante",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "Los arrays son la columna vertebral de la PC. Las sumas prefijas, los arrays de diferencia y el patrón de dos punteros resuelven en O(n) muchos problemas que de otro modo requerirían O(n²).",
    asciiArt: `Suma Prefija:

 Índice:  0    1    2    3    4
 Array:  [3,   1,   4,   1,   5]
 Prefijo:[0,   3,   4,   8,   9,  14]

 Suma rango [1..3] = prefijo[4] - prefijo[1]
                   = 9 - 3 = 6  ✓

Array de Diferencia (actualización +2 en [1..3]):

 Antes:  [0, 0, 0, 0, 0]
 diff:   [0,+2, 0, 0,-2]
 Después suma prefija: [0, 2, 2, 2, 0]`,
    keyTechniques: [
      "Sumas Prefijas",
      "Arrays de Diferencia",
      "Dos Punteros",
      "Ventana Deslizante",
    ],
    benefits: [
      "Consultas de suma en rango O(1) tras preprocesamiento O(n)",
      "Actualizaciones en rango O(n) con arrays de diferencia",
      "Base para Segment Trees y BIT",
    ],
    typicalConstraints: ["n ≤ 10⁶ para enfoques O(n)", "q consultas de rango tras construcción del prefijo O(n)"],
    examples: [
      {
        title: "Suma Prefija + Consulta de Rango",
        description: "Construir una vez, consultar en O(1)",
        codeSnippet: `vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; i++)
  prefix[i + 1] = prefix[i] + a[i];

// Suma de rango [l, r] (indexado en 0, inclusivo):
auto rangeSum = [&](int l, int r) {
  return prefix[r + 1] - prefix[l];
};`,
      },
      {
        title: "Suma de Prefijos 2D",
        description: "Consultas de suma de rectángulos en O(1) tras preprocesar en O(n×m)",
        codeSnippet: `// Build 2D prefix sum: pre[i][j] = sum of grid[0..i-1][0..j-1]
vector<vector<int>> build2D(vector<vector<int>>& g) {
  int n = g.size(), m = g[0].size();
  vector<vector<int>> pre(n+1, vector<int>(m+1, 0));
  for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
      pre[i][j] = g[i-1][j-1]
                + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
  return pre;
}

// Query sum of rectangle (r1,c1) to (r2,c2) — 0-indexed inclusive
int query2D(vector<vector<int>>& pre, int r1, int c1, int r2, int c2) {
  return pre[r2+1][c2+1] - pre[r1][c2+1]
       - pre[r2+1][c1]   + pre[r1][c1];
}`,
      },
        ],
    bestPractices: [
      "Usar arrays prefijos indexados en 1 para evitar errores por uno",
      "Para cuadrículas 2D, construir una suma prefija 2D",
      "Los arrays de diferencia son ideales para actualizaciones de suma/resta en rango",
    ],
    problems: ["Leetcode 303 (Range Sum Query)", "Codeforces 816C", "Leetcode 1480"],
    quiz: [
      { q: "¿Cuál es la complejidad de una consulta de rango con suma prefija tras preprocesamiento O(n)?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2 },
      { q: "Dado prefijo = [0, 3, 4, 8, 9, 14], ¿cuál es la suma del rango [1..3]?", options: ["4", "6", "8", "5"], answer: 1 },
      { q: "¿Qué permite hacer eficientemente un array de diferencia?", options: ["Consultas puntuales en O(1)", "Actualizaciones de rango en O(1)", "Ordenar en O(n)", "Buscar en O(log n)"], answer: 1 },
      { q: "Para construir una suma prefija 1D de tamaño n, ¿cuál es el tiempo de preprocesamiento?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2 },
      { q: "Usar arrays prefijos indexados en 1 ayuda a evitar qué tipo de errores?", options: ["Desbordamiento de pila", "Errores por uno (off-by-one)", "Errores de tipo", "Desbordamiento de entero"], answer: 1 },
    ],
  },

  "stl-guide": {
    title: "Esenciales de STL",
    category: "Fundamentos",
    difficulty: "Principiante",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "La Biblioteca Estándar de Plantillas de C++ provee contenedores y algoritmos listos para usar. Dominar vector, map, set, priority_queue y algoritmos como sort/lower_bound es obligatorio en PC.",
    asciiArt: `Complejidad de Contenedores:

 vector    push_back O(1)*  acceso O(1)  búsqueda O(n)
 deque     push/pop  O(1)   acceso O(1)  búsqueda O(n)
 set       insert    O(logn) find O(logn) ordenado
 map       insert    O(logn) find O(logn) clave→valor
 unordered_set/map   O(1) promedio (hash)
 priority_queue (max-heap por defecto):
            push O(logn)  top O(1)  pop O(logn)

 Estructura Heap (max-heap):
        9
       / \\
      7   5
     / \\
    3   4`,
    keyTechniques: [
      "vector / deque / array",
      "set / multiset / unordered_set",
      "map / unordered_map",
      "priority_queue (heap)",
      "sort / lower_bound / upper_bound",
    ],
    benefits: [
      "Evitar reimplementar conjuntos ordenados, heaps y hash maps desde cero",
      "lower_bound / upper_bound proveen búsqueda binaria en contenedores ordenados",
      "priority_queue reemplaza implementaciones manuales de heap",
    ],
    typicalConstraints: ["n ≤ 10⁵ para contenedores ordenados O(n log n)", "Usar unordered_map para búsquedas O(1) promedio"],
    examples: [
      {
        title: "Patrones Principales de STL",
        description: "Los idioms más comunes en programación competitiva",
        codeSnippet: `#include <bits/stdc++.h>
using namespace std;

// Conjunto ordenado — sin duplicados, ops O(log n)
set<int> s;
s.insert(5); s.insert(3); s.insert(7);
auto it = s.lower_bound(4); // apunta a 5

// Map — clave→valor, O(log n)
map<string, int> freq;
freq["hola"]++;

// Max-heap
priority_queue<int> pq;
pq.push(3); pq.push(7); pq.push(1);
cout << pq.top(); // 7

// Min-heap
priority_queue<int, vector<int>, greater<int>> minpq;

// Ordenar + búsqueda binaria
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
bool found = binary_search(v.begin(), v.end(), 8);
int pos = lower_bound(v.begin(), v.end(), 8) - v.begin();`,
      },
      {
        title: "Builtins de Bits y Algoritmos STL Útiles",
        description: "Instrucciones de bits GCC y next_permutation para CP",
        codeSnippet: `// GCC built-in bit functions (single CPU instruction, very fast):
int x = 12; // binary: 1100
__builtin_popcount(x);   // count set bits      → 2
__builtin_clz(x);        // leading zeros (32b) → 28
__builtin_ctz(x);        // trailing zeros      → 2
__builtin_parity(x);     // parity (odd 1s?)    → 0
// Use __builtin_popcountll(x) for long long

// next_permutation: iterate all permutations lexicographically
vector<int> p = {1, 2, 3};
do {
  // process permutation p
} while (next_permutation(p.begin(), p.end())); // n! total, use n ≤ 10

// nth_element: O(n) avg — place kth smallest at index k
nth_element(v.begin(), v.begin() + k, v.end());
// v[k] is now the kth smallest (0-indexed); rest unordered

// __gcd and lcm
int g = __gcd(a, b);
int l = a / g * b; // lcm without overflow`,
      },
        ],
    bestPractices: [
      "Usar unordered_map/set para O(1) promedio, pero cuidado con colisiones en el peor caso",
      "Llamar reserve() en contenedores no ordenados para evitar rehashing",
      "Preferir emplace_back sobre push_back para objetos complejos",
    ],
    problems: ["Leetcode 1 (Two Sum - usar unordered_map)", "Codeforces 4C (Registration)", "Leetcode 347 (Top K)"],
    quiz: [
      { q: "¿Cuál es la complejidad promedio de insertar en un unordered_map?", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], answer: 2 },
      { q: "¿Qué contenedor STL mantiene los elementos en orden sin duplicados?", options: ["vector", "unordered_set", "set", "deque"], answer: 2 },
      { q: "¿Qué retorna lower_bound en un vector ordenado?", options: ["Iterador pasado el último elemento", "Iterador al primer elemento ≥ objetivo", "Iterador al último elemento < objetivo", "Índice del elemento"], answer: 1 },
      { q: "¿Qué contenedor es un max-heap por defecto en C++ STL?", options: ["set", "deque", "priority_queue", "multiset"], answer: 2 },
      { q: "¿Cuál es la complejidad temporal de std::sort?", options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], answer: 2 },
    ],
  },

  "two-pointers": {
    title: "Dos Punteros",
    category: "Algoritmos",
    difficulty: "Principiante",
    timeToLearn: "3-5 días",
    importance: "Alto",
    description:
      "Dos punteros mantienen dos índices que se mueven hacia o desde el otro, resolviendo problemas de arrays ordenados en O(n) en lugar de O(n²).",
    asciiArt: `Two-sum en array ordenado, objetivo = 10:

 [1,  3,  5,  7,  9,  11]
  L                    R    1+11=12 > 10 → mover R a la izquierda
  
 [1,  3,  5,  7,  9,  11]
  L               R         1+9=10  ✓  ¡ENCONTRADO!

Eliminar duplicados en sitio:

 [1, 1, 2, 3, 3, 4]
  W  R                W=escritura, R=lectura
 [1, _, 2, 3, 3, 4]  arr[R]≠arr[W-1] → escribir
     W     R
 Resultado: [1, 2, 3, 4, _, _]`,
    keyTechniques: [
      "Dirección opuesta (array ordenado)",
      "Misma dirección (puntero lento/rápido)",
      "Detección de ciclos de Floyd",
      "Mezcla de dos arrays ordenados",
    ],
    benefits: [
      "Reduce fuerza bruta O(n²) a O(n) en datos ordenados",
      "En sitio — O(1) espacio extra",
      "Fundamental para ventana deslizante y la mezcla del merge sort",
    ],
    typicalConstraints: ["El array debe estar ordenado (dirección opuesta)", "n ≤ 10⁶"],
    examples: [
      {
        title: "Two Sum en Array Ordenado",
        description: "O(n) en lugar de O(n²)",
        codeSnippet: `// Retorna índices tal que a[l] + a[r] == objetivo
pair<int,int> twoSum(vector<int>& a, int target) {
  int l = 0, r = a.size() - 1;
  while (l < r) {
    int s = a[l] + a[r];
    if (s == target) return {l, r};
    else if (s < target) l++;
    else r--;
  }
  return {-1, -1};
}`,
      },
      {
        title: "Detección de Ciclos de Floyd",
        description: "Detecta el ciclo y encuentra su inicio en O(n) tiempo, O(1) espacio",
        codeSnippet: `// Phase 1: slow moves 1 step, fast moves 2 steps
// If they meet → cycle exists
// Phase 2: reset slow to head, advance both 1 step → meet at cycle start
ListNode* detectCycle(ListNode* head) {
  ListNode *slow = head, *fast = head;
  while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) break;
  }
  if (!fast || !fast->next) return nullptr; // no cycle
  slow = head;
  while (slow != fast) { slow = slow->next; fast = fast->next; }
  return slow; // cycle start node
}
// Why: if head→cycle_start = a, cycle_length = c,
// at meeting point slow traveled a+x, fast traveled a+x+k*c.
// fast = 2*slow → k*c = a+x → after resetting slow, both reach start in a steps.`,
      },
        ],
    bestPractices: [
      "Ordenar primero si el array no está ya ordenado",
      "Para listas enlazadas, usar puntero lento/rápido para detectar ciclos o encontrar el punto medio",
      "Verificar casos extremos: array vacío, un elemento, todos iguales",
    ],
    problems: ["Leetcode 167 (Two Sum II)", "Leetcode 15 (3Sum)", "Codeforces 6C"],
    quiz: [
      { q: "¿Cuál es el requisito principal de la técnica de dos punteros en direcciones opuestas?", options: ["El array debe estar desordenado", "El array debe estar ordenado", "El array no debe tener duplicados", "El array debe tener longitud par"], answer: 1 },
      { q: "¿Cuál es la complejidad de dos punteros para two-sum en un array ordenado?", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], answer: 2 },
      { q: "En la detección de ciclos de Floyd, ¿cuántos pasos avanza el puntero rápido por iteración?", options: ["1", "2", "3", "n/2"], answer: 1 },
      { q: "¿Qué técnica elimina duplicados en sitio de un array ordenado en O(n)?", options: ["Búsqueda binaria", "Dos punteros (lento/rápido)", "Hashing", "Merge sort"], answer: 1 },
      { q: "Los dos punteros reducen la complejidad de qué tipo de búsqueda de fuerza bruta?", options: ["O(log n) → O(1)", "O(n²) → O(n)", "O(n³) → O(n²)", "O(n log n) → O(n)"], answer: 1 },
    ],
  },

  "sliding-window": {
    title: "Ventana Deslizante",
    category: "Algoritmos",
    difficulty: "Principiante",
    timeToLearn: "3-5 días",
    importance: "Alto",
    description:
      "Una ventana de tamaño fijo o variable desliza por el array. Al agregar el nuevo elemento y eliminar el antiguo, cada elemento se procesa a lo sumo dos veces — O(n) total.",
    asciiArt: `Ventana fija (k=3), encontrar suma máxima:

 [2,  1,  5,  1,  3,  2]
 [2   1   5]  1   3   2    suma=8
  2  [1   5   1]  3   2    suma=7
  2   1  [5   1   3]  2    suma=9  ← ¡máxima!
  2   1   5  [1   3   2]   suma=6

Ventana variable (subarreglo más largo con suma ≤ k):

  L                         expandir R hasta suma > k
  L→                        luego contraer L hasta válido
  La ventana mantiene siempre el invariante`,
    keyTechniques: [
      "Ventana de tamaño fijo",
      "Ventana de tamaño variable (contraer cuando inválida)",
      "Cola monotónica (máximo en ventana deslizante)",
      "Mapa de frecuencias dentro de la ventana",
    ],
    benefits: [
      "O(n) para problemas que parecen O(n²) con bucles anidados",
      "Funciona para strings (problemas de substrings) y arrays",
      "La cola monotónica extiende a consultas O(n) de máximo/mínimo en rango",
    ],
    typicalConstraints: ["n ≤ 10⁶", "Problemas de substring/subarreglo con restricción de longitud o suma"],
    examples: [
      {
        title: "Substring de Ventana Mínima",
        description: "Ventana variable clásica con mapa de frecuencias",
        codeSnippet: `string minWindow(string s, string t) {
  unordered_map<char, int> need, window;
  for (char c : t) need[c]++;
  int l = 0, matched = 0;
  int resL = 0, resLen = INT_MAX;
  for (int r = 0; r < s.size(); r++) {
    char c = s[r];
    if (need.count(c)) {
      window[c]++;
      if (window[c] == need[c]) matched++;
    }
    while (matched == need.size()) {
      if (r - l + 1 < resLen) { resL = l; resLen = r - l + 1; }
      char lc = s[l++];
      if (need.count(lc)) {
        if (window[lc] == need[lc]) matched--;
        window[lc]--;
      }
    }
  }
  return resLen == INT_MAX ? "" : s.substr(resL, resLen);
}`,
      },
      {
        title: "Máximo de Ventana Deslizante (Deque Monótono)",
        description: "Encuentra el máximo en cada ventana de tamaño k en O(n) total",
        codeSnippet: `// Monotonic deque: front = index of max in current window
// Invariant: deque is decreasing (indices with decreasing values)
vector<int> maxSlidingWindow(vector<int>& a, int k) {
  deque<int> dq; // stores indices
  vector<int> result;
  for (int i = 0; i < (int)a.size(); i++) {
    // Remove index outside window
    while (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
    // Remove smaller elements (they can never be max)
    while (!dq.empty() && a[dq.back()] < a[i]) dq.pop_back();
    dq.push_back(i);
    if (i >= k - 1) result.push_back(a[dq.front()]);
  }
  return result;
}
// Complexity: each element pushed and popped at most once → O(n)`,
      },
        ],
    bestPractices: [
      "Expandir R primero, luego contraer L para restaurar el invariante",
      "Usar un contador de condiciones 'matched' en lugar de comparar mapas completos",
      "Para máximo en ventana deslizante, usar una cola monotónica (deque de índices)",
    ],
    problems: ["Leetcode 76 (Min Window Substring)", "Leetcode 239 (Sliding Window Max)", "Codeforces 701C"],
    quiz: [
      { q: "¿Cuál es la complejidad total de la ventana deslizante para un array de tamaño n?", options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], answer: 2 },
      { q: "¿Qué estructura de datos permite consultas de máximo en ventana deslizante en O(n)?", options: ["Pila", "Cola monotónica", "Cola de prioridad", "Conjunto ordenado"], answer: 1 },
      { q: "En una ventana variable, ¿cuándo se debe contraer el puntero izquierdo?", options: ["Cuando la ventana está vacía", "Cuando se viola el invariante de la ventana", "Cuando el derecho llega al final", "Cada n pasos"], answer: 1 },
      { q: "Para la ventana mínima, ¿qué técnica rastrea frecuencias de caracteres?", options: ["Suma prefija", "Mapa de frecuencias dentro de la ventana", "Ordenamiento", "BFS"], answer: 1 },
      { q: "En una ventana fija de tamaño k sobre un array de tamaño n, ¿cuántas ventanas hay en total?", options: ["k", "n", "n - k + 1", "n - k"], answer: 2 },
    ],
  },

  "binary-search": {
    title: "Búsqueda Binaria",
    category: "Algoritmos",
    difficulty: "Principiante a Intermedio",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "La búsqueda binaria elimina la mitad del espacio de búsqueda en cada paso, logrando O(log n). Más allá de arrays, se aplica a funciones monótonas — 'búsqueda binaria en la respuesta'.",
    asciiArt: `Buscar objetivo=11 en array ordenado:

 [1,  3,  5,  7,  9,  11,  13,  15]
  lo=0                          hi=7
              mid=3  arr[3]=7 < 11 → lo=4

 [1,  3,  5,  7,  9,  11,  13,  15]
                   lo=4       hi=7
                       mid=5  arr[5]=11 ✓ ¡ENCONTRADO!

Búsqueda binaria en la respuesta (minimizar carga máxima):
 lo=1  hi=suma  →  ¿check(mid) es factible?
      sí → hi=mid     no → lo=mid+1`,
    keyTechniques: [
      "Búsqueda binaria clásica (encontrar valor)",
      "lower_bound / upper_bound",
      "Búsqueda binaria en la respuesta",
      "Búsqueda ternaria (funciones unimodales)",
    ],
    benefits: [
      "O(log n) vs O(n) escaneo lineal — esencial para n grande",
      "'Búsqueda binaria en la respuesta' convierte optimización en verificación de factibilidad",
      "Funciona en cualquier predicado monótono, no sólo arrays ordenados",
    ],
    typicalConstraints: ["n ≤ 10⁹ para O(log n)", "La verificación de factibilidad debe ser O(n) o O(n log n)"],
    examples: [
      {
        title: "Búsqueda Binaria en la Respuesta",
        description: "Encontrar la capacidad mínima para enviar en D días",
        codeSnippet: `// Minimizar la capacidad para enviar todos los pesos en D días
int shipWithinDays(vector<int>& w, int D) {
  int lo = *max_element(w.begin(), w.end());
  int hi = accumulate(w.begin(), w.end(), 0);
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    int days = 1, cur = 0;
    for (int x : w) {
      if (cur + x > mid) { days++; cur = 0; }
      cur += x;
    }
    if (days <= D) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
      {
        title: "Dos Plantillas de Ciclos y Búsqueda Ternaria",
        description: "lo<=hi para coincidencia exacta; lo<hi para el más a la izquierda válido; ternaria para unimodal",
        codeSnippet: `// Template 1: lo <= hi — find exact value, return -1 if not found
int exactSearch(vector<int>& a, int target) {
  int lo = 0, hi = (int)a.size() - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    else if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// Template 2: lo < hi — find leftmost position satisfying predicate
// Loop terminates when lo == hi, which IS the answer
int leftmost(vector<int>& a, int target) {
  int lo = 0, hi = a.size(); // hi can be past-the-end
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] >= target) hi = mid;  // valid: could be answer, shrink right
    else lo = mid + 1;               // invalid: definitely not answer
  }
  return lo; // lo == hi == first index with a[i] >= target
}

// Ternary search: find minimum of unimodal f on real interval [lo, hi]
double ternaryMin(double lo, double hi) {
  for (int it = 0; it < 200; it++) { // 200 iterations → ~10^-60 precision
    double m1 = lo + (hi - lo) / 3;
    double m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) hi = m2; else lo = m1;
  }
  return (lo + hi) / 2;
}`,
      },
        ],
    bestPractices: [
      "Usar lo + (hi - lo) / 2 para evitar desbordamiento de enteros",
      "Verificar siempre el invariante del bucle: la respuesta siempre está en [lo, hi]",
      "Para lower_bound: usar hi = mid cuando es factible; para upper_bound: lo = mid + 1",
    ],
    problems: ["Leetcode 1011 (Ship Packages)", "Codeforces 460C", "Leetcode 875 (Koko Eating Bananas)"],
    quiz: [
      { q: "¿Cuál es la complejidad temporal de la búsqueda binaria?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], answer: 2 },
      { q: "¿Por qué usar lo + (hi - lo) / 2 en vez de (lo + hi) / 2?", options: ["Es más rápido", "Previene desbordamiento de enteros", "Da un resultado diferente", "Maneja negativos"], answer: 1 },
      { q: "En 'búsqueda binaria sobre la respuesta', ¿qué buscas?", options: ["Un índice en un arreglo ordenado", "Un valor que satisface una condición monótona", "El elemento mínimo", "Un valor duplicado"], answer: 1 },
      { q: "¿Qué devuelve lower_bound si el objetivo no está en el arreglo?", options: ["Puntero nulo", "El primer elemento mayor al objetivo", "-1", "El último elemento menor al objetivo"], answer: 1 },
      { q: "La búsqueda binaria requiere qué propiedad del espacio de búsqueda?", options: ["Todos los elementos son únicos", "El arreglo está ordenado (o el predicado es monótono)", "La longitud es potencia de 2", "Los elementos son positivos"], answer: 1 },
      { q: "Con punteros lo y hi, ¿qué condición evita bucles infinitos en rangos de 2 elementos?", options: ["while (lo <= hi)", "while (lo < hi)", "while (lo != hi)", "while (hi - lo > 1)"], answer: 0 },
      { q: "En búsqueda binaria sobre arreglo rotado, ¿qué condición extra debes verificar?", options: ["Si mid es igual al objetivo", "Cuál mitad del arreglo sigue ordenada", "Si lo y hi son adyacentes", "Si el pivote está en el índice 0"], answer: 1 },
      { q: "Si lower_bound retorna end(), ¿qué significa?", options: ["El objetivo está en el último índice", "Todos los elementos son menores al objetivo", "El arreglo está vacío", "El objetivo está en la posición 0"], answer: 1 },
    ],
  },

  "sorting": {
    title: "Técnicas de Ordenamiento",
    category: "Algoritmos",
    difficulty: "Principiante a Intermedio",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "El ordenamiento desbloquea soluciones O(n log n) para muchos problemas. Además de std::sort, es crucial entender merge sort (inversiones), counting sort y comparadores personalizados.",
    asciiArt: `Merge Sort [5, 3, 8, 1, 4, 2]:

 [5, 3, 8, 1, 4, 2]       dividir
 [5, 3, 8]  [1, 4, 2]
 [5,3][8]   [1,4][2]
 [3,5][8]   [1,4][2]       ordenar mitades
 [3,5,8]    [1,2,4]        mezclar
 [1,2,3,4,5,8]             O(n log n) ✓

Partición Quick Sort (pivote=4):

 [3, 1, 4, 1, 5, 9, 2, 6]
 [3, 1, 1, 2] 4 [5, 9, 6]  particionado
  recursión izq  recursión der`,
    keyTechniques: [
      "std::sort (introsort, O(n log n))",
      "Merge sort (contar inversiones)",
      "Counting / Radix sort (O(n+k))",
      "Comparador personalizado / stable_sort",
    ],
    benefits: [
      "Arrays ordenados habilitan búsqueda binaria, dos punteros y línea de barrido",
      "Counting sort logra O(n) para rangos de valores pequeños",
      "Merge sort es el algoritmo estándar para contar inversiones",
    ],
    typicalConstraints: ["n ≤ 10⁶ para O(n log n)", "valores ≤ 10⁶ para counting sort"],
    examples: [
      {
        title: "Ordenamiento Personalizado + Conteo de Inversiones",
        description: "Ordenar por clave personalizada; contar inversiones con merge sort",
        codeSnippet: `// Comparador personalizado
sort(v.begin(), v.end(), [](const auto& a, const auto& b) {
  return a.second < b.second; // ordenar por segundo elemento
});

// Contar inversiones con merge sort
long long mergeCount(vector<int>& a, int l, int r) {
  if (r - l <= 1) return 0;
  int mid = (l + r) / 2;
  long long cnt = mergeCount(a, l, mid) + mergeCount(a, mid, r);
  vector<int> tmp;
  int i = l, j = mid;
  while (i < mid && j < r) {
    if (a[i] <= a[j]) tmp.push_back(a[i++]);
    else { cnt += mid - i; tmp.push_back(a[j++]); }
  }
  while (i < mid) tmp.push_back(a[i++]);
  while (j < r) tmp.push_back(a[j++]);
  copy(tmp.begin(), tmp.end(), a.begin() + l);
  return cnt;
}`,
      },
      {
        title: "Ordenar + Voraz: Selección de Actividades",
        description: "Ordena por tiempo de fin → elige codiciosamente intervalos sin solapamiento",
        codeSnippet: `// Activity Selection: maximum non-overlapping intervals
// Key insight: always pick the interval that ends earliest
int maxActivities(vector<pair<int,int>>& intervals) {
  // Sort by end time (the greedy choice)
  sort(intervals.begin(), intervals.end(),
       [](auto& a, auto& b){ return a.second < b.second; });
  int count = 0, lastEnd = INT_MIN;
  for (auto& [start, end] : intervals) {
    if (start >= lastEnd) { // no overlap with last chosen
      count++;
      lastEnd = end;
    }
  }
  return count;
}
// General "sort + greedy" pattern appears in:
// - Meeting rooms (sort by start time)
// - Fractional knapsack (sort by value/weight ratio)
// - Huffman coding (sort by frequency)
// - Job scheduling with deadlines (sort by deadline)
// Rule: identify the "correct" ordering criterion, then greedy scan.`,
      },
        ],
    bestPractices: [
      "Preferir std::sort en general — es O(n log n) en el peor caso (introsort)",
      "Usar stable_sort cuando los elementos iguales deben mantener su orden relativo",
      "Counting sort cuando valores ≤ 10⁶ y se necesita O(n)",
    ],
    problems: ["Leetcode 315 (Count Smaller)", "Codeforces 340E (inversiones)", "Leetcode 179 (Largest Number)"],
    quiz: [
      { q: "¿Cuál es la complejidad de C++ std::sort?", options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], answer: 2 },
      { q: "¿Qué algoritmo de ordenamiento es el método estándar para contar inversiones?", options: ["Quick sort", "Merge sort", "Counting sort", "Heap sort"], answer: 1 },
      { q: "¿Cuándo el counting sort es O(n) en lugar de O(n log n)?", options: ["Cuando el array está casi ordenado", "Cuando los valores están acotados por una constante pequeña k", "Cuando n es potencia de 2", "Siempre"], answer: 1 },
      { q: "¿Qué función de C++ ordena preservando el orden relativo de elementos iguales?", options: ["std::sort", "std::partial_sort", "std::stable_sort", "std::nth_element"], answer: 2 },
      { q: "¿Qué habilita ordenar un array que reduce directamente muchos problemas O(n²) a O(n)?", options: ["Hashing", "Dos punteros y búsqueda binaria", "DFS", "Greedy"], answer: 1 },
    ],
  },

  "bfs": {
    title: "BFS (Búsqueda en Anchura)",
    category: "Teoría de Grafos",
    difficulty: "Principiante a Intermedio",
    timeToLearn: "3-5 días",
    importance: "Esencial",
    description:
      "BFS explora nodos nivel por nivel usando una cola. Encuentra caminos más cortos en grafos no ponderados y es la base de muchos algoritmos de grafos.",
    asciiArt: `BFS de grafo desde nodo 1:

        1          Nivel 0
       / \\
      2   3        Nivel 1
     / \\   \\
    4   5   6      Nivel 2

 Cola: [1] → [2,3] → [3,4,5] → [4,5,6] → [5,6] → []
 Visitar: 1 → 2,3 → 4,5 → 6

 Camino más corto 1→6 = 2 aristas (1→3→6)

 BFS en cuadrícula (0=libre, 1=pared):
 S . . 1      S=inicio, E=fin
 . 1 . .      BFS garantiza el camino más corto
 . . 1 E      en cuadrículas no ponderadas`,
    keyTechniques: [
      "BFS estándar (cola + array de visitados)",
      "BFS multi-fuente",
      "BFS 0-1 (deque para pesos 0/1)",
      "BFS en grafo implícito (estados)",
    ],
    benefits: [
      "Camino más corto garantizado en grafos no ponderados/peso unitario",
      "BFS multi-fuente procesa todas las fuentes simultáneamente",
      "BFS 0-1 maneja aristas de dos pesos en O(V+E)",
    ],
    typicalConstraints: ["V, E ≤ 10⁵", "Cuadrícula hasta 10³ × 10³"],
    examples: [
      {
        title: "Camino Más Corto con BFS",
        description: "BFS estándar con seguimiento de distancia",
        codeSnippet: `vector<int> bfs(int start, vector<vector<int>>& adj, int n) {
  vector<int> dist(n, -1);
  queue<int> q;
  dist[start] = 0;
  q.push(start);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }
  return dist; // dist[i] = camino más corto de start a i
}`,
      },
      {
        title: "BFS 0-1",
        description: "Camino más corto con pesos de arista 0 o 1 — O(V+E) usando deque",
        codeSnippet: `// 0-1 BFS: use deque instead of queue
// Free edges (w=0) → push_front (like same level)
// Cost edges (w=1) → push_back (like next level)
vector<int> bfs01(int src, vector<vector<pair<int,int>>>& adj, int n) {
  vector<int> dist(n, INT_MAX);
  deque<int> dq;
  dist[src] = 0;
  dq.push_back(src);
  while (!dq.empty()) {
    int u = dq.front(); dq.pop_front();
    for (auto [v, w] : adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        if (w == 0) dq.push_front(v);  // free: higher priority
        else        dq.push_back(v);   // cost: normal priority
      }
    }
  }
  return dist;
}
// Use case: grid where you can move normally (cost 1) or
// with a special pass (cost 0) — e.g., Leetcode 1368`,
      },
        ],
    bestPractices: [
      "Marcar nodos como visitados al insertarlos en la cola, no al sacarlos",
      "Para cuadrículas, usar arrays dx/dy para 4 u 8 direcciones",
      "BFS multi-fuente: insertar todas las fuentes con dist=0 antes de empezar",
    ],
    problems: ["Leetcode 994 (Rotting Oranges)", "Codeforces 3D", "Leetcode 1091 (Shortest Path Binary Matrix)"],
    quiz: [
      { q: "¿Qué estructura de datos usa BFS para procesar nodos?", options: ["Pila", "Cola", "Cola de prioridad", "Deque"], answer: 1 },
      { q: "¿Qué tipo de camino más corto garantiza BFS?", options: ["El más corto por peso", "El más corto por número de aristas (no ponderado)", "El más corto por tiempo", "El más corto por costo"], answer: 1 },
      { q: "¿Cuándo se deben marcar los nodos como visitados en BFS?", options: ["Al sacarlos de la cola", "Al insertarlos en la cola", "Tras procesar todos los vecinos", "Nunca"], answer: 1 },
      { q: "¿Cuál es la complejidad de BFS para un grafo con V vértices y E aristas?", options: ["O(V²)", "O(V log V)", "O(V + E)", "O(E log V)"], answer: 2 },
      { q: "En BFS multi-fuente, ¿cómo se manejan múltiples nodos de inicio?", options: ["Ejecutar BFS desde cada fuente por separado", "Insertar todas las fuentes con distancia 0 antes de comenzar", "Ordenar las fuentes primero", "Elegir la fuente más cercana"], answer: 1 },
    ],
  },

  "dfs": {
    title: "DFS (Búsqueda en Profundidad)",
    category: "Teoría de Grafos",
    difficulty: "Principiante a Intermedio",
    timeToLearn: "3-5 días",
    importance: "Esencial",
    description:
      "DFS profundiza lo más posible antes de retroceder. Es la base para detección de ciclos, orden topológico, componentes conexas y algoritmos en árboles.",
    asciiArt: `DFS desde nodo 1 (pre-orden):

        1
       / \\
      2   5
     / \\
    3   4

 Pila: dfs(1)→dfs(2)→dfs(3)→retro→dfs(4)→retro→retro→dfs(5)
 Orden de visita: 1 → 2 → 3 → 4 → 5

 Aristas de árbol y aristas de retroceso (detección de ciclo):

 1→2 (árbol)  2→3 (árbol)  3→1 (retroceso → ¡CICLO!)

 Marcas de tiempo (entrada/salida):
 Nodo 1: in=1, out=8   Nodo 2: in=2, out=7
 Nodo 3: in=3, out=4   (subárbol de u: in[u]..out[u])`,
    keyTechniques: [
      "DFS recursivo con array de visitados",
      "DFS iterativo con pila explícita",
      "Marcas de tiempo DFS (tiempo de entrada/salida)",
      "Orden topológico (post-orden inverso)",
    ],
    benefits: [
      "Detecta ciclos en grafos dirigidos y no dirigidos",
      "Orden topológico en O(V+E)",
      "Encuentra componentes fuertemente conexas (Kosaraju/Tarjan)",
    ],
    typicalConstraints: ["V, E ≤ 10⁵", "Profundidad de pila ≤ límite de recursión — usar iterativo para grafos profundos"],
    examples: [
      {
        title: "DFS + Detección de Ciclo + Orden Topológico",
        description: "Coloreo Blanco/Gris/Negro para grafos dirigidos",
        codeSnippet: `// 0=no visitado, 1=en pila, 2=terminado
vector<int> color, topo;
bool hasCycle = false;

void dfs(int u, vector<vector<int>>& adj) {
  color[u] = 1;
  for (int v : adj[u]) {
    if (color[v] == 1) { hasCycle = true; return; }
    if (color[v] == 0) dfs(v, adj);
  }
  color[u] = 2;
  topo.push_back(u);  // post-orden inverso = orden topológico
}

// Llamar para todos los nodos:
for (int i = 0; i < n; i++)
  if (color[i] == 0) dfs(i, adj);
reverse(topo.begin(), topo.end());`,
      },
      {
        title: "SCC de Tarjan y Detección de Puentes",
        description: "Encuentra SCCs y puentes en O(V+E) usando arreglos disc[] y low[]",
        codeSnippet: `// Tarjan's SCC: disc[u]=discovery time, low[u]=lowest disc reachable via subtree
int timer_t = 0, numSCC = 0;
vector<int> disc_t, low_t, comp;
vector<bool> onStack;
stack<int> st;

void tarjan(int u, vector<vector<int>>& adj) {
  disc_t[u] = low_t[u] = timer_t++;
  st.push(u); onStack[u] = true;
  for (int v : adj[u]) {
    if (disc_t[v] == -1) { tarjan(v, adj); low_t[u] = min(low_t[u], low_t[v]); }
    else if (onStack[v])  { low_t[u] = min(low_t[u], disc_t[v]); }
  }
  if (low_t[u] == disc_t[u]) { // u is root of an SCC
    while (true) { int v = st.top(); st.pop(); onStack[v]=false; comp[v]=numSCC; if(v==u)break; }
    numSCC++;
  }
}

// Bridge detection (undirected graph):
// Edge (u,v) is a bridge if low[v] > disc[u]
void bridge(int u, int par, vector<vector<int>>& adj,
            vector<int>& disc, vector<int>& low, vector<pair<int,int>>& bridges, int& t) {
  disc[u] = low[u] = t++;
  for (int v : adj[u]) {
    if (disc[v]==-1) {
      bridge(v, u, adj, disc, low, bridges, t);
      low[u] = min(low[u], low[v]);
      if (low[v] > disc[u]) bridges.push_back({u,v}); // it's a bridge!
    } else if (v != par) low[u] = min(low[u], disc[v]);
  }
}`,
      },
        ],
    bestPractices: [
      "Usar DFS iterativo con pila explícita para grafos profundos (evitar stack overflow)",
      "Rastrear marcas de tiempo de entrada/salida para consultas de ancestros y subárboles",
      "DFS en grafo no dirigido: una arista de retroceso indica la existencia de un ciclo",
    ],
    problems: ["Leetcode 207 (Course Schedule)", "Codeforces 1385E", "Leetcode 802 (Safe States)"],
    quiz: [
      { q: "¿Qué estructura de datos usa implícitamente DFS mediante la recursión?", options: ["Cola", "Pila", "Montículo", "Deque"], answer: 1 },
      { q: "En DFS de grafo dirigido, ¿qué indica una arista trasera (back edge)?", options: ["Una arista de árbol", "Un ciclo", "Una arista cruzada", "Un nodo no visitado"], answer: 1 },
      { q: "El orden topológico es el inverso de ¿cuál recorrido DFS?", options: ["Pre-orden", "In-orden", "Post-orden", "Por niveles"], answer: 2 },
      { q: "¿Cuándo deberías usar DFS iterativo en vez de recursivo?", options: ["Cuando el grafo es pequeño", "Cuando el grafo es profundo (para evitar stack overflow)", "Cuando las aristas tienen pesos", "Cuando el grafo es no dirigido"], answer: 1 },
      { q: "Los tiempos de entrada/salida de DFS son útiles para qué consulta?", options: ["Camino más corto", "Consultas de ancestros en subárboles", "Árbol de expansión mínima", "Contar componentes conexas"], answer: 1 },
      { q: "El algoritmo de Tarjan para CFC (SCC) encuentra qué usando DFS?", options: ["Caminos más cortos", "Componentes Fuertemente Conexas", "Árbol de Expansión Mínima", "Particiones bipartitas"], answer: 1 },
      { q: "En DFS de grafo no dirigido, ¿qué distingue una arista trasera de una arista al padre?", options: ["La arista trasera va a la raíz", "La arista trasera va a un ancestro distinto del padre inmediato", "La arista trasera va a una hoja", "La arista trasera conecta distintos componentes"], answer: 1 },
      { q: "Un puente en un grafo es una arista cuya eliminación hace qué?", options: ["Crea un ciclo", "Incrementa el número de componentes conexas", "Reduce el camino más corto", "Hace el grafo bipartito"], answer: 1 },
    ],
  },

  "dijkstra": {
    title: "Algoritmo de Dijkstra",
    category: "Teoría de Grafos",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Alto",
    description:
      "Dijkstra encuentra caminos más cortos desde un origen en grafos con pesos de aristas no negativos. Usa una cola de prioridad de min-heap para O((V+E) log V).",
    asciiArt: `Grafo ponderado, camino más corto desde nodo 1:

     1 ──4── 2
     |       |
     2       1
     |       |
     3 ──1── 4

 dist = [∞, ∞, ∞, ∞]  (indexado en 1)
 Insertar (0,1):  dist[1]=0

 Sacar (0,1):   relajar 1→2 (dist=4), 1→3 (dist=2)
 Sacar (2,3):   relajar 3→4 (dist=3)
 Sacar (3,4):   relajar 4→2 (dist=4, sin mejora)
 Sacar (4,2):   listo

 Final: dist = [-, 0, 4, 2, 3]`,
    keyTechniques: [
      "Basado en cola de prioridad (min-heap)",
      "Eliminación perezosa de entradas obsoletas",
      "Dijkstra multi-fuente",
      "Dijkstra en DAG (usar orden topológico en su lugar)",
    ],
    benefits: [
      "O((V+E) log V) — suficientemente rápido para V,E ≤ 10⁵",
      "Funciona para cualquier grafo con pesos no negativos",
      "Variante multi-fuente: agregar fuente virtual con aristas de peso 0",
    ],
    typicalConstraints: ["V, E ≤ 10⁵", "Pesos de aristas ≥ 0 (usar Bellman-Ford para pesos negativos)"],
    examples: [
      {
        title: "Dijkstra con Min-Heap",
        description: "Implementación estándar usando priority_queue",
        codeSnippet: `vector<long long> dijkstra(int src, vector<vector<pair<int,int>>>& adj, int n) {
  vector<long long> dist(n, LLONG_MAX);
  priority_queue<pair<long long,int>,
                 vector<pair<long long,int>>,
                 greater<>> pq;
  dist[src] = 0;
  pq.push({0, src});
  while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;  // entrada obsoleta
    for (auto [v, w] : adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push({dist[v], v});
      }
    }
  }
  return dist;
}`,
      },
      {
        title: "Bellman-Ford y Comparación de Algoritmos",
        description: "Caminos más cortos en O(V×E); maneja pesos negativos y detecta ciclos negativos",
        codeSnippet: `struct Edge { int u, v, w; };

vector<long long> bellmanFord(int src, vector<Edge>& edges, int n) {
  vector<long long> dist(n, LLONG_MAX);
  dist[src] = 0;
  for (int i = 0; i < n - 1; i++) // V-1 relaxations
    for (auto& [u, v, w] : edges)
      if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
        dist[v] = dist[u] + w;
  // Detect negative cycles: if still relaxable → negative cycle
  for (auto& [u, v, w] : edges)
    if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
      dist[v] = LLONG_MIN; // reachable via negative cycle
  return dist;
}

// Algorithm Selection Guide:
// Dijkstra       O((V+E) log V)  non-negative weights only  ← default choice
// Bellman-Ford   O(V × E)        negative weights, cycle detection
// Floyd-Warshall O(V³)           all-pairs shortest paths, V ≤ 400`,
      },
        ],
    bestPractices: [
      "Usar long long para distancias para evitar desbordamiento",
      "Omitir entradas obsoletas con la verificación de eliminación perezosa",
      "Para pesos negativos → Bellman-Ford en su lugar",
    ],
    problems: ["Codeforces 20C (Camino Más Corto)", "Leetcode 743 (Network Delay)", "Codeforces 786C"],
    quiz: [
      { q: "¿Cuál es la complejidad de Dijkstra con un heap binario?", options: ["O(V²)", "O(E log V)", "O((V+E) log V)", "O(V log E)"], answer: 2 },
      { q: "El algoritmo de Dijkstra NO funciona correctamente cuando?", options: ["El grafo es no dirigido", "Los pesos de aristas son negativos", "El grafo es denso", "El grafo es desconectado"], answer: 1 },
      { q: "¿Qué es la 'eliminación perezosa' en la cola de prioridad de Dijkstra?", options: ["Eliminar todas las entradas obsoletas de forma anticipada", "Omitir entradas obsoletas cuando se sacan del heap", "Eliminar nodos visitados", "Eliminar aristas tras relajación"], answer: 1 },
      { q: "¿Qué tipo de dato se debe usar para distancias en Dijkstra para evitar desbordamiento?", options: ["int", "short", "long long", "float"], answer: 2 },
      { q: "En Dijkstra, ¿cuándo se omite procesar un nodo sacado de la cola?", options: ["Cuando no tiene vecinos", "Cuando su distancia almacenada es mayor que la distancia más corta actual", "Cuando es el nodo fuente", "Nunca"], answer: 1 },
    ],
  },

  "union-find": {
    title: "Union-Find (DSU)",
    category: "Teoría de Grafos",
    difficulty: "Intermedio",
    timeToLearn: "3-5 días",
    importance: "Alto",
    description:
      "Disjoint Set Union (DSU) soporta operaciones de unión y búsqueda casi O(1). Esencial para conectividad dinámica, MST de Kruskal y LCA offline.",
    asciiArt: `Operaciones DSU en {1,2,3,4,5}:

 Inicialmente: 1  2  3  4  5   (cada uno es su propia raíz)

 unir(1,2):      2            unir(3,4): 4
                  |                        |
                  1                        3

 unir(2,4):      2
                / \\
               1   4
                   |
                   3

 find(3) con compresión de caminos:
 3→4→2  →  comprimir: 3 y 4 apuntan directamente a 2
 Resultado: O(α(n)) ≈ O(1) amortizado`,
    keyTechniques: [
      "Compresión de Caminos",
      "Unión por Rango / Tamaño",
      "DSU Ponderado",
      "DSU con Rollback (offline)",
    ],
    benefits: [
      "Casi O(1) amortizado con compresión de caminos + unión por rango",
      "Simplifica enormemente los problemas de conectividad",
      "Componente central del algoritmo MST de Kruskal",
    ],
    typicalConstraints: ["n, q ≤ 10⁵ fácilmente", "Consultas de conectividad dinámica"],
    examples: [
      {
        title: "DSU con Compresión de Caminos",
        description: "Plantilla usada en el 90% de problemas DSU",
        codeSnippet: `struct DSU {
    vector<int> parent, rank_;
    DSU(int n) : parent(n), rank_(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        x = find(x); y = find(y);
        if (x == y) return false;
        if (rank_[x] < rank_[y]) swap(x, y);
        parent[y] = x;
        if (rank_[x] == rank_[y]) rank_[x]++;
        return true;
    }
    bool connected(int x, int y) { return find(x) == find(y); }
};`,
      },
      {
        title: "MST de Kruskal usando DSU",
        description: "Encuentra el Árbol de Expansión Mínimo en O(E log E) — ordena aristas + DSU",
        codeSnippet: `struct Edge { int u, v, w; };

int kruskal(int n, vector<Edge>& edges) {
  // Sort edges by weight ascending
  sort(edges.begin(), edges.end(), [](auto& a, auto& b){ return a.w < b.w; });
  DSU dsu(n);
  int mstCost = 0, edgesUsed = 0;
  for (auto& [u, v, w] : edges) {
    if (dsu.unite(u, v)) {   // only add edge if it connects two components
      mstCost += w;
      if (++edgesUsed == n - 1) break; // MST has exactly n-1 edges
    }
  }
  return edgesUsed == n - 1 ? mstCost : -1; // -1 if graph disconnected
}
// MST properties:
// - Unique MST if all edge weights are distinct
// - n-1 edges in MST for n nodes
// - Minimum total weight connecting all nodes`,
      },
        ],
    bestPractices: [
      "Siempre usar TANTO compresión de caminos COMO unión por rango juntos",
      "Retornar bool desde unite() para verificar si se formó un ciclo",
      "Usar DSU para Kruskal: ordenar aristas, unir extremos, omitir aristas del mismo componente",
    ],
    problems: ["Leetcode 547 (Number of Provinces)", "Codeforces 1455C", "Leetcode 684"],
    quiz: [
      { q: "¿Qué hace la 'compresión de caminos' en DSU?", options: ["Elimina caminos largos del árbol", "Hace que cada nodo apunte directamente a la raíz tras find()", "Balancea el árbol por peso", "Comprime el array de padres"], answer: 1 },
      { q: "¿Cuál es la complejidad amortizada de find() con compresión de caminos y unión por rango?", options: ["O(log n)", "O(n)", "O(α(n)) ≈ O(1)", "O(log log n)"], answer: 2 },
      { q: "Cuando unite(x, y) retorna false, ¿qué significa?", options: ["x e y están en diferentes componentes", "x e y ya están en el mismo componente (se formó un ciclo)", "El DSU está lleno", "x o y no está en el DSU"], answer: 1 },
      { q: "DSU es la estructura central para qué algoritmo de árbol de expansión mínima?", options: ["Prim", "Dijkstra", "Kruskal", "Bellman-Ford"], answer: 2 },
      { q: "En unión por rango, ¿qué ocurre cuando ambos nodos tienen el mismo rango?", options: ["Se elige el nodo menor", "El rango de la raíz resultante se incrementa", "Ningún rango cambia", "Se elige la raíz aleatoriamente"], answer: 1 },
    ],
  },

  "dp-1d": {
    title: "Programación Dinámica 1D",
    category: "Programación Dinámica",
    difficulty: "Intermedio",
    timeToLearn: "2 semanas",
    importance: "Esencial",
    description:
      "Resolver problemas dividiéndolos en subproblemas solapados. La PD 1D usa un único array de estados. Cubre Fibonacci, cambio de monedas, house robber y LIS.",
    asciiArt: `Cambio de Monedas — mínimo de monedas para monto=6, monedas=[1,3,4]:

 dp[0]=0  dp[1]=1  dp[2]=2  dp[3]=1  dp[4]=1  dp[5]=2  dp[6]=2
          (1)      (1+1)    (3)      (4)      (4+1)    (3+3)

LIS — Subsecuencia Creciente Más Larga de [3,1,8,2,5]:

 colas: [3]          insertar 3
 colas: [1]          reemplazar: 1 < 3
 colas: [1,8]        agregar: 8 > todos
 colas: [1,2]        reemplazar: 2 reemplaza 8
 colas: [1,2,5]      agregar: 5 > todos
 Longitud LIS = 3  (ej. 1,2,5)`,
    keyTechniques: [
      "Memoización top-down",
      "Tabulación bottom-up",
      "Optimización de espacio",
      "Diseño de transición de estados",
    ],
    benefits: [
      "Convierte fuerza bruta exponencial en tiempo polinomial",
      "El espacio a menudo puede reducirse de O(n²) a O(n) o O(1)",
      "La mayoría de problemas de PC tienen un componente de PD",
    ],
    typicalConstraints: ["n ≤ 10⁶ para PD O(n)", "n ≤ 10⁴ para PD O(n²)"],
    examples: [
      {
        title: "Subsecuencia Creciente Más Larga (O(n log n))",
        description: "LIS clásico con patience sorting / búsqueda binaria",
        codeSnippet: `int lis(vector<int>& nums) {
    vector<int> tails; // tails[i] = menor cola de SI de longitud i+1
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
      },
      {
        title: "Cambio de Monedas (Mínimo de Monedas)",
        description: "PD 1D bottom-up",
        codeSnippet: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int c : coins)
            if (c <= i && dp[i - c] != INT_MAX)
                dp[i] = min(dp[i], dp[i - c] + 1);
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
      },
      {
        title: "Cambio de Moneda (Mínimo de Monedas)",
        description: "PD ascendente en 1D",
        codeSnippet: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int c : coins)
            if (c <= i && dp[i - c] != INT_MAX)
                dp[i] = min(dp[i], dp[i - c] + 1);
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
      },
        ],
    bestPractices: [
      "Siempre definir claramente qué representa dp[i]",
      "Comenzar con top-down, optimizar a bottom-up si es necesario",
      "Buscar oportunidades para reducir espacio (array rodante)",
    ],
    problems: ["Leetcode 322 (Coin Change)", "Leetcode 300 (LIS)", "Codeforces 455A"],
    quiz: [
      { q: "¿Cuál es la propiedad clave de los problemas aptos para programación dinámica?", options: ["Propiedad greedy", "Subproblemas superpuestos y subestructura óptima", "Divide y vencerás", "Cola monótona"], answer: 1 },
      { q: "En LIS con O(n log n), ¿qué hace lower_bound en cada paso?", options: ["Encuentra la posición para agregar o reemplazar en el arreglo tails", "Ordena el arreglo tails", "Encuentra el elemento máximo", "Elimina un duplicado"], answer: 0 },
      { q: "¿Cuál es la complejidad del cambio de monedas bottom-up para monto W y n monedas?", options: ["O(n)", "O(W)", "O(n × W)", "O(n log W)"], answer: 2 },
      { q: "¿Qué enfoque de PD evita el stack overflow para entradas muy grandes?", options: ["Memoización top-down", "Tabulación bottom-up", "Backtracking recursivo", "Divide y vencerás"], answer: 1 },
      { q: "La optimización de espacio en PD 1D reduce el espacio de O(n²) a ¿qué?", options: ["O(n log n)", "O(n)", "O(1)", "O(sqrt(n))"], answer: 1 },
      { q: "En el problema House Robber dp[i] = max(dp[i-1], dp[i-2] + a[i]) — ¿qué representa dp[i-1]?", options: ["Robar casa i y saltar i-1", "Saltar casa i y tomar el mejor hasta i-1", "Robar ambas casas i e i-1", "El total robado hasta ahora"], answer: 1 },
      { q: "La optimización de 'arreglo rodante' mantiene en memoria ¿cuántas filas de PD?", options: ["log n filas", "sqrt(n) filas", "Un número constante fijo de filas", "Todas las filas"], answer: 2 },
      { q: "¿Cuál es la recurrencia de PD para el número de formas de subir escaleras con 1 o 2 pasos?", options: ["dp[i] = dp[i-1] * dp[i-2]", "dp[i] = dp[i-1] + dp[i-2]", "dp[i] = dp[i-1] + 1", "dp[i] = 2 * dp[i-1]"], answer: 1 },
    ],
  },

  "dp-2d": {
    title: "Programación Dinámica 2D",
    category: "Programación Dinámica",
    difficulty: "Intermedio a Avanzado",
    timeToLearn: "2 semanas",
    importance: "Alto",
    description:
      "PD sobre dos dimensiones — cuadrículas, pares de strings (LCS, distancia de edición) o PD de intervalos. Los estados son O(n²) con transiciones típicamente O(1) o O(n).",
    asciiArt: `LCS de "ABCB" y "BCB":

       ""  B   C   B
    ""  0   0   0   0
    A   0   0   0   0
    B   0   1   1   1
    C   0   1   2   2
    B   0   1   2   3   ← LCS = 3 ("BCB")

 dp[i][j] = dp[i-1][j-1]+1  si a[i]==b[j]
           = max(dp[i-1][j], dp[i][j-1])  si no

Distancia de Edición "gato" → "pato":

       ""  p   a   t   o
    ""  0   1   2   3   4
    g   1   1   2   3   4
    a   2   2   1   2   3
    t   3   3   2   1   2
    o   4   4   3   2   1   ← 1 sustitución (g→p)`,
    keyTechniques: [
      "PD en cuadrículas",
      "LCS / Distancia de Edición",
      "PD de Intervalos",
      "PD con Bitmask",
    ],
    benefits: [
      "Maneja búsqueda de caminos en cuadrículas con restricciones",
      "Resuelve exactamente problemas de alineación de strings",
      "La PD de intervalos maneja problemas de parentización y cadena de matrices",
    ],
    typicalConstraints: ["n, m ≤ 10³ para PD O(n×m)", "n ≤ 500 para PD de intervalos O(n³)"],
    examples: [
      {
        title: "Subsecuencia Común Más Larga",
        description: "PD 2D clásica sobre dos strings",
        codeSnippet: `int lcs(string& a, string& b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    return dp[n][m];
}`,
      },
      {
        title: "DP de Intervalos — Multiplicación en Cadena de Matrices",
        description: "Minimiza multiplicaciones escalares para encadenar n matrices en O(n³)",
        codeSnippet: `// dims[i] * dims[i+1] = dimensions of matrix i (n matrices total)
// Cost to multiply matrices i..j via split at k:
//   dp[i][j] = min over k of: dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]
int matrixChain(vector<int>& dims) {
  int n = dims.size() - 1; // number of matrices
  vector<vector<int>> dp(n, vector<int>(n, 0));
  for (int len = 2; len <= n; len++) {        // chain length
    for (int i = 0; i <= n - len; i++) {      // start index
      int j = i + len - 1;                   // end index
      dp[i][j] = INT_MAX;
      for (int k = i; k < j; k++)            // split point
        dp[i][j] = min(dp[i][j],
                       dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]);
    }
  }
  return dp[0][n-1];
}
// Pattern: for any interval DP, always:
// 1. Iterate length first (outer loop)
// 2. Iterate start index (middle loop)
// 3. Try all split points (inner loop)`,
      },
        ],
    bestPractices: [
      "Dibujar la tabla de PD con ejemplos pequeños primero",
      "Identificar casos base (string vacío, fila/columna vacía)",
      "Para PD de intervalos: iterar longitud primero, luego índice de inicio",
    ],
    problems: ["Leetcode 1143 (LCS)", "Leetcode 72 (Edit Distance)", "Codeforces 149D"],
    quiz: [
      { q: "En LCS, ¿cuál es dp[i][j] cuando a[i] == b[j]?", options: ["dp[i][j-1] + 1", "dp[i-1][j] + 1", "dp[i-1][j-1] + 1", "max(dp[i-1][j], dp[i][j-1])"], answer: 2 },
      { q: "¿Cuál es la complejidad de la Distancia de Edición para cadenas de largo n y m?", options: ["O(n + m)", "O(n × m)", "O(n log m)", "O(n²)"], answer: 1 },
      { q: "En PD de intervalo, ¿qué dimensión se itera primero?", options: ["Índice de inicio", "Índice de fin", "Longitud del intervalo", "Punto medio del intervalo"], answer: 2 },
      { q: "Para PD en grilla de n×m, ¿cuál es el tamaño del espacio de estados?", options: ["O(n + m)", "O(n × m)", "O(max(n, m)²)", "O(n log m)"], answer: 1 },
      { q: "¿Cuáles son los casos base dp[i][0] y dp[0][j] para la distancia de edición?", options: ["0 para todo i, j", "i y j respectivamente", "1 para todo i, j", "indefinido"], answer: 1 },
      { q: "¿Cómo se reconstruye la secuencia LCS real desde la tabla de PD llenada?", options: ["Leer dp[n][m] directamente", "Rastrear desde dp[n][m] siguiendo coincidencias y direcciones máximas", "Ordenar ambas cadenas primero", "Usar una pila para invertir dp[0][0]"], answer: 1 },
      { q: "La PD de Partición en Palíndromos tiene qué complejidad para cadena de largo n?", options: ["O(n)", "O(n²)", "O(n³)", "O(2ⁿ)"], answer: 1 },
      { q: "La PD de multiplicación de cadenas de matrices minimiza qué?", options: ["Número de sumas de matrices", "Total de multiplicaciones escalares", "Memoria utilizada", "Profundidad de recursión"], answer: 1 },
    ],
  },

  "knapsack": {
    title: "PD de Mochila",
    category: "Programación Dinámica",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Alto",
    description:
      "El problema de la mochila 0/1 y sus variantes (ilimitado, acotado, múltiple) son patrones clásicos de PD. Entender la definición del estado es clave para resolver todas las variantes.",
    asciiArt: `Mochila 0/1: capacidad=5
Objetos: (p=2,v=6) (p=2,v=10) (p=3,v=12)

     cap:  0   1   2   3   4   5
 obj 1:    0   0   6   6   6   6
 obj 2:    0   0  10  10  16  16
 obj 3:    0   0  10  12  16  22  ← máx=22

 dp[i][w] = max(dp[i-1][w],          ← omitir objeto i
                dp[i-1][w-pi] + vi)  ← tomar objeto i

Optimización de espacio (array 1D, iterar p hacia atrás):
 dp[w] = max(dp[w], dp[w-pi] + vi)   // iterar w: W..pi`,
    keyTechniques: [
      "Mochila 0/1 (cada objeto una vez)",
      "Mochila Ilimitada (copias ilimitadas)",
      "Mochila Acotada (copias limitadas)",
      "Suma de Subconjunto (variante de mochila)",
    ],
    benefits: [
      "Optimización de espacio 1D reduce O(n×W) a O(W)",
      "Los problemas de suma de subconjunto y partición se reducen a mochila",
      "Base para PD más compleja sobre conjuntos",
    ],
    typicalConstraints: ["n ≤ 10³, W ≤ 10⁴ para O(nW)", "W ≤ 10⁶ para ilimitada"],
    examples: [
      {
        title: "Mochila 0/1 (Espacio Optimizado)",
        description: "Mochila 1D clásica — iterar pesos en reversa",
        codeSnippet: `int knapsack(vector<int>& w, vector<int>& v, int W) {
    int n = w.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++)
        for (int cap = W; cap >= w[i]; cap--)  // ¡reversa!
            dp[cap] = max(dp[cap], dp[cap - w[i]] + v[i]);
    return dp[W];
}

// Mochila ilimitada: iterar cap hacia adelante
for (int i = 0; i < n; i++)
    for (int cap = w[i]; cap <= W; cap++)  // hacia adelante
        dp[cap] = max(dp[cap], dp[cap - w[i]] + v[i]);`,
      },
      {
        title: "Mochila Acotada con Agrupación Binaria",
        description: "Divide k copias en grupos 1,2,4,...,resto → mochila 0/1 en O(nW log k)",
        codeSnippet: `// Bounded knapsack: item i can be used cnt[i] times
// Binary grouping: split cnt[i] into groups of 1, 2, 4, ..., remainder
// Each group is a "virtual item" → then solve 0/1 knapsack
int boundedKnapsack(vector<int>& w, vector<int>& v, vector<int>& cnt, int W) {
  vector<int> nw, nv; // new item list after splitting
  for (int i = 0; i < (int)w.size(); i++) {
    int rem = cnt[i];
    for (int k = 1; k <= rem; k <<= 1) { // 1, 2, 4, 8, ...
      nw.push_back(k * w[i]); nv.push_back(k * v[i]);
      rem -= k;
    }
    if (rem > 0) { nw.push_back(rem * w[i]); nv.push_back(rem * v[i]); }
  }
  // Standard 0/1 knapsack on expanded item list
  vector<int> dp(W + 1, 0);
  for (int i = 0; i < (int)nw.size(); i++)
    for (int cap = W; cap >= nw[i]; cap--)
      dp[cap] = max(dp[cap], dp[cap - nw[i]] + nv[i]);
  return dp[W];
}
// Why binary grouping works: 1+2+4+...+2^(k-1) = 2^k - 1,
// so any count up to cnt[i] can be represented as a subset of groups.`,
      },
        ],
    bestPractices: [
      "0/1: iterar capacidad HACIA ATRÁS para evitar usar un objeto dos veces",
      "Ilimitada: iterar capacidad HACIA ADELANTE para permitir reutilización",
      "Para suma de subconjunto: dp[w] = true/false en lugar de valor máximo",
    ],
    problems: ["Leetcode 416 (Partition Equal Subset)", "Codeforces 366C", "Leetcode 494 (Target Sum)"],
    quiz: [
      { q: "En mochila 0/1, ¿por qué iteramos la capacidad en reversa en la optimización 1D?", options: ["Por eficiencia de caché", "Para evitar usar un artículo más de una vez", "Para manejar pesos negativos", "Para habilitar paralelización"], answer: 1 },
      { q: "En mochila sin límite, ¿por qué iteramos la capacidad hacia adelante?", options: ["Para mantener el orden", "Para permitir usar el mismo artículo múltiples veces", "Para prevenir overflow", "Por eficiencia de caché"], answer: 1 },
      { q: "¿Cómo se convierte la suma de subconjuntos en un problema de mochila?", options: ["dp[w] = max(dp[w], dp[w-wi] + vi)", "dp[w] = dp[w] || dp[w - wi]", "dp[w] = dp[w] + dp[w - wi]", "dp[w] = min(dp[w], dp[w - wi] + 1)"], answer: 1 },
      { q: "¿Cuál es la complejidad de la mochila 0/1 con n artículos y capacidad W?", options: ["O(n + W)", "O(n log W)", "O(n × W)", "O(2^n)"], answer: 2 },
      { q: "El problema de partición en subconjuntos iguales se reduce a qué variante de mochila?", options: ["Mochila sin límite", "Mochila acotada", "Mochila 0/1 / suma de subconjuntos", "Mochila fraccionaria"], answer: 2 },
      { q: "Para contar el número de formas de dar cambio (no solo mínimo de monedas), ¿qué tipo de valor usa la PD?", options: ["bool (alcanzable o no)", "long long conteo de formas", "costo mínimo", "valor máximo"], answer: 1 },
      { q: "En mochila acotada (cada artículo tiene máximo k copias), ¿qué técnica la reduce a O(n W log k)?", options: ["Ordenación greedy", "Agrupación binaria (1, 2, 4, ... bultos)", "Divide y vencerás", "Ventana deslizante"], answer: 1 },
      { q: "¿A qué debe inicializarse dp[0] al calcular mochila de costo mínimo?", options: ["0 (caso base: costo 0 para capacidad 0)", "INF", "1", "-1"], answer: 0 },
    ],
  },

  "bitmask-dp": {
    title: "PD con Bitmask",
    category: "Programación Dinámica",
    difficulty: "Avanzado",
    timeToLearn: "1-2 semanas",
    importance: "Intermedio",
    description:
      "La PD con bitmask codifica subconjuntos como enteros, habilitando PD sobre los 2ⁿ subconjuntos. Clásico para TSP, problemas de asignación y problemas donde n ≤ 20.",
    asciiArt: `TSP con 4 ciudades {0,1,2,3}, inicio=0:
Los bits de la máscara representan ciudades visitadas.

 mask=0001 (ciudad 0 visitada):  dp[0001][0] = 0
 mask=0011 (0,1 visitadas):     dp[0011][1] = dist(0,1)
 mask=0101 (0,2 visitadas):     dp[0101][2] = dist(0,2)
 ...
 mask=1111 (todas visitadas):
   dp[1111][1] = dp[0111][?] + dist(?→1) + dist(1→0) mín

Enumeración de subconjuntos:
 for (int mask=0; mask<(1<<n); mask++)
   for (int bit=0; bit<n; bit++)
     if (mask >> bit & 1)  // bit está activo en mask
       // bit pertenece a este subconjunto`,
    keyTechniques: [
      "PD sobre subconjuntos (2ⁿ estados)",
      "TSP (Problema del Viajero)",
      "PD de Asignación (emparejamiento)",
      "Suma de subconjunto sobre todos los subconjuntos",
    ],
    benefits: [
      "Solución exacta para problemas NP-difíciles con n pequeño (≤20)",
      "Las operaciones de bits hacen la enumeración de subconjuntos extremadamente rápida",
      "Codifica el espacio de estados exponencial de forma compacta",
    ],
    typicalConstraints: ["n ≤ 20 para O(2ⁿ × n)", "n ≤ 25 con encuentro a la mitad"],
    examples: [
      {
        title: "TSP con PD y Bitmask",
        description: "Encontrar el ciclo Hamiltoniano más corto",
        codeSnippet: `int tsp(vector<vector<int>>& dist) {
    int n = dist.size();
    int FULL = (1 << n) - 1;
    // dp[mask][i] = costo mínimo para visitar ciudades en mask, terminando en i
    vector<vector<int>> dp(1<<n, vector<int>(n, INT_MAX/2));
    dp[1][0] = 0;  // comenzar en ciudad 0
    for (int mask = 1; mask <= FULL; mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask >> u & 1) || dp[mask][u] == INT_MAX/2) continue;
            for (int v = 0; v < n; v++) {
                if (mask >> v & 1) continue;  // ya visitada
                int nmask = mask | (1 << v);
                dp[nmask][v] = min(dp[nmask][v], dp[mask][u] + dist[u][v]);
            }
        }
    }
    int ans = INT_MAX;
    for (int u = 1; u < n; u++)
        ans = min(ans, dp[FULL][u] + dist[u][0]);
    return ans;
}`,
      },
      {
        title: "PD SOS + Enumeración de Sub-máscaras",
        description: "PD de Suma sobre Subconjuntos en O(n×2ⁿ); enumerar todas las sub-máscaras en O(3ⁿ) total",
        codeSnippet: `// SOS DP: f[mask] = suma de a[sub] para todo sub ⊆ mask
// Construir en O(n × 2ⁿ) — para n=20: ~20 millones de ops
vector<long long> sos(vector<long long>& a, int n) {
  vector<long long> f = a;
  for (int i = 0; i < n; i++)           // iterar cada posición de bit
    for (int mask = 0; mask < (1<<n); mask++)
      if (mask >> i & 1)                // bit i está activo en mask
        f[mask] += f[mask ^ (1 << i)]; // agregar contribución del subconjunto sin bit i
  return f;
}
// Después de SOS: f[mask] = suma de a[sub] para todo sub ⊆ mask.
// Caso de uso: "para cada máscara, sumar valores de todos sus subconjuntos"

// Enumeración de sub-máscaras: todas las sub-máscaras no vacías de mask
// Trabajo total sobre todas las máscaras = 3ⁿ (cada elemento: en mask∩sub, solo en mask, no en mask = 3 opciones)
void enumerarSubmascaras(int mask) {
  for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // procesar sub-máscara 'sub'
    // (sub-1)&mask elimina el bit más bajo de sub que también está en mask
  }
}
// Patrón clásico: PD sobre todos los pares (mask, sub-máscara)
// for (int mask = 0; mask < (1<<n); mask++)
//   for (int sub = mask; sub > 0; sub = (sub-1)&mask) { dp[mask] = ... }`,
      },
    ],
    bestPractices: [
      "Usar (mask >> i) & 1 para verificar si la ciudad i fue visitada",
      "Usar mask | (1 << i) para agregar la ciudad i al conjunto",
      "Enumerar sub-máscaras: for (int sub=mask; sub>0; sub=(sub-1)&mask)",
    ],
    problems: ["Leetcode 847 (Shortest Path Visiting All Nodes)", "Codeforces 327E", "Leetcode 1125 (Smallest Sufficient Team)"],
    quiz: [
      { q: "¿Cuál es el n máximo para el que la PD con bitmask es típicamente factible?", options: ["n ≤ 10", "n ≤ 20", "n ≤ 50", "n ≤ 100"], answer: 1 },
      { q: "¿Cómo se verifica si el bit i está activo en una máscara?", options: ["mask & i", "(mask >> i) & 1", "mask | i", "mask ^ i"], answer: 1 },
      { q: "¿Cuántos subconjuntos totales tiene un conjunto de n elementos?", options: ["n", "n²", "2ⁿ", "n!"], answer: 2 },
      { q: "En TSP con PD y bitmask, ¿qué representa dp[mask][i]?", options: ["Costo mínimo para comenzar en la ciudad i", "Costo mínimo para visitar todas las ciudades en mask y terminar en i", "Número de ciudades visitadas", "Si la ciudad i está en mask"], answer: 1 },
      { q: "¿Qué operación agrega la ciudad i a una máscara existente?", options: ["mask & (1 << i)", "mask | (1 << i)", "mask ^ (1 << i)", "mask - (1 << i)"], answer: 1 },
    ],
  },

  "segment-tree": {
    title: "Árbol de Segmentos",
    category: "Árboles y Avanzados",
    difficulty: "Avanzado",
    timeToLearn: "2 semanas",
    importance: "Alto",
    description:
      "Estructura en árbol para consultas de rango (suma, mín, máx) y actualizaciones de rango en O(log n). Con propagación perezosa, soporta actualizaciones de rango en O(log n).",
    asciiArt: `Árbol de segmentos para [1,2,3,4,5,6,7,8]:

          [1..8] suma=36
         /              \\
    [1..4]=10        [5..8]=26
    /       \\          /       \\
 [1..2]=3 [3..4]=7 [5..6]=11 [7..8]=15
  / \\       / \\      / \\        / \\
 1   2     3   4    5   6      7   8

 Consulta suma[2..6]:
 [2..2]=2, [3..4]=7, [5..6]=11  →  total=20

 Índice de nodo: raíz=1, izq=2i, der=2i+1
 Hoja para posición p: a profundidad log₂(n)`,
    keyTechniques: [
      "Actualización puntual + Consulta de rango",
      "Propagación Perezosa",
      "Segment Tree Beats",
      "Árbol de Segmentos Persistente",
    ],
    benefits: [
      "Consulta de rango y actualización puntual O(log n)",
      "Actualización de rango O(log n) con propagación perezosa",
      "Se generaliza a cualquier función asociativa",
    ],
    typicalConstraints: ["n, q ≤ 3×10⁵", "Operaciones: suma, mín, máx, MCD, XOR"],
    examples: [
      {
        title: "Árbol de Segmentos (Suma, Actualización Puntual)",
        description: "Implementación clásica de árbol de segmentos",
        codeSnippet: `struct SegTree {
    int n;
    vector<long long> tree;
    SegTree(int n) : n(n), tree(4 * n, 0) {}

    void update(int node, int l, int r, int pos, long long val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (pos <= mid) update(2*node, l, mid, pos, val);
        else update(2*node+1, mid+1, r, pos, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }

    long long query(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return query(2*node, l, mid, ql, qr)
             + query(2*node+1, mid+1, r, ql, qr);
    }
};`,
      },
      {
        title: "Árbol de Segmentos con Propagación Perezosa (Suma en Rango + Actualización en Rango)",
        description: "Actualizaciones de rango en O(log n) mediante pushdown diferido",
        codeSnippet: `// Cada nodo almacena: suma del rango, lazy = suma pendiente para todo el rango
struct LazySegTree {
  int n;
  vector<long long> tree, lazy;
  LazySegTree(int n) : n(n), tree(4*n, 0), lazy(4*n, 0) {}

  void push(int node, int l, int r) {
    if (lazy[node]) {
      int mid = (l + r) / 2;
      // empujar al hijo izquierdo
      tree[2*node]   += lazy[node] * (mid - l + 1);
      lazy[2*node]   += lazy[node];
      // empujar al hijo derecho
      tree[2*node+1] += lazy[node] * (r - mid);
      lazy[2*node+1] += lazy[node];
      lazy[node] = 0; // limpiar
    }
  }

  void update(int node, int l, int r, int ql, int qr, long long val) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) {
      tree[node] += val * (r - l + 1); // aplicar a todo el rango
      lazy[node] += val;               // diferir a los hijos
      return;
    }
    push(node, l, r);                  // empujar antes de descender
    int mid = (l + r) / 2;
    update(2*node, l, mid, ql, qr, val);
    update(2*node+1, mid+1, r, ql, qr, val);
    tree[node] = tree[2*node] + tree[2*node+1];
  }

  long long query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return tree[node];
    push(node, l, r);                  // empujar antes de descender
    int mid = (l + r) / 2;
    return query(2*node, l, mid, ql, qr)
         + query(2*node+1, mid+1, r, ql, qr);
  }
};
// Regla clave: SIEMPRE llamar push() antes de acceder a los hijos.
// Complejidad: O(log n) por actualización de rango y consulta de rango.`,
      },
    ],
    bestPractices: [
      "Reservar 4×n nodos para el array del árbol",
      "Siempre pasar l y r explícitamente — evitar estado global",
      "Usar propagación perezosa sólo cuando sea necesario (actualizaciones de rango)",
    ],
    problems: ["Codeforces 339D", "Leetcode 315 (Count Smaller)", "Codeforces 380C"],
    quiz: [
      { q: "¿Cuántos nodos debes asignar para un árbol de segmentos sobre n elementos?", options: ["2n nodos", "n log n nodos", "4n nodos", "n² nodos"], answer: 2 },
      { q: "¿Cuál es la complejidad de una consulta de rango en un árbol de segmentos?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
      { q: "¿Qué característica del árbol de segmentos permite actualizaciones de rango en O(log n)?", options: ["Compresión de rutas", "Propagación perezosa (lazy propagation)", "Unión por rango", "Nodos persistentes"], answer: 1 },
      { q: "En un árbol de segmentos con raíz=1, ¿cuáles son los hijos del nodo i?", options: ["i+1 e i+2", "2i y 2i+1", "i/2 e i/2+1", "2i-1 y 2i"], answer: 1 },
      { q: "¿Qué tipo de consulta NO soporta nativamente un árbol de segmentos en O(log n)?", options: ["Suma de rango", "Mínimo de rango", "MCD de rango", "Ordenación de rango"], answer: 3 },
      { q: "Con propagación perezosa, ¿cuándo se empuja un valor lazy a los hijos?", options: ["Solo durante la construcción", "Antes de acceder o modificar un nodo hijo", "Al final de todas las consultas", "Inmediatamente cuando se asigna"], answer: 1 },
      { q: "¿Cuál es la complejidad de construir un árbol de segmentos desde un arreglo de tamaño n?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], answer: 2 },
      { q: "Para un árbol de segmentos con asignación-de-rango + suma-de-rango, ¿qué valor extra debe almacenar cada nodo además de la suma?", options: ["El valor mínimo", "La longitud del segmento", "El XOR del rango", "El valor máximo"], answer: 1 },
    ],
  },

  "fenwick-tree": {
    title: "Árbol de Fenwick (BIT)",
    category: "Árboles y Avanzados",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Alto",
    description:
      "Un Árbol Indexado Binario (BIT/Árbol de Fenwick) soporta consultas de suma prefija y actualizaciones puntuales en O(log n) con una implementación muy simple. Más ligero que un árbol de segmentos para consultas de suma.",
    asciiArt: `BIT para array [1,2,3,4,5,6,7,8]:

 idx:   1   2   3   4   5   6   7   8
 val:   1   2   3   4   5   6   7   8
 BIT:  [1] [3] [3][10] [5][11] [7][36]

 BIT[i] almacena la suma de un rango que termina en i.
 Rango = [i - lowbit(i) + 1 .. i]

 lowbit(6) = 6 & (-6) = 010₂ = 2  → BIT[6]=a[5]+a[6]
 lowbit(4) = 4 & (-4) = 100₂ = 4  → BIT[4]=a[1..4]

 suma_prefija(6):  6→4→0: BIT[6]+BIT[4] = 11+10 = 21 ✓
 actualizar(3,+5): 3→4→8: BIT[3]+=5, BIT[4]+=5, BIT[8]+=5`,
    keyTechniques: [
      "Actualización puntual, consulta de prefijo",
      "Actualización de rango, consulta puntual (BIT de diferencia)",
      "Actualización de rango, consulta de rango (dos BITs)",
      "BIT 2D (para sumas prefijas de matrices)",
    ],
    benefits: [
      "Más simple y con constante más rápida que árbol de segmentos para sumas prefijas",
      "Actualización y consulta O(log n) con código mínimo",
      "Fácilmente extendido a 2D para sumas prefijas de matrices",
    ],
    typicalConstraints: ["n, q ≤ 10⁶", "Actualizaciones puntuales + consultas de suma prefija/rango"],
    examples: [
      {
        title: "Árbol de Fenwick — Actualización Puntual, Suma Prefija",
        description: "Implementación clásica de BIT",
        codeSnippet: `struct BIT {
    int n;
    vector<long long> tree;
    BIT(int n) : n(n), tree(n + 1, 0) {}

    void update(int i, long long delta) {
        for (; i <= n; i += i & (-i))
            tree[i] += delta;
    }

    long long query(int i) {
        long long s = 0;
        for (; i > 0; i -= i & (-i))
            s += tree[i];
        return s;
    }

    // Suma de rango [l, r] (indexado en 1)
    long long query(int l, int r) {
        return query(r) - query(l - 1);
    }
};`,
      },
    ],
    bestPractices: [
      "Usar arrays indexados en 1 — BIT no funciona con índice 0",
      "lowbit(i) = i & (-i) aísla el bit menos significativo activo",
      "Para actualización de rango + consulta de rango, usar dos BITs simultáneamente",
    ],
    problems: ["Leetcode 315 (Count Smaller — solución BIT)", "Codeforces 701E", "Leetcode 307 (Range Sum Query Mutable)"],
    quiz: [
      { q: "¿Qué calcula lowbit(i) = i & (-i)?", options: ["El bit más significativo activo de i", "El bit menos significativo activo de i", "El número de bits activos en i", "El complemento de i"], answer: 1 },
      { q: "¿Por qué los arrays del Árbol de Fenwick deben estar indexados en 1?", options: ["Los arrays indexados en 0 causan desbordamiento", "lowbit(0) = 0 causa un bucle infinito en actualizaciones/consultas", "El árbol desperdicia espacio en el índice 0", "El ordenamiento requiere indexación en 1"], answer: 1 },
      { q: "¿Cuál es la complejidad de una actualización puntual en un Árbol de Fenwick?", options: ["O(1)", "O(log n)", "O(n)", "O(log² n)"], answer: 1 },
      { q: "Comparado con un Árbol de Segmentos, ¿cuál es la ventaja principal del Árbol de Fenwick?", options: ["Soporta actualizaciones de rango nativamente", "Código más simple y constante más rápida para sumas prefijas", "Funciona para funciones no asociativas", "Soporta consultas persistentes"], answer: 1 },
      { q: "Para calcular la suma de rango [l, r] con un BIT, se calcula:", options: ["query(l) - query(r)", "query(r) - query(l-1)", "query(r-l)", "query(r) + query(l)"], answer: 1 },
    ],
  },

  "trie": {
    title: "Trie",
    category: "Árboles y Avanzados",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Intermedio",
    description:
      "Un trie (árbol de prefijos) almacena strings para que las búsquedas de prefijos e inserciones se ejecuten en O(L) donde L es la longitud del string. Usado para autocompletado, maximización XOR y enrutamiento IP.",
    asciiArt: `Insertar: "gato", "gapo", "gas", "sol"

          raíz
         /    \\
        g      s
        |      |
        a      o
       /|\\     |
      t  p  s  l
      |  |  |  (*)
      o  o  (*)
     (*) (*)  "gas"
     "gato" "gapo"

(*) marca fin de palabra.

Trie XOR (trie binario para XOR máximo):
 Insertar números en binario (MSB primero)
 Para maximizar XOR con x: en cada bit,
 intentar ir en dirección opuesta al bit de x`,
    keyTechniques: [
      "Búsqueda de prefijo en O(L)",
      "Inserción / eliminación de palabras",
      "Trie XOR (par de XOR máximo)",
      "Trie comprimido (árbol Patricia)",
    ],
    benefits: [
      "Inserción y búsqueda O(L) vs O(L log n) con conjunto ordenado",
      "Agrupa palabras naturalmente por prefijo común",
      "El trie XOR resuelve problemas de XOR máximo en O(n × 32)",
    ],
    typicalConstraints: ["Longitud total de strings ≤ 10⁶", "Tamaño del alfabeto ≤ 26 (o 2 para trie binario)"],
    examples: [
      {
        title: "Trie — Insertar y Buscar",
        description: "Trie basado en arrays para letras minúsculas",
        codeSnippet: `struct Trie {
    struct Node {
        int ch[26];
        bool end;
        Node() : end(false) { fill(ch, ch+26, -1); }
    };
    vector<Node> nodes;
    Trie() { nodes.emplace_back(); }

    void insert(const string& s) {
        int cur = 0;
        for (char c : s) {
            int x = c - 'a';
            if (nodes[cur].ch[x] == -1) {
                nodes[cur].ch[x] = nodes.size();
                nodes.emplace_back();
            }
            cur = nodes[cur].ch[x];
        }
        nodes[cur].end = true;
    }

    bool search(const string& s) {
        int cur = 0;
        for (char c : s) {
            int x = c - 'a';
            if (nodes[cur].ch[x] == -1) return false;
            cur = nodes[cur].ch[x];
        }
        return nodes[cur].end;
    }
};`,
      },
    ],
    bestPractices: [
      "Usar nodos basados en arrays (más rápido) en lugar de map<char, Node*> (más limpio pero más lento)",
      "Para trie XOR, usar un trie binario con alfabeto {0, 1}",
      "Rastrear el conteo de palabras que pasan por cada nodo para conteo de prefijos",
    ],
    problems: ["Leetcode 208 (Implement Trie)", "Leetcode 421 (Max XOR — trie binario)", "Codeforces 514C"],
    quiz: [
      { q: "¿Cuál es la complejidad de insertar un string de longitud L en un Trie?", options: ["O(log L)", "O(L log n)", "O(L)", "O(n)"], answer: 2 },
      { q: "En un Trie XOR binario, ¿cuántos bits se procesan típicamente por entero?", options: ["8", "16", "32", "64"], answer: 2 },
      { q: "Para maximizar XOR con un valor de consulta x, en cada bit se debe:", options: ["Ir en la misma dirección que el bit de x", "Ir en la dirección opuesta al bit de x", "Siempre ir a la izquierda", "Siempre ir a la derecha"], answer: 1 },
      { q: "¿Qué estructura de datos preferirías para autocompletado con coincidencia de prefijos?", options: ["Mapa hash", "Array ordenado + búsqueda binaria", "Trie", "B-tree"], answer: 2 },
      { q: "¿Qué marca el final de una palabra válida en un nodo Trie?", options: ["Un puntero hijo nulo", "Un indicador booleano 'end'", "Un nodo con carácter especial", "El índice del nodo"], answer: 1 },
    ],
  },

  "modular-arithmetic": {
    title: "Aritmética Modular",
    category: "Matemáticas",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Alto",
    description:
      "La mayoría de los problemas de PC con salidas grandes requieren respuestas módulo 10⁹+7. Dominar operaciones mod, inverso modular y exponenciación rápida.",
    asciiArt: `Reloj modular (mod 7):

 ...21 → 14 → 7 → 0
 ...22 → 15 → 8 → 1
 ...23 → 16 → 9 → 2

Potencia rápida: 3^13 mod 7
13 = 1101₂  →  3^1 · 3^4 · 3^8

 exp  val (mod 7)
  1     3
  2     2   (3²=9≡2)
  4     4   (2²=4)
  8     2   (4²=16≡2)

3^13 = 3^8 · 3^4 · 3^1 = 2·4·3 = 24 ≡ 3 (mod 7) ✓`,
    keyTechniques: [
      "Exponenciación Rápida (Exponenciación Binaria)",
      "Inverso Modular (Pequeño Teorema de Fermat)",
      "Factoriales Precalculados",
      "Teorema Chino del Resto",
    ],
    benefits: [
      "Manejar números hasta 10¹⁸ sin desbordamiento",
      "Calcular combinaciones C(n,k) mod p eficientemente",
      "Requerido en ~80% de los problemas de conteo",
    ],
    typicalConstraints: ["MOD = 10⁹ + 7 (primo)", "MOD = 998244353 (primo amigable con NTT)"],
    examples: [
      {
        title: "Exponenciación Rápida + Inverso Modular",
        description: "Utilidades matemáticas esenciales para programación competitiva",
        codeSnippet: `const long long MOD = 1e9 + 7;

long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}

// Inverso modular (mod debe ser primo)
long long inv(long long a, long long mod = MOD) {
    return power(a, mod - 2, mod);
}

// Precalcular factoriales para C(n, k) mod p
vector<long long> fact(MAXN), inv_fact(MAXN);
void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
    inv_fact[MAXN-1] = inv(fact[MAXN-1]);
    for (int i = MAXN-2; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}
long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}`,
      },
      {
        title: "Euclides Extendido + Precómputo Lineal O(n) de Inversos",
        description: "Inverso cuando el mod NO es primo; inversos en lote en O(n) para 1..n",
        codeSnippet: `// Euclides Extendido: encuentra x,y tal que a*x + b*y = mcd(a,b)
// Retorna mcd; asigna x e y
long long extgcd(long long a, long long b, long long& x, long long& y) {
  if (b == 0) { x = 1; y = 0; return a; }
  long long x1, y1;
  long long g = extgcd(b, a % b, x1, y1);
  x = y1;
  y = x1 - (a / b) * y1;
  return g;
}

// Inverso modular via extgcd (funciona cuando mcd(a, mod) = 1, mod NO necesita ser primo)
long long modInv(long long a, long long mod) {
  long long x, y;
  long long g = extgcd(a, mod, x, y);
  if (g != 1) return -1; // no existe inverso
  return (x % mod + mod) % mod;
}

// Precómputo lineal O(n) de inversos para 1..n (mod debe ser primo)
// Recurrencia: inv[i] = -(mod/i) * inv[mod%i] (mod mod)
vector<long long> linearInv(int n, long long mod) {
  vector<long long> inv(n + 1);
  inv[1] = 1;
  for (int i = 2; i <= n; i++)
    inv[i] = (mod - (mod / i) * inv[mod % i] % mod) % mod;
  return inv;
}
// Caso de uso: inversos modulares para todo i en [1..n] — O(n) total vs O(n log mod) con power()`,
      },
    ],
    bestPractices: [
      "Siempre agregar MOD antes de tomar módulo para manejar negativos: (a - b % MOD + MOD) % MOD",
      "Precalcular factoriales hasta MAXN una vez, no por consulta",
      "Usar __int128 si los productos intermedios pueden exceder long long",
    ],
    problems: ["Codeforces 509C", "Leetcode 1569", "Codeforces 543B"],
    quiz: [
      { q: "¿Cuál es el módulo más común en programación competitiva?", options: ["10⁶ + 3", "10⁹ + 7", "998244353", "2³¹ − 1"], answer: 1 },
      { q: "¿Cuál es la complejidad de la exponenciación binaria rápida?", options: ["O(n)", "O(log n)", "O(sqrt(n))", "O(n log n)"], answer: 1 },
      { q: "El Pequeño Teorema de Fermat establece que para primo p y a no divisible por p: a^(p-1) ≡ ?", options: ["0 (mod p)", "1 (mod p)", "a (mod p)", "p (mod a)"], answer: 1 },
      { q: "Para manejar correctamente la resta mod p (a - b), calcula:", options: ["(a - b) % p", "(a - b + p) % p", "a % p - b % p", "(a % p) - (b % p) + p"], answer: 1 },
      { q: "¿Qué teorema se usa para calcular el inverso modular cuando el módulo es primo?", options: ["Teorema Chino del Resto", "Pequeño Teorema de Fermat", "Teorema de Euler", "Teorema de Wilson"], answer: 1 },
      { q: "Cuando el módulo p NO es primo, ¿cómo calculas el inverso modular de a?", options: ["Pequeño Teorema de Fermat", "Algoritmo de Euclides Extendido (si mcd(a,p)=1)", "a^(p-1) mod p", "No se puede calcular"], answer: 1 },
      { q: "El Teorema Chino del Resto (TCR) se usa para resolver sistemas de qué?", options: ["Ecuaciones lineales", "Congruencias modulares simultáneas", "Ecuaciones polinomiales", "Ecuaciones matriciales"], answer: 1 },
    ],
  },

  "sieve": {
    title: "Criba de Eratóstenes",
    category: "Matemáticas",
    difficulty: "Principiante",
    timeToLearn: "2-3 días",
    importance: "Alto",
    description:
      "La criba encuentra todos los primos hasta N en O(N log log N). La criba lineal logra O(N). Esencial para problemas de teoría de números que involucran factorización prima y divisibilidad.",
    asciiArt: `Criba hasta 30:

 2  3  4  5  6  7  8  9 10 11 12 13 14 ...
 ✓  ✓  ✗  ✓  ✗  ✓  ✗  ✗  ✗  ✓  ✗  ✓  ✗

 Marcar múltiplos de 2: 4, 6, 8, 10, 12, 14 ...
 Marcar múltiplos de 3: 9, 15, 21, 27 ...
 Marcar múltiplos de 5: 25 ...
 Parar en ⌊√30⌋ = 5

 Primos ≤ 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29

 Criba del menor factor primo (SPF):
 spf[12] = 2  →  12 = 2 × 6 = 2 × 2 × 3
 Factorizar cualquier n en O(log n) usando SPF`,
    keyTechniques: [
      "Criba Clásica — O(N log log N)",
      "Criba Lineal — O(N)",
      "Criba del Menor Factor Primo (SPF)",
      "Criba de factorizaciones primas",
    ],
    benefits: [
      "Precalcular todos los primos ≤ 10⁷ en ~0.1 segundos",
      "La criba SPF habilita factorización O(log n) por número",
      "La función totiente de Euler puede calcularse junto con la criba",
    ],
    typicalConstraints: ["N ≤ 10⁶ fácilmente; N ≤ 10⁷ con ~40 MB de memoria"],
    examples: [
      {
        title: "Criba Clásica + Menor Factor Primo",
        description: "Dos cribas en un solo pase",
        codeSnippet: `const int MAXN = 1e6 + 5;
vector<bool> is_prime(MAXN, true);
vector<int> spf(MAXN); // menor factor primo

void sieve() {
    iota(spf.begin(), spf.end(), 0); // spf[i] = i inicialmente
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i < MAXN; i++) {
        if (is_prime[i]) {
            for (long long j = (long long)i*i; j < MAXN; j += i) {
                is_prime[j] = false;
                if (spf[j] == j) spf[j] = i;
            }
        }
    }
}

// Factorizar n en O(log n) usando SPF
vector<int> factorize(int n) {
    vector<int> factors;
    while (n > 1) {
        factors.push_back(spf[n]);
        n /= spf[n];
    }
    return factors;
}`,
      },
      {
        title: "Criba Lineal O(n) + Función Totiente de Euler φ(n)",
        description: "Cada compuesto se marca exactamente una vez; el totiente se calcula en paralelo",
        codeSnippet: `// Criba Lineal: cada número es tachado por su MENOR factor primo exactamente una vez
// → O(n) total, vs O(n log log n) para la criba clásica
const int MAXN = 1e6 + 5;
vector<int> primes, spf2(MAXN, 0), phi(MAXN);
vector<bool> composite(MAXN, false);

void linearSieve() {
  phi[1] = 1;
  for (int i = 2; i < MAXN; i++) {
    if (!composite[i]) {           // i es primo
      primes.push_back(i);
      spf2[i] = i;
      phi[i] = i - 1;             // totiente de Euler para primo p = p-1
    }
    for (int p : primes) {
      if ((long long)i * p >= MAXN) break;
      composite[i * p] = true;
      spf2[i * p] = p;
      if (i % p == 0) {
        // p ya es el menor factor primo de i
        // phi[i*p] = phi[i] * p  (multiplicatividad)
        phi[i * p] = phi[i] * p;
        break;                    // crucial: parar aquí para marcar cada número una vez
      } else {
        // mcd(i, p) = 1 → phi[i*p] = phi[i] * phi[p] = phi[i] * (p-1)
        phi[i * p] = phi[i] * (p - 1);
      }
    }
  }
}
// phi[n] = cantidad de enteros en [1,n] que son coprimos con n
// phi[p^k] = p^(k-1) * (p-1);  phi es multiplicativa: mcd(a,b)=1 → phi[ab]=phi[a]*phi[b]`,
      },
    ],
    bestPractices: [
      "Comenzar el bucle interno en i² (los múltiplos por debajo de i² ya están marcados)",
      "Usar bitset<MAXN> en lugar de vector<bool> para ~8x reducción de memoria",
      "Criba SPF: sólo actualizar spf[j] si spf[j]==j (primera vez marcado)",
    ],
    problems: ["Leetcode 204 (Count Primes)", "Codeforces 776C", "Codeforces 1217D"],
    quiz: [
      { q: "¿Cuál es la complejidad de la Criba de Eratóstenes para primos hasta N?", options: ["O(N)", "O(N log N)", "O(N log log N)", "O(sqrt(N))"], answer: 2 },
      { q: "¿Por qué el bucle interno de la criba comienza en i² en lugar de 2i?", options: ["Por eficiencia de caché", "Todos los múltiplos por debajo de i² ya están marcados por primos menores", "Para evitar marcar i mismo", "Para ahorrar memoria"], answer: 1 },
      { q: "La criba del menor factor primo (SPF) permite factorizar n en qué tiempo?", options: ["O(n)", "O(sqrt(n))", "O(log n)", "O(1)"], answer: 2 },
      { q: "¿Qué optimización de memoria puede reducir la memoria de la criba ~8x?", options: ["Usar int en lugar de long long", "Usar bitset<N> en lugar de vector<bool>", "Usar char en lugar de bool", "Usar short en lugar de int"], answer: 1 },
      { q: "¿Cuál es el número primo más pequeño?", options: ["1", "2", "3", "0"], answer: 1 },
    ],
  },

  "combinatorics": {
    title: "Combinatoria",
    category: "Matemáticas",
    difficulty: "Intermedio",
    timeToLearn: "1-2 semanas",
    importance: "Alto",
    description:
      "La combinatoria cuenta arreglos y selecciones. En PC, esto significa calcular C(n,k) mod p, aplicar inclusión-exclusión, el principio del casillero y funciones generatrices.",
    asciiArt: `Triángulo de Pascal — C(n,k):

 n=0:           1
 n=1:         1   1
 n=2:       1   2   1
 n=3:     1   3   3   1
 n=4:   1   4   6   4   1
 n=5: 1   5  10  10   5   1

 C(n,k) = C(n-1,k-1) + C(n-1,k)

 C(5,2) = 10  formas de elegir 2 de 5

Estrellas y Barras (distribuir n en k grupos):
 C(n+k-1, k-1)

Inclusión-Exclusión (|A∪B∪C|):
 |A|+|B|+|C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|`,
    keyTechniques: [
      "Coeficientes binomiales C(n,k) mod p",
      "Estrellas y Barras",
      "Principio de Inclusión-Exclusión",
      "Principio del Casillero (Pigeonhole)",
    ],
    benefits: [
      "Cuenta arreglos sin enumeración por fuerza bruta",
      "La inclusión-exclusión maneja conteo complejo con restricciones",
      "El teorema de Lucas extiende C(n,k) mod p a n grande",
    ],
    typicalConstraints: ["n ≤ 10⁶ con factoriales precalculados", "n ≤ 10¹⁸ con el teorema de Lucas"],
    examples: [
      {
        title: "Factoriales Precalculados para C(n,k) mod p",
        description: "Plantilla estándar de combinatoria",
        codeSnippet: `const int MOD = 1e9 + 7;
const int MAXN = 2e6 + 5;
long long fact[MAXN], inv_fact[MAXN];

long long power(long long b, long long e, long long m) {
    long long r = 1; b %= m;
    for (; e > 0; e >>= 1) {
        if (e & 1) r = r * b % m;
        b = b * b % m;
    }
    return r;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
    inv_fact[MAXN-1] = power(fact[MAXN-1], MOD-2, MOD);
    for (int i = MAXN-2; i >= 0; i--)
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}

// Estrellas y barras: n objetos idénticos en k grupos distintos
long long distribuir(int n, int k) { return C(n + k - 1, k - 1); }`,
      },
      {
        title: "Números de Catalan + Desarreglos",
        description: "Dos secuencias de conteo esenciales con recurrencias de PD",
        codeSnippet: `// Números de Catalan: C_n = C(2n, n) / (n+1)
// C_0=1, C_1=1, C_2=2, C_3=5, C_4=14, C_5=42, ...
// Cuenta: parentizaciones válidas, formas de BST, particiones no cruzadas, caminos de Dyck
// Recurrencia: C_n = suma_{i=0}^{n-1} C_i * C_{n-1-i}
// Forma cerrada: C_n = C(2n, n) / (n+1) = C(2n, n) - C(2n, n+1)
vector<long long> catalan(int n, long long mod) {
  vector<long long> cat(n + 1, 0);
  cat[0] = cat[1] = 1;
  for (int i = 2; i <= n; i++)
    for (int j = 0; j < i; j++)
      cat[i] = (cat[i] + cat[j] % mod * cat[i-1-j]) % mod;
  return cat;
  // O también: cat[n] = C(2n,n) * modInv(n+1, mod) % mod  (O(1) con factoriales precalculados)
}

// Desarreglos D(n): permutaciones de n elementos sin punto fijo
// D(0)=1, D(1)=0, D(2)=1, D(3)=2, D(4)=9, D(5)=44
// Recurrencia: D(n) = (n-1) * (D(n-1) + D(n-2))  para n >= 2
// Aproximación: D(n) = round(n! / e) para n grande
vector<long long> desarreglos(int n, long long mod) {
  vector<long long> D(n + 1, 0);
  D[0] = 1; if (n >= 1) D[1] = 0;
  for (int i = 2; i <= n; i++)
    D[i] = (long long)(i - 1) % mod * ((D[i-1] + D[i-2]) % mod) % mod;
  return D;
}
// Tipo de problema: "arreglos donde el elemento i NO está en la posición i" → desarreglos`,
      },
    ],
    bestPractices: [
      "Precalcular factoriales hasta 2×10⁶ para manejar problemas de tipo C(2n, n)",
      "Teorema de Lucas para C(n,k) mod p cuando n puede ser muy grande",
      "Desarreglos: D(n) = (n-1)(D(n-1)+D(n-2))",
    ],
    problems: ["Codeforces 1696D", "Leetcode 1220 (Count Vowels Permutations)", "Codeforces 559C"],
    quiz: [
      { q: "¿De cuántas formas puedes elegir k elementos de n (el orden no importa)?", options: ["n! / k!", "n! / (k! × (n-k)!)", "n^k", "k^n"], answer: 1 },
      { q: "La fórmula de Estrellas y Barras para distribuir n elementos idénticos en k grupos distintos es:", options: ["C(n, k)", "C(n+k, k)", "C(n+k-1, k-1)", "n^k"], answer: 2 },
      { q: "Inclusión-Exclusión para |A ∪ B| es igual a:", options: ["|A| + |B|", "|A| + |B| - |A ∩ B|", "|A| - |B| + |A ∩ B|", "|A| × |B|"], answer: 1 },
      { q: "Para calcular C(n, k) mod p eficientemente cuando n es muy grande, ¿qué teorema se usa?", options: ["Pequeño Teorema de Fermat", "Teorema de Wilson", "Teorema de Lucas", "Teorema Chino del Resto"], answer: 2 },
      { q: "¿Cuánto es C(5, 2)?", options: ["5", "10", "20", "15"], answer: 1 },
      { q: "¿El n-ésimo número de Catalan cuenta cuál de los siguientes?", options: ["Número de primos hasta n", "Número de parentizaciones válidas de n+1 factores", "Número de formas de ordenar n elementos", "Número de subconjuntos de tamaño n"], answer: 1 },
      { q: "¿De cuántas formas se pueden ordenar n objetos distintos en línea?", options: ["2ⁿ", "n²", "n!", "C(n, ⌊n/2⌋)"], answer: 2 },
      { q: "El Lema de Burnside (Cauchy-Frobenius) se usa para contar objetos bajo qué condición?", options: ["Cuando los objetos tienen distintos pesos", "Cuando los objetos se consideran equivalentes bajo simetría/rotación", "Cuando el conteo supera 10⁹", "Cuando los elementos se extraen sin reemplazo"], answer: 1 },
    ],
  },
};

// Estructura de navegación del panel lateral
const sidebarSections = [
  {
    label: "RESUMEN",
    items: [
      { id: "introduction", title: "Introducción" },
      { id: "learning-path", title: "Ruta de Aprendizaje" },
      { id: "assessment", title: "Evaluación de Habilidades" },
    ],
  },
  {
    label: "FUNDAMENTOS",
    items: [
      { id: "complexity-analysis", title: "Análisis de Complejidad" },
      { id: "arrays-strings", title: "Arrays y Strings" },
      { id: "stl-guide", title: "Esenciales de STL" },
    ],
  },
  {
    label: "ALGORITMOS",
    items: [
      { id: "two-pointers", title: "Dos Punteros" },
      { id: "sliding-window", title: "Ventana Deslizante" },
      { id: "binary-search", title: "Búsqueda Binaria" },
      { id: "sorting", title: "Técnicas de Ordenamiento" },
    ],
  },
  {
    label: "TEORÍA DE GRAFOS",
    items: [
      { id: "bfs", title: "BFS" },
      { id: "dfs", title: "DFS" },
      { id: "dijkstra", title: "Dijkstra" },
      { id: "union-find", title: "Union-Find (DSU)" },
    ],
  },
  {
    label: "PROGRAMACIÓN DINÁMICA",
    items: [
      { id: "dp-1d", title: "PD 1D" },
      { id: "dp-2d", title: "PD 2D" },
      { id: "knapsack", title: "Mochila" },
      { id: "bitmask-dp", title: "PD con Bitmask" },
    ],
  },
  {
    label: "ÁRBOLES Y AVANZADOS",
    items: [
      { id: "segment-tree", title: "Árbol de Segmentos" },
      { id: "fenwick-tree", title: "Árbol de Fenwick (BIT)" },
      { id: "trie", title: "Trie" },
    ],
  },
  {
    label: "MATEMÁTICAS",
    items: [
      { id: "modular-arithmetic", title: "Aritmética Modular" },
      { id: "sieve", title: "Criba de Eratóstenes" },
      { id: "combinatorics", title: "Combinatoria" },
    ],
  },
];