/**
 * CP keyword → tag mapping for auto-tagging video transcript segments.
 * Keys are canonical tag names (matching the CF tag cloud).
 * Values are arrays of keywords/phrases to look for in transcript text.
 *
 * ES and EN variants are merged — the scraper matches against all of them
 * since many terms appear in both languages even in Spanish-language videos.
 */

const CP_KEYWORD_MAP = {
  'dp': [
    // Spanish
    'programación dinámica', 'dinámica', 'memoización', 'memoización', 'mochila',
    'subproblema', 'estado dp', 'tabla dp', 'dp[i]', 'dp[j]', 'dp[n]',
    'fibonacci', 'subsecuencia', 'subconjunto',
    // English
    'dynamic programming', 'memoization', 'dp table', 'dp state',
    'knapsack', 'subsequence', 'subproblem', 'tabulation',
  ],
  'knapsack': [
    'mochila', 'knapsack', '0/1', 'capacidad', 'peso', 'valor',
    'unbounded knapsack', 'mochila ilimitada',
  ],
  'greedy': [
    'voraz', 'greedy', 'algoritmo ávido', 'decisión óptima local',
    'greedy approach', 'greedy choice',
  ],
  'graphs': [
    'grafo', 'grafos', 'nodo', 'arista', 'vértice', 'arco',
    'graph', 'node', 'edge', 'vertex', 'adjacency',
    'lista de adyacencia', 'matriz de adyacencia',
  ],
  'bfs': [
    'bfs', 'búsqueda en anchura', 'breadth first', 'breadth-first',
    'cola', 'nivel por nivel', 'queue', 'level order',
  ],
  'dfs': [
    'dfs', 'búsqueda en profundidad', 'depth first', 'depth-first',
    'pila', 'recursión', 'backtracking', 'stack',
  ],
  'binary search': [
    'búsqueda binaria', 'binary search', 'bisección', 'bisect',
    'mitad', 'mid', 'lo', 'hi', 'left', 'right pointer',
    'lower bound', 'upper bound', 'cota inferior', 'cota superior',
  ],
  'two pointers': [
    'dos punteros', 'two pointers', 'puntero izquierdo', 'puntero derecho',
    'left pointer', 'right pointer', 'slow fast', 'tortoise hare',
  ],
  'sliding window': [
    'ventana deslizante', 'sliding window', 'ventana', 'window',
    'subarray de longitud k', 'subarreglo',
  ],
  'sorting': [
    'ordenamiento', 'sorting', 'sort', 'merge sort', 'quick sort',
    'heap sort', 'counting sort', 'radix sort', 'comparar',
    'ordenar', 'burbuja', 'inserción', 'selección',
  ],
  'trees': [
    'árbol', 'tree', 'raíz', 'root', 'hoja', 'leaf',
    'padre', 'hijo', 'parent', 'child', 'height', 'profundidad',
    'inorden', 'preorden', 'postorden', 'inorder', 'preorder', 'postorder',
  ],
  'segment tree': [
    'árbol de segmentos', 'segment tree', 'segtree', 'range query',
    'range update', 'lazy propagation', 'propagación perezosa',
    'consulta de rango',
  ],
  'fenwick tree': [
    'árbol de fenwick', 'fenwick', 'bit tree', 'binary indexed tree',
    'bit[i]', 'suma de prefijos con bit',
  ],
  'trie': [
    'trie', 'árbol de prefijos', 'prefix tree', 'palabras', 'prefijo',
  ],
  'union find': [
    'union find', 'dsu', 'disjoint set', 'conjuntos disjuntos',
    'find', 'union', 'padre[]', 'rank', 'path compression',
    'compresión de caminos',
  ],
  'shortest paths': [
    'camino más corto', 'shortest path', 'dijkstra', 'bellman-ford',
    'floyd warshall', 'distancia mínima', 'dist[]', 'relajar', 'relax',
  ],
  'dijkstra': [
    'dijkstra', 'cola de prioridad', 'priority queue',
    'aristas con peso', 'weighted graph',
  ],
  'number theory': [
    'teoría de números', 'number theory', 'primo', 'prime', 'divisor',
    'mcd', 'gcd', 'mcm', 'lcm', 'criba', 'sieve', 'módulo', 'modulo',
    'congruencia', 'euler', 'totient',
  ],
  'modular arithmetic': [
    'aritmética modular', 'modular arithmetic', 'módulo', 'mod',
    'inverso modular', 'modular inverse', 'exponenciación rápida',
    'fast exponentiation', 'pow mod',
  ],
  'combinatorics': [
    'combinatoria', 'combinatorics', 'permutación', 'permutation',
    'combinación', 'combination', 'factorial', 'binomial',
    'coeficiente binomial', 'catalan',
  ],
  'data structures': [
    'estructura de datos', 'data structure', 'pila', 'stack',
    'cola', 'queue', 'deque', 'heap', 'montículo', 'set', 'map',
    'hash', 'tabla hash', 'hash table',
  ],
  'implementation': [
    'implementación', 'implementation', 'simulación', 'simulation',
  ],
  'strings': [
    'cadena', 'string', 'subcadena', 'substring', 'palindromo',
    'palindrome', 'kmp', 'z-function', 'z function', 'hashing',
  ],
  'mathematics': [
    'matemática', 'mathematics', 'math', 'álgebra', 'algebra',
    'geometría', 'geometry', 'probabilidad', 'probability',
  ],
  'bitmasks': [
    'máscara de bits', 'bitmask', 'bitwise', 'operación bit a bit',
    'and', 'or', 'xor', 'desplazamiento', 'shift',
  ],
  'complexity': [
    'complejidad', 'complexity', 'big o', 'o(n)', 'o(n log n)',
    'o(n²)', 'o(1)', 'tiempo de ejecución', 'espacio de memoria',
    'time complexity', 'space complexity',
  ],
};

/**
 * Given a block of text, returns all matching tag names.
 * @param {string} text - transcript segment text
 * @returns {string[]} matching tag names
 */
function tagsFromText(text) {
  const lower = text.toLowerCase();
  const found = new Set();
  for (const [tag, keywords] of Object.entries(CP_KEYWORD_MAP)) {
    if (keywords.some(kw => lower.includes(kw))) {
      found.add(tag);
    }
  }
  return [...found];
}

module.exports = { CP_KEYWORD_MAP, tagsFromText };