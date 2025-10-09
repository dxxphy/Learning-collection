import time
import numba

@numba.jit(nopython=True)
def test_add(m):
    n=0
    for i in range(m):
        n+=i
    return n
if __name__ == "__main__":
    start = time.time()
    n = test_add(1000000000000)
    end = time.time()
    print(f"Execution time: {end - start} seconds,result is {n}")