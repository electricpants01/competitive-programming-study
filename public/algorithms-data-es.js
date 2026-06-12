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
    ],
    bestPractices: [
      "Siempre calcular la complejidad antes de enviar, no después del TLE",
      "n ≤ 10⁵ permite O(n log n); n ≤ 10³ permite O(n²)",
      "Vigilar constantes ocultas — 2×10⁸ puede dar TLE en límites ajustados",
    ],
    problems: ["Leetcode 1 (variantes de Two Sum)", "Codeforces 4A", "USACO 2016 Jan (Div 2)"],
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
    ],
    bestPractices: [
      "Usar arrays prefijos indexados en 1 para evitar errores por uno",
      "Para cuadrículas 2D, construir una suma prefija 2D",
      "Los arrays de diferencia son ideales para actualizaciones de suma/resta en rango",
    ],
    problems: ["Leetcode 303 (Range Sum Query)", "Codeforces 816C", "Leetcode 1480"],
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
    ],
    bestPractices: [
      "Usar unordered_map/set para O(1) promedio, pero cuidado con colisiones en el peor caso",
      "Llamar reserve() en contenedores no ordenados para evitar rehashing",
      "Preferir emplace_back sobre push_back para objetos complejos",
    ],
    problems: ["Leetcode 1 (Two Sum - usar unordered_map)", "Codeforces 4C (Registration)", "Leetcode 347 (Top K)"],
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
    ],
    bestPractices: [
      "Ordenar primero si el array no está ya ordenado",
      "Para listas enlazadas, usar puntero lento/rápido para detectar ciclos o encontrar el punto medio",
      "Verificar casos extremos: array vacío, un elemento, todos iguales",
    ],
    problems: ["Leetcode 167 (Two Sum II)", "Leetcode 15 (3Sum)", "Codeforces 6C"],
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
    ],
    bestPractices: [
      "Expandir R primero, luego contraer L para restaurar el invariante",
      "Usar un contador de condiciones 'matched' en lugar de comparar mapas completos",
      "Para máximo en ventana deslizante, usar una cola monotónica (deque de índices)",
    ],
    problems: ["Leetcode 76 (Min Window Substring)", "Leetcode 239 (Sliding Window Max)", "Codeforces 701C"],
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
    ],
    bestPractices: [
      "Usar lo + (hi - lo) / 2 para evitar desbordamiento de enteros",
      "Verificar siempre el invariante del bucle: la respuesta siempre está en [lo, hi]",
      "Para lower_bound: usar hi = mid cuando es factible; para upper_bound: lo = mid + 1",
    ],
    problems: ["Leetcode 1011 (Ship Packages)", "Codeforces 460C", "Leetcode 875 (Koko Eating Bananas)"],
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
    ],
    bestPractices: [
      "Preferir std::sort en general — es O(n log n) en el peor caso (introsort)",
      "Usar stable_sort cuando los elementos iguales deben mantener su orden relativo",
      "Counting sort cuando valores ≤ 10⁶ y se necesita O(n)",
    ],
    problems: ["Leetcode 315 (Count Smaller)", "Codeforces 340E (inversiones)", "Leetcode 179 (Largest Number)"],
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
    ],
    bestPractices: [
      "Marcar nodos como visitados al insertarlos en la cola, no al sacarlos",
      "Para cuadrículas, usar arrays dx/dy para 4 u 8 direcciones",
      "BFS multi-fuente: insertar todas las fuentes con dist=0 antes de empezar",
    ],
    problems: ["Leetcode 994 (Rotting Oranges)", "Codeforces 3D", "Leetcode 1091 (Shortest Path Binary Matrix)"],
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
    ],
    bestPractices: [
      "Usar DFS iterativo con pila explícita para grafos profundos (evitar stack overflow)",
      "Rastrear marcas de tiempo de entrada/salida para consultas de ancestros y subárboles",
      "DFS en grafo no dirigido: una arista de retroceso indica la existencia de un ciclo",
    ],
    problems: ["Leetcode 207 (Course Schedule)", "Codeforces 1385E", "Leetcode 802 (Safe States)"],
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
    ],
    bestPractices: [
      "Usar long long para distancias para evitar desbordamiento",
      "Omitir entradas obsoletas con la verificación de eliminación perezosa",
      "Para pesos negativos → Bellman-Ford en su lugar",
    ],
    problems: ["Codeforces 20C (Camino Más Corto)", "Leetcode 743 (Network Delay)", "Codeforces 786C"],
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
    ],
    bestPractices: [
      "Siempre usar TANTO compresión de caminos COMO unión por rango juntos",
      "Retornar bool desde unite() para verificar si se formó un ciclo",
      "Usar DSU para Kruskal: ordenar aristas, unir extremos, omitir aristas del mismo componente",
    ],
    problems: ["Leetcode 547 (Number of Provinces)", "Codeforces 1455C", "Leetcode 684"],
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
    ],
    bestPractices: [
      "Siempre definir claramente qué representa dp[i]",
      "Comenzar con top-down, optimizar a bottom-up si es necesario",
      "Buscar oportunidades para reducir espacio (array rodante)",
    ],
    problems: ["Leetcode 322 (Coin Change)", "Leetcode 300 (LIS)", "Codeforces 455A"],
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
    ],
    bestPractices: [
      "Dibujar la tabla de PD con ejemplos pequeños primero",
      "Identificar casos base (string vacío, fila/columna vacía)",
      "Para PD de intervalos: iterar longitud primero, luego índice de inicio",
    ],
    problems: ["Leetcode 1143 (LCS)", "Leetcode 72 (Edit Distance)", "Codeforces 149D"],
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
    ],
    bestPractices: [
      "0/1: iterar capacidad HACIA ATRÁS para evitar usar un objeto dos veces",
      "Ilimitada: iterar capacidad HACIA ADELANTE para permitir reutilización",
      "Para suma de subconjunto: dp[w] = true/false en lugar de valor máximo",
    ],
    problems: ["Leetcode 416 (Partition Equal Subset)", "Codeforces 366C", "Leetcode 494 (Target Sum)"],
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
    ],
    bestPractices: [
      "Usar (mask >> i) & 1 para verificar si la ciudad i fue visitada",
      "Usar mask | (1 << i) para agregar la ciudad i al conjunto",
      "Enumerar sub-máscaras: for (int sub=mask; sub>0; sub=(sub-1)&mask)",
    ],
    problems: ["Leetcode 847 (Shortest Path Visiting All Nodes)", "Codeforces 327E", "Leetcode 1125 (Smallest Sufficient Team)"],
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
    ],
    bestPractices: [
      "Reservar 4×n nodos para el array del árbol",
      "Siempre pasar l y r explícitamente — evitar estado global",
      "Usar propagación perezosa sólo cuando sea necesario (actualizaciones de rango)",
    ],
    problems: ["Codeforces 339D", "Leetcode 315 (Count Smaller)", "Codeforces 380C"],
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
    ],
    bestPractices: [
      "Siempre agregar MOD antes de tomar módulo para manejar negativos: (a - b % MOD + MOD) % MOD",
      "Precalcular factoriales hasta MAXN una vez, no por consulta",
      "Usar __int128 si los productos intermedios pueden exceder long long",
    ],
    problems: ["Codeforces 509C", "Leetcode 1569", "Codeforces 543B"],
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
    ],
    bestPractices: [
      "Comenzar el bucle interno en i² (los múltiplos por debajo de i² ya están marcados)",
      "Usar bitset<MAXN> en lugar de vector<bool> para ~8x reducción de memoria",
      "Criba SPF: sólo actualizar spf[j] si spf[j]==j (primera vez marcado)",
    ],
    problems: ["Leetcode 204 (Count Primes)", "Codeforces 776C", "Codeforces 1217D"],
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
    ],
    bestPractices: [
      "Precalcular factoriales hasta 2×10⁶ para manejar problemas de tipo C(2n, n)",
      "Teorema de Lucas para C(n,k) mod p cuando n puede ser muy grande",
      "Desarreglos: D(n) = (n-1)(D(n-1)+D(n-2))",
    ],
    problems: ["Codeforces 1696D", "Leetcode 1220 (Count Vowels Permutations)", "Codeforces 559C"],
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