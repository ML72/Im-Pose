export interface Keypoints {
    keypoints: [{
        x: number,
        y: number,
        score: number,
        name: string
    }];
    keypoints3D: [{
        x: number,
        y: number,
        score: number,
        name: string
    }];
}