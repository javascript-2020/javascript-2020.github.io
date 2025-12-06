// Assuming you have:
// - an H.264 IDR (keyframe) NAL unit(s) as a Uint8Array: keyframeBytes
// - optional following delta frame(s): deltaBytes
// - SPS and PPS NAL units extracted as Uint8Array: spsBytes, ppsBytes

// Build an AVCDecoderConfigRecord (description) by concatenating SPS/PPS in Annex B or AVCC form.
// For AVCC, you need a proper 'description' (AVCDecoderConfigurationRecord) buffer.
// For a quick start, many browsers accept Annex B with parameter sets in 'description' too.

        
        var config = {
              codec: 'avc1.42E01E', // baseline profile example; replace if needed
              description: buildAvcDecoderConfigRecord(spsBytes, ppsBytes) // Uint8Array
        };
        
        var decoder = new VideoDecoder({
              output: async (frame) => {
                    // Draw to canvas
                    var bitmap = await createImageBitmap(frame);
                    var canvas = document.createElement('canvas');
                    canvas.width = bitmap.width;
                    canvas.height = bitmap.height;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(bitmap, 0, 0);
                    bitmap.close();
                    frame.close();
        
                    // Export JPEG
                    canvas.toBlob(
                          (blob) => {
                                // blob is a JPEG; do something with it (download, upload, etc.)
                                // e.g., createObjectURL(blob) for preview
                          },
                          'image/jpeg',
                          0.92
                    );
              },
              error: (e) => console.error('Decode error', e)
        });
        
        decoder.configure(config);
        
        // Wrap raw H.264 bytes into EncodedVideoChunks (Annex B or AVCC formatted appropriately)
        // The 'type' must be 'key' for IDR frames and 'delta' for non-key frames.
        
        function makeChunk(bytes, timestamp, isKey) {
              return new EncodedVideoChunk({
                    timestamp, // in microseconds if you care
                    type: isKey ? 'key' : 'delta',
                    data: bytes
              });
        }
        
        // Feed the keyframe first
        decoder.decode(makeChunk(keyframeBytes, 0, true));
        
        // Optionally feed the next frame(s)
        decoder.decode(makeChunk(deltaBytes, 33333, false)); // ~30fps timestamp
