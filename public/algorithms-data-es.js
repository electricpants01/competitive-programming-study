// Guía de Estudio de Programación Competitiva — Datos de Algoritmos (Español)
const algorithmsData = {
  "complexity-analysis": {
    title: "Análisis de Complejidad",
    category: "Fundamentos",
    difficulty: "Principiante",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "Entender la complejidad temporal y espacial es la base de la programación competitiva. Aprende la notación Big-O, Big-Ω y Big-Θ para evaluar la eficiencia de los algoritmos.",
    keyTechniques: [
      "Notación Big-O",
      "Complejidad Espacial",
      "Análisis Amortizado",
      "Relaciones de Recurrencia",
    ],
    benefits: [
      "Elegir el algoritmo correcto según las restricciones",
      "Predecir TLE (Límite de Tiempo Excedido) antes de enviar",
      "Entender el balance entre tiempo y memoria",
    ],
    typicalConstraints: ["n ≤ 10^8 → O(n)", "n ≤ 10^6 → O(n log n)", "n ≤ 10^4 → O(n²)", "n ≤ 500 → O(n³)"],
    examples: [
      {
        title: "Hoja de Referencia de Complejidades",
        description: "Clases de complejidad comunes y sus límites prácticos",
        codeSnippet: `// O(1)      — Búsqueda en hash map
// O(log n)  — Búsqueda binaria
// O(n)      — Recorrido lineal
// O(n log n)— Merge sort, heap sort
// O(n²)     — Burbuja/inserción, bucles anidados
// O(2^n)    — Enumeración de subconjuntos
// O(n!)     — Permutaciones`,
      },
    ],
    bestPractices: [
      "Siempre revisa las restricciones antes de elegir un algoritmo",
      "Asume ~10^8 operaciones por segundo como estimación segura",
      "Cuenta los bucles anidados para estimar la complejidad rápidamente",
    ],
    problems: ["Leetcode 217 (Contains Duplicate)", "Codeforces 4A (Watermelon)"],
  },

  "arrays-strings": {
    title: "Arreglos y Strings",
    category: "Fundamentos",
    difficulty: "Principiante",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "Estructuras de datos fundamentales presentes en casi todos los problemas de programación competitiva. Domina las sumas de prefijo, arreglos de diferencia y manipulación de cadenas.",
    keyTechniques: [
      "Sumas de Prefijo",
      "Arreglos de Diferencia",
      "Reversión en Sitio",
      "Hashing de Cadenas",
    ],
    benefits: [
      "Consultas de suma en rango en O(1) con sumas de prefijo",
      "Actualizaciones de rango en O(1) con arreglos de diferencia",
      "Base para dos punteros y ventana deslizante",
    ],
    typicalConstraints: ["n ≤ 10^6 típico", "Consultas de rango → sumas de prefijo", "Actualizaciones de rango → arreglo de diferencia"],
    examples: [
      {
        title: "Suma de Prefijo",
        description: "Responde consultas de suma en rango en O(1) tras preprocesamiento O(n)",
        codeSnippet: `// Construir arreglo de suma de prefijo
vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; i++)
    prefix[i + 1] = prefix[i] + arr[i];

// Consulta suma [l, r] (indexado en 0)
int rangeSum(int l, int r) {
    return prefix[r + 1] - prefix[l];
}`,
      },
      {
        title: "Arreglo de Diferencia",
        description: "Actualización de rango en O(1), reconstrucción en O(n)",
        codeSnippet: `// Sumar val a [l, r]
void rangeAdd(vector<int>& diff, int l, int r, int val) {
    diff[l] += val;
    if (r + 1 < diff.size()) diff[r + 1] -= val;
}
// Reconstruir: suma parcial del arreglo de diferencia`,
      },
    ],
    bestPractices: [
      "Usa sumas de prefijo para consultas estáticas de rango",
      "Usa arreglos de diferencia para actualización de rango + consulta puntual",
      "Indexa desde 0 por defecto; sé consistente",
    ],
    problems: ["Codeforces 381C (Sereja and Brackets)", "Leetcode 303 (Range Sum Query)"],
  },

  "two-pointers": {
    title: "Dos Punteros",
    category: "Algoritmos",
    difficulty: "Principiante a Intermedio",
    timeToLearn: "3-5 días",
    importance: "Alto",
    description:
      "Técnica que usa dos índices recorriendo un arreglo para resolver problemas en O(n) que de otra manera requerirían O(n²). Funciona mejor en arreglos ordenados.",
    keyTechniques: [
      "Punteros en Extremos Opuestos",
      "Punteros Rápido y Lento",
      "Punteros en la Misma Dirección",
      "Patrón Tres Sumas",
    ],
    benefits: [
      "Reduce la fuerza bruta O(n²) a O(n)",
      "Funciona naturalmente con arreglos ordenados",
      "Bajo uso de memoria — O(1) espacio adicional",
    ],
    typicalConstraints: ["El arreglo debe estar ordenado (o ser ordenable)", "n ≤ 10^6"],
    examples: [
      {
        title: "Dos Sumas en Arreglo Ordenado",
        description: "Encuentra un par que sume el objetivo usando punteros en extremos opuestos",
        codeSnippet: `bool twoSum(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) return true;
        else if (sum < target) l++;
        else r--;
    }
    return false;
}`,
      },
      {
        title: "Eliminar Duplicados (En Sitio)",
        description: "Patrón de dos punteros en la misma dirección",
        codeSnippet: `int removeDuplicates(vector<int>& nums) {
    int slow = 0;
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow])
            nums[++slow] = nums[fast];
    }
    return slow + 1;
}`,
      },
    ],
    bestPractices: [
      "Ordena el arreglo primero si no está ya ordenado",
      "Define claramente qué representa cada puntero",
      "Verifica la condición de terminación del bucle (l < r vs l <= r)",
    ],
    problems: ["Leetcode 167 (Two Sum II)", "Leetcode 15 (3Sum)", "Codeforces 381B"],
  },

  "sliding-window": {
    title: "Ventana Deslizante",
    category: "Algoritmos",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Alto",
    description:
      "Mantiene una ventana de elementos que satisface una restricción. Expande el puntero derecho y reduce el izquierdo cuando la restricción se viola. Logra O(n) para problemas de subarreglos y subcadenas.",
    keyTechniques: [
      "Ventana de Tamaño Fijo",
      "Ventana de Tamaño Variable",
      "Ventana con Mapa de Frecuencias",
      "Ventana con Deque Monótono",
    ],
    benefits: [
      "Solución O(n) para muchos problemas de subcadenas",
      "Funciona en arreglos, cadenas y listas enlazadas",
      "Se generaliza al deque monótono para consultas de máximo/mínimo",
    ],
    typicalConstraints: ["Subarreglos/subcadenas contiguas", "n ≤ 10^6"],
    examples: [
      {
        title: "Suma Máxima de Subarreglo de Tamaño K",
        description: "Ventana deslizante de tamaño fijo",
        codeSnippet: `int maxSumK(vector<int>& arr, int k) {
    int windowSum = 0, maxSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;
    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}`,
      },
      {
        title: "Subcadena Más Larga Sin Caracteres Repetidos",
        description: "Ventana deslizante de tamaño variable con un mapa de frecuencias",
        codeSnippet: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> freq;
    int l = 0, maxLen = 0;
    for (int r = 0; r < s.size(); r++) {
        freq[s[r]]++;
        while (freq[s[r]] > 1) freq[s[l++]]--;
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
      },
    ],
    bestPractices: [
      "Identifica qué representa la ventana (suma, conteo, caracteres)",
      "Define exactamente cuándo reducir la ventana",
      "Usa un mapa hash para rastrear el estado de la ventana eficientemente",
    ],
    problems: ["Leetcode 3", "Leetcode 76 (Min Window Substring)", "Codeforces 676C"],
  },

  "binary-search": {
    title: "Búsqueda Binaria",
    category: "Algoritmos",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "Reduce el espacio de búsqueda a la mitad en cada paso. Aplica no solo a arreglos ordenados sino a cualquier predicado monótono — 'búsqueda binaria en la respuesta' es una técnica central en CP.",
    keyTechniques: [
      "Búsqueda Binaria Clásica",
      "Límite Inferior/Superior",
      "Búsqueda Binaria en la Respuesta",
      "Búsqueda Ternaria",
    ],
    benefits: [
      "Búsqueda en O(log n) en estructuras ordenadas",
      "Resuelve problemas de optimización con 'búsqueda binaria en la respuesta'",
      "Funciona en cualquier condición monótona",
    ],
    typicalConstraints: ["El arreglo debe estar ordenado", "El espacio de respuestas debe ser monótono"],
    examples: [
      {
        title: "Búsqueda Binaria en la Respuesta",
        description: "Encuentra la velocidad mínima para terminar de leer libros en D días",
        codeSnippet: `// Verificar si podemos terminar con la 'velocidad' dada
bool canFinish(vector<int>& books, int speed, int days) {
    int d = 0;
    for (int b : books) d += (b + speed - 1) / speed;
    return d <= days;
}

int minSpeed(vector<int>& books, int D) {
    int lo = 1, hi = *max_element(books.begin(), books.end());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (canFinish(books, mid, D)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}`,
      },
    ],
    bestPractices: [
      "Usa lo + (hi - lo) / 2 para evitar desbordamiento de enteros",
      "Define claramente: ¿qué representan lo y hi?",
      "Plantilla: encontrar el primer índice donde el predicado es verdadero",
    ],
    problems: ["Leetcode 875 (Koko Eating Bananas)", "Codeforces 1201C", "Leetcode 410"],
  },

  "bfs": {
    title: "BFS (Búsqueda en Anchura)",
    category: "Teoría de Grafos",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "Explora un grafo nivel por nivel usando una cola. BFS encuentra el camino más corto en grafos sin pesos. Fundamental para problemas de grillas, caminos más cortos desde múltiples fuentes y BFS 0-1.",
    keyTechniques: [
      "BFS Estándar",
      "BFS Multi-fuente",
      "BFS 0-1 (deque)",
      "BFS en Grafos Implícitos",
    ],
    benefits: [
      "Camino más corto en grafos sin pesos o con pesos unitarios",
      "Complejidad temporal O(V + E)",
      "BFS multi-fuente evita múltiples ejecuciones de fuente única",
    ],
    typicalConstraints: ["Aristas sin pesos o con pesos unitarios", "Problemas de grillas (4 u 8 direcciones)"],
    examples: [
      {
        title: "Camino Más Corto en Grilla",
        description: "BFS en una grilla 2D para encontrar el mínimo de pasos",
        codeSnippet: `int shortestPath(vector<vector<int>>& grid, int sr, int sc, int tr, int tc) {
    int n = grid.size(), m = grid[0].size();
    queue<pair<int,int>> q;
    vector<vector<int>> dist(n, vector<int>(m, -1));
    q.push({sr, sc}); dist[sr][sc] = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        if (x == tr && y == tc) return dist[x][y];
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx>=0 && nx<n && ny>=0 && ny<m && grid[nx][ny]==0 && dist[nx][ny]==-1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    return -1;
}`,
      },
    ],
    bestPractices: [
      "Marca los nodos como visitados al encolar, no al desencolar",
      "Para BFS multi-fuente, empuja todas las fuentes con distancia 0 inicialmente",
      "Usa BFS 0-1 (deque) cuando las aristas tienen peso 0 o 1",
    ],
    problems: ["Leetcode 994 (Rotting Oranges)", "Codeforces 1272E", "Leetcode 1926"],
  },

  "dfs": {
    title: "DFS (Búsqueda en Profundidad)",
    category: "Teoría de Grafos",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Esencial",
    description:
      "Explora tan profundo como sea posible antes de retroceder. DFS es la base para el ordenamiento topológico, detección de ciclos, componentes conectados y recorridos de árboles.",
    keyTechniques: [
      "DFS Recursivo",
      "DFS Iterativo (pila)",
      "Ordenamiento Topológico (Kahn / DFS)",
      "Detección de Ciclos",
    ],
    benefits: [
      "Detecta ciclos en grafos dirigidos/no dirigidos",
      "Encuentra componentes conectados en O(V + E)",
      "Base para algoritmos avanzados (Tarjan, Kosaraju)",
    ],
    typicalConstraints: ["V, E ≤ 10^5 con DFS recursivo (cuidado con la profundidad de pila)", "Iterativo para grafos grandes"],
    examples: [
      {
        title: "Ordenamiento Topológico (DFS)",
        description: "Ordena los nodos en un DAG tal que las aristas van de izquierda a derecha",
        codeSnippet: `vector<int> order;
vector<bool> visited(n, false);

void dfs(int u, vector<vector<int>>& adj) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v, adj);
    order.push_back(u);
}

// Llama para cada nodo no visitado, luego invierte el orden
for (int i = 0; i < n; i++)
    if (!visited[i]) dfs(i, adj);
reverse(order.begin(), order.end());`,
      },
    ],
    bestPractices: [
      "Usa estados de color (BLANCO/GRIS/NEGRO) para detección de ciclos en grafos dirigidos",
      "Prefiere DFS iterativo para grafos con n > 10^4 para evitar desbordamiento de pila",
      "Árbol DFS = las aristas traseras indican ciclos",
    ],
    problems: ["Leetcode 207 (Course Schedule)", "Codeforces 510C", "Leetcode 547"],
  },

  "dijkstra": {
    title: "Algoritmo de Dijkstra",
    category: "Teoría de Grafos",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Alto",
    description:
      "Camino más corto en un grafo ponderado con pesos de aristas no negativos. Usa un montículo mínimo (cola de prioridad) para complejidad O((V + E) log V).",
    keyTechniques: [
      "Cola de Prioridad (montículo mínimo)",
      "Eliminación Perezosa",
      "Dijkstra Multi-fuente",
      "Dijkstra en Grilla",
    ],
    benefits: [
      "O((V + E) log V) con montículo binario",
      "Funciona en cualquier grafo con pesos no negativos",
      "Fácil de extender para multi-fuente o rutas con restricciones",
    ],
    typicalConstraints: ["Solo pesos de aristas no negativos", "V ≤ 10^5, E ≤ 3×10^5 típicamente"],
    examples: [
      {
        title: "Dijkstra Estándar",
        description: "Camino más corto desde la fuente a todos los nodos",
        codeSnippet: `vector<long long> dijkstra(int src, vector<vector<pair<int,int>>>& adj, int n) {
    vector<long long> dist(n, LLONG_MAX);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;  // eliminación perezosa
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
      "Usa long long para las distancias para evitar desbordamiento",
      "Omite entradas obsoletas con la verificación de eliminación perezosa",
      "Para pesos negativos → Bellman-Ford en su lugar",
    ],
    problems: ["Codeforces 20C (Shortest Path)", "Leetcode 743 (Network Delay)", "Codeforces 786C"],
  },

  "union-find": {
    title: "Union-Find (DSU)",
    category: "Teoría de Grafos",
    difficulty: "Intermedio",
    timeToLearn: "3-5 días",
    importance: "Alto",
    description:
      "La Unión de Conjuntos Disjuntos soporta operaciones de unión y búsqueda casi en O(1). Esencial para conectividad dinámica, MST de Kruskal y LCA offline.",
    keyTechniques: [
      "Compresión de Rutas",
      "Unión por Rango / Tamaño",
      "DSU Ponderado",
      "DSU con Rollback (offline)",
    ],
    benefits: [
      "Casi O(1) amortizado con compresión de rutas + unión por rango",
      "Simplifica enormemente los problemas de conectividad",
      "Componente central del algoritmo MST de Kruskal",
    ],
    typicalConstraints: ["n, q ≤ 10^5 fácilmente", "Consultas de conectividad dinámica"],
    examples: [
      {
        title: "DSU con Compresión de Rutas",
        description: "Plantilla usada en el 90% de los problemas con DSU",
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
      "Siempre usa compresión de rutas Y unión por rango juntos",
      "Retorna bool desde unite() para verificar si se formó un ciclo",
      "Usa DSU para Kruskal: ordena aristas, une extremos, omite aristas del mismo componente",
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
      "Resuelve problemas dividiéndolos en subproblemas que se solapan. La PD 1D usa un único arreglo de estados. Abarca Fibonacci, cambio de monedas, ladrón de casas y Subsecuencia Creciente más Larga (SCL).",
    keyTechniques: [
      "Memoización Top-down",
      "Tabulación Bottom-up",
      "Optimización de Espacio",
      "Diseño de Transición de Estados",
    ],
    benefits: [
      "Convierte la fuerza bruta exponencial en tiempo polinomial",
      "El espacio a menudo se reduce de O(n²) a O(n) u O(1)",
      "La mayoría de los problemas de CP tienen un componente de PD",
    ],
    typicalConstraints: ["n ≤ 10^6 para PD O(n)", "n ≤ 10^4 para PD O(n²)"],
    examples: [
      {
        title: "Subsecuencia Creciente más Larga (O(n log n))",
        description: "SCL clásica usando ordenamiento por paciencia / búsqueda binaria",
        codeSnippet: `int lis(vector<int>& nums) {
    vector<int> tails; // tails[i] = cola más pequeña de SI de longitud i+1
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
        description: "PD 1D Bottom-up",
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
      "Siempre define claramente qué representa dp[i]",
      "Comienza con top-down, optimiza a bottom-up si es necesario",
      "Busca oportunidades para reducir el espacio (arreglo rodante)",
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
      "PD sobre dos dimensiones — grillas, pares de cadenas (SCL, distancia de edición) o PD de intervalos. Los estados son O(n²) con transiciones típicamente O(1) u O(n).",
    keyTechniques: [
      "PD en Grilla",
      "SCL / Distancia de Edición",
      "PD de Intervalos",
      "PD con Máscaras de Bits",
    ],
    benefits: [
      "Maneja búsqueda de caminos en grillas con restricciones",
      "Resuelve problemas de alineación de cadenas exactamente",
      "La PD de intervalos maneja problemas de parentización y cadena de matrices",
    ],
    typicalConstraints: ["n, m ≤ 10^3 para PD O(n×m)", "n ≤ 500 para PD de intervalos O(n³)"],
    examples: [
      {
        title: "Subsecuencia Común más Larga",
        description: "PD 2D clásica sobre dos cadenas",
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
      "Dibuja la tabla de PD con ejemplos pequeños primero",
      "Identifica los casos base (cadena vacía, fila/columna vacía)",
      "Para PD de intervalos: itera la longitud primero, luego el índice de inicio",
    ],
    problems: ["Leetcode 1143 (LCS)", "Leetcode 72 (Edit Distance)", "Codeforces 149D"],
  },

  "segment-tree": {
    title: "Árbol de Segmentos",
    category: "Árboles y Avanzado",
    difficulty: "Avanzado",
    timeToLearn: "2 semanas",
    importance: "Alto",
    description:
      "Estructura de árbol para consultas de rango (suma, mínimo, máximo) y actualizaciones de rango en O(log n). Con propagación perezosa, soporta actualizaciones de rango en O(log n) también.",
    keyTechniques: [
      "Actualización Puntual + Consulta de Rango",
      "Propagación Perezosa",
      "Segment Tree Beats",
      "Árbol de Segmentos Persistente",
    ],
    benefits: [
      "Consulta de rango y actualización puntual en O(log n)",
      "Actualización de rango en O(log n) con propagación perezosa",
      "Se generaliza a cualquier función asociativa",
    ],
    typicalConstraints: ["n, q ≤ 3×10^5", "Operaciones: suma, mínimo, máximo, MCD, XOR"],
    examples: [
      {
        title: "Árbol de Segmentos (Suma, Actualización Puntual)",
        description: "Implementación clásica del árbol de segmentos",
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
      "Asigna 4×n nodos para el arreglo del árbol",
      "Pasa l y r explícitamente siempre — evita el estado global",
      "Usa propagación perezosa solo cuando sea necesario (actualizaciones de rango)",
    ],
    problems: ["Codeforces 339D", "Leetcode 315 (Count Smaller)", "Codeforces 380C"],
  },

  "modular-arithmetic": {
    title: "Aritmética Modular",
    category: "Matemáticas",
    difficulty: "Intermedio",
    timeToLearn: "1 semana",
    importance: "Alto",
    description:
      "La mayoría de los problemas de CP con salidas grandes requieren respuestas módulo 10^9+7. Domina las operaciones mod, el inverso modular y la exponenciación rápida.",
    keyTechniques: [
      "Exponenciación Rápida (Exponenciación Binaria)",
      "Inverso Modular (Pequeño Teorema de Fermat)",
      "Factoriales Precomputados",
      "Teorema Chino del Resto",
    ],
    benefits: [
      "Manejar números de hasta 10^18 sin desbordamiento",
      "Calcular combinaciones C(n,k) mod p eficientemente",
      "Requerido en ~80% de los problemas de conteo",
    ],
    typicalConstraints: ["MOD = 10^9 + 7 (primo)", "MOD = 998244353 (primo compatible con NTT)"],
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

// Precomputa factoriales para C(n, k) mod p
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
      "Siempre suma MOD antes de tomar mod para manejar negativos: (a - b % MOD + MOD) % MOD",
      "Precomputa factoriales hasta MAXN una vez, no por consulta",
      "Usa __int128 si los productos intermedios pueden exceder long long",
    ],
    problems: ["Codeforces 509C", "Leetcode 1569 (Reorder Routes)", "Codeforces 543B"],
  },
};

// Estructura de navegación de la barra lateral
const sidebarSections = [
  {
    label: "INICIO",
    items: [
      { id: "introduction", title: "Introducción" },
      { id: "learning-path", title: "Plan de Aprendizaje" },
      { id: "assessment", title: "Evaluación de Nivel" },
    ],
  },
  {
    label: "FUNDAMENTOS",
    items: [
      { id: "complexity-analysis", title: "Análisis de Complejidad" },
      { id: "arrays-strings", title: "Arreglos y Strings" },
      { id: "stl-guide", title: "STL Esencial" },
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
      { id: "knapsack", title: "Mochila (Knapsack)" },
      { id: "bitmask-dp", title: "PD con Máscaras de Bits" },
    ],
  },
  {
    label: "ÁRBOLES Y AVANZADO",
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