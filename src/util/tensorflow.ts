import * as tf from "@tensorflow/tfjs"
import * as poseDetection from '@tensorflow-models/pose-detection';
import { current } from "@reduxjs/toolkit";

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
  const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};
  const detector = await poseDetection.createDetector(model, detectorConfig);

  const poses: poseDetection.Pose[] = await detector.estimatePoses(image);
  detector.dispose();
  return poses
}

export async function captureFrame(videoElement: any, time: any) {
  // Create a canvas element
  const canvas: any = document.createElement('canvas');
  const context: any = canvas.getContext('2d');

  // Set the canvas dimensions to match the video
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  // Seek the video to the specified time
  videoElement.currentTime = time;
  videoElement.pause();

  // Wait for the 'seeked' event to ensure the video has reached the desired frame
  await new Promise((resolve) => {
      videoElement.addEventListener('seeked', resolve, { once: true });
  });

  // Draw the video frame onto the canvas
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Create a new image element
  const img = new Image();
  img.src = canvas.toDataURL('image/png'); // Get the data URL of the image

  return img;
}



