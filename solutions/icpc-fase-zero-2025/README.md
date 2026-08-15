# Maratona SBC Fase Zero 2025 — C++ Solutions

These C++17 implementations correspond to Problems A–M in the Fase Zero 2025 problem set
(Codeforces Gym 105925).

They are intentionally separate from the browser editorial. The editorial exposes only:

- estimated difficulty order;
- ASCII visualization;
- key insight and solution analysis;
- complexity.

| File | Problem |
|------|---------|
| `A.cpp` | Ambiguous Schrödinger Cat |
| `B.cpp` | Periodic Search |
| `C.cpp` | Matrix Logic Circuits |
| `D.cpp` | Quantum Decoherence |
| `E.cpp` | Particle Energization |
| `F.cpp` | Feynman Memorizing Numbers |
| `G.cpp` | Grover and His Special Paths |
| `H.cpp` | Binary Palindromic Harmony |
| `I.cpp` | Inspecting the Entanglement |
| `J.cpp` | Journey of the Particles |
| `K.cpp` | K Missing Elements |
| `L.cpp` | qPhones Production Line |
| `M.cpp` | Spooky Movement at a Distance |

Notes:

- Problem A prints Portuguese phrases matching the official samples (`vivo` / `morto` / `vivo e morto`), even in the English problem set.
- `K.cpp` uses a top-K DP over increasing-subsequence endings. It is correct and fine for small/medium `n`, but the full contest limits intend an Eppstein K-shortest approach on a sparsified DAG (see editorial).
