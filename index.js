function bubbleSort (array) {
    let i, n = array.length, newN;
    let result = [...array]
    do {
        newN = 0;
        for (i = 0; i < n; i++) {
            if (result[i] > result[i + 1]) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]]
                newN = i + 1;
            }
        }
        n = newN;
    } while (n > 0)
    return result
}

function selectSort (array) {
    let i, j, n = array.length, minIndex;
    let result = [...array]
    for (i = 0; i < n; i++) {
        minIndex = i;
        for (j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        [result[i], result[minIndex]] = [result[minIndex], result[i]]
    }
    return result;
}

function insertSort (array) {
    let i, j, n = array.length, cur;
    let result = [...array];
    for (i = 0; i < n; i++) {
        cur = result[i];
        for (j = i; j > 0 && result[j - 1] > cur; j--) {
            result[j] = result[j - 1]
        }
        result[j] = cur
    }
    return result;
}

function mergeSort (array) {
    function _mergeSort (array, l, r) {
        if (l >= r) {
            return;
        }
        let mid = Math.floor((l + r) / 2)
        _mergeSort(array, l, mid)
        _mergeSort(array, mid + 1, r)
        _merge(array, l, mid, r)
    }

    function _merge (array, l, mid, r) {
        let aux = array.slice(l, r + 1);
        let i = l, j = mid + 1, k = l;
        for (k = l; k <= r; k++) {
            if (i > mid) {
                array[k] = aux[j - l];
                j++;
            } else if (j > r) {
                array[k] = aux[i - l];
                i++;
            } else if (aux[i - l] < aux[j - l]) {
                array[k] = aux[i - l];
                i++;
            } else {
                array[k] = aux[j - l];
                j++;
            }
        }
    }
    let result = [...array];
    _mergeSort(result, 0, result.length - 1);
    return result;
}

function quickSort3Ways () {
    function _partition3 (array, l, r) {

        return i;

    }

    function _quickSort3Ways (array, l, r) {
        let randomIndex = l + Math.floor(Math.random() * (r - l + 1));
        [array[randomIndex], array[l]] = [array[l], array[randomIndex]]
        let pivot = array[l], lt = l; gt = r + 1; i = l + 1;
        // array[l+1...lt]<v array[lt+1...i)=v  array[gt...r]>v
        while (i < gt) {
            if (array[i] < pivot) {
                [array[i], array[lt + 1]] = [array[lt + 1], array[i]]
                i++;
                lt++;
            } else if (array[i] > pivot) {
                [array[i], array[gt - 1]] = [array[gt - 1], array[i]]
                gt--;
            } else {
                i++;
            }
        }
        [array[lt], array[l]] = [array[l], array[lt]]

        _quickSort3Ways(array, l, lt - 1)
        _quickSort3Ways(array, gt + 1, r)
    }
}

function quickSort (array) {
    function _partition2 (array, l, r) {
        let randomIndex = l + Math.floor(Math.random() * (r - l + 1));
        [array[randomIndex], array[l]] = [array[l], array[randomIndex]]
        let pivot = array[l], i = l + 1; j = r;
        // array[l+1...i)<=v  array[j...r]>=v
        while (true) {
            while (i <= r && array[i] < pivot) i++;
            while (j >= l + 1 && array[j] > pivot) j--;
            if (i > j) break;
            [array[i], array[j]] = [array[j], array[i]]
            i++;
            j--;
        }
        [array[j], array[l]] = [array[l], array[j]]
        return j
    }
    function _partition (array, l, r) {
        let randomIndex = l + Math.floor(Math.random() * (r - l + 1));
        [array[randomIndex], array[l]] = [array[l], array[randomIndex]]
        let pivot = array[l], i = l; j = l;
        for (i = l + 1; i <= r; i++) {
            if (array[i] < pivot) {
                [array[i], array[j + 1]] = [array[j + 1], array[i]]
                j++;
            }
        }
        [array[l], array[j]] = [array[j], array[l]]
        return j
    }
    function _quickSort (array, l, r) {
        if (l >= r) {
            return;
        }
        let pivotIndex = _partition2(array, l, r);
        _quickSort(array, l, pivotIndex - 1);
        _quickSort(array, pivotIndex + 1, r);
    }
    let result = [...array]
    _quickSort(result, 0, result.length - 1);
    return result;
}




function genrateRandomArray (count, left, right) {
    let result = []
    for (let i = 0; i < count; i++) {
        result.push(Math.floor(Math.random() * (right - left + 1)))
    }
    return result;
}

function genrateNearlyOrderArray (count, swapTimes) {
    let result = []
    for (let i = 0; i < count; i++) {
        result.push(i)
    }
    for (let i = 0; i < swapTimes; i++) {
        let xIndex = Math.floor(Math.random() * count);
        let yIndex = Math.floor(Math.random() * count);
        [result[xIndex], result[yIndex]] = [result[yIndex], result[xIndex]];
    }
    return result;
}

function testSort (sort, array) {
    let sortName = sort.name
    console.time(sortName);
    let result = sort(array)
    console.timeEnd(sortName);

    if (!isSorted(result)) {
        throw new Error('not a sorted array')
    }
}

function isSorted (array) {
    let i = 0;
    while (i < array.length - 1) {
        if (array[i + 1] < array[i]) {
            return false;
        }
        i++;
    }
    return true;
}
let n = 10000;
console.log('random array')
let ra = genrateRandomArray(n, 0, 10)
testSort(bubbleSort, ra)
testSort(selectSort, ra)
testSort(insertSort, ra)
testSort(mergeSort, ra)
testSort(quickSort, ra)
console.log('nearly order array')
let na = genrateNearlyOrderArray(n, 100)
testSort(bubbleSort, na)
testSort(selectSort, na)
testSort(insertSort, na)
testSort(mergeSort, na)
testSort(quickSort, na)
