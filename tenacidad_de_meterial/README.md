# Homework Assignment 18

[![Build Status](https://travis-ci.com/PGE383-HPC/assignment18.svg?token=SnMGq692xXXqxzyE6QSj&branch=master)](https://travis-ci.com/PGE383-HPC/assignment18)

This assignment is basically a repeat of [Homework Assignment 15](https://github.com/PGE383-HPC-Students/assignment15) were we wrote a `ParallelToughness` class that computes a materials toughness given stress/strain data in file in parallel using `mpi4py`.  Except in this assignment, we will use Epetra data structures and import/export operations to manually load balance the data for the parallel computation.  You should complete the new `EpetraParallelToughness` class. 

Your code should be parallel consistent, i.e. it should produce the exact same answer independent of the number of processors you specify.

## Testing

If you would like to check to see if your solution is correct, run the following commands at the Terminal command line:

```bash
mpiexec -np 2 python test.py
mpiexec -np 4 python test.py
```
