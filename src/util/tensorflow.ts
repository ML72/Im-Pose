import * as tf from "@tensorflow/tfjs"
import * as poseDetection from '@tensorflow-models/pose-detection';

/**
 * @param {HTMLImageElement} image the image to get keypoints for
 * @returns {poseDetection.Pose[]} poses for the input image. Is an empty array if no pose found.
 */
export const detectKeypointsImage = async (
  image: HTMLImageElement
): Promise<poseDetection.Pose[]> => {
  await tf.ready();
  // Might have to tf.setBackend() I have no idea
  const model = poseDetection.SupportedModels.MoveNet;
  const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
  const detector = await poseDetection.createDetector(model, detectorConfig);

  const poses: poseDetection.Pose[] = await detector.estimatePoses(image);
  return poses
}

export const detectKeypointsVideo = async (
  video: HTMLVideoElement
): Promise<poseDetection.Pose[]> => {
  await tf.ready();
  // Might have to tf.setBackend() I have no idea
  const model = poseDetection.SupportedModels.MoveNet;
  const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
  const detector = await poseDetection.createDetector(model, detectorConfig);
  const poses: poseDetection.Pose[] = await detector.estimatePoses(video);
  return poses
}

