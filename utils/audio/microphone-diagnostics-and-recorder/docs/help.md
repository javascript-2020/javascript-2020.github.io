
## microphone diagnostics and recorder

at the current time ( 2026-10-26 ) firefox produces broken audio, the audio file can be run through
ffmpeg to fix it, the command is

```
ffmpeg -i audio.webm -c copy -cues_to_front 1 fixed.webm
```

not selecting a microphone just uses the default device, this is probably sufficient for most cases.


