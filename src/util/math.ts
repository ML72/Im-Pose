import { Keypoint } from "../types/keypoints";

// Returns cosine similarity between two vectors
// Vector 1 is (x1,y1)->(x2,y2) and Vector 2 is (x3,y3)->(x4,y4)
export const cosineSim = (
    x1: number, y1: number, x2: number, y2: number,
    x3: number, y3: number, x4: number, y4: number
) => {
    const dx1 = x2 - x1;
    const dy1 = y2 - y1;
    const dx2 = x4 - x3;
    const dy2 = y4 - y3;
    return (dx1 * dx2 + dy1 * dy2)
        / (Math.sqrt(dx1 ** 2 + dy1 ** 2) * Math.sqrt(dx2 ** 2 + dy2 ** 2));
}

// Normalizes keypoints so that max x/y is 1 and min x/y is 0
export const normalizeKeypoints = (keypoints: Keypoint[]) => {
    const xVals = keypoints.map(kp => kp.x);
    const yVals = keypoints.map(kp => kp.y);
    const maxX = Math.max(...xVals);
    const maxY = Math.max(...yVals);
    const minX = Math.min(...xVals);
    const minY = Math.min(...yVals);
    return keypoints.map(kp => {
        return {
            x: (kp.x - minX) / (maxX - minX),
            y: (kp.y - minY) / (maxY - minY),
            score: kp.score,
            name: kp.name
        }
    });
}

// Computes alignment indices between two arrays using dynamic time warping
// Return both alignment score and the alignment indices
// Alignment is with respect to n, for an m*n array
export const dynamicTimeWarp = (costMatrix: number[][]): { indices: number[], costs: number[] } => {
    const m = costMatrix.length;
    const n = costMatrix[0].length;

    // Create the cost and path matrices
    const dtw: number[][] = Array.from({ length: m }, () => Array(n).fill(Infinity));
    const path: {i: number, j: number}[][] = Array.from({ length: m }, () => Array(n).fill({ i: -1, j: -1 }));

    // Initialize the first cell
    dtw[0][0] = costMatrix[0][0];

    // Fill in the first row and column of the DTW matrix
    for (let i = 1; i < m; i++) {
        dtw[i][0] = dtw[i-1][0] + costMatrix[i][0];
        path[i][0] = { i: i-1, j: 0 };
    }

    for (let j = 1; j < n; j++) {
        dtw[0][j] = dtw[0][j-1] + costMatrix[0][j];
        path[0][j] = { i: 0, j: j-1 };
    }

    // Fill in the rest of the DTW matrix
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            const minPrevCost = Math.min(dtw[i-1][j], dtw[i][j-1], dtw[i-1][j-1]);
            dtw[i][j] = costMatrix[i][j] + minPrevCost;

            // Keep track of the path
            if (minPrevCost === dtw[i-1][j]) {
                path[i][j] = { i: i-1, j: j };
            } else if (minPrevCost === dtw[i][j-1]) {
                path[i][j] = { i: i, j: j-1 };
            } else {
                path[i][j] = { i: i-1, j: j-1 };
            }
        }
    }

    // Trace back the optimal path
    let i = m - 1;
    let j = n - 1;
    const indices: number[] = Array(n).fill(-1);
    const costs: number[] = Array(n).fill(Infinity);

    while (i > 0 || j > 0) {
        // Update the index and cost only if it's better for that entry in n
        if (costMatrix[i][j] < costs[j]) {
            indices[j] = i;
            costs[j] = costMatrix[i][j];
        }
        const { i: prevI, j: prevJ } = path[i][j];
        i = prevI;
        j = prevJ;
    }

    // Add the starting point (0,0) if not already set
    if (costMatrix[0][0] < costs[0]) {
        indices[0] = 0;
        costs[0] = costMatrix[0][0];
    }

    // Return the final arrays, guaranteed to have length n
    return {
        indices,
        costs
    };
}