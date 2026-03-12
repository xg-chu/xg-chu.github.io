import os
import torch
import torchvision

video_path = '/Users/purkialo/Desktop'
a = ['RD_Radio34_002_12.mp4', 'RD_Radio34_002_13.mp4', 'RD_Radio34_002_16.mp4']

all_frames = []
for video in a:
    video = os.path.join(video_path, video)
    frames_data, _, meta_data = torchvision.io.read_video(video, output_format='TCHW', pts_unit='sec')
    all_frames.append(frames_data)
fps = meta_data['video_fps']

result_frames = []
for i in range(140):
    driving_frame = all_frames[0][i][:, :, 512:1024]
    following_frames = [torch.cat([all_frames[vid][i][..., :512], all_frames[vid][i][..., -512:]], dim=-1) for vid in range(len(all_frames))]
    final_frame = torch.cat([driving_frame] + following_frames, dim=-1)
    result_frames.append(final_frame)
torchvision.io.write_video(
    'video_3.mp4', torch.stack(result_frames).to(torch.uint8).permute(0, 2, 3, 1), fps=fps,
    video_codec='h264'
)